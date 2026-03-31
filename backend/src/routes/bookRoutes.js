const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel'); // this is the link to the model we created for the books
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware'); // the middleware to chack only lib to add book


//route for adding a new book POST/books
router.post('/books', verifyToken, authorizeRole('librarian','admin'), async (req, res) => {
    try{
        const newBook = await Book.createBook(req.body); // calling the create book function from the Book model
        res.status(201).json({
            message: "Book added successfully",
            book: newBook
        });
    }catch (err){
        res.status(500).json({
            error: "Failed to add book",
            details: err.message
        });
    }
});

// route to fetch all books GET/books
router.get('/books', async (req, res) => {
    try {
        const allBooks = await Book.getAllBooks(); // calling the get all books function from the Book model
        res.status(200).json(allBooks);
    }catch (err){
        res.status(500).json({
            error: "Failed to fetch books",
            details: err.message
        });
    }
});

module.exports = router;