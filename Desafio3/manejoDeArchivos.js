const { promises: fs } = require('fs');

class Contenedor{
    constructor(ruta){
        this.ruta = ruta;
    }

    async save(data){
        const objetos = await this.getAll();
        let newId
        if(objetos.length == 0){
            newId = 1;
        }else{
            const lastId = parseInt(objetos[objetos.length -1].id);
            newId = lastId + 1;
        }
        objetos.push({...data, id: newId})

        try{
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
            return newId;
        }catch(error){
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async getById(id){
        try {
            const objetos = await this.getAll();
            const objeto = objetos.filter(item => item.id === id);
            if (objeto.length === 0) {
                return null;
            }
            return objeto[0];
        } catch (err) {
            throw new Error(err);
        }
    }

    async getAll(){
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objetos);
        } catch (error) {
            return []
        }
    }

    async deleteById(id){
        const objetos = await this.getAll();
        const nuevosObjetos = objetos.filter(elemento => elemento.id !== id);
        if(nuevosObjetos.length == objetos.length){
            throw new Error(`Error al borrar: No se encontró el ID: ${id}`)
        }

        try {
            await fs.writeFile(this.ruta, JSON.stringify(nuevosObjetos, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll(){
        try {
            const objetos = [];
            fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2));
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

}

const productList = new Contenedor('./products.txt');

module.exports = {Contenedor};

// productList.save({Title: 'Pijama', Price: '4500'})



// CONSEGUIR PRODUCTO POR ID:

// const getElementFunction = async () => {
//     console.log(await productList.getById(2))
// }
// getElementFunction();

// CONSEGUIR TODOS LOS PRODUCTOS: 

// const getAllElementsFunction = async () => {
//     console.log(await productList.getAll())
// }

// getAllElementsFunction()