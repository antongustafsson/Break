module.exports = function(GatePort, GatePorts, GateConnection, performOperation, Signal, Word){
    return class Gate {
        constructor(op, initial, label) {
            this.op = op || null
            this.p = new GatePort(this, GatePorts.P)
            this.q = new GatePort(this, GatePorts.Q)
            this.output = new GatePort(this, GatePorts.Out)
            this.initial = initial || false
            this.label = label || "Gate"
            this.currentPassId = null
        }
    
        isSatisfied(passId) {
            return !!this.p.poSignal && !!this.q.poSignal && this.p.poSignal.passId == passId && this.q.poSignal.passId == passId
        }
    
        invoke(pass) {
            this.currentPassId = pass.id
            if (this.op) {
                var result = performOperation(
                    pass.currentSignalPair[0].word.asWord,
                    pass.currentSignalPair[1].word.asWord,
                    this.op
                )
                if (this.output.connections.length > 0) {
                    for (var index = 0; index < this.output.connections.length; index++) {
                        var connection = this.output.connections[index];
                        connection.toPort.poSignal = new Signal(new Word(result))
                        connection.toPort.poSignal.passId = pass.id
                        if (connection.toPort.gate.isSatisfied(pass.id)) {
                            pass.currentSignalPair = [
                                connection.toPort.gate.p.poSignal,
                                connection.toPort.gate.q.poSignal
                            ]
                            pass.iteration ++
                            return connection.toPort.gate.invoke(pass)
                        }else{
                            // throw new Error(
                            //     `Gate '${this.label}' not satisfied.
                            //     P: ${this.p.poSignal}, Cc:${this.p.connections.length}
                            //     Q: ${this.q.poSignal}, Cc:${this.q.connections.length}
                            //     `
                            // )
                            // console.log(
                            //     `Gate '${this.label}' not satisfied.
                            //     P: ${this.p.poSignal}, Cc:${this.p.connections.length}
                            //     Q: ${this.q.poSignal}, Cc:${this.q.connections.length}
                            //     `
                            // )
                        }
                    }
                } else {
                    return new Word(result)
                }
            } else {
                throw new Error('No operation given to gate.')
            }
        }
    }
}