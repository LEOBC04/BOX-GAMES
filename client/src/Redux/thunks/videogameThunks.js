import axios from "axios";
import {
  getVideogames,
  getDetail,
  searchVideogame
} from "../slices/videogameSlice.js";

const fetchAllVideogames = () => (dispatch) => {
  axios
    .get("http://localhost:3001/videogames")
    .then((response) => {
      dispatch(getVideogames(response.data));
    })
    .catch((error) => console.log(error));
};

const fetchVideogamesDetail = (id) => (dispatch) => {
  axios
    .get(`http://localhost:3001/videogames/${id}`)
    .then((response) => dispatch(getDetail(response.data)))
    .catch((error) => console.log(error));
};

const fetchVideogameByName = (name) => (dispatch) => {
  axios
    .get(`http://localhost:3001/videogames/name?name=${name}`)
    .then((response) => dispatch(searchVideogame(response.data)))
    .catch((error) => console.log(error));
};

export { fetchAllVideogames, fetchVideogamesDetail, fetchVideogameByName };
