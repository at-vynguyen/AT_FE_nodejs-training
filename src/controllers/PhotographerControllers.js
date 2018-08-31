const Photographer = require('../models/photographer');
const convert = require('../lib/constructor');

exports.index = function(req, res, next) {
  Photographer.index(function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.show = function(req, res, next) {
  const photoId = req.params.id;
  Photographer.show(photoId,function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = function(req, res, next) {
  Photographer.remove(function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = function(req, res, next) {
  const reqConvert = convert.convert(req.body);
  const password = reqConvert.password;
  const userName = reqConvert.username;
  Photographer.getUsername(userName, (err, callback) => {
    if (err) throw err;
    if (callback.length) {
      return res.status(409 ).send({
        error: 'have another this username'
      });
    }
  Photographer.hashPassword(password, (err, hash) => {
    if (err) {
      return res.status(500).send({
        error: err
      });
    } else {
      const photographer = new Photographer({
        name: reqConvert.name,
        age: reqConvert.age,
        password: hash,
        username: reqConvert.username,
        level: reqConvert.level
      });
  Photographer.create(photographer, function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
    }
    });
  });
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  Photographer.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
