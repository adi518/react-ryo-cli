(this.webpackJsonpdocs=this.webpackJsonpdocs||[]).push([[0],{150:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r),i=t(12),o=t.n(i),c=(t(56),t(14)),l=t(1),u=t(2),m=t(152);function s(){var n=Object(l.a)(["\n      position: fixed;\n      padding-top: 0.8rem;\n      padding-bottom: 0.8rem;\n      background-color: var(--color-purple);\n    "]);return s=function(){return n},n}function d(){var n=Object(l.a)(["\n  top: 0;\n  z-index: 1;\n  width: 100%;\n  display: flex;\n  padding: 1rem;\n  position: absolute;\n  align-items: center;\n  transition: background-color var(--common-transition-time),\n    padding var(--common-transition-time);\n\n  ","\n"]);return d=function(){return n},n}var f=u.b.div(d(),(function(n){return n.isSticky&&Object(u.a)(s())})),b=function(n){var e=n.children,t=Object(m.a)().y>0;return a.a.createElement(f,{isSticky:t},a.a.Children.map(e,(function(n){return a.a.isValidElement(n)?a.a.cloneElement(n,{isSticky:t}):n})))};function g(){var n=Object(l.a)(["\n  display: flex;\n  min-height: 100vh;\n  padding: 4rem 14rem;\n  flex-direction: column;\n  background-color: var(--color-background);\n\n  > h1:not(:first-child) {\n    margin-top: 4rem;\n  }\n\n  @media (max-width: 1024px) {\n    padding-left: 6rem;\n    padding-right: 6rem;\n  }\n\n  @media (max-width: 768px) {\n    padding: 2rem;\n  }\n"]);return g=function(){return n},n}var p=u.b.div(g());function v(){var n=Object(l.a)(["\n  --scale: 1;\n  margin-top: 0;\n  margin-bottom: 0;\n  -webkit-background-clip: text;\n  background-color: rebeccapurple;\n  -webkit-text-fill-color: transparent;\n  font-size: calc(var(--scale) * 1.25rem);\n  line-height: calc(var(--scale) * 1.15rem);\n  letter-spacing: calc(var(--scale) * -0.2rem);\n  text-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.15);\n  transition: font-size var(--common-transition-time);\n  font-family: 'Lucida Console', Monaco, monospace;\n  // background-image: linear-gradient(\n  //   180deg,\n  //   rgba(131, 116, 235, 1) 0%,\n  //   rgba(155, 116, 235, 1) 25%,\n  //   rgba(232, 116, 235, 1) 26%,\n  //   rgba(234, 175, 144, 1) 50%,\n  //   rgba(234, 178, 139, 1) 51%,\n  //   rgba(236, 213, 85, 1) 74%,\n  //   rgba(225, 215, 91, 1) 75%,\n  //   rgba(116, 236, 149, 1) 100%\n  // );\n\n  @media (max-width: 767.98px) {\n    --scale: 0.8;\n  }\n\n  @media (max-width: 575.98px) {\n    --scale: 0.65;\n  }\n\n  @media (max-width: 375px) {\n    --scale: 0.55;\n  }\n"]);return v=function(){return n},n}function h(){var n=Object(l.a)(["\n  transform: translateY(-1ch);\n\n  // img {\n  //   width: 100%;\n  //   display: block;\n  //   max-width: var(--max-width);\n  //   transition: width var(--common-transition-time);\n  // }\n"]);return h=function(){return n},n}var _=u.b.div(h()),w=u.b.pre(v()),x=function(){return a.a.createElement(_,null,a.a.createElement(w,{dangerouslySetInnerHTML:{__html:"\n                         __                                    ___\n   ________  ____ ______/ /_      _______  ______        _____/ (_)\n  / ___/ _ \\/ __ `/ ___/ __/_____/ ___/ / / / __ \\______/ ___/ / /\n / /  /  __/ /_/ / /__/ /_/_____/ /  / /_/ / /_/ /_____/ /__/ / /\n/_/   \\___/\\__,_/\\___/\\__/     /_/   \\__, /\\____/      \\___/_/_/\n                                    /____/\n"}}))},E=t(5);function j(){var n=Object(l.a)(["\n  visibility: visible;\n  color: var(--color-text);\n"]);return j=function(){return n},n}var y=u.b.span(j()),O=function(n){return a.a.createElement(y,n,E.name," ",E.version)},k=t(15),z=t(45),M=t.n(z),S=t(151),C=t(50),N=a.a.forwardRef((function(n,e){var t=n.children,r=n.ariaLabel,i=void 0===r?"Emoji":r,o=Object(C.a)(n,["children","ariaLabel"]);return a.a.createElement("span",Object.assign({ref:e,role:"img","aria-label":i},o),t)}));function L(){var n=Object(l.a)(["\n  line-height: 2;\n  font-size: 1.5rem;\n  text-align: center;\n  letter-spacing: 0.5rem;\n  transition: font-size var(--common-transition-time);\n\n  &::before {\n    content: '< ';\n  }\n\n  &::after {\n    content: ' />';\n  }\n\n  @media (max-width: 767.98px) {\n    font-size: 1rem;\n  }\n\n  @media (max-width: 575.98px) {\n    font-size: 0.75rem;\n  }\n\n  .emoji {\n    display: inline-block;\n    animation-duration: 2s;\n    animation-fill-mode: both;\n    animation-play-state: paused;\n    animation-iteration-count: 1;\n    animation-name: ",";\n\n    &--animate,\n    &--reverse-animate {\n      animation-play-state: running;\n    }\n\n    &--reverse-animate {\n      animation-direction: reverse;\n    }\n  }\n"]);return L=function(){return n},n}function A(){var n=Object(l.a)(["\n  from {\n    transform: rotateY(0deg);\n  }\n\n  to {\n    transform: rotateY(-720deg);\n  }\n"]);return A=function(){return n},n}function B(){var n=Object(l.a)(["\n  cursor: default;\n  margin-top: 2rem;\n"]);return B=function(){return n},n}var H=u.b.div(B()),I=Object(u.c)(A()),J=u.b.div(L(),I),R=function(){var n,e=Object(r.useRef)(null),t=Object(S.a)(e),i=Object(r.useState)(!1),o=Object(k.a)(i,2),c=o[0],l=o[1];return e.current&&t&&c&&((n=e.current).style.animation="none",n.offsetHeight,n.style.animation=null),a.a.createElement(H,null,a.a.createElement(J,{className:"animated pulse infinite slow"},"Roll your own CLI"," ",a.a.createElement(N,{ref:e,onAnimationStart:function(){return l(!1)},onAnimationEnd:function(){return l(!0)},className:M()("emoji",{"emoji--animate":t,"emoji--reverse-animate":e.current&&!t})},"\ud83e\udd19")))};function T(){var n=Object(l.a)(["\n  &:not(.button) {\n    color: var(--color-text);\n  }\n"]);return T=function(){return n},n}var Y=u.b.a.attrs((function(){return{rel:"noopener noreferrer"}}))(T());function D(){var n=Object(l.a)(["\n  font-size: 0;\n  vertical-align: middle;\n\n  svg {\n    width: 1.15rem;\n    display: inline-block;\n  }\n"]);return D=function(){return n},n}function G(){var n=Object(l.a)(["\n  display: flex;\n  padding: 8rem 2rem;\n  min-height: 10rem;\n  text-align: center;\n  align-items: center;\n  word-break: break-word;\n  justify-content: center;\n  color: var(--color-text);\n  background-color: var(--color-background-dark);\n"]);return G=function(){return n},n}var P=u.b.footer(G()),V=u.b.span(D()),W=function(){return a.a.createElement(V,null,a.a.createElement("svg",{fill:"red",focusable:"false","aria-hidden":"true",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},a.a.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),a.a.createElement("path",{d:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"})))},F=function(){return a.a.createElement(P,null,a.a.createElement("div",null,"Made with\xa0",a.a.createElement(W,null)," by ",a.a.createElement(Y,{href:"https://github.com/adi518"},"@adi518")))};function $(){var n=Object(l.a)(["\n            width: 2rem;\n          "]);return $=function(){return n},n}function q(){var n=Object(l.a)(["\n            width: 1.5rem;\n          "]);return q=function(){return n},n}function K(){var n=Object(l.a)(["\n  opacity: 0.5;\n  transition: opacity var(--common-transition-time);\n\n  &:hover {\n    opacity: 1;\n  }\n\n  a {\n    font-size: 0;\n    display: block;\n  }\n\n  svg {\n    fill: var(--color-text);\n    ","\n  }\n"]);return K=function(){return n},n}function Q(){var n=Object(l.a)(["\n  z-index: 1;\n  display: grid;\n  grid-gap: 0.5rem;\n  margin-left: auto;\n  grid-auto-flow: column;\n"]);return Q=function(){return n},n}var U=u.b.div(Q()),X=u.b.div(K(),(function(n){return n.isSticky?Object(u.a)(q()):Object(u.a)($())})),Z=function(n){var e=n.children,t=n.isSticky;return a.a.createElement(U,null,a.a.Children.map(e,(function(n){return a.a.isValidElement(n)?a.a.cloneElement(n,{isSticky:t}):n})))};function nn(){var n=Object(l.a)(["\n  width: 2.25rem;\n  font-size: 0;\n  margin-left: auto;\n"]);return nn=function(){return n},n}function en(){var n=Object(l.a)(["\n  // background-color: green;\n  background-color: var(--color-green);\n"]);return en=function(){return n},n}function tn(){var n=Object(l.a)(["\n  background-color: var(--color-yellow);\n"]);return tn=function(){return n},n}function rn(){var n=Object(l.a)(["\n  // background-color: crimson;\n  background-color: var(--color-pink);\n"]);return rn=function(){return n},n}function an(){var n=Object(l.a)(["\n  opacity: 0.5;\n  width: 0.75rem;\n  height: 0.75rem;\n  border-radius: 0.333rem;\n  transition: opacity var(--common-transition-time);\n\n  &:hover {\n    opacity: 1;\n  }\n"]);return an=function(){return n},n}function on(){var n=Object(l.a)(["\n  display: grid;\n  grid-gap: 0.5rem;\n  grid-auto-flow: column;\n"]);return on=function(){return n},n}function cn(){var n=Object(l.a)(["\n  padding-right: 1rem;\n  padding-left: 1rem;\n  height: 2.5rem;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  background-color: black;\n  border-bottom: 0.125rem solid #333333;\n"]);return cn=function(){return n},n}function ln(){var n=Object(l.a)(["\n  display: flex;\n  z-index: -1;\n  width: 45rem;\n  height: 30rem;\n  position: absolute;\n  background-color: #070707;\n  border: 0.125rem solid #333333;\n  box-shadow: 4px 4px 0rem 0rem rgba(255, 255, 255, 0.1);\n  // box-shadow: 0px 1rem 2rem 0.5rem rgba(0, 0, 0, 0.25);\n\n  @media (max-width: 767.98px) {\n    display: none;\n  }\n"]);return ln=function(){return n},n}var un=u.b.div(ln()),mn=u.b.div(cn()),sn=u.b.div(on()),dn=u.b.div(an()),fn=Object(u.b)(dn)(rn()),bn=Object(u.b)(dn)(tn()),gn=Object(u.b)(dn)(en()),pn=(u.b.div(nn()),function(){return a.a.createElement(un,null,a.a.createElement(mn,null,a.a.createElement(sn,null,a.a.createElement(fn,null),a.a.createElement(bn,null),a.a.createElement(gn,null))))});function vn(){var n=Object(l.a)(["\n  display: flex;\n  min-height: 100vh;\n  padding-top: 6rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-bottom: 6rem;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n  color: var(--color-foreground);\n  background-color: var(--hero-background-color);\n  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.05);\n"]);return vn=function(){return n},n}var hn=u.b.div(vn()),_n=t(27),wn=t.n(_n),xn=t(46),En=t(47),jn=t.n(En),yn=t(44),On=t(48),kn=t.n(On);t(148);function zn(){var n=Object(l.a)(["\n  width: 100%;\n\n  :not(pre) > code[class*='language-'],\n  pre[class*='language-'] {\n    margin-top: 2rem;\n    border-radius: 0.5rem;\n    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);\n  }\n\n  code[class*='language-'],\n  pre[class*='language-'] {\n    line-height: 40px;\n  }\n\n  ","\n\n  p:first-child {\n    display: none;\n  }\n\n  h1:not(:first-of-type) {\n    margin-top: 6rem;\n  }\n\n  p {\n    img {\n      width: 100%;\n      max-width: 767.98px;\n    }\n  }\n"]);return zn=function(){return n},n}function Mn(){var n=Object(l.a)(["\n  h1:first-child {\n    margin-top: 4rem;\n  }\n"]);return Mn=function(){return n},n}var Sn=Object(u.a)(Mn()),Cn=u.b.div(zn(),(function(n){return n.inline&&Sn})),Nn=function(n){var e=n.pathToMarkdown,t=n.inline,i=Object(r.useState)(null),o=Object(k.a)(i,2),c=o[0],l=o[1];return Object(yn.a)((function(){Object(xn.a)(wn.a.mark((function n(){var t,r;return wn.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch(e);case 2:return t=n.sent,n.next=5,t.text();case 5:r=n.sent,l(r),jn.a.highlightAll();case 8:case"end":return n.stop()}}),n)})))()})),a.a.createElement(Cn,{inline:t},a.a.createElement(kn.a,{source:c}))};function Ln(){var n=Object(l.a)(["\n  outline: none;\n  min-width: 10rem;\n  font-size: 1.25rem;\n  border-radius: 2rem;\n  padding: 0.5rem 1.5rem;\n  background-color: transparent;\n  color: var(--color-foreground);\n  font-family: var(--font-family);\n  border: 0.125rem solid var(--color-foreground);\n  transition: background-color var(--common-transition-time);\n\n  &:focus {\n    box-shadow: 0 0 0.25rem;\n  }\n\n  &:hover {\n    color: var(--color-text-dark);\n    background-color: var(--color-foreground);\n  }\n"]);return Ln=function(){return n},n}var An=u.b.button(Ln());function Bn(){var n=Object(l.a)(["\n  @media (max-width: 425px) {\n    display: none;\n  }\n"]);return Bn=function(){return n},n}function Hn(){var n=Object(l.a)(["\n  display: grid;\n  grid-gap: 1rem;\n  grid-auto-flow: column;\n\n  @media (max-width: 425px) {\n    grid-gap: 0;\n  }\n"]);return Hn=function(){return n},n}function In(){var n=Object(l.a)(["\n  display: flex;\n  margin-top: 3rem;\n  font-size: 1.5rem;\n  text-align: center;\n  flex-direction: column;\n"]);return In=function(){return n},n}var Jn=u.b.div(In()),Rn=u.b.div(Hn()),Tn=Object(u.b)(An)(Bn()),Yn=function(){return a.a.createElement("a",{href:E.repository.url,className:"button"},a.a.createElement(Tn,null,"GitHub"))},Dn=function(){return a.a.createElement(Jn,null,a.a.createElement(Rn,null,a.a.createElement(c.Link,{smooth:!0,to:"Page-Markdown",className:"button",offset:-50.3594},a.a.createElement(An,null,"Get started")),a.a.createElement(Yn,null)))},Gn=function(n){return a.a.createElement(X,n,a.a.createElement("a",{href:E.repository.url,className:"button"},a.a.createElement("svg",{focusable:"false","aria-hidden":"true",viewBox:"0 0 496 512",xmlns:"http://www.w3.org/2000/svg"},a.a.createElement("path",{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"}))))},Pn=function(){return a.a.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},a.a.createElement("path",{d:"M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"}))},Vn=function(n){return a.a.createElement(X,n,a.a.createElement("a",{href:"https://www.facebook.com/snippetsJS",className:"button"},a.a.createElement(Pn,null)))};t(149);var Wn=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(hn,{className:"animated fadeIn"},a.a.createElement(b,null,a.a.createElement(O,null),a.a.createElement(Z,null,a.a.createElement(Vn,null),a.a.createElement(Gn,null))),a.a.createElement(x,null),a.a.createElement(R,null),a.a.createElement(Dn,null),a.a.createElement(pn,null)),a.a.createElement(c.Element,{name:"Page-Markdown"},a.a.createElement(p,null,a.a.createElement(Nn,{pathToMarkdown:"https://raw.githubusercontent.com/adi518/react-ryo-cli/master/README.md"}))),a.a.createElement(F,null))};var Fn=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(Wn,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(Fn,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)}))},5:function(n){n.exports=JSON.parse('{"name":"docs","version":"0.1.0","private":true,"homepage":"https://adi518.github.io/react-ryo-cli","repository":{"url":"https://github.com/adi518/react-ryo-cli"},"dependencies":{"@testing-library/jest-dom":"^4.2.4","@testing-library/react":"^9.3.2","@testing-library/user-event":"^7.1.2","animate.css":"^3.7.2","classnames":"^2.2.6","node-sass":"^4.13.1","prism-themes":"^1.3.0","prismjs":"^1.19.0","react":"^16.12.0","react-dom":"^16.12.0","react-markdown":"^4.3.1","react-scripts":"3.4.0","react-scroll":"^1.7.16","react-use":"^13.26.0","styled-components":"^5.0.1"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject","predeploy":"yarn build","deploy":"node ./gh-pages"},"eslintConfig":{"extends":"react-app"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"gh-pages":"^2.2.0"}}')},51:function(n,e,t){n.exports=t(150)},56:function(n,e,t){}},[[51,1,2]]]);
//# sourceMappingURL=main.a03f7a40.chunk.js.map