import { ArticleDB } from "../databases/article.db.js";
import { areStringsFilled } from "../utils/string.utils.js";
import { deleteImg, deleteImgs, getFormidableForm, setImgUrl } from "../utils/formidable.utils.js";
import isUUID from "validator/lib/isUUID.js";
import UUID from "../constants/uuid.const.js";
import { resizeAndFormatImg } from "../utils/sharp.utils.js";

const create = async (req, res) => {
  const errors = {};
  const form = await getFormidableForm("articles", 5, req);
  const { files, fields } = form;

  const formErr = form.error;
  if (formErr) errors.formError = formErr;

  if (!files.newArticleImg) return res.status(415).json({ message: "Something went wrong with the image" });

  const { userID } = req.body;
  const { filepath } = files.newArticleImg[0];

  const processedImg = await resizeAndFormatImg(filepath, "articles", "webp", 1300, null);

  const processedImgErr = processedImg.error;
  if (processedImgErr) errors.processedImgError = processedImgErr;

  const picture_url = processedImg.result;
  const { name, location, description, picture_caption } = fields;

  const areStrings = areStringsFilled([userID, name[0], location[0], description[0], picture_url, picture_caption[0]]);
  if (!areStrings) errors.areStringsError = "Missing data";

  if (!isUUID(userID, UUID.VERSION)) errors.UUIDError = "Invalid UUID format";

  const { formError, processedImgError, areStringsError, UUIDError } = errors;

  if (formError || processedImgError || areStringsError || UUIDError) {
    if (processedImgError) {
      const e = await deleteImg(setImgUrl(filepath, "articles"));
      if (e) return res.status(403).json({ message: e });
    }
    else {
      const e = await deleteImgs(picture_url, filepath, "articles");
      if (e.newErr || e.oldErr) return res.status(403).json({ message: e });
    }

    return res.status(500).json({ message: errors });
  }

  const article = {
    name: name[0],
    location: location[0],
    description: description[0],
    picture_url,
    picture_caption: picture_caption[0],
  }

  const response = await ArticleDB.create(article, userID);
  const { result, error, insertedId } = response;
  if (error) errors.error = error;

  if (error || result.affectedRows !== 1) {
    const e = await deleteImg(picture_url)
    if (e) return res.status(403).json({ message: e });
  }

  const createdArticle = await ArticleDB.readOne(insertedId);
  const rslt = createdArticle.result;
  const err = createdArticle.error;
  if (err) errors.err = err;

  const e = await deleteImg(setImgUrl(filepath, "articles"));
  if (e) return res.status(403).json({ message: e });

  return res.status(!!Object.keys(errors).length ? 500 : 200).json({ message: !!Object.keys(errors).length ? errors : `New article successfully created`, article: rslt });
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
  if (!isUUID(articleID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const response = await ArticleDB.readOne(articleID);

  const { result, error } = response;

  const article = {
    articleID,
    date: result[0].date,
    name: result[0].name,
    location: result[0].location,
    description: result[0].description,
    pictureURL: result[0].picture_url,
    pictureCaption: result[0].picture_caption
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on article with id ${articleID} successful`, article });
}

const update = async ({ body: { name, location, description, articleID } }, res) => {
  if (!isUUID(articleID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const areStrings = areStringsFilled([name, location, description]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  const response = await ArticleDB.update(name, location, description, articleID);
  const error = response.error;

  const updatedArticle = await ArticleDB.readOne(articleID);
  const err = updatedArticle.error;
  const result = updatedArticle.result;

  if (err) return res.status(500).json({ message: err });

  return res.status(error ? 500 : 200).json({ message: error ? error : `Update on article with id ${articleID} successful`, result });
}

const deleteOne = async ({ params: { articleID } }, res) => {
  if (!isUUID(articleID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const response = await ArticleDB.deleteOne(articleID);

  const { imgPathResult, error } = response;
  // Opti with -> transaction (SQL)
  const err = await deleteImg(imgPathResult[0].picture_url);
  if (err) return res.status(403).json({ message: err });

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