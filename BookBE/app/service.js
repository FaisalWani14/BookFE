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
      console.log("Getting all books data")
      result(null, res);
    });
};

Book.updateBook = (id, data, result) => {
  sql.query("UPDATE books SET title=?, author=?, year=? WHERE id=?",
  [data.title, data.author, data.year, id], (err, res) => {
    if (err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0){
      result({kind: "not_found"}, null)
      console.log("Not found book ID: " + id)
      return;
    }else{
      console.log("Updated ID: " + id)
    }
    result(null, res);
  });
}

Book.deleteBook = (id, result) => {
  sql.query("DELETE FROM books WHERE id=?;", id, (err, res) => {
    if (err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0){
      result({kind: "not_found"}, null)
      return;
    }
    console.log("Deleted book id: ", id)
    result(null, {id: id})
  });
}

module.exports = Book;