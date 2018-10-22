import Paddle from './paddle';
import Ball from './ball';
import InputHandler from './input';

import { BALL_SIZE } from './constants';
import { buildLevel } from './levels';

export const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.level = 0;
    this.gameState = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this, BALL_SIZE);
    this.gameObjects = [];
    this.bricks = buildLevel(this);
    this.lives = 3;
    new InputHandler(this);
  }

  start() {
    this.gameState = GAMESTATE.RUNNING;
    this.gameObjects = [this.ball, this.paddle];
  }

  update() {
    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU
    ) {
      return;
    }

    [...this.gameObjects, ...this.bricks].forEach(object => object.update());
    this.bricks = this.bricks.filter(object => !object.markedForDeletion);

    if (!this.bricks.length) {
      this.level++;
      this.paddle = new Paddle(this);
      this.ball = new Ball(this, BALL_SIZE);
      this.gameObjects = [this.ball, this.paddle];
      this.bricks = buildLevel(this);
    }
  }

  draw(context) {
    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.draw(context)
    );

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU
    ) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = '#000000cc';
      context.fill();
      context.font = '60px Arial';
      context.fillStyle = '#fff';
      context.textAlign = 'center';
      context.fillText(
        (this.gameState === GAMESTATE.PAUSED && 'Paused') ||
          (this.gameState === GAMESTATE.MENU && 'Press SPACEBAR to start'),
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
  }

  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }
}
