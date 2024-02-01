import { ArticleDB } from "../databases/article.db.js";
import { areStringsFilled } from "../utils/string.utils.js";
import { mkdir } from "node:fs/promises";
import { unlink } from 'node:fs';
import formidable from "formidable";
import { setDeleteImgUrl, setImgUrl } from "../utils/formidable.utils.js";

const create_ = async ({ body: { name, location, description, pictureURL, pictureCaption, userID } }, res) => {
  const areStrings = areStringsFilled([name, location, description, pictureURL, pictureCaption]);

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  const response = await ArticleDB.create(name, location, description, pictureURL, pictureCaption, userID);

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `New article successfully created`, result });
}

const create = async (req, res) => {
  const form = formidable({
    uploadDir: "./public/articles",
    keepExtensions: true,
    createDirsFromUploads: true,
    maxFileSize: 1024 * 1024,
    filter: opts => {
      const { mimetype } = opts;
      return mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg";
    }
  });

  let fields = null;
  let files = null;

  try {
    [fields, files] = await form.parse(req);
  }
  catch (err) {
    console.log("err =>", err.message);
    return res.status(500).json({ message: "Error parsing form" });
  }

  console.log("fields", fields);
  console.log("files", files);

  if (!files.newArticleImg) return res.status(400).json({ message: "Something went wrong, check files mimetype" });

  const { userID } = req.body;
  const filePath = files.newArticleImg[0].filepath;
  const picture_url = setImgUrl(filePath, "articles");
  const { name, location, description, picture_caption } = fields;

  const areStrings = areStringsFilled([name[0], location[0], description[0], picture_url, picture_caption[0]]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  const article = {
    name: name[0],
    location: location[0],
    description: description[0],
    picture_url,
    picture_caption: picture_caption[0],
  }

  console.log("picture_url : ", picture_url)

  const response = await ArticleDB.create(article, userID);

  const { error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `New article successfully created`, article });
}

const readAll = async (req, res) => {
  const response = await ArticleDB.readAll();

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on all articles successful`, result });
}

const read = async (req, res) => {
  const response = await ArticleDB.read();

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on 5 articles successful`, result });
}

const readOne = async ({ params: { articleID } }, res) => {
  const response = await ArticleDB.readOne(articleID);

  const { result, error } = response;

  const article = {
    articleID,
    date: result[0].date,
    name: result[0].name,
    location: result[0].location,
    description: result[0].description,
    pictureURL: result[0].pictureURL,
    pictureCaption: result[0].pictureCaption
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on article with id ${articleID} successful`, article });
}

const update = async ({ body: { name, location, description, articleID } }, res) => {
  const areStrings = areStringsFilled([name, location, description]);

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  const response = await ArticleDB.update(name, location, description, articleID);
  console.log("response controller:", response);

  const error = response.error;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Update on article with id ${articleID} successful` });
}

const deleteOne = async ({ params: { articleID } }, res) => {
  const response = await ArticleDB.deleteOne(articleID);

  const { imgPathResult, error } = response;

  try {
    if (!error) {
      const setPath = setDeleteImgUrl(imgPathResult[0].picture_url)
      unlink(setPath, (err) => {
        if (err) throw err;
        console.log(`${setPath} was successfully deleted`);
      });
    }
  }
  catch (e) {
    console.log(e.message);
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Article with id ${articleID} deleted successfully` });
}

export const ArticleController = {
  create,
  readAll,
  read,
  readOne,
  update,
  deleteOne
}