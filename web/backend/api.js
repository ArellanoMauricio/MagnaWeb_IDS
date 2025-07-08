const express = require("express")
const path = require("path")

const app = express()
app.use(express.json())

const port = 3000
app.listen(port, () => console.log(`Server running on port ${port}`));

const {
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
} = require("./db.js")
const { Console } = require("console")

/*-------------------------------------------------------------------------------------*/
/*
ACLARACION IMPORTANTE (Mauricio)

En clase se dejo claro que no hay que mezclar ingles y español,
pero opte por usar español unicamente para las variables de retorno,
el resto estarán' en ingles.
*/
/*-------------------------------------------------------------------------------------*/

/*Solicitudes de la api*/

/*GET*/

app.get("/api/personajes", async (req, res) => {
  try{
    const personajes = await get_all_characters()

    if(!personajes || (personajes.length === 0) ){
      console.log('No se recibio ningun personaje')
      return res.status(404).json({ error: 'No se encontraron personajes' })
    }
    else{
      console.log('Personajes recibidos con exito')
      return res.status(200).json(personajes)
    }
  }
  catch(err){
    console.error('Error al obtener personajes: ', err)
    return res.status(500).json({ error: 'Error al obtener personajes' })
  }
})

app.get("/api/personajes/:num", async (req, res) => {
  const id = Number(req.params.num)

  if( !Number.isInteger(id) || isNaN(id) ){
    console.log('La id no es valida')
    return res.status(400).json({ error: 'La id no es valida' })
  }
  if(id < 1){
    console.log('La id no puede ser negativa')
    return res.status(400).json({ error: "La id no puede ser negativa" })
  }

  try{
    const personaje = await get_character(id)

    if(!personaje){
      console.log('No se recibio ningun personaje')
      return res.status(404).json({ error: `No se encontro ningun personaje de id ${id}` })
    }
    else{
      console.log('Personaje recibido con exito')
      return res.status(200).json(personaje)
    }
  }
  catch(err){
    console.error("Error al obtener personaje: ", err)
    return res.status(500).json({ error: 'Error al obtener personaje' })
  }
})



app.get("/api/etnias", async (req, res) => {
  try{
    const etnias = await get_all_ethnicities()

    if(!etnias || (etnias.length === 0) ){
      console.log('No se recibio ninguna etnia')
      return res.status(404).json({ error: 'No se encontraron etnias' })
    }
    else{
      console.log('Etnias recibidas con exito')
      return res.status(200).json(etnias)
    }
  }
  catch(err){
    console.error('Error al obtener etnias: ', err)
    return res.status(500).json({ error: 'Error al obtener etnias' })
  }
})

app.get("/api/etnias/:num", async (req, res) => {
  const id = Number(req.params.num)

  if( !Number.isInteger(id) || isNaN(id) ){
    console.log('La id no es valida')
    return res.status(400).json({ error: 'La id no es valida' })
  }
  if(id < 1){
    console.log('La id no puede ser negativa')
    return res.status(400).json({ error: "La id no puede ser negativa" })
  }

  try{
    const etnia = await get_ethnicity(id)

    if(!etnia){
      console.log('No se recibio ninguna etnia')
      return res.status(404).json({ error: `No se encontro ninguna etnia de id ${id}` })
    }
    else{
      console.log('Etnia recibida con exito')
      return res.status(200).json(etnia)
    }
  }
  catch(err){
    console.error('Error al obtener etnia: ', err)
    return res.status(500).json({ error: 'Error al obtener etnia' })
  }
})



app.get("/api/lugares", async (req, res) => {
  try{
    const lugares = await get_all_places()

    if(!lugares || (lugares.length === 0) ){
      console.log('No se recibio ningun lugar')
      return res.status(404).json({ error: 'No se encontraron lugares' })
    }
    else{
      console.log('Lugares recibidos con exito')
      return res.status(200).json(lugares)
    }
  }
  catch(err){
    console.error('Error al obtener lugares: ', err)
    return res.status(500).json({ error: 'Error al obtener lugares' })
  }
})

