const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 50;
const cols = canvas.width / cellSize;
const rows = canvas.height / cellSize;

let player = { x: 0, y: 0 };  // Joueur au début
const exit = { x: cols - 1, y: rows - 1 };  // Sortie

// Labyrinthe (1 = mur, 0 = passage)
const maze = [
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0]
];

// Fonction pour afficher un message
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const startButton = document.getElementById('start-button');

function showMessage(message, callback) {
    messageText.textContent = message;
    messageBox.style.display = 'block';
    startButton.onclick = () => {
        messageBox.style.display = 'none';
        if (callback) callback();
    };
}

// Dessiner le labyrinthe
function drawMaze() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * cellSize;
            const y = row * cellSize;
            ctx.fillStyle = maze[row][col] === 1 ? '#2d3436' : '#dfe6e9';
            ctx.fillRect(x, y, cellSize, cellSize);
        }
    }
    // Sortie stylée
    ctx.fillStyle = '#00cec9';
    ctx.fillRect(exit.x * cellSize, exit.y * cellSize, cellSize, cellSize);
}

// Joueur
function drawPlayer() {
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.arc((player.x + 0.5) * cellSize, (player.y + 0.5) * cellSize, cellSize / 3, 0, 2 * Math.PI);
    ctx.fill();
}

// Déplacement du joueur
function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
        if (player.x === exit.x && player.y === exit.y) {
            showMessage("Bravo tu as gagné ! Je t'invite à boire un verre avec moi, PARTANTE ?", resetGame);
        }
    }
    updateCanvas();
}

// Réinitialiser le jeu
function resetGame() {
    player = { x: 0, y: 0 };
    updateCanvas();
}

// Mettre à jour le canvas
function updateCanvas() {
    drawMaze();
    drawPlayer();
}

// Gérer les touches du clavier
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

// Affiche le premier message au début du jeu
showMessage("Trouve la sortie pour avoir une surprise", null);

// Initialisation
updateCanvas();
