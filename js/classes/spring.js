class Spring {
    constructor(x,y,len){
        this.pivot = new Vector(x,y)
        this.end = new Vector(x,(y+len))
        this.length = len
        this.k = 5000
        this.changeLength = 0
        this.gravity = 0.05

        this.attachedMass = 0
        this.attachedObject = null

        this.damping = 1
        this.time = 0
        
    }
    showPivot() {
        c.beginPath();
        c.arc(this.pivot.x, this.pivot.y, 3, 0, 2 * Math.PI);
        c.fillStyle = "black";
        c.fill();


        c.beginPath();
        c.arc(this.end.x, this.end.y, 4, 0, 2 * Math.PI);
        c.fillStyle = "black";
        c.fill();
    }
    hook(obj){
        this.end.x = obj.position.x 
        this.end.y = obj.position.y  

        this.attachedMass = obj.mass
        this.attachedObject = obj

        this.dir = this.pivot.sub(this.end)
        let forceMag = this.k*(this.dir.mag() - this.length)
    
        this.attachedObject.applyForce(this.dir.unit().mult(forceMag/100000))

    }
    forceGenerated(x){
        return this.k*x
    }
    lengthRequired(x){
        return x/this.k
    }
    draw(){

        let deltatime = 1/120
        this.time += deltatime
        // F/k =x
        

        c.beginPath()
        c.moveTo(this.pivot.x, this.pivot.y)
        // this.end = new Vector(this.pivot.x, this.pivot.y +this.length + this.changeLength)
        c.lineTo(this.end.x, this.end.y)
        c.stroke()

    
        this.showPivot()
    }


    update(){
  
        this.draw()
        
    }
}