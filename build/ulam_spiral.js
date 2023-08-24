var WIDTH = 700;
var HEIGHT = 700;
var LINE_SIZE = 20;
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
    return ctx;
};
var drawSpiral = function () {
    var context = drawBeginning();
    var vec = new Vector2D(1, 0);
    //We start with the scope at the middle of the screen
    var scope = { x: WIDTH / 2, y: HEIGHT / 2 };
    context.beginPath();
    var lineLength = LINE_SIZE;
    for (var k = 0; k < 10; k++) {
        //We change the size of the line every 2 strokes
        for (var i = 0; i < 2; i++) {
            console.log("i: " + i);
            context.moveTo(scope.x, scope.y);
            scope.x = scope.x + (vec.getX() * lineLength);
            scope.y = scope.y + (vec.getY() * lineLength);
            context.lineTo(scope.x, scope.y);
        }
        lineLength = lineLength + LINE_SIZE;
        console.log("k " + k);
        vec.orthogRotate();
    }
    context.stroke();
};
document.getElementById("drawButton").addEventListener("click", drawSpiral);
