export class Paddle {
    constructor(container) {
        this.container = container
        this.width = 140
        this.speed = 20

        this.paddle = this.createPaddle()
        this.position = Number.parseFloat(this.paddle.style.left.slice(0, -2))
    }

    createPaddle() {
        const paddle = this.container.querySelector('.paddle')
        const rect = this.container.getBoundingClientRect()

        paddle.style.width = this.width + 'px'
        paddle.style.left = (rect.x + (rect.right / 2) - (this.width)) + 'px'

        return paddle
    }

    moveLeft(dis) {
        const boundLeft = this.container.getBoundingClientRect().left
        console.log(boundLeft);
        
        if (this.position > boundLeft) {
            if (dis) {
                this.paddle.style.left = dis - (this.width / 2) + 'px'
                this.position = dis - (this.width / 2)
                return
            }
            this.paddle.style.left = this.position - this.speed + 'px'
            this.position -= this.speed
        }
    }

    moveRight(dis) {
        const boundright = this.container.getBoundingClientRect().right
        if (this.position + this.width < boundright) {
            if (dis) {
                this.paddle.style.left = dis - (this.width / 2) + 'px'
                this.position = dis - (this.width / 2)
                return
            }
            this.paddle.style.left = this.position + this.speed + 'px'
            this.position += this.speed
        }
    }
}