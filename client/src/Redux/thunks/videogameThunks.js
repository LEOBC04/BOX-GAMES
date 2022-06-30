import axios from 'axios';
import {
 getVideogames,
} from '../slices/videogameSlice.js';


const fetchAllVideogames = () => (dispatch) => {
  axios.get("http://localhost:3001/videogames")
  .then((response) => {
    dispatch(getVideogames(response.data));
  })
  .catch((error) => console.log(error));
}





export {
  fetchAllVideogames,
}