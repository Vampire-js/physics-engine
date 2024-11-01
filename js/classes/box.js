class Box {
    constructor(posx, posy, width, height) {
        // Setup
        this.com = new Vector(posx, posy);
        this.width = width;
        this.height = height;
        this.rotationAngle = 0; 
        this.omega = 0.01;      
        this.velocity = new Vector(1, 0);
        this.accel = new Vector(0, 0);

        this.gravity = 0.05;

        this.initializeWalls();
    }

    initializeWalls() {
        this.top = new Wall(-this.width / 2, -this.height / 2, this.width / 2, -this.height / 2);
        this.bottom = new Wall(-this.width / 2, this.height / 2, this.width / 2, this.height / 2);
        this.left = new Wall(-this.width / 2, -this.height / 2, -this.width / 2, this.height / 2);
        this.right = new Wall(this.width / 2, -this.height / 2, this.width / 2, this.height / 2);
    }

    draw() {
        this.top.draw();
        this.bottom.draw();
        this.left.draw();
        this.right.draw();
    }

    updateWalls() {
        this.rotationAngle += this.omega;

        let rotationMatrix = new Matrix(2, 2);
        rotationMatrix.data[0][0] = Math.cos(this.rotationAngle);
        rotationMatrix.data[0][1] = -Math.sin(this.rotationAngle);
        rotationMatrix.data[1][0] = Math.sin(this.rotationAngle);
        rotationMatrix.data[1][1] = Math.cos(this.rotationAngle);

        this.top.start = rotationMatrix.multiplyVec(new Vector(-this.width / 2, -this.height / 2)).add(this.com);
        this.top.end = rotationMatrix.multiplyVec(new Vector(this.width / 2, -this.height / 2)).add(this.com);

        this.bottom.start = rotationMatrix.multiplyVec(new Vector(-this.width / 2, this.height / 2)).add(this.com);
        this.bottom.end = rotationMatrix.multiplyVec(new Vector(this.width / 2, this.height / 2)).add(this.com);

        this.left.start = rotationMatrix.multiplyVec(new Vector(-this.width / 2, -this.height / 2)).add(this.com);
        this.left.end = rotationMatrix.multiplyVec(new Vector(-this.width / 2, this.height / 2)).add(this.com);

        this.right.start = rotationMatrix.multiplyVec(new Vector(this.width / 2, -this.height / 2)).add(this.com);
        this.right.end = rotationMatrix.multiplyVec(new Vector(this.width / 2, this.height / 2)).add(this.com);
    }

    update() {
        this.com.x += this.velocity.x;
        this.com.y += this.velocity.y;

        this.velocity.x += this.accel.x;
        this.velocity.y += this.accel.y;
        this.accel.y = this.gravity;

        this.updateWalls();

        this.draw();
    }
}
