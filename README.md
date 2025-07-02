# MagnaWeb - Introducción al Desarrollo de Software
<p>Trabajo Práctico Final para la materia de Introducción al Desarrollo de Software.<br>2025 — Facultad de Ingeniería de la Universidad de Buenos Aires.</p>

## Tabla de Contenidos
📄 [Descripción](#descripción)
🎯 [Objetivos](#objetivos)
💾 [Instalación](#instalación)
🛠️ [Tecnologías Utilizadas](#tecnologías-utilizadas)
🧑‍💻 [Autores](#autores)
📁 [Estructura del Proyecto](#estructura-del-proyecto)

---

## Descripción

MagnaWeb es una plataforma web desarrollada como herramienta de apoyo para la creación, organización y gestión del universo narrativo de MAGNAONIRICA™. Su propósito principal es centralizar y facilitar el acceso a información sobre personajes, lugares e historia del mundo, permitiendo a sus usuarios navegar de forma intuitiva por los elementos clave del lore y mantener la coherencia narrativa a lo largo del tiempo.

## Objetivos

El objetivo principal de este trabajo práctico es poner en práctica los conceptos fundamentales vistos durante la cursada de Introducción al Desarrollo de Software. A través del desarrollo de un proyecto web completo, buscamos:

- Demostrar la comprensión de las tecnologías y buenas prácticas abordadas en clase.
- Aplicar los conocimientos adquiridos en el diseño e implementación de una solución funcional con frontend, backend y base de datos.
- Trabajar colaborativamente utilizando herramientas de control de versiones y metodologías de desarrollo incremental.
- Fomentar la creatividad mediante la elección de una temática original y propia para el sitio web.
- Construir una API REST robusta y un sitio web estático que interactúe con dicha API.
- Integrar los diferentes componentes del sistema utilizando Docker Compose para facilitar su despliegue.

Este trabajo nos permite afianzar nuestras habilidades técnicas, promover el trabajo en equipo y prepararnos para desafíos reales dentro del mundo del desarrollo de software.

## Instalación

1. **Abra la aplicación *Docker Desktop*.**
2. **Corra el comando ```docker-compose up -d```.**
3. **Abra la página ```localhost/3000:3000```.**

## Tecnologías Utilizadas

- **Lenguaje de programación:** 'JavaScript'
- **Framework:** 'Node'
- **Base de datos:** 'PostgreSQL'
- **Herramientas:** 'Git', 'Docker' y 'VSCode'

## 📁 Estructura del Proyecto

Este proyecto tiene la siguiente estructura:

```
/
├── db
│   ├── .volumes: la base de datos donde se guarda toda la información.
└── web
    ├── backend: partes de la aplicación que no son directamente visibles para el usuario.
    │   ├── api.js:
    │   ├── package.json:
    │   └── package-lock.json:
    └── frontend: partes de la aplicación que si son directamente visibles para el usuario.
        ├── source: carpeta donde se guardan las imágenes básicas del sitio, como el fondo.
        ├── animations.css: todas las animaciones del sitio.
        ├── index.html: página de inicio de la aplicación, contiene el índice para navegar.
        ├── lugares.html: índice donde se muestran todas las locaclizaciones del libro.
        ├── personajes.html: índice donde se muestran todos los personajes del libro.
        ├── script.js: funciones de javascript necesarias para las animaciones más complejas.
        ├── style.css: aspectos para los elementos visibles de la aplicación principal.
        ├── subindices.css: aspectos para los elementos visibles de los subindices (personajes, lugares, etc).
        └── vanillatilt.js: librería vanillatilt, usada para que los índices sigan el movimiento del mouse.
        
```

## Autores
- **Mauricio Arellano**
- **Lautaro de la Fuente**
- **Marcos Villena**
