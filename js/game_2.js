var gif_loadImg, gif_createImg;
let section, paddle, meteor1;
let speed = 5;
let score = 0;
//let y = 0;
//let x = 0;

let meteorXPositions;
let meteorYPositions;

let imageList;

function preload() 
{
  gif_loadImg = loadImage("Images/Meteor.gif");
  gif_createImg = createImg("Images/Meteor.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  paddle = new Draggable(windowWidth/2, windowHeight * 0.87, windowWidth * 0.15, windowWidth * 0.03); // x y w h
  //meteor1 = new Falling(false);
  meteorXPositions = [];
  meteorYPositions = [];
  imageList.push(createImg("Images/Meteor.gif"));

  meteorXPositions.push(Math.random() * (windowWidth - (27 * windowWidth * 0.002)));
  meteorYPositions.push(-300);
  gif_createImg.attribute('height', 47 * windowWidth * 0.002);
  gif_createImg.attribute('width', 27 * windowWidth * 0.002);

}

function draw() 
{
  updateGame();
  clear();
  
  if(frameCount % 60 == 0) 
  {
    meteorXPositions.push(Math.random() * (windowWidth - (27 * windowWidth * 0.002)));
    meteorYPositions.push(-300);
  }
  for(i = 0; i < meteorXPositions.length; i++) 
  {
    gif_createImg.position(meteorXPositions[i], meteorYPositions[i]);
  }

  paddle.over();
  paddle.update();
  paddle.show();
  //meteor1.update();
  //meteor1.contactCheck()
  //meteor1.resetCheck();
}

function updateGame() 
{  
  for(i = 0; i < meteorYPositions.length; i++) 
  {
    meteorYPositions[i] += speed;
  }
}

function mousePressed() {
  paddle.pressed();
}
function mouseReleased() {
  paddle.released();
}

class Falling {
  constructor(fof) {  //friend or foe, will object destroy paddle? Friend = true
    this.fof = fof;
    this.x = x;
    this.y = y;
  }
  start() { //Randomizes a region to start in and determines starting x position to fall
    section = windowWidth/10;
    var space = [];
    for (var i = 1; i < 11; ++i) {
      space[i] = i;
    }
    this.x = 200;//space[int(random(0,11))] * section;
    this.y = 50; 
    console.log(this.x);
  }
  
  contactCheck() { //check if collision with paddle
    if(fof) { //gain point
      score++;
    }
    else {  //lose point
      score--;
    }
    if(score >= 15) {
      //GAME OVER STOP PROGRAM
    }
    if(this.y >= windowHeight * 0.87) {// /* PADDLE POSITION X ) {
      this.y = windowWidth - 50; //will triger resetCheck()
    }
  }
  /*
  resetCheck() {  //check if object has reached bottom so can restart
    if(this.y <= windowWidth) {
      this.start();
    }
  }
  */
  update() {  //update falling position and display
    this.y = this.y + speed;
    gif_createImg.position(x, y);
  }
}

class Draggable {
  constructor(x, y, w, h) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the square/rectangle?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
  }
  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }
  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
    }
  }
  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      //noStroke();
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    rect(this.x, this.y, this.w, this.h);
  }
  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
    }
  }
  released() {
    // Quit dragging
    this.dragging = false;
  }
}