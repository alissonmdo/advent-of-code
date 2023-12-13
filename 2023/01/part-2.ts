const SPELLED = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
export default function solution(input: string) {
  const lineValues: number[] = [];
  let firstDigit = -1,
    lastDigit = -1;
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    // RESET ON NEW LINE
    if (curr === "\n") {
      lineValues.push(firstDigit * 10 + lastDigit);
      firstDigit = -1;
      lastDigit = -1;
      continue;
    }

    let num = Number(curr);
    // MOVE CURSOR ON LETTER
    if (Number.isNaN(num)) {
      let r = i;
      while (SPELLED.some((s) => s.startsWith(input.substring(i, r)))) {
        const spelledNumIndex = SPELLED.findIndex(
          (s) => s === input.substring(i, r)
        );
        if (spelledNumIndex > -1) {
          num = spelledNumIndex + 1;
        }
        r++;
      }
    }

    if (Number.isNaN(num)) {
      continue;
    }

    // FOUND DIGIT
    if (firstDigit === -1) firstDigit = lastDigit = num;
    else lastDigit = num;
  }
  lineValues.push(firstDigit * 10 + lastDigit);
  const total = lineValues.reduce((prev, curr) => prev + curr, 0);
  return total;
}