app.get("/api/lugares/:num", async (req, res) => {
  const id = Number(req.params.num)

  if( !Number.isInteger(id) || isNaN(id) ){
    console.log('La id no es valida')
    return res.status(400).json({ error: 'La id no es valida' })
  }
  if(id < 1){
    console.log('La id no puede ser negativa')
    return res.status(400).json({ error: "La id no puede ser negativa" })
  }

  try{
    const lugar = await get_place(id)
    
    if(!lugar){
      console.log('No se recibio ningun lugar')
      return res.status(404).json({ error: `No se encontro ningun lugar de id ${id}` })
    }
    else{
      console.log('Lugar recibido con exito')
      return res.status(200).json(lugar)
    }
  }
  catch(err){
    console.error('Error al obtener lugar: ', err)
    return res.status(500).json({ error: 'Error al obtener lugar' })
  }
})

/*POST*/

app.post("/api/personajes/", async (req, res) => {
  let errores = {}

  const nombre = req.body.nombre
  let etnia = req.body.etnia
  const edad = req.body.edad
  let origen = req.body.origen
  let apariencia = req.body.apariencia
  let historia = req.body.historia
  let clase = req.body.clase
  let imagen = req.body.imagen
  let imagen_indice = req.body.imagen_indice

  if( !nombre || (nombre.trim() === "") ){
    errores.error_nombre = "El campo nombre no puede estar vacio"
  }
  else{
    if(nombre.length > 50){
      errores.error_nombre = "El nombre ingresado supera el limite de caracteres"
    }
  }
  if ( !etnia || (etnia.trim() === "") ){
    etnia = null
  }
  else {
    try{
      if( !(await verify_ethnicity_name(etnia)) ){
        errores.error_etnia = "La etnia del personaje debe ser uns de las registradas"
      }
    }
    catch(err){
      errores.error_etnia = "Error al acceder a la base de datos para validar"
    }
  }
  if( (typeof edad !== "number") || isNaN(edad) ){
    errores.error_edad = "El valor ingresado no es valido"
  }
  else{
    if(edad < 0){
      errores.error_edad = "La campo edad no puede ser negativo"
    }
  }
  if ( !origen || (origen.trim() === "") ){
    origen = null
  }
  else {
    try{
      if( !(await verify_place_name(origen)) ){
        errores.error_origen = "El lugar de origen del personaje debe ser uno de los registrados"
      }
    }
    catch(err){
      errores.error_origen = "Error al acceder a la base de datos para validar"
    }
  }
  if( !apariencia || (apariencia.trim() === "") ){
    apariencia = null
  }
  if( !historia || (historia.trim() === "") ){
    historia = null
  }
  if( !clase || (clase.trim() === "") ){
    clase = null
  }
  else{
    if(clase.length > 25){
      errores.error_clase = "La clase ingresada supera el limite de caracteres"
    }
  }
  if( !imagen || (imagen.trim() === "") ){
    imagen = null
  }
  if( !imagen_indice || (imagen_indice.trim() === "") ){
    imagen_indice = null
  }

  if(Object.keys(errores).length > 0){
    for(const [error_type, description] of Object.entries(errores)){
      console.log(`${error_type}: ${description}`)
    }
    return res.status(400).json(errores)
  }
  else{
    try{
      const character = await create_character(nombre, etnia, edad, origen, apariencia, historia, clase, imagen, imagen_indice)
      if(!character){
        console.log('No se pudo crear el personaje')
        return res.status(500).json({ error: 'No se pudo crear el personaje' })
      }
      else{
        console.log('Personaje creado con exito')
        return res.status(201).json(character)
      }
    }
    catch(err){
      console.error('Error al crear personaje: ', err)
      return res.status(500).json({ error: 'Error al crear personaje' })
    }
  }
})

