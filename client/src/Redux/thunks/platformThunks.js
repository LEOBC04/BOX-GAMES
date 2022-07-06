import axios from "axios";
import { getPlatforms } from "../slices/platformSlice";

const fetchAllPlatforms = () => (dispatch) => {
  axios
    .get("http://localhost:3001/genres/platforms")
    .then((response) => dispatch(getPlatforms(response.data)))
    .catch((error) => console.log(error));
};


export { fetchAllPlatforms}
