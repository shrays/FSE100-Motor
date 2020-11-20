
let font;
let button;
let col;
let gaming = false;

function preload() 
{
    font = loadFont('Images/AmericanCaptain.ttf');
}

function setup() 
{
createCanvas(windowWidth, windowHeight);
}

function draw() 
{
    clear();

    // BOX AND STROKE
    fill(167, 167, 167, 200);
    stroke(255,255,255);
    strokeWeight(8);
    rect(windowWidth * 0.2, windowHeight * 0.2, windowWidth * 0.6, windowHeight * 0.6, 
         windowWidth / 18, windowWidth / 18, windowWidth / 18, windowWidth / 18);

    //TITLE SHADOW AND TITLE
    fill(16,27,31);
    noStroke()
    textFont(font, windowWidth * 0.05);
    textAlign(CENTER);
    text('Instructions', windowWidth / 2 + 6, windowHeight / 3.4 + 6);  //shadow
    fill(255,255,255);
    stroke(16,27,31);
    strokeWeight(4);
    text('Instructions', windowWidth / 2, windowHeight / 3.4);

    // START BUTTON
    button = createButton("Start");
    button.center(CENTER);
    col = color(255,255,255);
    button.size(windowWidth * 0.1,windowHeight * 0.07);
    button.position(windowWidth * 0.5 - (windowWidth * 0.05),windowHeight * 0.7);
    button.style("font-family", "Impact, Charcoal, sans-serif");
    button.style('background-color', col);
    button.style('color', "#101b1f");
    button.style("font-size", "48px");
    button.mousePressed(game);
    print(gaming);

    // INSTRUCTIONS

    // TURTLE
}

function game()
{
    gaming = true;
}