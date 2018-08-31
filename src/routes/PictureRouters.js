var express = require('express');
var multer = require('multer');
var router = express.Router();

var auth = require('../controllers/AuthControllers');
var picture = require('../controllers/PictureControllers');

const folder = 'files';

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./${folder}/`);
  },
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/', picture.create);
router.get('/', picture.index);
router.get('/:id', picture.show);
router.put('/:id', picture.update);
router.delete('/:id', picture.delete);

module.exports = router;
