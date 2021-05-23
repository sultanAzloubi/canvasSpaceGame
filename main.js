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
}

// Game local variables setup
let score = 0;
const player = new Player(canvas.width / 2, canvas.height - 100, 75, 75, 'blue');
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
                setTimeout(() => {
                    location.reload();
                }, 3000);
        }
    }); 
}

// Projectiles setup
document.addEventListener('keydown', e => {
    if(e.keyCode === 13 || e.keyCode === 32) {
        projectiles.push(new Projectile( (player.x + player.width / 2) - 4, (player.y - 30) , 8, 30, 'red'));
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
    let x = Math.round(Math.random() * ((canvas.width - 120) - (0 + 60)) + (0 + 60) );
    let y = Math.round(Math.random() * (375 - 300) + 300);
    const firstBlock = new Barrier(x, y, 150, 50, 'white');
    defensiveBlocks.push(firstBlock);

    const tmp = null;
    for (let i = 0; i < 1; i++) {
        x = Math.round(Math.random() * ((canvas.width - 120) - (0 + 60)) + (0 + 60) );
        y = Math.round(Math.random() * (375 - 300) + 300);
        let tmp = new Barrier(x, y, 150, 50, 'white');

        if(!collision(firstBlock, tmp)) {
            if(firstBlock.x < tmp.x + tmp.width &&
               firstBlock.x + firstBlock.width > tmp.x) {
                tmp = null;
                i = -1;
                continue
            }

            defensiveBlocks.push(tmp);
        }
        else {
            tmp = null;
            i = -1;
            continue
        }
    }
}

// Enemies setup
function spawnEnemies() {
    setInterval(() => {
        enemies.push(new Enemy());
    }, 500);
}

function deSpawnEnemies() {
    enemies.forEach((enemy, index) => {
        defensiveBlocks.forEach(defensiveBlock => {
            if (collision(enemy, defensiveBlock)) {
                enemies.splice(index, 1);
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