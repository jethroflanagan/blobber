export const getDistance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

export const getAngle = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);

export const normalizeAngle = (angle) => {
  while (angle < 0) {
    angle += Math.PI * 2;
  }
  return angle % (Math.PI * 2);
}
