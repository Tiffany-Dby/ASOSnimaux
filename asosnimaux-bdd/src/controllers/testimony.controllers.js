import { TestimonyDB } from "../databases/testimony.db.js";
import { areStringsFilled } from "../utils/string.utils.js";
import isUUID from "validator/lib/isUUID.js";
import UUID from "../constants/uuid.const.js";
import blacklist from "validator/lib/blacklist.js";
import { BLACKLIST } from "../constants/blacklist.const.js";

const create = async ({ body: { content, userID } }, res) => {
  const areStrings = areStringsFilled([content, userID]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (!isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const sanitizedContent = blacklist(content, BLACKLIST.REGEX);

  const response = await TestimonyDB.create(sanitizedContent, userID);
  const { error, insertedId } = response;

  const createdTestimony = await TestimonyDB.readOneWithTheirUsername(insertedId);
  const err = createdTestimony.error;
  const result = createdTestimony.result;
  const testimony = result[0];

  if (err) return res.status(500).json({ message: err });

  return res.status(error ? 500 : 201).json({ message: error ? error : `New Testimony successfully created`, testimony });
}

const readAllWithTheirUsername = async (req, res) => {
  const response = await TestimonyDB.readAllWithTheirUsername();
  const { result, error } = response;

  res.status(error ? 500 : 200).json({ message: error ? error : `Request on testimonies with their username successful`, result });
}

const readWithTheirUsername = async (req, res) => {
  const response = await TestimonyDB.readWithTheirUsername();
  const { result, error } = response;

  res.status(error ? 500 : 200).json({ message: error ? error : `Request on 4 latest testimonies with their username successful`, result });
}

const readAllByOneUser = async ({ body: { userID } }, res) => {
  if (!isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const response = await TestimonyDB.readAllByOneUser(userID);
  const { result, error } = response;

  res.status(error ? 500 : 200).json({ message: error ? error : `Request on all testimonies from user with id "${userID}" successful`, result });
}

const readOneWithTheirUsername = async ({ params: { testimonyID } }, res) => {
  if (!isUUID(testimonyID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const response = await TestimonyDB.readOneWithTheirUsername(testimonyID);
  const { result, error } = response;

  const testimony = {
    id: result[0].id,
    userID: result[0].user_id,
    username: result[0].username,
    content: result[0].content,
    truncatedContent: result[0].truncated_content,
    avatarURL: result[0].avatar_url,
    date: result[0].date
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on testimony with id : "${testimonyID}" successful`, testimony });
}

const update = async ({ body: { content, testimonyID, userID } }, res) => {
  const areStrings = areStringsFilled([content]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (!isUUID(testimonyID, UUID.VERSION) || !isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const sanitizedContent = blacklist(content, BLACKLIST.REGEX);

  const response = await TestimonyDB.update(sanitizedContent, testimonyID, userID);
  const error = response.error;

  const updatedTestimony = await TestimonyDB.readOneWithTheirUsername(testimonyID);
  const err = updatedTestimony.error;
  const result = updatedTestimony.result;
  const testimony = result[0];

  if (err) return res.status(500).json({ message: err });

  return res.status(error ? 500 : 200).json({ message: error ? error : `Testimony with id "${testimonyID}" has been successfully edited`, testimony })
}

const deleteOne = async ({ body: { userID }, params: { testimonyID } }, res) => {
  if (!isUUID(testimonyID, UUID.VERSION) || !isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const response = await TestimonyDB.deleteOne(testimonyID, userID);
  const error = response.error;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Testimony with id ${testimonyID} deleted successfully` });
}

export const TestimonyController = {
  create,
  readAllWithTheirUsername,
  readAllByOneUser,
  readWithTheirUsername,
  readOneWithTheirUsername,
  update,
  deleteOne
}