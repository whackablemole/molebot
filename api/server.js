require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet'); // Protects the tech stack by hiding it in the headers
const cors = require('cors');

const server = express();

// Import routes
//const authRouter = require('../auth/auth-routes');
//const usersRouter = require('../routes/user-routes');
//const restricted = require('../auth/restricted-middleware');

// Import models
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
	res.json({message: 'Welcome to MoleBot!'});
});

//server.use('/api/users', restricted, usersRouter);
//server.use('/api/auth', authRouter);

module.exports = server;