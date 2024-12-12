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
        await game.gameOver()
        
        if (game.state === 'win') {
            player.stats.push({ level: i + 1, score: player.score - oldScore })
        } else if (game.state === 'lose') {
            player.health--
            if (player.health > 0) {
                i--
                console.log(game.bricks);

            } else {
                break
            }
        } else if (game.state === 'restar') {
            i--
        }

    }
    player.loby()
}

main()