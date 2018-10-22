import { GAMESTATE } from './game';

export default class InputHandler {
  constructor(game) {
    document.addEventListener('keydown', ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          game.paddle.moveLeft();
          break;
        case 39:
          game.paddle.moveRight();
          break;
      }
    });

    document.addEventListener('keyup', ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          if (game.paddle.speed < 0) game.paddle.stop();
          break;
        case 39:
          if (game.paddle.speed > 0) game.paddle.stop();
          break;
        case 27:
          game.togglePause();
          break;
        case 32:
          if (game.gameState !== GAMESTATE.RUNNING) {
            game.start();
          }
          break;
      }
    });
  }
}
