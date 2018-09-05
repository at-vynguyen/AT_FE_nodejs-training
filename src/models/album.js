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
    type: mongoose.Schema.Types.ObjectId,
  },
},
{
  versionKey: false
})

const Album = module.exports = mongoose.model('Album', AlbumSchema);

module.exports.index = (callback) => {
  Album.aggregate([
    { 
      $lookup: { 
        from: "photographers",
        localField: "photographerid",
        foreignField: "_id",
        as: "photographer_docs"
      }
    }, 
    {
      $unwind: {
        path: "$photographer_docs",
        preserveNullAndEmptyArrays: true
      } 
    }, 
    {
      $lookup: {
        from: "pictures",
        localField: "_id",
        foreignField: "albumid",
        as: "picture_docs"
      }
    }, 
    // {
    //   $project : {
    //     name: 1,
    //     description: 1,
    //     photographer_docs: {
    //       name: 1,
    //       age:  1,
    //       username: 1
    //     },
    //     picture_docs: {
    //       name: 1
    //     }
    //   }
    // }
  ], callback);
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
