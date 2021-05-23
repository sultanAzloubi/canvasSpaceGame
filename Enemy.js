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
        //context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        //context.fill(); 
    }

    update() {
        this.draw();
        this.y += this.velocity;
    }
}