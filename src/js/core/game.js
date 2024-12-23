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

        this.gameControleKeys
        this.gameControleMouse

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
        this.gameControleKeys = (event) => {
            event.preventDefault()
            switch (event.key) {
                case 'ArrowRight':
                    if (!this.isPaused) {
                        this.paddle.move('right')
                        if (!this.isStarted) {
                            this.ball.setPosition(this.paddle.speed + this.paddle.position + (this.paddle.width / 2))
                        }
                    }
                    break
                case 'ArrowLeft':
                    if (!this.isPaused) {
                        this.paddle.move('left')
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


        let lastMouseMoveTime = 0
        const throttleDelay = 50
        this.gameControleMouse = (event) => {
            const now = Date.now()

            if (now - lastMouseMoveTime >= throttleDelay) {
                lastMouseMoveTime = now

                if (!this.isPaused) {
                    const centre = this.paddle.position + (this.paddle.width / 2)
                    if (event.clientX > centre) {
                        this.paddle.move('right', event.clientX)
                        !this.isStarted && this.ball.setPosition(event.clientX)
                    } else if (event.clientX < centre) {
                        this.paddle.move('left', event.clientX)
                        !this.isStarted && this.ball.setPosition(event.clientX)
                    }
                }
            }
        }

        document.addEventListener('keydown', this.gameControleKeys)
        document.addEventListener('mousemove', this.gameControleMouse)
    }

    async start() {
        try {
            if (this.isStarted) this.ball.move()

            if (this.isPaused) {
                await this.player.menu()
                this.isPaused = false
            }

            const dangerZone = this.model.paddleContainer.getBoundingClientRect()
            const deadline = dangerZone.bottom - ((dangerZone.bottom - dangerZone.top) / 2)
            if ((this.ball.y + this.ball.size) >= deadline) {
                this.state = 'lose'
                this.isGameOver = true
                return
            }
            // 
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

        document.removeEventListener('keydown', this.gameControleKeys)
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