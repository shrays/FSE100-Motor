let paddle, turtle;
let font;
let speed = 5;

let meteorXPositions, meteorYPositions, meteorList;
let lives;
let starXPositions, starYPositions, starList;
let points;

let button;
let gaming = false;

/*-----------------------------------------------------------------------------------------------------
// THINGS TO ADD:
// Turtle in background
-----------------------------------------------------------------------------------------------------*/

function preload()
{
  font = loadFont('Images/AmericanCaptain.ttf');
}
function setup() 
{
  createCanvas(windowWidth, windowHeight);
  paddle = new Draggable(windowWidth/2, windowHeight * 0.87, windowWidth * 0.15, windowWidth * 0.03); // x y w h
  meteorXPositions = [];
  meteorYPositions = [];
  meteorList = [];
  lives = 5;
  starXPositions = [];
  starYPositions = [];
  starList = [];
  points = 0;

}

function draw() 
{
  while(gaming == false)
  {
    button = createButton("BOOP!");
    button.mouseClicked(changeGaming);
    button.size(200,100);
    button.position(10,10);
    button.style("font-family", "Bodoni");
    button.style("font-size", "48px");
  }
  paddle.setWindow(windowHeight * 0.87, windowWidth * 0.15, windowWidth * 0.03);
  updateMeteor(); //updates meteor pos
  updateStar();
  clear();

  if(lives == 0)
  {
    for(i = 0; i < meteorList.length; i++)
    {
      meteorList[i].remove();
    }
    for(i = 0; i < starList.length; i++)
    {
      starList[i].remove();
    }
    gameOver();
  }

  textFont(font, windowWidth * 0.04);
  fill(255);
  strokeWeight(0);
  text('Points: ' + points, windowWidth * 0.35, windowHeight * 0.1);
  text('Lives: ' + lives, windowWidth * 0.55, windowHeight * 0.1);

  if(frameCount % 60 == 0) //every 1 second, create new meteor with position
  {
    meteorList.push(createImg("Images/Meteor.gif"));
    meteorList[meteorList.length-1].style("user-select", "none");
    meteorList[meteorList.length-1].attribute("draggable", "false");
    meteorList[meteorList.length-1].attribute('height', 47 * windowWidth * 0.002);
    meteorList[meteorList.length-1].attribute('width', 27 * windowWidth * 0.002);
    meteorXPositions.push(Math.random() * (windowWidth - (27 * windowWidth * 0.002)));
    meteorYPositions.push(-200);
  }
  if(frameCount % 150 == 0) //every 1 second, create new meteor with position
  {
    starList.push(createImg("Images/Star.gif"));
    starList[starList.length-1].style("user-select", "none");
    starList[starList.length-1].attribute("draggable", "false");
    starList[starList.length-1].attribute('height', 27 * windowWidth * 0.002);
    starList[starList.length-1].attribute('width', 27 * windowWidth * 0.002);
    starXPositions.push(Math.random() * (windowWidth - (27 * windowWidth * 0.002)));
    starYPositions.push(-200);
  }
  for(i = 0; i < meteorXPositions.length; i++) //Cycles through every objects positions
  {
    meteorList[i].position(meteorXPositions[i], meteorYPositions[i]);  //Sets image positions
    if(meteorYPositions[i] > 0.9 * (windowHeight + (47 * windowWidth * 0.002))) //Removes meteors when off screen
    {
      meteorList[0].remove();
      meteorList.shift();
      meteorXPositions.shift();
      meteorYPositions.shift();
      i--;
    }
    else if(  meteorYPositions[i] >= (paddle.getPosY() - (47 * windowWidth * 0.002) + windowWidth * 0.007) && //windowWith * 0.007 is manual correction
              meteorYPositions[i] <= (paddle.getPosY()) && //bottom of paddle
              meteorXPositions[i] >= (paddle.getPosX() - windowWidth * 0.04) && //windowWidth * 0.04 is manual correction number
              meteorXPositions[i] <= (paddle.getPosX() + windowWidth * 0.15) )
    {
      //Collision happens, remove meteorList/shift, give/remove points
      meteorList[0].remove();
      meteorList.shift();
      meteorXPositions.shift();
      meteorYPositions.shift();
      i--;
      lives--;
    }
  }
  for(i = 0; i < starXPositions.length; i++) //Cycles through every objects positions
  {
    starList[i].position(starXPositions[i], starYPositions[i]);  //Sets image positions
    if(starYPositions[i] > 0.9 * (windowHeight + (27 * windowWidth * 0.002))) //Removes meteors when off screen
    {
      starList[0].remove();
      starList.shift();
      starXPositions.shift();
      starYPositions.shift();
      i--;
    }
    else if(  starYPositions[i] >= (paddle.getPosY() - (27 * windowWidth * 0.002) + windowWidth * 0.007) && //windowWith * 0.007 is manual correction
              starYPositions[i] <= (paddle.getPosY()) && //bottom of paddle
              starXPositions[i] >= (paddle.getPosX() - windowWidth * 0.04) && //windowWidth * 0.04 is manual correction number
              starXPositions[i] <= (paddle.getPosX() + windowWidth * 0.15) )
    {
      //Collision happens, remove meteorList/shift, give/remove points
      starList[0].remove();
      starList.shift();
      starXPositions.shift();
      starYPositions.shift();
      i--;
      points++;
    }
  }
  paddle.over();
  paddle.update();
  paddle.show();
}
function changeGaming()
{
  gaming = true;
}

