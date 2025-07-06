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

async function redirect(sitio) {
    const indice = document.getElementById("index")
    indice.classList.remove("in")
    indice.classList.add("out")
    await new Promise(res => setTimeout(res, 3500))
    window.location.href = "/" + sitio + ".html"
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

async function rellenarPersonajes(){
    const apiData = await getElementoApi('http://localhost:3000/api/personajes/')
    if (apiData) {
        console.log('test')
    }
    await new Promise(res => setTimeout(res, 2000))
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