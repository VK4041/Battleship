import Player from "./player.js";
const player1 = new Player("varun", "real");
const player2 = new Player("cpu", "cpu");
let turnHandler;
function playGame() {
  //Placing the ships on each player's board preemtively for now
  placePlayerShip(player1, 1, 1, 4, false, "ship1");
  placePlayerShip(player1, 5, 3, 4, false, "ship2");
  placePlayerShip(player1, 7, 7, 2, true, "ship3");

  placePlayerShip(player2, 0, 0, 2, true, "ship1");
  placePlayerShip(player2, 1, 6, 4, false, "ship2");
  placePlayerShip(player2, 4, 2, 4, false, "ship3");

  const [grid1, grid2] = initBoards();
  turnHandler = (e) => {
    clickHandler(e, grid1, grid2);
  };
  grid2.addEventListener("click", turnHandler);
}
function placePlayerShip(player, x, y, length, vertical, name) {
  if (
    !player.gameboard.willCollide(x, y, vertical, length) &&
    !player.gameboard.outOfBounds(x, y, vertical, length)
  ) {
    //the ship is legal to place
    player.gameboard.placeShip(x, y, length, vertical, name);
  } else {
    throw new Error("Could not place ship");
  }
}
function initBoards() {
  const grid1 = document.querySelector(".player1-grid");
  const grid2 = document.querySelector(".player2-grid");

  renderBoard(player1, grid1);
  renderBoard(player2, grid2);
  return [grid1, grid2];
}
function renderBoard(player, container) {
  container.innerHTML = "";
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
function clickHandler(event, grid1, grid2) {
  if (event.target.classList.contains("grid-cell")) {
    const x = Number(event.target.dataset.x);
    const y = Number(event.target.dataset.y);
    const cell = event.target;
    console.log(`Clicked cpu cell => (${x}, ${y})`);
    //Attack cpu's board
    if (!player2.gameboard.alreadyAttacked(x, y)) {
      const status = player2.gameboard.receiveAttack(x, y);
      console.log(`Attack ${status}`);
      showHitMiss(cell, status);
      if (player2.gameboard.allSunk()) {
        grid2.removeEventListener("click", turnHandler);
        alert("Game Over\nYou Won");
        return;
      }
      //Now cpu will attack the player
      console.log("Cpu will attack player now");
      cpuAttack(grid1, grid2);
    } else {
      console.log(`Already attacked cell (${x}, ${y})`);
    }
  }
}
function cpuAttack(grid1, grid2) {
  const [x, y] = generateRandomAttack();
  console.log(`CPU attacked ${x},${y}`);
  const attack = player1.gameboard.receiveAttack(x, y);
  const cell = grid1.querySelector(`[data-x='${x}'][data-y='${y}']`);
  showHitMiss(cell, attack);
  if (player1.gameboard.allSunk()) {
    grid2.removeEventListener("click", turnHandler);
    alert("Game Over\nCPU Won");
    return;
  }
}
function generateRandomAttack() {
  let x;
  let y;
  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (player1.gameboard.alreadyAttacked(x, y));
  return [x, y];
}
function showHitMiss(cell, status) {
  if (status === "hit") {
    cell.classList.add("hit");
  } else {
    cell.classList.add("missed");
  }
}
playGame();
