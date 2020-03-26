//import * as Helpers from '../Utility/Helpers';
var randomColor = require('randomcolor');

class Code {
    static ID = 0; //at some point, have database do this automatically, otherwise multiple clients will ruin this

    constructor(name) {
        this._name = name; //'const' is private variable
        this._id = Code.ID;
        Code.ID = Code.ID + 1;
        this.memo = []; //'this' is publicly accessible variable
        this.link = undefined;
        this._color = randomColor();
        let _quoteRefs = [];
        //getters
        this.getName = function() { return this._name };
        this.getId = function() { return this._id };
        this.getColor = function() { return this._color};
        this.getQuotes = function () { return _quoteRefs; };

        //setter
        this.addQuote = function (quote) {
            _quoteRefs = [..._quoteRefs, quote];
        };
        this.removeQuote = function (quoteText) {
            for (let i = 0; i < _quoteRefs.length; i++){
                if (_quoteRefs[i].getQuoteText() === quoteText){
                    _quoteRefs.slice(i, 1); //remove element
                    break;
                }
            }
        }
    }
}

export default Code
