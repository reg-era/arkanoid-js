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
                this.count += number
                const brick = new Brick('type' + number, this.ball.ball)
                brick.render(this.model.brickContainer)
                this.bricks.push(brick)
            })
        })
    }

    setupEventListeners() {
        this.gameControleKeys = (event) => {
            // event.preventDefault()
            if ((event.key === 'ArrowRight' || event.key === 'd') && !this.isPaused) {
                this.paddle.move('right')
                !this.isStarted && this.ball.setBallPosition(this.paddle.position, this.paddle.width)
            } else if ((event.key === 'ArrowLeft' || event.key === 'a') && !this.isPaused) {
                this.paddle.move('left')
                !this.isStarted && this.ball.setBallPosition(this.paddle.position, this.paddle.width)
            } else if (event.key === ' ') {
                if (!this.isStarted) {
                    this.isStarted = true
                    this.model.gameMsg.textContent = ''
                    this.paddle.paddle.style.transition = 'left 0.1s ease-out'
                    this.start()
                } else if (this.isStarted && !this.isPaused) {
                    this.isPaused = true
                }
            } else if (event.key === 'Escape' && !this.isStarted) {
                this.player.loby()
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
                        !this.isStarted && this.ball.setBallPosition(this.paddle.position, this.paddle.width)
                    } else if (event.clientX < centre) {
                        this.paddle.move('left', event.clientX)
                        !this.isStarted && this.ball.setBallPosition(this.paddle.position, this.paddle.width)
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

            for (let i = 0; i < this.bricks.length; i++) {
                if (!this.bricks[i].distroyed && this.bricks[i].isDistroyed()) {
                    this.count--
                    if (this.count <= 0) {
                        this.state = 'win'
                        this.isGameOver = true
                    }
                    this.player.incrementScore(this.bricks[i].reward)
                    this.bricks[i].hitBrick()

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
            row.push(Number.parseInt(brick.type.slice(-1)))
        })
        return newMap
    }
}