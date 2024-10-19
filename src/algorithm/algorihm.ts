export function playerFirst(numberOfMatches: number) {
  // if (numberOfMatches === 4) {
  //   return 3
  // }
  // if ((numberOfMatches - 3) % 4 !== 0) {
  //   return 3;
  // }
  // if ((numberOfMatches - 2) % 4 !== 0) {
  //   return 2;
  // }
  // if ((numberOfMatches - 1) % 4 !== 0) {
  //   return 1;
  // }
  // return numberOfMatches;

  const numbers = [1, 5, 9, 13, 17, 21];

  for (let i = numbers.length - 1; i >= 0; i--) {
    if (numbers[i] < numberOfMatches) {
      return numberOfMatches - numbers[i];
    }
  }
  return 1;
}