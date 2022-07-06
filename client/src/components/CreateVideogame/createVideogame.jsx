import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchVideogamesByOrder } from "../../Redux/thunks/filterThunks";
import { fetchAllGenres } from "../../Redux/thunks/genreThunks";
import { fetchAllVideogames } from "../../Redux/thunks/videogameThunks";
import { fetchAllPlatforms } from "../../Redux/thunks/platformThunks";
import { saveVideogame } from "../../Redux/thunks/videogameThunks";
import Footer from "../Home/footer";
import s from "./createVideogame.module.scss";

const CreateVideogame = () => {
  const { genres } = useSelector((state) => state.genres);
  const { platforms } = useSelector((state) => state.platforms);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    name: "",
    description: "",
    released: "",
    rating: "",
    image: "",
    genres: [],
    platforms: [],
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({
    name: "Name is a required field",
    description: "Description is a required field",
    released: "Released is a required field",
    rating: "Rating is a required field",
    image: "Image is a required field",
    genres: "Genres is a required field",
    platforms: "Plaforms is a required field",
  });

  const validations = (input) => {
    const errorObject = {};

    if (!input.name) {
      errorObject.name = "The name field is empty";
    } else if (!/^[a-zA-Z ]*$/.test(input.name) || input.name.length < 3) {
      errorObject.name =
        "The name of the videogame must contain letters and more than 3 characters";
      console.log(errorObject);
    }

    if (!input.description) {
      errorObject.description = "The description field is empty";
    } else if (
      /[A-Za-z0-9.,;:!?()"'%-]+/.test(input.description) &&
      input.description.length < 30
    ) {
      errorObject.description =
        "Description field must contain more than 20 characters";
    }

    if (!input.released) {
      errorObject.released = "The released field is empty";
    } else if (
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
        input.released
      )
    ) {
      errorObject.released = "Please insert a valid format (DD/MM/YYYY)";
    }

    if (!input.image) {
      errorObject.image = "The image field is empty";
    } else if (
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(
        input.image
      )
    ) {
      errorObject.image = "Please insert a valid URL";
    }

    if (!input.rating) {
      errorObject.rating = "The rating field is empty";
    } else if (input.rating < 0 || input.rating > 5) {
      errorObject.rating = "Rating must be a value between 0 and 5";
    }

    if (input.genres.length === 0 || input.genres.length < 2) {
      errorObject.genres = "Please select at least 2 genres";
    } else if (input.genres.length > 4) {
      errorObject.genres = "The limit of genres is 4";
    }

    if (input.platforms.length === 0 || input.platforms.length < 2) {
      errorObject.platforms = "Please select at least 2 platforms";
    } else if (input.platforms.length > 4) {
      errorObject.platforms = "The limit of platforms is 4";
    }

    return errorObject;
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validations({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    if (!form[e.target.name].includes(e.target.value)) {
      setForm({
        ...form,
        [e.target.name]: [...form[e.target.name], e.target.value],
      });
    }
    setErrors(
      validations({
        ...form,
        [e.target.name]: [...form[e.target.name], e.target.value],
      })
    );
  };

  const handleSelectDelete = (e) => {
    e.preventDefault();
    if (form[e.target.name].includes(e.target.value)) {
      console.log("entro");
      const filter = form[e.target.name].filter(
        (value) => value !== e.target.value
      );
      setForm({
        ...form,
        [e.target.name]: [...filter],
      });
      setErrors(
        validations({
          ...form,
          [e.target.name]: [...filter],
        })
      );
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      console.log(form);
      dispatch(saveVideogame(form));
      alert("The video game was created succesfully");
      setForm({
        name: "",
        description: "",
        released: "",
        rating: "",
        image: "",
        genres: [],
        platforms: [],
      });
      navigate("/home");
    }
  };

  useEffect(() => {
    if (platforms.length === 0) {
      dispatch(fetchAllPlatforms());
    }
    if (genres.length === 0) {
      dispatch(fetchAllGenres());
    }
    return () => {
      dispatch(fetchAllVideogames());
      dispatch(fetchVideogamesByOrder("asc"));
      dispatch(fetchVideogamesByOrder("desc"));
      dispatch(fetchVideogamesByOrder("max"));
      dispatch(fetchVideogamesByOrder("min"));
    };
  }, [dispatch, platforms, genres]);

  return (
    <div>
      <section className={s.contenedorPrincipal}>
        <form onSubmit={handleOnSubmit}>
          <h2>Create a video game.</h2>

          <div className={s.campo}>
            <label>Name: </label>
            <input
              type="text"
              placeholder="Type a name..."
              name="name"
              onChange={handleInputChange}
            />
            {errors ? <span>{errors.name}</span> : null}
          </div>

          <div className={s.campo}>
            <label>Description: </label>
            <textarea
              placeholder="About the videogame..."
              name="description"
              onChange={handleInputChange}
            />
            {errors ? <span>{errors.description}</span> : null}
          </div>

          <div className={s.campo}>
            <label>Released: </label>
            <input type="date" name="released" onChange={handleInputChange} />
            {errors ? <span>{errors.released}</span> : null}
          </div>

          <div className={s.campo}>
            <label>Image: </label>
            <input
              type="text"
              placeholder="https://image-url-png"
              name="image"
              onChange={handleInputChange}
            />
            {errors ? <span>{errors.image}</span> : null}
          </div>

          <div className={s.campo}>
            <label>Rating: </label>
            <input
              type="number"
              step="0.1"
              name="rating"
              onChange={handleInputChange}
            />
            {errors ? <span>{errors.rating}</span> : null}
          </div>

          <div className={s.campo}>
            <label>Genres: </label>
            <select onChange={handleSelect} name="genres">
              <option selected="selected" disabled="disabled">
                Select genres
              </option>
              {genres.map((genre) => (
                <option value={genre.name}>{genre.name}</option>
              ))}
            </select>
            <ul>
              {form.genres.map((genre) => (
                <li>
                  <button
                    name="genres"
                    value={genre}
                    onClick={handleSelectDelete}
                  >{`${genre} X`}</button>
                </li>
              ))}
            </ul>
            {errors ? <span>{errors.genres}</span> : null}
          </div>

          <div className={s.campo}>
            <label>Platforms</label>
            <select onChange={handleSelect} name="platforms">
              <option selected="selected" disabled="disabled">
                Select platforms
              </option>
              {platforms.map((platform) => (
                <option value={platform.name}>{platform.name}</option>
              ))}
            </select>
            <ul>
              {form.platforms.map((platform) => (
                <li>
                  <button
                    name="platforms"
                    value={platform}
                    onClick={handleSelectDelete}
                  >{`${platform} X`}</button>
                </li>
              ))}
            </ul>
            {errors ? <span>{errors.platforms}</span> : null}
          </div>

          <div className={s.campo}>
            <input type="submit" className={s.submit} value="Create" />
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default CreateVideogame;
