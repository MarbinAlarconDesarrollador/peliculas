// --- MOTOR DE SONIDO (Web Audio API) ---
const SoundEngine = {
    ctx: new (window.AudioContext || window.webkitAudioContext)(),

    playTic() {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    },

    playAlarm() {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(300, this.ctx.currentTime + 0.5);
        osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 1);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1);

        osc.start();
        osc.stop(this.ctx.currentTime + 1);
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]); // Vibración
    },

    playDing() {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
    }
};

const movies = [
     { title: "Titanic", cat: "Drama / Romance" },
  { title: "El Exorcista", cat: "Terror" },
  { title: "Gladiador", cat: "Acción / Historia" },
  { title: "Volver al Futuro", cat: "Ciencia Ficción" },
  { title: "La Propuesta", cat: "Comedia Romántica" },
  { title: "El Laberinto del Fauno", cat: "Fantasía" },
  { title: "El Silencio de los Inocentes", cat: "Thriller / Psicológico" },
  { title: "El Club de la Pelea", cat: "Drama / Psicológico" },
  { title: "El Pianista", cat: "Drama / Histórico" },
  { title: "La Vida es Bella", cat: "Drama" },
  { title: "El Conjuro", cat: "Terror" },
  { title: "Diario de una Pasión", cat: "Romance / Drama" },
  { title: "Bajo la Misma Estrella", cat: "Romance / Drama" },
  { title: "Los Juegos del Hambre", cat: "Ciencia Ficción / Aventura" },
  { title: "El Planeta de los Simios", cat: "Ciencia Ficción" },
  { title: "El Marciano", cat: "Ciencia Ficción" },
  { title: "Ciudad de Dios", cat: "Drama / Crimen" },
  { title: "El Secreto de sus Ojos", cat: "Drama / Suspenso" },
  { title: "La Vendedora de Rosas", cat: "Drama / Colombia" },
  { title: "Los Colores de la Montaña", cat: "Drama / Colombia" },
  { title: "El Abrazo de la Serpiente", cat: "Drama / Colombia" },
  { title: "Perro Come Perro", cat: "Drama / Crimen / Colombia" },
  { title: "Los Increíbles", cat: "Animación / Superhéroes" },
  { title: "Minions", cat: "Animación / Comedia" },
  { title: "Intensamente", cat: "Animación / Familiar" },
  { title: "El Rey León", cat: "Animación / Drama" },
  { title: "Super Mario Bros", cat: "Animación / Aventura" },
  { title: "Coco", cat: "Animación / Familiar" },
  { title: "La Vida Secreta de tus Mascotas", cat: "Animación / Comedia" },
  { title: "El Último Samurai", cat: "Acción / Histórico" },

  // Acción / Aventura
  { title: "Furia en el Camino", cat: "Acción / Ciencia Ficción" },
  { title: "En Busca del Arca Perdida", cat: "Acción / Aventura" },
  { title: "El Señor de los Anillos: La Comunidad del Anillo", cat: "Fantasía / Aventura" },
  { title: "Piratas del Caribe: La Maldición del Perla Negra", cat: "Acción / Aventura / Fantasía" },
  { title: "Misión Imposible", cat: "Acción / Espionaje" },
  { title: "Duro de Matar", cat: "Acción / Thriller" },
  { title: "El Puente de los Espías", cat: "Thriller / Histórico" },
  { title: "Troya", cat: "Acción / Histórico" },
  { title: "300", cat: "Acción / Histórico" },
  { title: "Corazón Valiente", cat: "Acción / Histórico / Drama" },
  { title: "El Patriota", cat: "Acción / Histórico / Drama" },
  { title: "Rescatando al Soldado Ryan", cat: "Acción / Bélico / Drama" },
  { title: "La Delgada Línea Roja", cat: "Bélico / Drama" },
  { title: "El Francotirador Americano", cat: "Acción / Bélico / Drama" },

  // Ciencia Ficción
  { title: "Matrix", cat: "Ciencia Ficción / Acción" },
  { title: "Interestelar", cat: "Ciencia Ficción / Drama" },
  { title: "Cazador de Androides 2049", cat: "Ciencia Ficción / Thriller" },
  { title: "Duna", cat: "Ciencia Ficción / Aventura" },
  { title: "Gravedad", cat: "Ciencia Ficción / Drama" },
  { title: "La Llegada", cat: "Ciencia Ficción / Drama" },
  { title: "Informe Minoritario", cat: "Ciencia Ficción / Thriller" },
  { title: "El Origen", cat: "Ciencia Ficción / Thriller" },
  { title: "El Quinto Elemento", cat: "Ciencia Ficción / Acción" },
  { title: "Señales", cat: "Ciencia Ficción / Terror" },
  { title: "La Guerra de los Mundos", cat: "Ciencia Ficción / Acción" },
  { title: "Yo, Robot", cat: "Ciencia Ficción / Acción" },

  // Terror / Suspenso
  { title: "Eso: Capítulo 1", cat: "Terror" },
  { title: "Huye", cat: "Terror / Thriller" },
  { title: "El Resplandor", cat: "Terror / Psicológico" },
  { title: "Actividad Paranormal", cat: "Terror" },
  { title: "Un Lugar en Silencio", cat: "Terror / Suspenso" },
  { title: "Aniquilación", cat: "Terror / Ciencia Ficción" },
  { title: "El Orfanato", cat: "Terror / Drama" },
  { title: "Los Otros", cat: "Terror / Suspenso" },
  { title: "El Sexto Sentido", cat: "Terror / Suspenso" },
  { title: "La Profecía", cat: "Terror" },
  { title: "Pesadilla en Elm Street", cat: "Terror" },
  { title: "Viernes 13", cat: "Terror" },
  { title: "La Noche de Halloween", cat: "Terror" },
  { title: "Sé lo que Hicisteis el Último Verano", cat: "Terror / Suspenso" },
  { title: "La Celda", cat: "Terror / Thriller" },
  { title: "El Juego del Miedo", cat: "Terror / Thriller" },

  // Drama
  { title: "El Padrino", cat: "Drama / Crimen" },
  { title: "La Lista de Schindler", cat: "Drama / Histórico" },
  { title: "Belleza Americana", cat: "Drama" },
  { title: "Luz de Luna", cat: "Drama" },
  { title: "12 Años de Esclavitud", cat: "Drama / Histórico" },
  { title: "Hacia Rutas Salvajes", cat: "Drama / Aventura" },
  { title: "El Club de los Poetas Muertos", cat: "Drama" },
  { title: "Con los Ojos Bien Abiertos", cat: "Drama / Psicológico" },
  { title: "Mil Soles Espléndidos", cat: "Drama / Histórico" },
  { title: "El Curioso Caso de Benjamin Button", cat: "Drama / Romance" },
  { title: "Las Horas", cat: "Drama" },
  { title: "21 Gramos", cat: "Drama / Suspenso" },
  { title: "Amores Perros", cat: "Drama / Crimen" },
  { title: "El Árbol de la Vida", cat: "Drama" },
  { title: "El Gran Hotel Budapest", cat: "Drama / Comedia" },
  { title: "El Luchador", cat: "Drama / Deportes" },
  { title: "Cuando éramos Reyes", cat: "Documental / Deportes" },
  { title: "Corredor de Fondo", cat: "Drama / Deportes" },

  // Comedia
  { title: "Super Malos", cat: "Comedia" },
  { title: "La Resaca", cat: "Comedia" },
  { title: "Loco por Mary", cat: "Comedia Romántica" },
  { title: "El Diablo Viste a la Moda", cat: "Comedia / Drama" },
  { title: "Algo para Recordar", cat: "Comedia Romántica" },
  { title: "Papá por Siempre", cat: "Comedia / Familiar" },
  { title: "Mentiroso Mentiroso", cat: "Comedia" },
  { title: "La Máscara", cat: "Comedia / Fantasía" },
  { title: "Mi Pobre Angelito", cat: "Comedia / Familiar" },
  { title: "Los Cazafantasmas", cat: "Comedia / Fantasía" },
  { title: "Una Mente Brillante", cat: "Drama / Biográfico" },
  { title: "El Náufrago", cat: "Drama / Aventura" },
  { title: "Casi Famosos", cat: "Drama / Comedia / Música" },
  { title: "Alta Fidelidad", cat: "Comedia / Romance / Música" },

  // Musical
  { title: "Mamma Mia", cat: "Musical / Comedia Romántica" },
  { title: "El Rey del Rock", cat: "Musical / Biográfico / Drama" },
  { title: "Calle 54", cat: "Documental / Musical" },

  // Animación adicional
  { title: "Encanto", cat: "Animación / Familiar / Colombia" },
  { title: "Arriba o Up", cat: "Animación / Aventura / Drama" },
  { title: "Buscando a Nemo", cat: "Animación / Aventura / Familiar" },
  { title: "Zootopia", cat: "Animación / Aventura / Comedia" },
  { title: "Kung Fu Panda", cat: "Animación / Acción / Comedia" },
  { title: "Cómo Entrenar a tu Dragón", cat: "Animación / Aventura / Familiar" },
  { title: "La Bella y la Bestia", cat: "Animación / Musical / Romance" },

  // Superhéroes
  { title: "El Hombre Araña: Un Nuevo Universo", cat: "Animación / Superhéroes / Acción" },
  { title: "Guardianes de la Galaxia", cat: "Acción / Superhéroes / Comedia" },
  { title: "Pantera Negra", cat: "Acción / Superhéroes / Drama" },

  // Colombianas
  { title: "La Estrategia del Caracol", cat: "Comedia / Drama / Colombia" },
  { title: "La Gente de la Universal", cat: "Crimen / Drama / Colombia" },
  { title: "La Primera Noche", cat: "Drama / Colombia" },
  { title: "Soñar no Cuesta Nada", cat: "Drama / Comedia / Colombia" },
  { title: "El Señor de los Cielos", cat: "Drama / Crimen / Colombia" },
  { title: "Águilas no Cazan Moscas", cat: "Drama / Colombia" },
  { title: "El Paseo", cat: "Comedia / Familiar / Colombia" },
  { title: "La Barra", cat: "Drama / Deportes / Colombia" },
  { title: "Los Viajes del Viento", cat: "Drama / Musical / Colombia" },
  { title: "Tierra en la Lengua", cat: "Drama / Colombia" },
  { title: "Los Hongos", cat: "Drama / Colombia" },
  { title: "Ruido Rosa", cat: "Drama / Colombia" },
  { title: "La Defensa del Dragón", cat: "Drama / Fantasia / Colombia" },
  { title: "Pequeñas Voces", cat: "Animación / Drama / Colombia" },
  { title: "Ana de Nadie", cat: "Drama / Romance / Colombia" },
  { title: "La Toma", cat: "Documental / Colombia" },
  { title: "El Vuelco del Cangrejo", cat: "Drama / Colombia" },
  { title: "Manos Sucias", cat: "Drama / Crimen / Colombia" },
  { title: "Gente de Bien", cat: "Drama / Colombia" },
  { title: "El Problema del Mal", cat: "Drama / Suspenso / Colombia" },
];

