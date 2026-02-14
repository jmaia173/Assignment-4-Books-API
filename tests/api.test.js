const request = require("supertest");
const app = require("../server");

describe("Bookstore API", () => {

    // ---------------- GET ALL BOOKS ----------------
    test("GET /api/books should return all books", async () => {
        const res = await request(app).get("/api/books");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // ---------------- GET BOOK BY ID ----------------
    test("GET /api/books/:id should return a single book", async () => {
        const res = await request(app).get("/api/books/1");

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("id", 1);
    });

    test("GET /api/books/:id should return 404 if book not found", async () => {
        const res = await request(app).get("/api/books/999");

        expect(res.statusCode).toBe(404);
    });

    // ---------------- POST BOOK ----------------
    test("POST /api/books should create a new book", async () => {
        const newBook = {
            title: "Dune",
            author: "Frank Herbert",
            genre: "Sci-Fi",
            copiesAvailable: 4
        };

        const res = await request(app)
            .post("/api/books")
            .send(newBook);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.title).toBe("Dune");
    });

    // ---------------- PUT BOOK ----------------
    test("PUT /api/books/:id should update a book", async () => {
        const updatedData = {
            title: "Updated Title"
        };

        const res = await request(app)
            .put("/api/books/1")
            .send(updatedData);

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Updated Title");
    });

    test("PUT /api/books/:id should return 404 if book not found", async () => {
        const res = await request(app)
            .put("/api/books/999")
            .send({ title: "No Book" });

        expect(res.statusCode).toBe(404);
    });

    // ---------------- DELETE BOOK ----------------
    test("DELETE /api/books/:id should delete a book", async () => {
        const res = await request(app).delete("/api/books/2");

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("id", 2);
    });

    test("DELETE /api/books/:id should return 404 if book not found", async () => {
        const res = await request(app).delete("/api/books/999");

        expect(res.statusCode).toBe(404);
    });

});
