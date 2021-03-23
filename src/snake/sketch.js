let apple;
let gap = 15; //gap between grid lines
let snake;
let pLoc = {};
let highest = 0;
let game_over = new Audio('assets/game_over.mp3');
let eat = new Audio('assets/eat.mp3');

function setup() {
    createCanvas(405, 495);
    apple = new Fruit();
    snake = new Head();
    frameRate(12);
    textSize(14);
    textStyle(BOLD);

    for (let i = 0; i < 2; i++) {
        snake.tails.push(new Tail(snake.x, snake.y + (15 * i)));
    }
}

function draw() {
    background(170, 204, 102);

    //Grid, only for reference, not required for game to work. Comment noStroke(); to display
    noFill();
    noStroke();
    for (let i = 0; i < height; i += gap) {
        for (let j = 0; j < width; j += gap) {

            rect(j, i, gap, gap);

        }
    }
    //
    for (let i = snake.tails.length - 1; i >= 0; i--) {
        if (i == 0) {
            snake.tails[i].x = snake.x;
            snake.tails[i].y = snake.y;
        } else {
            snake.tails[i].x = snake.tails[i - 1].x;
            snake.tails[i].y = snake.tails[i - 1].y;
        }
        snake.tails[i].show();
    }


    pLoc.x = snake.x;
    pLoc.y = snake.y;
    snake.update();

    if (snake.collision(apple)) {
        eat.play();
        snake.score++;
        apple.eat();
        snake.tails.push(new Tail(pLoc.x, pLoc.y));
    }
    if (snake.score > highest) {
        highest = snake.score;
    }
    if (snake.collision(apple) == false || snake.tail_collide() == true) {
        game_over.play();
        snake.redefine();
        apple.eat();
    }

    apple.show();

    fill(43, 51, 25);
    text("Score: " + int(snake.score), 10, height - 25);
    text("Highest: " + int(highest), 10, height - 10);
    snake.show();
    noFill();
    strokeWeight(4);
    stroke(43, 51, 25);
    rect(1, 1, width - 2, height - 2);

}

function keyPressed() {
    if (keyCode == LEFT_ARROW && snake.dir != 'right') {
        snake.dir = 'left';
    } else if (keyCode == RIGHT_ARROW && snake.dir != 'left') {
        snake.dir = 'right';
    } else if (keyCode == UP_ARROW && snake.dir != 'down') {
        snake.dir = 'up';
    } else if (keyCode == DOWN_ARROW && snake.dir != 'up') {
        snake.dir = 'down';
    }
}
