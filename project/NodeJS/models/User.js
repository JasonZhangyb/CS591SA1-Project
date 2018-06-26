const mongoose = require('mongoose');
if (!mongoose.connection.db){
    mongoose.connect('mongodb://localhost/CS591SA1');
}

const db = mongoose.connection;
const Schema = mongoose.Schema;
const users = new Schema({
    userID: String,
    username: String,
})


const User = mongoose.model('User', users);

module.exports = User;