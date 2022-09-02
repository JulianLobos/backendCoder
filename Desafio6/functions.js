import fetch from "node-fetch";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const addProduct = async (data) => {
    try {
        const response = await fetch('http://localhost:8080/api/productos', {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        const result = await response.json()
        return result

    } catch (error) {
        let err = new Error(error)
        return err
    }
}

const leerChat = async () => {

    try {
        const data = await fs.promises.readFile('chat.txt', 'utf-8', (err, data) => {
            if(err) throw err
            return data
        })
        return JSON.parse(data) 

    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const enviarChat = async (mensaje) => {

    try {
        const chat = await leerChat() 
        chat.push(mensaje)
        await fs.promises.writeFile('chat.txt', JSON.stringify(chat, null, 2), err => {
        if(err) throw err
    })

    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

export { addProduct, enviarChat, leerChat }