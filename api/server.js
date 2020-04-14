const express = require("express");

const db = require("../data/dbConfig.js");

const Account = require('../router/accountRouter');

const server = express();


server.use(express.json());

server.use('/api/accounts', Account);

server.get('/', (req, res) => {
    res.status(200).json({api: 'up'})
});

module.exports = server;
