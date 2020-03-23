(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{135:function(e,t,a){},136:function(e,t,a){},137:function(e,t,a){},139:function(e,t,a){},140:function(e,t,a){},141:function(e,t,a){},144:function(e,t,a){},145:function(e,t,a){},146:function(e,t,a){"use strict";a.r(t);var n,o=a(0),c=a.n(o),s=a(52),r=a.n(s),i=(a(64),a(5)),l=a(7),m=a(15),u=a(19),d=a(17),g=a(20),f=a(53),v=(a(65),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={name:"",room:""},a.handleChange=function(e){a.setState(Object(f.a)({},e.target.id,e.target.value))},a.handleOnClick=function(e){e.preventDefault(),a.props.addNameAndRoom(a.state.name,a.state.room)},a}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"joinOuterContainer"},c.a.createElement("div",{className:"joinInnerContainer"},c.a.createElement("h1",{className:"heading"},"Join"),c.a.createElement("div",null,c.a.createElement("input",{placeholder:"Name",type:"text",id:"name",className:"joinInput",onChange:this.handleChange})),c.a.createElement("div",null,c.a.createElement("input",{placeholder:"Room",type:"text",id:"room",className:"joinInput mt-20",onChange:this.handleChange})),c.a.createElement("button",{className:"button mt-20",onClick:this.handleOnClick,type:"submit"},"Sign In")))}}]),t}(o.Component)),p=a(3),h=a(18),E=a.n(h),b=(a(97),a(98),a(54)),N=a.n(b),A=a(55),C=a.n(A),O=function(e){var t=e.room;return c.a.createElement("div",{className:"infoBar"},c.a.createElement("div",{className:"leftInnerContainer"},c.a.createElement("img",{src:C.a,alt:"online",className:"onlineIcon"}),c.a.createElement("h3",null," ",t)),c.a.createElement("div",{className:"rightInnerContainer"},c.a.createElement("a",{href:"/"},c.a.createElement("img",{src:N.a,alt:"close"}))))},j=(a(99),function(e){var t=e.message,a=e.setMessage,n=e.sendMessage;return c.a.createElement("form",{className:"form"},c.a.createElement("textarea",{row:"1",className:"input",placeholder:"Type a message...",value:t,onChange:function(e){return a(e.target.value)},onKeyPress:function(e){return"Enter"===e.key?n(e):null}}),c.a.createElement("div",{className:"btnContainer"},c.a.createElement("button",{className:"btn-lg sendButton",onClick:function(e){return n(e)}},"Send")))}),S=a(56),w=a.n(S),k=(a(135),a(29)),I=a.n(k),x=function(e){var t=e.message,a=t.user,n=t.text,o=!1,s=e.name.trim().toLowerCase();return a===s&&(o=!0),o?c.a.createElement("div",{className:"messageContainer justifyEnd"},c.a.createElement("p",{className:"sentText pr-10"},s),c.a.createElement("div",{className:"messageBox backgroundBlue"},c.a.createElement("p",{className:"messageText colorWhite"},I.a.emojify(n)))):c.a.createElement("div",{className:"messageContainer justifyStart"},c.a.createElement("div",{className:"messageBox backgroundLight"},c.a.createElement("p",{className:"messageText colorDark"},I.a.emojify(n))),c.a.createElement("p",{className:"sentText pl-10"},a))},y=(a(136),function(e){var t=e.messages,a=e.name;return c.a.createElement(w.a,{className:"messages"},t.map((function(e,t){return c.a.createElement("div",{key:t},c.a.createElement(x,{message:e,name:a}))})))});var _=function(e){var t=e.Name,a=e.Room,s=Object(o.useState)(t),r=Object(p.a)(s,1)[0],l=Object(o.useState)(a),m=Object(p.a)(l,1)[0],u=Object(o.useState)(""),d=Object(p.a)(u,2),g=d[0],f=d[1],v=Object(o.useState)([]),h=Object(p.a)(v,2),b=h[0],N=h[1];return Object(o.useEffect)((function(){return console.log("Printing: ",r,m),(n=E()("localhost:5000")).emit("join",{name:r,room:m},(function(e){e&&alert(e)})),function(){n.emit("disconnect"),n.off()}}),["localhost:5000",r,m]),Object(o.useEffect)((function(){n.on("message",(function(e){N([].concat(Object(i.a)(b),[e]))}))}),[b]),c.a.createElement("div",{className:"outerContainer"},c.a.createElement("div",{className:"innerContainer"},c.a.createElement(O,{room:m}),c.a.createElement(y,{messages:b,name:r}),c.a.createElement(j,{message:g,setMessage:f,sendMessage:function(e){e.preventDefault(),g&&n.emit("sendMessage",g,(function(){return f("")}))}})))};a(137);var L=function(){return c.a.createElement("nav",{className:"navigation"},c.a.createElement("ul",{className:"header-menu"},c.a.createElement("li",{className:"menu__item"},c.a.createElement("a",{className:"menu__link"},c.a.createElement("span",{className:"menu__title"},c.a.createElement("span",{className:"menu__first-word","data-hover":"New"},"New"),c.a.createElement("span",{className:"menu__second-word","data-hover":"Document"},"Document")))),c.a.createElement("li",{className:"menu__item"},c.a.createElement("a",{href:"#",className:"menu__link"},c.a.createElement("span",{className:"menu__title"},c.a.createElement("span",{className:"menu__first-word","data-hover":"Save"},"Save"),c.a.createElement("span",{className:"menu__second-word","data-hover":"As"},"As")))),c.a.createElement("li",{className:"menu__item"},c.a.createElement("a",{href:"#",className:"menu__link"},c.a.createElement("span",{className:"menu__title"},c.a.createElement("span",{className:"menu__first-word","data-hover":"Quick"},"Quick"),c.a.createElement("span",{className:"menu__second-word","data-hover":"Save"},"Save"))))))},Q=a(57),R=a.n(Q),T=function e(t,a,n){Object(l.a)(this,e);var o=t,c=a,s=Object(i.a)(n),r=t.match(/([\w]*\s|[\w]*)/gm).splice(0,5).toString();this.getQuoteText=function(){return o},this.getQuoteOffset=function(){return c},this.getCodeRefs=function(){return s},this.getSummary=function(){return r}};a(139),a(140);var D,q=function(e){var t=e.codes,a=e.selected,n=e.handler,s=(e.emmitChange,Object(o.useState)(t)),r=Object(p.a)(s,2),i=r[0],l=r[1],m=Object(o.useState)(a),u=Object(p.a)(m,2),d=u[0],g=u[1];return Object(o.useEffect)((function(){n(d),l(t)}),[d,t]),c.a.createElement("div",{className:"toolbar-container"},c.a.createElement("div",{className:"toolbar-innerContainer"},c.a.createElement("span",{className:"label"},"Select Code: "),c.a.createElement("select",{value:d.getName(),onChange:function(e){var t;for(t=0;t<i.length;t++)i[t].getName()===e.target.value&&g(i[t])},className:"toolbarSelect",type:"select",name:"select"},i?i.map((function(e){return c.a.createElement("option",{className:"toolbarOption",key:e.getId()},e.getName())})):null),c.a.createElement("a",{href:"something",className:"toolbarButton",onClick:function(e){e.preventDefault();var t=window.getSelection().toString();if(null===t||void 0===t||""===t)return null;var a=new T(t,window.getSelection().anchorOffset,[d]);d.addQuote(a),function(e){document.execCommand("removeFormat",!1,null);var t="";window.getSelection?t=window.getSelection().toString():document.selection&&"Control"!==document.selection.type&&(t=document.selection.createRange().text);var a=document.createElement("span");a.style.backgroundColor=e,a.innerText=t,a.setAttribute("onclick","removeSPan(this)"),document.execCommand("insertHTML",!1,a.outerHTML),console.log(a)}(d.getColor()),console.log(a.getQuoteText(),a.getQuoteOffset(),a.getSummary())}},"Apply"),c.a.createElement("a",{href:"something",className:"toolbarButton",onClick:function(e){e.preventDefault();for(var t=window.getSelection().toString(),a=d.getQuotes(),n=0;n<a.length;n++)if(a[n].getQuoteText()===t){d.removeQuote(a[n]),document.execCommand("removeFormat",!1,null);break}}},"Remove")))};var B=function(e){var t=e.selected,a=e.codeObjects,n=e.handler,s=Object(o.useState)("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur assumenda suscipit quos doloribus minus, provident corrupti repudiandae totam ipsam cum numquam! Repellat voluptas magnam amet, labore tempore laborum, dignissimos laudantium?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem error, nulla delectus id, nemo aliquam commodi, non distinctio pariatur nisi rem! Provident sapiente, natus assumenda cumque error, esse distinctio porro.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora optio debitis deleniti explicabo repellat quos ipsum itaque doloremque molestiae delectus a voluptates saepe vero iusto veritatis laudantium accusantium, assumenda sunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, quia enim, et assumenda odit rerum vero pariatur minus commodi iusto soluta architecto porro, cum ducimus id molestias odio vitae voluptates? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, libero numquam dolores temporibus exercitationem a voluptates sit minus perferendis iste consectetur accusamus pariatur tempore cupiditate adipisci labore corporis dolore eaque."),r=Object(p.a)(s,2),i=r[0],l=r[1],m=Object(o.useState)(t),u=Object(p.a)(m,2),d=u[0],g=u[1],f=Object(o.useState)(a),v=Object(p.a)(f,2),h=v[0],b=v[1];return D=E()("localhost:5000"),Object(o.useEffect)((function(){g(t),b(a)}),[t,d,a]),D.on("editingText",(function(e){console.log("Client: receiving data: "+e),l(e)})),c.a.createElement("div",{className:"content-container"},c.a.createElement(q,{codes:h,selected:d,handler:n,emmitChange:function(){D.emit("editingText",i)}}),c.a.createElement(R.a,{html:i,onChange:function(e){l(e.target.value)},className:"content-input"}))},M=a(148),U=a(147),F=(a(141),a(142)),K=function e(t){Object(l.a)(this,e);var a=t,n=e.ID;e.ID=e.ID+1,this.memo=[],this.link=void 0;var o=F(),c=[];this.getName=function(){return a},this.getId=function(){return n},this.getColor=function(){return o},this.getQuotes=function(){return c},this.addQuote=function(e){c=[].concat(Object(i.a)(c),[e])},this.removeQuote=function(e){for(var t=0;t<c.length;t++)if(c[t].getQuoteText()===e){c.slice(t,1);break}}};K.ID=0;var P=K,Y=function(e){var t=e.addCodeToList,a=e.deleteCodeFromList,n=e.getCodes,s=Object(o.useState)(""),r=Object(p.a)(s,2),i=r[0],l=r[1],m=Object(o.useState)(),u=Object(p.a)(m,2),d=u[0],g=u[1];function f(e){if(void 0===d)return!1;var t=d.target.value;if(""===t)return!1;var a=!0;return n().map((function(e){e.getName()===t&&(a=!1)})),"deletebtn"===e.target.id&&(a=!a),a}return c.a.createElement("div",{className:"codeToggle-container"},c.a.createElement("h4",null,"Active Codes"),c.a.createElement("div",{className:"btn-group"},c.a.createElement("a",{className:"toggleButton",id:"addbtn",onClick:function(e){return f(e)?function(e){e.preventDefault();var a=new P(i);t(a),d.target.value="",g(void 0)}(e):null},color:"dark",size:"sm"},"+"),c.a.createElement("a",{className:"toggleButton",id:"deletebtn",onClick:function(e){return f(e)?function(){for(var e=n(),t=d.target.value,o=0;o<e.length;o++)e[o].getName()===t&&a(o);d.target.value="",g(void 0)}():null},color:"dark",size:"sm"},"-")),c.a.createElement("div",null,c.a.createElement("input",{type:"text",onChange:function(e){e.preventDefault(),e.persist(),g(e),l(e.target.value)},onKeyUpCapture:function(e){return 13===e.keyCode&&f(e)?function(e){console.log(e.target.value),e.preventDefault();var a=new P(e.target.value);t(a),e.target.value=""}(e):null}})),c.a.createElement("div",{className:"code-list-container"},c.a.createElement(U.a,{check:!0},function(){var e=n();return c.a.createElement("div",{className:"code-list"},e.map((function(e){return c.a.createElement("div",{className:"code",key:e.getId().toString()},c.a.createElement(M.a,{type:"checkbox",id:e.getId().toString(),label:e.getName()}))})))}())))},J=(a(144),function(){return c.a.createElement("div",{className:"codeFeed-container"})}),V=(a(145),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).updateStateHandler=function(e){a.setState({selected:e},(function(){console.log("In updateStatehandler: "),console.log(a.state.selected)}))},a.addNameAndRoom=function(e,t){a.setState({name:e,room:t,isLoggedIn:!0})},a.addCodeToList=function(e){var t=[].concat(Object(i.a)(a.state.codeObjects),[e]);a.setState({codeObjects:t},console.log(a.state.codeObjects))},a.deleteCodeFromList=function(e){var t=Object(i.a)(a.state.codeObjects);t.splice(e,1),a.setState({codeObjects:t})},a.getCodes=function(){return a.state.codeObjects},a.join=function(){return c.a.createElement(v,{addNameAndRoom:a.addNameAndRoom})},a.chat=function(){return console.log("In chat: ",a.state),c.a.createElement(_,{Name:a.state.name,Room:a.state.room})},a.state={name:"",room:"",isLoggedIn:!1,codeObjects:[new P("Code 1"),new P("Code 2")],selected:""},a}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"grid-container"},c.a.createElement("div",{className:"header"},c.a.createElement(L,null)),c.a.createElement("div",{className:"menu"},c.a.createElement(Y,{addCodeToList:this.addCodeToList,deleteCodeFromList:this.deleteCodeFromList,getCodes:this.getCodes}),c.a.createElement(J,null)),c.a.createElement("div",{className:"content"},c.a.createElement(B,{selected:this.state.selected?this.state.selected:this.state.codeObjects[0],codeObjects:this.state.codeObjects,handler:this.updateStateHandler})),c.a.createElement("div",{className:"extra"},this.state.isLoggedIn?this.chat():this.join()),c.a.createElement("div",{className:"footer"}))}}]),t}(o.Component));r.a.render(c.a.createElement(V,null),document.querySelector("#root"))},54:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHBJREFUGBmNkAEKwCAMA2VfGP2mrx3sOV2us6IymIXQGlNTW9zdhCqcZQm4dmelFUp+CZZa6sYpeUVIFyIixMqjCO51Wy5unQExuYSbSF5JASLqPsqRM21lOoWc89tagr3PSMgOiWlwnUeXWA/E78IfuAX270S3ydAAAAAASUVORK5CYII="},55:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAExJREFUCB1jbPh/le3lx5tNDIwMcQwg8J9hkTi/eh0LWJCBoRwoAAPlQDEGJrhKmDCIBupmQuYjs5lAZiILgNlAMRaQRSAz4UZCLQcAIwYaiAejKoYAAAAASUVORK5CYII="},59:function(e,t,a){e.exports=a(146)},65:function(e,t,a){},94:function(e,t){},97:function(e,t,a){},98:function(e,t,a){},99:function(e,t,a){}},[[59,1,2]]]);
//# sourceMappingURL=main.d30aeb57.chunk.js.map