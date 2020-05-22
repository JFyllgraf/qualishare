class Code {
    constructor(name, id) {
        this.codeName = name; //'const' is private variable
        this._id = id;
        this.memo = []; //'this' is publicly accessible variable
        this.link = undefined;
        this.color = undefined;
        this.quoteRefs = [];
        this.userName = null;
        //getters
        this.getName = function() { return this.codeName };
        this.getId = function() { return this._id };
        this.getColor = function() { return this.color};
        this.getQuotes = function () { return this.quoteRefs; };

        //setter
        this.addQuote = function (id) {
            //also modfify database objects
                //do here
            this.quoteRefs = [...this.quoteRefs, id];
        };
        this.removeQuote = function (quote) {
            for (let i = 0; i < this.quoteRefs.length; i++){
                if (this.quoteRefs[i] === quote._id){
                    this.quoteRefs.splice(i, 1); //remove element

                    break;
                }
            }
        }
    }
}
module.exports = {
    Code: Code,
};