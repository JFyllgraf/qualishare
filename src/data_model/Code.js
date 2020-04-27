//import * as Helpers from '../Utility/Helpers';
var randomColor = require('randomcolor');

class Code {
    constructor(name, id) {
        this.codeName = name; //'const' is private variable
        this._id = id
        this.memo = []; //'this' is publicly accessible variable
        this.link = undefined;
        this.color = undefined
        this.quoteRefs = [];
        //getters
        this.getName = function() { return this.codeName };
        this.getId = function() { return this._id };
        this.getColor = function() { return this.color};
        this.getQuotes = function () { return this.quoteRefs; };

        //setter
        this.addQuote = function (quote) {
            //also modfify database objects
                //do here
            this.quoteRefs = [...this.quoteRefs, quote];
        };
        this.removeQuote = function (quoteText) {
            for (let i = 0; i < this.quoteRefs.length; i++){
                if (this.quoteRefs[i].getQuoteText() === quoteText){
                    this.quoteRefs.slice(i, 1); //remove element
                    break;
                }
            }
        }
    }
}

export default Code
