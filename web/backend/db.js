const {Pool} = require('pg')

const pool = new Pool({
    user: 'oniricuser',
    port: 5432,
    host: 'db',     /*para que se conecte bien a la base de datos que esta en docker, en lugar de 'localhost' se pone 'db'*/
    database: 'magnabase',
    password: 'saturno',
})

/*Funciones*/

/*AUXILIARES*/

async function verificar_nombre_de_etnia(name) {
    const resultado = await pool.query('SELECT * FROM etnias WHERE etnias.nombre = $1', [name])
    return resultado.rows.length > 0
}

async function verificar_nombre_de_lugar(name) {
    const resultado = await pool.query('SELECT * FROM lugares WHERE lugares.nombre = $1', [name])
    return resultado.rows.length > 0
}

async function es_etnia_default(id) {
    const resultado = await pool.query('SELECT nombre FROM etnias WHERE etnias.id = $1', [id])
    return resultado.rows[0].nombre === 'Desconocida'
}

async function es_lugar_default(id) {
    const resultado = await pool.query('SELECT nombre FROM lugares WHERE lugares.id = $1', [id])
    return resultado.rows[0].nombre === 'Desconocido'
}

/*GET*/

async function obtener_todos_los_personajes() {
    const resultado = await pool.query('SELECT * FROM personajes')
    return resultado.rows
}

