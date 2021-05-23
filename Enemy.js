const enemyIcon = new Image();
enemyIcon.src = './enemy.png';

class Enemy {
    constructor() {
        this.x = Math.round(Math.random() * ((canvas.width - 50) - (0 + 50)) + (0 + 50));
        this.y = -15;
        this.width = 50;
        this.height = 50;
        this.color = 'cyan';
        this.velocity = Math.round(Math.random() * (7 - 2) + 2);
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(enemyIcon, this.x, this.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.y += this.velocity;
    }
}