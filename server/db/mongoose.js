var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://kingjames:jamesegun@cluster0-ohmw1.mongodb.net/test?retryWrites=true&w=majority" )
  

module.exports = {mongoose};