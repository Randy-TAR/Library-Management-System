const pool = require('../config/db');

const Book = {

    // adding a book to the DB
    async createBook(data) {
        const {book_id, lib_id, tittle, authour, category, description, quantity, available_count, created_at} = data;

        const query = `
        INSERT INTO books (book_id, lib_id, tittle, authour, category, description, quantity, available_count, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `;

        const values = [book_id, lib_id, tittle, authour, category, description, quantity, available_count, created_at];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    // fetching all books from the DB
    async getAllBooks(){
        const query = 'SELECT * FROM books ORDER BY book_id ASC';
        const result = await pool.query(query);
        return result.rows; 
    }
};

module.exports = Book;