// Instanciar ambas clases

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
     ui.mostrarEstablecimientos();
})
//conectar el el valor de input
const buscador = document.querySelector('#buscar input')
//Realizamos la busqueda
buscador.addEventListener('input',()=>{
    if(buscador.value.length > 3){
       ui.obtenerSugerencias(buscador.value)
    }else if(buscador.value.length === 0){
        //Reinicia el mapa
        ui.inicializarMapa()
        //Muestra todos los establecimientos de nuevo
        ui.mostrarEstablecimientos()
    }
})