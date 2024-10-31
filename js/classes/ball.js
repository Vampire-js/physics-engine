class Ball {
    constructor(x, y, r) {

        this.gravity = 0.05

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

        this.velocity.draw(this.position.x, this.position.y, 40, "green")
        this.acc.draw(this.position.x, this.position.y, 40, "red")
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

    collideWall(other){
       let v = other.start.sub(this.position)
       let normal = other.dir.normal().unit()
       let d = v.dot(normal)

       if(d <= this.r + this.velocity.dot(normal)){
        let p = this.velocity.dot(normal) * 2 / (this.mass)
            
        this.velocity = this.velocity.sub(normal.mult(p * this.mass)).mult(0.5)

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
        this.draw()



        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        this.velocity.x += this.acc.x
        this.velocity.y += this.acc.y

        this.acc.y = this.gravity

        if(this.randomMotion){
            this.startRandomMotion()
        }else{
            if(this.player){
                this.move()

            }
            
        }

      

    }

}