export class ball {
    constructor(speed,direction,{x,y}){
        this.speed = speed;
        this.direction = direction;
        this.position = {x,y};
    }
    setdirection(direction){
        this.direction = direction
    }
    setSpeed(speed){
        this.speed = speed
    }

    getPosion(){
        return this.position
    }

    touchBorn(born){
        switch (born) {
            case 'left':
            case 'right':
            case 'top':
            case 'bottom':
        }
    }

    touchBrick(type){
        if (type != 'hidden') {
            this.direction
        }
    }
}