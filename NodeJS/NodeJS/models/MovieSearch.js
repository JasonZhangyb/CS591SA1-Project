const mongoose = require('mongoose');
if (!mongoose.connection.db){
    mongoose.connect('mongodb://localhost/CS591SA1');
}

const db = mongoose.connection;
const Schema = mongoose.Schema;
const celebrity = new Schema({
    name: String,
    ID: String,
    known_for: [{title: String, id: String, rating: String, poster: String}],
})


const Celebrity = mongoose.model('Celebrity', celebrity);

module.exports = Celebrity;