function isNumber(str: string) {
  return !isNaN(parseInt(str));
}

export default function solution(input: string): string | number {
  const lines = input.split("\n");
  const hash = new Map();
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char !== "*") {
        continue;
      }
      const numbers = [];
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          if (isNumber(lines[i + k][j + l]) && !hash.get(`${i + k},${j + l}`)) {
            let num = 0;
            let m = j + l;
            while (isNumber(lines[i + k][m - 1])) {
              m--;
            }
            while (isNumber(lines[i + k][m])) {
              hash.set(`${i + k},${m}`, true);
              num = num * 10 + parseInt(lines[i + k][m]);
              m++;
            }
            numbers.push(num);
          }
        }
      }
      if (numbers.length === 2) {
        sum += numbers[0] * numbers[1];
      }
    }
  }
  return sum;
}
