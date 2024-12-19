
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
    normal(){
        return new Vector(-this.y, this.x)
    }
    unit(){
        let v = new Vector(this.x, this.y)
        let mag = this.mag()
        if(mag != 0){
        v = v.mult(1/(mag))

        }

        return v
    }
    set(v){
        this.x = v.x
        this.y = v.y
    }
    dot(v){
        return this.x*v.x + this.y*v.y
    }
    cross(v){
        return this.x * v.y - this.y * v.x
    }
    draw(start_x, start_y, n, color) {
        c.beginPath()
        c.moveTo(start_x, start_y)
        c.lineTo(start_x + this.x * n, start_y + this.y * n)
        c.strokeStyle = color
        c.strokeWidth = 10
        c.stroke()
    }
}
