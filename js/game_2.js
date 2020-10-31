let paddle;
let speed = 5;
let meteorXPositions;
let meteorYPositions;
let imageList;

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  paddle = new Draggable(windowWidth/2, windowHeight * 0.87, windowWidth * 0.15, windowWidth * 0.03); // x y w h

  meteorXPositions = [];
  meteorYPositions = [];
  imageList = [];
}

function draw() 
{
  updateGame(); //updates meteor pos
  clear();
  if(frameCount % 60 == 0) //every 1 second, create new meteor with position
  {
    imageList.push(createImg("Images/Meteor.gif"));
    imageList[imageList.length-1].style("user-select", "none");
    imageList[imageList.length-1].attribute("draggable", "false");
    imageList[imageList.length-1].attribute('height', 47 * windowWidth * 0.002);
    imageList[imageList.length-1].attribute('width', 27 * windowWidth * 0.002);
    meteorXPositions.push(Math.random() * (windowWidth - (27 * windowWidth * 0.002)));
    meteorYPositions.push(-300);
  }
  for(i = 0; i < meteorXPositions.length; i++) //Removes meteors when off screen
  {
    imageList[i].position(meteorXPositions[i], meteorYPositions[i]);
    if(meteorYPositions[i] > windowHeight + (47 * windowWidth * 0.002)) 
    {
      imageList[0].remove();
      imageList.shift();
      meteorXPositions.shift();
      meteorYPositions.shift();
      i--;
    }
    else if((meteorXPositions[i] ) && (meteorYPositions[i] > (windowHeight * 0.87) - (windowWidth * 0.03))) 
    {     //^Still need to impliment x cordinate collision with paddle, define variable for paddle pos
      //Collision happens, remove imagelist/shift, give/remove points
    }
  }
  paddle.over();
  paddle.update();
  paddle.show();
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