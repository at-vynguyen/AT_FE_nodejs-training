var express = require('express');
var router = express.Router();
var photographer = require('./PhotographerRouters');
var pictures = require('./PictureRouters');

router.use('/photo', photographer);
router.use('/pictures', pictures);

module.exports = router;