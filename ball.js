import { BALL_LINE_WITH } from './constants';
import { BASE_COLOR } from './themes';

export default class Ball {
  constructor({ gameWidth, gameHeight, paddle }, size) {
    this.size = size;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.paddle = paddle;

    this.position = {
      x: Math.round(Math.random() * (gameWidth - size) + size),
      y: gameHeight / 2
    };

    this.speed = {
      x: 2,
      y: 2
    };
  }

  draw(context) {
    const {
      size,
      position: { x, y }
    } = this;
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.strokeStyle = BASE_COLOR.stroke;
    context.lineWidth = BALL_LINE_WITH;
    context.stroke();
    context.closePath();
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (
      this.position.x > this.gameWidth - this.size ||
      this.position.x < this.size
    ) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y < this.size) {
      this.speed.y = -this.speed.y;
    }

    const bottomOfBall = this.position.y + this.size;
    const topOfPaddle = this.paddle.position.y;
    const leftSidePaddle = this.paddle.position.x;
    const rightSidePaddle = this.paddle.position.x + this.paddle.width;

    if (
      bottomOfBall >= topOfPaddle &&
      this.position.x >= leftSidePaddle &&
      this.position.x + this.size <= rightSidePaddle
    ) {
      this.speed.y = -this.speed.y;
      this.position.y = this.paddle.position.y - this.size;
    }
  }
}
