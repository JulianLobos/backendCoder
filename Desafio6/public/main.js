const socket = io.connect();

const agregarBtn = document.getElementById('agregarBtn')

agregarBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('productTitle').value,
        precio: document.getElementById('productPrice').value,
        url: document.getElementById('productImg').value
    }
    document.getElementById('addForm').reset();
    socket.emit('add_product', data)
});

socket.on('all_products', products => {
    document.getElementById('list').innerHTML = ''
    products.forEach(producto => {
        document.getElementById('list').innerHTML += `
        <div class="row">
            <div class="col d-flex align-items-center">
            <p>${producto.nombre}</p>
            </div>
            <div class="col d-flex align-items-center">
            <p>${producto.precio}</p>
            </div>
            <div class="col d-flex align-items-center">
            <img class="img-thumbnail" src="${producto.url}" alt="${producto.nombre}" style="width: 100px">
            </div>
        </div>
        `
    })

})