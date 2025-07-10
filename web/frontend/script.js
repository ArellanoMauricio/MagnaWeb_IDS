/*efecto de tipeado lento*/
function typeWriter(txt, i, speed, id) {
    if (i < txt.length) {
        document.getElementById(id).innerHTML += txt.charAt(i);
        i++;
        setTimeout(() => typeWriter(txt, i, speed, id), speed);
    }
}

/*cambio de interfaz*/
async function toggleArrows() {

    /* Subimos y desvanecemos el título. */
    const intro = document.getElementById("intro")
    intro.classList.toggle("out")

    /* Hacemos aparecer la tablita del índice. */
    const indice = document.getElementById("index")
    indice.classList.toggle("in")

    /* Esperamos 3500ms y hacemos aparecer el título del índice. */
    await new Promise(res => setTimeout(res, 3500))
    const indicetex = document.getElementById("index_text")
    indicetex.classList.toggle("in")

    /* Ejecutamos la animación de tipeo de cada elemento del índice. */
    await new Promise(res => setTimeout(res, 3500))
    typeWriter("PERSONAJES", 0, 250, "item1")

    await new Promise(res => setTimeout(res, 2500))
    typeWriter("HISTORIA", 0, 250, "item2")

    await new Promise(res => setTimeout(res, 2000))
    typeWriter("LUGARES", 0, 250, "item3")

    await new Promise(res => setTimeout(res, 2000))
    typeWriter("ETNIAS", 0, 250, "item4")
}

function transparentarPadre(boton) {
    const contenedor = boton.parentElement;
    const hijos = contenedor.children;
    for (let hijo of hijos) {
        hijo.style.opacity = "0";
    }
}

async function redirect(sitio, id, t) {
    const elemento = id ? document.getElementById(id) : null
    if (elemento) {
        const tarjeta = document.getElementById("tarjeta");
        if (tarjeta && tarjeta.classList.contains("abrirtarjeta")) {
            cerrarTarjeta();
            await new Promise(res => setTimeout(res, 3000));
        }
        elemento.classList.remove("in")
        elemento.classList.add("out")
        await new Promise(res => setTimeout(res, t))
    }
    if (sitio) {
        window.location.href = "/" + sitio
    } else {
        window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*\/?$/, '/')
    }
}

async function getElementoApi(link) {
    try {
        const response = await fetch(link)
        if (!response.ok) {
            throw new Error(`Error HTTP! Código: ${response.status}`)
        }
        const data = await response.json()
        console.log('Data obtenida:', data)
        return data
    } catch (error) {
        console.error('Hubo un problema con la operación fetch:', error)
        return null
    }
}

async function armarTarjetaLugar(id){
    const tarjeta = document.getElementById('tarjeta')
    const apiData = await getElementoApi(`http://localhost:3000/api/lugares/${id}`)
    if (apiData) {
        const informacion = document.createElement('div')
        const nombre = apiData.nombre;
        const imagen = apiData.imagen;
        const faccion = apiData.faccion;
        const clima = apiData.clima;
        const descripcion = apiData.descripcion;
        informacion.innerHTML = `
            <div id="contenido">
                <div class="data_imagen">
                    <h3 class="imagen_de">Imágen:</h3>
                    <input disabled id="campo_imagen" class="fuente_imagen" type="text" placeholder="${imagen}">
                </div>
                <div class="data_imagen">
                </div>
                <img src="${imagen}" onerror="this.src='https://i.imgur.com/2Bo3dP1.jpeg'" alt="imagen" id="imagen_tarjeta">
                <input disabled id="nombre_tarjeta" type="text" placeholder="${escaparHTML(nombre)}">
                <input disabled id="campo_clima" class="dato_secundario" type="text" placeholder="${escaparHTML(clima)}">
                <input disabled id="campo_faccion" class="dato_secundario" type="text" placeholder="${escaparHTML(faccion)}">
                <textarea disabled id="campo_descripcion" placeholder="${escaparHTML(descripcion)}"></textarea>
                <button id="editar_aceptar" onclick="habilitarEdicionLugar(${id})">
                    <span class="material-symbols-outlined">
                    edit
                    </span>
                </button>
                <button id="borrar_cancelar" onclick="eliminarLugar(${id})">
                    <span class="material-symbols-outlined">
                    delete
                    </span>
                </button>
            </div>
        `
        tarjeta.replaceChildren(informacion)
    }
}

async function armarTarjetaLugarVacia(){
    const tarjeta = document.getElementById('tarjeta')
    const informacion = document.createElement('div')
    informacion.innerHTML = `
        <div id="contenido">
            <div class="data_imagen">
                <h3 class="imagen_de">Imágen:</h3>
                <input disabled id="campo_imagen" class="fuente_imagen" type="text" placeholder="">
            </div>
            <div class="data_imagen">
            </div>
            <img src="" onerror="this.src='https://i.imgur.com/2Bo3dP1.jpeg'" alt="imagen" id="imagen_tarjeta">
            <input disabled id="nombre_tarjeta" type="text" placeholder="">
            <input disabled id="campo_clima" class="dato_secundario" type="text" placeholder="">
            <input disabled id="campo_faccion" class="dato_secundario" type="text" placeholder="">
            <textarea disabled id="campo_descripcion" placeholder=""></textarea>
            <button id="editar_aceptar" onclick="habilitarEdicionLugar()">
                <span class="material-symbols-outlined">
                edit
                </span>
            </button>
            <button id="borrar_cancelar" onclick="eliminarLugar()">
                <span class="material-symbols-outlined">
                delete
                </span>
            </button>
        </div>
    `
    tarjeta.replaceChildren(informacion)
}

