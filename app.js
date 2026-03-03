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

function startTimer() {
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
    scores[team]++;
    document.getElementById(`s${team}`).innerText = scores[team];
    nextTurn();
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