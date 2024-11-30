export class Paddle {
    constructor(object) {
        this.paddle = object.querySelector('.paddle')
        this.position = (object.getBoundingClientRect().right - object.getBoundingClientRect().left) / 2
        const midleWidth = (this.paddle.getBoundingClientRect().right - this.paddle.getBoundingClientRect().left)
        this.boundLeft = object.getBoundingClientRect().left - (midleWidth / 2) - 20
        this.boundright = object.getBoundingClientRect().right - (midleWidth * 2) + 20
        
        this.speed = 15
    }

    moveLeft() {
        if (!this.checkBoundary('left')) {
            const newposi = this.position - this.speed
            this.paddle.style.left = newposi + 'px';
            this.updatePosition(newposi)
        }
    }

    moveRight() {
        if (!this.checkBoundary('right')) {
            const newposi = this.position + this.speed
            this.paddle.style.left = newposi + 'px';
            this.updatePosition(newposi)
        }
    }

    updatePosition(number) {
        this.position = number
    }

    checkBoundary(direction) {
        return (direction === 'left') ?
            this.position <= this.boundLeft :
            this.position >= this.boundright
    }
}