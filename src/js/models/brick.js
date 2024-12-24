export class Brick {
    constructor(type, ball) {
        this.brick
        this.ball = ball
        this.type = type
        this.reward
        this.distroyed
    }

    render(container) {
        const elem = document.createElement('div')
        elem.classList.add('brick')
        container.appendChild(elem)

        this.brick = elem
        this.setBrick(this.type)
    }

    isDistroyed() {
        const brickRect = this.brick.getBoundingClientRect()
        const ballRect = this.ball.getBoundingClientRect()

        if (!this.distroyed && (ballRect.y <= brickRect.bottom &&
            ballRect.x <= brickRect.right &&
            ballRect.right >= brickRect.x &&
            ballRect.bottom >= brickRect.y)) {
            return true
        }
        return false
    }

    setBrick(type) {
        this.type = type
        switch (type) {
            case 'type0':
                this.brick.style.background = 'black'
                this.brick.style.border = 'none'
                this.reward = 0
                this.distroyed = true

                break;
            case 'type1':
                this.brick.style.background = 'linear-gradient(135deg,rgb(67, 0, 175),rgb(220, 217, 223))'
                this.brick.style.border = '1px solid #64FFDA'
                this.reward = 5
                this.distroyed = false
                break;
            case 'type2':
                this.brick.style.background = 'linear-gradient(135deg,rgb(196, 0, 0), rgb(220, 217, 223))'
                this.brick.style.border = '1px solid #64FFDA'
                this.reward = 10
                this.distroyed = false
                break;
            case 'type3':
                this.brick.style.background = 'linear-gradient(135deg,rgb(251, 255, 0), rgb(220, 217, 223))'
                this.brick.style.border = '1px solid #64FFDA'
                this.reward = 20
                this.distroyed = false
                break;

        }
    }

    hitBrick() {
        const currentType = Number.parseInt(this.type.slice(-1));
        (currentType <= 0) ? this.setBrick('type0') : this.setBrick(`type${currentType - 1}`)
    }
}