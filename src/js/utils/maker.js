export const createContainers = () => {
    document.body.querySelectorAll('*').forEach(elem=>{
        elem.remove()
    })
    return {
        gameMsg: makeDiv('game-msg', document.body),
        infos:makeDiv('infos', document.body),
        container: makeDiv('container', document.body),
        brickContainer: makeDiv('bricks-container', document.querySelector('.container')),
        space: makeDiv('space', document.querySelector('.container')),
        paddleContainer: makeDiv('paddle-container', document.querySelector('.container')),
        paddle: makeDiv('paddle', document.querySelector('.paddle-container'))
    }
}

const makeDiv = (divName, parent) => {
    const div = document.createElement('div')
    div.classList.add(divName)
    parent.appendChild(div)
    return div
}