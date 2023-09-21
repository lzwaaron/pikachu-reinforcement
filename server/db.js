const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
console.log(`Hello ${process.env}`);
console.log(process.env.MDBLOGIN + " " + process.env.MDBPWD)

const MONGO_URI =  `mongodb+srv://${process.env.MDBLOGIN}:${process.env.MDBPWD}@wfl.gze7cum.mongodb.net/`


//contains a User and Location collection

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'wfl',
  })
  .then(() => console.log('Connected to WFL DB!'))
  .catch((err) => console.log(err));

/*
const locationSchema = new Schema({
  placeID: { type: String },
  name: { type: String },
  address: { type: String },
  link: { type: String },
});*/

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  savedList: { type: Array, required: true },
});

module.exports = mongoose.model('User', userSchema);
//module.exports = mongoose.model('Location', locationSchema);
//displayName: { type: String, required: true },





// const mysql =  require("mysql");

// const db = mysql.createPool({
//   host     : 'localhost',
//   user     : 'root',
//   password : process.env.SQLPWD,
//   database : 'wfl',
// });

// module.exports = db;
