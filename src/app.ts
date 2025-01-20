import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

interface Book {
  id: string;
  title: string;
  author: string;
  published: number;
  available: boolean;
}

let books: Book[] = [
  { id: uuidv4(), title: "1984", author: "George Orwell", published: 1949, available: true },
  { id: uuidv4(), title: "To Kill a Mockingbird", author: "Harper Lee", published: 1960, available: false },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// GET /books - Retrieve the list of books
app.get("/books", (req: Request, res: Response) => {
  res.json(books);
});

// GET /books/:id - Retrieve a specific book by ID
app.get("/books/:id", (req: Request, res: Response) => {
  const book = books.find(b => b.id === req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// POST /books - Add a new book
app.post("/books", (req: Request, res: Response) => {
  const { title, author, published, } = req.body;
  if (!title || !author || !published) {
    return res.status(400).send("Title, author, and published date are required");
  }
  const newBook: Book = {
    id: uuidv4(),
    title,
    author,
    published,
    available: true,
  };
  books.push(newBook);
  res.status(200).json(books);
});

// PUT /books/:id - Update a book by ID
app.put("/books/:id", (req: Request, res: Response) => {
  const { title, author, published } = req.body;
  if (!title || !author || !published) {
    return res.status(400).send("Title, author, and published date are required");
  }
  const book = books.find(b => b.id === req.params.id);
  if (book) {
    book.title = title;
    book.author = author;
    book.published = published;
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// DELETE /books/:id - Delete a book by ID
app.delete("/books/:id", (req: Request, res: Response) => {
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(200).json(books);
  } else {
    res.status(404).send("Book not found");
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
