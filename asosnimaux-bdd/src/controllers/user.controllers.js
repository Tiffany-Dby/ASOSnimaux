import { UserDB } from "../databases/user.db.js";
import isEmail from "validator/lib/isEmail.js";
import { areStringsFilled } from "../utils/string.utils.js";
import { hashPass, compareHash } from "../utils/crypto.utils.js";
import { jwtSign } from "../utils/jwt.utils.js";

const create = async ({ body: { username, email, password } }, res) => {
  const areStrings = areStringsFilled([username, email, password]);

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (username.length < 4 || username.length > 21) return res.status(403).json({ message: `Invalid Username format : must be between 4 and 21 characters` });

  if (!isEmail(email)) return res.status(403).json({ message: `Invalid Email format` });

  if (password.length < 8) return res.status(403).json({ message: `Invalid Password format : must contain atleast 8 characters` })

  const hashPwResponse = await hashPass(password);
  const hashPwError = hashPwResponse.error;

  if (hashPwError) return res.status(500).json({ message: hashPwError });

  const response = await UserDB.create(username, email, hashPwResponse.hashed);
  const error = response.error;

  return res.status(error ? 500 : 201).json({ message: error ? error : `New user successfully created` });
}

const followAnimal = async ({ body: { userID, animalID }, res }) => {
  const response = await UserDB.followAnimal(userID, animalID);
  const error = response.error;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Adding animal with id : ${animalID} to favorite for user with id : ${userID} successful` });
}

const readOne = async ({ body: { userID } }, res) => {
  const response = await UserDB.readOne(userID);
  const { result, error } = response;

  const user = {
    userID: result[0].id,
    username: result[0].username,
    email: result[0].email,
    userRole: result[0].user_role
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on user ${userID} successful`, user });
}

const signIn = async ({ body: { login, password } }, res) => {
  const { result, error } = await UserDB.readByEmailOrUsername(login);

  if (error) return res.status(500).json({ message: error });

  if (result.length === 0) return res.status(401).json({ message: `Authentication failed` });

  const user = result[0];
  const userID = user.id;
  const pwDB = user.password;
  const username = user.username;
  const email = user.email;
  const userRole = user.user_role;

  const arePwSame = await compareHash(password, pwDB);

  if (!arePwSame) return res.status(401).json({ message: `Authentication failed, check username/mail and password.` });

  const token = jwtSign(userID);

  return res.status(200).json({ message: `Authentication succeeded`, user: { userID, username, email, userRole, token } })
}

const readUsersTestimonies = async ({ body: { userID } }, res) => {
  const response = await UserDB.readUsersTestimonies(userID);
  const { result, error } = response;

  if (result[0].id === null) return res.status(error ? 500 : 200).json({ message: error ? error : `User with id ${userID} didn't post any testimony.` });

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request to read all testimonies from user with id ${userID} successful`, result });
}

const readUsersFollow = async ({ body: { userID } }, res) => {
  const response = await UserDB.readUsersFollow(userID);
  const { result, error } = response;

  if (result[0].id === null) return res.status(error ? 500 : 200).json({ message: error ? error : `User with id ${userID} didn't follow any animal.` });

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request for all animals followed by user with id "${userID}" successful`, result });
}

const updateUsername = async ({ body: { username, userID } }, res) => {
  const areStrings = areStringsFilled([username]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (username.length < 4 || username.length > 21) return res.status(403).json({ message: `Invalid Username format : must be between 4 and 16 characters` });

  const response = await UserDB.updateUsername(username, userID);
  const error = response.error;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Update on username for user with id "${userID}" successful` });
}

const updatePassword = async ({ body: { oldPassword, newPassword, userID } }, res) => {
  const areStrings = areStringsFilled([oldPassword, newPassword]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (newPassword.length < 8) return res.status(403).json({ message: `Invalid Password format : must contain atleast 8 characters` })

  const userResponse = await UserDB.readOne(userID);
  const userOldPwDB = userResponse.result[0].password;

  const arePwSame = await compareHash(oldPassword, userOldPwDB);
  if (!arePwSame) return res.status(401).json({ message: `Password doesn't match old password` });

  const hashPwResponse = await hashPass(newPassword);
  const hashPwError = hashPwResponse.error;

  if (hashPwError) return res.status(500).json({ message: hashPwError });

  const response = await UserDB.updatePassword(hashPwResponse.hashed, userID);
  const error = response.error;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Update on password for user with id "${userID}" successful` });
}

const unfollow = async ({ body: { userID }, params: { animalID } }, res) => {
  const response = await UserDB.unfollow(userID, animalID);

  const error = response.error;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request from user with id ${userID} to unfollow animal with id ${animalID} successful` });
}

const deleteOne = async ({ params: { id }, body: { userID } }, res) => {
  const response = await UserDB.deleteOne(id);
  const error = response.error;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request to delete user with id "${userID}" successful` });
}

export const UserController = {
  create,
  followAnimal,
  readOne,
  signIn,
  readUsersTestimonies,
  readUsersFollow,
  updateUsername,
  updatePassword,
  unfollow,
  deleteOne
}