class Ball {
    constructor(x, y, r) {

        this.gravity = 0.01

        this.position = new Vector(x, y)
        this.r = r
        this.velocity = new Vector(0, 0)
        this.acc = new Vector(0, 0)
        this.color = "transparent"
        this.stroke = "black"
        this.player = false
        this.damping = .8
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
        c.strokeStyle = this.stroke
        c.stroke()
        c.fillStyle = this.color
        c.fill()

        // this.velocity.draw(this.position.x, this.position.y, 40, "red")
    }
    startRandomMotion(){
        this.velocity.x = Math.random()*[-1,1][Math.round(Math.random())]
        this.velocity.y = Math.random()*[-1,1][Math.round(Math.random())]
    }
    
    intersects(other) {
        let d = this.position.sub(other.position).mag();
        let minDist = this.r + other.r;
    
        if (d < minDist) {
            let n = this.position.sub(other.position).unit();
    
            let overlap = (minDist - d) / 2;
            this.position = this.position.add(n.mult(overlap));
            other.position = other.position.sub(n.mult(overlap));
    
            let relativeVelocity = this.velocity.sub(other.velocity);
            let velocityAlongNormal = relativeVelocity.dot(n);
    
            if (velocityAlongNormal < 0) {
                let impulse = (2 * velocityAlongNormal) / (this.mass + other.mass);
    
                if(!this.player){
                    this.velocity = this.velocity.sub(n.mult(impulse * other.mass));

                }
                other.velocity = other.velocity.add(n.mult(impulse * this.mass));
            }
        }
    }
    

    collideWall(wall) {

        let wallVector = wall.end.sub(wall.start);
        let ballToWallStart = this.position.sub(wall.start);
    
        let projectionLength = ballToWallStart.dot(wallVector.unit());
        let wallLength = wallVector.mag();

        if (projectionLength >= 0 && projectionLength <= wallLength) {
            let closestPoint = wall.start.add(wallVector.unit().mult(projectionLength));
    
            let ballToClosestPoint = this.position.sub(closestPoint);
            let distanceToWall = ballToClosestPoint.mag();
    
            
            if (distanceToWall <= this.r + wall.omega*wall.start.sub(wall.end).mag()) {
                let collisionNormal = ballToClosestPoint.unit();
                this.position.add(wall.getNormals().unit().mult( this.r - distanceToWall))
                this.position = closestPoint.add(collisionNormal.mult(this.r));
                this.velocity = this.velocity.sub(collisionNormal.mult(2 * this.velocity.dot(collisionNormal))).add(collisionNormal.mult(closestPoint.sub(wall.start).mag()*wall.omega)).mult(this.damping) // Damping factor
            }

            
        }
    }
    
    applyForce(f){
        let currForce = this.acc.mult(this.mass)
        let resultant = currForce.add(f)

        this.acc = new Vector(resultant.x/this.mass , resultant.y/this.mass).mult(1/120)

        
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
    
        for (let wall of walls) {
            this.collideWall(wall);
        }
    
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    
        this.velocity.x += this.acc.x;
        this.velocity.y += this.acc.y;
    
        this.acc.y = this.gravity;
    
        if (this.randomMotion) {
            this.startRandomMotion();
        } else if (this.player) {
            this.move();
        }
    }
    
    
}
