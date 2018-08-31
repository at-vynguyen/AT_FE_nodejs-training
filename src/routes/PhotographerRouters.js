var express = require('express');
var router = express.Router();

var validate = require('express-validation');
var validation = require('../lib/Validation');

var photographer = require('../controllers/PhotographerControllers');

router.get('/', photographer.index);

router.get('/:id', photographer.show);

router.put('/:id', photographer.update);

router.post('/', validate(validation.register),photographer.create);

router.delete('/:id', photographer.remove);

module.exports = router;
