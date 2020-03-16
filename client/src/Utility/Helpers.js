
export function highlight(color){
  const doSomething = () => {
    console.log('test');
  }
  //remove any format to avoid overlap issues
  document.execCommand('removeFormat', false, null);
  //save selected text
  var text = "";
  if (window.getSelection) {
      text = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== "Control") {
      text = document.selection.createRange().text;
  }
  //create new span around the text
  var span = document.createElement("span");
  span.style.backgroundColor = color;
  span.innerText = text;
  span.setAttribute('onclick', doSomething);
  document.execCommand('insertHTML', false, span.outerHTML);
  console.log(span);
}
