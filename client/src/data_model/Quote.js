const summary_length = 5;
class Quote {

    constructor(text, quoteOffset, codeRef) {
        this.text = text;
        this.quoteOffset = quoteOffset;
        this.codeRef = [...codeRef];
        this.summary = text.match(/[\w]*\s/gm).splice(0, summary_length); //index out of range is not a problem, will always return at most
                                                                          // summary_length number of words
    }
}

//const quote1 = new Quote("This is a really random summary text of which we would like to have the five first words returned", 2, [5]);
//console.log(quote1.summary);
export default Quote;