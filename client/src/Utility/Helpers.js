export function surroundSelection(color) {
  const result = window.confirm("Want to delete the code?");
  if (result){

    var span = document.createElement("span");
    span.style.backgroundColor = color;

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
