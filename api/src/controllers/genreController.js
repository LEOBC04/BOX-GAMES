const axios = require("axios");
const { Genre } = require("../db");
const { apiKey } = require("../utils/config/index");

const genres = async () => {
  try {
    const apiGenres = (
      await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)
    ).data.results;

    const apiGenresFiltered = await apiGenres.map((obj) => {
      return { name: obj.name };
    });

    await Genre.bulkCreate(apiGenresFiltered);
    console.log("Genres loaded on DB");
  } catch (error) {
    console.log(error);
  }
};

const getGenres = async (req, res, next) => {
  try {
    const dbGenres = await Genre.findAll({
      attributes: ["name"],
    });
    res.status(200).send(dbGenres);
  } catch (error) {
    next(error);
  }
};

const getPlatforms = async (req, res, next) => {
  try {
    const platforms = (
      await axios.get(`https://api.rawg.io/api/platforms?key=${apiKey}`)
    ).data.results;

    const allPlatforms = platforms.map((platform) => {
      return { name: platform.name };
    });

    const finalPlatforms = allPlatforms.slice(0, 22)

    res.status(200).send(finalPlatforms);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  genres,
  getGenres,
  getPlatforms
};
