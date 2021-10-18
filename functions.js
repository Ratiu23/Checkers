function drawEmptyTable() {
  var s = "";
  ["h", "g", "f", "e", "d", "c", "b", "a"].forEach((e, i) => {
    s += `<div class="row">`;
    for (var j = 1; j <= 8; j++) {
      s += `<div class='column ${j % 2 === i % 2 ? "b" : "a"}' id="${
        e + j
      }"></div>`;
    }
    s += `</div>`;
  });
  document.getElementById("board-layout").innerHTML = s;
}

function drawPieces() {
  drawEmptyTable();
  addLight([
    "h8",
    "h6",
    "h4",
    "h2",
    "g7",
    "g5",
    "g3",
    "g1",
    "f8",
    "f6",
    "f4",
    "f2",
  ]);

  addDark([
    "c7",
    "c5",
    "c3",
    "c1",
    "b8",
    "b6",
    "b4",
    "b2",
    "a7",
    "a5",
    "a3",
    "a1",
  ]);
}

function addPiece(id, color) {
  const piece = `<div class="piece ${color}-piece"></div>`;
  document.querySelector("#" + id).innerHTML = piece;
}
function removePiece(id) {
  document.querySelector("#" + id).innerHTML = "";
}

function addLight(id) {
  id.forEach((e) => {
    addPiece(e, "light");
  });
}

function addDark(id) {
  id.forEach((e) => {
    addPiece(e, "dark");
  });
}
drawPieces();

let currentPiece;
let currentTurn = "dark";

document.querySelector("#board-layout").addEventListener("click", (e) => {
  console.log("Click", e.target, currentTurn, currentPiece);
  if (e.target.matches(".column.b") && !e.target.innerHTML && currentPiece) {
    let legalMove = 0;
    const id = e.target.id;
    const colNum = parseInt(id.substr(1, 1)); // column number target
    const colNumCP = parseInt(currentPiece.substr(1, 1)); // column number current piece
    const stepX = Math.abs(colNumCP - colNum);
    console.log("id", id, colNum, colNumCP);
    if (currentTurn == "dark") {
      const step = id.charCodeAt(0) - currentPiece.charCodeAt(0);
      if (step == 1 && stepX == 1) {
        addPiece(id, currentTurn);
        removePiece(currentPiece);
        legalMove = 1;
      }
      if (step == 2 && stepX == 2) {
        addPiece(id, currentTurn);
        removePiece(currentPiece);
        legalMove = 1;
      }
    } else if (
      currentTurn == "light" &&
      id.charCodeAt(0) == currentPiece.charCodeAt(0) - 1 &&
      (colNum == colNumCP + 1 || colNum == colNumCP - 1)
    ) {
      addPiece(id, currentTurn);
      removePiece(currentPiece);
      legalMove = 1;
    }

    if (legalMove) {
      currentPiece = undefined;
      currentTurn = currentTurn == "light" ? "dark" : "light";
      legalMoves = 0;
    }
    // removePiece(currentPiece);
    // addPiece(e.target.id, currentTurn);
    // currentPiece = undefined;
    // currentTurn = currentTurn == "light" ? "dark" : "light";
    console.log("current turn", currentTurn);
  } else if (e.target.matches(`.${currentTurn}-piece`)) {
    const id = e.target.parentNode.getAttribute("id");
    currentPiece = id;
    console.info("Current Piece id", currentPiece);
  }
});
