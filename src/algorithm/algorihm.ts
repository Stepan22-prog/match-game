// export function playerFirst(numberOfMatches: number, computerMatches: number): number {
//   const targetNumbers = [5, 9, 13, 17, 21];

//   for (let i = targetNumbers.length - 1; i >= 0; i--) {
//     if (targetNumbers[i] <= numberOfMatches) {
//       return numberOfMatches - targetNumbers[i];
//     }
//   }

//   if (numberOfMatches === 4) return 3;

//   if (numberOfMatches === 3) return computerMatches % 2 === 0 ? 2 : 3;

//   if (numberOfMatches === 2) return 1;

//   return 1;
// }

export function playerFirst(numberOfMatches: number): number {
  for (let i = 1; i <= 3; i++) {
    if ((numberOfMatches - i) % (3 + 1) === 1) {
      return i;
    }
  }

  return Math.min(numberOfMatches, 3);
}

// export function computerFirst(numberOfMatches: number, computerMatches: number) {
//   const numbers = [4, 8, 12, 16, 20, 24];

//   for (let i = numbers.length - 1; i >= 0; i--) {
//     if (numbers[i] < numberOfMatches) {
//       return numberOfMatches - numbers[i];
//     }
//   }
//   if (numberOfMatches === 4) {
//     return 2
//   }
//   if (numberOfMatches === 3) {
//     return 1
//   }
//   return 1;
// }

// export function computerFirst(remainingMatches: number): number {
//   if (remainingMatches === 1) {
//     return 1;
//   }

//   return (remainingMatches % 4 === 0) ? 3 : (remainingMatches % 4 === 1) ? 1 : 2;
// }

export function computerFirst(remainingMatches: number): number {
  for (let i = 1; i <= 3; i++) {
    if ((remainingMatches - i) % (3 + 1) === 1) {
      return i;
    }
  }

  return Math.min(remainingMatches, 3);
}

export class Algorithm {
  private maxNumber: number;
  constructor(maxNumber: number) {
    this.maxNumber = maxNumber;
  }

  computerMove(remainingMatches: number) {
    for (let i = 1; i <= this.maxNumber; i++) {
      if ((remainingMatches - i) % (this.maxNumber + 1) === 1) {
        return i;
      }
    }
  
    return Math.min(remainingMatches, this.maxNumber);
  }
}