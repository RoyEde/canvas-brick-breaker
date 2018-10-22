import Brick from './brick';
import { BRICK_HEIGHT, BRICK_WIDTH, BRICK_ROW } from './constants';

const makeEven = row => row.map((_, index) => index % 2 === 0);

const makeOdd = row => makeEven(row).map(val => !val);

const makeRow = row =>
  Math.round(Math.random())
    ? Math.round(Math.random())
      ? makeEven(row)
      : makeOdd(row)
    : row;

const makeLevel = level =>
  Array(level + 4)
    .fill(Array(BRICK_ROW).fill(true))
    .map(makeRow);

export const buildLevel = game =>
  makeLevel(game.level)
    .map((row, rowIndex) =>
      row
        .map(
          (brick, brickIndex) =>
            brick
              ? new Brick(game, {
                  x: BRICK_WIDTH * brickIndex,
                  y: BRICK_HEIGHT * rowIndex
                })
              : null
        )
        .filter(brick => brick)
    )
    .reduce((acc, val) => acc.concat(val), []);
