
let instructions;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    instructions = loadImage("Images/AboutInstructions.png");
}

function draw() 
{
    clear();
    instructions.resize(16 * windowWidth * 0.06, 9 * windowWidth * 0.06)
    image(instructions, windowWidth / 2, windowHeight / 2);
}
