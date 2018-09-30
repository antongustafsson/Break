class GateContext {
    constructor(){
        this.gates = {

        }
    }

    addGate(gate){
        if(this.gates[gate.label]){
            gate.label = gate.label + '1'
        }
        this.gates[gate.label] = gate
    }

    getGateByLabel(label){
        return this.gates[label]
    }
}

module.exports = {
    GateContext
}