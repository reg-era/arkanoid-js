export class Ball {
    constructor(container) {
        this.container = container

        this.x = 0
        this.y = 0
        this.directionX = 0
        this.directionY = -1

        this.size = 15
        this.speed = 5

        this.ball = this.createBall()
    }

    calculateHitDirection(ballRect, surface) {
        const surfacCentre = surface.x + surface.width / 2
        const ballCenter = ballRect.x + ballRect.width / 2
        const hitDifference = ballCenter - surfacCentre
        const maxAngle = Math.PI / 4

        return hitDifference / (surface.width / 2) * Math.sin(maxAngle)
    }

    changeDirection(surface) {
        const ballRect = this.ball.getBoundingClientRect()
        if (
            ballRect.bottom >= surface.top &&
            ballRect.right >= surface.left &&
            ballRect.left <= surface.right
        ) {
            this.directionY *= -1
            this.directionX = this.calculateHitDirection(ballRect, surface)
        }
    }


    checkCollision() {
        const rect = this.container.getBoundingClientRect()

        if (this.x + this.size >= rect.right || this.x <= rect.left) {
            this.directionX *= -1
        }
        if (this.y <= rect.top || this.y + this.size >= rect.bottom) {
            this.directionY *= -1
        }
    }

    move() {
        const bound = this.container.getBoundingClientRect()
        let newPosX = this.x + (this.speed * this.directionX)
        let newPosY = this.y + (this.speed * this.directionY)

        if (newPosX < bound.left) newPosX = bound.left
        if (newPosX + this.size > bound.right) newPosX = bound.right - this.size
        if (newPosY < bound.top) newPosY = bound.top
        if (newPosY + this.size > bound.bottom) newPosY = bound.bottom - this.size

        this.x = newPosX
        this.y = newPosY

        this.ball.style.left = this.x + 'px'
        this.ball.style.top = this.y + 'px'

        const paddleRect = document.querySelector('.paddle').getBoundingClientRect()
        // this.protectBall(paddleRect)
        this.changeDirection(paddleRect)
        this.checkCollision()
    }

    createBall() {
        const prevBall = document.querySelector('.ball')
        if (prevBall) {
            prevBall.remove()
        }
        const paddle = document.querySelector('.paddle')
        const ball = document.createElement('div')
        ball.classList.add('ball')
        const rect = paddle.getBoundingClientRect()

        ball.style.width = this.size + 'px'
        ball.style.height = this.size + 'px'

        const x = (rect.x + ((rect.width - this.size) / 2))
        const y = rect.y - rect.height

        ball.style.left = x + 'px'
        ball.style.top = y - this.size + 'px'

        this.x = x
        this.y = y - this.size

        this.container.appendChild(ball)
        return ball
    }

    // protectBall(paddleBound) {
    //     if (this.y - this.size < paddleBound.top) {
    //         this.ball.style.top = paddleBound.top - this.size + 'px';
    //     } else {
    //         this.ball.style.top = this.y + 'px';
    //     }

    //     if (this.y + this.size > paddleBound.bottom) {
    //         this.ball.style.top = paddleBound.bottom - this.size + 'px';
    //     } else {
    //         this.ball.style.top = this.y + 'px';
    //     }

    //     if (this.x - this.size < paddleBound.left) {
    //         this.ball.style.left = paddleBound.left - this.size + 'px';
    //     } else {
    //         this.ball.style.left = this.x + 'px';
    //     }

    //     if (this.x + this.size > paddleBound.right) {
    //         this.ball.style.left = paddleBound.right - this.size + 'px';
    //     } else {
    //         this.ball.style.left = this.x + 'px';
    //     }
    // }


    setBallPosition(left, width) {
        const newPos = left + (width / 2) - (this.size / 2)
        this.x = newPos
        this.ball.style.left = newPos + 'px'
    }
}