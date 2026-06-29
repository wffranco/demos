function maxCardsTaken1(n: number, cards: number[]): number {
  let maxCount = 0;

  function dfs(index: number, sum: number, count: number): void {
    if (index === cards.length || count === n) {
      maxCount = Math.max(maxCount, count);
      return;
    }

    // Opción 1: tomar la carta si no rompe la regla
    if (sum + cards[index] >= 0) {
      // console.log(`increasing. card: ${cards[index]}, sum: ${sum + cards[index]}, count: ${count + 1}`);
      dfs(index + 1, sum + cards[index], count + 1);
    }

    // Opción 2: saltar la carta
    // console.log(`${sum + cards[index] >= 0 ? 'skipping' : 'staying'}. card: ${cards[index]}, sum: ${sum}, count: ${count}`);
    dfs(index + 1, sum, count);
  }

  dfs(0, 0, 0);
  return maxCount;
}

function maxCardsTaken2(n: number, cards: number[]): number {
  function dfs(i: number, sum: number): number {
    if (i === cards.length) return 0;


    const card = cards[i];

    if (sum + card >= 0) {
      return Math.max(1 + dfs(i + 1, sum + card), dfs(i + 1, sum));
    }

    return dfs(i + 1, sum);
  }

  return dfs(0, 0);
}

function run(n: number, cards: number[]) {
  console.log(n, maxCardsTaken1(n, cards), maxCardsTaken2(n, cards));
}


run(1, [4]); // Resultado: 1
run(2, [4, -4]); // Resultado: 2
run(3, [4, -4, 3]); // Resultado: 3
run(4, [4, -4, 2, -3]); // Resultado: 3
run(5, [4, -4, 3, -3, 1]); // Resultado: 5
run(6, [4, -4, 3, -3, 1, -2]); // Resultado: 5
run(7, [4, -4, 1, -2, 1, -3, 2]); // Resultado: 6
run(8, [4, -4, 1, -2, 1, -3, 2, -3]); // Resultado: 7
run(8, [4, -4, 1, -3, 2, -2, -1, 5]); // Resultado: 7
run(9, [4, -4, 3, -3, 1, -2, 1, -3, 9]); // Resultado: 8
