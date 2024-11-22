export class brick {
    constructor(type){
        this.type = type
    }

    setType(type){
        this.type = type
    }

    distroy() {
        if (this.type != 'hidden'){
            this.setType('hidden')
        }
    }
}