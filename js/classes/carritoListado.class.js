class CarritoListado{
    constructor(carrito){
        this.carrito = carrito;
    }
    agregarProductoCarrito(productoCarrito) {
        let productoExistente = carrito.find(prodCarrito => prodCarrito.nombre === productoCarrito.nombre)
        if (productoExistente){
            console.log ("producto",Object.values(productoExistente))
            let cantidadProducto = Number(productoExistente.cantidad)
            console.log("cantidad",cantidadProducto)
            cantidadProducto = cantidadProducto+1
            console.log("cantidadAumentada",cantidadProducto)
            return cantidadProducto
        }
        else{
            this.carrito.push(productoCarrito);
        }
    }
}