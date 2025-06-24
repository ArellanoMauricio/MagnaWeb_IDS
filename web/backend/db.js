const {Pool} = require('pg')

const pool = new Pool({
    user: 'oniricuser',
    port: 5432,
    host: 'db',     /*para que se conecte bien a la base de datos que esta en docker, en lugar de 'localhost' se pone 'db'*/
    database: 'magnabase',
    password: 'saturno',
})

/*Funciones*/

async function get_all_caracters() {
    const result = await pool.query('SELECT * FROM personajes')
    return result.rows
}

async function get_all_ethnicities() {
    const result = await pool.query('SELECT * FROM etnias')
    return result.rows
}

async function get_all_places() {
    const result = await pool.query('SELECT * FROM lugares')
    return result.rows
}

/*Funciones a exportar*/

module.exports = {
    get_all_caracters,
    get_all_ethnicities,
    get_all_places,
}