import query from "./init.db.js";
import { v4 as uuidv4 } from "uuid";

const create = async (content, userID) => {
  const userRoleSql = `
    SELECT user_role
    FROM users
    WHERE id = ?
  `;

  const sql = `
    INSERT INTO testimonies (id, content, user_id)
    VALUES (?, ?, ?)
  `;

  let result = [];
  let insertedId = [];
  let error = null;
  try {
    const isUserMember = await query(userRoleSql, [userID]);

    if (isUserMember[0].user_role !== "super_admin" && isUserMember[0].user_role !== "admin" && isUserMember[0].user_role !== "membre") throw new Error(`Something went wrong : You have to atleast be a member to post a testimony.`);

    const id = uuidv4();
    result = await query(sql, [id, content, userID])
    insertedId = id;
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error, insertedId };
  }
}

const readAllWithTheirUsername = async () => {
  const sql = `
    SELECT testimonies.id, testimonies.content, testimonies.date, testimonies.user_id, users.username
    FROM testimonies
    LEFT JOIN users ON testimonies.user_id = users.id
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql)
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}
const readWithTheirUsername = async () => {
  const sql = `
    SELECT testimonies.id, testimonies.content, testimonies.date, testimonies.user_id, users.username, users.avatar_url,
    CASE 
        WHEN LENGTH(testimonies.content) > 150 
        THEN CONCAT(SUBSTRING(testimonies.content, 1, 150), '...') 
        ELSE testimonies.content 
    END AS truncated_content
    FROM testimonies
    LEFT JOIN users ON testimonies.user_id = users.id
    ORDER BY date DESC
    LIMIT 4
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql)
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readOneWithTheirUsername = async (testimonyID) => {
  const sql = `
    SELECT testimonies.id, testimonies.content, testimonies.date, testimonies.user_id, users.username, users.avatar_url,
    CASE 
        WHEN LENGTH(testimonies.content) > 150 
        THEN CONCAT(SUBSTRING(testimonies.content, 1, 150), '...') 
        ELSE testimonies.content 
    END AS truncated_content
    FROM testimonies
    LEFT JOIN users ON testimonies.user_id = users.id
    WHERE testimonies.id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [testimonyID]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const update = async (content, testimonyID, userID) => {
  const sql = `
    UPDATE testimonies
    SET content = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    await isUserAuthor(testimonyID, userID);
    result = await query(sql, [content, testimonyID]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't update testimony`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const deleteOne = async (testimonyID, userID) => {
  const sql = `
    DELETE from testimonies
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    await isUserAuthor(testimonyID, userID);
    result = await query(sql, [testimonyID]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't delete testimony`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const isUserAuthor = async (testimonyID, userID) => {
  const testimonySql = `
    SELECT testimonies.id, testimonies.user_id
    FROM testimonies
    WHERE testimonies.id = ?
  `;

  const testimonyResponse = await query(testimonySql, [testimonyID]);
  const error = testimonyResponse.error;
  if (error) throw new Error(error);

  const testimony = testimonyResponse[0];

  if (testimony.user_id !== userID) throw new Error(`Something went wrong : User with id ${userID} isn't the author of testimony with id ${testimonyID}`);
}

export const TestimonyDB = {
  create,
  readAllWithTheirUsername,
  readWithTheirUsername,
  readOneWithTheirUsername,
  update,
  deleteOne
}