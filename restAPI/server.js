require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const apiInfo = require('./config')

const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let whitelist = ['http://localhost:4000','http://localhost:3000'];
let corsOptions = {
    origin: (origin, callback)=>{
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },credentials: true
}

app.use(cors(corsOptions));

// api routes
app.use('/users', require('./routes/users/user.controller'));
app.use('/monsters', require('./routes/monsters/test'));

// global error handler
app.use(errorHandler);

// start server
const port = apiInfo.env === 'production' ? (apiInfo.port || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));