class Ball {
    constructor(x, y, r) {

        this.gravity = 0.01

        this.position = new Vector(x, y)
        this.r = r
        this.velocity = new Vector(0, 0)
        this.acc = new Vector(0, 0)
        this.color = "transparent"
        this.player = false
        this.randomMotion = false
        this.hightlight = false
        this.mass = 1
        this.keys = {
            w:false,
            a:false,
            s:false,
            d:false,
        }
        balls.push(this)
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI)
        c.strokeStyle = "black"
        c.stroke()
        c.fillStyle = this.color
        c.fill()

        this.velocity.draw(this.position.x, this.position.y, 40, "red")
    }
    startRandomMotion(){
        this.velocity.x = Math.random()*[-1,1][Math.round(Math.random())]
        this.velocity.y = Math.random()*[-1,1][Math.round(Math.random())]
    }
    intersects(other){
        let d = this.position.sub(other.position).mag()
        
        //Collision Resolution
        
        if(d  <= -this.velocity.sub(other.velocity).dot(this.position.sub(other.position))*(1/d)+this.r + other.r){
            let n = this.position.sub(other.position).unit()

            let p = this.velocity.sub(other.velocity).dot(n) * 2 / (this.mass + other.mass)
            console.log(this.velocity)
            
            this.velocity = this.velocity.sub(n.mult(p * this.mass))
            other.velocity = other.velocity.add(n.mult(p * other.mass))


          }

    }

    collideWall(wall) {
        // Define the wall segment as a vector
        let wallVector = wall.end.sub(wall.start);
        let ballToWallStart = this.position.sub(wall.start);
    
        // Project the ball’s position onto the wall segment
        let projectionLength = ballToWallStart.dot(wallVector.unit());
        let wallLength = wallVector.mag();
    
        // Check if the projection is within the bounds of the wall segment
        if (projectionLength >= 0 && projectionLength <= wallLength) {
            // Find the closest point on the wall to the ball
            let closestPoint = wall.start.add(wallVector.unit().mult(projectionLength));
    
            // Calculate the vector from the ball to this closest point
            let ballToClosestPoint = this.position.sub(closestPoint);
            let distanceToWall = ballToClosestPoint.mag();
    
            // Check if the ball is within collision range
            if (distanceToWall <= this.r) {
                // Resolve the collision by moving the ball out and inverting velocity along the normal
                let collisionNormal = ballToClosestPoint.unit();
                this.position = closestPoint.add(collisionNormal.mult(this.r));
                this.velocity = this.velocity.sub(collisionNormal.mult(2 * this.velocity.dot(collisionNormal))).add(collisionNormal.mult(closestPoint.sub(wall.start).mag()*wall.omega)).mult(.8) // Damping factor
            }
        }
    }
    
    
    setColor(color){
        this.color = color
    }


    keyControls() {
       
            canvas.onkeydown = (key) => {
                if(this.keys.hasOwnProperty(key.key)){
                    this.keys[key.key] = true
                }
            }


            canvas.onkeyup = (key) => {
                if(this.keys.hasOwnProperty(key.key) ){
                    this.keys[key.key] = false
                }
            }
    }

    move(){
        this.keyControls()

        if(this.keys.w == true){
            this.velocity.y = -1
        }else if(this.keys.a == true){
            this.velocity.x = -1
        }else if(this.keys.s == true){
            this.velocity.y = 1
        }else if(this.keys.d == true){
            this.velocity.x = 1
        }else{
            this.velocity.x = 0
            this.velocity.y = 0
        }
    }

    update() {
        this.draw();
    
        // Check and resolve collisions with all walls before updating position
        for (let wall of walls) {
            this.collideWall(wall);
        }
    
        // Apply position updates based on velocity
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    
        // Update velocity with acceleration
        this.velocity.x += this.acc.x;
        this.velocity.y += this.acc.y;
    
        // Gravity on the y-axis
        this.acc.y = this.gravity;
    
        if (this.randomMotion) {
            this.startRandomMotion();
        } else if (this.player) {
            this.move();
        }
    }
    
    
}