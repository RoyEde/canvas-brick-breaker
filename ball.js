import { BALL_LINE_WITH } from './constants';
import { BASE_COLOR } from './themes';
import { detectCollision } from './collisionDetection';

export default class Ball {
  constructor({ gameWidth, gameHeight, paddle, level }, size) {
    this.size = size;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.paddle = paddle;

    this.position = {
      x: Math.ceil((Math.random() * gameWidth) / 1.1),
      y: gameHeight / 2
    };

    this.speed = {
      x: level * 0.3 + 2.5,
      y: level * 0.3 + 2.5
    };
  }

  draw(context) {
    const {
      size,
      position: { x, y }
    } = this;
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fillStyle = BASE_COLOR.fill;
    context.strokeStyle = BASE_COLOR.stroke;
    context.lineWidth = BALL_LINE_WITH;
    context.stroke();
    context.fill();
    context.closePath();
  }

  update() {
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

    if (detectCollision(this, this.paddle)) {
      this.speed.y = Math.round(Math.random() + 0.1)
        ? (this.speed.y += 0.4)
        : (this.speed.y -= 0.2);
      this.speed.y = -this.speed.y;
      this.position.y = this.paddle.position.y - this.size;
    }
  }
}
