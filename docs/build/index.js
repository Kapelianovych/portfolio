"use strict";var t="header-module_right-col__1Hf6Y",e="menu_button-module_menu-button__1AvEw",s="menu_button-module_menu-line__1JYDR";function i(t){console.warn(t)}void 0===window.trustedTypes&&(window.trustedTypes={createPolicy:(t,e)=>e});const n=window.trustedTypes.createPolicy("edelweiss",{createHTML:t=>t});let o="/public/styles/";function r(t){return null==t}class a{constructor(t,e){this._value=t,this._type=e}static just(t){return new a(t,"Just")}static nothing(){return new a(null,"Nothing")}static maybeOf(t){const e=l(t)?t.extract():t;return r(e)?a.nothing():a.just(e)}isJust(){return"Just"===this._type}isNothing(){return"Nothing"===this._type}map(t){return this.isJust()?a.maybeOf(t(this._value)):a.nothing()}apply(t){return t.isNothing()?a.nothing():this.map(t.extract())}chain(t){return this.isJust()?t(this._value):a.nothing()}extract(){return this._value}}const{just:u,nothing:h,maybeOf:c}=a;function l(t){return t instanceof a}function p(...t){return Object.freeze(t)}function d(...t){return Object.freeze(t.map(t=>Array.from(t)).reduce((t,e)=>t.concat(e),[]))}function m(t){return t instanceof Error?Promise.reject(t):Promise.resolve(t)}function f(...t){return(...e)=>{let s=h();for(const i of t){if(s.isJust()&&!Object.is(s.extract(),NaN))return s;s=c(i(...e))}return s}}class y{constructor(t){this._value=t}static wrap(t){const e=function(t){return t instanceof y}(t)?t.extract():t;return new y(e)}map(t){return y.wrap(t(this._value))}apply(t){return this.map(t.extract())}chain(t){return t(this._value)}extract(){return this._value}}const{wrap:g}=y;function b(t){c(t).map(t=>t.remove())}function v(t,...e){c(t).map(t=>t.append(...e))}function w(t,...e){c(t).map(t=>t.replaceWith(...e))}function C(t,e,s){c(t).map(t=>t.setAttribute(e,s))}function _(t,e){return c(t).map(t=>t.getAttribute(e))}function k(t,e){return Boolean(c(t).map(t=>t.hasAttribute(e)).extract())}function E(t,e=document){return c(e).map(e=>e.querySelector(t))}function P(t,e){k(t,e)&&c(t).map(t=>t.removeAttribute(e))}function $(t,e,s,i={}){const n=c(t).map(t=>(t.addEventListener(e,s,i.add),t)).map(t=>()=>function(t,e,s,i){c(t).map(t=>t.removeEventListener(e,s,i))}(t,e,s,i.remove));return l(t)?n:n.extract()}function T(t){return`${class{static get cssRootFolder(){return o}static set cssRootFolder(t){o=t}}.cssRootFolder}${t}${/.+\.css$/.test(t)?"":".css"}`}function x(t){f(()=>E(`link[href="${T(t)}"]`,document.head).extract(),()=>(v(document.head,g(document.createElement("link",void 0)).map(t=>(C(t,"rel","stylesheet"),t)).map(e=>(C(e,"href",T(t)),e)).extract()),null))()}function S(t){E(`link[href="${T(t)}"]`,document.head).map(b)}class N{styles(){return""}beforeBuild(){}template(){return""}afterBuild(){}async _createNodes(){const t=this.styles();t.length>0&&(Array.isArray(t)?t.forEach(x):x(t)),await m(this.beforeBuild());const e=await m(this.template());return await m(this.afterBuild()),e}}function O(){return""+window.crypto.getRandomValues(new Uint32Array(1))[0]}const B=/@([\w-]+)=['"]?$/,A=/^eventId[\d]{1,}$/,L=/<([\w-]+)\s*(:[\w]+)?\s*=$/,M=/\?([\w-]+)=['"]?$/,j=/:(mounted|updated|removed)=$/,I=/:.+:(\?)?/g,D=new Map;var R;!function(t){t.Mounted="mounted",t.Rendered="rendered",t.Updated="updated",t.Removed="removed"}(R||(R={}));const q=function t(e,s=!1){return s&&Object.getOwnPropertyNames(e).forEach(s=>{const i=e[s];"object"!=typeof i&&"function"!=typeof i||t(i)}),Object.freeze(e)}({[R.Mounted]:new Map,[R.Rendered]:new Map,[R.Updated]:new Map,[R.Removed]:new Map});async function H(t,...e){return t.reduce((t,s,n)=>r(e[n])?t.then(t=>t+s):u(e[n]).map(m).map(t=>t.then(t=>F(t))).map(t=>t.then(t=>Array.isArray(t)?Promise.all(t.map(t=>F(t))).then(t=>t.join("")):t)).map(e=>t.then(t=>function(t,e,s){return t.then(t=>{const n=B.exec(e);if(!r(n)){let o=t;"function"!=typeof o&&r(o.handleEvent)&&(i(`Event listener must be type of "function" or object with\n  "handleEvent" method, but given "${typeof o}".`),o=()=>{});const a=O();return D.set(a,{[n[1]]:o}),e.replace(n[0],`data-event-id${s}="${a}"`)}const o=M.exec(e);if(!r(o))return e.replace(o[0],t?o[1]:"");const a=j.exec(e);if(!r(a)){const s=O(),i=a[1];return q[i].set(s,t),e.replace(j,`data-${i}-hook-id="${s}"`)}const u=L.exec(e);return r(u)?e+t:Element.isPrototypeOf(t)?(function(t,e){const s=t[1];if(!s||"string"!=typeof s)return i(`tag name for custom element must be provided and be type of "string"!\n    Tag: ${s}\n    Constructor: ${e.toString()}`);const n=r(t[2])?void 0:t[2].slice(1);f(()=>customElements.get(s),()=>customElements.define(s,e,r(n)?void 0:{extends:n}))()}(u,t),e.replace(L,("<"+u[1]).replace(/^<-(.+)-$/,"<$1"))):(i(`You must pass a class constructor to custom element ${u[1]}. But given ->"${t}"`),"")})}(e,s,n).then(e=>t+e))).extract(),m(""))}function F(t){return t instanceof N?t._createNodes():t}const W=new Set,Y=new Set;function z(t){return t.nodeType===Node.ELEMENT_NODE}function J(t){return t.nodeType===Node.TEXT_NODE}function V(t){return t.nodeType===Node.COMMENT_NODE}function U(t){X(t,R.Mounted),d(t.childNodes).forEach(U)}function K(t){X(t,R.Updated)}function G(t){X(t,R.Removed),d(t.childNodes).forEach(G)}function X(t,e){setTimeout(()=>{z(t)&&_(t,`data-${e}-hook-id`).map(t=>p(t,c(q[e].get(t)))).map(([s,i])=>i.map(i=>m(i(t)).then(()=>q[e].delete(s))))},0)}function Q(t,e){if(z(t)&&z(e))if(t.tagName===e.tagName)if(function(t,e){let s=!1;return t.attributes.length!==e.attributes.length&&d(t.attributes).forEach(({name:i})=>{k(e,i)||(P(t,i),s=!0)}),d(e.attributes).forEach(({name:e,value:i})=>{_(t,e).extract()!==i&&(C(t,e,i),s=!0)}),s}(t,e)&&K(t),e.hasChildNodes()){const s=d(t.childNodes),i=d(e.childNodes);for(let e=0;e<Math.max(i.length,s.length);e++){const n=s[e],o=i[e];r(o)?r(n)||(b(n),G(n)):r(n)?(v(t,o),U(o)):Q(n,o)}}else t.hasChildNodes()&&(w(t,e),U(e),G(t));else w(t,e),U(e),G(t);else J(t)&&J(e)?t.textContent!==e.textContent&&(t.textContent=e.textContent,c(t.parentElement).map(K)):V(t)&&V(e)?t.textContent!==e.textContent&&(t.textContent=e.textContent):(w(t,e),U(e),G(t))}async function Z(t){return Array.isArray(t)?t.reduce((t,e)=>t.then(t=>Z(e).then(e=>t+e)),m("")):t instanceof N?t._createNodes():t}const tt=[];function et(t){t instanceof HTMLElement&&(Object.entries(t.dataset).filter(([t,e])=>A.test(t)).map(([e,s])=>(c(s).map(t=>D.get(t)).map(Object.entries).map(([e])=>tt.push($(t,e[0],e[1]))),e)).map(t=>c(/(\d+)$/.exec(t)).map(t=>t[1])).forEach(e=>e.map(e=>P(t,"data-event-id"+e))),t.childElementCount>0&&d(t.children).forEach(et))}function st(t,e){return E(t).map(t=>p(t,function(t,e=!1){return l(t)?t.map(t=>t.cloneNode(e)):t.cloneNode(e)}(t))).map(([t,s])=>Z(e).then(t=>{s.innerHTML=n.createHTML(t)}).then(()=>{W.forEach(x),Y.forEach(S),W.clear(),Y.clear()}).then(()=>Q(t,s)).then(()=>tt.forEach(t=>t())).then(()=>tt.length=0).then(()=>d(t.children).forEach(et)).then(()=>D.clear())).extract()}const it=new Map;let nt={path:"",container:"",view:()=>""};const ot={basePrefix:"",baseContainer:""};class rt{static get current(){return nt}static configure(t){const{basePrefix:e,baseContainer:s}=t;r(e)||(ot.basePrefix=e),r(s)||(ot.baseContainer=s)}static add(t){Array.isArray(t)?t.forEach(t=>it.set(t.path,t)):it.set(t.path,t)}static to(t,e={}){const s=at(t);if(0===it.size)return i(`You cannot navigate to ${s} because you didn't define any routes!\n      At first call "Router.add(...)".`),m(void 0);let n;return d(it.entries()).forEach(([t,i])=>{const o=function(t,e){let s=e.startsWith("^")?e:"^"+e;return s=s.endsWith("$")?s:s+"$",c(t.match(s.replace(I,"(.+)$1")))}(s,at(t));if(o.isJust()){const t=i.container||ot.baseContainer;n=o.chain(n=>E(t).map(async()=>{nt=Object.assign(Object.assign({},i),{parameters:n}),r(i.before)||await m(i.before()),await st(t,i.view()),(r(e.willStateChange)||e.willStateChange)&&window.history.pushState({path:s,container:t},"",s),r(i.after)||await m(i.after())})).extract()}}),r(n)?(i(`No route is specified for path: ${s}!`),m(void 0)):n}static async reload(){const{container:t,view:e,after:s,before:i}=nt;r(i)||await m(i()),await st(t||ot.baseContainer,e()),r(s)||await m(s())}static back(){window.history.back()}static forward(){window.history.forward()}}function at(t){return t.startsWith(ot.basePrefix)?t:ot.basePrefix+t}$(window,"popstate",t=>{r(t.state)||rt.to(t.state.path,{willStateChange:!1})});const ut=function(t){return new Proxy(t,{set(t,e,s,i){const n=Reflect.set(t,e,s,i);return n&&rt.reload(),n},deleteProperty(t,e){if(e in t){const s=Reflect.deleteProperty(t,e);return s&&rt.reload(),s}return!1}})}({isPortfolioVisible:!1,isWelcomeTextVisible:!1});function ht(){return H`<header>
    ${rt.current.path.includes("/about")?H`<button @click=${()=>rt.to("/")}>Home</button>`:H`<button
    @click=${()=>ut.isPortfolioVisible=!ut.isPortfolioVisible}
    aria-label="menu button"
    class=${e}
  >
    <span class=${s}></span
    ><span class=${s}></span
    ><span class=${s}></span>
  </button>`}
    <div class=${t}>
      <button @click=${()=>rt.to("/about")}>About</button>
      <a href="https://github.com/YevhenKap">GitHub</a>
    </div>
  </header>`}var ct="footer-module_left-col__1rqhq";var lt="home-module_home__2mATN",pt="home-module_portrait-block__3HiY5",dt="home-module_typed-block__ikUdX",mt="home-module_visible__3a9mB",ft="home-module_typed-left__1yJxW",yt="home-module_typed-center__zgqct",gt="home-module_typed-right__bgP01",bt="portfolio_modal-module_portfolio-modal__bVQvd",vt="portfolio_modal-module_visible__k5Oh-",wt="portfolio_modal-module_carousel__YYDqq",Ct="portfolio_modal-module_portfolio-item__3fRZz";function _t(){return H`
    <div class=${lt}>
      <div class=${pt}>
        <img src="${"/portfolio/build/images/e796594bde077ae4.png"}" alt="Creator picture: Kapelianovych Yevhen" />
      </div>
      <div
        :mounted=${()=>ut.isWelcomeTextVisible=!0}
        class="${dt} ${ut.isWelcomeTextVisible?mt:""}"
      >
        <p class=${ft}>Hi I'm</p>
        <p class=${yt}>Developer</p>
        <p class=${gt}>Web</p>
      </div>
      ${H`
    <aside
      class="${ut.isPortfolioVisible?vt:""} ${bt}"
    >
      <h2>Portfolio</h2>
      <div class=${wt}>
        <a href="https://yevhenkap.github.io" class=${Ct}>
          <img src="${"/portfolio/build/images/2b5c10f1377e8f3c.png"}" alt="Edelweiss website" />
          <p>Edelweiss website</p>
        </a>
      </div>
    </aside>
  `}
    </div>
  `}var kt="about-module_about-page__1iK9l";function Et(t){return H`
    ${ht()}
    <main>
      ${"home"===t?_t():"about"===t?H`
    <div class=${kt}>
      <p>
        I am a big lover of programming. I have graduated at
        <a href="https://brainacad.zp.ua/">Brain Academy</a> as Certified
        Associate in Frontend in 2018.
      </p>
      <p>
        Now I spend my free time developing my own projects. They are all
        located in my Github account.
      </p>
      <p>
        Feel free to contact me:
        <a href="mailto:kapelianovych.y.v@gmail.com"
          >kapelianovych.y.v@gmail.com</a
        >
      </p>
    </div>
  `:""}
    </main>
    ${H`<footer>
    <div class=${ct}>
      <span>Made by Kapelianovych Yevhen</span>
    </div>
    <a href="mailto:kapelianovych.y.v@gmail.com">Mail me</a>
  </footer>`}
  `}const Pt={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onBegin:t=>{},onComplete:t=>{},preStringTyped:(t,e)=>{},onStringTyped:(t,e)=>{},onLastStringBackspaced:t=>{},onTypingPaused:(t,e)=>{},onTypingResumed:(t,e)=>{},onReset:t=>{},onStop:(t,e)=>{},onStart:(t,e)=>{},onDestroy:t=>{}};class $t{constructor(t,e){if(this.temporaryPause=!1,this.el="string"==typeof t?document.querySelector(t):t,this.options=Object.assign(Object.assign({},Pt),e),this.isInput="input"===this.el.tagName.toLowerCase(),this.attr=this.options.attr,this.bindInputFocusEvents=this.options.bindInputFocusEvents,this.showCursor=!this.isInput&&this.options.showCursor,this.cursorChar=this.options.cursorChar,this.cursorBlinking=!0,this.elContent=this.attr?this.el.getAttribute(this.attr):this.el.textContent,this.contentType=this.options.contentType,this.typeSpeed=this.options.typeSpeed,this.startDelay=this.options.startDelay,this.backSpeed=this.options.backSpeed,this.smartBackspace=this.options.smartBackspace,this.backDelay=this.options.backDelay,this.fadeOut=this.options.fadeOut,this.fadeOutClass=this.options.fadeOutClass,this.fadeOutDelay=this.options.fadeOutDelay,this.isPaused=!1,this.strings=this.options.strings.map(t=>t.trim()),"string"==typeof this.options.stringsElement?this.stringsElement=document.querySelector(this.options.stringsElement):this.stringsElement=this.options.stringsElement,this.stringsElement){this.strings=[],this.stringsElement.style.display="none";const t=Array.prototype.slice.apply(this.stringsElement.children),e=t.length;if(e)for(let s=0;s<e;s+=1){const e=t[s];this.strings.push(e.innerHTML.trim())}}this.strPos=0,this.arrayPos=0,this.stopNum=0,this.loop=this.options.loop,this.loopCount=this.options.loopCount,this.curLoop=0,this.shuffle=this.options.shuffle,this.sequence=[],this.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},this.typingComplete=!1;for(let t in this.strings)this.sequence[t]=t;this.currentElContent=function(t){let e="";return e=t.attr?t.el.getAttribute(t.attr)||"":t.isInput?t.el.value:"html"===t.contentType?t.el.innerHTML:t.el.textContent||"",e}(this),this.autoInsertCss=this.options.autoInsertCss,function(t){const e="data-typed-js-css";if(!t.autoInsertCss)return;if(!t.showCursor&&!t.fadeOut)return;if(document.querySelector(`[${e}]`))return;let s=document.createElement("style");s.type="text/css",s.setAttribute(e,"true");let i="";t.showCursor&&(i+="\n      .typed-cursor{\n        opacity: 1;\n      }\n      .typed-cursor.typed-cursor--blink{\n        animation: typedjsBlink 0.7s infinite;\n        -webkit-animation: typedjsBlink 0.7s infinite;\n                animation: typedjsBlink 0.7s infinite;\n      }\n      @keyframes typedjsBlink{\n        50% { opacity: 0.0; }\n      }\n      @-webkit-keyframes typedjsBlink{\n        0% { opacity: 1; }\n        50% { opacity: 0.0; }\n        100% { opacity: 1; }\n      }\n    "),t.fadeOut&&(i+="\n      .typed-fade-out{\n        opacity: 0;\n        transition: opacity .25s;\n      }\n      .typed-cursor.typed-cursor--blink.typed-fade-out{\n        -webkit-animation: 0;\n        animation: 0;\n      }\n    "),0!==s.length&&(s.innerHTML=i,document.body.appendChild(s))}(this),this.begin()}toggle(){this.pause.status?this.start():this.stop()}stop(){this.typingComplete||this.pause.status||(this.toggleBlinking(!0),this.pause.status=!0,this.options.onStop(this.arrayPos,this))}start(){this.typingComplete||this.pause.status&&(this.pause.status=!1,this.pause.typewrite?this.typewrite(this.pause.curString,this.pause.curStrPos):this.backspace(this.pause.curString,this.pause.curStrPos),this.options.onStart(this.arrayPos,this))}destroy(){this.reset(!1),this.options.onDestroy(this)}reset(t=!0){clearInterval(this.timeout),this.replaceText(""),this.cursor&&this.cursor.parentNode&&(this.cursor.parentNode.removeChild(this.cursor),this.cursor=null),this.strPos=0,this.arrayPos=0,this.curLoop=0,t&&(this.insertCursor(),this.options.onReset(this),this.begin())}begin(){this.options.onBegin(this),this.typingComplete=!1,this.shuffleStringsIfNeeded(),this.insertCursor(),this.bindInputFocusEvents&&this.bindFocusEvents(),this.timeout=window.setTimeout(()=>{this.currentElContent&&0!==this.currentElContent.length?this.backspace(this.currentElContent,this.currentElContent.length):this.typewrite(this.strings[parseInt(this.sequence[this.arrayPos])],this.strPos)},this.startDelay)}typewrite(t,e){this.fadeOut&&this.el.classList.contains(this.fadeOutClass)&&(this.el.classList.remove(this.fadeOutClass),this.cursor&&this.cursor.classList.remove(this.fadeOutClass));const s=this.humanizer(this.typeSpeed);let i=1;!0!==this.pause.status?this.timeout=window.setTimeout(()=>{e=function(t,e,s){if("html"!==s.contentType)return e;const i=t.substr(e).charAt(0);if("<"===i||"&"===i){let s="";for(s="<"===i?">":";";t.substr(e+1).charAt(0)!==s&&!(1+ ++e>t.length););e++}return e}(t,e,this);let s=0,n=t.substr(e);if("^"===n.charAt(0)&&/^\^\d+/.test(n)){let i=1;n=(/\d+/.exec(n)||[])[0],i+=n.length,s=parseInt(n),this.temporaryPause=!0,this.options.onTypingPaused(this.arrayPos,this),t=t.substring(0,e)+t.substring(e+i),this.toggleBlinking(!0)}if("`"===n.charAt(0)){for(;"`"!==t.substr(e+i).charAt(0)&&(i++,!(e+i>t.length)););const s=t.substring(0,e),n=t.substring(s.length+1,e+i),o=t.substring(e+i+1);t=s+n+o,i--}this.timeout=window.setTimeout(()=>{this.toggleBlinking(!1),e>=t.length?this.doneTyping(t,e):this.keepTyping(t,e,i),this.temporaryPause&&(this.temporaryPause=!1,this.options.onTypingResumed(this.arrayPos,this))},s)},s):this.setPauseStatus(t,e,!0)}keepTyping(t,e,s){0===e&&(this.toggleBlinking(!1),this.options.preStringTyped(this.arrayPos,this)),e+=s;const i=t.substr(0,e);this.replaceText(i),this.typewrite(t,e)}doneTyping(t,e){this.options.onStringTyped(this.arrayPos,this),this.toggleBlinking(!0),this.arrayPos===this.strings.length-1&&(this.complete(),!1===this.loop||this.curLoop===this.loopCount)||(this.timeout=window.setTimeout(()=>{this.backspace(t,e)},this.backDelay))}backspace(t,e){if(!0===this.pause.status)return void this.setPauseStatus(t,e,!0);if(this.fadeOut)return this.initFadeOut();this.toggleBlinking(!1);const s=this.humanizer(this.backSpeed);this.timeout=window.setTimeout(()=>{e=function(t,e,s){if("html"!==s.contentType)return e;const i=t.substr(e).charAt(0);if(">"===i||";"===i){let s="";for(s=">"===i?"<":"&";t.substr(e-1).charAt(0)!==s&&!(--e<0););e--}return e}(t,e,this);const s=t.substr(0,e);if(this.replaceText(s),this.smartBackspace){let t=this.strings[this.arrayPos+1];t&&s===t.substr(0,e)?this.stopNum=e:this.stopNum=0}e>this.stopNum?(e--,this.backspace(t,e)):e<=this.stopNum&&(this.arrayPos++,this.arrayPos===this.strings.length?(this.arrayPos=0,this.options.onLastStringBackspaced(this),this.shuffleStringsIfNeeded(),this.begin()):this.typewrite(this.strings[parseInt(this.sequence[this.arrayPos])],e))},s)}complete(){this.options.onComplete(this),this.loop?this.curLoop++:this.typingComplete=!0}setPauseStatus(t,e,s){this.pause.typewrite=s,this.pause.curString=t,this.pause.curStrPos=e}toggleBlinking(t){this.cursor&&(this.pause.status||this.cursorBlinking!==t&&(this.cursorBlinking=t,t?this.cursor.classList.add("typed-cursor--blink"):this.cursor.classList.remove("typed-cursor--blink")))}humanizer(t){return Math.round(Math.random()*t/2)+t}shuffleStringsIfNeeded(){this.shuffle&&(this.sequence=this.sequence.sort(()=>Math.random()-.5))}initFadeOut(){return this.el.className+=" "+this.fadeOutClass,this.cursor&&(this.cursor.className+=" "+this.fadeOutClass),setTimeout(()=>{this.arrayPos++,this.replaceText(""),this.strings.length>this.arrayPos?this.typewrite(this.strings[parseInt(this.sequence[this.arrayPos])],0):(this.typewrite(this.strings[0],0),this.arrayPos=0)},this.fadeOutDelay)}replaceText(t){this.attr?this.el.setAttribute(this.attr,t):this.isInput?this.el.value=t:"html"===this.contentType?this.el.innerHTML=t:this.el.textContent=t}bindFocusEvents(){this.isInput&&(this.el.addEventListener("focus",t=>{this.stop()}),this.el.addEventListener("blur",t=>{this.el.value&&0!==this.el.value.length||this.start()}))}insertCursor(){this.showCursor&&(this.cursor||(this.cursor=document.createElement("span"),this.cursor.className="typed-cursor",this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))}}rt.configure({basePrefix:"/portfolio",baseContainer:"#app"}),rt.add([{path:"/",view:()=>Et("home"),after(){new $t("#short-description",{strings:["Boy","Dentist","Web Programmer"],loop:!0,typeSpeed:100,backSpeed:100,smartBackspace:!0}).start()}},{path:"/about",view:()=>Et("about")}]),rt.to(window.location.pathname),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/portfolio/service_worker.js").then(t=>console.log("Service worker is registered. Scope is "+t.scope)).catch(t=>console.error("Registration of service worker is failed with "+t))});
