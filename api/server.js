const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const logErrors = require("../routes/utils/logErrors");
const clientErrorHandler = require("../routes/utils/clientErrorHandler");
const errorHandler = require("../routes/utils/finalErrorHandler");
const logger = require("../routes/utils/debugLogger");
const logRoute = require("../routes/utils/logRoute");

const registerRouter = require("../routes/auth/registerRouter.js");
const usersRouter = require("../routes/users/users-router.js");
const decksRouter = require("../routes/decks/decks-router.js");
const cardsRouter = require("../routes/cards/cards-router.js");

const findUIDMiddleWare = require("../routes/utils/findUIDMiddleware.js");

const server = express();
const apiDocsPath = path.join(__dirname, "../apidoc");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(logger);
server.use(logRoute);

server.use("/api/register", registerRouter);
server.use("/api/users", findUIDMiddleWare, usersRouter);
server.use("/api/decks", findUIDMiddleWare, decksRouter);
server.use("/api/cards", cardsRouter);
server.use("/api", (req, res) => {
  console.log("inside of server up message");
  return res.status(200).json({ message: "Server up and running" });
});

server.use("/", express.static(apiDocsPath));
server.use(logErrors, clientErrorHandler, errorHandler);

module.exports = server;
