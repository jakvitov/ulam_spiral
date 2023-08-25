const WIDTH : number = 700;
const HEIGHT : number = 700;
let lineSize : number = 20;
let upperLimit : number = 100;


interface Coord2D {
    x : number;
    y : number;
}

//Represents a 2x2 matrix representing a direction in a 2 dimensional eucleidian space
class Vector2D {
    coord : Coord2D;

    constructor(x_coord: number, y_coord: number){
        this.coord = {x : x_coord, y : y_coord};
    }

    //Orthogonal rotation in 2D space
    orthogRotate(){
        let sw =  - this.coord.x;
        this.coord.x = this.coord.y;
        this.coord.y = sw;
    }

    getCoord(){
        return {x: this.coord.x, y: this.coord.y}
    }

    getX(){
        return this.coord.x;
    }

    getY(){
        return this.coord.y;
    }

    print(){
        console.log("[" + this.coord.x + ", " + this.coord.y + "]");
    }
}

const drawBeginning = () => {
    let c : any = document.getElementById("drawCanvas");
    let ctx : any = c.getContext("2d");  
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.font = "10px Arial";
    return ctx;
}

//Give me all primes up to num using sieve of Eratosthenes
const allSmallerPrimes = (num : number) => {
    let numbers :Array<boolean> = [];
    let maxLimit : number = Math.sqrt(num);
    let result : Array<number> = [];
    
    for (let i = 0; i < num; i ++){
        numbers.push(true);
    }

    for (let k = 2; k < maxLimit; k ++){
        //The k-th number is prime - we delete all its multipliers
        if (numbers[k]){
            for (let z = k * k; z < num; z += k){
                numbers[z] = false;
            }
        }
    }

    for (let o = 0; o < num; o ++){
        numbers[o] ? result.push(o) : false;
    }
    console.log("All smaller primes to : " + result[result.length - 1])
    return result;
}

const drawNumbersInLine = (context : any, num: number, scope : Coord2D, vec : Vector2D, k : number, primes : Array<number>) => {
    let rectSize=Math.max((lineSize/6), 1)
    for (let z : number = 0; (z < (k + 1)) && (num <= upperLimit) ; z++){
        //context.fillText(num, scope.x, scope.y); 
        if (primes.indexOf(num) != -1){
            context.fillRect(scope.x, scope.y, rectSize, rectSize)
        }
        //The scope is the direction vector transformed by line size
        scope.x = scope.x + (vec.getX() * (lineSize));
        scope.y = scope.y + (vec.getY() * (lineSize));
        num += 1;
    }
    return num;
}

const drawSpiral = () => {
    console.log("Drawing")
    let context : any = drawBeginning();
    let vec : Vector2D = new Vector2D(1,0);
    //We start with the scope at the middle of the screen
    let scope : Coord2D = {x : WIDTH/2, y: HEIGHT/2};
    let num : number = 1;
    let primes = allSmallerPrimes(upperLimit);
    //General spiral drawing loop
    for (let k : number = 0; (num <= upperLimit) ; k ++){    
        //We change the size of the line (number of numbers inside)
        for (let i : number = 0; (i < 2) && (num <= upperLimit); i ++){
            num = drawNumbersInLine(context, num, scope, vec, k, primes);
            vec.orthogRotate();
        }
    }  
}


document.getElementById("drawButton").addEventListener("click", drawSpiral)
document.getElementById("numberInput").addEventListener("input", (ev) => {
    const inputElement = ev.target as HTMLInputElement;
    upperLimit = parseInt(inputElement.value);
    lineSize = Math.max(Math.floor(Math.min(WIDTH, HEIGHT)/(Math.sqrt(upperLimit))), 1);
    console.log("Line size: " + lineSize);
    console.log("Upper limit updated: " + upperLimit);
})