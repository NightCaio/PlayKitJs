const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "fixed";
canvas.style.left = 0;
canvas.style.top = 0;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.imageRendering = "pixelated";
const ctx = canvas.getContext("2d");
canvas.style.background = "#000";
ctx.imageSmoothingEnabled = false;
var proportionWidth = window.innerWidth / canvas.width;
var proportionHeight = window.innerHeight / canvas.height;
//canvas.style.opacity = 0.3;

var motion = 0;

var camera = {
	x: 0,
	y: 0,
	follow: undefined,
	update: function(){
	  this.x = this.follow.body.position.x;
	  this.y = this.follow.body.position.y;
	}
}

var Cursor = {
	x: 0,
	y: 0,
  width: 1,
  height: 1,
	down: false
}

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine = Engine.create();
engine.gravity.y = 5;

var render = Render.create({
//	element: document.body,
  engine: engine,
});
//render.canvas.style.opacity = "0";
render.canvas.width = canvas.width;
render.canvas.height = canvas.height;

Render.run(render);
var runner = Runner.create();

const _screenrect = canvas.getBoundingClientRect();
const scaleX = canvas.width / _screenrect.width;
const scaleY = canvas.height / _screenrect.height;

addEventListener("mousemove", function(event) {
  Cursor.x = (event.clientX - _screenrect.left) * scaleX - camera.x;
  Cursor.y = (event.clientY - _screenrect.top) * scaleY - camera.y;
});

/*
let mouse = Matter.Mouse.create(engine.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {visible: true}
  }
});
Render.mouse = mouse;

Matter.World.add(engine.world,mouseConstraint);
*/



Runner.run(runner, engine);

var key = "";
var keys = "";

addEventListener("mousedown", (e) => {
	Cursor.down = true;
})

addEventListener("mouseup", (e) => {
	Cursor.down = false;
})

addEventListener("contextmenu", (e) => {
	e.preventDefault();
})

addEventListener("keydown", (e) => {
  key = e.key;
  if(!keys.includes(e.key)) keys+="key:"+e.key;
})

addEventListener("keyup", (e) => {
	keys = keys.replace("key:"+e.key,"");
})

class object {
  constructor(sprite, x, y, w=50, h=50, type, rt=true, cam=false) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.sprite = sprite;
    map_objects.push(this);
    this.img = new Image();
    this.img.src = this.sprite;
    this.body = undefined;
    this.angle = 0;
    this.canRotate = rt;
    this.camera = cam;
    this.grid = null
    if(this.camera) camera.follow = this;
    
    this._isStatic = type || false;
    
    this.body = Bodies.rectangle(this.x-this.width/2+canvas.width/2, this.y-this.height/2 + canvas.height/2, this.width, this.height, { isStatic : this._isStatic });
    Composite.add(engine.world, this.body);
    this.body.friction = 100;
    this.body.density = 50;
    this.body.mass = 50;
  }

  die() {
    this.width = 0;
  }
  
  addGrid(width, height){
    this.grid = new grid(width, height)
  }
  
  setSprite(sprite) {
    this.img.src = this.sprite;
  }

  draw() {
  	
  	//this.x = this.body.position.x - this.width/2;// - camera.x - this.width/2 + screen.width/2;
  	//this.y = this.body.position.y - this.height/2;// - camera.y - this.height/2 + screen.height/2;

    this.x = this.body.position.x - camera.x - this.width/2 + canvas.width/2;
  	this.y = this.body.position.y - camera.y - this.height/2 + canvas.height/2;
  	this.angle = this.body.angle;

    if(!this.canRotate) {
      Matter.Body.setAngularVelocity(this.body, 0);
      Matter.Body.setAngle(this.body, 0);
    }
  	
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x+this.width/2,this.y+this.height/2);
    ctx.rotate(this.angle);
    ctx.strokeStyle = "#fff";
    if(this.sprite == null) {
      ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
    }else{
      if(this.grid == null)
        ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
      else 
        ctx.drawImage(this.img, this.grid.x*this.grid.width, this.grid.y*this.grid.height, this.grid.width, this.grid.height, -this.width/2, -this.height/2, this.width, this.height);
    }
    ctx.translate(-this.x-this.width/2,-this.y-this.height/2);
    ctx.closePath();
    ctx.restore();
  }
}

class ball {
  constructor(sprite, x, y, r = 25, type) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.sprite = sprite;
    map_objects.push(this);
    this.img = new Image();
    this.img.src = this.sprite;
    this.body = undefined;
    this.angle = 0;
    this.canRotate = true;

    this._isStatic = type || false;

