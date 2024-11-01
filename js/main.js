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


let box = new Box(200,200,156,100)
box.draw()

let balls = []
let loop = setInterval(() => {
    if(balls.length <= 500){
    let newbal = new Ball(180 + Math.random()*50, 0 ,2)
    // newbal.intersects(ball1)
    // newbal.intersects(ball2)
    // newbal.collideWall(walll)
    // newbal.collideWall(wallr)
   
    balls.push(newbal)
    }
    // console.log(balls.length)
},30)



function animate() {
    c.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // Handle wall collisions
//    walll.collides(wallr)
//    wallr.collides(walll)

   box.update()
    // Update and draw walls

    for (let ball of balls) {
        ball.update();
        for (let b of balls) {
            if( b != ball) {
                b.intersects(ball)
            }
        }
    }

    for (let wall of walls) {
        wall.update();
        for (let ball of balls) {
        ball.collideWall(wall)
        }
    }

    requestAnimationFrame(animate);
}

animate();
