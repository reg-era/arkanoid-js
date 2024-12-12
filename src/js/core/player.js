export class Player {
    constructor(infos) {
        this.info = infos
        this.score = 0
        this.level = 1
        this.stats = []

        this.menuDisplayed = false
        this.lobyDisplayed = false

        addEventListener('keydown', (e) => {
            if (e.key == 'Escape') this.loby()
        })
    }

    loby() { 
        if (!this.lobyDisplayed){
            this.lobyDisplayed = true
            this.displayLoby()
        }else{
            document.querySelector('.loby').remove()
            this.lobyDisplayed = false
        }
    }

    menu() {
        if (!this.menuDisplayed) {
            this.menuDisplayed = true
            const [contin, restar] = this.displayMenu()
            document.body.classList.add('blur')
            return new Promise((resolve, reject) => {
                contin.addEventListener('click', e => {
                    this.removeMenu()
                    resolve(true)
                })
                restar.addEventListener('click', e => {
                    this.removeMenu()
                    reject()
                })
            })
        } else {
            this.removeMenu()
        }
    }

    displayMenu() {
        const menu = document.createElement('div')
        menu.classList.add('menu')
        menu.innerHTML = `
        <h1>menu game</h1>
        ${this.info.innerHTML}
        <div class="buttons">
            <button class="continue">continue</button>
            <button class="restar">restar</button>
        </div>
        `
        document.body.appendChild(menu)
        return [document.querySelector('.continue'), document.querySelector('.restar')]
    }

    displayLoby(){
        const loby = document.createElement('div')
        loby.classList.add('loby')
        loby.innerHTML = `
        <h1>game stats</h1>
        ${this.stats.map(val=>`<h2>level: <span>${val.level}</span>score: <span>${val.score}</span></h2><br>`)}
        <button class="replay">replay</button>
        `
        document.body.appendChild(loby)
        return document.querySelector('.replay')
    }

    removeMenu() {
        const menu = document.querySelector('.menu')
        if (menu) {
            menu.remove()
            document.body.classList.remove('blur')
        }
        this.menuDisplayed = false
    }

    setInfo(level, score) {
        this.level = level
        this.info.innerHTML = `
        <h1><span>Level</span> ${level ? level : this.level}<span>Score</span> ${score ? score : this.score}</h1>
    `
    }

    incrementScore(num) {
        this.score += num
        this.setInfo(this.level, this.score)
    }
}