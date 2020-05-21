import {getCleanDefaultText} from "../Utility/Helpers";

const {splitNodeAndInsertSpan, constructQuoteFromData, createSpan, getEarlyQuote, findCorrectChildNode} = require('../Utility/Helpers');
const {getHeaderElementWithChild, getQuote, getRandomTextNode, getSmallDefaultText, getDefaultTextSetup, getDefaultQuote_1, getDefaultQuote_2} = require('../tests/setup');
//#1
test('Should output default text', ()=>{
    const text = "a";
    expect(text).toBe("a");
});


//#2, test find correct child node, insert some random spans
test("Insert some children, then find correct child should find the last textnode child",()=>{
    let rootNode = getHeaderElementWithChild();
    rootNode.insertBefore(getRandomTextNode(), rootNode.childNodes[0]);
    rootNode.insertBefore(createSpan(getQuote(), "red"), rootNode.childNodes[0]);
    expect(rootNode.childNodes.length).toEqual(3);
    expect(findCorrectChildNode(rootNode, getQuote())[0]).toEqual(rootNode.childNodes[rootNode.childNodes.length-1]);
    //expect last child to be the correct child
});

//#3, test function splitNodeAndInsertSpan: base case 1 text node
test("Expect a rootnode with 3 children", ()=>{
    let rootNode = getHeaderElementWithChild();
    splitNodeAndInsertSpan(rootNode, getQuote(), "red");
    expect(rootNode.childNodes[0].textContent).toEqual("You can’t judge a ");
    expect(rootNode.childNodes[1].innerText).toEqual("book"); //this is span element
    expect(rootNode.childNodes[2].textContent).toEqual(" by its cover");
});

//test function splitNodeAndInsertSpan: where the first text node contains the quote, with two extra text nodes and
//#4, a third span, which should be ignored
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

//#5
test("insert two quotes, should now have 5 children in rootnode", ()=>{
    let rootNode = getDefaultTextSetup();

    splitNodeAndInsertSpan(rootNode, getDefaultQuote_1(), "red");
    splitNodeAndInsertSpan(rootNode, getDefaultQuote_2(), "red");

    expect(rootNode.childNodes.length).toEqual(5);
});
//#6,
test("insert two quotes, second quote should be correct",()=>{
    let rootNode = getDefaultTextSetup();

    splitNodeAndInsertSpan(rootNode, getDefaultQuote_1(), "red");
    splitNodeAndInsertSpan(rootNode, getDefaultQuote_2(), "red");

    expect(rootNode.childNodes[0].textContent).toEqual("WASHINGTON: ");
    expect(rootNode.childNodes[1].innerText).toEqual("The Trump administration"); //this should be span
    expect(rootNode.childNodes[2].textContent).toEqual(" is ");
    expect(rootNode.childNodes[3].innerText).toEqual("pushing"); //this should be span
    expect(rootNode.childNodes[4].nodeType).toEqual(3);
});

//#7, do same as test #6, but add quote before other two quotes
test("insert two quotes, then another in front of the two first",()=>{
    let rootNode = getDefaultTextSetup();

    splitNodeAndInsertSpan(rootNode, getDefaultQuote_1(), "red");
    splitNodeAndInsertSpan(rootNode, getDefaultQuote_2(), "red");
    splitNodeAndInsertSpan(rootNode, getDefaultQuote_3(), "red");

    expect(rootNode.childNodes[0].textContent).toEqual("WA");
    expect(rootNode.childNodes[1].innerText).toEqual("SHING");
    expect(rootNode.childNodes[2].textContent).toEqual("TON: ");
});

