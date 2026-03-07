export default class Ship {
  constructor(length = 1, hits = 0, sunk = false, name = "ship1") {
    this.length = length;
    this.hits = hits;
    this.sunk = sunk;
    this.name = name;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    return this.length === this.hits;
  }
}
