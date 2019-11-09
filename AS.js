var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
// drawLine();
logTimer()

function drawLine(x) {
    ctx.moveTo(0, 0);
    ctx.lineTo((x * 10), 200);
    ctx.stroke();
}

async function logTimer() {
    var x = 0;
    for (var i = 0; i < 400; i++) {
        drawLine(x);
        console.log(++x);
        await sleep(10);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}