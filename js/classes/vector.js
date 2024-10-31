
class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y)
    }
    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y)
    }
    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }
    mult(n) {
        return new Vector(n * this.x, n * this.y)
    }
    unit(){
        let v = new Vector(this.x, this.y)
        let mag = this.mag()
        if(mag != 0){
        v = v.mult(1/(mag))

        }

        return v
    }
    draw(start_x, start_y, n, color) {
        c.beginPath()
        c.moveTo(start_x, start_y)
        c.lineTo(start_x + this.x * n, start_y + this.y * n)
        c.strokeStyle = color
        c.stroke()
    }
}
