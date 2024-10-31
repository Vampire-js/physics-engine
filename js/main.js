const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")

let x = 100
let y = 100

let LEFT, UP, RIGHT, DOWN

let balls = []





let ball1 = new Ball(100, 100, 20)
ball1.draw()
ball1.player = true
balls.push(ball1)

const wall = new Wall(200,220,100,100, 0)

wall.draw()


function animate() {
    c.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

wall.updateAngle(Math.PI/500)
    wall.update()

    balls.map(e => {
        e.update()
    })
    requestAnimationFrame(animate)
}


animate()