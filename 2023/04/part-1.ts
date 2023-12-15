export default function solution(input: string): string | number {
  let i = 0;
  let points = 0;
  while (i < input.length) {
    i += 7;
    while (input[i - 1] !== ":") {
      i++;
    }
    const winningNumbers = new Map();
    let isGameNumbers = false;
    let gamePoints = 0;
    while (input[i] !== "\n" && input[i] !== undefined) {
      if (input[i] === " ") {
        i++;
        continue;
      }
      if (input[i] === "|") {
        isGameNumbers = true;
        i++;
        continue;
      }
      let num = 0;
      while (!isNaN(parseInt(input[i]))) {
        num = num * 10 + Number(input[i]);
        i++;
      }
      if (!isGameNumbers) {
        winningNumbers.set(num, true);
      } else {
        if (winningNumbers.get(num)) {
          gamePoints = gamePoints === 0 ? 1 : gamePoints * 2;
        }
      }
    }
    points += gamePoints;
  }
  return points;
}
