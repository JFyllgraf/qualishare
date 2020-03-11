export function surroundSelection() {
  const result = window.confirm("Want to delete the code?");
  if (result){
    var span = document.createElement("span");
    span.style.fontWeight = "bold";
    span.style.color = "black";

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
