const GatePorts = {
    P: 0x0,
    Q: 0x1,
    Out: 0x2
}

module.exports = function (GateConnection) {
    return {
        GatePort: class GatePort {
            constructor(gate, port) {
                this.gate = gate
                this.port = port
                this.connections = []
                this.poSignal = null
            }

            connect(port) {
                var connection
                if (((port.port == GatePorts.P || port.port == GatePorts.Q) && this.port == GatePorts.Out) || (port.port == GatePorts.Out && (this.port == GatePorts.P || this.port == GatePorts.Q))) {
                    if (this.port == GatePorts.Out) {
                        connection = new GateConnection(this, port)
                    } else {
                        connection = new GateConnection(port, this)
                    }
                } else {
                    throw new Error('Cannot connect input port to another input port, or output to output.')
                }
                this.connections.push(connection)
                port.connections.push(connection)
            }
        },
        GatePorts: GatePorts
    }
}