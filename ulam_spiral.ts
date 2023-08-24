const WIDTH : number = 700;
const HEIGHT : number = 700;
const LINE_SIZE : number = 30;

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
    ctx.font = "10px Arial";
    return ctx;
}

const drawSpiral = () => {
    let context : any = drawBeginning();
    let vec : Vector2D = new Vector2D(1,0);
    //We start with the scope at the middle of the screen
    let scope : Coord2D = {x : WIDTH/2, y: HEIGHT/2};
    let num : number = 1;
    //General spiral drawing loop
    for (let k : number = 0; k < 100; k ++){    
        //We change the size of the line (number of numbers inside)
        for (let i : number = 0; i < 2; i ++){
            //We draw numbers in a straight line
            for (let z : number = 0; z < (k + 1); z++){
                context.fillText(num, scope.x, scope.y); 
                scope.x = scope.x + (vec.getX() * (LINE_SIZE));
                scope.y = scope.y + (vec.getY() * (LINE_SIZE));
                num += 1;
            }
            vec.orthogRotate();
        }
    }   
}


document.getElementById("drawButton").addEventListener("click", drawSpiral)