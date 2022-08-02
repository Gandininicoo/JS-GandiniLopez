class ListaNadadores {
    constructor(nadadores) {
        this.nadadores = nadadores;
    }

    agregarNadador(nadador) {
        this.nadadores.push(nadador);
    }

    darCantidad() {
        return this.nadadores.length;
    }

    buscar(nadadorABorrar) {
        const finded = this.nadadores.find(n => n.nombre === nadadorABorrar)
        if(finded){
            const index = this.nadadores.indexOf(finded)
            this.nadadores.splice(index, 1)
            alert(`Competidor borrado con exito`)
        }
        else {
            alert(`No se encontro el competidor a borrar`)
            }
    }
}
