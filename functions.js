function drawEmptyTable() {
    var s = "";
    ['h','g','f','e','d','c','b','a'].forEach((e,i) => {
            s+=`<div class="row">`
            for (var j=1; j<=8; j++) {
                s += `<div class='column ${j%2 === i%2 ? "a": "b"}'>${e},${j}</div>`   
            }
            s += `</div>`
    })
    document.getElementById("board-layout").innerHTML=s;
}

drawEmptyTable();

//document.querySelector('.column').innerHTML=`<div class="piece dark-piece"></div>`;

