import {Quote} from "../data_model/Quote";

//in general, we export functions with "export" at each function, and not with export default, because JEST cannot handle this
//and because of some weird interaction with Babel and transipilation, we also do not use module.exports
export function highlight(color, user, quoteID){
  let range = window.getSelection().getRangeAt(0);
  //create new span around the text
  var span = document.createElement("span");
  span.style.backgroundColor = color;
  //span.innerText = text;
  span.setAttribute('user', user);
  span.id = quoteID;
  span.setAttribute('onclick', "removeSPan(this)");
  console.log(range);
  range.surroundContents(span);
  document.getElementById('textDiv').focus();
}

export function getDefaultText(){
  const htmlString =`WASHINGTON: The Trump administration is pushing the U.N. Security Council to call attention to the Chinese origins of the coronavirus, four diplomats posted to the United Nations told NBC News, triggering a stalemate as the global body seeks to cobble together a response to the pandemic. Talks among U.N. Security Council nations over a joint declaration or resolution on the coronavirus have stalled over U.S. insistence that it explicitly state that the virus originated in Wuhan, China, as well as exactly when it started there. China's diplomats are enraged according to the diplomats, even as they seek to put their own language into the statement praising China's efforts to contain the virus. The dispute at the United Nations comes amid growing finger-pointing between Washington and Beijing over the coronavirus. President Donald Trump has repeatedly blamed China for its spread, accusing Beijing of concealing early knowledge of the virus. But after reports of a rise in racism and attacks against Asian Americans emerged, Trump tweeted this week that it was "NOT their fault" and said he'd no longer call it the "Chinese virus." "Everyone knows it came out of China," Trump said Tuesday. "But I decided we shouldn't make any more of a big deal out of it." Still, his administration has continued working to brand it as a Chinese-created crisis, with Secretary of State Mike Pompeo again Wednesday referring to "the Wuhan virus" and "this crisis that began in Wuhan, China." He also did not dispute a German news report that he'd pressed G-7 leaders to include language about the "Wuhan virus" in a joint statement. At the Security Council, the administration's push to name China as the source of the virus started in recent weeks when Estonia, a rotating member of the council, began drafting a declaration for the council to issue. Although the U.N. has a separate public health body — the World Health Organization — the Security Council has sought to warn how ongoing global conflicts could exacerbate the crisis and undermine the response. France, a permanent member of the council, proposed a version demanding a "general and immediate cessation of hostilities in all countries," including a 30-day humanitarian pause in conflicts, to allow coronavirus-related supplies to flow, according to a text reviewed by NBC News. But the U.S., in various drafts and edits circulated among the countries, sought to insert references to "the outbreak of the coronavirus disease (COVID-19) in Wuhan, Hubei province in the People's Republic of China (PRC) in November 2019." The PRC is China's formal name. Another U.S. draft encouraged the U.N. to build on lessons learned in the past, "especially from the Severe Acute Respiratory Syndrome (SARS-CoV) coronavirus outbreak originating in Guangdong Province in the PRC in 2011." Those demands have hit a wall with China, a veto-wielding member of the Security Council, whose diplomats accused the U.S. of "irresponsible practices" in a blistering email to other nations' diplomats this week obtained by NBC News. "We are astonished by the choice of the United States to use this opportunity for politicizing the outbreak and blaming China, which we strongly oppose," China's mission to the U.N. wrote. "The groundless accusations and malicious fabrication from the U.S. aim at shirking its own responsibilities, which severely poisoned the atmosphere of global cooperation in containing the outbreak." A U.S. diplomat with knowledge of the discussion said the National Security Council had directed the U.S. mission to the United Nations to advocate for the language, with support from Pompeo. The U.S. mission didn't respond to a request for comment. But a senior Trump administration official said a key element of Trump's effort to address coronavirus is to convene global experts "to better understand the coronavirus." "Our goal is to gather the data, information and samples needed to understand the evolutionary origins of the virus so we can effectively combat the pandemic and prepare for future outbreaks," the official said. Complicating efforts has been Russia's insistence that ambassadors show up in person at the Security Council to vote, contradicting public health guidance urging people to stay home and not to congregate in groups, diplomats from three Security Council nations said. For more than a week, as other countries on the council directed nearly all their staff to work from home, Russia's diplomats were still showing up at their mission in New York, the diplomats said. Meanwhile, they argued that virtual meetings were untenable, citing technical issues with the videoconferencing equipment. Russia's mission to the U.N. didn't respond to a request for comment. But on Tuesday, the Russians dropped their insistence on in-person meetings, several diplomats said. The shift came the same day that Russian President Vladimir Putin, wearing a full protective suit and a respirator as he visited a hospital, was told by Moscow's mayor that Russia has significantly more coronavirus patients than its official tally shows. In Washington, the Trump administration has bristled at an unsubstantiated suggestion by China's Foreign Ministry that it might have been the U.S. Army that brought the coronavirus to Wuhan. "You see it. You see it on social media," Pompeo said Wednesday, accusing Beijing of an "intentional disinformation campaign" even as he insisted that now wasn't the time to point fingers. "You see it in remarks from senior people inside the Chinese Communist Party talking about whether this was a — U.S. brought to China. This is crazy talk." In discussions about a Security Council declaration or resolution, Chinese diplomats have had their own wish list, two diplomats familiar with the talks said: references to the success of China's extensive efforts to control the crisis once the virus was identified. After enforcing a strict lockdown in Hubei province, the center of the crisis in China, authorities have started easing restrictions as the number of new cases has fallen to nearly zero. A diplomat involved in the Security Council talks said other nations were encouraging a compromise in which China and the United States would drop their insistence on language that would be inevitably problematic for the other. China's mission to the U.N. didn't respond to a request for comment.`;
  return htmlString;
}
export function getCleanDefaultText(){
    return "WASHINGTON: The Trump administration is pushing the U.N. Security Council to call attention to the Chinese origins of the coronavirus, four diplomats posted to the United Nations told NBC News, triggering a stalemate as the global body seeks to cobble together a response to the pandemic. Talks among U.N. Security Council nations over a joint declaration or resolution on the coronavirus have stalled over U.S. insistence that it explicitly state that the virus originated in Wuhan, China, as well as exactly when it started there. China\'s diplomats are enraged according to the diplomats, even as they seek to put their own language into the statement praising China\'s efforts to contain the virus. The dispute at the United Nations comes amid growing finger-pointing between Washington and Beijing over the coronavirus. President Donald Trump has repeatedly blamed China for its spread, accusing Beijing of concealing early knowledge of the virus. But after reports of a rise in racism and attacks against Asian Americans emerged, Trump tweeted this week that it was \"NOT their fault\" and said he'd no longer call it the \"Chinese virus.\" \"Everyone knows it came out of China,\" Trump said Tuesday. \"But I decided we shouldn\'t make any more of a big deal out of it.\" Still, his administration has continued working to brand it as a Chinese-created crisis, with Secretary of State Mike Pompeo again Wednesday referring to \"the Wuhan virus\" and \"this crisis that began in Wuhan, China.\" He also did not dispute a German news report that he\'d pressed G-7 leaders to include language about the \"Wuhan virus\" in a joint statement. At the Security Council, the administration\'s push to name China as the source of the virus started in recent weeks when Estonia, a rotating member of the council, began drafting a declaration for the council to issue. Although the U.N. has a separate public health body — the World Health Organization — the Security Council has sought to warn how ongoing global conflicts could exacerbate the crisis and undermine the response. France, a permanent member of the council, proposed a version demanding a \"general and immediate cessation of hostilities in all countries,\" including a 30-day humanitarian pause in conflicts, to allow coronavirus-related supplies to flow, according to a text reviewed by NBC News. But the U.S., in various drafts and edits circulated among the countries, sought to insert references to \"the outbreak of the coronavirus disease (COVID-19) in Wuhan, Hubei province in the People\'s Republic of China (PRC) in November 2019.\" The PRC is China\'s formal name. Another U.S. draft encouraged the U.N. to build on lessons learned in the past, \"especially from the Severe Acute Respiratory Syndrome (SARS-CoV) coronavirus outbreak originating in Guangdong Province in the PRC in 2011.\" Those demands have hit a wall with China, a veto-wielding member of the Security Council, whose diplomats accused the U.S. of \"irresponsible practices\" in a blistering email to other nations' diplomats this week obtained by NBC News. \"We are astonished by the choice of the United States to use this opportunity for politicizing the outbreak and blaming China, which we strongly oppose,\" China's mission to the U.N. wrote. \"The groundless accusations and malicious fabrication from the U.S. aim at shirking its own responsibilities, which severely poisoned the atmosphere of global cooperation in containing the outbreak.\" A U.S. diplomat with knowledge of the discussion said the National Security Council had directed the U.S. mission to the United Nations to advocate for the language, with support from Pompeo. The U.S. mission didn't respond to a request for comment. But a senior Trump administration official said a key element of Trump's effort to address coronavirus is to convene global experts \"to better understand the coronavirus.\" \"Our goal is to gather the data, information and samples needed to understand the evolutionary origins of the virus so we can effectively combat the pandemic and prepare for future outbreaks,\" the official said. Complicating efforts has been Russia's insistence that ambassadors show up in person at the Security Council to vote, contradicting public health guidance urging people to stay home and not to congregate in groups, diplomats from three Security Council nations said. For more than a week, as other countries on the council directed nearly all their staff to work from home, Russia's diplomats were still showing up at their mission in New York, the diplomats said. Meanwhile, they argued that virtual meetings were untenable, citing technical issues with the videoconferencing equipment. Russia's mission to the U.N. didn't respond to a request for comment. But on Tuesday, the Russians dropped their insistence on in-person meetings, several diplomats said. The shift came the same day that Russian President Vladimir Putin, wearing a full protective suit and a respirator as he visited a hospital, was told by Moscow's mayor that Russia has significantly more coronavirus patients than its official tally shows. In Washington, the Trump administration has bristled at an unsubstantiated suggestion by China's Foreign Ministry that it might have been the U.S. Army that brought the coronavirus to Wuhan. \"You see it. You see it on social media,\" Pompeo said Wednesday, accusing Beijing of an \"intentional disinformation campaign\" even as he insisted that now wasn\'t the time to point fingers. \"You see it in remarks from senior people inside the Chinese Communist Party talking about whether this was a — U.S. brought to China. This is crazy talk.\" In discussions about a Security Council declaration or resolution, Chinese diplomats have had their own wish list, two diplomats familiar with the talks said: references to the success of China\'s extensive efforts to control the crisis once the virus was identified. After enforcing a strict lockdown in Hubei province, the center of the crisis in China, authorities have started easing restrictions as the number of new cases has fallen to nearly zero. A diplomat involved in the Security Council talks said other nations were encouraging a compromise in which China and the United States would drop their insistence on language that would be inevitably problematic for the other. China\'s mission to the U.N. didn\'t respond to a request for comment.";
}
/*
export function getEarlyQuote(){
    return new Quote("10", "The Trump administration", {start: 12, end: 36}, "20", "Test");
}

 */

