let seq, rows, cols, slots, interval, playing, userInput, currentSeqIndex, expectedRecordedSeqIndex, win, lose;
lose=3, score=0;
let instructions, gaming;
let board;
function setup() {
	cols = 3;
	rows = 3;
	len = 1;
  interval = 1000;
  
  
  let check=true;
  createCanvas(windowWidth,windowHeight);
  
  instructions = loadImage("Images/MemoryInstructions.png");
  button = createButton("Start!");
  button.mousePressed(() => 
    {
      playing = false;
      button.hide();
      gaming = true;
      imageMode(CORNER);
      playSeq();
      
    }); 
  button.center(CENTER);
  col = color(255,255,255);
  button.style("font-family", "Impact, Charcoal, sans-serif");
  button.style('background-color', col);
  button.style('color', "#101b1f");
  button.style("font-size", "60px");
  
  //creates the canvas with the 3x3 square and sets up each as a button
	let w = 400/cols ;
	let h = 400/rows;
	let i = 0;
	slots = [];
	for(let x = windowWidth/2 - 200; x < windowWidth/2  + 200; x+=w){
		for(let y = windowHeight/2 -200; y < windowHeight/2 + 200; y+=h){
			slots.push({i,x,y,w,h,a:false,c: color(0, 0,255),});
			i++;
		}
  }
  //displays score and lives left at the top of board
  fill('black');
  rect(windowWidth/2-200, windowHeight/2-240, 400,60);
  textAlign(CENTER);
  textSize(30);
  fill('white')
  text('Score: ', windowWidth/2-145 , windowHeight/2-210);
  text(score, windowWidth/2-90 , windowHeight/2-210)
  text('Attempts: ', windowWidth/2+115 , windowHeight/2-210);
  text(lose, windowWidth/2+185 , windowHeight/2-210)
  createSeq(len);
}
//resets the board after each slot is called
function resetSlots(){
  slots.forEach(s => {s.a = false;});
}
//Creates the pattern that is played
function createSeq(len){
  playing = false;
	seq = [];
  userInput = [];
  currentSeqIndex = 0;
  expectedRecordedSeqIndex = 0;
	for(let i = 0; i < len; i++){
		seq.push(floor(random(0, slots.length)))
	}
  playSeq();
  
}
// Plays the pattern the user has to copy
function playSeq(){
  win = 0;
  // Reset all slots
	resetSlots();
  // Activate current slot
  let c = slots.find(s => s.i == seq[currentSeqIndex]);
  if(c && currentSeqIndex < seq.length){
    c.a = true;
    
    currentSeqIndex++;
    setTimeout(playSeq, interval);
  }else{
    resetSlots();
    playing = true;
    currentSeqIndex = 0;
  }
}
//Finds which button the mouse is over and when clicked shows which one
function mouseClicked(){
  if(playing){
    let c = slots.find(s => {
      return mouseX > s.x &&
        mouseX < s.x+s.w &&
        mouseY > s.y &&
        mouseY < s.y+s.h
    });
    resetSlots();
    if(c){
      
    
      //Checks if the user input is the same as the expected and adds a point to the users score
      if(c.i == seq[expectedRecordedSeqIndex]){
        if(expectedRecordedSeqIndex == seq.length-1){
          score++;
          win = 1;
          setTimeout(() => {createSeq(++len)}, interval*2);
        }
        expectedRecordedSeqIndex++;
      }else{
        
        //If its wrong gives 1 "strike" 3 strikes and you lose
        playing = false;
        lose --;
        if (lose==0){
          win=0
        }
        else{
          win=-1;
        }
        expectedRecordedSeqIndex = 0;
        setTimeout(playSeq, interval*2);
      }
    	c.a = true;	
      
    }
  }
}

function draw() {

  if(!gaming)
  {
    clear();
    button.size(windowWidth * 0.15,windowHeight * 0.09);
    button.position(windowWidth * 0.53,windowHeight * 0.65);
    imageMode(CENTER);
    instructions.resize(16 * windowWidth * 0.06, 9 * windowWidth * 0.06)
    image(instructions, windowWidth / 2, windowHeight / 2);
  }
  if(gaming)
  {
    
    clear();
    
	
    
    //Causes the buttons to change colors
	for(const s of slots){
		push();
		fill((s.a ? s.c : 0));
		stroke(255);
		strokeWeight(1);
		rect(s.x, s.y, s.w, s.h);
    if(s.a){
      fill(255);
      text((playing ? expectedRecordedSeqIndex: currentSeqIndex), s.x+s.w/2, s.y+s.h/2);
      

    }
    //on certain conditions it will display different messages ex. If you get the sequence correct it displays correct
		pop();
    push();
    textAlign(CENTER);
    textSize(32);
    rectMode(CENTER);
    fill(255);
    if(win == 1){
      rect(width/2, height/2, 200, 70);
      fill('green');
      text('Correct !', width/2, height/2+10);
      fill('white');
      

    }else if(win == -1){
      rect(width/2, height/2, 200, 70);
      fill('red');
      text('Incorrect !', width/2, height/2+10);
    }else if(lose==0){
      rect(width/2, height/2, 600, 600);
      fill('red');
      text('You Lose !', width/2, height/2+10);
      playing=false;

    }else if(score==5){
      rect(width/2, height/2, 600, 600);
      fill('green');
      text('You Win !', width/2, height/2+10);
      playing=false;

    }
    pop();
	}
  }
  
  
}