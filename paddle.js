import { PADDLE_LINE_WITH } from './constants';
import { BASE_COLOR } from './themes';

export default class Paddle {
  constructor({ gameWidth, gameHeight }) {
    this.gameWidth = gameWidth;

    this.width = 150;
    this.height = 30;

    this.maxSpeed = 7;
    this.speed = 0;

    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 10
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(context) {
    const {
      position: { x, y },
      width,
      height
    } = this;
    context.beginPath();
    context.strokeStyle = BASE_COLOR.stroke;
    context.lineWidth = PADDLE_LINE_WITH;
    context.strokeRect(x, y, width, height);
    context.closePath();
  }

  update() {
    this.position.x += this.speed;
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x > this.gameWidth - this.width)
      this.position.x = this.gameWidth - this.width;
  }
}
