const { pool } = require('./db');

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS etnias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(25) UNIQUE NOT NULL,
        descripcion VARCHAR(280) DEFAULT 'No se posee informacion de este enigmatico grupo',
        naturaleza VARCHAR(25) DEFAULT 'Neutral',
        imagen_indice TEXT DEFAULT 'https://i.imgur.com/c1tlvB9.jpeg',
        moodboard TEXT DEFAULT 'https://i.imgur.com/IvYrcaz.png'
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS lugares (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(25) UNIQUE NOT NULL,
        descripcion VARCHAR(280) DEFAULT 'Las leyendas hablan de este sitio, pero su verdadera historia permanece oculta',
        faccion VARCHAR(25) DEFAULT 'Ninguna',
        clima VARCHAR(25) DEFAULT 'Templado',
        imagen TEXT DEFAULT 'https://i.imgur.com/2Bo3dP1.jpeg'
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS personajes (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(25) NOT NULL,
        etnia VARCHAR(25) REFERENCES etnias(nombre) DEFAULT 'Desconocida',
        edad INT NOT NULL DEFAULT 0,
        origen VARCHAR(25) REFERENCES lugares(nombre) DEFAULT 'Desconocido',
        apariencia VARCHAR(200) DEFAULT 'No se conoce la apariencia de este personaje',
        historia VARCHAR(500) DEFAULT 'La historia de este personaje permanece oculta en las sombras',
        clase VARCHAR(25) DEFAULT 'Desconocida',
        imagen TEXT DEFAULT 'https://i.imgur.com/oIw7byw.png',
        imagen_indice TEXT DEFAULT 'https://i.imgur.com/if90NDE.jpeg'
      );
    `);
    await pool.query(`
      INSERT INTO lugares (nombre, descripcion, imagen) VALUES
        ('Desconocido', 'Este lugar no ha sido registrado en ningún mapa ni historia oficial. Su ubicación, clima y control político son inciertos.', 'unknown_place.png')
      ON CONFLICT (nombre) DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO etnias (nombre, descripcion, imagen_indice, moodboard) VALUES
        ('Desconocida', 'Se desconoce el origen, cultura o características de esta etnia. Puede tratarse de un grupo olvidado, no clasificado o deliberadamente oculto.', 'unknown_ethnicity.png', 'unknown_moodboard.png')
      ON CONFLICT (nombre) DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO lugares (nombre, descripcion, faccion, clima, imagen) VALUES
        ('Göldelya', 'El vasto continente que alberga diversas naciones y culturas, desde las áridas tierras de los Gredanos hasta las tormentosas montañas de los Vesmerlinos. Lugar de grandes conflictos, tradiciones ancestrales y misterios por descubrir.', 'Ninguna', 'Diverso', 'goldelya.png'),
        ('Greda', 'Capital y corazón del Imperio Gredano, una ciudad fortificada que destaca por su arquitectura avanzada, prósperos campos agrícolas y una poderosa guarnición militar que protege sus fronteras.', 'Imperio Gredano', 'Templado', 'greda.png'),
        ('Khadaria', 'Extensas sabanas y pastizales que conforman el hogar nómada de los Malasai. Tierras abiertas donde las tribus cabalgan libres y el corcel es símbolo de honor y destreza en la guerra.', 'Nómadas Malasai', 'Sabanas Secas', 'khadaria.png'),
        ('Thauren', 'Antiguo principado de gran renombre, ahora marcado por las cicatrices de la guerra con Dracovia. Centro comercial con mercados bulliciosos y minas que extraen ricos minerales y acero de renombre mundial.', 'Thurin', 'Montañoso', 'thauren.png'),
        ('Dracovia', 'Isla fortaleza del pueblo Dracoviano, hogar de criaderos de dragones y coliseos para batallas aéreas. Territorio aislado rodeado de mares tempestuosos y leyendas antiguas.', 'Dracovianos', 'Atlántico Tempestuoso', 'dracovia.png'),
        ('Vesmerlia', 'La península azotada por vientos y tormentas eternas, hogar de los Vesmerlinos. Tierra dura y fría donde la magia y la fuerza son la clave para la supervivencia.', 'Vesmerlinos', 'Ártico', 'vesmerlia.png'),
        ('Claro de los Sueños', 'Un sitio misterioso y desconocido ubicado en medio del Mar Fractal, donde habitan los sueños de todas las personas. Es un lugar etéreo y cambiante, imposible de mapear con precisión, que conecta con la dimensión de los sueños.', NULL, 'Etereo', 'claro_de_los_suenos.png')
      ON CONFLICT (nombre) DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO etnias (nombre, descripcion, naturaleza, imagen_indice, moodboard) VALUES
        ('Gredanos', 'Pueblo ancestral del sur que habita las costas del Mar Verde y las fronteras con Thauren y Khadaria.', 'dominante', 'gredanos_indice.png', 'gredanos_moodboard.png'),
        ('Malasai', 'Pueblo nómada originario de las vastas sabanas de Khadaria.', 'rebelde', 'malasai_indice.png', 'malasai_moodboard.png'),
        ('Thurin', 'Etnia tradicionalista del sureste con gran herencia mítica y religiosa.', 'neutral', 'thurin_indice.png', 'thurin_moodboard.png'),
        ('Dracovianos', 'Antiguo pueblo insular que habita el archipiélago del Mar Verde.', 'aislado', 'dracovianos_indice.png', 'dracovianos_moodboard.png'),
        ('Vesmerlinos', 'Pueblo endurecido por la vida en la tormentosa península de Vesmerlia', 'misterioso', 'vesmerlinos_indice.png', 'vesmerlinos_moodboard.png')
      ON CONFLICT (nombre) DO NOTHING;
    `);

    console.log('✔ Tablas creadas y datos iniciales insertados.');
  } catch (err) {
    console.error('❌ Error inicializando la base de datos:', err);
    throw err;
  }
}
module.exports = initDB;