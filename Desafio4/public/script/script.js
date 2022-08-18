function sendProduct(){
    event.preventDefault();
    let title = document.getElementById('productTitle');
    let price = document.getElementById('productPrice');
    let thumbnail = document.getElementById('productImg');

    let product = {
        "title": title.value,
        "price": price.value,
        "thumbnail": thumbnail.value
    };

    fetch('./api/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then((response) => {
        console.log('Succes:', response);
        title.value = '';
        price.value = '';
        thumbnail.value = '';
    });
}