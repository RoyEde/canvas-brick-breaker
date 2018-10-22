import { BRICK_WIDTH, BRICK_HEIGHT } from './constants';
import { COLOR_THEME_LENGTH, COLORS } from './themes';
import { detectCollision } from './collisionDetection';

export default class Brick {
  constructor({ ball, level }, position) {
    this.width = BRICK_WIDTH;
    this.height = BRICK_HEIGHT;

    this.ball = ball;

    this.position = position;

    this.markedForDeletion = false;
    this.hitStand = Math.floor(Math.random() * (level + 2));

    const { fill } = COLORS[level][
      Math.floor(Math.random() * COLOR_THEME_LENGTH)
    ];

    this.fill = fill;
  }

  update() {
    if (detectCollision(this.ball, this)) {
      this.ball.speed.y = Math.abs(this.ball.speed.y);
      if (this.hitStand) {
        this.hitStand--;
      } else {
        this.markedForDeletion = true;
      }
    }
  }

  draw(context) {
    const {
      width,
      height,
      position: { x, y }
    } = this;

    context.beginPath();
    context.fillStyle = this.fill[this.hitStand];
    context.rect(x, y, width, height);
    context.fill();
    context.closePath();
  }
}
