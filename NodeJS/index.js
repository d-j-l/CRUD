const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var productController = require('./controllers/productController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:61418' }));

app.listen(3000, () => console.log('server started on port : 3000'));

app.use('/products', productController);