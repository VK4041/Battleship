import Gameboard from "../src/gameboard.js";
import expect from "expect";

describe("Testing placement of ships", () => {
  const testBoard = new Gameboard();
  test("Placing the ship at given coords", () => {
    expect(testBoard.placeShip(1, 1, 4, false, "ship1")).toBeTruthy();
  });
  test("Placing duplicate ship with same name", () => {
    expect(() => testBoard.placeShip(3, 3, 1, true, "ship1")).toThrow(Error);
  });
  test("Placing ship out of the grid", () => {
    expect(() => testBoard.placeShip(4, 8, 4, false, "ship2")).toThrow(Error);
  });
  test("Testing new ship placement over previously failed ship placement coordinate", () => {
    expect(testBoard.placeShip(4, 8, 4, true, "ship3")).toBeTruthy();
  });
});
