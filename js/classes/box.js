class Box{
    constructor(posx, posy, width, height){
        this.com = new Vector(posx, posy)
        this.width = width
        this.height = height
        this.top = new Wall(this.com.x - width/2 , this.com.y - height/2 , this.com.x + width/2 , this.com.y - height/2 , 0 )
        this.bottom = new Wall(this.com.x - width/2 , this.com.y + height/2 , this.com.x + width/2 , this.com.y + height/2 , 0 )
        this.left = new Wall(this.com.x - width/2 , this.com.y - height/2 , this.com.x - width/2 , this.com.y + height/2 , 0 )
        this.right = new Wall(this.com.x + width/2 , this.com.y - height/2 , this.com.x + width/2 , this.com.y + height/2 , 0 )

        this.omega = 0
    }
    draw(){

        this.top.pivot = this.com
        this.bottom.pivot = this.com
        this.left.pivot = this.com
        this.right.pivot = this.com

        this.top.omega = this.omega
        this.bottom.omega = this.omega
        this.left.omega = this.omega
        this.right.omega = this.omega
        
       walls.push(this.top, this.bottom, this.left, this.right)
    }
    update(){

        // this.draw()
    }
}