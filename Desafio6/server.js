import express from 'express';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { engine } from 'express-handlebars';
import { router, products } from './routes/productos.js';
import { addProduct, leerChat, enviarChat } from './functions.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const http = new HTTPServer(app);
const io = new IOServer(http);

app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/productos', router);

app.get('/productos', (req, res) => {
    res.render('form');
});

io.on('connection', async (socket) => {
    console.log('Usuario nuevo conectado');

    socket.emit('all_products', products)

    socket.on('add_product', async data => {
        await addProduct(data)
        io.sockets.emit('all_products', products)
    });

    const chatBody = await leerChat();
    socket.emit('all_messages', chatBody);

    socket.on('new_message', async data => {
        await enviarChat(data)
        io.sockets.emit('all_messages', await leerChat())
      })
    
})

const connectedServer = http.listen(8080, () => {
    console.log('Servidor http con Socket listo');
})