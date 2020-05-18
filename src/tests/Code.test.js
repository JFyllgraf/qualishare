const {Code} = require('../data_model/Code');
const {Quote} = require('../data_model/Quote');
test("Should instantiate new Code", ()=> {
    let code = new Code("Code 1", "1", " ");

    expect(code.memo).toEqual([]);
    expect(code.link).toBeUndefined();
    expect(code.color).toBeUndefined();
    expect(code.quoteRefs).toEqual([]);
    expect(code.userName).toBeNull();

});

test("Id should be undefined if not given as parameter",()=>{
    let code = new Code("Code 1");
    expect(code._id).toBeUndefined();
})


test("Should add and remove quotes", ()=>{
    let quote = new Quote("5", "My Quote Text");
    let quote1 = new Quote( "7", "Another super quote");
    let code = new Code("Code 1", "1");
    code.addQuote(quote._id)
    expect(code.quoteRefs[0]).toBe("5");
    code.addQuote(quote1._id)
    expect(code.quoteRefs[1]).toBe("7");

    expect(code.quoteRefs.length).toEqual(2);
    code.removeQuote(quote);
    expect(code.quoteRefs.length).toEqual(1);
});
