const { Router } = require("express");
const router = Router();
const {
  getAllVideogames,
  getVideogameByName,
  getVideogameById,
  postVideogame,
} = require("../controllers/videogameController");

router.get("/", getAllVideogames);
router.get("/name", getVideogameByName);
router.get("/:id", getVideogameById);
router.post("/", postVideogame);

module.exports = router;
