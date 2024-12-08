export class Player {
    constructor(infos, level) {
        this.info = infos
        this.score = 0
        this.level = 1
    }

    setInfo(level, score) {
        this.info.innerHTML = `
        <h1><span>Level</span> ${level ? level : this.level}<span>Score</span> ${score ? score : this.score}</h1>
    `
    }
    incrementScore(num) {
        this.score += num
        this.setInfo(this.level, this.score)
    }
}