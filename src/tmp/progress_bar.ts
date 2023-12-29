export function generate(progress: number, length = 16): string {
  const [LIGHT, MEDIUM, DARK] = ["░", "▒", "▓"];

  if (progress <= 0) {
    return LIGHT.repeat(length);
  }
  if (progress >= 100) {
    return DARK.repeat(length);
  }

  const possibleBars = 2 * length + 1;
  const delta = 100 / (possibleBars - 1);
  const correspondingBarId = Math.floor((progress + (delta / 2)) / delta) + 1;
  const darks = Math.floor((correspondingBarId - 1) / 2);
  const putMedium = correspondingBarId % 2 == 0;

  const bar = Array.from({ length }, (_) => LIGHT);
  for (let i = 0; i < darks; ++i) {
    bar[i] = DARK;
  }
  if (putMedium && darks < length) {
    bar[darks] = MEDIUM;
  }

  if (bar[0] === LIGHT) {
    bar[0] = MEDIUM;
  }
  if (bar[length - 1] === DARK) {
    bar[length - 1] = MEDIUM;
  }

  return bar.join("");
}
