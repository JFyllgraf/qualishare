const {createSpan, findCorrectChildNode} = require('../Utility/Helpers');
const {getQuote, getHeaderElementWithChild, getSmallDefaultText} = require('../tests/setup'); //this works, but the following: "require(''setup)" does not work...

test('Should output default text', ()=>{
    const text = "a";
    let span = createSpan(getQuote(), "red");
    expect(text).toBe("a");
});

//testing cloneNode built-in function, just to figure out how it works
test("Span id's should be different",()=>{
   let span = createSpan(getQuote(), "red");
   let clonedSpan = span.cloneNode(true);
   span.id = "29";
   expect(span.id).not.toEqual(clonedSpan.id);
});

//We test the function splitNodeAndInsertSpan
//the function should find the correct textNode, create two new ones
//insert
/*
test("Test function splitNodeAndInsertSpan",()=>{
    let rootNode = getHeaderElementWithChild();
    let quote = getQuote();
    expect(rootNode.childElementCount === 3)
});
*/

//test function find correct child text node
test("Should return the only text child node", ()=>{
    let rootNode = getHeaderElementWithChild();
    let quote = getQuote();
    let arr = findCorrectChildNode(rootNode, quote);

    expect(arr[0].textContent).toEqual(getSmallDefaultText());
    expect(arr[1]).toEqual(0);
});