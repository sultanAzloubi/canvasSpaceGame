// Canvas setup
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Game info
function drawGameInfo() {
    context.beginPath();
    context.font = "25px Georgia";
    context.fillStyle='red';
    context.fillText(`Score: ${score}`, 50, 50);

    backgroundMusic.play();
    backgroundMusic.volume = 0.025
}

//backgroundMusic.play();

// Game local variables setup
const backgroundMusic = new Audio();
backgroundMusic.src = './background.mp3'

let score = 0;
const player = new Player(canvas.width / 2, canvas.height - 125, 100, 100, 'blue');
const projectiles = [];
const defensiveBlocks = [];
const enemies = [];
let animationId;

// Player setup
document.addEventListener('keydown', e => {
    if(e.key === 'ArrowRight') {
        player.isMovingRight = true;
    }
    if(e.key === 'ArrowLeft') {
        player.isMovingLeft = true;
    }
});

document.addEventListener('keyup', e => {
    if(e.key === 'ArrowRight') {
        player.isMovingRight = false;   
    }
    if(e.key === 'ArrowLeft') {
        player.isMovingLeft = false;
    }
});

function deSpawnPlayer() {
    enemies.forEach(enemy => {
        if (collision(player, enemy)) {
                cancelAnimationFrame(animationId);

                alert('you lost!');
                alert = [];
                location.reload();
        }
    }); 
}

// Projectiles setup
document.addEventListener('keydown', e => {
    if(e.keyCode === 13 || e.keyCode === 32) {
        projectiles.push(new Projectile( (player.x + player.width / 2) - 2, (player.y - 30) , 4, 30, 'red'));
    }
});

function deSpawnProjectiles() {
    projectiles.forEach((projectile, index) => {
        defensiveBlocks.forEach(defensiveBlock => {
            if(collision(projectile, defensiveBlock)) {
                setTimeout(() => {
                    projectiles.splice(index, 1);
                }, 0);
            } 
        });

        // if projectile didn't hit any object 
        if(projectile.y <=  0) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        }
    });
}

// Defensive blocks setup
function spawnBlocks() {
    let xFix = Math.round(Math.random() * ((canvas.width - 120) - (0 + 60)) + (0 + 60) );
    let yFix = Math.round(Math.random() * (375 - 275) + 275);
    defensiveBlocks.push(new Barrier(xFix, yFix, 150, 50, 'white'));

    let x = xFix < 500 ? Math.round(Math.random() * ((canvas.width - 120) - 700) + 700 ) 
                       : Math.round(Math.random() * (380 - 120) +  120); 
    let y = Math.round(Math.random() * (375 - 275) + 275);
    defensiveBlocks.push(new Barrier(x, y, 150, 50, 'white'));
}

// Enemies setup
function spawnEnemies() {
    setInterval(() => {
        enemies.push(new Enemy());
    }, 250);
}

function deSpawnEnemies() {
    enemies.forEach((enemy, index) => {
        defensiveBlocks.forEach(defensiveBlock => {
            if (collision(enemy, defensiveBlock)) {
                setTimeout(() => {
                    enemies.splice(index, 1);
                }, 0);
            }
        });

        projectiles.forEach((projectile, i) => {
            if (collision(enemy, projectile)) {
                    setTimeout(() => {
                        enemies.splice(index, 1);
                        projectiles.splice(i, 1);
                    }, 0);
                    score++;
            }
        });

        // if enemy object made it to bottom of screen.
        if(enemy.y + enemy.height  >= canvas.height) {
            setTimeout(() => {
                enemies.splice(index, 1);
            }, 0);
        }
    });
}

// Boss setup


// Drawing the game 
function animate() {
    animationId = requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawGameInfo();

    player.draw();
    deSpawnPlayer();

    projectiles.forEach(projectile => {
        projectile.update();
    });
    deSpawnProjectiles();
    
    enemies.forEach(enemy => {
        enemy.update();
    });
    deSpawnEnemies();

    defensiveBlocks.forEach(defensiveBlock => {
        defensiveBlock.update();
    })
}

spawnBlocks();
spawnEnemies();
animate();

function collision(firstObject, secondObject) {
    if(firstObject.x < secondObject.x + secondObject.width &&
        firstObject.x + firstObject.width > secondObject.x &&
        firstObject.y < secondObject.y + secondObject.height &&
        firstObject.y + firstObject.height > secondObject.y) {
            return true;
        }

    return false;
}