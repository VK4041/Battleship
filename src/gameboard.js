import Ship from "./ship.js";
export default class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => Array.from({ length: 10 }));
    this.ships = [];
  }
  isValidPlacement(x, y, length) {
    //Check if the ship will collide with another or not before adding it to the board
    //If so, it must not be added to the board, not even partially
  }
  outOfBounds(x, y, vertical, length) {
    let result = x < 0 || x > 9 || y < 0 || y > 9;
    if (result) return result; //early return if first cell itself is exceeding
    if (vertical) result = x + length > 9;
    else result = y + length > 9;
    return result; //return when last cell is exceeding
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
}
