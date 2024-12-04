import { Game } from "./core/game.js"

export const main = () => {
    const level = {
        "1": [
            [0, 0, 1, 1, 0, 1, 1, 0, 0, 0],
            [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
        ],
        "2": [
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
        ],
        "3": [
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
        ]
    }

    const container = document.createElement('div')
    container.classList.add('container')

    const paddle = document.createElement('div')
    paddle.classList.add('paddle')

    container.appendChild(paddle)
    document.body.appendChild(container)

    const game = new Game(container, level)
}

main()