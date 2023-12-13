import { readFileSync } from "fs";

try {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    throw new Error(
      `Expected 1 argument, but got ${args.length} (${args.join(", ")})`
    );
  }
  const [year, day, part] = args[0].split("/");
  console.clear();
  console.log(
    `🚀 Advent of Code ${year} - Day ${day}${part ? ` - Part ${part}` : ""}`
  );

  const input = readFileSync(
    `${__dirname}/../${year}/${day}/input.txt`,
    "utf8"
  );

  if (part) {
    const { default: solution } = require(`../${year}/${day}/part-${part}`);
    console.log(`✅ ${solution(input)}`);
    process.exit(0);
  }

  try {
    const { default: solution } = require(`../${year}/${day}/index`);
    console.log(`✅ ${solution(input)}`);
    process.exit(0);
  } catch {
    let partNumber = 1;
    while (true) {
      try {
        const {
          default: solution,
        } = require(`../${year}/${day}/part-${partNumber}`);
        console.log(`✅ Part ${partNumber}: ${solution(input)}`);
        partNumber++;
      } catch {
        break;
      }
    }
    if (partNumber === 1) {
      throw new Error("No solution found in this day");
    } else {
      process.exit(0);
    }
  }
} catch (error) {
  console.error(`❌ ${(error as Error).message}`);
  console.log(`Usage: npm/yarn/pnpm run do <year>/<day>/<part>`);
  process.exit(1);
}
