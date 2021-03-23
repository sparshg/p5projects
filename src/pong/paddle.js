class Paddle {
  constructor(x, w, h, keys) {
    this.pos = createVector(x - w / 2, (height - h) / 2);
    this.h = h;
    this.w = w;
    this.score = 0;
    this.keys = keys;
  }

  update() {
    if (keyIsDown(this.keys[1]) && this.pos.y + this.h < height) {
      this.pos.y += 4;
    } else if (keyIsDown(this.keys[0]) && this.pos.y > 0) {
      this.pos.y -= 4;
    }
  }

  show() {
    fill(255);
    rect(this.pos.x, this.pos.y, this.w, this.h, 8);
  }
}