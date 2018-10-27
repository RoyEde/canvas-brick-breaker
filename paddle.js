import { PADDLE_LINE_WITH } from './constants';
import { BASE_COLOR } from './themes';

export default class Paddle {
  constructor({ gameWidth, gameHeight, lives }) {
    this.gameWidth = gameWidth;

    this.width = 150;
    this.height = 30;

    this.maxSpeed = 7;
    this.speed = 0;

    this.heartSize = 26;

    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 10
    };

    this.lives = lives;
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

  drawLives(context, { x, y }, fill = false) {
    const { heartSize } = this;
    context.beginPath();
    context.fillStyle = '#a90000';
    context.moveTo(x, y + heartSize / 4);
    context.quadraticCurveTo(x, y, x + heartSize / 4, y);
    context.quadraticCurveTo(
      x + heartSize / 2,
      y,
      x + heartSize / 2,
      y + heartSize / 4
    );
    context.quadraticCurveTo(x + heartSize / 2, y, x + (heartSize * 3) / 4, y);
    context.quadraticCurveTo(
      x + heartSize,
      y,
      x + heartSize,
      y + heartSize / 4
    );
    context.quadraticCurveTo(
      x + heartSize,
      y + heartSize / 2,
      x + (heartSize * 3) / 4,
      y + (heartSize * 3) / 4
    );
    context.lineTo(x + heartSize / 2, y + heartSize);
    context.lineTo(x + heartSize / 4, y + (heartSize * 3) / 4);
    context.quadraticCurveTo(x, y + heartSize / 2, x, y + heartSize / 4);
    fill && context.fill();
    context.stroke();
    context.closePath();
  }

  draw(context) {
    const {
      position: { x, y },
      width,
      height,
      lives,
      heartSize
    } = this;
    context.beginPath();
    context.strokeStyle = BASE_COLOR.stroke;
    context.lineWidth = PADDLE_LINE_WITH;
    context.strokeRect(x, y, width, height);
    context.closePath();

    for (let i = 0; i < 3; i++) {
      this.drawLives(
        context,
        { x: x + (width / 3) * i + heartSize / 2, y: y + 2 },
        i < lives
      );
    }
  }

  update() {
    this.position.x += this.speed;
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x > this.gameWidth - this.width)
      this.position.x = this.gameWidth - this.width;
  }
}
