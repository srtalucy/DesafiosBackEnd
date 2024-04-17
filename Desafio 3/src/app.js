const express = require("express")
const ProductManager = require('./products-manager.js')
const app = express()
const manager = new ProductManager('./src/productos.json')

const PORT = 8080

app.use(express.urlencoded({ extended: true }))

app.get('/products', async(req, res)=>{
    try {
        const arrayProducts = await manager.readFilesMio()
        let limit = parseInt(req.query.limit)
        if(limit){
            const arraylimit = arrayProducts.slice(0, limit)
            return res.send(arraylimit)
        }else{
            return res.send(arrayProducts)
        }
    } catch (error) {
        console.log(error)
        return res.send('Error al procesar el pedido')
    }
})
app.get('/products/:pid', async(req, res) =>{
    try {
        let pid = parseInt(req.params.pid)
        const sought = await manager.getProductById(pid)
        if(pid){
            return res.send(sought)
        }else{
            console.log('Not found')
        }
    } catch (error) {
        console.log(error)
        return res.send('Error en el proceso de buscar por id')
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



/*
const usuarios =[
    {id:1, nombre:'nombre1', apellido: 'apellido1', email:'usuario1@correo.com'},
    {id:2, nombre:'nombre2', apellido: 'apellido2', email:'usuario2@correo.com'},
    {id:3, nombre:'nombre3', apellido: 'apellido3', email:'usuario3@correo.com'}
]



//Primer Endpoint
app.get('/bienvenida', (req, res)=>{
    res.send('Server Express')
})
//-------------

//Segundo Endpoint
app.get('/usuario', (req, res)=>{
    const user = {
        nombre: 'Coder',
        email: 'coder@house.com'
    }
    res.json(user)
})
//-------------

//Request
app.get('/:idUsuario', (req, res)=>{
    let idUsuario = req.params.idUsuario
    let usuario = usuarios.find(u => u.id == idUsuario)
    if(!usuario){
        res.send({error:'Usuario no encontrado'})
    }else{
        res.json(usuario)
    }
  
}) */