var ops = []

class BinOp {
  constructor(table, label) {
    this.table = [
      [true, true],
      [true, false],
      [false, true],
      [false, false]
    ]
    this.label = label || ''
    for (var i = 0; i < table.length; i++) {
      this.table[i].push(table[i])
    }
  }

  eval(a, b) {
    for (var i = 0; i < this.table.length; i++) {
      if (a == this.table[i][0] && b == this.table[i][1]) {
        return this.table[i][2]
      }
    }
  }

  toString() {
    return `Binary Operator (${this.label})`
  }
}

const operations = {
  'F': new BinOp([false, false, false, false], 'F'),
  'NOR': new BinOp([false, false, false, true], 'NOR'),
  'Xq': new BinOp([false, false, true, false], 'Xq'),
  '!p': new BinOp([false, false, true, true], '!p'),
  '↛': new BinOp([false, true, false, false], '↛'),
  '!q': new BinOp([false, true, false, true], '!q'),
  'XOR': new BinOp([false, true, true, false], 'XOR'),
  'NAND': new BinOp([false, true, true, true], 'NAND'),
  'AND': new BinOp([true, false, false, false], 'AND'),
  'XNOR': new BinOp([true, false, false, true], 'XNOR'),
  'q': new BinOp([true, false, true, false], 'q'),
  'if/then': new BinOp([true, false, true, true], 'if/then'),
  'p': new BinOp([true, true, false, false], 'p'),
  'then/if': new BinOp([true, true, false, true], 'then/if'),
  'or': new BinOp([true, true, true, false], 'or'),
  'T': new BinOp([true, true, true, true], 'T')
}

var ops = Object.values(operations)

function getOperation(label){
  return operations[label] || null
}

module.exports = {
  operations: ops,
  getOperation
}