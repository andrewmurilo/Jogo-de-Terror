const player = document.getElementById('player');
const ghost = document.getElementById('ghost');
const gameOverDiv = document.getElementById('game-over');

let playerPos = { x: 380, y: 280 };
let ghostPos = { x: 100, y: 100 };

let speed = 10;       // velocidade do jogador
let ghostSpeed = 5;   // velocidade do inimigo
let visionRange = 200; // alcance de visão do inimigo

document.addEventListener('keydown', movePlayer);

function movePlayer(e) {
    switch (e.key.toLowerCase()) {
        case 'w':
            if (playerPos.y > 0) playerPos.y -= speed;
            break;
        case 's':
            if (playerPos.y < 560) playerPos.y += speed;
            break;
        case 'a':
            if (playerPos.x > 0) playerPos.x -= speed;
            break;
        case 'd':
            if (playerPos.x < 760) playerPos.x += speed;
            break;
    }
    updatePlayer();
    checkCollision();
}

function updatePlayer() {
    player.style.top = playerPos.y + 'px';
    player.style.left = playerPos.x + 'px';
}

// Função do inimigo com perseguição baseada em visão
function moveGhost() {
    const distX = playerPos.x - ghostPos.x;
    const distY = playerPos.y - ghostPos.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < visionRange) {
        // Persegue o jogador
        if (distX > 0 && ghostPos.x < 760) ghostPos.x += ghostSpeed;
        if (distX < 0 && ghostPos.x > 0) ghostPos.x -= ghostSpeed;
        if (distY > 0 && ghostPos.y < 560) ghostPos.y += ghostSpeed;
        if (distY < 0 && ghostPos.y > 0) ghostPos.y -= ghostSpeed;
    } else {
        // Movimento aleatório
        let direction = Math.floor(Math.random() * 4);
        switch(direction) {
            case 0: if(ghostPos.y > 0) ghostPos.y -= ghostSpeed; break;
            case 1: if(ghostPos.y < 560) ghostPos.y += ghostSpeed; break;
            case 2: if(ghostPos.x > 0) ghostPos.x -= ghostSpeed; break;
            case 3: if(ghostPos.x < 760) ghostPos.x += ghostSpeed; break;
        }
    }

    ghost.style.top = ghostPos.y + 'px';
    ghost.style.left = ghostPos.x + 'px';
    checkCollision();
}

// Verifica colisão jogador x inimigo
function checkCollision() {
    const distX = Math.abs(playerPos.x - ghostPos.x);
    const distY = Math.abs(playerPos.y - ghostPos.y);
    if(distX < 40 && distY < 40) {
        gameOver();
    }
}

// Tela Game Over
function gameOver() {
    gameOverDiv.style.display = 'block';
    clearInterval(ghostInterval);
}

// Reiniciar jogo
function restartGame() {
    playerPos = { x: 380, y: 280 };
    ghostPos = { x: 100, y: 100 };
    updatePlayer();
    ghost.style.top = ghostPos.y + 'px';
    ghost.style.left = ghostPos.x + 'px';
    gameOverDiv.style.display = 'none';
    ghostInterval = setInterval(moveGhost, 200);
}

// Inicializa movimento do fantasma
let ghostInterval = setInterval(moveGhost, 200);
