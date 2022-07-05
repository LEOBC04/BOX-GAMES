const axios = require("axios");
const { Videogame, Genre } = require("../db");
const {
  getApiVideogames,
  getAllVideogamesForFilters,
} = require("./videogameController");

const getApiVideogamesByGenre = async (genre) => {
  try {
    const videogames = await getApiVideogames();

    const filteredGames = videogames.filter((game) =>
      game.genres.includes(`${genre}`)
    );

    return filteredGames;
  } catch (error) {
    console.log(error);
  }
};

const getDbVideogamesByGenre = async (genre) => {
  try {
    const dbGames = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        where: {
          name: `${genre}`,
        },
        through: {
          attributes: [],
        },
      },
    });

    return dbGames;
  } catch (error) {
    console.log(error);
  }
};

const getAllVideogamesByGenre = async (req, res, next) => {
  try {
    const { genre } = req.query;
    const apiGames = await getApiVideogamesByGenre(genre);
    const dbGames = await getDbVideogamesByGenre(genre);
    const games = apiGames.concat(dbGames);

    res.status(200).send(games);
  } catch (error) {
    next(error);
  }
};

const getAllVideogamesByOrder = async (req, res, next) => {
  try {
    const { order } = req.params;
    const games = await getAllVideogamesForFilters();

    if (order === "asc") {
      const result = games.sort((a, b) => a.name < b.name ? -1 : 1);
      res.status(200).send(result);
    }
    if (order === "desc") {
      const result = games.sort((a, b) => a.name > b.name ? -1 : 1);
      res.status(200).send(result);
    }
    if (order === "min") {
      const result = games.sort((a, b) => a.rating - b.rating);
      res.status(200).send(result);
    }
    if (order === "max") {
      const result = games.sort((a, b) =>  b.rating - a.rating);
      res.status(200).send(result);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllVideogamesByGenre,
  getAllVideogamesByOrder,
};
