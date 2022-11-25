const Book = require("./service");

const createNewBook = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty.",
        });
    }

    const bookObj = new Book({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
    });
    Book.create(bookObj, (err, data) => {
        if (err) {
        res.status(500).send({
            message: err.message || "Some error occured while creating.",
        });
        } else res.send(data);
    });
};

const getAllBooks = (req, res) => {
    Book.getAllBooks((err, data) => {
        if (err) {
        res.status(500).send({
            message: err.message || "Some error occured while retriveing data.",
        });
        } else res.send(data);
    });
};

module.exports = {
createNewBook,
getAllBooks,
// updateBook,
// deleteBook
};