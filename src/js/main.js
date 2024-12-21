import { levels } from './utils/levels.js';
import { Game } from './core/game.js'
import { createContainers } from './utils/maker.js'
import { Player } from './core/player.js';

export const main = async () => {
    const containers = createContainers()
    const player = new Player(containers)

    containers.gameMsg.textContent = 'Press Space to Start'
    document.body.appendChild(containers.gameMsg)

    for (let i = 0; i < Object.entries(levels).length; i++) {
        const oldScore = player.score

        const game = new Game(containers, levels[i], player)
        player.game = game

        player.setInfo(i + 1)
        await game.gameOver()

        if (game.state === 'win') {
            player.stats.push({ level: i + 1, score: player.score - oldScore })
            containers.gameMsg.textContent = 'Stage Complete! Press Space to Continue'
        } else if (game.state === 'lose') {
            player.health--
            if (player.health > 0) {
                i--
                containers.gameMsg.textContent = 'You Lost This Round! Press Space to Try Again'
                setTimeout(() => containers.gameMsg.textContent = '', 5000)
            } else {
                containers.gameMsg.textContent = 'Game Over!'
                setTimeout(() => containers.gameMsg.textContent = '', 5000)
                break
            }
        } else if (game.state === 'restar') {
            containers.gameMsg.textContent = 'Press space to start'
            i--
        }
    }
    player.loby()
}

main()