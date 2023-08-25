var WIDTH = 700;
var HEIGHT = 700;
var LINE_SIZE = 30;
var upperLimit = 100;
//Represents a 2x2 matrix representing a direction in a 2 dimensional eucleidian space
var Vector2D = /** @class */ (function () {
    function Vector2D(x_coord, y_coord) {
        this.coord = { x: x_coord, y: y_coord };
    }
    //Orthogonal rotation in 2D space
    Vector2D.prototype.orthogRotate = function () {
        var sw = -this.coord.x;
        this.coord.x = this.coord.y;
        this.coord.y = sw;
    };
    Vector2D.prototype.getCoord = function () {
        return { x: this.coord.x, y: this.coord.y };
    };
    Vector2D.prototype.getX = function () {
        return this.coord.x;
    };
    Vector2D.prototype.getY = function () {
        return this.coord.y;
    };
    Vector2D.prototype.print = function () {
        console.log("[" + this.coord.x + ", " + this.coord.y + "]");
    };
    return Vector2D;
}());
var drawBeginning = function () {
    var c = document.getElementById("drawCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "10px Arial";
    return ctx;
};
//Give me all primes up to num using sieve of Eratosthenes
var allSmallerPrimes = function (num) {
    var numbers = [];
    var maxLimit = Math.sqrt(num);
    var result = [];
    for (var i = 0; i < num; i++) {
        numbers.push(true);
    }
    for (var k = 2; k < maxLimit; k++) {
        //The k-th number is prime - we delete all its multipliers
        if (numbers[k]) {
            for (var z = k * k; z < num; z += k) {
                numbers[z] = false;
            }
        }
    }
    for (var o = 0; o < num; o++) {
        numbers[o] ? result.push(o) : false;
    }
    return result;
};
var drawSpiral = function () {
    var context = drawBeginning();
    var vec = new Vector2D(1, 0);
    //We start with the scope at the middle of the screen
    var scope = { x: WIDTH / 2, y: HEIGHT / 2 };
    var num = 1;
    //General spiral drawing loop
    for (var k = 0; k < 10; k++) {
        //We change the size of the line (number of numbers inside)
        for (var i = 0; i < 2; i++) {
            //We draw numbers in a straight line
            for (var z = 0; (z < (k + 1)) && (num < upperLimit); z++) {
                context.fillText(num, scope.x, scope.y);
                scope.x = scope.x + (vec.getX() * (LINE_SIZE));
                scope.y = scope.y + (vec.getY() * (LINE_SIZE));
                num += 1;
            }
            vec.orthogRotate();
        }
    }
};
document.getElementById("drawButton").addEventListener("click", drawSpiral);
document.getElementById("numberInput").addEventListener("input", function (ev) {
    var inputElement = ev.target;
    upperLimit = parseInt(inputElement.value);
});
