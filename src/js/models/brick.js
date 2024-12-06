export class Brick {
    constructor(type, value, ball) {
        this.type = type
        this.distroyed = value
        this.ball = ball
        this.brick
    }

    render(container) {
        const elem = document.createElement('div')
        elem.classList.add('brick')
        this.brick = elem

        this.setBrick(this.type, this.value)
        container.appendChild(elem)
    }

    isDistroyed() {
        const brickRect = this.brick.getBoundingClientRect()
        const ballRect = this.ball.getBoundingClientRect()

        if (!this.distroyed && (ballRect.y <= brickRect.bottom &&
            ballRect.x <= brickRect.right &&
            ballRect.right >= brickRect.x &&
            ballRect.bottom >= brickRect.y)) {

            this.setBrick('type0', true)
            return true
        }
        return false
    }

    setBrick(type, value) {
        switch (type) {
            case 'type0':
                this.brick.style.background = 'black'
                this.brick.style.border = 'none'
                break;
            case 'type1':
                this.brick.style.background = 'linear-gradient(135deg, #4A00E0, #8E2DE2)'
                this.brick.style.border = '1px solid #64FFDA'
                break;
        }
        this.type = type
        this.distroyed = value
    }
}