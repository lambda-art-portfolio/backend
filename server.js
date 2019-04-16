const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// import routes
const accountRouter = require("./accounts/router.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

// setup routes
server.use("/api/account", accountRouter);

server.get("/", (req, res) => {
  res.status(200).json({ serverStatus: "OK" });
});

module.exports = server;
