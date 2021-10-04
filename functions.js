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
  const light = `<div class="piece light-piece"></div>`;
  addPiece("#h8", "light");
  addPiece("#h6", "light");
  addPiece("#h4", "light");
  addPiece("#h2", "light");
  addPiece("#g7", "light");
  addPiece("#g5", "light");
  addPiece("#g3", "light");
  addPiece("#g1", "light");

  addPiece("#a7", "dark");
  addPiece("#a5", "dark");
  addPiece("#a3", "dark");
  addPiece("#a1", "dark");
  addPiece("#b8", "dark");
  addPiece("#b6", "dark");
  addPiece("#b4", "dark");
  addPiece("#b2", "dark");
}

function addPiece(id, color) {
  const piece = `<div class="piece ${color}-piece"></div>`;
  document.querySelector(id).innerHTML = piece;
}

drawPieces();
