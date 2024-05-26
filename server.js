const express = require('express');
const colors = require("colors");
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan')
const app = express();
const  connectDB  = require('./db/config');
const router = require('./routes');
require('dotenv').config();

const port = process.env.PORT || 3000

app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
app.use(morgan("dev"))

app.use(router)

connectDB.sync()
    .then(() => app.listen(port, () => console.log(`Server running on port ${port}`.bgCyan.white)))
    .catch(err => console.log(err));
