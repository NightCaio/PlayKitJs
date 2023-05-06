class grid {
  constructor(width, height){
    this.x = 0
    this.y = 0
    this.width = width
    this.height = height
  }
}

class Button {
  constructor(html){
    this.html = html
    this.down = false
    this.up = false 
    this.pressed = false
    this.x = 0
    this.y = 0
    this.startX = 0
    this.startY = 0
    
    this.html.ontouchstart = (e)=>{
      const touch = Array.from(e.touches).find(t => t.target === this.html);
      if (touch) {
        this.startX = touch.clientX
        this.startY = touch.clientY
        this.down = true
        this.pressed = true
      }
    }
    this.html.ontouchend = (e)=>{
      const touch = Array.from(e.touches).find(t => t.target === this.html);
      if (touch) {
        this.up = true
        this.pressed = false
      }
    }
    this.html.ontouchmove = (e)=>{
      const touch = Array.from(e.touches).find(t => t.target === this.html);
      if (touch) {
        const x = touch.clientX
        const y = touch.clientY
        this.x = x
        this.y = y
      }
    }
  }
  onclick(f){
    this.html.ontouchstart = (e)=>{
      const touch = Array.from(e.touches).find(t => t.target === this.html);
      if (touch) {
        this.down = true
        this.pressed = true
        const x = touch.clientX
        const y = touch.clientY
        this.startX = x
        this.startY = y
        f({x: x, y: y})
      }
    }
  }
  onend(f){
    this.html.ontouchend = (e)=>{
      const touch = Array.from(e.touches).find(t => t.target === this.html);
      if (touch && touch != undefined) {
        this.up = true
        this.pressed = false
        const x = touch.clientX
        const y = touch.clientY
        f({x: x, y: y})
      }
    }
  }
  onmove(f){
    this.html.ontouchmove = (e)=>{
      const touch = Array.from(e.touches).find(t => t.target === this.html);
      if (touch) {
        const x = touch.clientX
        const y = touch.clientY
        this.x = x
        this.y = y
        f({x: x, y: y})
      }
    }
  }
  update(){
    this.down = false 
    this.up = false
  }
}

class GUI {
  constructor(self) {
    if(self.image != null){
      this.element = document.createElement('img');
      this.element.src = self.image;
    } else {
      this.element = document.createElement('div')
    }
    delete self.image;
    document.body.appendChild(this.element);
    for (let prop in self) {
      this.element.style[prop] = self[prop];
    }
    this.input = new Button(this.element)
  }
}

function calc(startX, startY, x, y, rad){
  with(Math){
    const distance = sqrt(pow(x - startX, 2)+pow(y - startY, 2))
    if(distance <= rad){
      return {x: x, y: y}
    }
    const angulo = atan2(y - startY, x - startX)
    return {
      x: startX + rad * cos(angulo),
      y: startY + rad * sin(angulo),
      a: angulo * 180 / Math.PI
    }
  }
}