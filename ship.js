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
    let status = false;
    if (this.length === this.hits) {
      this.sunk = true;
      status = true;
    }
    return status;
  }
}
