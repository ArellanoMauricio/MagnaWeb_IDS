function typeWriter(txt, i, speed, id) {
    if (i < txt.length) {
        document.getElementById(id).innerHTML += txt.charAt(i);
        i++;
        setTimeout(() => typeWriter(txt, i, speed, id), speed);
    }
}
async function toggleArrows() {
    /* Subimos y desvanecemos el título. */
    const intro = document.getElementById("intro");
    intro.classList.toggle("clicked");
    /* Hacemos aparecer la tablita del índice. */
    const indice = document.getElementById("indice");
    indice.classList.toggle("clicked");
    /* Esperamos 3500ms y hacemos aparecer el título del índice. */
    await new Promise(res => setTimeout(res, 3500));
    const indicetex = document.getElementById("text");
    indicetex.classList.toggle("iniciado");
    /* Ejecutamos la animación de tipeo de cada elemento del índice. */
    await new Promise(res => setTimeout(res, 2500));
    typeWriter("PERSONAJES", 0, 500, "text1")
    await new Promise(res => setTimeout(res, 500));
    typeWriter("HISTORIA", 0, 500, "text2")
    await new Promise(res => setTimeout(res, 500));
    typeWriter("LUGARES", 0, 500, "text3")
}