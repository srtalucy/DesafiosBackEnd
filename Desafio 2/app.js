const { read } = require('fs')

const fs= require('fs').promises

class ProductManager{
    constructor(path){
        this.productosFile = 'Productos.json'
        this.path = path
        
    }
    async readProduct(){
        try {
            const res = await fs.readFile(this.path, 'utf8')
            return JSON.parse(res)
        } catch (error) {
            if(error.code === 'ENOENT'){
                return []
            }else{
                throw error
            }
        }
    }

    async getProduct(){
        try {
            return await this.readProduct()
        } catch (error) {
            console.error('Error al traer los productos', error);
        }
    }
    async addProduct(title, description, price, thumbnail, code, stock){
      try {
        let products = await this.readProduct()
        const product_id = products.length +1
           const product = {
            id: product_id,
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }
        products.push(product)
        await fs.writeFile(this.productosFile, JSON.stringify(products, null, 2))
        console.log('Producto agregado correctamente');
      } catch (error) {
        console.log('Error al agregar el producto', error);
      }
    }


    async getProductById(id){
       try {
            let products = await this.readProduct()
            const productFound = products.find((p)=>p.id===id)
            if(productFound){
                products.forEach(product =>{
                    if(product.id === id){
                        console.log('El producto es:', product);
                    }
                })
            }else{
                console.log('Not found');
            }
       } catch (error) {
            console.error('Error al buscar producto', error);
       }

    }

    async updateProduct(id, title, description, price, thumbnail, code, stock){
        try {
            let products = await this.readProduct()
            const productUpdate ={
                id,
                title, 
                description, 
                price, 
                thumbnail, 
                code, 
                stock
            }
            const product_found = products.find((p)=>p.id=== id)

            if (product_found){
                products.splice(product_found, 1, productUpdate)
                await fs.writeFile(this.productosFile, JSON.stringify(products, null, 2))
                console.log('Producto actualizado correctamente');
            }else{
                console.log('No se encontró producto con ese id para actualizar');
            }
        } catch (error) {
            console.error('No se pudo actualizar el producto correctamente', error);
        }
    }

    async deleteProduct(id){
        const products = await this.readProduct()
        const delete_product = products.filter((p)=>p.id != id)
        await fs.writeFile(this.productosFile, JSON.stringify(delete_product, null, 2))
                console.log('Producto eliminado correctamente');
        
    }
}

const productManager = new ProductManager('./productos.json')


/* Ya cree productos en el json */
// productManager.addProduct("Manzana", "una rica manzana roja", 1000, "imagen de manzana", 1222, 1)
// productManager.addProduct("Pera", "pera dulce la mas dulce", 1500, "imagen de pera", 4562, 7)
// productManager.addProduct("Banana", "bananas del ecuador con sticker", 500, "imagen de banana", 4856, 6)

/* Buscar por id */
// productManager.getProductById()



/* Actualizar un producto*/
// productManager.updateProduct(4, "Manzana 2", "manzana verde el litoral", 1300, 'imagen de manzana 2', 12, 1)


/* Borrar un producto */ 

// productManager.deleteProduct(2)

/*Mostrar producto*/
productManager.getProduct().then(product => console.log(product))