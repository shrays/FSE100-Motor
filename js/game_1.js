
let rectangle,circle;
var img;

function preload(){
img = loadImage('Images/spaceBackground.png');
}


function setup() {

  noStroke();
  fill(0,0,0,0);
  createCanvas(1280, 720);

  let x = 150, y = 150, y1 = 200, w = 125, h = 100;

  rectangle = new Rectangle(x, y, w, h);

 // fill("orange");
  circle = new Circle(x,y1,w,h);


}

function draw() {
  clear();
  rectangle.show(mouseX, mouseY);
  circle.show(mouseX, mouseY);
}


function mousePressed() {
  rectangle.pressed(mouseX, mouseY);
  circle.pressed(mouseX, mouseY);
}

function mouseReleased() {
  rectangle.notPressed();
  circle.notPressed();
}

class Circle {
  constructor(x, y1, w, h) {
    this.x = x;
    this.y1 = y1;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.rollover = false;
  }
  
}


class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.rollover = false;
  }

  show(px, py) {
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
    }

    stroke(255);
    noFill();
    rect(this.x, this.y, this.w, this.h);
  }

  pressed(px, py) {
    if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
      //print("clicked on rect");
      this.dragging = true;
      this.offsetX = this.x - px;
      // print(this.offsetX);
      this.offsetY = this.y - py;
      // print(this.offsetY);
    }
  }

  notPressed(px, py) {
    	//print("mouse was released");
      this.dragging = false;
  }
}




