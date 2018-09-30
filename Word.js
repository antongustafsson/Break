module.exports = function(numberToWord, wordToNumber, trim){
    return class Word {
        constructor(value){
            this.value = value.constructor == Array ? value : trim(numberToWord(value))
        }
    
        get asNumber(){
            return wordToNumber(this.value)
        }
    
        get asWord(){
            return this.value
        }

        toString() {
            var buffer = ''
            for (var index = 0; index < this.value.length; index++) {
                var element = this.value[index];
                buffer += (
                    ((Math.round(this.value.length / 2) == this.value.length / 2) ?
                        (index == this.value.length / 2 ? ' ' : '')
                        : '')
                    + (element ? 1 : 0) + ' ')
            }
            return `[ ${buffer}]`
        }
    }
}