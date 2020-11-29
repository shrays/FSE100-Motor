//assign these to 0 so that they can be assigned the first randomly assigned value
let lastRandomX = 0; 
let lastRandomY = 0;

let instructions; //used to load image of instructions
let gaming = false; //if false display instruction menu

let timer = 40; 
let displayTimer = false; //if true then display the time in which player completed game
let attempts = 0; 
let subAttempt = false; //if true then subtract from total attempts
let locationCheck = false; //if false then shape is not placed correctly / subtract from attempts

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

function preload()
{
  font = loadFont('Images/AmericanCaptain.ttf'); //preloads font used throughout each game
}

function setup() {
  createCanvas(windowWidth, windowHeight); //creates a canvas that scales to window width and height
  
  //Creating Display for the instructions page when the user enters a game
  instructions = loadImage('Images/MatchingInstructions.png');
  loadImage("Images/MatchingInstructions.png");
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

  //  Assigning the Draggable shapes an x, y, positions and width and height that scales with window width and height
  //  The getNonRepeatRandomShapeXPos and YPos are called for x, y in order to have them randomly appear on screen each time the game starts
  shape1  = new Draggable(getNonRepeatRandomShapeXPos() + 200,getNonRepeatRandomShapeYPos() + 50,windowWidth/12,windowHeight/21.6);

  shape2 = new Draggable(getNonRepeatRandomShapeXPos() + 100,getNonRepeatRandomShapeYPos() + 100,windowWidth/64,windowHeight/13.5);

  shape3 = new Draggable(getNonRepeatRandomShapeXPos() + 25,getNonRepeatRandomShapeYPos() + 280,windowWidth/36,windowHeight/13.5);

  shape4 = new Draggable(getNonRepeatRandomShapeXPos() + 175,getNonRepeatRandomShapeYPos() + 325,windowWidth/38.4,windowHeight/21.6);

  shape5 = new DraggableS(getNonRepeatRandomShapeXPos() + 175, getNonRepeatRandomShapeYPos() + 450, 20);

  shape6 = new DraggableS(getNonRepeatRandomShapeXPos() + 275, getNonRepeatRandomShapeYPos() + 550, 35);
  
  testShape1 = new AnswerRectangle(getNonRepeatRandomShapeXPos() +  (920 * .9),getNonRepeatRandomShapeYPos(),windowWidth/12,windowHeight/21.6);

  testShape2 = new AnswerRectangle(getNonRepeatRandomShapeXPos() + (870 * .9),getNonRepeatRandomShapeYPos() + 150,windowWidth/64,windowHeight/13.5);

  testShape3 = new AnswerRectangle(getNonRepeatRandomShapeXPos() + (1050 * .9),getNonRepeatRandomShapeYPos() + 250,windowWidth/36,windowHeight/13.5);

  testShape4 = new AnswerRectangle(getNonRepeatRandomShapeXPos() + (1150 * .9),getNonRepeatRandomShapeYPos() + 350,windowWidth/38.4,windowHeight/21.6);

  testShape5 = new AnswerCircle(getNonRepeatRandomShapeXPos() + (1250 * .9),getNonRepeatRandomShapeYPos() + 450,20); 

  testShape6 = new AnswerCircle(getNonRepeatRandomShapeXPos() + (1320 * .9),getNonRepeatRandomShapeYPos() + 550,35); 
 
} //end setup

