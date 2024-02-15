import query from "./init.db.js";
import { v4 as uuidv4 } from "uuid";

const create = async (name, age, sex, description, race = "inconnue", status, species, picture_url, picture_caption) => {
  const sql = `
    INSERT INTO animals (id, name, age, sex, description, race, status, species, picture_url, picture_caption)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  let result = [];
  let insertedId = [];
  let error = null;
  try {
    const id = uuidv4();

    result = await query(sql, [id, name, age, sex, description, race, status, species, picture_url, picture_caption])
    insertedId = id;
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error, insertedId };
  }
}

const readAllForAdoption = async () => {
  const sql = `
    SELECT entry_date, name, age, sex, description, race, status, exit_date, species, picture_url, picture_caption
    FROM animals
    WHERE exit_date is NULL
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

const readAllBySpeciesForAdoption = async (species) => {
  const sql = `
    SELECT id, entry_date, name, age, sex, description, race, status, exit_date, species, picture_url, picture_caption
    FROM animals
    WHERE species = ? AND exit_date is NULL
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [species]);
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
    SELECT id, entry_date, name, age, sex, description, race, status, exit_date, species, picture_url, picture_caption
    FROM animals
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

const readAllBySpecies = async (species) => {
  const sql = `
    SELECT id, entry_date, name, age, sex, description, race, status, exit_date, species, picture_url, picture_caption
    FROM animals
    WHERE species = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [species]);
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
    SELECT id, entry_date, name, age, sex, description, race, status, exit_date, species, picture_url, picture_caption
    FROM animals
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
    return { error, result };
  }
}

const updateDetails = async (name, age, sex, description, race = "inconnue", status, species, id) => {
  const sql = `
    UPDATE animals
    SET name = ?, age = ?, sex = ?, description = ?, race = ?, status = ?, species = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    await query(sql, [name, age, sex, description, race, status, species, id]);

    result = await readOne(id);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const updateExitDate = async (exitDate, id) => {
  const sql = `
    UPDATE animals
    SET exit_date = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    await query(sql, [exitDate, id]);

    result = await readOne(id);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const deleteOne = async (id) => {
  const sql = `
    DELETE FROM animals
    WHERE id = ?
  `;

  const usersFollowSql = ``;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't delete animal`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

export const AnimalDB = {
  create,
  readAllForAdoption,
  readAllBySpeciesForAdoption,
  readAll,
  readAllBySpecies,
  readOne,
  updateDetails,
  updateExitDate,
  deleteOne
}