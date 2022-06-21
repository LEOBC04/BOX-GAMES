const { Router } = require('express');
const router = Router();
const videogamesRoutes = require('./videogamesRoutes');
const genreRoutes = require('./genreRoutes');
const filterRoutes = require('./filterRoutes');


router.use('/videogames', videogamesRoutes);
router.use('/genres', genreRoutes);
router.use('/filter', filterRoutes);


module.exports = router;
