var express = require('express');
var router = express.Router();
var photographer = require('./PhotographerRouters');
var album = require('./AlbumRouters');
var picture = require('./PictureRouters');

router.use('/photo', photographer);
router.use('/albums', album);
router.use('/pictures', picture);

module.exports = router;
