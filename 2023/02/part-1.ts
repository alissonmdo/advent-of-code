const COLORS = ["red", "green", "blue"];
const LIMITS = [12, 13, 14];

function isNumber(char: string): boolean {
  if (char === undefined) return false;
  return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

export default function solution(input: string): string | number {
  let i = 0;
  let gameIdSum = 0;
  while (i < input.length) {
    let gameId = 0;
    i += 5;
    while (isNumber(input[i])) {
      gameId = gameId * 10 + Number(input[i]);
      i++;
    }
    i += 2;

    let isGamePossible = true;
    cubeAmountCheckLoop: while (isGamePossible) {
      let amount = 0;
      while (isNumber(input[i])) {
        amount = amount * 10 + Number(input[i]);
        i++;
      }
      i++;
      const colorIndex = COLORS.findIndex((c) => c.startsWith(input[i]));
      if (LIMITS[colorIndex] < amount) {
        isGamePossible = false;
        break cubeAmountCheckLoop;
      }
      while (!isNumber(input[i])) {
        if (input[i] === undefined || input[i] === "\n") {
          break cubeAmountCheckLoop;
        }
        i++;
      }
    }
    if (isGamePossible) {
      gameIdSum += gameId;
    }
    while (input[i - 1] !== "\n" && input[i - 1] !== undefined) {
      i++;
    }
  }

  return gameIdSum;
}
