export const COLOR_THEME_LENGTH = 5;

const shadeColor = (color, percentage) => {
  const hex = parseInt(color.slice(1), 16);
  const t = percentage < 0 ? 0 : 255;
  const p = percentage < 0 ? percentage * -1 : percentage;
  const R = hex >> 16;
  const G = (hex >> 8) & 0x00ff;
  const B = hex & 0x0000ff;
  return `#${(
    0x1000000 +
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  )
    .toString(16)
    .slice(1)}`;
};

const makeShadedColors = (color, index) => shadeColor(color, index * -0.1);

const makeColor = color => ({
  fill: color.map(makeShadedColors)
});

const makeColors = (colors, index) =>
  colors.map(color => Array(index + 2).fill(color)).map(makeColor);

const THEMES = [
  ['#c0c999', '#fd96a9', '#c52184', '#470063', '#f9b4ed'],
  ['#1b998b', '#2d3047', '#fffd82', '#ff9b71', '#e84855'],
  ['#26547c', '#ff476f', '#ffd166', '#06d6ad', '#fcfcfc'],
  ['#523a34', '#b87d4b', '#e5b25d', '#f2dd6e', '#cff27e'],
  ['#54494b', '#7e8287', '#9da39a', '#b98389', '#db2955']
];

export const COLORS = THEMES.map(makeColors);
export const BASE_COLOR = { fill: '#fff', stroke: '#000' };
