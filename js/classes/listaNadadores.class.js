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
            Swal.fire({
                title: 'COMPETIDOR BORRADO CON EXITO',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        }
        else {
            Swal.fire({
                title: 'NO SE PUDO BORRAR',
                text: 'No se ha encontrado el competidor',
                icon: 'question',
                confirmButtonText: 'Aceptar'
            })
            }
    }
}
