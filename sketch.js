let stamps = [];

function setup() {
    // set canvas to window size
    createCanvas(windowWidth, windowHeight);
}

function getTransform () {
    let xDiff;
    let yDiff;

    if (touches.length == 1){
        xDiff = width/2 - touches[0].x;
        yDiff = height/2 - touches[0].y;
    }
    else if (touches.length == 2){
        xDiff = touches[1].x - touches[0].x;
        yDiff = touches[1].y - touches[0].y;
    }
    else{
        return [];
    }
    return [touches[0].x + xDiff/2, touches[0].y + yDiff/2, 50, getTouchAngle(xDiff, yDiff)];
}

function getTouchAngle(xDiff,yDiff) {
    let theta = 0;
    if (xDiff > 0){
        theta = atan(yDiff / xDiff);
    }
    else{
        theta = atan(yDiff / xDiff) + PI;
    }
    return theta;
}

function touchMoved () {
    if (stamps.length > 0){
        let t = getTransform();
        stamps[stamps.length-1].updateTransform(t[0], t[1], t[2], t[3]);
    }
    
}



function touchStarted () {
    print(stamps);
    let t = getTransform();
    stamps.push(new Stamp (t[0], t[1], t[2], t[3]));
    
}

function draw() {
    background(255);
    fill('magenta');
    rectMode(CENTER);

    for (var i = 0; i < stamps.length; i++) {
        stamps[i].drawStamp();
    }

    for (var i = 0; i < touches.length; i++) {
        
        ellipse(touches[i].x, touches[i].y, 50, 50);
        ellipse(width/2, height/2, 50, 50);
    }
}

class Stamp {
    constructor (x, y, size, rotation){
        this.updateTransform(x, y, size, rotation);
    }
    updateTransform (x, y, size, rotation) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.rotation = rotation;
    }
    drawStamp () {
        push();
        
        
        translate(this.x, this.y);
        rotate(this.rotation);
        rect(0, 0, this.size, this.size);
        pop();
    }
}

// do this prevent default touch interaction
function mousePressed() {
    return false;
}

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});