    /*

    this.body = Bodies.circle(
      this.x + screen.width / 2,
      this.y + screen.height / 2,
      this.radius/2,
      { isStatic: this._isStatic }
    );
    Composite.add(engine.world, this.body);
    this.body.friction = 100;
    this.body.density = 50;
    this.body.mass = 50;
    */

    console.warn("Balls are disabled on this version!!!");
  }

  die() {
    this.width = 0;
  }

  draw() {
    /*
    this.x = this.body.position.x - camera.x + screen.width/2;
    this.y = this.body.position.y - camera.y + screen.height/2;
    this.angle = this.body.angle;
  
    if (!this.canRotate) {
      Matter.Body.setAngularVelocity(this.body, 0);
      Matter.Body.setAngle(this.body, 0);
    }
  
    ctx.save();
    ctx.translate(this.x-this.radius/2,this.y-this.radius/2);
    ctx.rotate(this.body.angle);
    ctx.drawImage(this.img, -this.radius*2, -this.radius*2, this.radius, this.radius);
    ctx.translate(+this.x-this.radius/2,+this.y-this.radius/2);
    ctx.restore();
    */
  }  
}


class backdrop {
	constructor(sprite,x,y,w,h) {
		this.sprite = sprite;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.img = new Image();
    this.img.src = this.sprite;
    
    backdrop_objects.push(this);
	}
	
	draw() {
		ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.rotate(0 * Math.PI / 180);
    if(motion > 0) ctx.filter = "blur(" + motion + "px)";
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
    if(motion > 0) ctx.filter = 'blur(0px)';
    ctx.translate(-this.x,-this.y);
    ctx.closePath();
	}
}

class gui {
  constructor(x,y,w,h,c) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = c;
    this.text = "";
    this.isClick = false;

    this.self = document.createElement("div");
    this.self.style.width = this.width + "%";
    this.self.style.height = this.height + "%";
    this.self.style.position = "fixed";
    this.self.style.left = this.x + "%";
    this.self.style.top = this.y + "%";
    this.self.style.background = this.color;
    this.self.style.display = "flex";
    this.self.style.justifyContent = "center";
    this.self.style.alignItems = "center";
    this.self.style.userSelect = "none";
    document.body.appendChild(this.self);

    ui_elements.push(this);
  }

  draw() {
    this.self.style.width = this.width + "%";
    this.self.style.height = this.height + "%";
    this.self.style.position = "fixed";
    this.self.style.left = this.x + "%";
    this.self.style.top = this.y + "%";
    this.self.style.background = this.color;
    this.self.textContent = this.text;
  }

  content(text="",color="#fff"){
    this.text = text;
    this.self.style.color = color;
  }

  onClick(event="") {
    this.self.addEventListener("click",(e)=>{
      eval(event);
    });
    this.self.addEventListener("mousedown",(e)=>{
      this.isClick = true;
    });
    this.self.addEventListener("mouseup",(e)=>{
      this.isClick = false;
    });
    this.self.addEventListener("touchstart",(e)=>{
      this.isClick = true;
    });
    this.self.addEventListener("touchend",(e)=>{
      this.isClick = true;
    });
  }

  onHover(event="") {
    this.self.addEventListener("mousemove",(e)=>{
      eval(event);
    });
  }
}

class Media {
  constructor(src, loop=false) {
    this.audio = new AudioContext();
    this.src = src;
    this.loop = loop;
  }

  play() {
    const audioFile = this.src;
    fetch(audioFile)
      .then(response => response.arrayBuffer())
      .then(buffer => this.audio.decodeAudioData(buffer))
      .then(decodedData => {
        const source = this.audio.createBufferSource();
        source.buffer = decodedData;
        source.connect(this.audio.destination);
        source.start();
      })
      .catch(error => console.log(error));
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  Start();
  function __() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(!lastCalledTime) {
      lastCalledTime = Date.now();
      fps = 0;
   }
   delta = (Date.now() - lastCalledTime)/1000;
   lastCalledTime = Date.now();
   fps = parseInt(1/delta);

		for(var i = 0; i < backdrop_objects.length; i++) {
    	backdrop_objects[i].draw();
    }

    for (var i = 0; i < map_objects.length; i++) {
      map_objects[i].draw();
      if (map_objects[i].width <= 0) {
        map_objects.splice(i, 1);
        i--;
      }
    }
    

    if (ui_elements.length > 0) {
      for (i = 0; i < ui_elements.length; i++) {
        ui_elements[i].draw();
      }
    }
	  
	  if(camera.follow != undefined) camera.update();
	  requestAnimationFrame(__);
    requestAnimationFrame(Update);
  }
  requestAnimationFrame(__);
});


setTimeout(function() {
	SCENE_START = true;
},100);
