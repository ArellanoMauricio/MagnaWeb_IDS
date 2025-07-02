const {Pool} = require('pg')

const pool = new Pool({
    user: 'oniricuser',
    port: 5432,
    host: 'db',     /*para que se conecte bien a la base de datos que esta en docker, en lugar de 'localhost' se pone 'db'*/
    database: 'magnabase',
    password: 'saturno',
})

/*Funciones*/

async function get_all_characters() {
    const result = await pool.query('SELECT * FROM personajes')
    return result.rows
}

async function get_character(id) {
    const result = await pool.query('SELECT * FROM personajes WHERE id = $1',
        [id]
    )
    if (result.rowCount === 0) {
        return undefined
    } else {
        return result.rows[0]
    }
}

async function create_character(nombre, etnia, edad, origen, apariencia, historia, clase, imagen, imagen_indice) {
    const response = await dbClient.query(
        "INSERT INTO lines (nombre, etnia, edad, origen, apariencia, historia, clase, imagen, imagen_indice VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", 
        [nombre, etnia, edad, origen, apariencia, historia, clase, imagen, imagen_indice]
    )
    return {
        nombre, etnia, edad, origen, apariencia, historia, clase, imagen, imagen_indice
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
    if (result.rowCount === 0) {
        return undefined
    } else {
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
    if (result.rowCount === 0) {
        return undefined
    } else {
        return result.rows[0]
    }
}

/*Funciones a exportar*/

module.exports = {
    get_all_characters,
    get_all_ethnicities,
    get_all_places,
    get_character,
    get_ethnicity,
    get_place,
}