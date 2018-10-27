import Paddle from './paddle';
import Ball from './ball';
import InputHandler from './input';

import { BALL_SIZE, GAMESTATE } from './constants';
import { buildLevel } from './levels';

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this, BALL_SIZE);
    new InputHandler(this);
    this.restart();
  }

  restart() {
    this.level = -1;
    this.gameState = GAMESTATE.MENU;
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;
  }

  start() {
    this.gameState = GAMESTATE.RUNNING;
    this.gameObjects = [this.ball, this.paddle];
  }

  update() {
    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER
    ) {
      return;
    }

    [...this.gameObjects, ...this.bricks].forEach(object => object.update());
    this.bricks = this.bricks.filter(object => !object.markedForDeletion);

    if (!this.lives) {
      this.gameState = GAMESTATE.GAMEOVER;
    }

    if (!this.bricks.length) {
      this.level++;
      this.paddle = new Paddle(this);
      this.ball = new Ball(this, BALL_SIZE);
      this.gameObjects = [this.ball, this.paddle];
      this.bricks = buildLevel(this);
    }
  }

  draw(context) {
    context.font = '28px "Press Start 2P"';
    context.textAlign = 'center';

    context.beginPath();
    context.fillStyle = '#000';
    context.fillText(this.level + 1, this.gameWidth / 2, this.gameHeight / 2);
    context.closePath();

    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.draw(context)
    );

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER
    ) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = '#000000cc';
      context.fill();
      context.fillStyle = '#fff';
      context.fillText(
        (this.gameState === GAMESTATE.PAUSED && 'Paused') ||
          (this.gameState === GAMESTATE.MENU && 'Press SPACEBAR to start') ||
          (this.gameState === GAMESTATE.GAMEOVER && 'GAME-OVER'),
        this.gameWidth / 2,
        this.gameHeight / 2 - 56
      );
      context.fillText(
        (this.gameState === GAMESTATE.PAUSED && 'Press ESC or SPACEBAR') ||
          (this.gameState === GAMESTATE.MENU && 'Press ESC to pause') ||
          (this.gameState === GAMESTATE.GAMEOVER && 'Press ENTER to reset'),
        this.gameWidth / 2,
        this.gameHeight / 2
      );
      context.fillText(
        (this.gameState === GAMESTATE.PAUSED && 'to resume') ||
          (this.gameState === GAMESTATE.MENU && 'ENTER while paused to reset'),
        this.gameWidth / 2,
        this.gameHeight / 2 + 56
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
