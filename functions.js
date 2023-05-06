function resize(w, h){
  const swidth = window.innerWidth
  const sheight = window.innerHeight

  var screenW = swidth * h < sheight * w ? swidth : w*sheight/h
  var screenH = swidth * h < sheight * w ? h*swidth/w : sheight
  
  canvas.style.width = screenW + 'px'
  canvas.style.height = screenH + 'px'
  canvas.width = screenW
  canvas.height = screenH
  canvas.position= 'fixed'
  canvas.style.left = swidth / 2 - screenW/2 + 'px'
  canvas.style.top = sheight / 2 - screenH/2 + 'px'
}


function randomColor() {
  r = Math.random() * 255;
  g = Math.random() * 255;
  b = Math.random() * 255;
  return "rgb(" + r + "," + g + "," + b + ")"
}

function colliding(obj1, obj2) {
  var obj1x = obj1.x - obj1.width/2;
  var obj1y = obj1.y - obj1.height/2;
  var obj2x = obj2.x - obj2.width/2;
  var obj2y = obj2.y - obj2.height/2;
  
  return obj1x < obj2x + obj2.width &&
         obj1x + obj1.width > obj2x &&
         obj1y < obj2y + obj2.height &&
         obj1y + obj1.height > obj2y;
}

function colliding_ui(obj1, obj2) {
  var obj1x = obj1.x - obj1.width/2;
  var obj1y = obj1.y - obj1.height/2;
  var obj2x = obj2.x - obj2.width/2;
  var obj2y = obj2.y - obj2.height/2;
  
  return obj1x < obj2x + obj2.width + obj2.width/2 &&
         obj1x + obj1.width + obj1.width/2 > obj2x &&
         obj1y < obj2y + obj2.height + obj2.height/2 &&
         obj1y + obj1.height + obj1.height/2 > obj2y;
}



function Noir(color=0) {
  canvas.style.filter = "grayscale(" + color + "%)";
}

function Bright(color=100) {
  canvas.style.filter = "brightness(" + color + "%)";
}

function Shadow(size=0) {
	ctx.shadowColor = "#000";
	ctx.shadowBlur = size;
}

function Vignette(size="50", color="#000") {
	document.getElementById("vignette").style.boxShadow = "inset 0px 0px " + (size) + "px " + color;
}

function DOF(pixels=0) {
  ctx.filter = motion = pixels;
}

function screenResolution(width=innerWidth, height=innerHeight) {
	canvas.width = width;
	canvas.height = height;
  var proportionWidth = window.innerWidth / canvas.width;
  var proportionHeight = window.innerHeight / canvas.height;
}



function applyForce(object, fx=null, fy=null) {
	var forceX = fx;
	var forceY = fy;
	if(forceX == null) forceX = object.body.velocity.x;
	if(forceY == null) forceY = object.body.velocity.y;
	
	Matter.Body.applyForce(object.body, object.body.position, {x: fx, y: fy});
}

function setVelocity(obj, x, y){
  x = x == null ? obj.body.velocity.x : x;
  y = y == null ? obj.body.velocity.y : y;
  Matter.Body.setVelocity(obj.body, {x: x, y: y});
}

function setPosition(obj, x, y){
      x = x == null ? obj.body.position.x : x;
      y = y == null ? obj.body.position.y : y;
      Matter.Body.setPosition(obj.body, {x: x, y: y});
}

function setGravity(force=5) {
	if(MODE == "GAME") engine.gravity.y = force;
}

function setMass(object, mass=1) {
  if(MODE == "GAME") Matter.Body.setMass(object.body, mass);
}

function setAngle(object, angle=0) {
  if(MODE == "GAME") Matter.Body.setAngle(object.body, angle);
}

function isOnGround(object) {
  let collisions = Matter.Query.collides(object.body, Matter.Composite.allBodies(engine.world));
  return collisions.some((collision) => collision.bodyB.isStatic);
}


function iskeyDown(key="") {
	return (keys.includes("key:" + key));
}