export const detectCollision = (ball, gameObject) => {
  const bottomOfBall = ball.position.y + ball.size;
  const topOfBall = ball.position.y - ball.size;
  const rightOfBall = ball.position.x + ball.size;
  const leftOfBall = ball.position.x;

  const bottomOfGameObject = gameObject.position.y + gameObject.height;
  const topOfGameObject = gameObject.position.y;
  const rightOfGameObject = gameObject.position.x + gameObject.width;
  const leftOfGameObject = gameObject.position.x;

  return (
    bottomOfBall >= topOfGameObject &&
    topOfBall <= bottomOfGameObject &&
    leftOfBall >= leftOfGameObject &&
    rightOfBall <= rightOfGameObject
  );
};
