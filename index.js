'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const usersRoutes = require('./routes/users');
const definedDataBaseDataRoutes = require('./routes/DefinedDataBaseDataRoutes');
const livrosRoutes = require('./routes/LivroRoutes');
const { returnError } = require('./middleware/ErrorHandler');

const app = express();

app.use(express.json());
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
app.use(bodyParser.json());

app.use('/', loginRoutes.routes);
app.use('/', registerRoutes.routes);
app.use('/', usersRoutes.routes);
app.use('/', definedDataBaseDataRoutes.routes);
app.use('/', livrosRoutes.routes);
app.use(returnError);

app.listen(config.port, () => console.log('App is listening on url ' + config.url));