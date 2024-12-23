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

    move(direct, dis) {
        const bound = this.container.getBoundingClientRect()
        const vertexez = this.position + (direct === 'right' ? this.width : 0)

        if (
            (direct === 'right' && vertexez < bound.right) ||
            (direct === 'left' && this.position > bound.left)
        ) {
            let newPos

            if (dis) {
                newPos = dis - (this.width / 2)
            } else {
                newPos = this.position + (direct === 'right' ? this.speed : -this.speed)
            }

            if (direct === 'right' && newPos + this.width > bound.right) {
                newPos = bound.right - this.width
            }

            if (direct === 'left' && newPos < bound.left) {
                newPos = bound.left
            }

            this.paddle.style.left = newPos + 'px'
            this.position = newPos
        }
    }
}