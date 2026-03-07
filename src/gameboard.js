import Ship from "./ship.js";
export default class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => Array.from({ length: 10 }));
    this.ships = [];
    this.allAttacks = [];
  }
  allSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
  isDuplicateShip(name) {
    let result = false;
    this.ships.forEach((ship) => {
      if (ship.name === name) {
        result = true;
      }
    });
    return result;
  }
  outOfBounds(x, y, vertical = false, length = 0) {
    let result = x < 0 || x > 9 || y < 0 || y > 9;
    if (result) return result; //early return
    if (vertical) result = x + length > 9;
    else result = y + length > 9;
    return result; //return when ship size doesn't fit inside bounds
  }
  willCollide(x, y, vertical, length) {
    //Check if the ship will collide with another or not before adding it to the board
    //If so, it must not be added to the board, not even partially
    let i = x,
      j = y;
    while (length) {
      if (this.grid[x][y]) return true;
      if (vertical) i++;
      else j++;
      length--;
    }
    return false;
  }
  placeShip(x, y, length, vertical, name) {
    const ship = new Ship(length, ...[, ,], name);
    let i = x,
      j = y;
    if (this.isDuplicateShip(name))
      throw new Error("Ship with the same name already present on board");
    if (this.willCollide(x, y, vertical, length))
      throw new Error("Ship is colliding with another ship");
    if (this.outOfBounds(x, y, vertical, length))
      throw new Error("Ship placed out of grid");
    while (length) {
      this.grid[i][j] = ship.name;
      if (vertical) i++;
      else j++;
      length--;
    }
    this.ships.push(ship);
    return true;
  }
  alreadyAttacked(x, y) {
    return (
      this.allAttacks.filter((attack) => attack.x === x && attack.y === y)
        .length === 1
    );
  }
  findShip(x, y) {
    let shipName = this.grid[x][y];
    for (const ship of this.ships) {
      if (shipName === ship.name) return ship;
    }
  }
  receiveAttack(x, y) {
    let status;
    if (this.outOfBounds(x, y)) throw new Error("Attack made outside grid");
    if (this.alreadyAttacked(x, y)) throw new Error("Duplicate attack made");
    if (!this.grid[x][y]) {
      //Attack missed
      status = "missed";
      this.allAttacks.push({
        status,
        x,
        y,
      });
    } else {
      //Attack hit
      status = "hit";
      this.findShip(x, y).hit();
      this.allAttacks.push({
        status,
        x,
        y,
      });
    }
    return status;
  }
}