app.post("/api/etnias/", async (req, res) => {
  let errores = {}

  const nombre = req.body.nombre
  let descripcion = req.body.descripcion
  let naturaleza = req.body.naturaleza
  let imagen_indice = req.body.imagen_indice
  let moodboard = req.body.moodboard
  let origen = req.body.origen

  if( !nombre || (nombre.trim() === "") ){
    errores.error_nombre = "El campo nombre no puede estar vacio"
  }
  else{
    if(nombre.length > 50){
      errores.error_nombre = "El nombre ingresado supera el limite de caracteres"
    }
    else{
      try{
        if( await verify_ethnicity_name(nombre) ){
          errores.error_nombre = `El nombre ${nombre} ya se encuentra registrado`
        }
      }
      catch(err){
        errores.error_nombre = "Error al acceder a la base de datos para validar"
      }
    }
  }
  if( !descripcion || (descripcion.trim() === "") ){
    descripcion = null
  }
  if( !naturaleza || (naturaleza.trim() === "") ){
    naturaleza = null
  }
  else{
    if(naturaleza.length > 25){
      errores.error_naturaleza = "La naturaleza ingresada para la etnia supera el limite de caracteres"
    }
  }
  if( !imagen_indice || (imagen_indice.trim() === "") ){
    imagen_indice = null
  }
  if( !moodboard || (moodboard.trim() === "") ){
    moodboard = null
  }
  if ( !origen || (origen.trim() === "") ){
    origen = null
  }
  else {
    try{
      if( !(await verify_place_name(origen)) ){
        errores.error_origen = "El lugar de origen de la etnia debe ser uno de los registrados"
      }
    }
    catch(err){
      errores.error_origen = "Error al acceder a la base de datos para validar"
    }
  }
  
  if (Object.keys(errores).length > 0) {
    for(const [error_type, description] of Object.entries(errores)){
      console.log(`${error_type}: ${description}`)
    }
    return res.status(400).json(errores)
  }
  else{
    try{
      const etnia = await create_ethnicity(nombre, descripcion, naturaleza, imagen_indice, moodboard, origen)
      if(!etnia){
        console.log('No se pudo crear la etnia')
        return res.status(500).json({ error: 'No se pudo crear la etnia' })
      }
      else{
        console.log('Etnia creada con exito')
        return res.status(201).json(etnia)
      }
    }
    catch(err){
      console.error('Error al crear la etnia: ', err)
      return res.status(500).json({ error: 'Error al crear la etnia' })
    }
  }
})

app.post("/api/lugares/", async (req, res) => {
  let errores = {}

  const nombre = req.body.nombre
  let descripcion = req.body.descripcion
  let faccion = req.body.faccion
  let etnia_dominante = req.body.etnia_dominante
  let clima = req.body.clima
  let imagen = req.body.imagen

  if( !nombre || (nombre.trim() === "") ){
    errores.error_nombre = "El campo nombre no puede estar vacio"
  }
  else{
    if(nombre.length > 50){
      errores.error_nombre = "El nombre ingresado supera el limite de caracteres"
    }
    else{
      try{
        if(await verify_place_name(nombre)){
          errores.error_nombre = `El nombre ${nombre} ya se encuentra registrado`
        }
      }
      catch(err){
        errores.error_nombre = "Error al acceder a la base de datos para validar"
      }
    }
  }
  if( !descripcion || (descripcion.trim() === "") ){
    descripcion = null
  }
  if( !faccion || (faccion.trim() === "") ){
    faccion = null
  }
  else{
    if(faccion.length > 25){
      errores.error_faccion = "La faccion ingresada como amos del lugar supera el limite de caracteres"
    }
  }
  if ( !etnia_dominante || (etnia_dominante.trim() === "") ){
    etnia_dominante = null
  }
  else {
    try{
      if( !(await verify_ethnicity_name(etnia_dominante)) ){
        errores.error_etnia_dominante = "La etnia dominante debe ser una de las registradas"
      }
    }
    catch(err){
      errores.error_etnia_dominante = "Error al acceder a la base de datos para validar"
    }
  }
  if( !clima || (clima.trim() === "") ){
    clima = null
  }
  else{
    if(clima.length > 25){
      errores.error_clima = "El clima ingresado para el lugar supera el limite de caracteres"
    }
  }
  if( !imagen || (imagen.trim() === "") ){
    imagen = null
  }

  if (Object.keys(errores).length > 0) {
    for(const [error_type, description] of Object.entries(errores)){
      console.log(`${error_type}: ${description}`)
    }
    return res.status(400).json(errores)
  }
  else{
    try{
      const lugar = await create_place(nombre, descripcion, faccion, etnia_dominante, clima, imagen)
      if(!lugar){
        console.log('No se pudo crear el lugar')
        return res.status(500).json({ error: 'No se pudo crear el lugar' })
      }
      else{
        console.log('Lugar creado con exito')
        return res.status(201).json(lugar)
      }
    }
    catch(err){
      console.error('Error al crear el lugar: ', err)
      return res.status(500).json({ error: 'Error al crear el lugar' })
    }
  }
})

