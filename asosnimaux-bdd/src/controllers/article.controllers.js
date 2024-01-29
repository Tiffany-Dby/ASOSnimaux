import { ArticleDB } from "../databases/article.db.js";
import { areStringsFilled } from "../utils/string.utils.js";

const create = async ({ body: { name, location, description, userID } }, res) => {
  const areStrings = areStringsFilled([name, location, description]);

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  const response = await ArticleDB.create(name, location, description, userID);

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `New article successfully created`, result });
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
    description: result[0].description
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