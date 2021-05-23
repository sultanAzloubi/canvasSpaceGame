class Barrier {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
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
    }
}