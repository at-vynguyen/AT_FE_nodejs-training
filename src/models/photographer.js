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
  products: [
    {
      _id:{
        type: String,
        ref: 'Picture'
      }
    }
  ]
})

PhotographerSchema.pre('create', function(next){
  this.password = bcrypt.hash(this.password, saltRounds);
  next();
});

module.exports.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, callback);
}


var Photographer = module.exports = mongoose.model('Photographer', PhotographerSchema);

module.exports.index = function(callback) {
  Photographer.find(callback);
}

module.exports.show = function(photographerId,callback) {
  Photographer.findById(photographerId, callback);
}

module.exports.create = function(photographerId, callback) {
  Photographer.create(photographerId, callback);
}

module.exports.update = function(photographerId, callback) {
  Photographer.findByIdAndUpdate(photographerId, callback);
}

module.exports.remove = function(photographerId, callback) {
  Photographer.findByIdAndRemove(photographerId, callback);
}

module.exports.getUsername = function(userName, callback) {
  Photographer.find({username: userName}, callback);
}
