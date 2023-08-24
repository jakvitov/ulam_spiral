const WIDTH : number = 700;
const HEIGHT : number = 700;
const LINE_SIZE_MULTIPLIER : number = 20;

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

    multipy(inputNum: number){
        this.coord.x = this.coord.x * inputNum;
        this.coord.y = this.coord.y * inputNum;
    }

    //Orthogonal rotation in 2D space
    orthogRotate(){
        let sw =  - this.coord.x;
        this.coord.x = this.coord.y;
        this.coord.y = sw;
    }

    print(){
        console.log("[" + this.coord.x + ", " + this.coord.y + "]");
    }
}

const drawBeginning = () => {
    let c : any = document.getElementById("drawCanvas");
    let ctx : any = c.getContext("2d");  
    
    ctx.moveTo(WIDTH/2, HEIGHT/2);
    ctx.fillText(1, WIDTH/2, HEIGHT/2);  
    return ctx;
}

const drawSpiral = () => {
    let context : any = drawBeginning();
    let vec : Vector2D = new Vector2D(1,0);

}


document.getElementById("drawButton").addEventListener("click", drawSpiral)