const db = require("./config.db")
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: db.HOST,
    user: db.USER,
    password: db.PASSWORD,
    database: db.DB
});

connection.connect(error=>{
    if(error) console.log("MYSQL connection: " + error);
    else console.log("Successfully connected to the database.");
});

module.exports = connection;