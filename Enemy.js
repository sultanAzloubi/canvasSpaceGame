const enemyIcon = new Image();
enemyIcon.src = './enemy.png';

class Enemy {
    constructor() {
        this.x = Math.round(Math.random() * ((canvas.width - 50) - (0 + 50)) + (0 + 50));
        this.y = -15;
        this.width = 50;
        this.height = 50;
        this.color = 'cyan';
        this.velocity = score < 20 ? Math.round(Math.random() * (5 - 2) + 2) 
                                   : Math.round(Math.random() * (11 - 7) + 7);
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