/*
//Taken from: http://blog.adamcole.ca/2011/11/simple-javascript-rainbow-color.html
export function rainbowStop(h) {
    let f= (n,k=(n+h*12)%12) => .5-.5*Math.max(Math.min(k-3,9-k,1),-1);
    let rgb2hex = (r,g,b) => "#"+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,0)).join('');
    return ( rgb2hex(f(0), f(8), f(4)) );
}
*/
/*
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
        default: r = 1; g = f; b = 0;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

 */


//we want to have this function in Editor, where it is used, however don't know how to
//do this currently, and still being able to test it.
export function splitNodeAndInsertSpan(rootNode, quote, color){
  let [nodeToSplit, index] = findCorrectChildNode(rootNode, quote);
  let leftText = nodeToSplit.textContent.slice(0, quote.quoteOffset.start);
  let rightText = nodeToSplit.textContent.slice(quote.quoteOffset.end, nodeToSplit.textContent.length);

  let leftTextNode = document.createTextNode(leftText);
  let span = createSpan(quote, color);
  let rightTextNode = document.createTextNode(rightText);

  //insert the three nodes into root, before
  if(rootNode.childNodes.length === index+1){
    rootNode.append(leftTextNode);
    rootNode.append(span);
    rootNode.append(rightTextNode);
  }
  else{
    rootNode.insertBefore(leftTextNode, rootNode.childNodes[index+1]);
    rootNode.insertBefore(span, rootNode.childNodes[index+2]);
    rootNode.insertBefore(rightTextNode, rootNode.childNodes[index+3]);
  }

  //then delete child with index, because that was the original child, that is now replaced by three others
  rootNode.removeChild(rootNode.childNodes[index]);
}

