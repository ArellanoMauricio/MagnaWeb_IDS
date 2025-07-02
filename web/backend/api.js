const express = require("express")
const path = require("path")

const app = express()
app.use(express.json())

const port = 3000
app.listen(port, () => console.log(`Server running on port ${port}`));

const {
  get_all_caracters,
  get_all_ethnicities,
  get_all_places,
  get_character,
  get_ethnicity,
  get_place,
} = require("./db.js")

/*-------------------------------------------------------------------------------------*/
/*
ACLARACION IMPORTANTE (Mauricio)

En clase se dejo claro que no hay que mezclar ingles y español,
pero opte por usar español unicamente para las variables de retorno,
el resto estara en ingles.
*/
/*-------------------------------------------------------------------------------------*/

/*Solicitudes de la api*/

app.get("/api/personajes", async (req, res) => {
  const personajes = await get_all_characters()
  res.json(personajes)
})

app.get("/api/personajes/:num", async (req, res) => {
  const personaje = await get_character(req.params.num)
  res.json(personaje)
})

app.post("/api/personajes/", async (req, res) => {
  const nombre = req.body.nombre
  const etnia = req.body.etnia
  const edad = req.body.edad
  const origen = req.body.origen
  const apariencia = req.body.apariencia
  const historia = req.body.historia
  const clase = req.body.clase
  const imagen = req.body.imagen
  const imagen_indice = req.body.imagen_indice

  if (nombre === undefined) {
      return res.status(400).send("Falta agregar el nombre")
  }
  if (etnia === undefined) {
      return res.status(400).send("Falta agregar la etnia")
  }
  if (edad === undefined) {
      return res.status(400).send("Falta agregar la edad")
  }
  if (origen === undefined) {
      return res.status(400).send("Falta agregar el origen")
  }
  if (apariencia === undefined) {
      return res.status(400).send("Falta agregar la apariencia")
  }
  if (historia === undefined) {
      return res.status(400).send("Falta agregar la historia")
  }
  if (clase === undefined) {
      return res.status(400).send("Falta agregar la clase")
  }
  if (imagen === undefined) {
      return res.status(400).send("Falta agregar la imagen")
  }
  if (imagen_indice === undefined) {
      return res.status(400).send("Falta agregar el índice de la imagen")
  }

  const character = await create_character(nombre, etnia, edad, origen, apariencia, historia, clase, imagen, imagen_indice)
  res.status(201).json(character)
})

app.get("/api/etnias", async (req, res) => {
  const etnias = await get_all_ethnicities()
  res.json(etnias)
})

app.get("/api/etnias/:num", async (req, res) => {
  const personaje = await get_ethnicity(req.params.num)
  res.json(personaje)
})

app.get("/api/lugares", async (req, res) => {
  const lugares = await get_all_places()
  res.json(lugares)
})

app.get("/api/lugares/:num", async (req, res) => {
  const personaje = await get_place(req.params.num)
  res.json(personaje)
})

/*solicitudes de la web*/

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
})

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "style.css"));
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