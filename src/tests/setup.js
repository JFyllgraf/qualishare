import {Quote} from '../data_model/Quote'
function getRandomQuote(){
    let quote = new Quote("5", "This is my random quote text", {start: 10, end:20}, "15", "summary should be calculated, not given in constructor", "Test");
    return quote;
}


module.exports = {
    getRandomQuote: getRandomQuote,
};