async function armarTarjetaPersonajeVacia(){
    const tarjeta = document.getElementById('tarjeta')
    const informacion = document.createElement('div')
    informacion.innerHTML = `
        <div id="contenido">
            <div class="data_imagen">
                <h3 class="imagen_de">Imágen:</h3>
                <input disabled id="campo_imagen" class="fuente_imagen" type="text" placeholder="">
            </div>

            <div class="data_imagen">
                <h3 class="imagen_de">Imágen del índice:</h3>
                <input disabled id="campo_imagen_indice" class="fuente_imagen" type="text" placeholder="">
            </div>

            <img src="" onerror="this.src='https://i.imgur.com/oIw7byw.png'" alt="imagen" id="imagen_tarjeta">
            
            <input disabled id="nombre_tarjeta" type="text" placeholder="">

            <input disabled id="campo_etnia" class="dato_foraneo_etnia" list="etnias" placeholder="">
            <input disabled id="campo_origen" class="dato_foraneo_lugar" list="lugares" placeholder="">
            <input disabled id="campo_edad" class="dato_secundario" type="number" placeholder="">
            <input disabled id="campo_clase" class="dato_secundario" type="text" placeholder="">

            <textarea disabled id="apariencia_personaje" placeholder=""></textarea>
            <textarea disabled id="historia_personaje" placeholder=""></textarea>

            <button id="editar_aceptar" onclick="habilitarEdicionPersonaje()">
                <span class="material-symbols-outlined">
                edit
                </span>
            </button>
            <button id="borrar_cancelar" onclick="eliminarPersonaje()">
                <span class="material-symbols-outlined">
                delete
                </span>
            </button>
        </div>
    `
    tarjeta.replaceChildren(informacion)
}
function escaparHTML(texto) {
    return texto?.replace(/"/g, '&quot;') || ''
}
async function armarTarjetaPersonaje(id){
    const tarjeta = document.getElementById('tarjeta')
    const apiData = await getElementoApi(`http://localhost:3000/api/personajes/${id}`)
    if (apiData) {
        const informacion = document.createElement('div')
        const nombre = apiData.nombre;
        const edad = apiData.edad;
        const etnia = apiData.etnia;
        const origen = apiData.origen;
        const imagen = apiData.imagen;
        const imagen_indice = apiData.imagen_indice;
        const clase = apiData.clase;
        const historia = apiData.historia;
        const apariencia = apiData.apariencia;
        informacion.innerHTML = `
            <div id="contenido">
                <div class="data_imagen">
                    <h3 class="imagen_de">Imágen:</h3>
                    <input disabled id="campo_imagen" class="fuente_imagen" type="text" placeholder="${imagen}">
                </div>

                <div class="data_imagen">
                    <h3 class="imagen_de">Imágen del índice:</h3>
                    <input disabled id="campo_imagen_indice" class="fuente_imagen" type="text" placeholder="${imagen_indice}">
                </div>

                <img src="${imagen}" onerror="this.src='https://i.imgur.com/oIw7byw.png'" alt="imagen" id="imagen_tarjeta">
                
                <input disabled id="nombre_tarjeta" type="text" placeholder="${escaparHTML(nombre)}">

                <input disabled id="campo_etnia" class="dato_foraneo_etnia" list="etnias" placeholder="${escaparHTML(etnia)}">
                <input disabled id="campo_origen" class="dato_foraneo_lugar" list="lugares" placeholder="${escaparHTML(origen)}">
                <input disabled id="campo_edad" class="dato_secundario" type="number" placeholder="${edad}">
                <input disabled id="campo_clase" class="dato_secundario" type="text" placeholder="${clase}">

                <textarea disabled id="apariencia_personaje" placeholder="${escaparHTML(apariencia)}"></textarea>
                <textarea disabled id="historia_personaje" placeholder="${escaparHTML(historia)}"></textarea>

                <button id="editar_aceptar" onclick="habilitarEdicionPersonaje(${id})">
                    <span class="material-symbols-outlined">
                    edit
                    </span>
                </button>
                <button id="borrar_cancelar" onclick="eliminarPersonaje(${id})">
                    <span class="material-symbols-outlined">
                    delete
                    </span>
                </button>
            </div>
        `
        tarjeta.replaceChildren(informacion)
    }
}

async function mostrarTarjetaEtnias(id){
    const indiceamover = document.getElementById("container")
    indiceamover.classList.remove("moverizquierda")
    indiceamover.classList.add("moverderecha")
    armarTarjetaEtnia(id)
    await new Promise(res => setTimeout(res, 2000))
    const tarjeta = document.getElementById("tarjeta")
    tarjeta.classList.remove("cerrarTarjeta");
    tarjeta.classList.add("abrirtarjeta")
}

async function mostrarTarjetaLugares(id){
    const indiceamover = document.getElementById("container")
    indiceamover.classList.remove("moverizquierda")
    indiceamover.classList.add("moverderecha")
    armarTarjetaLugar(id)
    await new Promise(res => setTimeout(res, 2000))
    const tarjeta = document.getElementById("tarjeta")
    tarjeta.classList.remove("cerrarTarjeta");
    tarjeta.classList.add("abrirtarjeta")
}

async function mostrarTarjetaPersonajes(id){
    const indiceamover = document.getElementById("container")
    indiceamover.classList.remove("moverizquierda")
    indiceamover.classList.add("moverderecha")
    armarTarjetaPersonaje(id)
    await new Promise(res => setTimeout(res, 2000))
    const tarjeta = document.getElementById("tarjeta")
    tarjeta.classList.remove("cerrarTarjeta");
    tarjeta.classList.add("abrirtarjeta")
}

async function armarTarjetaEtnia(id){
    const tarjeta = document.getElementById('tarjeta')
    const apiData = await getElementoApi(`http://localhost:3000/api/etnias/${id}`)
    if (apiData) {
        const informacion = document.createElement('div')
        const nombre = apiData.nombre;
        const descripcion = apiData.descripcion;
        const moodboard = apiData.moodboard;
        const imagen_indice = apiData.imagen_indice;
        const naturaleza = apiData.naturaleza;
        informacion.innerHTML = `
            <div id="contenido">
                <div class="data_imagen">
                    <h3 class="imagen_de">Moodboard:</h3>
                    <input disabled id="campo_imagen" class="fuente_imagen" type="text" placeholder="${moodboard}">
                </div>
                <div class="data_imagen">
                    <h3 class="imagen_de">Imagen_indice:</h3>
                    <input disabled id="campo_imagen_indice" class="fuente_imagen" type="text" placeholder="${imagen_indice}">
                </div>
                <img src="${moodboard}" onerror="this.src='https://i.imgur.com/2Bo3dP1.jpeg'" alt="imagen" id="imagen_tarjeta">
                <input disabled id="nombre_tarjeta" type="text" placeholder="${escaparHTML(nombre)}">
                <input disabled id="naturaleza_tarjeta" class="dato_secundario" type="text" placeholder="${escaparHTML(naturaleza)}">
                <textarea disabled id="descripcion_etnia" placeholder="${escaparHTML(descripcion)}"></textarea>
                <button id="editar_aceptar" onclick="habilitarEdicionEtnia(${id})">
                    <span class="material-symbols-outlined">
                    edit
                    </span>
                </button>
                <button id="borrar_cancelar" onclick="eliminarEtnia(${id})">
                    <span class="material-symbols-outlined">
                    delete
                    </span>
                </button>
            </div>
        `
        tarjeta.replaceChildren(informacion)
    }
}

async function armarTarjetaEtniaVacia(){
    const tarjeta = document.getElementById('tarjeta')
    const informacion = document.createElement('div')
    informacion.innerHTML = `
        <div id="contenido">
            <div class="data_imagen">
                <h3 class="imagen_de">Moodboard:</h3>
                <input disabled id="campo_imagen" class="fuente_imagen" type="text" placeholder="">
            </div>
            <div class="data_imagen">
                <h3 class="imagen_de">Imagen_indice:</h3>
                <input disabled id="campo_imagen_indice" class="fuente_imagen" type="text" placeholder="">
            </div>
            <img src="" onerror="this.src='https://i.imgur.com/2Bo3dP1.jpeg'" alt="imagen" id="imagen_tarjeta">
            <input disabled id="nombre_tarjeta" type="text" placeholder="">
            <input disabled id="naturaleza_tarjeta" class="dato_secundario" type="text" placeholder="">
            <textarea disabled id="descripcion_etnia" placeholder=""></textarea>
            <button id="editar_aceptar">
                <span class="material-symbols-outlined">
                edit
                </span>
            </button>
            <button id="borrar_cancelar" onclick="eliminarEtnia()">
                <span class="material-symbols-outlined">
                delete
                </span>
            </button>
        </div>
    `
    tarjeta.replaceChildren(informacion)
}

async function rellenarEtnias(){
    const apiData = await getElementoApi('http://localhost:3000/api/etnias/')
    const contenedor = document.getElementById('cuadro2')
    if (apiData) {
        apiData.forEach((etnia, i) => {
            const tarjeta = document.createElement('div')
            tarjeta.classList.add('lugar')
            const id = etnia.id
            const nombre = etnia.nombre
            const imagen = etnia.imagen_indice
            tarjeta.innerHTML = `
            <div class="imgcontainer" onclick="mostrarTarjetaEtnias(${id})">
              <img src="${imagen}" onerror="this.src='https://i.imgur.com/c1tlvB9.jpeg'" class="imglug">
              <div class="nombrelug">
                <p><span>-</span><br> <span><a>${nombre}</a></span><br> <span>-</span></p>
              </div>
            </div>
            `
            contenedor.appendChild(tarjeta)
        } )
    }
    const tarjeta = document.createElement('div')
    tarjeta.classList.add('lugar')
    tarjeta.innerHTML = `
    <div class="imgcontainer">
        <div class="sumar"></div>
        <div class="nombresum">
            <p><span><a>+</a></span></p>
        </div>
    </div>
    `
    tarjeta.setAttribute('onclick', `crearEtnia()`)
    contenedor.appendChild(tarjeta)
}

async function rellenarLugares(){
    const apiData = await getElementoApi('http://localhost:3000/api/lugares/')
    const contenedor = document.getElementById('cuadro2')
    if (apiData) {
        apiData.forEach((lugar, i) => {
            const tarjeta = document.createElement('div')
            tarjeta.classList.add('lugar')
            const id = lugar.id
            const nombre = lugar.nombre
            const imagen = lugar.imagen
            tarjeta.innerHTML = `
            <div class="imgcontainer" onclick="mostrarTarjetaLugares(${id})">
              <img src="${imagen}" onerror="this.src='https://i.imgur.com/2Bo3dP1.jpeg'" class="imglug">
              <div class="nombrelug">
                <p><span>-</span><br> <span><a>${nombre}</a></span><br> <span>-</span></p>
              </div>
            </div>
            `
            contenedor.appendChild(tarjeta)
        } )
    }
    const tarjeta = document.createElement('div')
        tarjeta.classList.add('lugar')
        tarjeta.innerHTML = `
        <div class="imgcontainer">
            <div class="sumar"></div>
            <div class="nombresum">
                <p><span><a>+</a></span></p>
            </div>
        </div>
        `
        tarjeta.setAttribute('onclick', `crearLugar()`)
        contenedor.appendChild(tarjeta)
}

async function rellenarPersonajes(){
    const apiData = await getElementoApi('http://localhost:3000/api/personajes/')
    const contenedor = document.getElementById('cuadro2')
    if (apiData) {
        apiData.forEach((personaje, i) => {
            const tarjeta = document.createElement('div')
            tarjeta.classList.add('personaje')
            const nombre = personaje.nombre
            const imagen = personaje.imagen_indice
            const id = personaje.id
            tarjeta.setAttribute('onclick', `mostrarTarjetaPersonajes(${id})`)
            if (i % 2 === 0) {
                tarjeta.innerHTML = `
                <div class="nombrepers">
                    <p><span>-</span><br> <span><a>${nombre}</a></span><br> <span>-</span></p>
                </div>
                <div class="imgcontainer">
                    <img src="${imagen}" class="imgpers">
                </div>
                `
            } else {
                tarjeta.innerHTML = `
                <div class="imgcontainer">
                    <img src="${imagen}" class="imgpers">
                </div>
                <div class="divisorpers"></div>
                <div class="nombrepers">
                    <p><span>-</span><br> <span><a>${nombre}</a></span><br> <span>-</span></p>
                </div>
                `
            }
            contenedor.appendChild(tarjeta)
        })
    }
    const tarjeta = document.createElement('div')
        tarjeta.classList.add('lugar')
        tarjeta.innerHTML = `
        <div class="imgcontainer">
            <div class="sumar"></div>
            <div class="nombresum">
                <p><span><a>+</a></span></p>
            </div>
        </div>
        `
        tarjeta.setAttribute('onclick', `crearPersonaje()`)
        contenedor.appendChild(tarjeta)
}

async function refrescarTabla(txt) {
    const contenedor = document.getElementById('cuadro2')
    contenedor.innerHTML = ''
    switch (txt) {
        case 'personaje':
            await rellenarPersonajes()
            break
        case 'etnia':
            await rellenarEtnias()
            break
        case 'lugar':
            await rellenarLugares()
            break
        default:
            console.warn(`No hay función para rellenar tipo: ${txt}`)
            break
    }
    document.getElementById('tarjeta').innerHTML = '';
}

async function eliminarPersonaje(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/personajes/${id}`, {method: 'DELETE'})
    if (!response.ok) {
      throw new Error(`Error al eliminar: ${response.status}`)
    }
    console.log(`Personaje con ID ${id} eliminado con éxito.`)
  } catch (error) {
    console.error('Hubo un problema al eliminar el personaje:', error)
  }
  refrescarTabla('personaje')
  cerrarTarjeta()
}

async function eliminarEtnia(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/etnias/${id}`, {method: 'DELETE'})
    if (!response.ok) {
      throw new Error(`Error al eliminar: ${response.status}`)
    }
    console.log(`Etnia con ID ${id} eliminado con éxito.`)
  } catch (error) {
    console.error('Hubo un problema al eliminar la etnia:', error)
  }
  refrescarTabla('etnia')
  cerrarTarjeta()
}

