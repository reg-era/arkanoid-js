import { Player } from "./player.js";
import { Paddle } from "../models/paddle.js";
import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";

export class Game {
    constructor(containers, level) {
        this.model = containers

        this.container = this.model.container
        this.level = level

        this.player = new Player()
        this.paddle = new Paddle(this.model.paddleContainer)
        this.ball = new Ball(this.model.container)
        this.bricks = []

        this.isGameOver = false
        this.isPaused = false
        this.isStarted = false

        this.createBricks();
        this.setupEventListeners();
    }

    createBricks() {
        this.level.forEach(row => {
            row.forEach(number => {
                let type, value
                switch (number) {
                    case 1:
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
                    if (!this.isStarted && !this.isPaused) {
                        this.start()
                        this.isStarted = true
                    } else {
                        this.isPaused = true
                        this.pause()
                    }
                    break
            }
        });
    }

    start() {
        this.ball.move()
        for (let i = 0; i < this.bricks.length; i++) {
            if (!this.bricks[i].distroyed && this.bricks[i].isDistroyed()) {
                const brickRect = this.bricks[i].brick.getBoundingClientRect()
                this.ball.changeDirection(brickRect)
            }
        }
        requestAnimationFrame(this.start.bind(this))
    }

    pause() {
        this.isPaused = !this.isPaused;
    }

    restart() {
        this.player.reset();
        this.ball.reset();
        this.createBricks();
        this.isGameOver = false;
        this.isPaused = false;
    }

    levelComplete() {
        this.isPaused = true;
    }

    gameOver() {
        return new Promise((resolve, reject) => {
            const checkLevel = () => {
                const allZeros = this.level.every(row => row.every(cell => cell === 0));

                if (allZeros) {
                    resolve(true);
                } else {
                    setTimeout(checkLevel, 100)
                }
            };

            checkLevel();
        });
    }
    resetBall() {
        this.ball.reset(this.paddle.getPosition());
    }
}