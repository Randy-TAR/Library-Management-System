const pool = require('../config/db');

const Book = {

    // adding a book to the DB
    async createBook(data) {
        const {lib_id, tittle, authour, category, description, quantity, available_count, created_at} = data;

        const query = `
        INSERT INTO books (lib_id, tittle, authour, category, description, quantity, available_count)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `;

        const values = [lib_id, tittle, authour, category, description, quantity, available_count];

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