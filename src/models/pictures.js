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
  albumid: {
    type: String,
    ref: 'album'
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
  Picture.find(callback).populate('Album');
}

module.exports.show = function(PictureId,callback) {
  Picture.findById(PictureId, callback);
}

module.exports.update = function(PictureId, body, callback) {
  Picture.findByIdAndUpdate(PictureId, body, callback);
}

module.exports.remove = function(PictureId, callback) {
  Picture.deleteOne({_id:PictureId}, callback);
}

module.exports.insertmany = function(obj, callback) {
  Picture.insertMany(obj, callback);
}
