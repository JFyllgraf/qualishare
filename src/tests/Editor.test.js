const {createSpan, findCorrectChildNode, splitNodeAndInsertSpan} = require('../components/Content/Editor/Editor');
const {getQuote, getHeaderElementWithChild, getRandomTextNode, getSmallDefaultText} = require('../tests/setup'); //this works, but the following: "require(''setup)" does not work...

test('Should output default text', ()=>{
    const text = "a";
    let span = createSpan(getQuote());
    expect(text).toBe("a");
});

//testing cloneNode built-in function, just to figure out how it works
test("Span id's should be different",()=>{
   let span = createSpan(getQuote());
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
//test find correct child node, insert some random spans
test("Insert some children, then find correct child should find the last textnode child",()=>{
   let rootNode = getHeaderElementWithChild();
   rootNode.insertBefore(getRandomTextNode(), rootNode.childNodes[0]);
   rootNode.insertBefore(createSpan(getQuote()), rootNode.childNodes[0]);
   expect(rootNode.childNodes.length).toEqual(3);
   expect(findCorrectChildNode(rootNode, getQuote())[0]).toEqual(rootNode.childNodes[rootNode.childNodes.length-1]);
   //expect last child to be the correct child
});

//test function splitNodeAndInsertSpan: base case 1 text node
test("Expect a rootnode with 3 children", ()=>{
    let rootNode = getHeaderElementWithChild();
    splitNodeAndInsertSpan(rootNode, getQuote());
    expect(rootNode.childNodes[0].textContent).toEqual("You can’t judge a ");
    expect(rootNode.childNodes[1].innerText).toEqual("book"); //this is span element
    expect(rootNode.childNodes[2].textContent).toEqual(" by its cover");
});

//test function splitNodeAndInsertSpan: where the first text node contains the quote, with two extra text nodes and
// a third span, which should be ignored
test("Expect text node to be split into two text nodes and a span, which contains the quote",()=>{
    let rootNode = getHeaderElementWithChild();
    splitNodeAndInsertSpan(rootNode, getQuote());

    //add some children to root
    rootNode.appendChild(document.createTextNode("Random text"));
    rootNode.appendChild(document.createTextNode("other text that should be ignored"));
    rootNode.appendChild(document.createElement("span"));

    expect(rootNode.childNodes[0].textContent).toEqual("You can’t judge a ");
    expect(rootNode.childNodes[1].innerText).toEqual("book"); //this is span element
    expect(rootNode.childNodes[2].textContent).toEqual(" by its cover");
});