function draw() {
  
    //if gaming is false then display the instructions page with a start button
    if(!gaming) 
    {
    clear();
    button.size(windowWidth * 0.15,windowHeight * 0.09);
    button.position(windowWidth * 0.53,windowHeight * 0.65);
    imageMode(CENTER);
    instructions.resize(16 * windowWidth * 0.06, 9 * windowWidth * 0.06);
    image(instructions, windowWidth / 2, windowHeight / 2);
    }

    if(gaming) //the user has clicked the start button so gaming is now true and the rest of the code can run for the game
    {
      clear(); //clear to avoid the previous locations of draggable shapes appearing all over the screen

  //created a rectangle that scales to screen size and divides the draggable shapes from the templates
  stroke(color(0, 0, 255));
  strokeWeight(2);
  fill("black");
  rect(windowWidth/2, 0, 30, windowHeight);
  
  //displays templates that draggable shapes will be placed on
  testShape1.show();
  testShape2.show();
  testShape3.show();
  testShape4.show();
  testShape5.show();
  testShape6.show();

  //calls functions for draggable shapes
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

  //checks to see if the correct shapes are being matched and colors them green if true
  if(shape1.intersects(testShape1) && shape1.releasedCheck(false)){
    shape1.correctPosition(); //color the shape green
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
    //more font to match game layout
   textFont(font, windowWidth * 0.04);
   fill(255);
   strokeWeight(0);          
   text('Time:',windowWidth/2 - 200, 60);
   
 text(timer, windowWidth/2 - 70, 60);
   textSize(50);

   // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
   if (frameCount % 60 == 0 && timer > 0 && displayTimer == false) { 
     timer --;
   }
   //if the timer is 0 then display GAME OVER at the center of the screen
   if (timer == 0) {
     textFont(font,windowWidth*0.125);
     fill("red");
     text("GAME OVER", windowWidth/2 - 420, windowHeight/2);
     textSize(50);
   }
   textFont(font, windowWidth * 0.04);
   fill(255);
   strokeWeight(0);
   //actively displays the total amount of user attempts during the game                         
   text("Attempts: " + attempts, windowWidth/2 + 40, 60);

  
 //if everything is placed in the correct position
 if(shape1.intersects(testShape1) && shape1.releasedCheck(false) && shape2.intersects(testShape2) && 
 shape2.releasedCheck(false) && shape3.intersects(testShape3) && shape3.releasedCheck(false) &&
 shape4.intersects(testShape4) && shape4.releasedCheck(false) && shape5.intersects(testShape5) && shape5.releasedCheck(false)
 && shape6.intersects(testShape6) && shape6.releasedCheck(false)){

  displayTimer = true; //displays finished time
   if(timer != 0){ //avoids printing Great Job! and GAME OVER at the same time
   textFont(font, windowWidth * 0.08);
   fill(255);
   strokeWeight(0);
   text("Great Job!", 75, 330);
   text("Your Time: " + timer, 75, 530);
   text("Total Attempts: " + attempts, 75, 730);
   }
}
}
}//end draw 

function getNonRepeatRandomShapeXPos(){
//randomly assigns x positions of the shapes between the 6 choices in the xPositions array
let xPositions =[windowWidth/4,windowWidth/5, windowWidth/6,windowWidth/7, windowWidth/8, windowWidth/9 ]; 
while(true){
let selectXpos = random(xPositions);
if(selectXpos == lastRandomX){ //if the last shape is in the position of the previous shape choose again
  //console.log ("duplicate");
  continue;
}
else{ //else assigns the x position and continue to the next draggable shape
  lastRandomX = selectXpos;
  return selectXpos;
}
}
}// end getNonRepeatRandomShapeXPos

function getNonRepeatRandomShapeYPos(){
//randomly assigns y positions of the shapes between the 6 choices in the xPositions array
let yPositions = [windowHeight/4,windowHeight/5, windowHeight/6, windowHeight/7, windowHeight/8, windowHeight/9];
while(true){
let selectYpos = random(yPositions);
if(selectYpos == lastRandomY){ //if the last shape is in the position of the previous shape choose again
  //console.log ("duplicate");
  continue;
}
else{ //else assigns the y position and continue to the next draggable shape
  lastRandomY = selectYpos; 
  return selectYpos;
}
}
} // end getNonRepeatRandomShapeYPos

function mousePressed() {
  shape1.pressed();
  shape2.pressed();
  shape3.pressed();
  shape4.pressed();
  shape5.pressed();
  shape6.pressed();
} // end mousePressed

function mouseReleased() {
  shape1.released();
  shape2.released();
  shape3.released();
  shape4.released();
  shape5.released();
  shape6.released();
} // end mouseReleased

class AnswerRectangle{ //creates template shapes that the user is placing draggable shapes on
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0; 
  }

  //show function displays shape
  show() { 
    stroke('rgb(0,255,0)');
    strokeWeight(4);
    fill("white");
    rect(this.x, this.y, this.w, this.h);
    }

} //end AnswerRectangle

class AnswerCircle{//creates template shapes that the user is placing draggable shapes on
constructor(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.offsetX = 0;
  this.offsetY = 0;
}

//show function displays shape
show() { 
  stroke('rgb(0,255,0)');
  strokeWeight(4);
  fill("white");
  ellipse(this.x, this.y, this.r * 2);
  }

}//end AnswerCircle 


