var canvas = document.querySelector("canvas");

const colourPallete = [
    "#1a1a1d",
    "#4e4e50",
    "#6f2232",
    "#950740",
    "#c3073f"
]

canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;

var c = canvas.getContext("2d");

var mouse = {
    x: 0,
    y: 0
}

window.addEventListener('resize', () => {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    init()
})

window.addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})


// Functions
function distance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function randomInt(lowerInt, higherInt) {
    // Returns random int between lower and higher including both
    return Math.floor(Math.random() * (higherInt + 1 - lowerInt)) + lowerInt;
}

function randomColor(opacity) {
    let color = `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}, ${opacity})`;
    return color;
}

// function drawRect() {
//     c.beginPath();
//     c.strokeStyle = "black"
//     c.stroke();
// }

// Object 1
function Circle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
        x: (Math.random() - 0.5) * 10, // Random x value from -0.5 to 0.5
        y: (Math.random() - 0.5) * 10 // Random y value from -0.5 to 0.5
    }
}

Circle.prototype.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    var grd = c.createRadialGradient(this.x + 25, this.y - 25, 5, this.x, this.y, this.radius)
    grd.addColorStop(0, "white")
    grd.addColorStop(1, this.color)
    c.fillStyle = grd;
    c.fill();
}

Circle.prototype.update = function (circles) {

    this.draw();
    var self = this;

    //POP functionality of a circle
    // canvas.addEventListener("mousedown", function () {
    //     if (distance(mouse.x, mouse.y, self.x, self.y) <= self.radius) {

    //         while (self.radius < 100 && self.radius != 0) {
    //             self.radius += 1;

    //         }
    //         setInterval(() => {
    //             self.radius = 0;

    //         }, 100)
    //     }
    // })


    // Bounce off walls
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
        this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
        this.velocity.y = -this.velocity.y;
    }

    //giving Velocity
    this.x += this.velocity.x // Move x coordinate
    this.y += this.velocity.y // Move y coordinate
}

// // Object 2
// function CircleSpecial(x, y, radius, color) {
//     this.x = x
//     this.y = y
//     this.radius = radius
//     this.color = color
//     this.velocity = {
//         x: (Math.random() - 0.5) * 10, // Random x value from -0.5 to 0.5
//         y: (Math.random() - 0.5) * 10 // Random y value from -0.5 to 0.5
//     }
// }
// CircleSpecial.prototype.draw = function () {
//     c.beginPath()
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
//     var grd = c.createRadialGradient(this.x + 25, this.y - 25, 5, this.x, this.y, this.radius)
//     grd.addColorStop(0, "white")
//     grd.addColorStop(1, this.color)
//     c.fillStyle = grd;
//     c.fill();
// }
// CircleSpecial.prototype.update = function () {

//     this.draw();
//     var self = this;
//     let draggable = false;

//     //Drag functionality
//     canvas.addEventListener("mousedown", function (event) {
//         if (distance(mouse.x, mouse.y, self.x, self.y) <= self.radius) {
//             draggable = true;
//             self.x = (event.offsetX);
//             self.y = (event.offsetY);
//         }
//     })

//     canvas.addEventListener("mousemove", function (event) {

//         if (draggable) {
//             self.x = (event.offsetX);
//             self.y = (event.offsetY);
//             self.velocity.x = 0;
//             self.velocity.y = 0;
//         }
//     })

//     canvas.addEventListener("mouseup", function (event) {
//         draggable = false;

//         //Alert When Ball moved to Rectangle
//         if (self.x > 20 && self.x < 70) {
//             if (mouse.x > 20 && mouse.x < 70) {
//                 if (mouse.y > 20 && mouse.y < 70) {
//                     if (self.y > 20 && self.y < 70) {
//                         draggable = false;
//                         self.x = canvas.width / 2;
//                         self.y = canvas.height / 2;
//                         // alert("Alert! You Moved the bubble to the box");
//                         document.querySelector("form").classList.toggle("hidden");

//                         self.velocity = {
//                             x: (Math.random() - 0.5) * 10, // Random x value from -0.5 to 0.5
//                             y: (Math.random() - 0.5) * 10 // Random y value from -0.5 to 0.5
//                         }
//                     }
//                 }
//             }
//         }

//         if (distance(mouse.x, mouse.y, self.x, self.y) <= self.radius) {
//             self.velocity = {
//                 x: (Math.random() - 0.5) * 10, // Random x value from -0.5 to 0.5
//                 y: (Math.random() - 0.5) * 10 // Random y value from -0.5 to 0.5
//             }
//         }
//     })

//     // Bounce off walls
//     if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
//         this.velocity.x = -this.velocity.x;
//     }
//     if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
//         this.velocity.y = -this.velocity.y;
//     }

//     this.x += this.velocity.x // Move x coordinate
//     this.y += this.velocity.y // Move y coordinate
// }

// Implementation
let circles = [];
let circleSpc = [];

function init() {
    circles = [];   //Resetting the array when Window Resized
    // circleSpc = [];  //Resetting the array when Window Resized

    for (let i = 0; i < 100; i++) {
        var radius = randomInt(4, 20);
        var x = Math.random() * (canvas.width - radius * 2) + radius;
        var y = Math.random() * (canvas.height - radius * 2) + radius;
        var color = colourPallete[randomInt(0, 4)];
        //Circles Does not spawn over each other
        // if (i !== 0) {
        //     for (let j = 0; j < circles.length; j++) {
        //         if (distance(x, y, circles[j].x, circles[j].y) - radius * 2 < 0) {

        //             x = Math.random() * (canvas.width - radius * 2) + radius;
        //             y = Math.random() * (canvas.height - radius * 2) + radius;

        //             j = -1;
        //         }
        //     }
        // }

        circles.push(new Circle(x, y, radius, color))
    }
    // var radius = 80;
    // var x = Math.random() * (innerWidth - radius * 2) + radius;
    // var y = Math.random() * (innerHeight - radius * 2) + radius;
    // var color = randomColor(0.8);
    // for (let j = 0; j < circles.length; j++) {
    //     if (distance(x, y, circles[j].x, circles[j].y) - radius * 2 < 0) {

    //         x = Math.random() * (innerWidth - radius * 2) + radius;
    //         y = Math.random() * (innerHeight - radius * 2) + radius;

    //         j = -1;
    //     }
    // }
    // circleSpc.push(new CircleSpecial(x, y, radius, color))
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate) // Create an animation loop
    c.clearRect(0, 0, canvas.width, canvas.height) // Erase whole canvas
    circles.forEach(circle => {
        circle.update()
    })
    // circleSpc[0].update();
    // drawRect();
}
init();
animate();