/*DELETE*/

app.delete("/api/personajes/:num", async (req, res) => {
  const id = Number(req.params.num)

  if( !Number.isInteger(id) || isNaN(id) ){
    console.log('La id no es valida')
    return res.status(400).json({ error: 'La id no es valida' })
  }
  if(id < 1){
    console.log('La id no puede ser negativa')
    return res.status(400).json({ error: "La id no puede ser negativa" })
  }
  try{
    if( (await get_character(id)) !== undefined ){
      const character = await delete_character(id)
      if(!character){
        console.log('No se pudo eliminar al personaje')
        return res.status(500).json({ error: "No se pudo eliminar al personaje" })
      }
      else{
        console.log('Se ha eliminado al personaje con exito')
        return res.status(200).json(character)
      }
    }
    else{
      console.log('No se puede eliminar un personaje que no existe')
      return res.status(404).json({ error: "No se puede eliminar un personaje que no existe" })
    }
  }
  catch(err){
    console.error('Error al eliminar el personaje: ', err)
    return res.status(500).json({ error: 'Error al eliminar el personaje' })
  }
})

app.delete("/api/etnias/:num", async (req, res) => {
  const id = Number(req.params.num)

  if( !Number.isInteger(id) || isNaN(id) ){
    console.log('La id no es valida')
    return res.status(400).json({ error: 'La id no es valida' })
  }
  if(id < 1){
    console.log('La id no puede ser negativa')
    return res.status(400).json({ error: "La id no puede ser negativa" })
  }
  try{
    if( await verify_default_ethnicity(id) ){
      console.log('No se puede eliminar la etnia desconocida')
      return res.status(400).json({ error: "No se puede eliminar la etnia desconocida"})
    }
    if( (await get_ethnicity(id)) !== undefined ){
      const ethnicity = await delete_ethnicity(id)
      if(!ethnicity){
        console.log('No se pudo eliminar la etnia')
        return res.status(500).json({ error: "No se pudo eliminar la etnia" })
      }
      else{
        console.log('Se ha eliminado la etnia con exito')
        return res.status(200).json(ethnicity)
      }
    }
    else{
      console.log('No se puede eliminar una etnia que no existe')
      return res.status(404).json({ error: "No se puede eliminar una etnia que no existe" })
    }
  }
  catch(err){
    console.error('Error al eliminar la etnia: ', err)
    return res.status(500).json({ error: 'Error al eliminar la etnia' })
  }
})

app.delete("/api/lugares/:num", async (req, res) => {
  const id = Number(req.params.num)

  if( !Number.isInteger(id) || isNaN(id) ){
    console.log('La id no es valida')
    return res.status(400).json({ error: 'La id no es valida' })
  }
  if(id < 1){
    console.log('La id no puede ser negativa')
    return res.status(400).json({ error: "La id no puede ser negativa" })
  }
  try{
    if( await verify_default_place(id) ){
      console.log('No se puede eliminar el lugar desconocido')
      return res.status(400).json({ error: "No se puede eliminar el lugar desconocido"})
    }
    if( (await get_place(id)) !== undefined ){
      const place= await delete_place(id)
      if(!place){
        console.log('No se pudo eliminar el lugar')
        return res.status(500).json({ error: "No se pudo eliminar el lugar" })
      }
      else{
        console.log('Se ha eliminado el lugar con exito')
        return res.status(200).json(place)
      }
    }
    else{
      console.log('No se puede eliminar un lugar que no existe')
      return res.status(404).json({ error: "No se puede eliminar un lugar que no existe" })
    }
  }
  catch(err){
    console.error('Error al eliminar el lugar: ', err)
    return res.status(500).json({ error: 'Error al eliminar el lugar' })
  }
})

