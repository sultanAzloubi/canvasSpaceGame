class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.velocity = 8;
        this.isMovingRight = false;
        this.isMovingLeft = false;
    }

    draw() {
        if(player.isMovingRight && player.x + player.width < innerWidth) {
            player.x += player.velocity;
        }
        if(player.isMovingLeft && player.x > 0) {
            player.x -= player.velocity;
        }

        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height); 
    }
}