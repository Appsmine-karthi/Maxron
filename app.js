const express = require("express");
const connect_db = require("./config/db");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const app = express();

const router = express.Router();
const routes = require('./routes');
routes(router);
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/v1", router);
connect_db();
app.use(express.static(path.join(__dirname, 'public/')));
app.listen(process.env.PORT, () => console.log(`server start with port ${process.env.PORT}`));
