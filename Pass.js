module.exports = function(uuid){
    return class Pass {
        constructor(initialSignalPair) {
            this.id = uuid()
            if(initialSignalPair){
                this.initialSignalPair = this.registerSignalPair(initialSignalPair)
            }
            this.iteration = 0
        }

        registerSignalPair(signalPair){
            this.currentSignalPair = signalPair
            this.currentSignalPair[0].passId = this.id
            this.currentSignalPair[1].passId = this.id
            return this.currentSignalPair
        }
    }
}