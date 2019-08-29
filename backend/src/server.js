const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const routes = require('./routes');

const server = express();

const stringConnection = 'mongodb+srv://omnistack:omnistack@cluster0-i4sie.mongodb.net/omnistack8?retryWrites=true&w=majority';
mongoose.connect(stringConnection, {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);