const mysql =  require("mysql");

const db = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : process.env.SQLPWD,
  database : 'wfl',
});

module.exports = db;
