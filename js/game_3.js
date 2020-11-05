let seq, rows, cols, slots, interval, playing, recordedSeq, currentSeqIndex, expectedRecordedSeqIndex, win, lose;
lose=0, score=0;
function setup() {
	cols = 3;
	rows = 3;
	len = 2;
  interval = 1000;
  playing = false;
  
  createCanvas(1000,1000);
  
	let w = 600/cols ;
	let h = 600/rows;
	let i = 0;
	slots = [];
	for(let x = 200; x < 800; x+=w){
		for(let y = 200; y < 800; y+=h){
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
          score++;
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
  fill('black');
  rect(410, 100, 200, 70);
  textAlign(CENTER);
  textSize(50);
  fill('white')
  text('Score: ', width/2 , 150);
  text(score, width/2+75 , 150)
  //background(0);
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
      fill('white');
      

    }else if(win == -1){
      rect(width/2, height/2, 200, 70);
      fill('red');
      text('Incorrect !', width/2, height/2+10);
    }else if(lose==-3){
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