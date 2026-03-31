const express = require('express');
const pool = require('./config/db');
const bookRoutes = require('./routes/bookRoutes')
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT =  3000;

// Middleware: This parses JSON data sent in POST requests
app.use(express.json()); // all express to ready the req.body

app.use('/api/', bookRoutes); //makes all book routes start with api/books
app.use('/api/users', userRoutes); // makes all user routes start with api/users


async function testConnection() {
    try{
        // testing the connection 
        const client = await pool.connect();
        console.log('✅ Success: Connected to library_db')

        // simple query to display time
        const res = await client.query('SELECT NOW()');
        console.log('🕒 Database Time:', res.rows[0].now);

        client.release();
    } catch (err) {
        console.error('❌ Connection Error:', err.message);
    }
};

app.get('/', (req, res) => {
    res.send('Hello from my LMS')
});




app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📡 GET    http://localhost:${PORT}/api/books`);
    console.log(`📩 POST   http://localhost:${PORT}/api/books`);
    testConnection();
})