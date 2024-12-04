export class Brick {
    constructor(type, ball) {
        this.Distroyed = false
        this.type = type
        this.ball = ball
        this.brick
    }

    render(container) {
        const elem = document.createElement('div')
        elem.classList.add('brick')
        switch (this.type) {
            case 'empty':
                this.Distroyed = true
                elem.style.backgroundColor = 'black'
                break
            case 'normal':
                elem.style.backgroundColor = 'white'
                break
        }
        this.brick = elem
        container.appendChild(elem)
    }

    isDistroyed() {
        const brickRect = this.brick.getBoundingClientRect()
        const ballRect = this.ball.getBoundingClientRect()

        if (ballRect.y <= brickRect.bottom &&
            ballRect.x <= brickRect.right &&
            ballRect.right >= brickRect.x &&
            ballRect.bottom >= brickRect.y) {
            console.log('Brick destroyed');
            this.setBrick()
            return true
        }
        return false
    }

    setBrick() {
        this.type = 'empty'
        this.Distroyed = true
        this.brick.style.backgroundColor = 'black'
    }
}