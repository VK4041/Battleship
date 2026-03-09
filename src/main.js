import Player from "./player.js";
const player1 = new Player("varun", "real");
const player2 = new Player("cpu", "cpu");
let turnHandler;
function enterShipData() {
  alert(
    "This game runs on your input, feel free to just spam enter/ok for random ship placements",
  );
  const numShips = parseInt(prompt("How many ships do you want to place?", 4));
  let shipCount = 1;
  let shipName;
  let playerShipX;
  let playerShipY;
  let playerVertical;
  let playerShipLength;
  let cpuShipX;
  let cpuShipy;
  let cpuShipLength;
  let cpuVertical;
  alert(`First place your ${numShips} ships`);
  do {
    alert(`Let's place ship #${shipCount}`);
    shipName = "ship" + shipCount;
    let [randomX, randomY] = generateRandomCoordinates();
    playerShipX = parseInt(prompt("Enter X coordinate", randomX));
    playerShipY = parseInt(prompt("Enter Y coordinate", randomY));
    playerVertical = prompt(
      "Do you want to place it vertically? yes or no",
      generateRandomVertical(),
    );
    playerVertical = playerVertical === "true" || playerVertical === "yes";
    playerShipLength = parseInt(
      prompt("Enter length of ship", generateRandomShipLength()),
    );
    if (
      player1.gameboard.willCollide(
        playerShipX,
        playerShipY,
        playerVertical,
        playerShipLength,
      ) ||
      player1.gameboard.outOfBounds(
        playerShipX,
        playerShipY,
        playerVertical,
        playerShipLength,
      ) ||
      player1.gameboard.isDuplicateShip(shipName)
    ) {
      alert("Ship could not be placed, try again");
      continue;
    } else {
      placePlayerShip(
        player1,
        playerShipX,
        playerShipY,
        playerShipLength,
        playerVertical,
        shipName,
      );
      shipCount++;
    }
  } while (shipCount <= numShips);

  //Now placing cpu's random ships
  shipCount = 1;
  do {
    shipName = "ship" + shipCount;
    [cpuShipX, cpuShipy] = generateRandomCoordinates();
    cpuVertical = generateRandomVertical();
    cpuShipLength = generateRandomShipLength();
    if (
      player2.gameboard.willCollide(
        cpuShipX,
        cpuShipy,
        cpuVertical,
        cpuShipLength,
      ) ||
      player2.gameboard.outOfBounds(
        cpuShipX,
        cpuShipy,
        cpuVertical,
        cpuShipLength,
      ) ||
      player2.gameboard.isDuplicateShip(shipName)
    ) {
      alert("Ship could not be placed, try again");
      continue;
    } else {
      placePlayerShip(
        player2,
        cpuShipX,
        cpuShipy,
        cpuShipLength,
        cpuVertical,
        shipName,
      );
      shipCount++;
    }
  } while (shipCount <= numShips);
}
function playGame() {
  enterShipData();
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
    console.log({
      "Player Name": player.name,
      "Player Type": player.type,
      "Ship Length": length,
      Vertical: vertical,
      X: x,
      Y: y,
    });
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
  let x;
  let y;
  //Keep generating coords until unattacked coords is generated
  do {
    [x, y] = generateRandomCoordinates();
  } while (player1.gameboard.alreadyAttacked(x, y));
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
function generateRandomCoordinates() {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  return [x, y];
}
function generateRandomShipLength() {
  //Ship length between 1 and 5
  return Math.floor(Math.random() * 5) + 1;
}
function generateRandomVertical() {
  return Math.floor(Math.random() * 2) ? true : false;
}
function showHitMiss(cell, status) {
  if (status === "hit") {
    cell.classList.add("hit");
  } else {
    cell.classList.add("missed");
  }
}
playGame();
