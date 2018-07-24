class UI {
    constructor(){
        this.api = new API()
       this.inicializarMapa()
    }
    //Inicializar el mapa vacio
    inicializarMapa(){
        this.latLng = {lat: 19.390519, lng: -99.3739778}

        this.mapa = new google.maps.Map(document.getElementById('mapa'), {
            center: this.latLng ,
            zoom: 6
          });
    }

    //Muestra los establesimientos de la Api
    mostrarEstablecimientos(){
        this.api.obtenerDatos().then(datos => {
            const resultado = datos.respuestaJSON.results
            //Muestra los marcadores
            this.mostrarMapa(resultado)
        })
    }
    //iniciar mapa
    
    //Mostrar los marcadores
    mostrarMapa(datos){
        //Mostrar infoWindow activo
        let infoWindowActivo

        datos.forEach(dato => {
            //Destructuring
            let {latitude, longitude, calle, regular, premium} = dato
            //Crear un objeto con la posicion
            let latLng={
                lat:Number (latitude),
                lng:Number (longitude)
            }
            //Cramos el marcador
            let marker =  new google.maps.Marker({
                position: latLng,
                map: this.mapa
            })
            //Creamos el infowindow con el metodo
            let infoWindow = this.crearInfoWindow(calle,regular,premium)

            //Creamos el evento para insertar el infowindow
            marker.addListener('click',()=>{
                //Cerrar el infoWindow
                if(infoWindowActivo){
                    infoWindowActivo.close()
                }
                //mostrar infowindow
                infoWindow.open(this.mapa, marker)

                //InfoWindow activo
                infoWindowActivo = infoWindow
            })

        });
    }
    //metodo para crear el infowindow
    crearInfoWindow(calle, regular, premium){
        //Crear el template
        let contenido = `
            <p>Direccion: ${calle}</p>
            <p>Regular: $${regular}</p>
            <p>Premium: $${premium}</p>
        `
        //Creamos el infoWindow
        let infoWindow = new google.maps.InfoWindow({
            content:contenido
        })
        return infoWindow
    }
    //Obtiene las sugerencias
    obtenerSugerencias(busqueda){
        this.api.obtenerDatos()
        .then(dato=>{
            const resultados = dato.respuestaJSON.results
            //Filra referencias
            this.filtrarSugerencias(resultados, busqueda)
        })
    }
    //metodo que filtra las sugerencias
    filtrarSugerencias(resultados, busqueda){
        const filtro = resultados.filter(filtro => filtro.calle.indexOf(busqueda) !== -1) 
        //Ejecutar la inicializacion de el mapa vacio
        this.inicializarMapa()
        //Mostrar los marcadores
        this.mostrarMapa(filtro)

    }

}