type Mapper = [number, number, number];

function mapperFactory() {
  return [-1, -1, -1] satisfies Mapper;
}

export default function solution(input: string): string | number {
  let result: any;
  const lines = input.split("\n");
  const chains = getSeeds(lines[0]);
  let ln = 3;
  let nMapper = 1;
  const listOfMappers = new Map<number, Mapper[]>();
  while (ln < lines.length + 1) {
    let line = lines[ln] ?? "";
    if (line.length === 0) {
      for (let i = 0; i < chains.length; i++) {
        const chain = chains[i];
        const prevValue = chain[nMapper - 1];
        const mappers = listOfMappers.get(nMapper) ?? [];
        let nextValue = prevValue;
        for (let j = 0; j < mappers.length; j++) {
          const [destinationRangeStart, sourceRangeStart, rangeLength] =
            mappers[j];
          const sourceDifference = prevValue - sourceRangeStart;
          if (sourceDifference >= 0 && sourceDifference < rangeLength) {
            nextValue = destinationRangeStart + sourceDifference;
            // console.log(
            //   `Seed - ${i} - ${prevValue} - ${destinationRangeStart} - ${sourceDifference} - ${nextValue}`
            // );
          }
        }
        chain[nMapper] = nextValue;
        chains[i] = chain;
      }
      ln += 2;
      nMapper++;
      continue;
    }
    let col = 0;
    const mapper = mapperFactory();

    let num = 0;
    while (col < line.length) {
      let digit = parseInt(line[col]);
      if (isNaN(digit)) {
        col++;
        num = 0;
        continue;
      }
      while (!isNaN(digit)) {
        num = num * 10 + digit;
        col++;
        digit = parseInt(line[col]);
      }
      if (mapper[0] === -1) mapper[0] = num;
      else if (mapper[1] === -1) mapper[1] = num;
      else mapper[2] = num;
    }
    ln++;
    listOfMappers.set(nMapper, [...(listOfMappers.get(nMapper) ?? []), mapper]);
  }
  result = chains[0][nMapper - 1];
  chains.forEach((chain) => {
    if (chain[nMapper - 1] < result) result = chain[nMapper - 1];
  });

  return result;
}

function getSeeds(firstLine: string) {
  const STRING_OFFSET = 7;
  let i = STRING_OFFSET;
  const seeds: number[][] = [];
  while (i < firstLine.length) {
    let digit = parseInt(firstLine[i]);
    if (isNaN(digit)) {
      i++;
      continue;
    }
    let num = 0;
    while (!isNaN(digit)) {
      num = num * 10 + digit;
      i++;
      digit = parseInt(firstLine[i]);
    }
    seeds.push([num]);
  }
  return seeds;
}
