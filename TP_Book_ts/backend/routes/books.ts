import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    pagesRead: Number,
    status: String,
    format: String,
    price: Number,
    suggestedBy: String,
    finished: Boolean
});

const BookModel = mongoose.model('Book', bookSchema);

router.post('/', async (req, res) => {
    const book = new BookModel(req.body);
    book.finished = (book.pagesRead ?? 0) >= (book.pages ?? 0);
    await book.save();
    res.send(book);
});

router.get('/', async (req, res) => {
    const books = await BookModel.find();
    res.send(books);
});

export default router;
