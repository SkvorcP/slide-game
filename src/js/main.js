// import { GamePanel } from '../../src/js/gamePanel.js';

(function() {
    
    var n;
    var numPad;
    var cell;
    var gameEnd = false;
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var input = document.getElementById("n");
    input.addEventListener('click', function(e) {    
        n = eval(input.value);
        var numTable = new GamePanel(n);
        numPad = numTable.resetGame();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cell = (canvas.width < canvas.height) ? canvas.width / n : canvas.height / n;   
        drawPanel();
    });

    canvas.addEventListener('click', function(e) {
        moveCell(e);
    });

    function moveCell(e) {
        var mouseY = e.clientX;
        var mouseX = e.clientY;
        var tx = Math.ceil(mouseX / cell);
        var ty = Math.ceil(mouseY / cell);
        var number = numPad[tx][ty];
        console.log("Cell:" + cell);
        console.log("X:" + mouseX);
        console.log("Y:" + mouseY);
        console.log(tx);
        console.log(ty);
        console.log("Number: " + number);

        if ((tx <= n) && (ty <= n)) {

            // up
            if (number != 0 && numPad[tx + 1][ty] == 0) {
                numPad[tx + 1][ty] = number;
                numPad[tx][ty] = 0; 
                drawPanel();
            } 	
            
            // down
            else if (number != 0 && numPad[tx - 1][ty] == 0) {
                numPad[tx - 1][ty] = number;
                numPad[tx][ty] = 0; 
                drawPanel();
            }	
            
            // left
            else if (number != 0 && numPad[tx][ty + 1] == 0) {
                numPad[tx][ty + 1] = number;
                numPad[tx][ty] = 0; 
                drawPanel();
            }	
            
            // down
            else if (number != 0 && numPad[tx][ty - 1] == 0) {
                numPad[tx][ty - 1] = number;
                numPad[tx][ty] = 0; 
                drawPanel();
            }
        }
    }
        
    // ====================================
    // Draw numPad to Canvas
    // ====================================
    function drawPanel() {

        numPadtoString();
        
        var textSize = cell / 2;
        var xStart = 0;
        var yStart = 0;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                ctx.beginPath();
                ctx.rect(xStart, yStart, cell - 1, cell - 1);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
                
                ctx.fillStyle = (numPad[i + 1][j + 1] == 0) ? 'purple' : 'yellow';
                ctx.font = textSize + 'px georgia';
                ctx.fillText(numPad[i + 1][j + 1], xStart + textSize / 2, yStart + textSize);
                xStart += cell + 1;
            }
            xStart = 0;
            yStart += cell + 1;
        }
        
        checkEnd()
        if (gameEnd) {
            alert("The End!");
        }
    }

    // ====================================
    // Check, if the game is over
    // ====================================
    function checkEnd() {
        var z = 0;
        gameEnd = true;
		var zaporedneStevilke = [];
		for(let i = 1; i < n * n; i++) {
			zaporedneStevilke[i - 1] = i; 
			zaporedneStevilke[(n * n) - 1] = 0;
		}
		for (let i = 1; i < n + 1; i++) {	
			for (let j = 1; j < n + 1; j++) {
                if (numPad[i][j] != zaporedneStevilke[z])
                    gameEnd = false;
					z++;
			}
        }
    }
    
    // ====================================
    // NumPad to String
    // ====================================
    function numPadtoString() {

        var vrstica = "";
        for (let i = 0; i < numPad.length; i++) {
            for (let j = 0; j < numPad.length; j++) {
                vrstica += numPad[i][j] + "  ";
            }
            console.log(vrstica + "\n");
            vrstica = "";
        }
    }

})();