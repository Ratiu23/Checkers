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
  addLight("h8");
  addLight("h6");
  addLight("h4");
  addLight("h2");
  addLight("g7");
  addLight("g5");
  addLight("g3");
  addLight("g1");

  addDark("a7");
  addDark("a5");
  addDark("a3");
  addDark("a1");
  addDark("b8");
  addDark("b6");
  addDark("b4");
  addDark("b2");
  //addDark(["a7", "a5", "a3"]);
}

function addPiece(id, color) {
  const piece = `<div class="piece ${color}-piece"></div>`;
  document.querySelector("#" + id).innerHTML = piece;
}

function addLight(id) {
  addPiece(id, "light");
}

function addDark(id) {
  addPiece(id, "dark");
}

drawPieces();
