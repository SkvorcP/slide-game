class GamePanel {

    constructor(n) {
        this.n = n;
    }

    resetGame() {

        var n = this.n;
        var zapStevilke = [];
        var stevilke = [];
        var b = 0;
        for(var i = 0; i < n * n; i++) {
            zapStevilke[i] = i;
        }
        for(var i = 0; i < n * n; i++) {
            var a = Math.floor(Math.random() * (n * n - i));
            stevilke[i] = zapStevilke[a];
            zapStevilke[a] = zapStevilke[n * n - 1 - i];
        }
        var stevila = [];
        for(var i = 0; i < n + 2; i++) {
            stevila[i] = [];
            for(var j = 0; j < n + 2; j++) {
                
                if(i == 0 || j == 0 || i == n + 1 || j == n + 1) {
                    stevila[i][j] = 1;
                } else {
                    stevila[i][j] = stevilke[b];
                    b++;
                }
            }
        }
        return stevila;
    }
}