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

async function verify_ethnicity_name(name) {
    const result = await pool.query('SELECT * FROM etnias WHERE etnias.nombre = $1', [name])
    return result.rows.length > 0
}

async function verify_place_name(name) {
    const result = await pool.query('SELECT * FROM lugares WHERE lugares.nombre = $1', [name])
    return result.rows.length > 0
}

async function verify_default_ethnicity(id) {
    const result = await pool.query('SELECT nombre FROM etnias WHERE etnias.id = $1', [id])
    return result.rows[0].nombre === 'Desconocida'
}

async function verify_default_place(id) {
    const result = await pool.query('SELECT nombre FROM lugares WHERE lugares.id = $1', [id])
    return result.rows[0].nombre === 'Desconocido'
}

/*GET*/

async function get_all_characters() {
    const result = await pool.query('SELECT * FROM personajes')
    return result.rows
}

async function get_character(id) {
    const result = await pool.query('SELECT * FROM personajes WHERE id = $1',
        [id]
    )
    if(result.rowCount === 0){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

async function get_all_ethnicities() {
    const result = await pool.query('SELECT * FROM etnias')
    return result.rows
}

async function get_ethnicity(id) {
    const result = await pool.query('SELECT * FROM etnias WHERE id = $1',
        [id]
    )
    if(result.rowCount === 0){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

async function get_all_places() {
    const result = await pool.query('SELECT * FROM lugares')
    return result.rows
}

async function get_place(id) {
    const result = await pool.query('SELECT * FROM lugares WHERE id = $1',
        [id]
    )
    if(result.rowCount === 0){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

/*POST*/

async function create_character(
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
    let columns = ["nombre", "edad"]
    let values = [nombre, edad]
    let params = ["$1", "$2"]
    let param_num = 3

    if(etnia != null){
        columns.push("etnia")
        values.push(etnia)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(origen != null){
        columns.push("origen")
        values.push(origen)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(apariencia != null){
        columns.push("apariencia")
        values.push(apariencia)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(historia != null){
        columns.push("historia");
        values.push(historia);
        params.push(`$${param_num}`);
        param_num=param_num+1
    }
    if(clase != null){
        columns.push("clase");
        values.push(clase);
        params.push(`$${param_num}`);
        param_num=param_num+1
    }
    if(imagen != null){
        columns.push("imagen");
        values.push(imagen);
        params.push(`$${param_num}`);
        param_num=param_num+1
    }
    if(imagen_indice != null){
        columns.push("imagen_indice");
        values.push(imagen_indice);
        params.push(`$${param_num}`);
        param_num=param_num+1
    }

    const result = await pool.query(
        `insert into personajes (${columns.join(", ")}) values (${params.join(", ")}) RETURNING *`, values
    )

    if( !result || (result.rows.length === 0) ){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

async function create_ethnicity(
    nombre,
    descripcion,
    naturaleza,
    imagen_indice,
    moodboard,
    origen,
){
    let columns = ["nombre"]
    let values = [nombre]
    let params = ["$1"]
    let param_num = 2

    if(descripcion != null){
        columns.push("descripcion")
        values.push(descripcion)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(naturaleza != null){
        columns.push("naturaleza")
        values.push(naturaleza)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(imagen_indice != null){
        columns.push("imagen_indice")
        values.push(imagen_indice)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(moodboard != null){
        columns.push("moodboard")
        values.push(moodboard)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(origen != null){
        columns.push("origen")
        values.push(origen)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }

    const result = await pool.query(
        `insert into etnias (${columns.join(", ")}) values (${params.join(", ")}) RETURNING *`, values
    )

    if( !result || (result.rows.length === 0) ){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

async function create_place(
    nombre,
    descripcion,
    faccion,
    etnia_dominante,
    clima,
    imagen,
){
    let columns = ["nombre"]
    let values = [nombre]
    let params = ["$1"]
    let param_num = 2

    if(descripcion != null){
        columns.push("descripcion")
        values.push(descripcion)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(faccion != null){
        columns.push("faccion")
        values.push(faccion)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(clima != null){
        columns.push("clima")
        values.push(clima)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(imagen != null){
        columns.push("imagen")
        values.push(imagen)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }
    if(etnia_dominante != null){
        columns.push("etnia_dominante")
        values.push(etnia_dominante)
        params.push(`$${param_num}`)
        param_num=param_num+1
    }

    const result = await pool.query(
        `insert into lugares (${columns.join(", ")}) values (${params.join(", ")}) RETURNING *`, values
    )

    if( !result || (result.rows.length === 0) ){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

/*DELETE*/

async function delete_character(id){
    const result = await pool.query(
        'DELETE FROM personajes WHERE id = $1 RETURNING *', [id]
    )
    if(result.rowCount === 0){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

async function delete_ethnicity(id){
    const result = await pool.query(
        'DELETE FROM etnias WHERE id = $1 RETURNING *', [id]
    )
    if(result.rowCount === 0){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

async function delete_place(id){
    const result = await pool.query(
        'DELETE FROM lugares WHERE id = $1 RETURNING *', [id]
    )
    if(result.rowCount === 0){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

/*PUT*/

async function modify_character(
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
    const columns = []
    const values = []
    let param_num = 1

    if(nombre != null){
        columns.push(`nombre = $${param_num}`)
        values.push(nombre)
        param_num=param_num+1
    }
    if(etnia != null){
        columns.push(`etnia = $${param_num}`)
        values.push(etnia)
        param_num=param_num+1
    }
    if(edad != null){
        columns.push(`edad = $${param_num}`)
        values.push(edad)
        param_num=param_num+1
    }
    if(origen != null){
        columns.push(`origen = $${param_num}`)
        values.push(origen)
        param_num=param_num+1
    }
    if(apariencia != null){
        columns.push(`apariencia = $${param_num}`)
        values.push(apariencia)
        param_num=param_num+1
    }
    if(historia != null){
        columns.push(`historia = $${param_num}`);
        values.push(historia);
        param_num=param_num+1
    }
    if(clase != null){
        columns.push(`clase = $${param_num}`);
        values.push(clase);
        param_num=param_num+1
    }
    if(imagen != null){
        columns.push(`imagen = $${param_num}`);
        values.push(imagen);
        param_num=param_num+1
    }
    if(imagen_indice != null){
        columns.push(`imagen_indice = $${param_num}`);
        values.push(imagen_indice);
        param_num=param_num+1
    }
    values.push(id)

    const result = await pool.query(
        `update personajes set ${columns.join(", ")} where id = $${param_num} RETURNING *`, values
    )

    if( !result || (result.rows.length === 0) ){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

async function modify_ethnicity(
    id,
    nombre,
    descripcion,
    naturaleza,
    imagen_indice,
    moodboard,
    origen,
){
    const columns = []
    const values = []
    let param_num = 1

    if(nombre != null){
        columns.push(`nombre = $${param_num}`)
        values.push(nombre)
        param_num=param_num+1
    }
    if(descripcion != null){
        columns.push(`descripcion = $${param_num}`)
        values.push(descripcion)
        param_num=param_num+1
    }
    if(naturaleza != null){
        columns.push(`naturaleza = $${param_num}`)
        values.push(naturaleza)
        param_num=param_num+1
    }
    if(imagen_indice != null){
        columns.push(`imagen_indice = $${param_num}`)
        values.push(imagen_indice)
        param_num=param_num+1
    }
    if(moodboard != null){
        columns.push(`moodboard = $${param_num}`)
        values.push(moodboard)
        param_num=param_num+1
    }
    if(origen != null){
        columns.push(`origen = $${param_num}`)
        values.push(origen)
        param_num=param_num+1
    }
    values.push(id)

    const result = await pool.query(
        `update etnias set ${columns.join(", ")} where id = $${param_num} RETURNING *`, values
    )

    if( !result || (result.rows.length === 0) ){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

async function modify_place(
    id,
    nombre,
    descripcion,
    faccion,
    etnia_dominante,
    clima,
    imagen,
){
    const columns = []
    const values = []
    let param_num = 1

    if(nombre != null){
        columns.push(`nombre = $${param_num}`)
        values.push(nombre)
        param_num=param_num+1
    }
    if(descripcion != null){
        columns.push(`descripcion = $${param_num}`)
        values.push(descripcion)
        param_num=param_num+1
    }
    if(faccion != null){
        columns.push(`faccion = $${param_num}`)
        values.push(faccion)
        param_num=param_num+1
    }
    if(etnia_dominante != null){
        columns.push(`etnia_dominante = $${param_num}`)
        values.push(etnia_dominante)
        param_num=param_num+1
    }
    if(clima != null){
        columns.push(`clima = $${param_num}`)
        values.push(clima)
        param_num=param_num+1
    }
    if(imagen != null){
        columns.push(`imagen = $${param_num}`)
        values.push(imagen)
        param_num=param_num+1
    }
    values.push(id)

    const result = await pool.query(
        `update lugares set ${columns.join(", ")} where id = $${param_num} RETURNING *`, values
    )

    if( !result || (result.rows.length === 0) ){
        return undefined
    }
    else{
        return result.rows[0]
    }
}

/*Funciones a exportar*/

module.exports = {
    verify_ethnicity_name,
    verify_place_name,
    verify_default_ethnicity,
    verify_default_place,

    get_all_characters,
    get_all_ethnicities,
    get_all_places,

    get_character,
    get_ethnicity,
    get_place,

    create_character,
    create_ethnicity,
    create_place,

    delete_character,
    delete_ethnicity,
    delete_place,

    modify_character,
    modify_ethnicity,
    modify_place,
}