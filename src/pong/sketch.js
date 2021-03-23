let over, respawnTime, m;
let ball, paddles, hit;

function preload() {
  hit = loadSound("assets/hit.mp3");
  win = loadSound("assets/win.mp3");
}

function setup() {
  createCanvas(500, 400);
  textSize(72);
  textAlign(CENTER, CENTER);
  noStroke();
  restart();
}

function restart() {
  over = false;
  respawmTime = 1000;
  ball = new Ball(10)
  paddles = [new Paddle(20, 12, 80, [87, 83]), new Paddle(width - 20, 12, 80, [UP_ARROW, DOWN_ARROW])];
}

function reset() {
  m = millis()
  if (ball.side == 0) {
    paddles[0].score += 1;
  } else {
    paddles[1].score += 1;
  }
  ball = null;
  if (paddles[0].score > 4 || paddles[1].score > 4) {
    win.play();
    over = true;
    respawmTime = 2000;
  }
}

function draw() {
  background(30);

  if (ball) {
    ball.update();
    ball.checkCollision(paddles);
    ball.show();
    if (ball.checkGameOver()) {
      reset();
    }
  } else {
    if (millis() > m + respawmTime) {
      ball = new Ball(10);
      if (over) {
        restart();
      }
    }
  }

  for (let i = 0; i < paddles.length; i++) {
    if (!over) {
      paddles[i].update();
      paddles[i].show();
    }
  }

  for (let i = 8; i < height; i += height / 10) {
    fill(220, 50)
    rect(width / 2 - 5, i, 10, height / 16, 10);
  }
  text(paddles[0].score, width / 4, height / 4);
  text(paddles[1].score, 3 * width / 4, height / 4);
}
