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
