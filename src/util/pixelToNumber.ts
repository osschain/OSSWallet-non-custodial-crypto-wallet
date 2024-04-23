export const pixelToNumber = (pixel: string) => {
  const numberStr = pixel.slice(0, -2);
  return Number(numberStr);
};
