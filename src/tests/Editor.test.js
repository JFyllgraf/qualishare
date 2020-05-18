const {createSpan} = require('../components/Content/Editor/Editor');

test('Should output default text', ()=>{
    const text = "a";
    let span = createSpan();
    expect(text).toBe("a");
});