export function findCorrectChildNode(rootNode, quote){
  let text = quote.quoteText;
  for(let i = 0; i<rootNode.childNodes.length;i++){
    if(rootNode.childNodes[i].nodeType===3 && rootNode.childNodes[i].textContent.slice(quote.quoteOffset.start, quote.quoteOffset.end)===text){
      return [rootNode.childNodes[i], i];
    }
  }
  return [null, null];
}

//is not correct yet, because we need also need to access the referenced code
export function createSpan(quote, color){
  let span = document.createElement("span");
  span.style.backgroundColor = color; //code color
  span.innerText = quote.quoteText;
  span.setAttribute('user', quote.userName);
  span.id = quote._id;
  span.setAttribute('onclick', "removeSPan(this)");
  return span;
}
export function constructQuoteFromData(data){
  console.log(data);
  let q = new Quote(data._id, data.quoteText, data.quoteOffset, data.codeRefs);
  q.memo = data.memo;
  q.userName = data.userName;
  return q;
}
function isQuoteInList(quote, list){
  for(let i = 0; i < list.length;i++){
    if(quote._id === list[i]._id){
      return true;
    }
  }
  return false;
}

function selectAll(){
  var range = document.createRange();
  range.setStart(document.getElementById("textDiv"), 0);
  range.setEnd(document.getElementById("textDiv"), 1);

  //create new span around the text
  var span = document.createElement("span");
  span.style.backgroundColor = "green";
  span.setAttribute('user', "user");
  span.setAttribute('onclick', "removeSPan(this)");
  range.surroundContents(span);

  window.getSelection().addRange(range);
}