/*PUT*/

app.put("/api/personajes/:num", async (req, res) => {
  const id = Number(req.params.num)

  if( !Number.isInteger(id) || isNaN(id) ){
    console.log('La id no es valida')
    return res.status(400).json({ error: 'La id no es valida' })
  }
  if(id < 1){
    console.log('La id no puede ser negativa')
    return res.status(400).json({ error: "La id no puede ser negativa" })
  }
  try{
    if( (await get_character(id)) === undefined ){
      console.log('No se puede modificar un personaje que no existe')
      return res.status(404).json({ error: "No se puede modificar un personaje que no existe" })
    }
  }
  catch(err){
    console.error('Error al acceder a la base de datos para validar')
    return res.status(500).json({ error: "Error al acceder a la base de datos para validar"})
  }

  let errores = {}

  let nombre = req.body.nombre
  let etnia = req.body.etnia
  let edad = req.body.edad
  let origen = req.body.origen
  let apariencia = req.body.apariencia
  let historia = req.body.historia
  let clase = req.body.clase
  let imagen = req.body.imagen
  let imagen_indice = req.body.imagen_indice

  if( !nombre || (nombre.trim() === "") ){
    nombre = null
  }
  else{
    if(nombre.length > 50){
      errores.error_nombre = "El nombre ingresado supera el limite de caracteres"
    }
  }
  if( !etnia || (etnia.trim() === "")){
    etnia = null
  }
  else{
    try{
      if( !(await verify_ethnicity_name(etnia)) ){
        errores.error_etnia = "La etnia ingresada debe figurar en las etnias registradas"
      }
    }
    catch(err){
      errores.error_etnia = "Error al acceder a la base de datos para validar"
    }
  }
  if( !edad && edad !== 0 ){
    edad = null
  }
  else{
    if( (typeof edad !== "number") || isNaN(edad) ){
      errores.error_edad = "El valor ingresado no es valido"
    }
    else{
      if(edad < 0){
        errores.error_edad = "La campo edad no puede ser negativo"
      }
    }
  }
  if( !origen || (origen.trim() === "") ){
    origen = null
  }
  else{
    try{
      if( !(await verify_place_name(origen)) ){
        errores.error_origen = "El lugar de origen del personaje debe ser uno de los registrados"
      }
    }
    catch(err){
      errores.error_origen = "Error al acceder a la base de datos para validar"
    }
  }
  if( !apariencia || (apariencia.trim() === "") ){
    apariencia = null
  }
  if( !historia || (historia.trim() === "") ){
    historia = null
  }
  if( !clase || (clase.trim() === "") ){
    clase = null
  }
  else{
    if(clase.length > 25){
      errores.error_clase = "La clase ingresada supera el limite de caracteres"
    }
  }
  if( !imagen || (imagen.trim() === "") ){
    imagen = null
  }
  if( !imagen_indice || (imagen_indice.trim() === "") ){
    imagen_indice = null
  }

  if(
    nombre === null &&
    etnia === null &&
    edad === null &&
    origen === null &&
    apariencia === null &&
    historia === null &&
    clase === null &&
    imagen === null &&
    imagen_indice === null
  ){
    console.log('No se ingreso ningun campo a modificar')
    return res.status(400).json({ error: "Se debe modificar al menos un campo" })
  }

  if(Object.keys(errores).length > 0){
    for(const [error_type, description] of Object.entries(errores)){
      console.log(`${error_type}: ${description}`)
    }
    return res.status(400).json(errores)
  }
  else{
    try{
      const character = await modify_character(id, nombre, etnia, edad, origen, apariencia, historia, clase, imagen, imagen_indice)
      if(!character){
        console.log('No se pudo modificar el personaje')
        return res.status(500).json({ error: 'No se pudo modificar el personaje' })
      }
      else{
        console.log('Personaje modificado con exito')
        return res.status(200).json(character)
      }
    }
    catch(err){
      console.error('Error al modificar personaje: ', err)
      return res.status(500).json({ error: 'Error al modificar personaje' })
    }
  }
})

