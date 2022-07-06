const { Router } = require("express");
const router = Router();
const { getGenres, getPlatforms } = require("../controllers/genreController");

router.get("/", getGenres);
router.get("/platforms", getPlatforms);

module.exports = router;