class Draggable { //creates draggable rectangles
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
    this.subAttempt = false; //assign to false so attempt counter doesn't subtract immediately 
  } // end Draggable


  intersects(other){ 
    let r = dist(this.x,this.y, other.x, other.y); //stores distance between shapes to check if they intersect or not
    return (r < this.w/30 + other.w/30);
} // end intersects

 correctPosition(){ //function call to display green
     stroke(0);
     fill("green");
     rect(this.x, this.y, this.w, this.h);
     this.subAttempt = false; 
  } // end correctPosition

  over(x,y) {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  } // end over

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  } //end update

  show() {
    stroke('#222222');
    strokeWeight(4);    
    // Different fill based on state
    if (this.dragging) {
      stroke('#222222');
      strokeWeight(4);  
      fill("orange");  //shape is orange when being dragged
    } else if (this.rollover) {
      stroke('#222222');
      strokeWeight(4);
      fill("yellow"); //shape is yellow when the mouse hovers over
    } else {  //else the shape is red, indicating that it still needs to be placed in the correct position
      stroke('#222222');
      strokeWeight(4);
      fill("red");
    }
    rect(this.x, this.y, this.w, this.h); //shows this rectangle (whichever one is being called by the show function)
  } //end show

  showCheck(attempt){
    let s = this.subAttempt; //if false then subtract from attempt counter
    return(s);
  } //end showCheck


  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      this.locationCheck = false;
      this.subAttempt = true;
    }

  }

  //returns true if shape is in correct location / false otherwise
  releasedCheck(check){
    let c = this.locationCheck; //if false then subtract from attempts counter
    return(c);
  }

  released(){
    this.dragging = false; //shape is no longer being dragged
    this.locationCheck = true; //shape is in proper location
    let r1 = dist(shape1.x, shape1.y, testShape1.x, testShape1.y);
    let r2 = dist(shape2.x, shape2.y, testShape2.x, testShape2.y);
    let r3 = dist(shape3.x, shape3.y, testShape3.x, testShape3.y);
    let r4 = dist(shape4.x, shape4.y, testShape4.x, testShape4.y);
   
    //checks to see if the shapes are within or outside of intersecting distance
    if( r1 > (shape1.w/5 + testShape1.w/5) && this.subAttempt == true )
    {
      if(attempts >= 0 ){ //if the shapes are not intersecting then add to the attempts location (shape wasn't placed correctly)
      attempts = attempts + 1;
    }} 
      else if(r2 > (shape2.w/5 + testShape2.w/5) && this.subAttempt == true)
      {
        if(attempts >= 0 ){
        attempts = attempts + 1;
        }}
        else if(r3 > (shape3.w/5 + testShape3.w/5) && this.subAttempt == true)
        {
          if(attempts >= 0){
          attempts = attempts + 1;
          } }
          else if(r4 > (shape4.w/5 + testShape4.w/5) && this.subAttempt == true)
          {
            if(attempts >= 0){
            attempts = attempts + 1;
            } 
          }
    this.subAttempt = false;
  }
 
}//end Draggable Class

class DraggableS { //this is very similar to Draggable constructure except this is for circles not rectangles
  constructor(x, y, r) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the circle?
    this.x = x;
    this.y = y;
    this.r = r;
    this.offsetX = 0;
    this.offsetY = 0;
    this.locationCheck = false; // Is the shape placed in correct location?
    this.subAttempt = false; //assign to false so attempt counter doesn't subtract immediately 
  }

  intersects(other){             
    let d = dist(this.x,this.y, other.x,other.y); //stores distance between shapes to check if they intersect or not
    return (d < this.r + other.r);
    
  }

  correctPosition(){ //function call to display green
     stroke(0);
     fill("green");
     ellipse(this.x, this.y, this.r * 2);
     this.subAttempt = false;  
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

  show() { //refer to draggable show function (they are the exact same)
    stroke('#222222');
    strokeWeight(4);
    // Different fill based on state
    if (this.dragging) {
      stroke('#222222');
      strokeWeight(4);
      fill("orange");
    } else if (this.rollover) {
      stroke('#222222');
      strokeWeight(4);
      fill("yellow");
    }
    else {
      stroke('#222222');
      strokeWeight(4);
      fill("red");//fill(175, 200);
    }
    ellipse(this.x, this.y, this.r * 2);
  }

  showCheck(attempt){
    let s = this.subAttempt; //if false then the shape was not placed in correct location and return boolean value
    return(s);
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
      this.subAttempt = true;
    }
  }

  releasedCheck(check){
    let c = this.locationCheck; //checks to see where the shape is by returning the locationcheck as either true or false
    return(c);
  }

  released() {
    // Quit dragging
    this.dragging = false;
    this.locationCheck = true;
    //stores distance between mouse and circle shapes
    let d = dist(mouseX, mouseY, shape5.x, testShape5.y);
    let d1 = dist(mouseX, mouseY, shape6.x, testShape6.y);
   
    //if the shapes are moved then add to the attempts counter
    if(d > (shape5.r + testShape5.r) && this.subAttempt == true){
      if(attempts >= 0){
        attempts = attempts + 1;
     }
    }
    else if (d1 > (shape6.r + testShape6.r) && this.subAttempt == true){
      if(attempts >= 0){
        attempts = attempts + 1;
     }
    }
    this.subAttempt = false;
  }
 
}// end DraggableS 