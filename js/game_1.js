let shape1;
let shape2;
let shape3;
let shape4;
let shape5;
let shape6;


let img;

//function preload(){
  //img = loadImage('spaceBackground.png');
//}

function setup() {
  //createCanvas(640, 360);
   //img = loadImage('spaceBackground.png');
  createCanvas(1280,720);
  //Image(img,0,0);

  shape1 = new Draggable(40, 30, 120, 50);
  shape2 = new Draggable(150, 90, 30, 80);
  shape3 = new Draggable(40, 130, 30, 50);
  shape4 = new Draggable(90, 160, 50, 50);
  shape5 = new DraggableS(40,270, 20);
  shape6 = new DraggableS(170,270,35); 
  

}

function draw() {
  fill("transparent");
  background(255);
  
  
  fill("black");
  rect(300,0,30,800);
  
  //shape1
  fill("white");
  rect(440,300,120,50);
  
  //shape2
  fill("white");
  rect(640, 300, 30, 80);
  
  //shape3
  fill("white");
  rect(640, 150, 30, 50);
  
  //shape4
  fill("white");
  rect(540, 200, 50, 50);
  
  //shape5
  fill("white");
  ellipse(440,270, 40);
  
  //shape6
  fill("white");
  ellipse(440,170,70);
  
  
  
  shape1.over();
  shape1.update();
  shape1.show();
  shape2.over();
  shape2.update();
  shape2.show();
  shape3.over();
  shape3.update();
  shape3.show();
  shape4.over();
  shape4.update();
  shape4.show();
  shape5.over();
  shape5.update();
  shape5.show();
  shape6.over();
  shape6.update();
  shape6.show();
}

function mousePressed() {
  shape1.pressed();
  shape2.pressed();
  shape3.pressed();
  shape4.pressed();
  shape5.pressed();
  shape6.pressed();
}

function mouseReleased() {
  shape1.released();
  shape2.released();
  shape3.released();
  shape4.released();
  shape5.released();
  shape6.released();
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
      this.y = mouseY + this.offsetY;
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
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}

class DraggableS {
  constructor(x, y, r) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the circle?
    this.x = x;
    this.y = y;
    this.r = r;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  over(x,y) {
    // Is mouse over object
    let d = dist(mouseX, mouseY, this.x, this.y);
    
    if (d < this.r) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    ellipse(this.x, this.y, this.r * 2);
  }

  pressed(x,y) {
    // Did I click on the circle?
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of circle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}