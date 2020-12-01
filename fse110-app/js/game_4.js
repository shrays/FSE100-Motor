
let font, button, col;
let instructions;

function preload() 
{
    font = loadFont('Images/AmericanCaptain.ttf');
}

function setup() 
{
    instructions = loadImage("Images/AboutInstructions.png");
    button = createButton("Start!");
    button.mousePressed(() => 
      {
        button.hide();
        gaming = true;
        imageMode(CORNER);
      }); 
    button.center(CENTER);
    col = color(255,255,255);
    button.style("font-family", "Impact, Charcoal, sans-serif");
    button.style('background-color', col);
    button.style('color', "#101b1f");
    button.style("font-size", "60px");
}

function draw() 
{
    //clear();
    button.size(windowWidth * 0.15,windowHeight * 0.09);
    button.position(windowWidth * 0.53,windowHeight * 0.65);
    imageMode(CENTER);
    instructions.resize(16 * windowWidth * 0.06, 9 * windowWidth * 0.06)
    image(instructions, windowWidth / 2, windowHeight / 2);
}
