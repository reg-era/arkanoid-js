export class Ball {
    constructor(container) {
        this.container = container
        this.x = 0
        this.y = 0
        this.directionX = 0
        this.directionY = -1
        this.size = 26
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

    move() {
        this.x += this.speed * this.directionX
        this.y += this.speed * this.directionY

        this.ball.style.left = this.x + 'px'
        this.ball.style.top = this.y + 'px'

        const paddleRect = document.querySelector('.paddle').getBoundingClientRect()
        this.changeDirection(paddleRect)
        this.checkCollision()
    }

    checkCollision() {
        const rect = this.container.getBoundingClientRect()

        if (this.x + this.size >= rect.right || this.x < rect.x) {
            this.directionX *= -1
        }
        if (this.y <= rect.y || this.y + this.size >= rect.bottom) {
            this.directionY *= -1
        }
    }

    createBall() {
        const paddle = document.querySelector('.paddle');
        const ball = document.createElement('div');
        ball.classList.add('ball');
        const rect = paddle.getBoundingClientRect();
        console.log(this.size);

        ball.style.width = this.size + 'px'
        ball.style.height = this.size + 'px'

        const x = (rect.x + ((rect.width - this.size) / 2))
        const y = rect.y - rect.height

        ball.style.left = x + 'px'
        ball.style.top = y - this.size + 'px'

        this.x = x
        this.y = y - this.size

        document.body.appendChild(ball);
        return ball;
    }
}