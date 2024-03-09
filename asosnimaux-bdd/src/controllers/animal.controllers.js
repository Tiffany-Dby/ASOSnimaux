import { AnimalDB } from "../databases/animal.db.js";
import { areStringsFilled } from "../utils/string.utils.js";
import { deleteImg, deleteImgs, getFormidableForm, setImgUrl } from "../utils/formidable.utils.js";
import isDate from "validator/lib/isDate.js";
import isUUID from "validator/lib/isUUID.js";
import DATE from "../constants/date.const.js";
import UUID from "../constants/uuid.const.js";
import { resizeAndFormatImg } from "../utils/sharp.utils.js";

const create = async (req, res) => {
  const errors = {};
  const form = await getFormidableForm("animals", 5, req);
  const { files, fields } = form;

  const formErr = form.error;
  if (formErr) errors.formError = formErr;

  if (!files.newAnimalImg) return res.status(415).json({ message: "Something went wrong with the image" });

  const { filepath } = files.newAnimalImg[0];

  const processedImg = await resizeAndFormatImg(filepath, "animals", "webp", 650, null);

  const processedImgErr = processedImg.error;
  if (processedImgErr) errors.processedImgError = processedImgErr;

  const picture_url = processedImg.result;
  const { name, birthdate, sex, description, race, status, species, picture_caption } = fields;

  const areStrings = areStringsFilled([name[0], birthdate[0], sex[0], description[0], race[0], status[0], species[0], picture_url, picture_caption[0]]);
  if (!areStrings) errors.areStringsError = "Missing data";

  const { formError, processedImgError, areStringsError, UUIDError } = errors;

  if (formError || processedImgError || areStringsError || UUIDError) {
    if (processedImgError) {
      const e = await deleteImg(setImgUrl(filepath, "animals"));
      if (e) return res.status(403).json({ message: e });
    }
    else {
      const e = await deleteImgs(picture_url, filepath, "animals");
      if (e.newErr || e.oldErr) return res.status(403).json({ message: e });
    }

    return res.status(500).json({ message: errors });
  }

  const response = await AnimalDB.create(name, birthdate, sex, description, race, status, species, picture_url, picture_caption);
  const { result, error, insertedId } = response;
  if (error) errors.error = error;

  if (error || result.affectedRows !== 1) {
    const e = await deleteImg(picture_url)
    if (e) return res.status(403).json({ message: e });
  }

  const createdAnimal = await AnimalDB.readOne(insertedId);
  const err = createdAnimal.error;
  const rslt = createdAnimal.result;
  if (err) errors.err = err;

  const e = await deleteImg(setImgUrl(filepath, "animals"));
  if (e) return res.status(403).json({ message: e });

  return res.status(!!Object.keys(errors).length ? 500 : 200).json({ message: !!Object.keys(errors).length ? errors : `New animal successfully added`, animal: rslt });
}

const readAllForAdoption = async (req, res) => {
  const response = await AnimalDB.readAllForAdoption();
  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request for all animals on adoption successful`, result });
}

const readAllBySpeciesForAdoption = async ({ params: { species } }, res) => {
  const response = await AnimalDB.readAllBySpeciesForAdoption(species);

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request for all ${species} on adoption successful`, result })
}

const readAll = async (req, res) => {
  const response = await AnimalDB.readAll();
  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request for all animals successful`, result });
}

const readAllBySpecies = async ({ params: { species } }, res) => {
  const response = await AnimalDB.readAllBySpecies(species);

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request for all ${species} successful`, result });
}

const readOne = async ({ params: { id } }, res) => {
  if (!isUUID(id, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const response = await AnimalDB.readOne(id);
  const { result, error } = response;

  const animal = {
    id,
    entryDate: result[0].entry_date,
    name: result[0].name,
    birthdate: result[0].birthdate,
    age: result[0].age,
    birthday: result[0].birthday,
    sex: result[0].sex,
    description: result[0].description,
    race: result[0].race,
    status: result[0].status,
    exitDate: result[0].exit_date,
    species: result[0].species,
    pictureURL: result[0].picture_url,
    pictureCaption: result[0].picture_caption,
    timeSpent: result[0].time_spent
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request for animal with id: ${id} successful`, animal });
}

const updateDetails = async (req, res) => {
  const { name, birthdate, sex, description, race, status, species, id } = req.body;

  if (!isUUID(id, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  if (!isDate(birthdate, DATE.OPTIONS)) return res.status(400).json({ error: "Invalid date format" });

  const areStrings = areStringsFilled([name, birthdate, sex, description, race, status, species])
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  const response = await AnimalDB.updateDetails(name, birthdate, sex, description, race, status, species, id);

  const error = response.error;
  const updatedAnimal = response.result.result;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Animal's details with id: ${id} has been updated`, updatedAnimal });
}

const updateExitDate = async ({ body: { exitDate, id } }, res) => {
  if (!isDate(exitDate, DATE.OPTIONS)) return res.status(400).json({ error: "Invalid date format" });
  if (!isUUID(id, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const response = await AnimalDB.updateExitDate(exitDate, id);

  const error = response.error;
  const updatedExitDate = response.result.result;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Animal's exit_date with id: ${id} has been updated`, updatedExitDate });
}

const deleteOne = async ({ params: { id } }, res) => {
  if (!isUUID(id, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const response = await AnimalDB.deleteOne(id);

  const { imgPathResult, error } = response;

  const err = await deleteImg(imgPathResult[0].picture_url);
  if (err) return res.status(403).json({ message: err });

  return res.status(error ? 500 : 200).json({ message: error ? error : `Animal with id: ${id} has been successfully deleted` });
}

export const AnimalController = {
  readAllForAdoption,
  readAllBySpeciesForAdoption,
  readAll,
  readAllBySpecies,
  readOne,
  create,
  updateDetails,
  updateExitDate,
  deleteOne
}