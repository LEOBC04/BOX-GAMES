import axios from "axios";
import { getGenres } from "../slices/genreSlice";

const fetchAllGenres = () => (dispatch) => {
  axios
    .get("http://localhost:3001/genres")
    .then((response) => dispatch(getGenres(response.data)))
    .catch((error) => console.log(error));
};


export { fetchAllGenres }
