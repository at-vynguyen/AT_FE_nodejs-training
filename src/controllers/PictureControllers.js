const Picture = require('../models/picture');

exports.index = function(req, res, next) {
  Picture.index(function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.show = function(req, res, next) {
  Picture.show(function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = function(req, res, next) {
  Picture.remove(function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = function(req, res, next) {
  var picArr = req.body;
  const photographerid = req.photographerid;
  var picObj = [];
  
  picObj = picArr.map(item => {
    return new Picture({
      "name" : item.name,
      "description": item.description,
      "photographerid": photographerid,
    });
  });

  Picture.insertMany(picObj, function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = function(req, res, next) {
  const id = req.params.pictureid;
  const body = req.body;
  Picture.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.pictureId;
  Picture.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  });
}