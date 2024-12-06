export class Paddle {
    constructor(container) {
        this.width = 140
        this.speed = 20

        this.paddle = this.createPaddle(container)
        this.position = Number.parseFloat(this.paddle.style.left.slice(0, -2))
        this.boundLeft = container.getBoundingClientRect().x
        this.boundright = container.getBoundingClientRect().right
    }

    createPaddle(container) {
        const paddle = container.querySelector('.paddle')
        console.log(container);
        
        const rect = container.getBoundingClientRect()

        paddle.style.width = this.width + 'px'
        paddle.style.left = ((rect.right - this.width) / 2) + 'px'

        return paddle
    }

    moveLeft() {
        if (this.position >= this.boundLeft) {
            this.paddle.style.left = this.position - this.speed + 'px'
            this.position -= this.speed
        }
    }

    moveRight() {
        if (this.position+this.width <= this.boundright) {
            this.paddle.style.left = this.position + this.speed + 'px'
            this.position += this.speed
        }
    }
}