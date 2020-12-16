var data,keycount;
var n=0;
var imgList = [];
var posY;
var posN;
var posP;
var posBU,posBD;
var canvas;

function preload(){
	data = loadJSON("time.json")
	for(i=0;i<93;i++){
		imgList[i]=loadImage("images/"+"1927_"+i+".jpg")
	}

}

function windowResized(){

  resizeCanvas(displayWidth, displayHeight);
	setup()
}
function setup() {

	canvas= createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style('z-index','-1');

  background(255);
	posY=createVector(width/3,height/2);
	posN=createVector(width/1.5,height/3);
	posP=createVector(width/2,height/2);
	posBU=createVector(width/3.5,height/4);
  posBD=createVector(width/3.5,height/1.4);
	keycount = Object.keys(data).length-1;


}


function draw() {

	if(data){
	background(255);
	main();
  }
}

function main(){
	let heightspace=100
  textFont('Georgia')
	//year
	textSize(100)
	textAlign(RIGHT)
	fill(0)
	text(data[n].Year,posY.x,posY.y)
	fill(0,100)
	if (n-1>=0){
		text(data[n-1].Yeartail,posY.x,posY.y-heightspace)
	}
	if (n+1<=keycount){
		text(data[n+1].Yeartail,posY.x,posY.y+heightspace)
	}
	//name and description
	textAlign(LEFT)
	fill(0)
	textSize(25)
  text(data[n].Name,posN.x,posN.y)
	textSize(15)
	text(data[n].Description,posN.x,posN.y+50,width/5,height/5)
	//images
	imageMode(CENTER);
	let distX=abs(mouseX-posP.x)<width/10
	let distY=abs(mouseY-posP.y)<height/4
	if (mouseIsPressed&&distX&&distY){
		image(imgList[n], posP.x,posP.y,width/5*1.5,height/2*1.5)
	}
	else {
		image(imgList[n], posP.x,posP.y,width/5,height/2)
	}
	fill(150)
	noStroke()
	triangle(posBU.x,posBU.y, posBU.x-20, posBU.y+20, posBU.x+20, posBU.y+20);
	triangle(posBD.x,posBD.y, posBD.x+20, posBD.y-20, posBD.x-20, posBD.y-20);

}
function mouseWheel(event) {
	if(event.delta>0){
	n += 1;}
	else n-=1;
  overflow()

}
function mouseDragged(event) {
  let dy = mouseY - pmouseY;
	let dyA = abs(dy)>30

	if(dy>0&&dyA){
	 n-=1
	}
	else if(dy<0&&dyA){
	 n+=1
	}
	overflow()
}
function mousePressed(){
	let dUp=dist(mouseX,mouseY,posBU.x,posBU.y)<50
	let dDown=dist(mouseX,mouseY,posBD.x,posBD.y)<50
	if(dUp){
		n-=1
	}

	//page 2 restart botton
	if(dDown){
		n+=1

	}
	else{value=0}
	overflow()
}



function overflow(){
	if(n<0){
	n=0}
	if(n>keycount){
	n=keycount}
 console.log(n)

}
