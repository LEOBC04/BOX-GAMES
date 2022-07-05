const { Router } = require('express');
const router = Router();
const { getAllVideogamesByGenre, getAllVideogamesByOrder } = require('../controllers/filterController')

router.get('/genre', getAllVideogamesByGenre );
router.get('/:order', getAllVideogamesByOrder );


module.exports = router