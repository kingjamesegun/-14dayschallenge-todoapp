var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://kingjames:segun#3654@cluster0-ohmw1.mongodb.net/test?retryWrites=true&w=majority" || "mongodb://localhost:27017/Todo");

module.exports = {mongoose};