const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();
const PORT = 8080;
const {Contenedor} = require('./manejoDeArchivos');
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor: ${error}`));


app.get('/', (req, res) => {
    res.send('<h1>Bienvenidos al servidor express</h1>')
})

app.get('/productos', async (req, res) => {
    try {
        const prod = new Contenedor('products.txt')
        const allProducts = await prod.getAll();
        res.json(allProducts);
    } catch (error) {
        console.log(`Error al obtener los productos ${error}`)
        res.status(500).send('Error')
    }
})

app.get('/productoRandom', async (req, res) => {
    try {
        const prod = new Contenedor('products.txt')
        const allProducts = await prod.getAll();
        if(allProducts.length > 0){
            const random = Math.floor(Math.random() * allProducts.length);
            const randomProduct = allProducts[random];
            res.json(randomProduct);
        }else{
            res.send('Error: No se encontraron productos!')
        }
    } catch (error) {
        console.log(`Error al obtener el producto ${error}`)
        res.status(500).send('Error al obtener el producto')
    }
})