const Photographer = require('../models/photographer');

exports.index = function(req, res, next) {
  Photographer.index(function(err, callback) {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.show = function(req, res, next) {
  Photographer.show(function(err, callback) {
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
  const password = req.body.password;
  const userName = req.body.userName;
  Photographer.getUsername(userName, (err, callback) => {
    if (err) throw err;
    if (callback.length) {
      return res.status(409 ).send({
        error: 'have another this username'
      });
    }
  Photographer.pre(password, (err, hash) => {
    if (err) {
      return res.status(500).send({
        error: err
      });
    } else {
      const photographer = new Photographer({
        name: req.body.name,
        age: req.body.age,
        password: hash,
        userName: userName
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
  const id = req.params.photographerId;
  const body = req.body;

  Photographer.updatePhotographer(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
