function setup() {
    // set canvas to window size
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);

    // for each touch, draw an ellipse at its location.
    // touches are stored in array.

    
    
    if (touches.length == 2) {
        let xDiff = touches[1].x - touches[0].x;
        let yDiff = touches[1].y - touches[0].y;
        ellipse(touches[0].x, touches[0].y, 50, 50);
        ellipse(touches[1].x, touches[1].y, 50, 50);
        
        let theta = 0;
        if (xDiff > 0){
            theta = atan(yDiff / xDiff);
        }
        else{
            theta = atan(yDiff / xDiff) + PI;
        }

        push();
        rectMode(CENTER);
        translate(touches[0].x + xDiff/2, touches[0].y + yDiff/2);
        rotate(theta);
        rect(0, 0, 200, 100);
        pop();
    }

    fill('magenta');

    for (var i = 0; i < touches.length; i++) {
        
        
    }
}

// do this prevent default touch interaction
function mousePressed() {
    return false;
}

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});