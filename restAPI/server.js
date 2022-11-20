require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const apiInfo = require('./config')

const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use('/users', require('./routes/users/user.controller'));
app.use('/monsters', require('./routes/monsters/monster.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = apiInfo.env === 'production' ? (apiInfo.port || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));