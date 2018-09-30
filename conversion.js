function numberToWord(number) { // Give fixed length for all by max length of both
    var digArr = number.toString(2).split('')
    var wordLength = 16
    var word = new Array(Math.min(16 - digArr.length, 16)).fill(false)
    for (var index = 0; index < digArr.length; index++) {
        var element = digArr[index];
        word.push(element == 1)
    }
    return word
}

function wordToNumber(word) {
    var digArr = []
    for (var index = 0; index < word.length; index++) {
        var element = word[index];
        digArr.push(element ? 1 : 0)
    }
    var number = parseInt(digArr.join(''), 2)
    return number
}

function performOperation(word1, word2, operation) {
    var resultWord = []
    for (var index = 0; index < word1.length; index++) {
        var bit1 = word1[index];
        var bit2 = word2[index];
        var result = operation.eval(bit1, bit2)
        resultWord.push(result)
    }
    return resultWord
}

function trim(word){
    var start = 0
    for (var index = 0; index < word.length; index++) {
        var element = word[index];
        if(element){
            start = index
            break
        }
    }
    word.splice(0, start)
    return word
}

module.exports = {
    numberToWord,
    wordToNumber,
    performOperation,
    trim
}