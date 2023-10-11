let stamps = [];
let displayText = "test";
let backgroundImage = "https://i.imgur.com/ZIPdlrR.png";
let planeImage = "https://i.imgur.com/89q9C8X.png";
let commentImage = "https://i.imgur.com/vgTGCeu.png";

function setup() {
    // set canvas to window size
    backgroundImage = loadImage(backgroundImage);
    planeImage = loadImage(planeImage);
    commentImage = loadImage(commentImage);
    createCanvas(windowWidth, windowHeight);
}

function getTransform () {
    let xDiff;
    let yDiff;

    if (touches.length == 1 && keyIsDown(32)){
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

    return [touches[0].x + xDiff/2, touches[0].y + yDiff/2, 120, getTouchAngle(xDiff, yDiff), sqrt(sq(xDiff) + sq(yDiff))];
    //     0                        1                       2   3                            4
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
        stamps[stamps.length-1].updateTransform(t[0], t[1], t[2], t[3], t[4]);
    }
}

function findClosestStampIndex (_stamps, distance, threshold) {
    let closestDifference = threshold;
    let closestStampIndex = -1;
    for (let i = 0; i < _stamps.length; i++){
        let currStamp = _stamps[i];
        let diff = abs(currStamp.distance - distance);
        print(currStamp);
        if (diff < closestDifference) {
            closestDifference = diff;
            closestStampIndex = i;
        }
    }
    return closestStampIndex;
}

function touchStarted () {
    let t = getTransform();
    if (touches.length == 2 || (touches.length == 1 && keyIsDown(32))){
        displayText = t[4];
        stamps.push(new Stamp (t[0], t[1], t[2], t[3], t[4]));     
    }
}

function draw() {
    background(255);
    rectMode(CORNER);
    let imageAspectRatio = backgroundImage.height / backgroundImage.width;
    image(backgroundImage, 0, 0, width, width*imageAspectRatio);
    fill('magenta');
    
    // text(displayText, width/2, height/2);
    for (var i = 0; i < stamps.length; i++) {
        stamps[i].drawStamp();
    }
    if (keyIsDown(32)){
        for (var i = 0; i < touches.length; i++) {
            ellipse(touches[i].x, touches[i].y, 50, 50);
            ellipse(width/2, height/2, 50, 50);
        }
    }
    
}

class Stamp {
    constructor (x, y, size, rotation, distance){
        
        this.updateTransform(x, y, size, rotation, distance);
    }
    updateTransform (x, y, size, rotation, distance) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.rotation = rotation;
        this.distance = distance;
    }
    drawStamp () {
        push();
        
        
        
        translate(this.x, this.y);
        rotate(this.rotation);
        imageMode(CENTER)

        if (this.distance < 85){
            // fill('magenta');
            image(planeImage, 0,0, this.size, this.size);
        }
        else{
            // fill('cyan')
            image(commentImage, 0,0, this.size, this.size);
        }

        // rect(0, 0, this.size, this.size);
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