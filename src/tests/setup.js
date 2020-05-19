import {Quote} from '../data_model/Quote';
import {getDefaultText} from '../Utility/Helpers';

//the return values of these functions should not be changed, since tests will then fail for no reason

function getQuote(){
    return new Quote("5", "book", {start: 18, end:22}, "15", "book", "Test");
}

function getSmallDefaultText(){
    return "You can’t judge a book by its cover";
}

function getRandomTextNode(){
    return document.createTextNode("This is some baseline text");
}
//get normal setup, with the long default text
function getHeaderElementWithChild(){
    let header = document.createElement("H1");
    let textNode = document.createTextNode(getSmallDefaultText());
    header.appendChild(textNode);
    return header;
}

module.exports = {
    getQuote: getQuote,
    getRandomTextNode: getRandomTextNode,
    getHeaderElementWithChild: getHeaderElementWithChild,
    getSmallDefaultText: getSmallDefaultText,
};