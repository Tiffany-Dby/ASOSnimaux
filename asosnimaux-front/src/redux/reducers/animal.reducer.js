import { createSlice } from "@reduxjs/toolkit";

const ANIMAL_STATE = {
  animals: {
    all: [],
    one: {
      id: "",
      entry_date: "",
      name: "",
      age: "",
      sex: "",
      description: "",
      race: "",
      status: "",
      exit_date: "",
      species: "",
      picture_url: "",
      picture_caption: ""
    },
    newAnimal: {
      name: "",
      age: "",
      sex: "",
      description: "",
      status: "",
      race: null,
      species: "",
      picture_caption: ""
    },
    selectedAnimal: {

    }
  },
  allAnimalsLoading: false,
  allAnimalsError: null,
  oneAnimalLoading: false,
  oneAnimalError: null,
  newAnimalLoading: false,
  newAnimalSuccess: null,
  newAnimalError: null,
  selectedAnimalLoading: false,
  selectedAnimalError: null,
}

const animalSlice = createSlice({
  name: "animal",
  initialState: ANIMAL_STATE,
  reducers: {
    setOneAnimal: (state, action) => {
      const { id, entry_date, name, age, sex, description, race, status, exit, species, picture_url, picture_caption } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          one: {
            id,
            entry_date,
            name,
            age,
            sex,
            description,
            race,
            status,
            exit,
            species,
            picture_url,
            picture_caption
          }
        }
      }
    },
    startOneAnimalLoading: (state, action) => {
      return {
        ...state,
        oneAnimalLoading: true
      }
    },
    stopOneAnimalLoading: (state, action) => {
      return {
        ...state,
        oneAnimalLoading: false
      }
    },
    setOneAnimalError: (state, action) => {
      return {
        ...state,
        oneAnimalError: action.payload.error,
        oneAnimalLoading: false
      }
    },
    setAllAnimals: (state, action) => {
      return {
        ...state,
        animals: {
          ...state.animals,
          all: action.payload.all
        },
        allAnimalError: null,
        allAnimalLoading: false
      }
    },
    startAllAnimalsLoading: (state, action) => {
      return {
        ...state,
        allAnimalLoading: true
      }
    },
    stopAllAnimalsLoading: (state, action) => {
      return {
        ...state,
        allAnimalLoading: false
      }
    },
    setAllAnimalsError: (state, action) => {
      return {
        ...state,
        allAnimalError: action.payload.error,
        allAnimalLoading: false
      }
    },
    updateFormNewAnimal: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          newAnimal: {
            ...state.animals.newAnimal,
            [input]: value
          }
        }
      }
    },
    resetFormNewAnimal: (state, action) => {
      return {
        ...state,
        animals: {
          ...state.animals,
          newAnimal: {
            name: "",
            age: "",
            sex: "",
            description: "",
            status: "",
            race: null,
            species: "",
            picture_caption: ""
          }
        }
      }
    },
    setNewAnimal: (state, action) => {
      const { id, entry_date, exit_date, name, age, sex, description, status, race, species, picture_url, picture_caption } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          all: [
            ...state.animals.all,
            {
              id,
              entry_date,
              exit_date,
              name,
              age,
              sex,
              description,
              status,
              race,
              species,
              picture_url,
              picture_caption
            }
          ]
        },
        newAnimalError: null,
        newAnimalLoading: false,
        newAnimalSuccess: "Animal ajouté !"
      }
    },
    startNewAnimalLoading: (state, action) => {
      return {
        ...state,
        newAnimalLoading: true
      }
    },
    stopNewAnimalLoading: (state, action) => {
      return {
        ...state,
        newAnimalLoading: false
      }
    },
    setNewAnimalError: (state, action) => {
      return {
        ...state,
        newAnimalError: action.payload.error,
        newAnimalLoading: false
      }
    }
  }
});

export const { setOneAnimal, startOneAnimalLoading, stopOneAnimalLoading, setOneAnimalError, setAllAnimals, startAllAnimalsLoading, stopAllAnimalsLoading, setAllAnimalsError, updateFormNewAnimal, resetFormNewAnimal, setNewAnimal, startNewAnimalLoading, stopNewAnimalLoading, setNewAnimalError } = animalSlice.actions;
export default animalSlice.reducer;