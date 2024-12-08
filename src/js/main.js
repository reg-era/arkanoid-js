import { levels } from './utils/levels.js';
import { Game } from './core/game.js'
import { createContainers } from './utils/maker.js'
import { Player } from './core/player.js';

export const main = async () => {

    const containers = createContainers()
    const player = new Player(containers.infos, 1, 3)

    for (let i = 0; i < Object.entries(levels).length; i++) {
        player.setInfo(i + 1)
        const game = new Game(containers, levels[i], player)        
        const state = await game.gameOver()
        if (!state) i--
    }
}

main()