const ref = {
    inicio:"/",
    login:"login"
}

function getPagina(index = int) {
    ruta = String;
    switch(index){
        case 0:
            ruta = rutas.inicio;
            break;
        case 1:
            ruta = rutas.login;
            break;
    }
    setTimeout(() => {
        window.location.href = ruta;
        },0);    
}