async function obtener_personaje(id) {
    const resultado = await pool.query('SELECT * FROM personajes WHERE id = $1',
        [id]
    )
    if( !resultado || (resultado.rowCount === 0) ){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

async function obtener_todas_las_etnias() {
    const resultado = await pool.query('SELECT * FROM etnias')
    return resultado.rows
}

async function obtener_etnia(id) {
    const resultado = await pool.query('SELECT * FROM etnias WHERE id = $1',
        [id]
    )
    if( !resultado || (resultado.rowCount === 0) ){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

async function obtener_todos_los_lugares() {
    const resultado = await pool.query('SELECT * FROM lugares')
    return resultado.rows
}

async function obtener_lugar(id) {
    const resultado = await pool.query('SELECT * FROM lugares WHERE id = $1',
        [id]
    )
    if( !resultado || (resultado.rowCount === 0) ){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

/*POST*/

async function crear_personaje(
    nombre,
    etnia,
    edad,
    origen,
    apariencia,
    historia,
    clase,
    imagen,
    imagen_indice,
){
    let columnas = ["nombre", "edad"]
    let valores = [nombre, edad]
    let parametros = ["$1", "$2"]
    let param_num = 3

    if(etnia != null){
        columnas.push("etnia")
        valores.push(etnia)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(origen != null){
        columnas.push("origen")
        valores.push(origen)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(apariencia != null){
        columnas.push("apariencia")
        valores.push(apariencia)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(historia != null){
        columnas.push("historia");
        valores.push(historia);
        parametros.push(`$${param_num}`);
        param_num=param_num+1
    }
    if(clase != null){
        columnas.push("clase");
        valores.push(clase);
        parametros.push(`$${param_num}`);
        param_num=param_num+1
    }
    if(imagen != null){
        columnas.push("imagen");
        valores.push(imagen);
        parametros.push(`$${param_num}`);
        param_num=param_num+1
    }
    if(imagen_indice != null){
        columnas.push("imagen_indice");
        valores.push(imagen_indice);
        parametros.push(`$${param_num}`);
        param_num=param_num+1
    }

    const resultado = await pool.query(
        `insert into personajes (${columnas.join(", ")}) values (${parametros.join(", ")}) RETURNING *`, valores
    )

    if( !resultado || (resultado.rows.length === 0) ){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

async function crear_etnia(
    nombre,
    descripcion,
    naturaleza,
    imagen_indice,
    moodboard,
    origen,
){
    let columnas = ["nombre"]
    let valores = [nombre]
    let parametros = ["$1"]
    let param_num = 2

    if(descripcion != null){
        columnas.push("descripcion")
        valores.push(descripcion)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(naturaleza != null){
        columnas.push("naturaleza")
        valores.push(naturaleza)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(imagen_indice != null){
        columnas.push("imagen_indice")
        valores.push(imagen_indice)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(moodboard != null){
        columnas.push("moodboard")
        valores.push(moodboard)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(origen != null){
        columnas.push("origen")
        valores.push(origen)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }

    const resultado = await pool.query(
        `insert into etnias (${columnas.join(", ")}) values (${parametros.join(", ")}) RETURNING *`, valores
    )

    if( !resultado || (resultado.rows.length === 0) ){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

async function crear_lugar(
    nombre,
    descripcion,
    faccion,
    etnia_dominante,
    clima,
    imagen,
){
    let columnas = ["nombre"]
    let valores = [nombre]
    let parametros = ["$1"]
    let param_num = 2

    if(descripcion != null){
        columnas.push("descripcion")
        valores.push(descripcion)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(faccion != null){
        columnas.push("faccion")
        valores.push(faccion)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(clima != null){
        columnas.push("clima")
        valores.push(clima)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(imagen != null){
        columnas.push("imagen")
        valores.push(imagen)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(etnia_dominante != null){
        columnas.push("etnia_dominante")
        valores.push(etnia_dominante)
        parametros.push(`$${param_num}`)
        param_num=param_num+1
    }

    const resultado = await pool.query(
        `insert into lugares (${columnas.join(", ")}) values (${parametros.join(", ")}) RETURNING *`, valores
    )

    if( !resultado || (resultado.rows.length === 0) ){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

/*DELETE*/

async function eliminar_personaje(id){
    const resultado = await pool.query(
        'DELETE FROM personajes WHERE id = $1 RETURNING *', [id]
    )
    if(resultado.rowCount === 0){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

async function eliminar_etnia(id){
    const resultado = await pool.query(
        'DELETE FROM etnias WHERE id = $1 RETURNING *', [id]
    )
    if(resultado.rowCount === 0){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

async function eliminar_lugar(id){
    const resultado = await pool.query(
        'DELETE FROM lugares WHERE id = $1 RETURNING *', [id]
    )
    if(resultado.rowCount === 0){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

/*PUT*/

async function modificar_personaje(
    id,
    nombre,
    etnia,
    edad,
    origen,
    apariencia,
    historia,
    clase,
    imagen,
    imagen_indice,
){
    let columnas = []
    let valores = []
    let param_num = 1

    if(nombre != null){
        columnas.push(`nombre = $${param_num}`)
        valores.push(nombre)
        param_num=param_num+1
    }
    if(etnia != null){
        columnas.push(`etnia = $${param_num}`)
        valores.push(etnia)
        param_num=param_num+1
    }
    if(edad != null){
        columnas.push(`edad = $${param_num}`)
        valores.push(edad)
        param_num=param_num+1
    }
    if(origen != null){
        columnas.push(`origen = $${param_num}`)
        valores.push(origen)
        param_num=param_num+1
    }
    if(apariencia != null){
        columnas.push(`apariencia = $${param_num}`)
        valores.push(apariencia)
        param_num=param_num+1
    }
    if(historia != null){
        columnas.push(`historia = $${param_num}`);
        valores.push(historia);
        param_num=param_num+1
    }
    if(clase != null){
        columnas.push(`clase = $${param_num}`);
        valores.push(clase);
        param_num=param_num+1
    }
    if(imagen != null){
        columnas.push(`imagen = $${param_num}`);
        valores.push(imagen);
        param_num=param_num+1
    }
    if(imagen_indice != null){
        columnas.push(`imagen_indice = $${param_num}`);
        valores.push(imagen_indice);
        param_num=param_num+1
    }
    valores.push(id)

    const resultado = await pool.query(
        `update personajes set ${columnas.join(", ")} where id = $${param_num} RETURNING *`, valores
    )

    if( !resultado || (resultado.rows.length === 0) ){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

async function modificar_etnia(
    id,
    nombre,
    descripcion,
    naturaleza,
    imagen_indice,
    moodboard,
    origen,
){
    let columnas = []
    let valores = []
    let param_num = 1

    if(nombre != null){
        columnas.push(`nombre = $${param_num}`)
        valores.push(nombre)
        param_num=param_num+1
    }
    if(descripcion != null){
        columnas.push(`descripcion = $${param_num}`)
        valores.push(descripcion)
        param_num=param_num+1
    }
    if(naturaleza != null){
        columnas.push(`naturaleza = $${param_num}`)
        valores.push(naturaleza)
        param_num=param_num+1
    }
    if(imagen_indice != null){
        columnas.push(`imagen_indice = $${param_num}`)
        valores.push(imagen_indice)
        param_num=param_num+1
    }
    if(moodboard != null){
        columnas.push(`moodboard = $${param_num}`)
        valores.push(moodboard)
        param_num=param_num+1
    }
    if(origen != null){
        columnas.push(`origen = $${param_num}`)
        valores.push(origen)
        param_num=param_num+1
    }
    valores.push(id)

    const resultado = await pool.query(
        `update etnias set ${columnas.join(", ")} where id = $${param_num} RETURNING *`, valores
    )

    if( !resultado || (resultado.rows.length === 0) ){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

async function modificar_lugar(
    id,
    nombre,
    descripcion,
    faccion,
    etnia_dominante,
    clima,
    imagen,
){
    let columnas = []
    let valores = []
    let param_num = 1

    if(nombre != null){
        columnas.push(`nombre = $${param_num}`)
        valores.push(nombre)
        param_num=param_num+1
    }
    if(descripcion != null){
        columnas.push(`descripcion = $${param_num}`)
        valores.push(descripcion)
        param_num=param_num+1
    }
    if(faccion != null){
        columnas.push(`faccion = $${param_num}`)
        valores.push(faccion)
        param_num=param_num+1
    }
    if(etnia_dominante != null){
        columnas.push(`etnia_dominante = $${param_num}`)
        valores.push(etnia_dominante)
        param_num=param_num+1
    }
    if(clima != null){
        columnas.push(`clima = $${param_num}`)
        valores.push(clima)
        param_num=param_num+1
    }
    if(imagen != null){
        columnas.push(`imagen = $${param_num}`)
        valores.push(imagen)
        param_num=param_num+1
    }
    valores.push(id)

    const resultado = await pool.query(
        `update lugares set ${columnas.join(", ")} where id = $${param_num} RETURNING *`, valores
    )

    if( !resultado || (resultado.rows.length === 0) ){
        return undefined
    }
    else{
        return resultado.rows[0]
    }
}

/*Funciones a exportar*/

module.exports = {
    verificar_nombre_de_etnia,
    verificar_nombre_de_lugar,
    es_etnia_default,
    es_lugar_default,

    obtener_todos_los_personajes,
    obtener_todas_las_etnias,
    obtener_todos_los_lugares,

    obtener_personaje,
    obtener_etnia,
    obtener_lugar,

    crear_personaje,
    crear_etnia,
    crear_lugar,

    eliminar_personaje,
    eliminar_etnia,
    eliminar_lugar,

    modificar_personaje,
    modificar_etnia,
    modificar_lugar,
}