const express = require('express');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Blog = require('./models/blog');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/backend-blog';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());

// POST API to store details
app.post('/authors', async (req, res) => {
  try {
    const { name, email } = req.body;
    const author = new Author({ name, email });
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET API to fetch data
app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST API to store blog details
app.post('/blogs', async (req, res) => {
  try {
    const { title, blogContent, authorName } = req.body;
    const blog = new Blog({ title, blogContent, authorName });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET API to fetch blog data
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

