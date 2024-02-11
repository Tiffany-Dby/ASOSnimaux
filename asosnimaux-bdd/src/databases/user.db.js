import query from "./init.db.js";
import { v4 as uuidv4 } from "uuid";

const create = async (username, email, password) => {
  const sql = `
    INSERT INTO users (id, username, email, password)
    VALUES (?, ?, ?, ?)
  `;

  let result = [];
  let error = null;
  try {
    const id = uuidv4();

    result = await query(sql, [id, username, email, password]);
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
    SELECT id, username, email, user_role
    FROM users
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

const followAnimal = async (userID, animalID) => {
  const sql = `
    INSERT INTO users_animals (user_id, animal_id)
    VALUES (?, ?)
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [userID, animalID]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readOne = async (id) => {
  const sql = `
    SELECT id, username, email, password, avatar_url, user_role
    FROM users
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [id]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readByEmailOrUsername = async (emailOrUsername) => {
  const sql = `
    SELECT id, username, email, password, avatar_url, user_role
    FROM users
    WHERE (
      email = ? OR username = ?
    )
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [emailOrUsername, emailOrUsername]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readUsersTestimonies = async (userID) => {
  const sql = `
    SELECT users.id, username, testimonies.id, content, date
    FROM users
    LEFT JOIN testimonies ON testimonies.user_id = users.id
    WHERE users.id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [userID]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readUsersFollow = async (userID) => {
  const sql = `
    SELECT users.id, users.username, animals.id, animals.entry_date, animals.name, animals.age, animals.sex, animals.description, animals.race, animals.status, animals.exit_date, animals.species
    FROM users
    LEFT JOIN users_animals ON users.id = users_animals.user_id
    LEFT JOIN animals ON animals.id = users_animals.animal_id
    WHERE users.id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [userID]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const updateUsername = async (username, id) => {
  const sql = `
    UPDATE users
    SET username = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [username, id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't update username`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const updatePassword = async (newPassword, id) => {
  const sql = `
    UPDATE users
    SET password = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [newPassword, id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't update password`);
  }
  finally {
    return { result, error };
  }
}

const updateAvatar = async (avatarUrl, id) => {
  const sql = `
    UPDATE users
    SET avatar_url = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [avatarUrl, id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't update avatar`);
  }
  finally {
    return { result, error };
  }
}

const updateRole = async (newRole, id) => {
  const sql = `
    UPDATE users
    SET user_role = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [newRole, id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't update password`);
  }
  finally {
    return { result, error };
  }
}

const updateEmail = () => {

}

const unfollow = async (userID, animalID) => {
  const sql = `
    DELETE from users_animals
    WHERE user_id = ? AND animal_id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [userID, animalID]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't unfollow`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const deleteOne = async (id) => {
  const testimoniesSql = `
    DELETE FROM testimonies
    WHERE user_id = ?
  `;

  const usersAnimalsSql = `
    DELETE FROM users_animals
    WHERE user_id = ?
  `;

  const sql = `
    DELETE FROM users
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    await query(testimoniesSql, [id]);
    await query(usersAnimalsSql, [id]);

    result = await query(sql, [id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't delete user`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

export const UserDB = {
  create,
  readAll,
  followAnimal,
  readOne,
  readByEmailOrUsername,
  readUsersTestimonies,
  readUsersFollow,
  updateUsername,
  updatePassword,
  updateAvatar,
  updateRole,
  unfollow,
  deleteOne
}