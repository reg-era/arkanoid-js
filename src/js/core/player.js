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
    menu() {
        document.body.classList.add('blur')
        const [menu, contin, restar] = this.displayMenu()
        return new Promise((resolve, reject) => {
            contin.addEventListener('click', e => {
                menu.remove()
                document.body.classList.remove('blur')
                resolve(true)
            })
    
            restar.addEventListener('click', e => {
                menu.remove()
                document.body.classList.remove('blur')
                reject()
            })
        })
    }
    displayMenu() {
        const menu = document.createElement('div')
        menu.classList.add('menu')
        menu.innerHTML = `
        <h1>menu game</h1>
        <div class="buttons">
            <button class="continue">continue</button>
            <button class="restar">restar</button>
        </div>
        `
        document.body.appendChild(menu)
        return [menu, document.querySelector('.continue'), document.querySelector('.restar')]
    }
    incrementScore(num) {
        this.score += num
        this.setInfo(this.level, this.score)
    }
}