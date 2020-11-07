//remaining features required
//starting screen that informs player what to expect -- starts once clicking ok
//back button -- (exit to main menu)
//reset for replayability
//extra fake shapes on the right side
//incorrect attempts tracker -- if 3 shapes are matched incorrectly game resets

let timer = 10; 
let attempts = 3;
let locationCheck = false; //if false then shape is in incorrect location

//Variables for draggable shapes
let shape1;
let shape2;
let shape3;
let shape4;
let shape5;
let shape6;
//Variables for testing correct draggable shape position 
let testShape1;
let testShape2;
let testShape3;
let testShape4;
let testShape5;
let testShape6;

function setup() {
  createCanvas(1280,720);

  shape1 = new Draggable(240, 30, 120, 50);
  //shape1 = new Draggable(40, 30, 120, 50); //oldsetup
  shape2 = new Draggable(350, 120, 30, 80);
  //shape2 = new Draggable(150, 90, 30, 80);
  shape3 = new Draggable(240, 230, 30, 50);
  //shape3 = new Draggable(40, 130, 30, 50);
  shape4 = new Draggable(390, 260, 50, 50);
  //shape4 = new Draggable(90, 160, 50, 50);
  shape5 = new DraggableS(440,370, 20);
  //shape5 = new DraggableS(40,270, 20);
  shape6 = new DraggableS(270,370,35);
  //shape6 = new DraggableS(170,270,35);

  //answers to shape 1-6 (invisible shapes under templates on right side)
  testShape1 = new AnswerRectangle(940, 300, 120, 50);
  //testShape1 = new AnswerRectangle(440, 300, 120, 50); //old setup
  testShape2 = new AnswerRectangle(1140, 300, 30, 80);
  //testShape2 = new AnswerRectangle(640, 300, 30, 80);
  testShape3 = new AnswerRectangle(740, 150, 30, 50);
  //testShape3 = new AnswerRectangle(640, 150, 30, 50);
  testShape4 = new AnswerRectangle(840, 200, 50, 50);
  //testShape4 = new AnswerRectangle(540, 200, 50, 50);                 
  testShape5 = new AnswerCircle(740,270,3); 
  //testShape5 = new AnswerCircle(440,270,3); 
  testShape6= new AnswerCircle(1140,170,3);
  //testShape6= new AnswerCircle(440,170,3);
}

function draw() {
  clear(); // removes trailing of drawn draggable shapes

  /////////////GUI LAYOUT/////////////////
  //border
  fill("black");
  rect(640,0,30,720);
  
  //shape1 answer
  fill("white");
  rect(940, 300, 120, 50);
  //rect(440,300,120,50); //old answers
  
  //shape2 answer
  fill("white");
  rect(1140, 300, 30, 80);
  //rect(640, 300, 30, 80);
  
  //shape3 answer
  fill("white");
  rect(740, 150, 30, 50);
  //rect(640, 150, 30, 50);
  
  //shape4 answer
  fill("white");
  rect(840, 200, 50, 50);
  //rect(540, 200, 50, 50);
  
  //shape5 answer //possibly shape 6
  fill("white");
  ellipse(740, 270, 40);
  //ellipse(440,270, 40);

  //shape6 answer //possibly shape 5
  fill("white");
  ellipse(1140, 170, 70);
  //ellipse(440,170,70);
  ///////////GUI LAYOUT/////////////

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

 let r = dist(shape1.x,testShape2.y, testShape1.x,testShape1.y);//testing

   //if the shape is dropped into the correct location 
  if(shape1.intersects(testShape1) && shape1.releasedCheck(false)){
    shape1.correctPosition(); //color the shape green
  }
  else if ( r > shape1.w/5 + testShape1.w/5 && shape1.releasedCheck(true)) { //testing attempt tracker
  attempts = attempts --;
   }

  if(shape2.intersects(testShape2) && shape2.releasedCheck(false)){
    shape2.correctPosition();
  }

  if(shape3.intersects(testShape3) && shape3.releasedCheck(false)){
    shape3.correctPosition();
  }

  if(shape4.intersects(testShape4) && shape4.releasedCheck(false)){
    shape4.correctPosition();
  }

  if(shape5.intersects(testShape5) && shape5.releasedCheck(false)){
    shape5.correctPosition();
  }

  if(shape6.intersects(testShape6) && shape6.releasedCheck(false)){
    shape6.correctPosition();
  } 

///////////Timer -- Attempts counters///////////////// 
   fill("yellow");
   text('Time:',470,60);
 text(timer, 600, 60);
   textSize(50);
   if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
     timer --;
   }
   if (timer == 0) {
    textSize(100);
     fill("red");
     text("GAME OVER", 325, 330);
     textSize(50);
   }

   fill("green");
   text('Attempts:',670,60);
 text(attempts, 890, 60);
   textSize(50);
  // if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
   //  timer --;
  // }
  // if (timer == 0) {
   // textSize(100);
   //  fill("red");
    // text("GAME OVER", 325, 330);
    // textSize(50);
  // }
 
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

class AnswerRectangle{ //creates invisible shape under template locations for checking
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  show() { //needs to be invisible
   // stroke(0);
    //fill("yellow");
    //rect(this.x, this.y, this.w, this.h);
    noFill();
    noStroke();
    }
}

class AnswerCircle{//creates invisible shape under template locations for checking
constructor(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.offsetX = 0;
  this.offsetY = 0;

}

show() { //needs to be invisible
  //stroke(0);
  //fill("yellow");
  noFill();
  noStroke();
  }

}//end AnswerCircle class


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
    this.locationCheck = false; // Is the shape placed in correct location?
  }

  intersects(other){ 
    let r = dist(this.x,this.y, other.x, other.y);
    return (r < this.w/5 + other.w/5);
}

 correctPosition(){ //function call to display green
     stroke(0);
     fill("green");
     rect(this.x, this.y, this.w, this.h);
  }

  over(x,y) {
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
      this.locationCheck = false;
    }

  }

  //returns true if shape is in correct location / false otherwise
  releasedCheck(check){
    let c = this.locationCheck;
    return(c);
  }

  released(){
    this.dragging = false;
    this.locationCheck = true; //shape is in proper location
  }
 

}//end Draggable Class

class DraggableS {
  constructor(x, y, r) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the circle?
    this.x = x;
    this.y = y;
    this.r = r;
    this.offsetX = 0;
    this.offsetY = 0;
    this.locationCheck = false; // Is the shape placed in correct location?
  }

  intersects(other){
                //shape5        testShape5
    let d = dist(this.x,this.y, other.x,other.y);
    return (d < this.r + other.r);
    
  }

  correctPosition(){ //function call to display green
     stroke(0);
     fill("green");
     ellipse(this.x, this.y, this.r * 2);
  }
  
  over() {
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
    }
    else {
      fill(175, 200);
    }
    ellipse(this.x, this.y, this.r * 2);
  }

  pressed() {
    // Did I click on the circle?
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of circle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      this.locationCheck = false;
    }
    //if(attempts > 0){
    //attempts = attempts - 1;
    //}
  }

  releasedCheck(check){
    let c = this.locationCheck;
    return(c);
  }

  released() {
    // Quit dragging
    this.dragging = false;
    this.locationCheck = true;
  }
  
}// end DraggableS Class