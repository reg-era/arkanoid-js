import { Paddle } from "../models/paddle.js";
import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";

export class Game {
    constructor(containers, level, player) {
        this.model = containers

        this.container = this.model.container
        this.level = level

        this.player = player
        this.paddle = new Paddle(this.model.paddleContainer)
        this.ball = new Ball(this.model.container)
        this.bricks = []

        this.count = 0
        this.state = ''
        this.isGameOver = false
        this.isPaused = false
        this.isStarted = false

        this.gameControle

        this.createBricks();
        this.setupEventListeners();
    }

    createBricks() {
        this.level.forEach(row => {
            row.forEach(number => {
                let type, value
                switch (number) {
                    case 1:
                        this.count++
                        type = 'type1'
                        value = false
                        break;
                    default:
                        type = 'type0'
                        value = true
                        break;
                }

                const brick = new Brick(type, value, this.ball.ball)
                brick.render(this.model.brickContainer)
                this.bricks.push(brick)
            })
        })
    }

    setupEventListeners() {
        this.gameControle = (event) => {
            event.preventDefault()
            switch (event.key) {
                case 'ArrowLeft':
                    if (!this.isPaused) {
                        this.paddle.moveLeft()
                        if (!this.isStarted) {
                            this.ball.setPosition(this.paddle.speed + this.paddle.position + (this.paddle.width / 2))
                        }
                    }
                    break
                case 'ArrowRight':
                    if (!this.isPaused) {
                        this.paddle.moveRight()
                        if (!this.isStarted) {
                            this.ball.setPosition(this.paddle.speed + this.paddle.position + (this.paddle.width / 2))
                        }
                    }
                    break
                case ' ':
                    if (!this.isStarted) {
                        this.isStarted = true
                        this.model.gameMsg.textContent = ''
                        this.paddle.paddle.style.transition = 'left 0.2s ease-out'
                        this.start()
                    } else if (this.isStarted && !this.isPaused) {
                        this.isPaused = true
                    }
                    break
                case 'Escape':
                    if (!this.isStarted) {
                        this.player.loby()
                    }
                    break
            }
        }
        document.addEventListener('keydown', this.gameControle)
    }

    async start() {
        try {
            if (this.isStarted) this.ball.move()

            if (this.isPaused) {
                await this.player.menu()
                this.isPaused = false
            }

            if ((this.ball.y + this.ball.size) >= this.container.getBoundingClientRect().bottom) {
                this.state = 'lose'
                this.isGameOver = true
                return
            }

            for (let i = 0; i < this.bricks.length; i++) {
                if (!this.bricks[i].distroyed && this.bricks[i].isDistroyed()) {
                    this.count--
                    if (this.count <= 0) {
                        this.state = 'win'
                        this.isGameOver = true
                    }
                    this.player.incrementScore(5)
                    const brickRect = this.bricks[i].brick.getBoundingClientRect()
                    this.ball.changeDirection(brickRect)
                }
            }
            requestAnimationFrame(this.start.bind(this))
        } catch (error) {
            this.state = 'restar'
            this.isGameOver = true
        }
    }

    gameOver() {
        return new Promise((resolve, reject) => {
            const checkLevel = () => {
                if (this.isGameOver) {
                    this.resetGame()
                    resolve();
                } else {
                    setTimeout(checkLevel, 100)
                }
            }
            checkLevel()
        })
    }

    resetGame() {
        const bricks = document.querySelectorAll('.brick')
        if (bricks.length > 0) { bricks.forEach(el => el.remove()) }

        this.paddle.paddle.style.transition = ''
        this.isStarted = false
        this.isPaused = false

        document.removeEventListener('keydown', this.gameControle)
    }

    // mapgame = 16*10
    refactoreBricks() {
        const newMap = []
        let row = []
        this.bricks.forEach(brick => {
            if (row.length % 16 === 0) {
                newMap.push(row)
                row = []
            }
            row.push(brick.getValue())
        })
        return newMap
    }
}