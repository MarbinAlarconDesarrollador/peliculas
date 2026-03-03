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
    { title: "La Vendedora de Rosas (Reto)", cat: "Supervivencia callejera sin perder humanidad" },
    { title: "Los Increíbles", cat: "Animación / Superhéroes" },
    { title: "Minions", cat: "Animación / Comedia" },
    { title: "Toy Story", cat: "Animación / Aventura" },
    { title: "Intensamente", cat: "Animación / Familiar" },
    { title: "El Rey León", cat: "Animación / Drama" },
    { title: "Super Mario Bros", cat: "Animación / Aventura" },
    { title: "Coco", cat: "Animación / Familiar" },
    { title: "La Vida Secreta de tus Mascotas", cat: "Animación / Comedia" },
    { title: "El Último Samurai", cat: "Acción / Histórico" },
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

/*function startTimer() {
    clearInterval(timerInterval);
    document.getElementById('start-btn').disabled = true;
    document.getElementById('start-btn').style.opacity = "0.5";
    
    // 1. Mostrar pantalla completa y COPIAR el nombre de la película
    const overlay = document.getElementById('fullscreen-overlay');
    overlay.classList.remove('hidden');
    document.getElementById('fs-movie').innerText = document.getElementById('movie-name').innerText;
    
    // Asegurar que la peli esté oculta al iniciar en full screen
    document.getElementById('fs-movie').classList.add('hidden');
    document.querySelector('.btn-fs-toggle').innerText = "👁️ REVELAR PELÍCULA";
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 15) {
            document.getElementById('timer').style.color = "#ff4444";
            document.getElementById('fs-timer').style.color = "#ff4444"; 
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            closeFullscreen(); 
            alert("¡TIEMPO AGOTADO!");
            nextTurn();
        }
    }, 1000);
}*/

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

/*
function addPoint(team) {
    scores[team]++;
    document.getElementById(`s${team}`).innerText = scores[team];
    nextTurn();
}
*/

function addPoint(team) {
    // 1. Sonido de victoria
    SoundEngine.playDing();

    // 2. LANZAR CONFETI
    const colors = team === 1 ? ['#3498db', '#ffffff'] : ['#f1c40f', '#ffffff'];

    // Ráfaga desde la izquierda
    // Dentro de tu función addPoint en app.js
    confetti({
        particleCount: 500,
        spread: 70,
        origin: { x: 0, y: 1 },
        colors: colors,
        zIndex: 2000 
    });
   
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { x: 0.5, y: 0.6 },
        colors: colors,
        zIndex: 2000 
    });

    confetti({
        particleCount: 500,
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


