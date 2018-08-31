var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
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

var Album = module.exports = mongoose.model('Album', AlbumSchema);

module.exports.index = function(callback) {
  Album.find(callback).populate('Photographer');
}

module.exports.show = function(AlbumId,callback) {
  Album.findById(AlbumId, callback);
}

module.exports.update = function(AlbumId, body, callback) {
  Album.findByIdAndUpdate(AlbumId, body, callback);
}

module.exports.remove = function(AlbumId, callback) {
  Album.deleteOne({_id:AlbumId}, callback);
}

module.exports.insertmany = function(obj, callback) {
  Album.insertMany(obj, callback);
}
