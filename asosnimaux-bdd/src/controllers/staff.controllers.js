import { StaffDB } from "../databases/staff.db.js";
import { areStringsFilled } from "../utils/string.utils.js";

const create = async ({ body: { lastName, firstName, presentation, status, staffRole, userId } }, res) => {
  const areStrings = areStringsFilled([lastName, firstName, presentation, status, staffRole])

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  const response = await StaffDB.create(lastName, firstName, presentation, status, staffRole, userId);

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `New staff successfuly created`, result });
}

const readAll = async (req, res) => {
  const response = await StaffDB.readAll();

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on all staff successful`, result });
}

const readOne = async ({ params: { staffID } }, res) => {
  const response = await StaffDB.readOne(staffID);

  const { result, error } = response;

  const staff = {
    staffID,
    lastName: result[0].last_name,
    firstName: result[0].first_name,
    presentation: result[0].presentation,
    status: result[0].status,
    staffRole: result[0].staff_role
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on staff with id "${staffID}" successful`, staff });
}

const readByStaffRole = async ({ params: { staffRole } }, res) => {
  const response = await StaffDB.readByStaffRole(staffRole);

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on staff with role "${staffRole}" successful`, result });
}

const readByStatus = async ({ params: { status } }, res) => {
  const response = await StaffDB.readByStatus(status);

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on staff with status "${status}" successful`, result });
}

const update = async ({ body: { lastName, firstName, presentation, status, staffRole, userId, staffID } }, res) => {
  const areStrings = areStringsFilled([lastName, firstName, presentation, status, staffRole])

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  const response = await StaffDB.update(lastName, firstName, presentation, status, staffRole, userId, staffID);

  const error = response.error;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Update on staff with id ${staffID} successful.` });
}

const deleteOne = async ({ params: { staffID } }, res) => {
  const response = await StaffDB.deleteOne(staffID);

  const error = response.error;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Staff with id "${staffID}" successfully deleted` });
}

export const StaffController = {
  create,
  readAll,
  readOne,
  readByStatus,
  readByStaffRole,
  update,
  deleteOne
}