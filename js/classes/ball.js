class Ball {
    constructor(x, y, r) {
        this.position = new Vector(x, y)
        this.r = r
        this.velocity = new Vector(0, 0)
        this.acc = new Vector(0, 0)
        this.player = false
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
        c.fillStyle = "red"
        c.fill()

        this.velocity.draw(this.position.x, this.position.y, 40, "green")
        this.acc.draw(this.position.x, this.position.y, 40, "red")
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

        this.move()


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        this.velocity.x += this.acc.x
        this.velocity.y += this.acc.y

    }

}