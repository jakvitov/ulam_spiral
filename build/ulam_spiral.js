var WIDTH = 700;
var HEIGHT = 700;
var LINE_SIZE_MULTIPLIER = 20;
//Represents a 2x2 matrix representing a direction in a 2 dimensional eucleidian space
var Vector2D = /** @class */ (function () {
    function Vector2D(x_coord, y_coord) {
        this.x = x_coord;
        this.y = y_coord;
    }
    Vector2D.prototype.multipy = function (inputNum) {
        this.x = this.x * inputNum;
        this.y = this.y * inputNum;
    };
    //Orthogonal rotation in 2D space
    Vector2D.prototype.orthogRotate = function () {
        var sw = -this.x;
        this.x = this.y;
        this.y = sw;
    };
    Vector2D.prototype.print = function () {
        console.log("[" + this.x + ", " + this.y + "]");
    };
    return Vector2D;
}());
var drawBeginning = function () {
    var c = document.getElementById("drawCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(WIDTH / 2, HEIGHT / 2);
    ctx.fillText(1, WIDTH / 2, HEIGHT / 2);
    return ctx;
};
var drawSpiral = function () {
    var context = drawBeginning();
    var vec = new Vector2D(1, 0);
};
document.getElementById("drawButton").addEventListener("click", drawSpiral);
