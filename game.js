import Paddle from './paddle';
import Ball from './ball';
import InputHandler from './input';

import { BALL_SIZE } from './constants';
import { buildLevel } from './levels';

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.level = 0;
  }

  start() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this, BALL_SIZE);

    const bricks = buildLevel(this);

    this.gameObjects = [this.ball, this.paddle, ...bricks];

    new InputHandler(this.paddle);
  }

  update(deltaTime) {
    this.gameObjects.forEach(object => object.update(deltaTime));
  }

  draw(context) {
    this.gameObjects.forEach(object => object.draw(context));
  }
}
