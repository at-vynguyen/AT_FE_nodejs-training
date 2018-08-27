var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PictureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  photographerid: {
    type: String,
    ref: 'photographer'
  },
},
{
  versionKey: false
}
)

var Picture = module.exports = mongoose.model('Picture', PictureSchema);

module.exports.index = function(callback) {
  Picture.find(callback).populate('photographer');
}

module.exports.show = function(pictureId,callback) {
  Picture.findById(pictureId, callback);
}

module.exports.create = function(pictureId, callback) {
  Picture.create(pictureId, callback);
}

module.exports.update = function(pictureId, body, callback) {
  Picture.findByIdAndUpdate(pictureId, body, callback);
}

module.exports.remove = function(pictureId, callback) {
  Picture.findByIdAndRemove(pictureId, callback);
}

module.exports.insertmany = function(obj, callback) {
  Picture.insertMany(obj, callback);
}