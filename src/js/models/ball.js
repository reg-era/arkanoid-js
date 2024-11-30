export class Ball {
    constructor(speed) {
        this.speed = speed
        this.velocity = Vector2D
    }

    move() {
        this.velocity.x++
        this.velocity.x--
    }

    bounce(surface){
    }

    checkColision(obj){
    }

    resetPosition(){
    }
}