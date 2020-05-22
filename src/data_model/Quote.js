const summary_length = 5;
class Quote {

    constructor(id, quoteText, quoteOffset, codeRef, memo, userName) {
        this._id = id;
        this.quoteText = quoteText;
        this.quoteOffset = quoteOffset;
        this.codeRefs = codeRef;
        this.summary = this.quoteText.match(/([\w]*\s|[\w]*)/gm).splice(0, summary_length).toString(); //index out of range is not a problem, will always return at most
                                                                          // summary_length number of words
        this.memo = null;
        this.userName = userName;
        this.getQuoteText = function () { return this.quoteText; };
        this.getQuoteOffset = function () { return this.quoteOffset; };
        this.getCodeRefs = function () { return this.codeRefs; };
        this.getSummary = function () { return this.summary; };
    }
}

//const quote1 = new Quote("This is a really random summary text of which we would like to have the five first words returned", 2, [5]);
//console.log(quote1.getSummary().toString());
module.exports = {
    Quote: Quote,
};
//export default Quote;
