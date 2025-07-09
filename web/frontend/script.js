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

async function redirect(sitio, id, t) {
    const elemento = id ? document.getElementById(id) : null
    if (elemento) {
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
        
        `
        tarjeta.appendChild(informacion)
    }
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
        
        `
        tarjeta.appendChild(informacion)
    }
}

async function armarTarjetaEtnia(id){
    const tarjeta = document.getElementById('tarjeta')
    const apiData = await getElementoApi(`http://localhost:3000/api/etnias/${id}`)
    if (apiData) {
        const informacion = document.createElement('div')
        const nombre = apiData.nombre;
        const descripcion = apiData.descripcion;
        const origen = apiData.origen;
        const moodboard = apiData.moodboard;
        const imagen_indice = apiData.imagen_indice;
        const naturaleza = apiData.naturaleza;
        informacion.innerHTML = `
        
        `
        tarjeta.appendChild(informacion)
    }
}

async function rellenarEtnias(){
    const apiData = await getElementoApi('http://localhost:3000/api/etnias/')
    const contenedor = document.getElementById('cuadro2')
    if (apiData) {
        apiData.forEach((lugar, i) => {
            const tarjeta = document.createElement('div')
            tarjeta.classList.add('lugar')
            const nombre = lugar.nombre;
            const imagen = lugar.imagen_indice;
            tarjeta.innerHTML = `
            <div class="imgcontainer">
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
        contenedor.appendChild(tarjeta)
}

async function rellenarLugares(){
    const apiData = await getElementoApi('http://localhost:3000/api/lugares/')
    const contenedor = document.getElementById('cuadro2')
    if (apiData) {
        apiData.forEach((lugar, i) => {
            const tarjeta = document.createElement('div')
            tarjeta.classList.add('lugar')
            const nombre = lugar.nombre;
            const imagen = lugar.imagen;
            tarjeta.innerHTML = `
            <div class="imgcontainer">
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
        contenedor.appendChild(tarjeta)
}

async function rellenarPersonajes(){
    const apiData = await getElementoApi('http://localhost:3000/api/personajes/')
    const contenedor = document.getElementById('cuadro2')
    if (apiData) {
        apiData.forEach((personaje, i) => {
            const tarjeta = document.createElement('div')
            tarjeta.classList.add('personaje')
            const nombre = personaje.nombre;
            const imagen = personaje.imagen_indice;
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
        contenedor.appendChild(tarjeta)
    }
}

async function mostrarTarjeta(){
    const indiceamover = document.getElementById("container")
    indiceamover.classList.add("moverderecha")
    await new Promise(res => setTimeout(res, 2000))
    const tarjeta = document.getElementById("tarjeta")
    tarjeta.classList.add("abrirtarjeta")
}



document.addEventListener('mousedown', () => {
  document.querySelector('.mf-cursor')?.classList.add('-clicked');
});

document.addEventListener('mouseup', () => {
  document.querySelector('.mf-cursor')?.classList.remove('-clicked');
});

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