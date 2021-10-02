function drawEmptyTable() {
    var s = "";
    ['h','g','f','e','d','c','b','a'].forEach((e,i) => {
            s+=`<div class="row">`
            for (var j=1; j<=8; j++) {
                s += `<div class='column ${j%2 === i%2 ? "b": "a"}'></div>`   
            }
            s += `</div>`
    })
    document.getElementById("board-layout").innerHTML=s;
}

function drawPieces() {
    drawEmptyTable();
    document.querySelector('.b').innerHTML=`<div class="piece light-piece"></div>`;
}

drawPieces();





