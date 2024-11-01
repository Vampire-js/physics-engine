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

// let ball1 = new Ball(400,400,10)
// // ball1.player = true
// ball1.velocity.x = 2
// balls.push(ball1)

// let ball2 = new Ball(500,10,20)
// // ball1.player = true
// ball2.velocity.y = .1
// balls.push(ball2)


let box = new Box(400,400,150,150)
box.omega = Math.PI/100
box.velocity.y = -4
box.draw()


let wallr = new Wall(canvas.width/2 + 100,300,canvas.width/2 - 300 ,600 , 0)
wallr.updateAngle(-Math.PI/5)
// wallr.omega = Math.PI/100

let walll = new Wall(canvas.width/2 + 300,300,canvas.width/2  ,400 , 0)
// walll.pivot = walll.end.mult(.8)
// walll.omega = Math.PI/100

// walls.push(wallr , walll)
// walls.push(walll)

// setInterval(() => {
//     let newbal = new Ball(Math.random()*canvas.width, 0 ,10)
//     newbal.intersects(ball1)
//     newbal.intersects(ball2)
//     newbal.collideWall(walll)
//     newbal.collideWall(wallr)
//     balls.push(newbal)
// },300)

balls.map(e => {
e.draw()
})

walls.map(e => {
    e.draw()
    })


    function animate() {
        c.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
        // walll.updateAngle(-Math.PI/50)
        box.update()

        // Handle ball-to-ball collisions
        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                balls[i].intersects(balls[j]);
            }
        }
    
        // Handle wall collisions
        for (let wall of walls) {
            for (let ball of balls) {
                ball.collideWall(wall);
            }
            wall.update();
        }
    
        // Update positions after all collisions are resolved
        for (let ball of balls) {
            ball.update();
        }
     
    
        requestAnimationFrame(animate);
    }
    

animate()