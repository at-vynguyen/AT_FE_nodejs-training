const Album = require('../models/album');

exports.index = function(req, res, next) {
  Album.index(function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.show = function(req, res, next) {
  const userName = req.params.id;
  Album.show(userName, function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = function(req, res, next) {
  Album.remove(function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = function(req, res, next) {
  const picArr = req.body;
  const photographerid = req.photographerid;
  var picObj = [];
  
  picObj = picArr.map(item => {
    return new Album({
      "name" : item.name,
      "description": item.description,
      "photographerid": photographerid,
    });
  });

  Album.insertMany(picObj, function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = function(req, res, next) {
  const id = req.params.id;
  const body = req.body;
  Album.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Album.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
