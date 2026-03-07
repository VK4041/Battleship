import Ship from "../src/ship.js";

describe.skip("Testing sink", () => {
  const testShip = new Ship(4);
  test("Ship of size 4 hit four times should sink", () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
  });
});