let available = [...movies];
let scores = { 1: 0, 2: 0 };
let currentTeam = 1;
let timerInterval;
let timeLeft = 120;

function spin() {
    if (available.length === 0) {
        alert("¡Lista vacía! Reiniciando...");
        available = [...movies];
    }
    // Asegurar que la peli principal esté oculta al girar
    document.getElementById('movie-name').classList.remove('visible');
    resetTimer();

    const idx = Math.floor(Math.random() * available.length);
    const movie = available.splice(idx, 1)[0];

    document.getElementById('movie-name').innerText = movie.title;
    document.getElementById('category-display').innerText = (movie.cat || "Sin Categoría").toUpperCase();
}

function toggleVisibility() {
    document.getElementById('movie-name').classList.toggle('visible');
}

// Nueva función para pantalla completa
function toggleFsMovie() {
    const movieDisplay = document.getElementById('fs-movie');
    const toggleBtn = document.querySelector('.btn-fs-toggle');

    movieDisplay.classList.toggle('hidden');

    if (movieDisplay.classList.contains('hidden')) {
        toggleBtn.innerText = "👁️ REVELAR PELÍCULA";
    } else {
        toggleBtn.innerText = "🙈 OCULTAR";
    }
}

function startTimer() {
    // Importante: Desbloquear el audio en móviles por interacción del usuario
    if (SoundEngine.ctx.state === 'suspended') SoundEngine.ctx.resume();

    clearInterval(timerInterval);
    document.getElementById('start-btn').disabled = true;
    document.getElementById('start-btn').style.opacity = "0.5";

    const overlay = document.getElementById('fullscreen-overlay');
    overlay.classList.remove('hidden');
    document.getElementById('fs-movie').innerText = document.getElementById('movie-name').innerText;
    document.getElementById('fs-movie').classList.add('hidden');

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        // Lógica de Sonido Tic-Tac
        if (timeLeft > 20) {
            SoundEngine.playTic(); // Tic normal cada segundo
        } else if (timeLeft <= 20 && timeLeft > 0) {
            // Aceleramos el Tic-Tac (doble sonido)
            SoundEngine.playTic();
            setTimeout(() => SoundEngine.playTic(), 500);
        }

        if (timeLeft <= 15) {
            document.getElementById('timer').style.color = "#ff4444";
            document.getElementById('fs-timer').style.color = "#ff4444";
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            SoundEngine.playAlarm(); // Sonido de Alarma
            closeFullscreen();
            alert("¡TIEMPO AGOTADO!");
            nextTurn();
        }
    }, 1000);
}

