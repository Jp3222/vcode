function seleccionar(tabla, campos, where){
    return 'select ', campos,' from ', tabla, ' where ', where;
}

function insertar(tabla, campos, valores){
    return 'insert into ', tabla,'(',campos,') values(',valores,')';
}

function actualizar(tabla, cambio, where){
    return 'update ', tabla,' set', cambio ,' where ', where;
}

function eliminar(tabla, where) {
    return 'delete from ' ,tabla, 'where ', where; 
}

const querys={
    seleccionar,insertar,actualizar,eliminar
}

module.exports = querys;