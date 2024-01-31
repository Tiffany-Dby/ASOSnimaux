import query from "./init.db.js";
import { v4 as uuidv4 } from "uuid";

const create = async (name, location = "ASOS'nimaux", description, pictureURL = "/articles/equipe.jpg", pictureCaption = "Une femme et son chien", userID) => {
  const sql = `
    INSERT INTO events (id, date, name, location, description, picture_url, picture_caption, user_id)
    VALUES (?, NOW(), ?, ?, ?, ?, ?, ?)
  `;

  let result = [];
  let error = null;
  try {
    const id = uuidv4();
    result = await query(sql, [id, name, location, description, pictureURL, pictureCaption, userID]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
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
    console.log(articleID);
    result = await query(sql, [name, location, description, articleID])
    console.log("result db :", result);
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

  let result = [];
  let error = null;
  try {
    result = await query(sql, [articleID])
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
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