class Ball {
  constructor(r, speed = 5) {
    this.r = r;
    this.pos = createVector(width / 2, height / 2);
    this.side = random([0, 1]);
    this.vel = p5.Vector
      .fromAngle(PI * this.side + random(-PI / 5, PI / 5), speed)
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.y + this.r > height || this.pos.y - this.r < 0) {
      this.vel.y *= -1;
    }
  }

  checkGameOver() {
    return (this.pos.x + this.r > width || this.pos.x - this.r < 0)
  }

  checkCollision(p) {
    if ((this.side == 0 && this.pos.x + this.r >= p[1].pos.x && this.pos.y > p[1].pos.y && this.pos.y < p[1].pos.y + p[1].h) || (this.side == 1 && this.pos.x - this.r <= p[0].pos.x + p[0].w && this.pos.y > p[0].pos.y && this.pos.y < p[0].pos.y + p[0].h)) {
      this.vel.x *= -1;
      this.vel.rotate(random(-PI / 10, PI / 10));
      hit.rate(random(0.9, 1.1));
      hit.play()
      this.side = 1 - this.side;
    }
  }

  show() {
    fill(220);
    circle(this.pos.x, this.pos.y, 2 * this.r);
  }
}