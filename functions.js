function drawEmptyTable() {}
    var s = "";
    ['a','b','c','d','e','f','g','h'].forEach((e,i) => {
        //for (var i=1; i<=8; i++) {
            s+=`<div class="row">`
            for (var j=1; j<=8; j++) {
                s += `<div class='column ${j%2 === i%2 ? "a": "b"}'>${e},${j}</div>`   
            }
            s += `</div>`
        //}    
        
    })
    document.getElementById("board-layout").innerHTML=s;
drawEmptyTable();

//document.querySelector('.column').innerHTML=`<div class="piece dark-piece"></div>`;

