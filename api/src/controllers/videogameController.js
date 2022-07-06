const axios = require("axios");
const { Videogame, Genre, Op } = require("../db");
const { apiKey } = require("../utils/config/index");

const apiVideogames = async () => {
  try {
    let videogames = [];
    const pages = [10, 11, 12, 13, 14];

    for (let i = 0; i < pages.length; i++) {
      const page = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${apiKey}&page_size=20&page=${pages[i]}`
        )
      ).data.results;
      videogames = videogames.concat(page);
    }
    return videogames;
  } catch (error) {
    console.log(error);
  }
};

const getApiVideogames = async () => {
  try {
    const videogames = await apiVideogames();
    const videogamesFiltered = videogames.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres.map((genre) => genre.name),
        rating: game.rating,
        released: game.released,
      };
    });
    return videogamesFiltered;
  } catch (error) {
    console.log(error);
  }
};

const getDbGames = async () => {
  const dbGames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dbGames;
};

const getAllVideogames = async (req, res, next) => {
  try {
    const apiGames = await getApiVideogames();
    const dbGames = await getDbGames();
    const allGames = apiGames.concat(dbGames);
    res.status(200).send(allGames);
  } catch (error) {
    next(error);
  }
};

const getAllVideogamesForFilters = async () => {
  try {
    const apiGames = await getApiVideogames();
    const dbGames = await getDbGames();
    const allGames = apiGames.concat(dbGames);
    return allGames;
  } catch (error) {
    console.log(error);
  }
};

const getVideogameByName = async (req, res, next) => {
  const { name } = req.query;

  try {
    const apiGame = (
      await axios.get(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${name.toLowerCase()}`
      )
    ).data.results;

    const apiGamesFiltered = apiGame.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres.map((genre) => genre.name),
        rating: game.rating,
        released: game.released,
      };
    });

    const dbGame = await Videogame.findAll({
      where: {
        name: { [Op.iLike]: name },
      },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (dbGame.length) {
      const result = apiGamesFiltered.slice(0, 14);
      res.status(200).send(result.concat(dbGame));
    } else {
      const result = apiGamesFiltered.slice(0, 15);
      res.status(200).send(result);
    }
  } catch (error) {
    next(error);
  }
};

const getVideogameById = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!Number(id)) {
      const dbVideogame = await Videogame.findOne({
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        where: {
          id: id,
        },
      });
      console.log(id);
      res.status(200).send(dbVideogame);
    } else {
      const apiVideogame = (
        await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
      ).data;

      const videogame = {
        name: apiVideogame.name,
        image: apiVideogame.background_image,
        genres: apiVideogame.genres,
        description: apiVideogame.description,
        released: apiVideogame.released,
        rating: apiVideogame.rating,
        platforms: apiVideogame.platforms,
      };

      res.status(200).send(videogame);
    }
  } catch (error) {
    next(error);
  }
};

const postVideogame = async (req, res, next) => {
  try {
    const { name, description, released, rating, genres, platforms, image } =
      req.body;

    const createdVideogame = await Videogame.create({
      name: name.toUpperCase(),
      description,
      released,
      rating,
      platforms,
      image,
    });

    genres.forEach(async (genre) => {
      const currentGenre = genre;
      const currentId = await Genre.findOne({
        attributes: ["id"],
        where: {
          name: currentGenre,
        },
      });
      await createdVideogame.addGenre(currentId);
    });
    res.status(201).send(createdVideogame);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllVideogames,
  getVideogameByName,
  getVideogameById,
  postVideogame,
  getApiVideogames,
  getAllVideogamesForFilters
};
