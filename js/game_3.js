let seq, rows, cols, slots, interval, playing, recordedSeq, currentSeqIndex, expectedRecordedSeqIndex, win, lose;
lose=0;
function setup() {
	cols = 3;
	rows = 3;
	len = 2;
  interval = 1000;
  playing = false;
  
  createCanvas(400, 400);
  
	let w = width/cols;
	let h = height/rows;
	let i = 0;
	slots = [];
	for(let x = 0; x < width; x+=w){
		for(let y = 0; y < height; y+=h){
			slots.push({
				i,
				x,
				y,
				w,
				h,
				a:false,
        c: color(0, 0,255),
        
			});
			i++;
		}
	}
	createSeq(len);
}

function resetSlots(){
  slots.forEach(s => {s.a = false;});
}

function createSeq(len){
  playing = false;
	seq = [];
  recordedSeq = [];
  currentSeqIndex = 0;
  expectedRecordedSeqIndex = 0;
	for(let i = 0; i < len; i++){
		seq.push(floor(random(0, slots.length)))
	}
  playSeq();
  
}

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
      
    
      //Checks if the user input is the same as the expected
      if(c.i == seq[expectedRecordedSeqIndex]){
        if(expectedRecordedSeqIndex == seq.length-1){
          
          win = 1;
          setTimeout(() => {createSeq(++len)}, interval*2);
        }
        expectedRecordedSeqIndex++;
      }else{
        
        //If its wrong gives 1 "strike" 3 strikes and you lose
        playing = false;
        lose --;
        
        if (lose==-3){
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
  background(220);
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
    }else if(win == -1){
      rect(width/2, height/2, 200, 70);
      fill('red');
      text('Incorrect !', width/2, height/2+10);
    }else if(lose==-3){
      rect(width/2, height/2, 400, 400);
      fill('red');
      text('You Lose !', width/2, height/2+10);
      playing=false;

    }
    pop();
	}
}