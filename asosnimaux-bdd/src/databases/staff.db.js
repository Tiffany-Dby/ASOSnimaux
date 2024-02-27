import query from "./init.db.js";
import { v4 as uuidv4 } from "uuid";

const create = async (lastName, firstName, presentation, status, staffRole, userId = null) => {
  const sql = `
    INSERT INTO staff (id, last_name, first_name, presentation, status, staff_role, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  let result = [];
  let error = null;
  try {
    const id = uuidv4();
    result = await query(sql, [id, lastName, firstName, presentation, status, staffRole, userId]);
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
    SELECT id, last_name, first_name, presentation, status, staff_role
    FROM staff
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

const readOne = async (staffID) => {
  const sql = `
    SELECT id, last_name, first_name, presentation, status, staff_role
    FROM staff
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [staffID]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readByStaffRole = async (staffRole) => {
  const sql = `
    SELECT id, last_name, first_name, presentation, status, staff_role
    FROM staff
    WHERE staff_role = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [staffRole]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readByStatus = async (status) => {
  const sql = `
    SELECT id, last_name, first_name, presentation, status, staff_role
    FROM staff
    WHERE status = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [status]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const update = async (lastName, firstName, presentation, status, staffRole, userId = null, staffID) => {
  const sql = `
    UPDATE staff
    SET last_name = ?, first_name = ?, presentation = ?, status = ?, staff_role = ?, user_id = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [lastName, firstName, presentation, status, staffRole, userId, staffID]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't update staff`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const deleteOne = async (staffID) => {
  const sql = `
    DELETE FROM staff
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [staffID]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't delete staff`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

export const StaffDB = {
  create,
  readAll,
  readOne,
  readByStaffRole,
  readByStatus,
  update,
  deleteOne
}