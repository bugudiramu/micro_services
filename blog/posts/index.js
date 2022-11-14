const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

// * Middlewares
app.use(cors());
app.use(express.json());

const posts = {};

// * Getting all posts
app.get('/posts', (req, res) => {
  res.status(200).send(posts);
});

// * Creating a post
app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };
  res.status(201).send('Post created successfully');
});

const PORT = process.env.POSTS_PORT || 5000;
app.listen(PORT, () => console.info(`Listening on PORT : ${PORT}`));
