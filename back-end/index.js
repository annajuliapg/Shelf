'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const loginRoutes = require('./routes/LoginRoutes');
const accountRoutes = require('./routes/AccountRoutes');
const usuarioRoutes = require('./routes/UsuarioRoutes');
const livrosRoutes = require('./routes/LivroRoutes');
const leiturasRoutes = require('./routes/LeituraRoutes');
const { returnError } = require('./middleware/ErrorHandler');

const app = express();

app.use(express.json());
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
app.use(bodyParser.json());

app.use('/', loginRoutes.routes);
app.use('/', accountRoutes.routes);
app.use('/', usuarioRoutes.routes);
app.use('/', livrosRoutes.routes);
app.use('/', leiturasRoutes.routes);
app.use(returnError);

app.listen(config.port, () => console.log('App is listening on url ' + config.url));