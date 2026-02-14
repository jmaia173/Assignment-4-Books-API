// Import Express
const express = require("express");

// Create an application instance
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
];

/* 
   REST API ENDPOINTS
 */

// GET all books
app.get("/api/books", (req, res) => {
    res.json(books);
});

// GET a specific book by ID
app.get("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

// POST - Add a new book
app.post("/api/books", (req, res) => {
    const { title, author, genre, copiesAvailable } = req.body;

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        genre,
        copiesAvailable
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT - Update a book
app.put("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { title, author, genre, copiesAvailable } = req.body;

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (genre !== undefined) book.genre = genre;
    if (copiesAvailable !== undefined) book.copiesAvailable = copiesAvailable;

    res.json(book);
});

// DELETE a book
app.delete("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);
    res.json(deletedBook[0]);
});

// Start server on port 3000
const PORT = 3000;

// Only start server if not running tests
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Export app for testing
module.exports = app;

