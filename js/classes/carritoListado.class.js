class CarritoListado{
    constructor(carrito){
        this.carrito = carrito;
    }
    agregarProductoCarrito(productoCarrito) {
        let indexProducto = carrito.findIndex(prodCarrito => prodCarrito.nombre === productoCarrito.nombre)
        if (indexProducto >= 0){
            this.carrito[indexProducto].cantidad ++
            let subTotalCarrito = this.carrito[indexProducto].cantidad*this.carrito[indexProducto].precio
            this.carrito[indexProducto].subTotal = subTotalCarrito
        }
        else{
            this.carrito.push(productoCarrito);
        }
    }
}