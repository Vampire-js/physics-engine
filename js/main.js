const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight

let x = 100
let y = 100

let LEFT, UP, RIGHT, DOWN

let balls = []
let walls = []





// balls.push(ball1)

let ball1 = new Ball(400,10,20)
// ball1.player = true
ball1.velocity.x = 3
balls.push(ball1)

let wallr = new Wall(canvas.width/2 + 100,300,canvas.width/2 - 10,600 , 0)
wallr.updateAngle(-Math.PI/5)
let walll = new Wall(80,400,180,400 , 0)

walls.push(wallr)
// walls.push(walll)

balls.map(e => {
e.draw()
})

walls.map(e => {
    e.draw()
    })
function animate() {
    c.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    // ball1.color = "Red"

    balls.map(e => {
        e.update()
    })
    walls.map(e => {
        e.update()
        ball1.collideWall(e)
    })

    requestAnimationFrame(animate)
}


animate()