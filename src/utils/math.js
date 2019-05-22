export const PI = Math.PI;
export const TAU = Math.PI * 2;
export const getDistance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

export const getAngle = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);

export const normalizeAngle = (angle) => {
  while (angle < 0) {
    angle += Math.PI * 2;
  }
  return angle % (Math.PI * 2);
}

export const toDegrees = (angle) => angle * 180 / Math.PI;

export const getShortAngle = (angle1, angle2) => {
  let diff = normalizeAngle(angle1) - normalizeAngle(angle2);

  if (diff > Math.PI)
    diff -= Math.PI * 2;
  if (diff < -Math.PI)
    diff += Math.PI * 2;

  return diff;
}

export const clamp = (value, min=0, max=1) => {
  return Math.max(min || 0, Math.min(max, value));
}

// 0x000000 -> #000000
export const rgbToHex = (rgb) => '#' + rgb.toString(16).padStart(6, '0').toUpperCase();

export function resolveAnchor(anchor) {
  const { x, y, control1, control2 } = anchor;
  const angle = getAngle(control1.x, control1.y, control2.x, control2.y);
  return {
    x,
    y,
    angle,
    lengthA: getDistance(x, y, control2.x, control2.y),
    lengthB: getDistance(x, y, control1.x, control1.y),
  };
}