function stopTimerEarly() {
    clearInterval(timerInterval);
    closeFullscreen();
}

function closeFullscreen() {
    document.getElementById('fullscreen-overlay').classList.add('hidden');
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 120;
    updateTimerDisplay();
    document.getElementById('timer').style.color = "var(--accent)";
    document.getElementById('fs-timer').style.color = "var(--accent)";
    document.getElementById('start-btn').disabled = false;
    document.getElementById('start-btn').style.opacity = "1";
}

function updateTimerDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    let timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.getElementById('timer').innerText = timeString;
    document.getElementById('fs-timer').innerText = timeString;
}


function addPoint(team) {
    // 1. Sonido de victoria
    SoundEngine.playDing();

    // 2. LANZAR CONFETI
    const colors = team === 1 ? ['#3498db', '#ffffff'] : ['#f1c40f', '#ffffff'];

     confetti({
        particleCount: 600,
        spread: 70,
        origin: { x: 0, y: 1 },
        colors: colors,
        zIndex: 2000 
    });
   
    confetti({
        particleCount: 300,
        spread: 70,
        origin: { x: 0.5, y: 0.6 },
        colors: colors,
        zIndex: 2000 
    });

    confetti({
        particleCount: 600,
        spread: 70,
        origin: { x: 1, y: 1 },
        colors: colors,
        zIndex: 2000 
    });

    // 3. Sumar el punto y cambiar de turno
    scores[team]++;
    document.getElementById(`s${team}`).innerText = scores[team];

    // Retrasamos un poco el cambio de turno para que vean el confeti
    setTimeout(() => {
        nextTurn();
    }, 500);
}

function nextTurn() {
    currentTeam = currentTeam === 1 ? 2 : 1;

    const nameDisplay = document.getElementById('team-name');
    const header = document.getElementById('header-bar');

    nameDisplay.innerText = `EQUIPO ${currentTeam}`;
    nameDisplay.className = `t${currentTeam}-text`;
    header.className = `header t${currentTeam}`;

    document.getElementById('box-1').classList.toggle('active', currentTeam === 1);
    document.getElementById('box-2').classList.toggle('active', currentTeam === 2);

    resetTimer();
    document.getElementById('movie-name').classList.remove('visible');
    document.getElementById('movie-name').innerText = "PELÍCULA";
    document.getElementById('category-display').innerText = "CATEGORÍA";
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log(err));
    });
}


