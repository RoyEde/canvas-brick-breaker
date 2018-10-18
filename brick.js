import { BRICK_WIDTH, BRICK_HEIGHT, BRICK_LINE_WITH } from './constants';
import { COLOR_THEME_LENGTH, COLORS } from './themes';

export default class Brick {
  constructor(game, position) {
    this.width = BRICK_WIDTH;
    this.height = BRICK_HEIGHT;

    this.game = game;

    this.position = position;

    const { fill, stroke } = COLORS[game.level][
      Math.floor(Math.random() * COLOR_THEME_LENGTH)
    ];
    this.fill = fill;
    this.stroke = stroke;
  }

  update(deltaTime) {}

  draw(context) {
    const {
      width,
      height,
      position: { x, y }
    } = this;

    context.beginPath();
    context.fillStyle = this.fill;
    context.strokeStyle = this.stroke;
    context.lineWidth = BRICK_LINE_WITH;
    context.rect(x, y, width, height);
    context.stroke();
    context.fill();
    context.closePath();
  }
}
