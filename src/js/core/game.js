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
        this.isGameOver = false
        this.isPaused = false
        this.isStarted = false

        this.createBricks();
        this.setupEventListeners();
    }

    initializeGame() {
        const bricks = document.querySelectorAll('.brick')
        if (bricks.length > 0) { bricks.forEach(el => el.remove()) }

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
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.paddle.moveLeft()
                    if (!this.isStarted) {
                        this.ball.setPosition(this.paddle.speed + this.paddle.position + (this.paddle.width / 2))
                    }
                    break
                case 'ArrowRight':
                    this.paddle.moveRight()
                    if (!this.isStarted) {
                        this.ball.setPosition(this.paddle.speed + this.paddle.position + (this.paddle.width / 2))
                    }
                    break
                case ' ':
                    if (this.isStarted && !this.isPaused) {
                        this.isPaused = true
                    }
                    if (!this.isStarted) {
                        this.isStarted = true
                        this.start()
                    }
                    break
            }
        });
    }

    async start() {
        try {
            this.ball.move()
            if (this.isPaused) {
                await this.player.menu()
                this.isPaused = false
            }
            for (let i = 0; i < this.bricks.length; i++) {
                if (!this.bricks[i].distroyed && this.bricks[i].isDistroyed()) {
                    this.count--
                    if (this.count <= 0) this.isGameOver = true
                    this.player.incrementScore(5)
                    const brickRect = this.bricks[i].brick.getBoundingClientRect()
                    this.ball.changeDirection(brickRect)
                }
            }
            requestAnimationFrame(this.start.bind(this))
        } catch (error) {
            this.isGameOver = true
        }
    }

    gameOver() {
        return new Promise((resolve, reject) => {
            const checkLevel = () => {
                if (this.isGameOver) {
                    this.initializeGame()
                    this.isStarted = false
                    this.isPaused = false
                    if (this.count) resolve(false)
                    resolve(true);
                } else {
                    setTimeout(checkLevel, 100)
                }
            }
            checkLevel()
        })
    }
}