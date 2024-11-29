import { Game } from "./core/game.js"

export const main = () => {
    const level = {
        1: {
            map: [
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0]
            ]
        }
    }

    const container = document.createElement('div')
    container.classList.add('container')

    const paddle = document.createElement('div')
    paddle.classList.add('paddle')

    const ball = document.createElement('div')
    ball.classList.add('ball')

    container.appendChild(paddle)
    container.appendChild(ball)
    document.body.appendChild(container)

    const game = new Game(container,level)
    game.start()
}

main()