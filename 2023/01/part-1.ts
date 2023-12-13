export default function solution(input: string) {
  const lineValues: number[] = [];
  let firstDigit = -1;
  let lastDigit = -1;
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    if (curr === "\n") {
      lineValues.push(firstDigit * 10 + lastDigit);
      firstDigit = -1;
      lastDigit = -1;
      continue;
    }
    const num = Number(curr);
    if (Number.isNaN(num)) continue;
    if (firstDigit === -1) firstDigit = lastDigit = num;
    else lastDigit = num;
  }
  lineValues.push(firstDigit * 10 + lastDigit);
  const total = lineValues.reduce((prev, curr) => prev + curr, 0);
  return total;
}