app.put("/api/etnias/:num", async (req, res) => {
  const id = Number(req.params.num)

  if( !Number.isInteger(id) || isNaN(id) ){
    console.log('La id no es valida')
    return res.status(400).json({ error: 'La id no es valida' })
  }
  if(id < 1){
    console.log('La id no puede ser negativa')
    return res.status(400).json({ error: "La id no puede ser negativa" })
  }
  try{
    if( (await get_ethnicity(id)) === undefined ){
      console.log('No se puede modificar una etnia que no existe')
      return res.status(404).json({ error: "No se puede modificar una etnia que no existe" })
    }
    if( await verify_default_ethnicity(id) ){
      console.log('No se puede modificar la etnia desconocida')
      return res.status(400).json({ error: "No se puede modificar la etnia desconocida"})
    }
  }
  catch(err){
    console.error('Error al acceder a la base de datos para validar')
    return res.status(500).json({ error: "Error al acceder a la base de datos para validar"})
  }

  let errores = {}

  let nombre = req.body.nombre
  let descripcion = req.body.descripcion
  let naturaleza = req.body.naturaleza
  let imagen_indice = req.body.imagen_indice
  let moodboard = req.body.moodboard
  let origen = req.body.origen

  if( !nombre || (nombre.trim() === "") ){
    nombre = null
  }
  else{
    if(nombre.length > 50){
      errores.error_nombre = "El nombre ingresado supera el limite de caracteres"
    }
    else{
      try{
        if(await verify_ethnicity_name(nombre)){
          errores.error_nombre = `El nombre ${nombre} ya se encuentra registrado`
        }
      }
      catch(err){
        errores.error_nombre = "Error al acceder a la base de datos para validar"
      }
    }
  }
  if( !descripcion || (descripcion.trim() === "") ){
    descripcion = null
  }
  if( !naturaleza || (naturaleza.trim() === "") ){
    naturaleza = null
  }
  else{
    if(naturaleza.length > 25){
      errores.error_naturaleza = "La naturaleza ingresada para la etnia supera el limite de caracteres"
    }
  }
  if( !imagen_indice || (imagen_indice.trim() === "") ){
    imagen_indice = null
  }
  if( !moodboard || (moodboard.trim() === "") ){
    moodboard = null
  }
  if( !origen || (origen.trim() === "") ){
    origen = null
  }
  else {
    try{
        if(await verify_place_name(origen)){
          errores.error_origen = "Esa lugar no se encuentra registrado"
        }
    }
    catch(err){
      errores.error_origen = "Error al acceder a la base de datos para validar"
    }
  }

  if(
    nombre === null &&
    descripcion === null &&
    naturaleza === null &&
    imagen_indice === null &&
    moodboard === null &&
    origen === null
  ){
    console.log('No se ingreso ningun campo a modificar')
    return res.status(400).json({ error: "Se debe modificar al menos un campo" })
  }

  if(Object.keys(errores).length > 0){
    for(const [error_type, description] of Object.entries(errores)){
      console.log(`${error_type}: ${description}`)
    }
    return res.status(400).json(errores)
  }
  else{
    try{
      const ethnicity = await modify_ethnicity(id, nombre, descripcion, naturaleza, imagen_indice, moodboard, origen)
      if(!ethnicity){
        console.log('No se pudo modificar la etnia')
        return res.status(500).json({ error: 'No se pudo modificar la etnia' })
      }
      else{
        console.log('Etnia modificada con exito')
        return res.status(200).json(ethnicity)
      }
    }
    catch(err){
      console.error('Error al modificar etnia: ', err)
      return res.status(500).json({ error: 'Error al modificar etnia' })
    }
  }
})

