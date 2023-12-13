import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import path from "path";

try {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    throw new Error(
      `Expected 1 argument, but got ${args.length} (${args.join(", ")})`
    );
  }

  const [year, day] = args[0].split("/");

  console.log(`🚀 Creating folder structure for ${year}/${day}`);

  const dayFolder = `${__dirname}/../${year}/${day}`;

  let mustBeInParts = args.includes("-P") ? true : false;

  if (!existsSync(dayFolder)) {
    mkdirSync(dayFolder, { recursive: true });
  }

  if (!existsSync(`${dayFolder}/input.txt`)) {
    writeFileSync(`${dayFolder}/input.txt`, "");
    console.log(`🆕 Created ${`${dayFolder}/input.txt`}`);
  }

  const newFileContent = `export default function solution (input: string): string | number {
  return input;
}
`;

  const existPartsFiles = readdirSync(dayFolder)
    .filter((file) => file.startsWith("part-"))
    .some((file) => file.endsWith(".ts"));

  if (existPartsFiles) {
    mustBeInParts = true;
  }

  const indexFile = `${dayFolder}/index.ts`;

  if (!existsSync(indexFile) && !mustBeInParts) {
    writeFileSync(indexFile, newFileContent);
    console.log(`🆕 Created ${indexFile}`);
    process.exit(0);
  }

  if (existsSync(indexFile)) {
    const indexFileContent = readFileSync(indexFile, "utf8");
    unlinkSync(indexFile);
    writeFileSync(`${dayFolder}/part-1.ts`, indexFileContent);
    console.log(`🔁 Renamed ${`${dayFolder}/part-1.ts`}`);
    writeFileSync(`${dayFolder}/part-2.ts`, newFileContent);
    console.log(`🆕 Created ${`${dayFolder}/part-2.ts`}`);
    process.exit(0);
  }

  let partNumber = 1;

  while (true) {
    const partFile = `${dayFolder}/part-${partNumber}.ts`;
    if (!existsSync(partFile)) {
      writeFileSync(partFile, newFileContent);
      console.log(`🆕 Created ${partFile}`);
      process.exit(0);
    }
    partNumber++;
  }
} catch (error) {
  console.error(`❌ ${(error as Error).message}`);
  console.log(`Usage: npm/yarn/pnpm run new <year>/<day> [-P]`);
  process.exit(1);
}
