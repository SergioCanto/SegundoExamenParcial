let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

let bookmarks = mongoose.Schema({
    id : { type : String },
    titulo : { type: String },
    descripcion : { type: String},
    url : {type: String}
});

let bookmark = mongoose.model( 'bookmarks', bookmarks  );

module.exports = {
    bookmark
};