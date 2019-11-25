// import { GamePanel } from '../../src/js/gamePanel.js';

(function() {

    var input = document.getElementById("n");
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    input.addEventListener('click', function(e) {
        var n = eval(input.value);
        let numTable = new GamePanel(n);
        var numPad = numTable.resetGame();
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // numPadtoString(numPad, n);
        drawPanel(numPad, n);
    });

    // ====================================
    // Draw numPad to Canvas
    // ====================================
    function drawPanel(a, n) {
        if (checkEnd(a, n)) {
            alert("The End!");
        }
        else {
            var cell = (canvas.width < canvas.height) ? canvas.width / n : canvas.height / n;   
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
                    
                    ctx.fillStyle = (a[i + 1][j + 1] == 0) ? 'purple' : 'yellow';
                    ctx.font = textSize + 'px georgia';
                    ctx.fillText(a[i + 1][j + 1], xStart + textSize / 2, yStart + textSize);
                    xStart += cell + 1;
                }
                xStart = 0;
                yStart += cell + 1;
            }
        }
    }

    // ====================================
    // Check, if the game is over
    // ====================================
    function checkEnd(a, n) {
        var z = 0;
        var gameEnd = true;
		var zaporedneStevilke = [];
		for(let i = 1; i < n * n; i++) {
			zaporedneStevilke[i - 1] = i; 
			zaporedneStevilke[(n * n) - 1] = 0;
		}
		for (let i = 1; i < n + 1; i++) {	
			for (let j = 1; j < n + 1; j++) {
				// console.log(a[j][i]);
                if (a[j][i] != zaporedneStevilke[z])
                    gameEnd = false;
					z++;
			}
        }
        return gameEnd;
    }
    
    // ====================================
    // NumPad to String
    // ====================================
    function numPadtoString(a) {

        var vrstica = "";
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a.length; j++) {
                vrstica += a[i][j] + "  ";
            }
            console.log(vrstica + "\n");
            vrstica = "";
        }
    }

})();