var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const PhotographerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type : String,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  level: {
    type: String
  }
},
{
  versionKey: false
})

PhotographerSchema.pre('create', function(next){
  this.password = bcrypt.hash(this.password, saltRounds);
  next();
});

var Photographer = module.exports = mongoose.model('Photographer', PhotographerSchema);

module.exports.index = function(callback) {
  Photographer.find(callback);
}

module.exports.hashPassword = (password, callback) => {
  bcrypt.hash(password, 10, callback);
}

module.exports.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, callback);
}

module.exports.show = function(photographerId,callback) {
  Photographer.find({_id:photographerId}, callback);
}

module.exports.create = function(photographer, callback) {
  photographer.save(callback);
}

module.exports.update = function(photographerId, body, callback) {
  Photographer.findByIdAndUpdate(photographerId, body, callback);
}

module.exports.remove = function(photographerId, callback) {
  Photographer.findByIdAndRemove(photographerId, callback);
}

module.exports.getUsername = function(userName, callback) {
  Photographer.find({username: userName}, callback);
}
