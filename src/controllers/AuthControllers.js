const Photographer = require('../models/photographer')

exports.checkLogin = function(req, res, next) {
const password = req.headers.password; 
const username = req.headers.username;

Photographer.getUsername(username, (err, callback) => {
  if (err) throw err;
  if (callback.length) {
    Photographer.comparePassword(password, callback[0].password, (err, isPasswordMatch) => {
      if (err) throw err;
      if (isPasswordMatch) {
        req.photographerid = callback[0]._id;
        delete req.headers.password;
        next();
      }
      else {
        res.status(401).json({
          error: 'auth failt',
        })
      }
    });
  }
  else {
    res.status(401).json({
      error: 'auth failt',
    })
  }
});
}
