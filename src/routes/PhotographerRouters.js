var express = require('express');
var router = express.Router();
var photographer = require('../controllers/PhotographerControllers');

router.get('/', photographer.index);
router.get('/:id', photographer.show);
router.post('/', photographer.create);
router.put('/:id', photographer.update);
routes.delete('/:id', photographesController.remove);

module.exports = router;
