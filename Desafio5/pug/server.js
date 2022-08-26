const express = require('express');
const products = require('./routes/products');
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('views', './views');
app.set('view engine', 'pug');

app.use('/', products);

const server = app.listen(PORT, () => console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`));
server.on('error', err => console.log(`Error: ${err}`));