const {getDefaultText, splitNodeAndInsertSpan, constructQuoteFromData, createSpan, getEarlyQuote, findCorrectChildNode} = require('../Utility/Helpers');
const {getHeaderElementWithChild, getQuote, getRandomTextNode, getSmallDefaultText} = require('../tests/setup');
test('Should output default text', ()=>{
    const text = "a";
    expect(text).toBe("a");
});


//test find correct child node, insert some random spans
test("Insert some children, then find correct child should find the last textnode child",()=>{
    let rootNode = getHeaderElementWithChild();
    rootNode.insertBefore(getRandomTextNode(), rootNode.childNodes[0]);
    rootNode.insertBefore(createSpan(getQuote(), "red"), rootNode.childNodes[0]);
    expect(rootNode.childNodes.length).toEqual(3);
    expect(findCorrectChildNode(rootNode, getQuote())[0]).toEqual(rootNode.childNodes[rootNode.childNodes.length-1]);
    //expect last child to be the correct child
});

//test function splitNodeAndInsertSpan: base case 1 text node
test("Expect a rootnode with 3 children", ()=>{
    let rootNode = getHeaderElementWithChild();
    splitNodeAndInsertSpan(rootNode, getQuote(), "red");
    expect(rootNode.childNodes[0].textContent).toEqual("You can’t judge a ");
    expect(rootNode.childNodes[1].innerText).toEqual("book"); //this is span element
    expect(rootNode.childNodes[2].textContent).toEqual(" by its cover");
});

//test function splitNodeAndInsertSpan: where the first text node contains the quote, with two extra text nodes and
// a third span, which should be ignored
test("Expect text node to be split into two text nodes and a span, which contains the quote",()=>{
    let rootNode = getHeaderElementWithChild();
    splitNodeAndInsertSpan(rootNode, getQuote(), "red");

    //add some children to root
    rootNode.appendChild(document.createTextNode("Random text"));
    rootNode.appendChild(document.createTextNode("other text that should be ignored"));
    rootNode.appendChild(document.createElement("span"));

    expect(rootNode.childNodes[0].textContent).toEqual("You can’t judge a ");
    expect(rootNode.childNodes[1].innerText).toEqual("book"); //this is span element
    expect(rootNode.childNodes[2].textContent).toEqual(" by its cover");
});
