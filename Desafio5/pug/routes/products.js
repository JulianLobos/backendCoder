const router = require('express').Router();
const products = [];

const getById = (id) => {
    const item = products.find(item => item.id === id);
    return item;
}

const getIndexById = (id) => {
    const index = products.findIndex(item => item.id === id);
    return index;
}

const getMaxId = () => {
    const ids = products.map(item => item.id);
    if (ids.length === 0){
        return 0;
    }
    return Math.max(...ids);
}

router.get('/productos', (req, res) => {
    res.render('form');
})

router.get('/', (req, res) => {
    res.render('productos', { products });
})

router.get('/listaproductos', (req, res) => {
    res.render('productos', { products });
})

router.post('/productos', (req, res) => {
    const id = getMaxId() + 1;
    const { nombre, precio, url } = req.body;
    products.push({ nombre, precio, url, id });
    res.render('form');
})

router.get('/:id', (req, res) => {
    if(isNaN(parseInt(req.params.id))) {
        res.status(400).json({"error": "El parámetro no es un número"});
    } else {
        const id = parseInt(req.params.id);
        const maxId = getMaxId();
        if(id > maxId || id < 1){
            res.status(400).json({"error": "El parámetro está fuera de rango"});
        } else {
            const prod = getById(id)
            if(prod){
                res.status(200).json(getById(id));
            } else {
                res.status(200).json({"error": "Producto no encontrado"});
            }
        }
    }
});
module.exports = router;