const http = require('http');

const server = http.createServer((peticion, respuesta) => {
    const hora = new Date().getHours();
    let message;
    if(hora >= 6 && hora < 13){
        message = 'Buenos dias!';
    } else if(hora >= 13 && hora <20){
        message = 'Buenas tardes!'
    } else {
        message = 'Buenas Noches!'
    }

    respuesta.end(message)
})

const connectedServer = server.listen(8080, () => {
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
})