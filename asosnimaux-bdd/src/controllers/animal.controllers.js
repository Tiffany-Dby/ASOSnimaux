import { AnimalDB } from "../databases/animal.db.js";
import { areStringsFilled } from "../utils/string.utils.js";

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
  const response = await AnimalDB.readOne(id);
  const { result, error } = response;

  const animal = {
    id,
    entryDate: result[0].entry_date,
    name: result[0].name,
    age: result[0].age,
    sex: result[0].sex,
    description: result[0].description,
    race: result[0].race,
    status: result[0].status,
    exitDate: result[0].exit_date,
    species: result[0].species
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request for animal with id: ${id} successful`, animal });
}

const create = async (req, res) => {
  const { name, age, sex, description, race, status, species } = req.body;
  const areStrings = areStringsFilled([name, sex, description, status, species])

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  const response = await AnimalDB.create(name, age, sex, description, race, status, species);

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `New animal successfully added to the table`, result });
}

const updateDetails = async (req, res) => {
  const { name, age, sex, description, race, status, species, id } = req.body;

  const areStrings = areStringsFilled([name, sex, description, status, species])

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  const response = await AnimalDB.updateDetails(name, age, sex, description, race, status, species, id);

  const error = response.error;
  const updatedAnimal = response.result.result;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Animal's details with id: ${id} has been updated`, updatedAnimal });
}

const updateExitDate = async (req, res) => {
  const { exitDate, id } = req.body;

  // Verif de date à faire

  const response = await AnimalDB.updateExitDate(exitDate, id);

  const error = response.error;
  const updatedExitDate = response.result.result;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Animal's exit_date with id: ${id} has been updated`, updatedExitDate });
}

const deleteOne = async ({ params: { id } }, res) => {
  const reponse = await AnimalDB.deleteOne(id);

  const { result, error } = reponse;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Animal with id: ${id} has been successfully deleted`, result });
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