async function eliminarLugar(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/lugares/${id}`, {method: 'DELETE'})
    if (!response.ok) {
      throw new Error(`Error al eliminar: ${response.status}`)
    }
    console.log(`Lugar con ID ${id} eliminado con éxito.`)
  } catch (error) {
    console.error('Hubo un problema al eliminar el lugar:', error)
  }
  refrescarTabla('lugar')
  cerrarTarjeta()
}

async function cerrarTarjeta() {
    const tarjeta = document.getElementById('tarjeta')
    tarjeta.classList.add('cerrarTarjeta')
    await new Promise(res => setTimeout(res, 2000))
    const contenedor = document.getElementById('container')
    contenedor.classList.add('moverizquierda')
} 

async function listarEtnias() {
  try {
    const etnias = await obtener_todas_las_etnias()

    if (!etnias || etnias.length === 0) {
      console.log('No se encontraron etnias')
      return false
    }

    // Extrae solo los nombres de las etnias
    const nombres = etnias.map(etnia => etnia.nombre)
    return nombres
  } catch (error) {
    console.error('Error al obtener los nombres de las etnias:', error)
    return false
  }
}

async function validarDatosPersonaje(nombre, edad, etnia, origen, clase, apariencia, historia, imagen, imagen_indice){
    const apiDataLugares = await getElementoApi('http://localhost:3000/api/lugares/')
    let listaLugares = []
    if (apiDataLugares) {
        apiDataLugares.forEach(lugar => {
            listaLugares.push(lugar.nombre)
        })
    } else {
        return false
    }
    const apiDataEtnias = await getElementoApi('http://localhost:3000/api/etnias/')
    let listaEtnias = []
    if (apiDataEtnias) {
        apiDataEtnias.forEach(etnia => {
            listaEtnias.push(etnia.nombre)
        })
    } else {
        return false
    }
    if (nombre && nombre.length > 25) {
        alert("El nombre ingresado supera el límite de 25 caracteres")
        return false
    } else {
        if (etnia && !listaEtnias.includes(etnia)) {
            alert("La etnia ingresada no existe")
            return false
        } else {
            if (isNaN(Number(edad))) {
                alert("El valor ingresado para edad no es un número válido")
                return false
            } else if (Number(edad) < 0) {
                alert("La edad no puede ser negativa")
                return false
            } else {
                if (origen && !listaLugares.includes(origen)) {
                    alert("El lugar de origen no existe")
                    return false
                } else {
                    if (apariencia && apariencia.length > 200) {
                        alert("La apariencia ingresada supera el límite de 80 caracteres")
                        return false
                    } else {
                        if (historia && historia.length > 2000) {
                            alert("La historia ingresada supera el límite de 2000 caracteres")
                            return false
                        } else {
                            if (clase && clase.length > 25) {
                                alert("La clase ingresada supera el límite de 25 caracteres")
                                return false
                            } else {
                                if (imagen && imagen.length > 255) {
                                    alert("La URL de la imagen es demasiado larga (máx. 255 caracteres)")
                                    return false
                                } else {
                                    if (imagen_indice && imagen_indice.length > 255) {
                                        alert("La URL de la imagen de índice es demasiado larga (máx. 255 caracteres)")
                                        return false
                                    } else {
                                        if (!nombre && (!edad && edad !== 0) && !etnia && !origen && !apariencia && !historia && !clase && !imagen && !imagen_indice) {
                                            alert("Nada ha sido modificado.")
                                            return false
                                        } else {
                                            return true // Pasamos!!
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

async function validarDatosEtnia(nombre, descripcion, naturaleza, imagen_indice, moodboard){
    const apiDataEtnias = await getElementoApi('http://localhost:3000/api/etnias/')
    let listaEtnias = []
    if (apiDataEtnias) {
        apiDataEtnias.forEach(etnia => {
            listaEtnias.push(etnia.nombre)
        })
    } else {
        return false
    }
    if (nombre && nombre.length > 25) {
        alert("El nombre ingresado supera el límite de 25 caracteres")
        return false
    } else {
        if (listaEtnias.includes(nombre) && nombre !== "") {
            alert("La etnia ingresada ya existe")
            return false
        } else {
            if (descripcion && descripcion.length > 2000) {
                    alert("La apariencia ingresada supera el límite de 2000 caracteres")
                    return false
            } else {
                if (naturaleza && naturaleza.length > 25) {
                    alert("La historia ingresada supera el límite de 200 caracteres")
                    return false
                } else {
                    if (!nombre && !descripcion && !naturaleza && !imagen_indice && !moodboard) {
                        alert("Nada ha sido modificado.")
                        return false
                    } else {
                        return true // Pasamos!!
                    }
                }
            }
        }
    }
}



async function validarDatosCreacionPersonaje(nombre, edad, etnia, origen, clase, apariencia, historia, imagen, imagen_indice){
    const apiDataLugares = await getElementoApi('http://localhost:3000/api/lugares/')
    let listaLugares = []
    if (apiDataLugares) {
        apiDataLugares.forEach(lugar => {
            listaLugares.push(lugar.nombre)
        })
    } else {
        return false
    }
    const apiDataEtnias = await getElementoApi('http://localhost:3000/api/etnias/')
    let listaEtnias = []
    if (apiDataEtnias) {
        apiDataEtnias.forEach(etnia => {
            listaEtnias.push(etnia.nombre)
        })
    } else {
        return false
    }
    if (!nombre || nombre.length > 25) {
        alert("El nombre ingresado supera el límite de 25 caracteres o no existe")
        return false
    } else {
        if (etnia && !listaEtnias.includes(etnia)) {
            alert("La etnia ingresada no existe")
            return false
        } else {
            if (isNaN(Number(edad))) {
                alert("El valor ingresado para edad no es un número válido")
                return false
            } else if (Number(edad) < 0) {
                alert("La edad no puede ser negativa")
                return false
            } else if (edad === null || edad === undefined || edad === "") {
                alert("La edad es un dato obligatorio")
                return false
            } else {
                if (origen && !listaLugares.includes(origen)) {
                    alert("El lugar de origen no existe")
                    return false
                } else {
                    if (apariencia && apariencia.length > 200) {
                        alert("La apariencia ingresada supera el límite de 80 caracteres")
                        return false
                    } else {
                        if (historia && historia.length > 2000) {
                            alert("La historia ingresada supera el límite de 2000 caracteres")
                            return false
                        } else {
                            if (clase && clase.length > 25) {
                                alert("La clase ingresada supera el límite de 25 caracteres")
                                return false
                            } else {
                                if (imagen && imagen.length > 255) {
                                    alert("La URL de la imagen es demasiado larga (máx. 255 caracteres)")
                                    return false
                                } else {
                                    if (imagen_indice && imagen_indice.length > 255) {
                                        alert("La URL de la imagen de índice es demasiado larga (máx. 255 caracteres)")
                                        return false
                                    } else {
                                        if (!nombre && (!edad && edad !== 0) && !etnia && !origen && !apariencia && !historia && !clase && !imagen && !imagen_indice) {
                                            alert("Nada ha sido modificado.")
                                            return false
                                        } else {
                                            return true // Pasamos!!
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

async function validarDatosCreacionEtnia(nombre, descripcion, naturaleza, imagen_indice, moodboard){
    const apiDataEtnias = await getElementoApi('http://localhost:3000/api/etnias/')
    let listaEtnias = []
    if (apiDataEtnias) {
        apiDataEtnias.forEach(etnia => {
            listaEtnias.push(etnia.nombre)
        })
    } else {
        return false
    }
    if (nombre === null || nombre === undefined || nombre === "") {
        alert("La edad es un dato obligatorio")
        return false
    } else {
        if (nombre && nombre.length > 25) {
            alert("El nombre ingresado supera el límite de 25 caracteres")
            return false
        } else {
            if (nombre && listaEtnias.includes(nombre)) {
                alert("La etnia ingresada ya existe")
                return false
            } else {
                if (descripcion && descripcion.length > 2000) {
                        alert("La apariencia ingresada supera el límite de 2000 caracteres")
                        return false
                } else {
                    if (naturaleza && naturaleza.length > 25) {
                        alert("La historia ingresada supera el límite de 200 caracteres")
                        return false
                    } else {
                        if (!nombre && !descripcion && !naturaleza && !imagen_indice && !moodboard) {
                            alert("Nada ha sido modificado.")
                            return false
                        } else {
                            return true // Pasamos!!
                        }
                    }
                }
            }
        }
    }
}

async function crearPersonaje(id) {
    armarTarjetaPersonajeVacia()
    mostrarTarjetaPersonajes()
    const tarjeta = document.getElementById('tarjeta')
    const campo_imagen = tarjeta.querySelector('#campo_imagen')
    campo_imagen.removeAttribute("disabled")

    const imagen_tarjeta = tarjeta.querySelector('#imagen_tarjeta')
    imagen_tarjeta.classList.add("transparentar")
    
    const data_imagen = tarjeta.querySelector('#data_imagen')
    campo_imagen.classList.add("adelantar")

    const campo_imagen_indice = tarjeta.querySelector('#campo_imagen_indice')
    campo_imagen_indice.removeAttribute("disabled")
    campo_imagen_indice.classList.add("adelantar")

    const campo_nombre = tarjeta.querySelector('#nombre_tarjeta')
    campo_nombre.removeAttribute("disabled")
    const campo_etnia = tarjeta.querySelector('#campo_etnia')
    campo_etnia.removeAttribute("disabled")
    const campo_origen = tarjeta.querySelector('#campo_origen')
    campo_origen.removeAttribute("disabled")
    const campo_edad = tarjeta.querySelector('#campo_edad')
    campo_edad.removeAttribute("disabled")
    const campo_clase = tarjeta.querySelector('#campo_clase')
    campo_clase.removeAttribute("disabled")
    const campo_apariencia = tarjeta.querySelector('#apariencia_personaje')
    campo_apariencia.removeAttribute("disabled")
    const campo_historia = tarjeta.querySelector('#historia_personaje')
    campo_historia.removeAttribute("disabled")

    campo_nombre.setAttribute("placeholder", "Nombre");
    campo_etnia.setAttribute("placeholder", "Etnia");
    campo_origen.setAttribute("placeholder", "Orígen");
    campo_edad.setAttribute("placeholder", "Edad");
    campo_clase.setAttribute("placeholder", "Clase");
    campo_apariencia.setAttribute("placeholder", "Apariencia");
    campo_historia.setAttribute("placeholder", "Historia");

    const editar_aceptar = tarjeta.querySelector('#editar_aceptar')
    editar_aceptar.innerHTML = '<span class="material-symbols-outlined">check</span>'
    editar_aceptar.setAttribute("onclick", `agregarPersonaje()`)

    const borrar_cancelar = tarjeta.querySelector('#borrar_cancelar')
    borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">close</span>'
    borrar_cancelar.setAttribute("onclick", "cancelarEdicionPersonaje()")
}

async function agregarPersonaje() {
    const tarjeta = document.getElementById('tarjeta')
    const campo = (selector) => tarjeta.querySelector(selector);
    const valor = (selector) => campo(selector)?.value?.trim() || ""
    const imagen = valor('#campo_imagen')
    const imagen_indice = valor('#campo_imagen_indice')
    const nombre = valor('#nombre_tarjeta')
    const etnia = valor('#campo_etnia')
    const origen = valor('#campo_origen')
    let edad = valor('#campo_edad')
    if (edad === "" || edad === null || edad === undefined) {
        edad = null;
    } else if (isNaN(Number(edad))) {
        edad = null;
    } else {
        edad = Number(edad);
    }
    const clase = valor('#campo_clase')
    const apariencia = valor('#apariencia_personaje')
    const historia = valor('#historia_personaje')
    if (await validarDatosCreacionPersonaje(nombre, edad, etnia, origen, clase, apariencia, historia, imagen, imagen_indice)) {
        const datosActualizados = { nombre, edad: edad, etnia, origen, clase, apariencia, historia, imagen, imagen_indice };
        const response = await fetch(`http://localhost:3000/api/personajes/`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(datosActualizados)});
        if (response) {
            console.log("Personaje creado")
        } else {
            console.log("Error al crear personaje")
        }

        // Después de aplicar cambios, limpiamos la tarjeta.
        
        const deshabilitarYLimpiar = (selector) => {
            const el = campo(selector)
            if (el) {
                el.disabled = true
                el.value = ""
                el.classList.remove("adelantar")
            }
        }
        deshabilitarYLimpiar('#campo_imagen')
        deshabilitarYLimpiar('#campo_imagen_indice')
        deshabilitarYLimpiar('#nombre_tarjeta')
        deshabilitarYLimpiar('#campo_etnia')
        deshabilitarYLimpiar('#campo_origen')
        deshabilitarYLimpiar('#campo_edad')
        deshabilitarYLimpiar('#campo_clase')
        deshabilitarYLimpiar('#apariencia_personaje')
        deshabilitarYLimpiar('#historia_personaje')

        const imagen_tarjeta = campo('#imagen_tarjeta')
        if (imagen_tarjeta) imagen_tarjeta.classList.remove("transparentar")

        refrescarTabla('personaje')
        cerrarTarjeta()
    }
}

