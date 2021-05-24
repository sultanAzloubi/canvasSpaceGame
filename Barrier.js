const wallBarrier = new Image();
wallBarrier.src = './wall.jpg';

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
        context.fillStyle = this.color;
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(wallBarrier, this.x, this.y, this.width, this.height);
    }

    update() {
        this.draw();
    }
}