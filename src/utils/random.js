export const randomRange = (from, to, { isInteger = false } = {}) => {
  const result = Math.random() * (from - to) + from;
  if (isInteger) {
    return Math.round(result);
  }
  return result;
}
