const Picture = require('../models/pictures');

exports.index = function(req, res, next) {
  Picture.index(function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.show = function(req, res, next) {
  const userName = req.params.id;
  Picture.show(userName, function(err, callback) {
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
  const picArr = req.body;
  var picObj = [];
  
  picObj = picArr.map(item => {
    return new Picture({
      "name" : item.name,
      "description": item.description,
      "photographerid": item.photographerid,
    });
  });

  Picture.insertMany(picObj, function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = function(req, res, next) {
  const id = req.params.id;
  const body = req.body;
  Picture.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Picture.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
