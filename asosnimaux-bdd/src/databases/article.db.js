import query from "./init.db.js";
import { v4 as uuidv4 } from "uuid";

const create = async (article, userID) => {
  const { name, location, description, picture_url, picture_caption } = article;
  const sql = `
    INSERT INTO events (id, date, name, location, description, picture_url, picture_caption, user_id)
    VALUES (?, NOW(), ?, ?, ?, ?, ?, ?)
  `;


  let result = [];
  let insertedId = [];
  let error = null;
  try {
    const id = uuidv4();
    result = await query(sql, [id, name, location, description, picture_url, picture_caption, userID]);
    insertedId = id;
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, insertedId, error };
  }
}

const readAll = async () => {
  const sql = `
    SELECT id, date, name, location, description, picture_url, picture_caption
    FROM events
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const read = async () => {
  const sql = `
    SELECT id, date, name, location, picture_url, picture_caption,
    CASE 
        WHEN LENGTH(description) > 100 
        THEN CONCAT(SUBSTRING(description, 1, 100), '...') 
        ELSE description 
    END AS truncated_description
    FROM events
    ORDER BY date DESC
    LIMIT 5
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readOne = async (articleID) => {
  const sql = `
    SELECT id, date, name, location, description, picture_url, picture_caption
    FROM events
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [articleID]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error }
  }
}

const update = async (name, location, description, articleID) => {
  const sql = `
    UPDATE events
    SET name = ?, location = ?, description = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [name, location, description, articleID])
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't update article`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const deleteOne = async (articleID) => {
  const sql = `
    DELETE FROM events
    WHERE id = ?
  `;

  const imgPathSql = `
    SELECT picture_url
    FROM events
    WHERE id = ?
  `;

  let result = [];
  let imgPathResult = [];
  let error = null;
  try {
    imgPathResult = await query(imgPathSql, [articleID]);
    result = await query(sql, [articleID]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't delete article`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, imgPathResult, error };
  }
}

export const ArticleDB = {
  create,
  readAll,
  read,
  readOne,
  update,
  deleteOne
}