const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.static(__dirname + '/'));
app.use(morgan('dev'));

app.listen(8080);
console.log("App listening on port 8080");