app.put("/api/lugares/:num", async (req, res) => {
  const id = Number(req.params.num)

  if( !Number.isInteger(id) || isNaN(id) ){
    console.log('La id no es valida')
    return res.status(400).json({ error: 'La id no es valida' })
  }
  if(id < 1){
    console.log('La id no puede ser negativa')
    return res.status(400).json({ error: "La id no puede ser negativa" })
  }
  try{
    if( (await get_place(id)) === undefined ){
      console.log('No se puede modificar un lugar que no existe')
      return res.status(404).json({ error: "No se puede modificar un lugar que no existe" })
    }
    if( await verify_default_place(id) ){
      console.log('No se puede modificar el lugar desconocido')
      return res.status(400).json({ error: "No se puede modificar el lugar desconocido"})
    }
  }
  catch(err){
    console.error('Error al acceder a la base de datos para validar')
    return res.status(500).json({ error: "Error al acceder a la base de datos para validar"})
  }

  let errores = {}

  let nombre = req.body.nombre
  let descripcion = req.body.descripcion
  let faccion = req.body.faccion
  etnia_dominante = req.body.etnia_dominante
  let clima = req.body.clima
  let imagen = req.body.imagen

  if( !nombre || (nombre.trim() === "") ){
    nombre = null
  }
  else{
    if(nombre.length > 50){
      errores.error_nombre = "El nombre ingresado supera el limite de caracteres"
    }
    else{
      try{
        if(await verify_place_name(nombre)){
          errores.error_nombre = `El nombre ${nombre} ya se encuentra registrado`
        }
      }
      catch(err){
        errores.error_nombre = "Error al acceder a la base de datos para validar"
      }
    }
  }
  if( !descripcion || (descripcion.trim() === "") ){
    descripcion = null
  }

  if( !faccion || (faccion.trim() === "") ){
    faccion = null
  }
  else{
    if(faccion.length > 25){
      errores.error_faccion = "La faccion ingresada como amos del lugar supera el limite de caracteres"
    }
  }

  if( !etnia_dominante || (etnia_dominante.trim() === "") ){
    etnia_dominante = null
  }
  else {
    try{
        if(await verify_ethnicity_name(etnia_dominante)){
          errores.error_etnia_dominante = "Esa etnia no se encuentra registrada"
        }
    }
    catch(err){
      errores.error_etnia_dominante = "Error al acceder a la base de datos para validar"
    }
  }

  if( !clima || (clima.trim() === "") ){
    clima = null
  }
  else{
    if(clima.length > 25){
      errores.error_clima = "El clima ingresado para el lugar supera el limite de caracteres"
    }
  }

  if( !imagen || (imagen.trim() === "") ){
    imagen = null
  }

  if(
    nombre === null &&
    descripcion === null &&
    faccion === null &&
    etnia_dominante === null &&
    clima === null &&
    imagen === null
  ){
    console.log('No se ingreso ningun campo a modificar')
    return res.status(400).json({ error: "Se debe modificar al menos un campo" })
  }

  if(Object.keys(errores).length > 0){
    for(const [error_type, description] of Object.entries(errores)){
      console.log(`${error_type}: ${description}`)
    }
    return res.status(400).json(errores)
  }
  else{
    try{
      const place = await modify_place(id, nombre, descripcion, faccion, etnia_dominante, clima, imagen)
      if(!place){
        console.log('No se pudo modificar el lugar')
        return res.status(500).json({ error: 'No se pudo modificar el lugar' })
      }
      else{
        console.log('Lugar modificado con exito')
        return res.status(200).json(place)
      }
    }
    catch(err){
      console.error('Error al modificar lugar: ', err)
      return res.status(500).json({ error: 'Error al modificar lugar' })
    }
  }
})

/*solicitudes de la web*/

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
})

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "style.css"));
})

app.get("/lugares.css", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "lugares.css"));
})

app.get("/subindices.css", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "subindices.css"));
})

app.get("/animations.css", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "animations.css"));
})

app.get("/source/title.png", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "source", "title.png"));
})

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "script.js"));
})

app.get("/vanillatilt.js", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "vanillatilt.js"));
})

app.get("/source/back.png", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "source", "back.png"));
})

app.get("/source/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "source", "favicon.ico"));
})

app.get("/personajes", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "personajes.html"));
})

app.get("/lugares", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "lugares.html"));
})

app.get("/etnias", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "etnias.html"));
})