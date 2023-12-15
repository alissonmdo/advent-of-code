export default function solution(input: string): string | number {
  let i = 0;
  let card = 0;
  const cardsInstances = new Map<number, number>();
  while (i < input.length) {
    card++;
    cardsInstances.set(card, (cardsInstances.get(card) || 0) + 1);
    i += 7;
    while (input[i - 1] !== ":") {
      i++;
    }
    const winningNumbers = new Map();
    let isGameNumbers = false;
    let matchesInThisGame = 0;
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
          matchesInThisGame++;
        }
      }
    }
    const currentCardInstances = cardsInstances.get(card) || 1;
    const firstNextCard = card + 1;
    for (
      let nextCard = firstNextCard;
      nextCard < firstNextCard + matchesInThisGame;
      nextCard++
    ) {
      const nextCardInstances = cardsInstances.get(nextCard) || 0;
      cardsInstances.set(nextCard, nextCardInstances + currentCardInstances);
    }
  }
  let points = 0;
  for (const [_, instances] of cardsInstances) {
    points += instances;
  }
  return points;
}
