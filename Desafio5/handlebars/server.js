const express = require('express');
const { engine } = require('express-handlebars');
const products = require('./routes/products');
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use('/', products);

const server = app.listen(PORT, () => console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`));
server.on('error', err => console.log(`Error: ${err}`));