let currentPiece;
let currentTurn = "dark";

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
  setCurrentTurn(currentTurn);
}

function drawPieces() {
  drawEmptyTable();

  /*addLight(["f2", "f4", "f6"]);

  addDark(["c3", "c5", "c7"]);*/
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
  return;
}

function addPiece(id, color, isKing) {
  const piece = `<div class="piece ${color}-piece ${
    isKing ? "king" : ""
  }"></div>`;
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

document.querySelector("#board-layout").addEventListener("click", (e) => {
  console.log("Click", e.target, currentTurn, currentPiece);
  if (e.target.matches(".column.b") && !e.target.innerHTML && currentPiece) {
    let legalMove = 0;
    console.log("test");
    const id = e.target.id;
    const colNum = parseInt(id.substr(1, 1));
    const colNumCP = parseInt(currentPiece.substr(1, 1));
    const stepX = Math.abs(colNumCP - colNum);
    console.debug("id", id, colNum, colNumCP);
    let isKing = !!document.querySelector(`#${currentPiece} .piece.king`);
    let wasKing;
    if (currentTurn == "dark") {
      const stepY = id.charCodeAt(0) - currentPiece.charCodeAt(0);
      const stepYKing = currentPiece.charCodeAt(0) - id.charCodeAt(0);
      console.log(
        "steoyking, %o, current piece id %o, target piecce id %o",
        stepYKing,
        currentPiece.charCodeAt(0),
        id.charCodeAt(0)
      );
      if (stepX == 1 && (stepY == 1 || (stepY == -1 && isKing))) {
        removePiece(currentPiece);
        addPiece(id, currentTurn, isKing);

        legalMove = 1;
      }

      if (stepX == 2 && (stepY == 2 || (stepY == -2 && isKing))) {
        if (stepY == 2 && isKing) {
          isKing = false;
          wasKing = true;
        }
        const midId = String.fromCharCode(id.charCodeAt(0) - 1);
        const midKId = String.fromCharCode(id.charCodeAt(0) + 1);
        console.log(
          "id piesa mijloc nu " + midId + " id piesa mijloc rege " + midKId
        );
        let direction = colNum - colNumCP > 0 ? 1 : -1;
        const middlePiece = document.getElementById(
          (isKing ? midKId : midId) + (colNum - direction)
        );
        if (middlePiece.querySelector(".light-piece")) {
          removePiece((isKing ? midKId : midId) + (colNum - direction));
          removePiece(currentPiece);
          addPiece(id, currentTurn, wasKing ? wasKing : isKing);
          legalMove = 1;
        }
      }
      if (legalMove) {
        let King = id.substr(0, 1) == "h";
        console.log("is King", King);
        if (King) {
          p = document.querySelector(`#${id} .piece`);
          console.log(p);
          p.classList.add("king");
        }
      }
    } else if (currentTurn == "light") {
      const stepY = currentPiece.charCodeAt(0) - id.charCodeAt(0);
      if (stepX == 1 && (stepY == 1 || (stepY == -1 && isKing))) {
        addPiece(id, currentTurn, isKing);
        removePiece(currentPiece);
        legalMove = 1;
      }

      if (stepX == 2 && (stepY == 2 || (stepY == -2 && isKing))) {
        if (stepY == 2 && isKing) {
          isKing = false;
          wasKing = true;
        }
        const midId = String.fromCharCode(id.charCodeAt(0) + 1);
        const midKId = String.fromCharCode(id.charCodeAt(0) - 1);
        console.log(
          "id piesa mijloc nu " + midId + " id piesa mijloc rege " + midKId
        );
        let direction = colNum - colNumCP > 0 ? 1 : -1;
        const middlePiece = document.getElementById(
          (isKing ? midKId : midId) + (colNum - direction)
        );
        if (middlePiece.querySelector(".dark-piece")) {
          removePiece((isKing ? midKId : midId) + (colNum - direction));
          removePiece(currentPiece);
          addPiece(id, currentTurn, wasKing ? wasKing : isKing);
          legalMove = 1;
        }
      }
      if (legalMove) {
        let King = id.substr(0, 1) == "a";
        console.log("is King", King);
        if (King) {
          p = document.querySelector(`#${id} .piece`);
          console.log(p);
          p.classList.add("king");
        }
      }
    }
    if (legalMove) {
      currentPiece = undefined;
      setCurrentTurn(currentTurn == "light" ? "dark" : "light");
    }
    console.log("current turn", currentTurn);
  } else if (e.target.matches(`.${currentTurn}-piece`)) {
    const isHighlighted = e.target.matches(".highlight");
    const h = document.querySelector(".highlight");
    if (h) {
      h.classList.remove("highlight");
    }

    if (isHighlighted) {
      currentPiece = undefined;
    } else {
      e.target.classList.add("highlight");
      const id = e.target.parentNode.getAttribute("id");
      currentPiece = id;
      console.info("Current Piece id", currentPiece);
    }
  }
});

function resetGame() {
  currentPiece = undefined;
  currentTurn = "dark";
  drawPieces();
}

function setCurrentTurn(turn) {
  const board = document.getElementById("board-layout");
  board.classList.remove(`${currentTurn}-turn`);
  board.classList.add(`${turn}-turn`);
  currentTurn = turn;
}
