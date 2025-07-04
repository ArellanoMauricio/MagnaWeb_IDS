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



async function exist_character(id) {
    const result = await pool.query('SELECT * FROM personajes WHERE personajes.id = $1', [id])
    return result.rows.length > 0
}

async function exist_ethnicity(id) {
    const result = await pool.query('SELECT * FROM etnias WHERE etnias.id = $1', [id])
    return result.rows.length > 0
}

async function exist_place(id) {
    const result = await pool.query('SELECT * FROM lugares WHERE lugares.id = $1', [id])
    return result.rows.length > 0
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
    const columns = ["nombre", "etnia", "edad", "origen"]
    const values = [nombre, etnia, edad, origen]
    const params = ["$1", "$2", "$3", "$4"]
    let param_num = 5

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
){
    const columns = ["nombre"]
    const values = [nombre]
    const params = ["$1"]
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
    clima,
    imagen,
){
    const columns = ["nombre"]
    const values = [nombre]
    const params = ["$1"]
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

/*Funciones a exportar*/

module.exports = {
    verify_ethnicity_name,
    verify_place_name,

    exist_character,
    exist_ethnicity,
    exist_place,

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
}