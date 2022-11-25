const sql = require("./db");

//Constructor
const Book = function (book) {
  this.title = book.title;
  this.author = book.author;
  this.year = book.year;
};

Book.create = (newBook, result) => {
    sql.query("INSERT INTO books SET ?", newBook, (err, res) => {
      if (err) {
        console.log("Query error: " + err);
        result(err, null);
        return;
      }
      console.log("Created user: ", {      
        ...newBook
      });
      result(null, {        
        ...newBook
      });
    })
}

Book.getAllBooks = (result) => {
    sql.query("SELECT * FROM books", (err, res) => {
      if (err) {
        console.log("Query error: " + err);
        result(err, null);
        return;
      }
      result(null, res);
    });
  };

module.exports = Book;