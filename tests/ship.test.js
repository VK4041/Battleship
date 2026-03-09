import Ship from "../ship.js";

describe("Testing sink", () => {
  const testShip = new Ship(4);
  test("Ship of size 4 hit four times should sink", () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
  });
});
