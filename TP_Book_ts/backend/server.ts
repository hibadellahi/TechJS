import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bookRoutes from './routes/books.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/books', bookRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/bookTracker')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
