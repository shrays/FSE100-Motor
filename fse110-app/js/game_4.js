
let font;

function preload() 
{
    font = loadFont('Images/AmericanCaptain.ttf');
}

function setup() {
createCanvas(710, 400);

// Set text characteristics

}

function draw() {
textFont(font, windowWidth * 0.02);
fill(255);
text('Points: ', 400, 220);

}