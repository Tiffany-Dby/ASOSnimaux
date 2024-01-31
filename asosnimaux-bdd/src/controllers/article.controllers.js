import { ArticleDB } from "../databases/article.db.js";
import { areStringsFilled } from "../utils/string.utils.js";
import { mkdir } from "node:fs/promises";
import formidable from "formidable";

const create_ = async ({ body: { name, location, description, pictureURL, pictureCaption, userID } }, res) => {
  const areStrings = areStringsFilled([name, location, description, pictureURL, pictureCaption]);

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  const response = await ArticleDB.create(name, location, description, pictureURL, pictureCaption, userID);

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `New article successfully created`, result });
}

const create = async (req, res) => {
  const form = formidable({
    uploadDir: "./articles",
    keepExtensions: true,
    createDirsFromUploads: true,
    filter: opts => {
      const { name, mimetype, originalFilename } = opts;
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
  }

  console.log("fields", fields);
  console.log("files", files);

  if (!files.newArticleImg) return res.json({ message: "Something went wrong, check files" });

  const { userID } = req.body;
  const { name, location, description, pictureCaption } = fields;
  const article = {
    userID,
    name: name[0],
    location: location[0],
    description: description[0],
    picture_url: files.newArticleImg.path,
    pictureCaption: pictureCaption[0],
  }


  return res.json({ message: article });
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

  const error = response.error;

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