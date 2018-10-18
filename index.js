import Game from './game';

import { GAME_WIDTH, GAME_HEIGHT } from './constants.js';
import { BASE_COLOR } from './themes';

const canvas = document.getElementById('gameScreen');
const context = canvas.getContext('2d');

context.fillStyle = BASE_COLOR.fill;
context.strokeStyle = BASE_COLOR.stroke;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();

let lastTime = 0;

const gameLoop = timeStamp => {
  const deltaTime = timeStamp - lastTime;

  lastTime = timeStamp;

  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(context);

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
