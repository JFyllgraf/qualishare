const summary_length = 5;
class Quote {

    constructor(quoteText, quoteOffset, codeRef) {
        const _quoteText = quoteText;
        const _quoteOffset = quoteOffset;
        const _codeRefs = [...codeRef];
        const _summary = quoteText.match(/([\w]*\s|[\w]*)/gm).splice(0, summary_length).toString(); //index out of range is not a problem, will always return at most
                                                                          // summary_length number of words
        this.getQuoteText = function () { return _quoteText; };
        this.getQuoteOffset = function () { return _quoteOffset; };
        this.getCodeRefs = function () { return _codeRefs; };
        this.getSummary = function () { return _summary; };
    }
}

//const quote1 = new Quote("This is a really random summary text of which we would like to have the five first words returned", 2, [5]);
//console.log(quote1.getSummary().toString());
export default Quote;