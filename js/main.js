const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let walls = [];
// let wallr = new Wall(canvas.width / 2 + 100, 300, canvas.width / 2 - 300, 600, 0);
// let walll = new Wall(canvas.width / 2 + 300, 300, canvas.width / 2, 400, 0);
// walll.omega = Math.PI / 200; // Set initial rotation speed
// walls.push(wallr, walll);


// let box = new Box(300,300,100,100)
// box.draw()


// let box = new Box(300,400,566,550)
// box.draw()


let balls = []
// let loop = setInterval(() => {
//     if(balls.length <= 1000){
//     let newbal = new Ball(180 + Math.random()*50, 200 ,10)
//     newbal.color = `rgba(${100+Math.random()*155},${100+Math.random()*155},${200+Math.random()*155},.3)`
//     newbal.stroke = `rgba(${100+Math.random()*155},${100+Math.random()*155},${200+Math.random()*155},.3)`
//     newbal.damping = .5
//     newbal.mass = .5
//     // newbal.intersects(ball1)
//     // newbal.intersects(ball2)
//     // newbal.collideWall(walll)
//     // newbal.collideWall(wallr)
   
//     balls.push(newbal)
//     }
//     // console.log(balls.length)
// },3)


// let player = new Ball(500,-20040,30)
// player.mass = 10
// player.player = false
// player.color = "red"


// balls.push(player)


const ball = new Ball(200,300,20)
// ball.gravity = 0
// ball.player = true

balls.push(ball)

const spring = new Spring(200,200,200)
spring.draw()

function animate() {
    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    // Handle wall collisions
//    walll.collides(wallr)
//    wallr.collides(walll)

// player.update()
//    box.update()
    // Update and draw walls

    
    spring.update()

spring.hook(ball)

    for (let ball of balls) {
        ball.update();
        for (let b of balls) {
            if( b != ball) {
                b.intersects(ball)
            }
        }
    }
// ball.applyForce(new Vector(.0004,0))


    for (let wall of walls) {
        wall.update();
        for (let ball of balls) {
        ball.collideWall(wall)
        }
    }

    requestAnimationFrame(animate);
}

animate();
