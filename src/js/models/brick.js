import { Vector2D } from "./vectore.js";

export class Brick {
    constructor(type, health) {
        this.health = health
        this.type = type
        this.position = Vector2D
    }

    hit() {
    }

    render(container) {
        const elem = document.createElement('div')
        elem.classList.add('brick')
        switch (this.type) {
            case 'empty':
                elem.style.backgroundColor = 'black'
                break
            case 'normal':
                elem.style.backgroundColor = 'white'
                break
        }
        container.appendChild(elem)
    }

    isDistroyed() {
    }

    getPoint() {
    }
}