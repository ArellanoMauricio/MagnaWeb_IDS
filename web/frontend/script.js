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
    typeWriter("PERSONAJES", 0, 500, "item1")

    await new Promise(res => setTimeout(res, 500))
    typeWriter("HISTORIA", 0, 500, "item2")

    await new Promise(res => setTimeout(res, 500))
    typeWriter("LUGARES", 0, 500, "item3")
}