function updateMeteor() 
{  
  for(i = 0; i < meteorYPositions.length; i++) {meteorYPositions[i] += speed;}
}
function updateStar()
{
  for(i = 0; i < starYPositions.length; i++) {starYPositions[i] += speed;}
}

function mousePressed() 
{
  paddle.pressed();
}

function mouseReleased() 
{
  paddle.released();
}

function gameOver()
{
  fill(0, 0, 255, 100);
  rect(0, 0, windowWidth, windowHeight);
  
  fill("white");
  //stroke(0,0,0);
  //strokeWeight(8);
  textFont(font, windowWidth * 0.2);

  switch(Math.floor(points / 5))
  {
    case 0:
      textFont(font, windowWidth * 0.125);  
      text('Better luck next time', windowWidth * 0.04, windowHeight * 0.67);
      break;
    case 1:
      text('Good Job!', windowWidth * 0.04, windowHeight * 0.67);
      break;
    case 2:
      text('Wow!', windowWidth * 0.04, windowHeight * 0.67);
      break;
    default:
      text('Amazing!', windowWidth * 0.04, windowHeight * 0.67);
      break;

  }

  
  fill("white");
  textFont(font, windowWidth * 0.08);
  text('You got ' + points + ' points. Try again?', windowWidth * 0.04, windowHeight * 0.8);

  //turtle = createImg("Images/mButton1.png");
  noLoop();
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
    // this.x = mouseX + this.offsetX;
    if (this.dragging) 
    {
      this.x = mouseX + this.offsetX;
    }

    /*
    if (this.dragging) {
      if(this.x <= 0)
      {
        if(this.offsetX > 0 )
        {
          this.x = mouseX + this.offsetX;
        }
      }
      else if(this.x + (windowWidth * 0.15) >= windowWidth)
      {
        if(this.offsetX < 0 )
        {
          this.x = mouseX + this.offsetX;
        }
      }
      else
      {
        this.x = mouseX + this.offsetX;
      }
    }
    */
  }
  show() {
    noStroke();
    // Different fill based on state      Light gray - hover: darker lives color - dragging: lives color
    if (this.dragging) {  //dragging
      switch(lives)
      {
        case 5:
          fill(0,255,0);
          break;
        case 4:
          fill(128,255,0);
          break;
        case 3:
          fill(255,255,0);
          break;
        case 2:
          fill(255,128,0);
          break;
        case 1:
          fill(255,0,0);
          break;
        default:
          fill(0,0,0,0);
          break;
      }
      //fill(50);
    } else if (this.rollover) { //hover
      switch(lives)
      {
        case 5:
          fill(0,153,0);
          break;
        case 4:
          fill(76,255,0);
          break;
        case 3:
          fill(153,153,0);
          break;
        case 2:
          fill(153,76,0);
          break;
        case 1:
          fill(153,0,0);
          break;
        default:
          fill(0,0,0,0);
          break;
      }
      //fill(100);
    } else {
      switch(lives)
      {
        case 0:
          fill(0,0,0,0);
          break;
        default:
          fill(175, 200);
          break;
      }
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
  getPosX() 
  {
    return this.x;
  }
  getPosY() 
  {
    return this.y;
  }
  setWindow(y, w, h)
  {
    this.y = y;
    this.w = w;
    this.h = h;
  }
}