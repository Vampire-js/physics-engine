class Wall{
    constructor(sx, sy, ex, ey , angle = 0){
        this.start = new Vector(sx, sy)
        this.end = new Vector(ex, ey)
        this.angle = 0
        this.pivot = new Vector(sx, sy)
        this.omega = 0

        this.updateAngle(angle)
           }
    updateAngle(a){
        let rotationMatrix = new Matrix(2 , 2)
        rotationMatrix.data[0][0] = Math.cos(a)
        rotationMatrix.data[0][1] = Math.sin(a)
        rotationMatrix.data[1][0] = -Math.sin(a)
        rotationMatrix.data[1][1] = Math.cos(a)
    
         this.end = rotationMatrix.multiplyVec(this.end.sub(this.pivot)).add(this.pivot)

        this.dir = this.start.sub(this.end)

    }
    draw(){
        c.beginPath()
        c.moveTo(this.start.x, this.start.y)
        c.lineTo(this.end.x, this.end.y)
        c.strokeStyle = "black"
        c.stroke()
    
      
    }
    
    update(){
        this.updateAngle(this.omega)

        this.draw()
    }
}