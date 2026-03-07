import Gameboard from "../src/gameboard.js";

describe("Testing placement of ships", () => {
  test("Placing the ship at given coords", () => {
    const testBoard = new Gameboard();
    expect(testBoard.placeShip(1, 1, 4, false, "testShip")).toBeTruthy();
  });
  test("Placing duplicate ship with same name", () => {
    const testBoard = new Gameboard();
    testBoard.placeShip(5, 6, 2, false, "testShip");
    expect(() => testBoard.placeShip(3, 3, 1, true, "testShip")).toThrow(Error);
  });
  test("Placing ship out of the grid 1/2", () => {
    const testBoard = new Gameboard();
    expect(() => testBoard.placeShip(12, 12, 4, false, "testShip")).toThrow(
      Error,
    );
  });
  test("Placing ship exceeding the boundaries of grid", () => {
    const testBoard = new Gameboard();
    expect(() => testBoard.placeShip(4, 8, 4, false, "testShip")).toThrow(
      Error,
    );
  });
  test("Testing attack on an out of bound cell", () => {
    const testBoard = new Gameboard();
    expect(() => testBoard.receiveAttack(11, 11)).toThrow(Error);
  });
  test("Testing a missed attack", () => {
    const testBoard = new Gameboard();
    expect(testBoard.receiveAttack(5, 5)).toBe("missed");
  });
  test("Testing duplicate attack", () => {
    const testBoard = new Gameboard();
    testBoard.receiveAttack(5, 5);
    expect(() => testBoard.receiveAttack(5, 5)).toThrow(Error);
  });
  test("Testing hit on a ship", () => {
    const testBoard = new Gameboard();
    testBoard.placeShip(1, 1, 4, false, "testShip");
    expect(testBoard.receiveAttack(1, 3)).toBe("hit");
  });
  test.only("Testing sunken ship", () => {
    const testBoard = new Gameboard();
    testBoard.placeShip(1, 1, 4, false, "testShip");

    //Hit the ship 4 times
    testBoard.receiveAttack(1, 1);
    testBoard.receiveAttack(1, 2);
    testBoard.receiveAttack(1, 3);
    testBoard.receiveAttack(1, 4);
    expect(testBoard.allSunk()).toBeTruthy();
  });
});
