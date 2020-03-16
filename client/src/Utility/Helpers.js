export function surroundSelection(color) {
  const result = window.confirm("Want to delete the code?");
  if (result){
    var span = document.createElement("span");

    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            range.surroundContents(span);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
  }
}

export function colorChange(color) {
  var range = window.getSelection().getRangeAt(0),
        span = document.createElement('span');

    span.style.backgroundColor = color;
    span.appendChild(range.extractContents());
    range.insertNode(span);
}

function makeEditableAndHighlight(colour) {
    var range, sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    };
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    };
    // Use HiliteColor since some browsers apply BackColor to the whole block
    if (!document.execCommand("HiliteColor", false, colour)) {
        document.execCommand("BackColor", false, colour);
    };
    document.designMode = "off";
};

export function highlight(colour) {
    var range, sel;
    if (window.getSelection) {
        // IE9 and non-IE
        try {
            if (!document.execCommand("BackColor", false, colour)) {
                makeEditableAndHighlight(colour);
            }
        } catch (ex) {
            makeEditableAndHighlight(colour);
        }
    } else if (document.selection && document.selection.createRange) {
        // IE <= 8 case
        range = document.selection.createRange();
        range.execCommand("BackColor", false, colour);
    };
};


//Taken from: http://blog.adamcole.ca/2011/11/simple-javascript-rainbow-color.html
export function rainbowStop(h) {
    let f= (n,k=(n+h*12)%12) => .5-.5*Math.max(Math.min(k-3,9-k,1),-1);
    let rgb2hex = (r,g,b) => "#"+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,0)).join('');
    return ( rgb2hex(f(0), f(8), f(4)) );
}


//Taken from: https://stackoverflow.com/questions/1484506/random-color-generator
export function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

//export default {surroundSelection, rainbowStop, rainbow};


