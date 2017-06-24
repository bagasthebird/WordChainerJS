const WordException = require('./WordException');

class InvalidWordException extends WordException {
    constructor() {
        super();
        this.name = 'InvalidWordException';
        this.message = 'The word is invalid. Try another word!';
    }
}

module.exports = InvalidWordException;