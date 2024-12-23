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

        if (this.x <= rect.left || this.x + this.size >= rect.right) {
            this.x = (this.x <= rect.left) ? rect.left : (rect.right - this.size)
            this.directionX *= -1
        }
        if (this.y <= (rect.top + 13) || this.y + this.size >= rect.bottom) {
            this.y = (this.y <= (rect.top + 13)) ? (rect.top + 13) : rect.bottom - this.size
            this.directionY *= -1
        }
    }

    move() {
        const bound = this.container.getBoundingClientRect()
        let newPosX = this.x + (this.speed * this.directionX)
        let newPosY = this.y + (this.speed * this.directionY)


        this.x = newPosX
        this.y = newPosY
        this.ball.style.left = this.x + 'px'
        this.ball.style.top = this.y + 'px'
        
        const paddleRect = document.querySelector('.paddle').getBoundingClientRect()
        
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

    setBallPosition(left, width) {
        const newPos = left + (width / 2) - (this.size / 2)
        this.x = newPos
        this.ball.style.left = newPos + 'px'
    }
}