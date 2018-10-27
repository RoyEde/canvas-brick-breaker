export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const BALL_SIZE = 16;

export const BRICK_ROW = 8;

export const BRICK_WIDTH = GAME_WIDTH / BRICK_ROW;
export const BRICK_HEIGHT = 30;

export const PADDLE_LINE_WITH = 2;
export const BALL_LINE_WITH = 4;

export const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  GAMEWON: 4
};
