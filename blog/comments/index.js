const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

// * Middlewares
app.use(cors());
app.use(express.json());

// * We need to get the comments for the specific post
const commentsById = {};

// * Getting all comments
app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  res.status(200).send(commentsById[id] || []);
});

// * Creating a post
app.post('/posts/:id/comments', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsById[req.params.id] || [];
  comments.push({ id, content });
  commentsById[req.params.id] = comments;
  res.status(201).send(commentsById[req.params.id]);
});

const PORT = process.env.COMMENTS_PORT || 5001;
app.listen(PORT, () => console.info(`Listening on PORT : ${PORT}`));
