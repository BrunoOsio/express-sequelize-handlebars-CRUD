let express = require('express');
let router = express.Router();
 
const rentedCars = require('../controller/rentedCar.controller');

router.post('/create', rentedCars.create);
router.get('/', rentedCars.findAll);
router.get('/:id', rentedCars.findOne);
router.post("/edit/:id", rentedCars.update);
router.delete('/delete/:id', rentedCars.delete);

module.exports = router;