async function aceptarEdicionPersonaje(id) {
    const tarjeta = document.getElementById('tarjeta')
    const campo = (selector) => tarjeta.querySelector(selector);
    const valor = (selector) => campo(selector)?.value?.trim() || ""
    const imagen = valor('#campo_imagen')
    const imagen_indice = valor('#campo_imagen_indice')
    const nombre = valor('#nombre_tarjeta')
    const etnia = valor('#campo_etnia')
    const origen = valor('#campo_origen')
    let edad = valor('#campo_edad')
    if (edad === "" || edad === null || edad === undefined) {
        edad = null;
    } else if (isNaN(Number(edad))) {
        edad = null;
    } else {
        edad = Number(edad);
    }
    const clase = valor('#campo_clase')
    const apariencia = valor('#apariencia_personaje')
    const historia = valor('#historia_personaje')
    if (await validarDatosPersonaje(nombre, edad, etnia, origen, clase, apariencia, historia, imagen, imagen_indice)) {
        const datosActualizados = { nombre, edad: edad, etnia, origen, clase, apariencia, historia, imagen, imagen_indice };
        const response = await fetch(`http://localhost:3000/api/personajes/${id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(datosActualizados)});
        if (response) {
            console.log("Personaje actualizado")
        } else {
            console.log("Error al actualizar personaje")
        }

        // Después de aplicar cambios, limpiamos la tarjeta.
        
        const deshabilitarYLimpiar = (selector) => {
            const el = campo(selector)
            if (el) {
                el.disabled = true
                el.value = ""
                el.classList.remove("adelantar")
            }
        }
        deshabilitarYLimpiar('#campo_imagen')
        deshabilitarYLimpiar('#campo_imagen_indice')
        deshabilitarYLimpiar('#nombre_tarjeta')
        deshabilitarYLimpiar('#campo_etnia')
        deshabilitarYLimpiar('#campo_origen')
        deshabilitarYLimpiar('#campo_edad')
        deshabilitarYLimpiar('#campo_clase')
        deshabilitarYLimpiar('#apariencia_personaje')
        deshabilitarYLimpiar('#historia_personaje')

        const imagen_tarjeta = campo('#imagen_tarjeta')
        if (imagen_tarjeta) imagen_tarjeta.classList.remove("transparentar")

        // Actualizar botones
        const editar_aceptar = campo('#editar_aceptar')
        if (editar_aceptar) {
            editar_aceptar.innerHTML = '<span class="material-symbols-outlined">edit</span>'
            editar_aceptar.setAttribute("onclick", `habilitarEdicionPersonaje(${id})`)
        }

        const borrar_cancelar = campo('#borrar_cancelar')
        if (borrar_cancelar) {
            borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">delete</span>'
            borrar_cancelar.setAttribute("onclick", `eliminarPersonaje(${id})`)
        }
        refrescarTabla('personaje')
        armarTarjetaPersonaje(id)
        armarTarjetaPersonaje(id)
    }
}

async function cancelarEdicionPersonaje(id) {
    const tarjeta = document.getElementById('tarjeta')
    const campo_imagen = tarjeta.querySelector('#campo_imagen')
    campo_imagen.setAttribute("disabled", true)
    campo_imagen.value = ""
    
    const imagen_tarjeta = tarjeta.querySelector('#imagen_tarjeta')
    imagen_tarjeta.classList.remove("transparentar")
    
    const data_imagen = tarjeta.querySelector('#data_imagen')
    campo_imagen.classList.remove("adelantar")

    const campo_imagen_indice = tarjeta.querySelector('#campo_imagen_indice')
    campo_imagen_indice.setAttribute("disabled", true)
    campo_imagen_indice.classList.remove("adelantar")

    campo_imagen_indice.value = ""
    const campo_nombre = tarjeta.querySelector('#nombre_tarjeta')
    campo_nombre.setAttribute("disabled", true)
    campo_nombre.value = ""
    const campo_etnia = tarjeta.querySelector('#campo_etnia')
    campo_etnia.setAttribute("disabled", true)
    campo_etnia.value = ""
    const campo_origen = tarjeta.querySelector('#campo_origen')
    campo_origen.setAttribute("disabled", true)
    campo_origen.value = ""
    const campo_edad = tarjeta.querySelector('#campo_edad')
    campo_edad.setAttribute("disabled", true)
    campo_edad.value = ""
    const campo_clase = tarjeta.querySelector('#campo_clase')
    campo_clase.setAttribute("disabled", true)
    campo_clase.value = ""
    const campo_apariencia = tarjeta.querySelector('#apariencia_personaje')
    campo_apariencia.setAttribute("disabled", true)
    campo_apariencia.value = ""
    const campo_historia = tarjeta.querySelector('#historia_personaje')
    campo_historia.setAttribute("disabled", true)
    campo_historia.value = ""

    
    const editar_aceptar = tarjeta.querySelector('#editar_aceptar')
    editar_aceptar.innerHTML = '<span class="material-symbols-outlined">edit</span>'
    editar_aceptar.setAttribute("onclick", `habilitarEdicionPersonaje(${id})`)

    const borrar_cancelar = tarjeta.querySelector('#borrar_cancelar')
    borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">delete</span>'
    borrar_cancelar.setAttribute("onclick", `eliminarPersonaje(${id})`)
}

async function habilitarEdicionPersonaje(id) {
    const tarjeta = document.getElementById('tarjeta')
    const campo_imagen = tarjeta.querySelector('#campo_imagen')
    campo_imagen.removeAttribute("disabled")

    const imagen_tarjeta = tarjeta.querySelector('#imagen_tarjeta')
    imagen_tarjeta.classList.add("transparentar")
    
    const data_imagen = tarjeta.querySelector('#data_imagen')
    campo_imagen.classList.add("adelantar")

    const campo_imagen_indice = tarjeta.querySelector('#campo_imagen_indice')
    campo_imagen_indice.removeAttribute("disabled")
    campo_imagen_indice.classList.add("adelantar")

    const campo_nombre = tarjeta.querySelector('#nombre_tarjeta')
    campo_nombre.removeAttribute("disabled")
    const campo_etnia = tarjeta.querySelector('#campo_etnia')
    campo_etnia.removeAttribute("disabled")
    const campo_origen = tarjeta.querySelector('#campo_origen')
    campo_origen.removeAttribute("disabled")
    const campo_edad = tarjeta.querySelector('#campo_edad')
    campo_edad.removeAttribute("disabled")
    const campo_clase = tarjeta.querySelector('#campo_clase')
    campo_clase.removeAttribute("disabled")
    const campo_apariencia = tarjeta.querySelector('#apariencia_personaje')
    campo_apariencia.removeAttribute("disabled")
    const campo_historia = tarjeta.querySelector('#historia_personaje')
    campo_historia.removeAttribute("disabled")

    const editar_aceptar = tarjeta.querySelector('#editar_aceptar')
    editar_aceptar.innerHTML = '<span class="material-symbols-outlined">check</span>'
    editar_aceptar.setAttribute("onclick", `aceptarEdicionPersonaje(${id})`)

    const borrar_cancelar = tarjeta.querySelector('#borrar_cancelar')
    borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">close</span>'
    borrar_cancelar.setAttribute("onclick", "cancelarEdicionPersonaje()")
}

async function crearEtnia() {
    armarTarjetaEtniaVacia()
    mostrarTarjetaEtnias()
    const tarjeta = document.getElementById('tarjeta')
    const campo_moodboard = tarjeta.querySelector('#campo_imagen') // Renamed from campo_imagen to reflect moodboard
    campo_moodboard.removeAttribute("disabled")

    const imagen_tarjeta = tarjeta.querySelector('#imagen_tarjeta')
    imagen_tarjeta.classList.add("transparentar")
    
    campo_moodboard.classList.add("adelantar")

    const campo_imagen_indice = tarjeta.querySelector('#campo_imagen_indice')
    campo_imagen_indice.removeAttribute("disabled")
    campo_imagen_indice.classList.add("adelantar")

    const campo_nombre = tarjeta.querySelector('#nombre_tarjeta')
    campo_nombre.removeAttribute("disabled")
    const campo_naturaleza = tarjeta.querySelector('#naturaleza_tarjeta') // New attribute for etnia
    campo_naturaleza.removeAttribute("disabled")
    const campo_descripcion = tarjeta.querySelector('#descripcion_etnia') // New attribute for etnia
    campo_descripcion.removeAttribute("disabled")

    campo_nombre.setAttribute("placeholder", "Nombre");
    campo_naturaleza.setAttribute("placeholder", "Naturaleza");
    campo_descripcion.setAttribute("placeholder", "Descripción");
    campo_moodboard.setAttribute("placeholder", "URL Moodboard");
    campo_imagen_indice.setAttribute("placeholder", "URL Imagen Índice");


    const editar_aceptar = tarjeta.querySelector('#editar_aceptar')
    editar_aceptar.innerHTML = '<span class="material-symbols-outlined">check</span>'
    editar_aceptar.setAttribute("onclick", `agregarEtnia()`)

    const borrar_cancelar = tarjeta.querySelector('#borrar_cancelar')
    borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">close</span>'
    borrar_cancelar.setAttribute("onclick", "cancelarEdicionEtnia()") // Assuming a cancel function for etnia
}

async function agregarEtnia() {
    const tarjeta = document.getElementById('tarjeta')
    const campo = (selector) => tarjeta.querySelector(selector);
    const valor = (selector) => campo(selector)?.value?.trim() || ""
    
    const moodboard = valor('#campo_imagen')
    const imagen_indice = valor('#campo_imagen_indice')
    const nombre = valor('#nombre_tarjeta')
    const naturaleza = valor('#naturaleza_tarjeta')
    const descripcion = valor('#descripcion_etnia')

    if (await validarDatosCreacionEtnia(nombre, descripcion, naturaleza, imagen_indice, moodboard)) {
        const datosActualizados = { nombre, descripcion, naturaleza, imagen_indice, moodboard };
        const response = await fetch(`http://localhost:3000/api/etnias/`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(datosActualizados)});
        if (response.ok) {
            console.log("Etnia creada")
        } else {
            console.error("Error al crear etnia:", await response.text())
        }

        const deshabilitarYLimpiar = (selector) => {
            const el = campo(selector)
            if (el) {
                el.disabled = true
                el.value = ""
                el.classList.remove("adelantar")
            }
        }
        deshabilitarYLimpiar('#campo_imagen') // moodboard
        deshabilitarYLimpiar('#campo_imagen_indice')
        deshabilitarYLimpiar('#nombre_tarjeta')
        deshabilitarYLimpiar('#naturaleza_tarjeta')
        deshabilitarYLimpiar('#descripcion_etnia')

        const imagen_tarjeta = campo('#imagen_tarjeta')
        if (imagen_tarjeta) imagen_tarjeta.classList.remove("transparentar")

        refrescarTabla('etnia')
        cerrarTarjeta()
    }
}

async function habilitarEdicionEtnia(id) {
    const tarjeta = document.getElementById('tarjeta');
    const campo_imagen = tarjeta.querySelector('#campo_imagen');
    campo_imagen.removeAttribute("disabled");
    campo_imagen.classList.add("adelantar");

    const campo_imagen_indice = tarjeta.querySelector('#campo_imagen_indice');
    campo_imagen.removeAttribute("disabled");
    campo_imagen.classList.add("adelantar");

    const imagen_tarjeta = tarjeta.querySelector('#imagen_tarjeta');
    imagen_tarjeta.classList.add("transparentar");

    const campo_nombre = tarjeta.querySelector('#nombre_tarjeta');
    campo_nombre.removeAttribute("disabled");
    const campo_naturaleza = tarjeta.querySelector('#naturaleza_tarjeta');
    campo_naturaleza.removeAttribute("disabled");
    const campo_descripcion = tarjeta.querySelector('#descripcion_etnia');
    campo_descripcion.removeAttribute("disabled");

    const editar_aceptar = tarjeta.querySelector('#editar_aceptar');
    editar_aceptar.innerHTML = '<span class="material-symbols-outlined">check</span>';
    editar_aceptar.setAttribute("onclick", `aceptarEdicionEtnia(${id})`);

    const borrar_cancelar = tarjeta.querySelector('#borrar_cancelar');
    borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">close</span>';
    borrar_cancelar.setAttribute("onclick", `cancelarEdicionEtnia(${id})`);
}

async function aceptarEdicionEtnia(id) {
    const tarjeta = document.getElementById('tarjeta');
    const campo = (selector) => tarjeta.querySelector(selector);
    const valor = (selector) => campo(selector)?.value?.trim() || campo(selector)?.placeholder?.trim() || "";
    
    const moodboard = valor('#campo_imagen');
    const imagen_indice = valor('#campo_imagen_indice');
    const nombre = (() => { const el = tarjeta.querySelector('#nombre_tarjeta'); return el && !el.disabled && el.value.trim() ? el.value.trim() : null })();
    const naturaleza = valor('#naturaleza_tarjeta');
    const descripcion = valor('#descripcion_etnia');

    if (await validarDatosEtnia(nombre, descripcion, naturaleza, imagen_indice, moodboard)) {
        const datosActualizados = { nombre, descripcion, naturaleza, imagen_indice, moodboard };
        try {
            const response = await fetch(`http://localhost:3000/api/etnias/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosActualizados)
            });
            if (response.ok) {
                console.log("Etnia actualizada");
            } else {
                console.error("Error al actualizar etnia:", await response.text());
            }
        } catch (error) {
            console.error('Hubo un problema al actualizar la etnia:', error);
        }

        const deshabilitarYLimpiar = (selector) => {
            const el = campo(selector);
            if (el) {
                el.disabled = true;
                el.value = "";
                el.classList.remove("adelantar");
            }
        };

        deshabilitarYLimpiar('#campo_imagen');
        deshabilitarYLimpiar('#campo_imagen_indice');
        deshabilitarYLimpiar('#nombre_tarjeta');
        deshabilitarYLimpiar('#descripcion_etnia');
        deshabilitarYLimpiar('#naturaleza_etnia');

        const imagen_tarjeta = campo('#imagen_tarjeta');
        if (imagen_tarjeta) imagen_tarjeta.classList.remove("transparentar");

        const editar_aceptar = campo('#editar_aceptar');
        if (editar_aceptar) {
            editar_aceptar.innerHTML = '<span class="material-symbols-outlined">edit</span>';
            editar_aceptar.setAttribute("onclick", `habilitarEdicionEtnia(${id})`);
        }

        const borrar_cancelar = campo('#borrar_cancelar');
        if (borrar_cancelar) {
            borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">delete</span>';
            borrar_cancelar.setAttribute("onclick", `eliminarEtnia(${id})`);
        }
        refrescarTabla('etnia');
        armarTarjetaEtnia(id); // Recargar la tarjeta con los datos actualizados
        cerrarTarjeta()
    }
}

async function cancelarEdicionEtnia(id) {
    const tarjeta = document.getElementById('tarjeta');
    const campo_imagen = tarjeta.querySelector('#campo_imagen');
    campo_imagen.setAttribute("disabled", true);
    campo_imagen.value = "";

    const imagen_tarjeta = tarjeta.querySelector('#imagen_tarjeta');
    imagen_tarjeta.classList.remove("transparentar");

    campo_imagen.classList.remove("adelantar");

    const campo_imagen_indice = tarjeta.querySelector('#campo_imagen_indice');
    campo_imagen_indice.setAttribute("disabled", true);
    campo_imagen_indice.classList.remove("adelantar");
    campo_imagen_indice.value = "";

    const campo_nombre = tarjeta.querySelector('#nombre_tarjeta');
    campo_nombre.setAttribute("disabled", true);
    campo_nombre.value = "";
    const campo_naturaleza = tarjeta.querySelector('#naturaleza_etnia');
    campo_naturaleza.setAttribute("disabled", true);
    campo_naturaleza.value = "";
    const campo_descripcion = tarjeta.querySelector('#descripcion_etnia');
    campo_descripcion.setAttribute("disabled", true);
    campo_descripcion.value = "";

    const editar_aceptar = tarjeta.querySelector('#editar_aceptar');
    editar_aceptar.innerHTML = '<span class="material-symbols-outlined">edit</span>';
    editar_aceptar.setAttribute("onclick", `habilitarEdicionEtnia(${id})`);

    const borrar_cancelar = tarjeta.querySelector('#borrar_cancelar');
    borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    borrar_cancelar.setAttribute("onclick", `eliminarEtnia(${id})`);

    armarTarjetaEtnia(id);
}

async function crearLugar() {
    armarTarjetaLugarVacia()
    mostrarTarjetaLugares()
    const tarjeta = document.getElementById('tarjeta')
    const campo_imagen = tarjeta.querySelector('#campo_imagen')
    campo_imagen.removeAttribute("disabled")

    const imagen_tarjeta = tarjeta.querySelector('#imagen_tarjeta')
    imagen_tarjeta.classList.add("transparentar")
    
    campo_imagen.classList.add("adelantar")

    const campo_nombre = tarjeta.querySelector('#nombre_tarjeta')
    campo_nombre.removeAttribute("disabled")
    const campo_clima = tarjeta.querySelector('#campo_clima')
    campo_clima.removeAttribute("disabled")
    const campo_faccion = tarjeta.querySelector('#campo_faccion')
    campo_faccion.removeAttribute("disabled")
    const campo_descripcion = tarjeta.querySelector('#campo_descripcion')
    campo_descripcion.removeAttribute("disabled")

    campo_nombre.setAttribute("placeholder", "Nombre");
    campo_clima.setAttribute("placeholder", "Clima");
    campo_faccion.setAttribute("placeholder", "Facción");
    campo_descripcion.setAttribute("placeholder", "Descripción");
    campo_imagen.setAttribute("placeholder", "URL Imagen");


    const editar_aceptar = tarjeta.querySelector('#editar_aceptar')
    editar_aceptar.innerHTML = '<span class="material-symbols-outlined">check</span>'
    editar_aceptar.setAttribute("onclick", `agregarLugar()`)

    const borrar_cancelar = tarjeta.querySelector('#borrar_cancelar')
    borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">close</span>'
    borrar_cancelar.setAttribute("onclick", "cancelarEdicionLugar()")
}

async function agregarLugar() {
    const tarjeta = document.getElementById('tarjeta')
    const campo = (selector) => tarjeta.querySelector(selector);
    const valor = (selector) => campo(selector)?.value?.trim() || ""
    
    const imagen = valor('#campo_imagen')
    const nombre = valor('#nombre_tarjeta')
    const clima = valor('#campo_clima')
    const faccion = valor('#campo_faccion')
    const descripcion = valor('#campo_descripcion')

    if (await validarDatosCreacionLugar(nombre, clima, faccion, descripcion, imagen)) {
        const datosActualizados = { nombre, clima, faccion, descripcion, imagen };
        const response = await fetch(`http://localhost:3000/api/lugares/`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(datosActualizados)});
        if (response.ok) {
            console.log("Lugar creado")
        } else {
            console.error("Error al crear lugar:", await response.text())
        }

        const deshabilitarYLimpiar = (selector) => {
            const el = campo(selector)
            if (el) {
                el.disabled = true
                el.value = ""
                el.classList.remove("adelantar")
            }
        }
        deshabilitarYLimpiar('#campo_imagen')
        deshabilitarYLimpiar('#nombre_tarjeta')
        deshabilitarYLimpiar('#campo_clima')
        deshabilitarYLimpiar('#campo_faccion')
        deshabilitarYLimpiar('#campo_descripcion')

        const imagen_tarjeta = campo('#imagen_tarjeta')
        if (imagen_tarjeta) imagen_tarjeta.classList.remove("transparentar")

        refrescarTabla('lugar')
        cerrarTarjeta()
    }
}

async function habilitarEdicionLugar(id) {
    const tarjeta = document.getElementById('tarjeta');
    const campo_imagen = tarjeta.querySelector('#campo_imagen');
    campo_imagen.removeAttribute("disabled");
    campo_imagen.classList.add("adelantar");

    const imagen_tarjeta = tarjeta.querySelector('#imagen_tarjeta');
    imagen_tarjeta.classList.add("transparentar");

    const campo_nombre = tarjeta.querySelector('#nombre_tarjeta');
    campo_nombre.removeAttribute("disabled");
    const campo_clima = tarjeta.querySelector('#campo_clima');
    campo_clima.removeAttribute("disabled");
    const campo_faccion = tarjeta.querySelector('#campo_faccion');
    campo_faccion.removeAttribute("disabled");
    const campo_descripcion = tarjeta.querySelector('#campo_descripcion');
    campo_descripcion.removeAttribute("disabled");

    const editar_aceptar = tarjeta.querySelector('#editar_aceptar');
    editar_aceptar.innerHTML = '<span class="material-symbols-outlined">check</span>';
    editar_aceptar.setAttribute("onclick", `aceptarEdicionLugar(${id})`);

    const borrar_cancelar = tarjeta.querySelector('#borrar_cancelar');
    borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">close</span>';
    borrar_cancelar.setAttribute("onclick", `cancelarEdicionLugar(${id})`);
}

async function aceptarEdicionLugar(id) {
    const tarjeta = document.getElementById('tarjeta');
    const campo = (selector) => tarjeta.querySelector(selector);
    const valor = (selector) => campo(selector)?.value?.trim() || campo(selector)?.placeholder?.trim() || "";
    
    const imagen = valor('#campo_imagen');
    const nombre = (() => { const el = tarjeta.querySelector('#nombre_tarjeta'); return el && !el.disabled && el.value.trim() ? el.value.trim() : null })();
    const clima = valor('#campo_clima');
    const faccion = valor('#campo_faccion');
    const descripcion = valor('#campo_descripcion');

    // You'll need to create a validation function for Lugares similar to validarDatosEtnia
    if (await validarDatosLugar(nombre, clima, faccion, descripcion, imagen)) {
        const datosActualizados = { nombre, clima, faccion, descripcion, imagen };
        try {
            const response = await fetch(`http://localhost:3000/api/lugares/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosActualizados)
            });
            if (response.ok) {
                console.log("Lugar actualizado");
            } else {
                console.error("Error al actualizar lugar:", await response.text());
            }
        } catch (error) {
            console.error('Hubo un problema al actualizar el lugar:', error);
        }

        const deshabilitarYLimpiar = (selector) => {
            const el = campo(selector);
            if (el) {
                el.disabled = true;
                el.value = "";
                el.classList.remove("adelantar");
            }
        };

        deshabilitarYLimpiar('#campo_imagen');
        deshabilitarYLimpiar('#nombre_tarjeta');
        deshabilitarYLimpiar('#campo_clima');
        deshabilitarYLimpiar('#campo_faccion');
        deshabilitarYLimpiar('#campo_descripcion');

        const imagen_tarjeta = campo('#imagen_tarjeta');
        if (imagen_tarjeta) imagen_tarjeta.classList.remove("transparentar");

        const editar_aceptar = campo('#editar_aceptar');
        if (editar_aceptar) {
            editar_aceptar.innerHTML = '<span class="material-symbols-outlined">edit</span>';
            editar_aceptar.setAttribute("onclick", `habilitarEdicionLugar(${id})`);
        }

        const borrar_cancelar = campo('#borrar_cancelar');
        if (borrar_cancelar) {
            borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">delete</span>';
            borrar_cancelar.setAttribute("onclick", `eliminarLugar(${id})`);
        }
        refrescarTabla('lugar');
        armarTarjetaLugar(id); // Recargar la tarjeta con los datos actualizados
        cerrarTarjeta()
    }
}

async function cancelarEdicionLugar(id) {
    const tarjeta = document.getElementById('tarjeta');
    const campo_imagen = tarjeta.querySelector('#campo_imagen');
    campo_imagen.setAttribute("disabled", true);
    campo_imagen.value = "";

    const imagen_tarjeta = tarjeta.querySelector('#imagen_tarjeta');
    imagen_tarjeta.classList.remove("transparentar");

    campo_imagen.classList.remove("adelantar");

    const campo_nombre = tarjeta.querySelector('#nombre_tarjeta');
    campo_nombre.setAttribute("disabled", true);
    campo_nombre.value = "";
    const campo_clima = tarjeta.querySelector('#campo_clima');
    campo_clima.setAttribute("disabled", true);
    campo_clima.value = "";
    const campo_faccion = tarjeta.querySelector('#campo_faccion');
    campo_faccion.setAttribute("disabled", true);
    campo_faccion.value = "";
    const campo_descripcion = tarjeta.querySelector('#campo_descripcion');
    campo_descripcion.setAttribute("disabled", true);
    campo_descripcion.value = "";

    const editar_aceptar = tarjeta.querySelector('#editar_aceptar');
    editar_aceptar.innerHTML = '<span class="material-symbols-outlined">edit</span>';
    editar_aceptar.setAttribute("onclick", `habilitarEdicionLugar(${id})`);

    const borrar_cancelar = tarjeta.querySelector('#borrar_cancelar');
    borrar_cancelar.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    borrar_cancelar.setAttribute("onclick", `eliminarLugar(${id})`);

    armarTarjetaLugar(id); // Recargar la tarjeta con los datos originales
}

async function validarDatosLugar(nombre, clima, faccion, descripcion, imagen){
    const apiDataLugares = await getElementoApi('http://localhost:3000/api/lugares/')
    let listaLugares = []
    if (apiDataLugares) {
        apiDataLugares.forEach(lugar => {
            listaLugares.push(lugar.nombre)
        })
    } else {
        return false
    }
    if (nombre && nombre.length > 25) {
        alert("El nombre ingresado supera el límite de 25 caracteres")
        return false
    } else {
            if (clima && clima.length > 25) {
                alert("El clima ingresado supera el límite de 25 caracteres")
                return false
            } else {
                if (faccion && faccion.length > 25) {
                    alert("La facción ingresada supera el límite de 25 caracteres")
                    return false
                } else {
                    if (descripcion && descripcion.length > 2000) {
                        alert("La descripción ingresada supera el límite de 2000 caracteres")
                        return false
                    } else {
                        if (imagen && imagen.length > 255) {
                            alert("La URL de la imagen es demasiado larga (máx. 255 caracteres)")
                            return false
                        } else {
                            if (!nombre && !clima && !faccion && !descripcion && !imagen) {
                                alert("Nada ha sido modificado.")
                                return false
                            } else {
                                return true // Pasamos!!
                            }
                        }
                    }
                }
            }
    }
}

async function validarDatosCreacionLugar(nombre, clima, faccion, descripcion, imagen){
    const apiDataLugares = await getElementoApi('http://localhost:3000/api/lugares/')
    let listaLugares = []
    if (apiDataLugares) {
        apiDataLugares.forEach(lugar => {
            listaLugares.push(lugar.nombre)
        })
    } else {
        return false
    }
    if (!nombre || nombre.length > 25) {
        alert("El nombre ingresado supera el límite de 25 caracteres o no existe")
        return false
    } else {
        if (nombre && listaLugares.includes(nombre)) {
            alert("El lugar ingresado ya existe")
            return false
        } else {
            if (clima && clima.length > 25) {
                alert("El clima ingresado supera el límite de 25 caracteres")
                return false
            } else {
                if (faccion && faccion.length > 25) {
                    alert("La facción ingresada supera el límite de 25 caracteres")
                    return false
                } else {
                    if (descripcion && descripcion.length > 2000) {
                        alert("La descripción ingresada supera el límite de 2000 caracteres")
                        return false
                    } else {
                        if (imagen && imagen.length > 255) {
                            alert("La URL de la imagen es demasiado larga (máx. 255 caracteres)")
                            return false
                        } else {
                            if (!nombre) {
                                alert("Debes escribir un nombre")
                                return false
                            } else {
                                return true // Pasamos!!
                            }
                        }
                    }
                }
            }
        }
    }
}

document.addEventListener('mousedown', () => {
  document.querySelector('.mf-cursor')?.classList.add('-clicked')
})

document.addEventListener('mouseup', () => {
  document.querySelector('.mf-cursor')?.classList.remove('-clicked')
})

const cursor = new MouseFollower({
    el: null,
    container: document.body,
    className: 'mf-cursor',
    innerClassName: 'mf-cursor-inner',
    textClassName: 'mf-cursor-text',
    mediaClassName: 'mf-cursor-media',
    mediaBoxClassName: 'mf-cursor-media-box',
    iconSvgClassName: 'mf-svgsprite',
    iconSvgNamePrefix: '-',
    iconSvgSrc: '',
    dataAttr: 'cursor',
    hiddenState: '-hidden',
    textState: '-text',
    iconState: '-icon',
    activeState: '-active',
    mediaState: '-media',
    stateDetection: {
        '-pointer': 'a,button',
        '-hidden': 'iframe'
    },
    visible: true,
    visibleOnState: false,
    speed: 0.55,
    ease: 'expo.out',
    overwrite: true,
    skewing: 3,
    skewingText: 2,
    skewingIcon: 2,
    skewingMedia: 2,
    skewingDelta: 0.001,
    skewingDeltaMax: 0.15,
    stickDelta: 0.15,
    showTimeout: 20,
    hideOnLeave: true,
    hideTimeout: 300,
    hideMediaTimeout: 300
});