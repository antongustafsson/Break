var { operations, getOperation } = require('./BinaryOperators')
var { numberToWord, wordToNumber, performOperation, trim } = require('./conversion')
var { GateContext } = require('./GateContext')
var { GateConnection } = require('./GateConnection')
var { GatePort, GatePorts } = require('./GatePort')(GateConnection)
var { Signal } = require('./Signal')
var Word = require('./Word')(numberToWord, wordToNumber, trim)
var Gate = require('./Gate')(GatePort, GatePorts, GateConnection, performOperation, Signal, Word)
var uuid = require('uuid').v1
var Pass = require('./Pass')(uuid)

class Solver {
    constructor(inputValues, outputValues) {
        this.inputValues = inputValues
        this.outputValues = outputValues
        this.context = null
    }

    solve() {
        this.context = new GateContext()
        
    }
}

var context = new GateContext()

context.addGate(new Gate(
    getOperation('or'),
    true,
    'rootGate1'
))
context.addGate(new Gate(
    getOperation('if/then'),
    true,
    'rootGate2'
))
context.addGate(new Gate(
    getOperation('XOR'),
    true,
    'rootGate3'
))
context.addGate(new Gate(
    getOperation('AND'),
    true,
    'andGate'
))
context.addGate(new Gate(
    getOperation('XOR'),
    true,
    'lastGate'
))

var rootGate1 = context.getGateByLabel('rootGate1')
var rootGate2 = context.getGateByLabel('rootGate2')
var rootGate3 = context.getGateByLabel('rootGate3')
var andGate = context.getGateByLabel('andGate')
var lastGate = context.getGateByLabel('lastGate')
rootGate1.output.connect(andGate.p)
rootGate2.output.connect(andGate.q)
rootGate3.output.connect(lastGate.p)
rootGate3.output.connect(lastGate.p)
andGate.output.connect(lastGate.q)

var pass = new Pass()
pass.registerSignalPair([
    new Signal(new Word(52)),
    new Signal(new Word(35))
])
rootGate1.invoke(pass)
pass.registerSignalPair([
    new Signal(new Word(12)),
    new Signal(new Word(98))
])
rootGate2.invoke(pass)
pass.registerSignalPair([
    new Signal(new Word(48)),
    new Signal(new Word(67))
])

console.log(rootGate3.invoke(pass).asNumber)