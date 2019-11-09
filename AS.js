var c = document.getElementById("CanvasAS");
var ctx = c.getContext("2d");
// drawLine();
gridDrawer();
// colorSquare(5, 5);

function drawLineVertical(x) {
    ctx.beginPath();
    ctx.moveTo((x * 20), 0);
    ctx.lineTo((x * 20), 200);
    ctx.stroke();
}

function drawLineHorizontal(y) {
    ctx.beginPath();
    ctx.moveTo(0, (y * 20));
    ctx.lineTo(400, (y * 20));
    ctx.stroke();
}

async function gridDrawer() {
    for (var i = 0; i < 20; i++) {
        drawLineVertical(i);
        drawLineHorizontal(i);
        // await sleep(1);
    }
}

function colorSquare(x, y) {
    // console.log(x + " " + y);
    ctx.fillRect((x * 20), (y * 20), 20, 20);
    ctx.stroke();
}

function colorSelectedSquareOnClick() {
    var rect = c.getBoundingClientRect();
    var x = event.clientX - Math.round(rect.left);
    var y = event.clientY - Math.round(rect.top);
    // console.log("On Click" + x + " " + y);
    colorSquare(Math.floor(x / 20), Math.floor(y / 20));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
