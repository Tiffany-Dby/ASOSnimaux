import { APP_ROUTES } from "../constants/route.const";
import { resetFormNewAnimal, setAllAnimals, setAllAnimalsError, setDeleteAnimal, setDeleteAnimalError, setNewAnimal, setNewAnimalError, setOneAnimal, setOneAnimalError, setSelectedwAnimalError, setUpdateExitDate, setUpdateSelectedAnimal, startAllAnimalsLoading, startDeleteAnimalLoading, startNewAnimalLoading, startOneAnimalLoading, startSelectedAnimalLoading } from "../redux/reducers/animal.reducer";
import { setFormData } from "../utils/formidable.utils";
import { getFromStorage } from "../utils/storage.utils";
import { showToast } from "../utils/toast.utils";
import { deleteRequest, getRequest, postRequest, putRequest } from "./api";


export const getAllAnimalsThunk = () => async (dispatch, getState) => {
  const { allAnimalsLoading } = getState().animalReducer;
  if (allAnimalsLoading) return;

  dispatch(startAllAnimalsLoading());

  const { result, error, status } = await getRequest("animals/all");
  if (!result?.message || status >= 400 || !!error) return dispatch(setAllAnimalsError({ error: `Something went wrong : ${error}` }));

  dispatch(setAllAnimals({ all: result.result }));
}

export const getOneAnimalThunk = (id) => async (dispatch, getState) => {
  const { oneAnimalLoading } = getState().animalReducer;
  if (oneAnimalLoading) return;

  dispatch(startOneAnimalLoading());

  const { result, error, status } = await getRequest(`animals/${id}`);
  if (!result?.message || status >= 400 || !!error) return dispatch(setOneAnimalError({ error: `Something went wrong : ${error}` }));

  dispatch(setOneAnimal({
    id: result.animal.id,
    entry_date: result.animal.entryDate,
    name: result.animal.name,
    birthdate: result.animal.birthdate,
    age: result.animal.age,
    birthday: result.animal.birthday,
    sex: result.animal.sex,
    description: result.animal.description,
    race: result.animal.race,
    status: result.animal.status,
    exit_date: result.animal.exitDate,
    species: result.animal.species,
    picture_url: `${APP_ROUTES.API_URL}${result.animal.pictureURL}`,
    picture_caption: result.animal.pictureCaption,
    time_spent: result.animal.timeSpent
  }));
}

export const postNewAnimalThunk = (file) => async (dispatch, getState) => {
  const { animals, newAnimalLoading } = getState().animalReducer;
  const { newAnimal, all } = animals;
  const token = getFromStorage("token");
  if (newAnimalLoading) return;

  const fd = setFormData({
    ...newAnimal,
    newAnimalImg: file
  });

  dispatch(startNewAnimalLoading());

  const { result, error, status } = await postRequest("animals", fd, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setNewAnimalError({ error: `Something went wrong : ${error}` }));

  dispatch(setNewAnimal({
    id: result.animal[0].id,
    entry_date: result.animal[0].entry_date,
    exit_date: result.animal[0].exit_date,
    name: result.animal[0].name,
    birthdate: result.animal[0].birthdate,
    age: result.animal[0].age,
    sex: result.animal[0].sex,
    description: result.animal[0].description,
    status: result.animal[0].status,
    race: result.animal[0].race,
    species: result.animal[0].species,
    picture_url: result.animal[0].picture_url,
    picture_caption: result.animal[0].picture_caption,
  }));

  showToast(dispatch);
  dispatch(resetFormNewAnimal());
}

export const updateAnimalThunk = () => async (dispatch, getState) => {
  const { animals, selectedAnimalLoading } = getState().animalReducer;
  const { selectedAnimal } = animals;
  const token = getFromStorage("token");
  if (selectedAnimalLoading) return;

  dispatch(startSelectedAnimalLoading());

  const { result, error, status } = await putRequest("animals", selectedAnimal, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSelectedwAnimalError({ error: `Something went wrong : ${error}` }));

  dispatch(setUpdateSelectedAnimal({
    animal: {
      id: result.updatedAnimal[0].id,
      entry_date: result.updatedAnimal[0].entry_date,
      name: result.updatedAnimal[0].name,
      birthdate: result.updatedAnimal[0].birthdate,
      age: result.updatedAnimal[0].age,
      sex: result.updatedAnimal[0].sex,
      description: result.updatedAnimal[0].description,
      race: result.updatedAnimal[0].race,
      status: result.updatedAnimal[0].status,
      exit_date: result.updatedAnimal[0].exit_date,
      species: result.updatedAnimal[0].species,
      picture_url: result.updatedAnimal[0].picture_url,
      picture_caption: result.updatedAnimal[0].picture_caption
    }
  }));

  showToast(dispatch);
}

export const updateAnimalExitDateThunk = () => async (dispatch, getState) => {
  const { animals, selectedAnimalLoading } = getState().animalReducer;
  const { selectedAnimal } = animals;
  const token = getFromStorage("token");
  if (selectedAnimalLoading) return;

  dispatch(startSelectedAnimalLoading());

  const formatExpectedOnRequest = {
    id: selectedAnimal.id,
    exitDate: selectedAnimal.exit_date
  }

  const { result, error, status } = await putRequest("animals/exitDate", formatExpectedOnRequest, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSelectedwAnimalError({ error: `Something went wrong : ${error}` }));

  dispatch(setUpdateExitDate({ animal: result.updatedExitDate[0] }));
  showToast(dispatch);
}

export const deleteAnimalThunk = () => async (dispatch, getState) => {
  const { deleteAnimalLoading, animals } = getState().animalReducer;
  const { selectedAnimal } = animals;
  const token = getFromStorage("token");
  if (deleteAnimalLoading) return;

  dispatch(startDeleteAnimalLoading());

  const { result, error, status } = await deleteRequest(`animals/${selectedAnimal.id}`, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setDeleteAnimalError({ error: `Something went wrong : ${error}` }));

  dispatch(setDeleteAnimal({ id: selectedAnimal.id }));
  showToast(dispatch);
}