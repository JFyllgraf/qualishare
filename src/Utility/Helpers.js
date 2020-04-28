export function highlight(color, user, quoteID){
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
  span.setAttribute('user', user);
  span.id = quoteID;
  span.setAttribute('onclick', "removeSPan(this)");
  document.execCommand('insertHTML', false, span.outerHTML);
}

export function getDefaultText(){
  const htmlString =
    `WASHINGTON — The Trump administration is pushing the U.N. Security Council to call attention to the Chinese origins of the coronavirus, four diplomats posted to the United Nations told NBC News, triggering a stalemate as the global body seeks to cobble together a response to the pandemic.<br><br> Talks among U.N. Security Council nations over a joint declaration or resolution on the coronavirus have stalled over U.S. insistence that it explicitly state that the virus originated in Wuhan, China, as well as exactly when it started there. China's diplomats are enraged according to the diplomats, even as they seek to put their own language into the statement praising China's efforts to contain the virus.<br><br> The dispute at the United Nations comes amid growing finger-pointing between Washington and Beijing over the coronavirus.<br><br>

    President Donald Trump has repeatedly blamed China for its spread, accusing Beijing of concealing early knowledge of the virus. But after reports of a rise in racism and attacks against Asian Americans emerged, Trump tweeted this week that it was "NOT their fault" and said he'd no longer call it the "Chinese virus." <br><br>

    "Everyone knows it came out of China," Trump said Tuesday. "But I decided we shouldn't make any more of a big deal out of it."<br><br>

    Still, his administration has continued working to brand it as a Chinese-created crisis, with Secretary of State Mike Pompeo again Wednesday referring to "the Wuhan virus" and "this crisis that began in Wuhan, China." He also did not dispute a German news report that he'd pressed G-7 leaders to include language about the "Wuhan virus" in a joint statement. <br><br>

    At the Security Council, the administration's push to name China as the source of the virus started in recent weeks when Estonia, a rotating member of the council, began drafting a declaration for the council to issue.<br><br>

    Although the U.N. has a separate public health body — the World Health Organization — the Security Council has sought to warn how ongoing global conflicts could exacerbate the crisis and undermine the response. <br><br>

    France, a permanent member of the council, proposed a version demanding a "general and immediate cessation of hostilities in all countries," including a 30-day humanitarian pause in conflicts, to allow coronavirus-related supplies to flow, according to a text reviewed by NBC News. <br><br>

    But the U.S., in various drafts and edits circulated among the countries, sought to insert references to "the outbreak of the coronavirus disease (COVID-19) in Wuhan, Hubei province in the People's Republic of China (PRC) in November 2019." The PRC is China's formal name. <br><br>

    Another U.S. draft encouraged the U.N. to build on lessons learned in the past, "especially from the Severe Acute Respiratory Syndrome (SARS-CoV) coronavirus outbreak originating in Guangdong Province in the PRC in 2011." <br><br>

    Those demands have hit a wall with China, a veto-wielding member of the Security Council, whose diplomats accused the U.S. of "irresponsible practices" in a blistering email to other nations' diplomats this week obtained by NBC News. <br><br>

    "We are astonished by the choice of the United States to use this opportunity for politicizing the outbreak and blaming China, which we strongly oppose," China's mission to the U.N. wrote. "The groundless accusations and malicious fabrication from the U.S. aim at shirking its own responsibilities, which severely poisoned the atmosphere of global cooperation in containing the outbreak." <br><br>

    A U.S. diplomat with knowledge of the discussion said the National Security Council had directed the U.S. mission to the United Nations to advocate for the language, with support from Pompeo. <br><br>

    The U.S. mission didn't respond to a request for comment. But a senior Trump administration official said a key element of Trump's effort to address coronavirus is to convene global experts "to better understand the coronavirus." <br><br>

    "Our goal is to gather the data, information and samples needed to understand the evolutionary origins of the virus so we can effectively combat the pandemic and prepare for future outbreaks," the official said. <br><br>

    Complicating efforts has been Russia's insistence that ambassadors show up in person at the Security Council to vote, contradicting public health guidance urging people to stay home and not to congregate in groups, diplomats from three Security Council nations said. <br><br>

    For more than a week, as other countries on the council directed nearly all their staff to work from home, Russia's diplomats were still showing up at their mission in New York, the diplomats said. Meanwhile, they argued that virtual meetings were untenable, citing technical issues with the videoconferencing equipment. <br><br>

    Russia's mission to the U.N. didn't respond to a request for comment. But on Tuesday, the Russians dropped their insistence on in-person meetings, several diplomats said. The shift came the same day that Russian President Vladimir Putin, wearing a full protective suit and a respirator as he visited a hospital, was told by Moscow's mayor that Russia has significantly more coronavirus patients than its official tally shows. <br><br>

    In Washington, the Trump administration has bristled at an unsubstantiated suggestion by China's Foreign Ministry that it might have been the U.S. Army that brought the coronavirus to Wuhan. <br><br>

    "You see it. You see it on social media," Pompeo said Wednesday, accusing Beijing of an "intentional disinformation campaign" even as he insisted that now wasn't the time to point fingers. "You see it in remarks from senior people inside the Chinese Communist Party talking about whether this was a — U.S. brought to China. This is crazy talk." <br><br>

    In discussions about a Security Council declaration or resolution, Chinese diplomats have had their own wish list, two diplomats familiar with the talks said: references to the success of China's extensive efforts to control the crisis once the virus was identified. After enforcing a strict lockdown in Hubei province, the center of the crisis in China, authorities have started easing restrictions as the number of new cases has fallen to nearly zero. <br><br>

    A diplomat involved in the Security Council talks said other nations were encouraging a compromise in which China and the United States would drop their insistence on language that would be inevitably problematic for the other. <br><br>

    China's mission to the U.N. didn't respond to a request for comment. <br><br>
  `;
  return htmlString;
}


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
        default: r = 1; g = f; b = 0;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

//export default {surroundSelection, rainbowStop, rainbow};
