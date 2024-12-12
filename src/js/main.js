import { levels } from './utils/levels.js';
import { Game } from './core/game.js'
import { createContainers } from './utils/maker.js'
import { Player } from './core/player.js';

export const main = async () => {
    const containers = createContainers()
    const player = new Player(containers)


    for (let i = 0; i < Object.entries(levels).length; i++) {
        const oldScore = player.score

        const game = new Game(containers, levels[i], player)
        player.game = game
        player.setInfo(i + 1)
        const state = await game.gameOver()

        state ? player.stats.push({ level: i + 1, score: player.score - oldScore }) : i--
    }

    player.loby()
}

main()