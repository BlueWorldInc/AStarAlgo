var c = document.getElementById("CanvasAS");
var ctx = c.getContext("2d");

var squares = {
    lastSquare: {
        x: 0,//5,
        y: 0//7
    }, currentSquare: {
        x: 0,//8,
        y: 0//2
    }
}


var directions = {
    directLineDirection: {
        x: 0,
        y: 0
    }, diagonalDirection: {
        d0: -1,
        d1: 1
    }
}

// drawLine();
gridDrawer();
getDistanceX();
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
    ctx.fillStyle = "black";
    // console.log(x + " " + y);
    ctx.fillRect((x * 20), (y * 20), 20, 20);
    ctx.stroke();
    squares.lastSquare.x = squares.currentSquare.x;
    squares.lastSquare.y = squares.currentSquare.y;
    squares.currentSquare.x = x;
    squares.currentSquare.y = y;
    getDistanceX();
}

function colorSquareSimple(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect((x * 20), (y * 20), 20, 20);
    ctx.stroke();
}

function colorSelectedSquareOnClick() {
    var rect = c.getBoundingClientRect();
    var x = event.clientX - Math.round(rect.left);
    var y = event.clientY - Math.round(rect.top);
    // console.log("On Click" + x + " " + y);
    // clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 200);
    gridDrawer();
    ctx.stroke();
    colorSquare(Math.floor(x / 20), Math.floor(y / 20));
    colorSquareSimple(squares.lastSquare.x, squares.lastSquare.y, "black");
    colorIntermediary();
}

async function colorIntermediary() {
    //Intermediary Square
    var IS = {
        x: 0,
        y: 0        
    }
    var sl = squares.lastSquare;
    var sc = squares.currentSquare;
    var dld = directions.directLineDirection;
    var dd = directions.diagonalDirection;
    xOffset = sl.x - sc.x;
    yOffset = sl.y - sc.y;
    if (sl.x !== sc.x && sl.y === sc.y) {
        diff = sl.x - sc.x;
        for (var i = 1; i < Math.abs(diff); i++) {
            await sleep(50);
            colorSquareSimple((sl.x - (Math.sign(diff) * i)), sl.y, "red");
        }
    } else if (sl.x === sc.x && sl.y !== sc.y) {
        diff = sl.y - sc.y;
        for (var i = 1; i < Math.abs(diff); i++) {
            await sleep(50);
            colorSquareSimple(sl.x, sl.y - (Math.sign(diff) * i), "red");
        }
    } else
     if (sl.x !== sc.x && sl.y !== sc.y) {

        diagonalNumber = Math.min(Math.abs(xOffset), Math.abs(yOffset));
        directLineNumber = Math.abs(Math.abs(xOffset) - Math.abs(yOffset));

        if (xOffset > 0 && yOffset < 0) {
            dd.d0 = -1;
            dd.d1 = 1;
        }
        if (xOffset < 0 && yOffset < 0) {
            dd.d0 = -1;
            dd.d1 = -1;
        }
        if (xOffset > 0 && yOffset > 0) {
            dd.d0 = 1;
            dd.d1 = 1;
        }
        if (xOffset < 0 && yOffset > 0) {
            dd.d0 = 1;
            dd.d1 = -1;
        }

        if (directLineNumber > 0) {
            // if ((yOffset + xOffset) > 0) {
            //     dld.y = -1;
            //     dld.x = 0;
            // } else if (-yOffset + xOffset > 0) {
            //     dld.y = 1;
            //     dld.x = 0;
            // } else if (xOffset <= 0) {
            //     dld.x = 1;
            //     dld.y = 0;
            // } else {
            //     dld.x = -1;
            //     dld.y = 0;
            // }

            if (xOffset < 0 && yOffset > 0) {
                if (xOffset + yOffset > 0) {
                    dld.y = -1;
                    dld.x = 0;
                } else {
                    dld.x = 1;
                    dld.y = 0;
                }
            }

            if (xOffset < 0 && yOffset < 0) {
                if (xOffset - yOffset > 0) {
                    dld.y = 1;
                    dld.x = 0;
                } else {
                    dld.x = 1;
                    dld.y = 0;
                }
            }

            if (xOffset > 0 && yOffset > 0) {
                if (xOffset - yOffset < 0) {
                    dld.y = -1;
                    dld.x = 0;
                } else {
                    dld.x = -1;
                    dld.y = 0;
                }
            }

            if (xOffset > 0 && yOffset < 0) {
                if (xOffset + yOffset < 0) {
                    dld.y = 1;
                    dld.x = 0;
                } else {
                    dld.x = -1;
                    dld.y = 0;
                }
            }

        }

        IS.x = sl.x;
        IS.y = sl.y;


        for (var i = 1; i <= diagonalNumber; i++) {
            if (i == diagonalNumber && directLineNumber == 0) {
                break;
            }
            console.log("diagonalNumber : " + diagonalNumber);
            await sleep(50);
            IS.x -= dd.d1;
            IS.y -= dd.d0;
            // colorSquareSimple(sl.x - (dd.d1 * i), sl.y - (dd.d0 * i));
            colorSquareSimple(IS.x, IS.y, "red");
        }
        
        for (var i = 1; i < directLineNumber; i++) {
            console.log("directLineNumber : " + directLineNumber + ", dld.x " + dld.x + ", dld.y " + dld.y );
            console.log("sl : " + sl.x + " " + sl.y + ", sc " + sc.x + " " + sc.y);
            await sleep(50);
            IS.x += dld.x;
            IS.y += dld.y;
            // colorSquareSimple(sl.x + (dld.x * i), sl.y + (dld.y * i));
            colorSquareSimple(IS.x, IS.y, "red");
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDistanceX() {
    var d = 0;
    var sl = squares.lastSquare;
    var sc = squares.currentSquare;
    if (sl.x === sc.x && sl.y === sc.y) {
        d = 0;
    } else if (sl.x !== sc.x && sl.y === sc.y) {
        d = Math.abs(sl.x - sc.x) * 10;
    } else if (sl.x === sc.x && sl.y !== sc.y) {
        d = Math.abs(sl.y - sc.y) * 10;
    } else if (sl.x !== sc.x && sl.y !== sc.y) {
        xOffset = Math.abs(sl.x - sc.x);
        yOffset = Math.abs(sl.y - sc.y);
        min = Math.min(xOffset, yOffset);
        diff = Math.abs(xOffset - yOffset);
        d = min * 14 + diff * 10;
    }
    document.getElementById("dist").innerHTML = d;
}
