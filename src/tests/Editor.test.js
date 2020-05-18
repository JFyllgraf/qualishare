const {createSpan} = require('../components/Content/Editor/Editor');
const {getRandomQuote} = require('../tests/setup'); //this works, but the following: "require(''setup)" does not work...

test('Should output default text', ()=>{

    const text = "a";
    let span = createSpan(getRandomQuote());
    expect(text).toBe("a");
});
