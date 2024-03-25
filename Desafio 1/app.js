class ProductManager{
    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products
    }


    addProduct (title, description, price, thumbnail, code, stock){
          const product_id = this.products.length + 1
          const product = {
            id: product_id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
          }
          const codeValidation = this.products.find((p)=>p.code === product.code)
          if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Faltan campos");
            return
          }else if (stock<0){
            console.log("El stock no puede ser negativo");
          }else{
            if(!codeValidation){
                this.products.push(product)
              }else{
                console.log("Ya existe un producto con ese código");
                return
              }
          }

    }
    getProductById(product_id){
        const productFound = this.products.find((p)=>p.id ===product_id)
        if(productFound){
           this.products.forEach(product => {
            if(product.id === product_id){
                console.log("El producto es:", product);
            }
           });
        }else{
            console.log("Not found");
        }
    }

}


const productManager = new ProductManager()


//Algunos productos
productManager.addProduct("Manzana", "una rica manzana roja", 1000, "imagen de manzana", 1222, 1)
// productManager.addProduct("Pera", "pera dulce la mas dulce", 1500, "imagen de pera", 4562, 7)
// productManager.addProduct("Banana", "bananas del ecuador con sticker", 500, "imagen de banana", 4856, 6)

//Para testear con el campo code repetido que tira error
// productManager.addProduct("Banana", "bananas del ecuador con sticker", 500, "imagen de banana", 4856, 6) 

//Buscar por id; Si encuentra el producto lo muestra, sino tira error
// productManager.getProductById(5)

//Mostrar todos los productos
const products = productManager.getProducts()
// console.log(products);




