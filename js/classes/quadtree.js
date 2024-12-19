class Rectangle {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h

    }

    contains(point){
        return (point.x > this.x - this.w &&
            point.x < this.x + this.w &&
            point.y > this.y - this.h &&
            point.y <this.y + this.h
        )
    }
}

class QuadTree {
    constructor(boundary, n) {
        this.boundary = boundary
        this.capacity = n
        this.points = []

        this.divided = false

    }
    subdivide(rect) {
        
        this.divided = true
        let x = this.boundary.x
        let y = this.boundary.y
        let w = this.boundary.w
        let h = this.boundary.h

        let nw = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2)
        this.northwest = new QuadTree(nw,4)
        let ne = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2)

        this.northeast = new QuadTree(ne,4)
        let sw = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2)

        this.southwest = new QuadTree(sw,4)
        let se = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2)

        this.southeast = new QuadTree(se,4)

    }

    insert(point) {
        console.log("hi")
                if(!this.boundary.contains(point)){
                    return
                }
        
                if (this.points.length < this.capacity) {
                    this.points.push(point)
                } else {
                    if (!this.divided) {
                        this.subdivide()
                    }
                    this.northeast.insert(point)
                this.northwest.insert(point)
                this.southeast.insert(point)
                this.southwest.insert(point)
                }
        
                
            }

}