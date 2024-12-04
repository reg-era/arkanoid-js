export class Player {
    constructor(score, lives) {
        this.score = score;
        this.lives = lives;
    }

    incrementScore(num) {
        this.score += num
    }
    decrementLives() {
        this.lives--
    }

    getScore() { }
    getLives() { }
}