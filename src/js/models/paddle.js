export class Paddle {
    constructor(container) {
        this.width = 140
        this.speed = 20

        this.paddle = this.createPaddle(container)
        this.position = Number.parseFloat(this.paddle.style.left.slice(0, -2))
        this.boundLeft = container.getBoundingClientRect().left
        this.boundright = container.getBoundingClientRect().right
    }

    createPaddle(container) {
        const paddle = container.querySelector('.paddle')
        const rect = container.getBoundingClientRect()

        paddle.style.width = this.width + 'px'
        paddle.style.left = (rect.x + (rect.right / 2) - (this.width)) + 'px'

        return paddle
    }

    moveLeft() {
        if (this.position > this.boundLeft + 4) {
            this.paddle.style.left = this.position - this.speed + 'px'
            this.position -= this.speed
        }
    }

    moveRight() {
        if (this.position + this.width < this.boundright) {
            this.paddle.style.left = this.position + this.speed + 'px'
            this.position += this.speed
        }
    }
}