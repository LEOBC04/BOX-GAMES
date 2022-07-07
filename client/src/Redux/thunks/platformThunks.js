import axios from "axios";
import { getPlatforms } from "../slices/platformSlice";

const fetchAllPlatforms = () => (dispatch) => {
  axios
    .get("/genres/platforms")
    .then((response) => dispatch(getPlatforms(response.data)))
    .catch((error) => console.log(error));
};


export { fetchAllPlatforms}
