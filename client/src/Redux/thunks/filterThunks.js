import axios from "axios";
import { filterByGenre, orderVideogamesRequest } from "../slices/videogameSlice";

const fetchVideogamesByGenre = (genre) => (dispatch) => {
  axios
    .get(`http://localhost:3001/filter/genre?genre=${genre}`)
    .then((response) => dispatch(filterByGenre(response.data)))
    .catch((error) => console.log(error));
};

const fetchVideogamesByOrder = (order) => (dispatch) => {
  axios
    .get(`http://localhost:3001/filter/${order}`)
    .then((response) => dispatch(orderVideogamesRequest({response: response.data, order: order})))
    .catch((error) => console.log(error));
};

export { fetchVideogamesByGenre, fetchVideogamesByOrder };
