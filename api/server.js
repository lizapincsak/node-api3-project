const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");

const server = express();

const {logger} = require('./middleware/middleware.js');
const userRouter = require('./users/users-router.js');

server.use(express.json())
server.use(logger)

server.use(morgan('dev'));
server.use(helmet());
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
