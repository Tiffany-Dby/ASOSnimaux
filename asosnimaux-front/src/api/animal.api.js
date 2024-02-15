import { setAllAnimals, setAllAnimalsError, setNewAnimal, setNewAnimalError, startAllAnimalsLoading, startNewAnimalLoading } from "../redux/reducers/animal.reducer";
import { setFormData } from "../utils/formidable.utils";
import { getFromStorage } from "../utils/storage.utils";
import { getRequest, postRequest } from "./api";


export const getAllAnimalsThunk = () => async (dispatch, getState) => {
  const { animals, allAnimalsLoading, allAnimalsError } = getState().animalReducer;
  const { all } = animals;
  if (allAnimalsLoading) return;

  dispatch(startAllAnimalsLoading());

  const { result, error, status } = await getRequest("animals/all");
  if (!result?.message || status >= 400 || !!error) return dispatch(setAllAnimalsError({ error: `Something went wrong : ${error}` }));

  dispatch(setAllAnimals({ all: result.result }));
}

export const postNewAnimalThunk = (file) => async (dispatch, getState) => {
  const { animals, newAnimalLoading, newAnimalError } = getState().animalReducer;
  const { newAnimal, all } = animals;
  const token = getFromStorage("token");
  if (newAnimalLoading) return;

  const fd = setFormData({
    ...newAnimal,
    newAnimalImg: file
  })
  console.log(newAnimal)
  console.log(fd)

  dispatch(startNewAnimalLoading());

  const { result, error, status } = await postRequest("animals", fd, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setNewAnimalError({ error: `Something went wrong : ${error}` }));

  console.log(result)

  dispatch(setNewAnimal({
    id: result.result[0].id,
    entry_date: result.result[0].entry_date,
    exit_date: result.result[0].exit_date,
    name: result.result[0].name,
    age: result.result[0].age,
    sex: result.result[0].sex,
    description: result.result[0].description,
    status: result.result[0].status,
    race: result.result[0].race,
    species: result.result[0].species,
    picture_url: result.result[0].picture_url,
    picture_caption: result.result[0].picture_caption,
  }));
}