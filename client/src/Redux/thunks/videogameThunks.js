import axios from "axios";
import {
  getVideogames,
  getDetail,
  searchVideogame,
} from "../slices/videogameSlice.js";

const fetchAllVideogames = () => (dispatch) => {
  axios
    .get("/videogames")
    .then((response) => {
      dispatch(getVideogames(response.data));
    })
    .catch((error) => console.log(error));
};

const fetchVideogamesDetail = (id) => (dispatch) => {
  axios
    .get(`/videogames/${id}`)
    .then((response) => dispatch(getDetail(response.data)))
    .catch((error) => console.log(error));
};

const fetchVideogameByName = (name) => (dispatch) => {
  axios
    .get(`/videogames/name?name=${name}`)
    .then((response) => dispatch(searchVideogame(response.data)))
    .catch((error) => console.log(error));
};

const saveVideogame = (form) => () => {
  axios
    .post("/videogames", form)
    .catch((error) => console.log(error));
};

export {
  fetchAllVideogames,
  fetchVideogamesDetail,
  fetchVideogameByName,
  saveVideogame,
};
