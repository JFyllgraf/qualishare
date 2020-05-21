import {Quote} from '../data_model/Quote';
import {getCleanDefaultText, getDefaultText} from '../Utility/Helpers';

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
function getDefaultTextSetup(){
    let header = document.createElement("H1");
    let textNode = document.createTextNode(getCleanDefaultText());
    header.appendChild(textNode);
    return header;
}
function getDefaultQuote_1(){
    return new Quote("30", "The Trump administration", {start: 12, end: 36}, "fe1");
}
function getDefaultQuote_2(){
    return new Quote("40", "pushing", {start: 4, end:11}, "fe1");
}
function getDefaultQuote_3(){
    return new Quote("50", "SHING", {start:2, end:7}, "fe1");
}

module.exports = {
    getQuote: getQuote,
    getRandomTextNode: getRandomTextNode,
    getHeaderElementWithChild: getHeaderElementWithChild,
    getSmallDefaultText: getSmallDefaultText,
    getDefaultTextSetup: getDefaultTextSetup,
    getDefaultQuote_1:getDefaultQuote_1,
    getDefaultQuote_2:getDefaultQuote_2,
    getDefaultQuote_3:getDefaultQuote_3,
};