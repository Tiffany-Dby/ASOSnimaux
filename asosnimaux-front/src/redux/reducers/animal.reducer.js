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
      picture_caption: "",
      time_spent: ""
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
      id: "",
      age: "",
      name: "",
      sex: "",
      description: "",
      race: "",
      status: "",
      species: "",
      exit_date: ""
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
  selectedAnimalSuccess: false,
  selectedAnimalError: null,
  deleteAnimalLoading: false,
  deleteAnimalSuccess: null,
  deleteAnimalError: null
}

const animalSlice = createSlice({
  name: "animal",
  initialState: ANIMAL_STATE,
  reducers: {
    setOneAnimal: (state, action) => {
      const { id, entry_date, name, age, sex, description, race, status, exit_date, species, picture_url, picture_caption, time_spent } = action.payload;
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
            exit_date,
            species,
            picture_url,
            picture_caption,
            time_spent
          }
        },
        oneAnimalLoading: false
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
    },
    resetAnimalsSuccess: (state, action) => {
      return {
        ...state,
        newAnimalSuccess: null,
        selectedAnimalSuccess: null,
        deleteAnimalSuccess: null
      }
    },
    setSelectedAnimal: (state, action) => {
      const { id, age, name, sex, description, race, status, species, exit_date } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          selectedAnimal: {
            id,
            age,
            name,
            sex,
            description,
            race,
            status,
            species,
            exit_date
          }
        }
      }
    },
    updateFormSelectedAnimal: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          selectedAnimal: {
            ...state.animals.selectedAnimal,
            [input]: value
          }
        }
      }
    },
    setUpdateSelectedAnimal: (state, action) => {
      const { animal } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          all: state.animals.all.map((a) => a.id === animal.id ? { ...animal } : { ...a })
        },
        selectedAnimalLoading: false,
        selectedAnimalSuccess: `${animal.name} mis à jour !`
      }
    },
    startSelectedAnimalLoading: (state, action) => {
      return {
        ...state,
        selectedAnimalLoading: true
      }
    },
    stopSelectedAnimalLoading: (state, action) => {
      return {
        ...state,
        selectedAnimalLoading: false
      }
    },
    setSelectedwAnimalError: (state, action) => {
      return {
        ...state,
        selectedAnimalError: action.payload.error,
        selectedAnimalLoading: false
      }
    },
    setDeleteAnimal: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          all: state.animals.all.filter(animal => animal.id !== id)
        },
        deleteAnimalLoading: false,
        deleteAnimalSuccess: "Animal supprimé !"
      }
    },
    startDeleteAnimalLoading: (state, action) => {
      return {
        ...state,
        deleteAnimalLoading: true
      }
    },
    stopDeleteAnimalLoading: (state, action) => {
      return {
        ...state,
        deleteAnimalLoading: false
      }
    },
    setDeleteAnimalError: (state, action) => {
      return {
        ...state,
        deleteAnimalError: action.payload.error,
        deleteAnimalLoading: false
      }
    }
  }
});

export const { setOneAnimal, startOneAnimalLoading, stopOneAnimalLoading, setOneAnimalError, setAllAnimals, startAllAnimalsLoading, stopAllAnimalsLoading, setAllAnimalsError, updateFormNewAnimal, resetFormNewAnimal, setNewAnimal, startNewAnimalLoading, stopNewAnimalLoading, setNewAnimalError, resetAnimalsSuccess, setSelectedAnimal, updateFormSelectedAnimal, setUpdateSelectedAnimal, startSelectedAnimalLoading, stopSelectedAnimalLoading, setSelectedwAnimalError, setDeleteAnimal, startDeleteAnimalLoading, stopDeleteAnimalLoading, setDeleteAnimalError } = animalSlice.actions;
export default animalSlice.reducer;