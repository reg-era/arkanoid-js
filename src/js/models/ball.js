export class Ball {
    constructor(object) {
        this.ball = this.createBall(object)
        const rect = object.getBoundingClientRect()
        this.x = rect.left
        this.y = rect.top

        this.speed = 1
        console.log(this.x, this.y)
    }

    move() {
        console.log(this.x, this.y)
        this.x += this.speed
        this.y += this.speed
        console.log(this.x, this.y)
        this.ball.style.left = this.x + 'px'
        this.ball.style.top = this.y + 'px'
    }

    bounce(surface) {
    }

    checkColision(obj) {
    }

    resetPosition() {
    }

    createBall(container) {
        const paddle = document.querySelector('.paddle')

        const ball = document.createElement('div')
        ball.classList.add('ball')
        const rect = paddle.getBoundingClientRect()
        
        ball.style.left = rect.left + 'px'
        ball.style.top = rect.top + 'px'
        
        container.appendChild(ball)
        return ball
    }
}