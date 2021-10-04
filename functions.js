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
  document.querySelector("#h8").innerHTML = light;
  document.querySelector("#h6").innerHTML = light;
  document.querySelector("#h4").innerHTML = light;
  document.querySelector("#h2").innerHTML = light;
  addPiece("#g7", "light");
  addPiece("#g5", "light");
  addPiece("#g3", "light");
  addPiece("#g1", "light");

  const dark = `<div class="piece dark-piece"></div>`;
  document.querySelector("#a7").innerHTML = dark;
  document.querySelector("#a5").innerHTML = dark;
  document.querySelector("#a3").innerHTML = dark;
  document.querySelector("#a1").innerHTML = dark;
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
