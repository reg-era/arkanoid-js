import { Player } from "./player.js";
import { Paddle } from "../models/paddle.js";
import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";

export class Game {
    constructor(session, road) {
        this.container = session
        this.levels = road

        this.player = new Player()
        this.paddle = new Paddle()
        this.ball = new Ball()
        this.bricks = []

        this.isGameOver = false
        this.isPaused = false
    }

    initialize() {
        this.createBricks();
        this.setupEventListeners();
    }

    createBricks() {
        console.log(this.road);
        
    }

    setupEventListeners() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }

    handleKeyPress(event) {
        if (this.isPaused) return;

        switch (event.key) {
            case 'ArrowLeft':
                this.paddle.moveLeft()
                break
            case 'ArrowRight':
                this.paddle.moveRight()
                break
            case ' ':
                this.ball.launch()
                break
        }
    }

    update(deltaTime) {
        if (this.isGameOver || this.isPaused) return;

        this.ball.update(deltaTime);
        this.checkCollisions();
        this.updateGameState();
    }

    checkCollisions() {
        this.checkWallCollisions();
        this.checkPaddleCollision();
        this.checkBrickCollisions();
    }

    checkWallCollisions() {
        // Implement wall collision logic
    }

    checkPaddleCollision() {
        // Implement paddle collision logic
    }

    checkBrickCollisions() {
        // Implement brick collision logic
    }

    updateGameState() {
        if (this.bricks.every(brick => brick.isDestroyed())) {
            this.levelComplete();
        }

        if (this.ball.isOutOfBounds()) {
            this.player.decrementLives();

            if (this.player.getLives() <= 0) {
                this.gameOver();
            } else {
                this.resetBall();
            }
        }
    }

    render() {
    }

    levelComplete() {
        this.isPaused = true;
    }

    gameOver() {
        this.isGameOver = true;
    }

    resetBall() {
        this.ball.reset(this.paddle.getPosition());
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

    start() {
        this.gameLoop();
    }

    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(this.gameLoop.bind(this));
    }
}