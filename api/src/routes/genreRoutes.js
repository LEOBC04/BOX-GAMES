const { Router } = require("express");
const router = Router();
const { getGenres } = require("../controllers/genreController");

router.get("/", getGenres);

module.exports = router;
