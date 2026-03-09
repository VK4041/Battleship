import Player from "./player.js";
const player1 = new Player("varun", "real");
const player2 = new Player("cpu", "cpu");

function playGame() {
  //Placing the ships on each player's board preemtively for now
  placePlayerShip(player1, 1, 1, 4, false, "ship1");
  placePlayerShip(player1, 5, 3, 4, false, "ship2");
  placePlayerShip(player1, 7, 7, 2, true, "ship3");

  placePlayerShip(player2, 0, 0, 2, true, "ship1");
  placePlayerShip(player2, 1, 6, 4, false, "ship2");
  placePlayerShip(player2, 4, 2, 4, false, "ship3");

  initBoards();
}
function placePlayerShip(player, x, y, length, vertical, name) {
  if (
    !player.gameboard.willCollide(x, y, vertical, length) &&
    !player.gameboard.outOfBounds(x, y, vertical, length)
  ) {
    //the ship is legal to place
    player.gameboard.placeShip(x, y, length, vertical, name);
  } else {
    console.log(player.name, name, x, y, length, vertical);
    throw new Error("Could not place ship");
  }
}
function initBoards() {
  const grid1 = document.querySelector(".player1-grid");
  const grid2 = document.querySelector(".player2-grid");

  renderBoard(player1, grid1);
  renderBoard(player2, grid2);
}
function renderBoard(player, container) {
  const grid = document.createElement("div");
  grid.classList.add("grid");
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("grid-row");
    grid.appendChild(row);
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.dataset.x = i;
      cell.dataset.y = j;
      row.appendChild(cell);
      if (player.type === "real") {
        //show ships for player, hide for cpu
        if (player.gameboard.grid[i][j]) {
          cell.classList.add("ship");
        }
      }
    }
  }
  container.appendChild(grid);
}
playGame();
