(this.webpackJsonpflexdrone=this.webpackJsonpflexdrone||[]).push([[0],{134:function(e,t,c){},146:function(e,t,c){"use strict";c.r(t);var n=c(0),s=c.n(n),o=c(44),l=c.n(o),a=(c(134),c(4)),i=c(118),r=(c(58),c(1)),d=function(e){var t=e.title,c=e.image,n=e.onClick;return Object(r.jsxs)("div",{className:"option",onClick:n,children:[Object(r.jsx)("div",{className:"option_ico",children:c}),Object(r.jsx)("h2",{className:"option__title",children:t})]})},j=c(152),m=c(153),u=c(154),x=c(115),h=function(e){var t=e.onClick;return Object(r.jsx)("div",{children:Object(r.jsx)(x.a,{bg:"mediumgray",width:"100%",variant:"dark",children:Object(r.jsx)(x.a.Brand,{children:Object(r.jsx)("h1",{className:"title_style",onClick:t,children:"FlexDrone"})})})})},f=c(116),b=c(22),O=c(86),g=function(e){var t=e.telemetry;return Object(r.jsxs)("div",{className:"  d-inline-flex h-100 p-2 w-100 d-flex-row justify-content-center",children:[Object(r.jsxs)("div",{className:"  p-5 d-flex-column w-50 align-items-start justify-content-start",children:[Object(r.jsxs)("h3",{className:"text-start",children:["Pitch: ",null===t||void 0===t?void 0:t.pitch[t.pitch.length-1]]}),Object(r.jsxs)("h3",{className:"text-start",children:["Roll: ",null===t||void 0===t?void 0:t.roll[t.roll.length-1]]}),Object(r.jsxs)("h3",{className:"text-start",children:["Yaw: ",null===t||void 0===t?void 0:t.yaw[t.yaw.length-1]]}),Object(r.jsxs)("h3",{className:"text-start",children:["Velocity (X axis): ",null===t||void 0===t?void 0:t.vgx[t.vgx.length-1]]}),Object(r.jsxs)("h3",{className:"text-start",children:["Velocity (Y axis): ",null===t||void 0===t?void 0:t.vgy[t.vgy.length-1]]}),Object(r.jsxs)("h3",{className:"text-start",children:["Velocity (Z axis): ",null===t||void 0===t?void 0:t.vgz[t.vgz.length-1]]}),Object(r.jsxs)("h3",{className:"text-start",children:["Acceleration (X axis): ",null===t||void 0===t?void 0:t.agx[t.agx.length-1]]}),Object(r.jsxs)("h3",{className:"text-start",children:["Acceleration (Y axis): ",null===t||void 0===t?void 0:t.agy[t.agy.length-1]]}),Object(r.jsxs)("h3",{className:"text-start",children:["Acceleration (Z axis): ",null===t||void 0===t?void 0:t.agz[t.agz.length-1]]})]}),Object(r.jsxs)("div",{className:" d-inline-flex-column p-5 w-50 align-items-start justify-content-start",children:[Object(r.jsxs)("h3",{className:"text-start",children:["Height: ",null===t||void 0===t?void 0:t.h[t.h.length-1]]}),Object(r.jsxs)("h3",{className:"text-start",children:["Battery: ",null===t||void 0===t?void 0:t.bat[t.bat.length-1]]}),Object(r.jsxs)("h3",{className:"text-start",children:["Temp_Low:"," ",(5*((null===t||void 0===t?void 0:t.templ[t.templ.length-1])-32)/9).toFixed(2)]}),Object(r.jsxs)("h3",{className:"text-start",children:["Temp_High:"," ",(5*((null===t||void 0===t?void 0:t.temph[t.temph.length-1])-32)/9).toFixed(2)]}),Object(r.jsxs)("h3",{className:"text-start",children:["Barometer: ",null===t||void 0===t?void 0:t.baro[t.baro.length-1]]})]})]})},p=c(120),v=c(113),y=c(119),N=c.n(y),w=function(e){var t=e.telnames,c=e.time,s=e.telemetry,o=Object(n.useState)("pitch"),l=Object(a.a)(o,2),i=l[0],d=l[1];return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(p.a,{id:"dropdown-basic-button",title:"Graph",children:null===t||void 0===t?void 0:t.map((function(e){return Object(r.jsx)(v.a.Item,{onClick:function(t){return function(e,t){e.preventDefault(),d(t)}(t,e)},children:e})}))}),Object(r.jsx)(N.a,{className:"plot",data:[{x:c,y:s[i],type:"scatter",mode:"lines+markers",marker:{color:"lightgray"}}],layout:{responsive:!0,autosize:!0,title:i.charAt(0).toUpperCase()+i.slice(1),plot_bgcolor:"#2b2b2b",paper_bgcolor:"#2b2b2b",font:{color:"#afb1b3"},yaxis:{gridcolor:"#3c3f41"},xaxis:{gridcolor:"#3c3f41"}}},i)]})},k=c(88),C=c(127),S=(c(117),c(109)),D=c.n(S),E=function(){return Object(n.useEffect)((function(){var e="ws://".concat("localhost",":3001/stream"),t=new D.a.VideoElement("#video-canvas",e,{autoplay:!0});console.log(t)}),[]),Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("div",{id:"video-canvas",className:"m-3",style:{height:"500px",width:"800px"}})})},_=function(e){var t=e.onClick;return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(j.a,{className:" w-75 mt-5",fluid:!0,children:[Object(r.jsxs)(m.a,{className:"d-flex mt-3 justify-content-center w-3",xs:"12",lg:"6",md:"6",children:[Object(r.jsx)(u.a,{className:"w-50 d-flex justify-content-center",children:Object(r.jsx)(O.a,{variant:"primary",style:{width:"90px"},onClick:function(e){return t(e,"up 20")},children:"Up"})}),Object(r.jsx)(u.a,{className:"w-50 d-flex justify-content-center",children:Object(r.jsx)(O.a,{style:{width:"90px"},onClick:function(e){return t(e,"down 20")},children:"Down"})})]}),Object(r.jsxs)(m.a,{className:"d-flex mt-3 justify-content-center w-3",xs:"12",lg:"6",md:"6",children:[Object(r.jsx)(u.a,{className:"w-50 d-flex justify-content-center",children:Object(r.jsx)(O.a,{variant:"primary",style:{width:"90px"},onClick:function(e){return t(e,"ccw 20")},children:"Rotate L"})}),Object(r.jsx)(u.a,{className:"w-50 d-flex justify-content-center",children:Object(r.jsx)(O.a,{style:{width:"90px"},onClick:function(e){return t(e,"cw 20")},children:"Rotate R"})})]}),Object(r.jsxs)(m.a,{className:"d-flex mt-3 justify-content-center w-3",xs:"12",lg:"6",md:"6",children:[Object(r.jsxs)(u.a,{className:" w-50",children:[Object(r.jsx)("div",{className:"d-flex justify-content-around",children:Object(r.jsx)(O.a,{style:{width:"90px"},onClick:function(e){return t(e,"forward 20")},children:"Forward"})}),Object(r.jsx)(j.a,{className:"",children:Object(r.jsxs)(m.a,{xs:"12",lg:"6",md:"6",className:"d-flex mt-2 justify-content-center",children:[Object(r.jsx)(u.a,{className:"d-flex justify-content-center",style:{width:"100px"},children:Object(r.jsx)(O.a,{style:{width:"100px"},onClick:function(e){return t(e,"left 20")},children:"Left"})}),Object(r.jsx)(u.a,{className:"d-flex justify-content-center",style:{width:"100px"},children:Object(r.jsx)(O.a,{style:{width:"100px"},onClick:function(e){return t(e,"right 20")},children:"Right"})})]})}),Object(r.jsx)("div",{className:"d-flex justify-content-around mt-2",children:Object(r.jsx)(O.a,{style:{width:"90px"},onClick:function(e){return t(e,"back 20")},children:"Back"})})]}),Object(r.jsxs)(u.a,{className:"w-50",children:[Object(r.jsx)("div",{className:"d-flex justify-content-around",children:Object(r.jsx)(O.a,{style:{width:"90px"},onClick:function(e){return t(e,"flip f")},children:"Flip F!"})}),Object(r.jsx)(j.a,{className:"",children:Object(r.jsxs)(m.a,{xs:"12",lg:"6",md:"6",className:"d-flex mt-2 justify-content-center",children:[Object(r.jsx)(u.a,{className:"d-flex justify-content-center",style:{width:"100px"},children:Object(r.jsx)(O.a,{style:{width:"90px"},onClick:function(e){return t(e,"flip l")},children:"Flip L!"})}),Object(r.jsx)(u.a,{className:"d-flex justify-content-center",style:{width:"100px"},children:Object(r.jsx)(O.a,{style:{width:"90px"},onClick:function(e){return t(e,"flip r")},children:"Flip R!"})})]})}),Object(r.jsx)("div",{className:"d-flex justify-content-around mt-2",children:Object(r.jsx)(O.a,{style:{width:"90px"},onClick:function(e){return t(e,"flip b")},children:"Flip B!"})})]})]}),Object(r.jsxs)(m.a,{className:"d-flex mt-3 justify-content-center w-3",xs:"12",lg:"6",md:"6",children:[Object(r.jsx)(u.a,{className:"w-50 d-flex justify-content-center",children:Object(r.jsx)(O.a,{style:{width:"90px"},onClick:function(e){return t(e,"stop")},children:"Stop"})}),Object(r.jsx)(u.a,{className:"w-50 d-flex justify-content-center",children:Object(r.jsx)(O.a,{style:{width:"100px"},onClick:function(e){return t(e,"emergency")},children:"Emergency"})})]}),Object(r.jsxs)(m.a,{className:"d-flex mt-3 justify-content-center w-3",xs:"12",lg:"6",md:"6",children:[Object(r.jsx)(u.a,{className:"w-50 d-flex justify-content-center",children:Object(r.jsx)(O.a,{style:{width:"90px"},onClick:function(e){return t(e,"takeoff")},children:"Takeoff"})}),Object(r.jsx)(u.a,{className:"w-50 d-flex justify-content-center",children:Object(r.jsx)(O.a,{style:{width:"90px"},onClick:function(e){return t(e,"land")},children:"Land"})})]})]})})},F=function(e){var t=e.socket,c=e.tellostatus;Object(n.useEffect)((function(){t.on("msg",(function(e){return console.log("From server --\x3e",e)}))}),[]),Object(n.useEffect)((function(){console.log(c),T(c)}),[c]);var s=Object(n.useState)([]),o=Object(a.a)(s,2),l=o[0],i=o[1],d=Object(n.useState)({pitch:[],roll:[],yaw:[],agx:[],agy:[],agz:[],vgx:[],vgy:[],vgz:[],bat:[],baro:[],h:[],time:[],templ:[],temph:[]}),j=Object(a.a)(d,2),m=j[0],u=j[1],x=Object(n.useState)("control"),h=Object(a.a)(x,2),f=h[0],p=h[1],v=Object(n.useState)([]),y=Object(a.a)(v,2),N=y[0],S=y[1],D=Object(n.useState)(!1),F=Object(a.a)(D,2),K=F[0],T=F[1];Object(n.useEffect)((function(){t.on("telemetry",(function(e){i(Object.keys(e)),delete l.tof;var t=!1,c=m,n=new Date;for(var s in c)c[s.toString()].length>=50&&(c[s.toString()].shift(),t=!0),c[s.toString()].push(e[s.toString()]);u(c),S((function(e){return(!1===t||e.shift())&&[].concat(Object(b.a)(e),[n])}))}))}),[]);var P=80,R=!1,I=!1,A=!1,L=!1,Y=!1,z=!1,B=!1,X=!1;return Object(n.useEffect)((function(){document.addEventListener("keydown",(function(e){"KeyW"===e.code&&!1===R?(console.log("W"),t.emit("command","rc 0 ".concat(P," 0 0")),R=!0):"KeyS"===e.code&&!1===A?(console.log("S"),t.emit("command","rc 0 -".concat(P," 0 0")),A=!0):"KeyA"===e.code&&!1===I?(console.log("A"),t.emit("command","rc -".concat(P," 0 0 0")),I=!0):"KeyD"===e.code&&!1===L?(console.log("D"),L=!0,t.emit("command","rc ".concat(P," 0 0 0"))):"KeyQ"===e.code&&!1===Y?(console.log("Q"),Y=!0,t.emit("command","rc 0 0 0 -".concat(P," "))):"KeyE"===e.code&&!1===z?(console.log("E"),z=!0,t.emit("command","rc 0 0 0 ".concat(P))):"Space"===e.code&&!1===X?(console.log("Space"),X=!0,t.emit("command","rc 0 0 ".concat(P," 0"))):"ShiftLeft"===e.code&&!1===B&&(console.log("ShiftLeft"),B=!0,t.emit("command","rc 0 0 -".concat(P," 0")))})),document.addEventListener("keyup",(function(e){"KeyW"===e.code?(console.log("No W"),R=!1,t.emit("command","rc 0 0 0 0")):"KeyS"===e.code?(console.log("No S"),A=!1,t.emit("command","rc 0 0 0 0")):"KeyA"===e.code?(console.log("No A"),I=!1,t.emit("command","rc 0 0 0 0")):"KeyD"===e.code?(console.log("No D"),L=!1,t.emit("command","rc 0 0 0 0")):"KeyQ"===e.code?(console.log("No Q"),Y=!1,t.emit("command","rc 0 0 0 0")):"KeyE"===e.code?(console.log("No E"),z=!1,t.emit("command","rc 0 0 0 0")):"Space"===e.code?(console.log("No Space"),X=!1,t.emit("command","rc 0 0 0 0")):"ShiftLeft"===e.code&&(console.log("No ShiftLeft"),B=!1,t.emit("command","rc 0 0 0 0"))}))}),[]),Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)("div",{className:"Tello",children:[Object(r.jsx)("script",{type:"text/javascript",src:"jsmpeg.min.js"}),Object(r.jsxs)(C.a,{id:"controlled-tab-example",activeKey:f,onSelect:function(e){return p(e)},children:[Object(r.jsxs)(k.a,{eventKey:"control",title:"Control",children:[K?Object(r.jsx)(O.a,{style:{width:"200px"},className:"ml-3 mt-3",onClick:function(e){return function(e){e.preventDefault(),t.emit("tellostop"),T(!1)}(e)},children:"Stop connection"}):Object(r.jsx)(O.a,{style:{width:"200px"},className:"ml-3 mt-3",onClick:function(e){return function(e){e.preventDefault(),t.emit("tellostart"),T(!0)}(e)},children:"Start connection"}),Object(r.jsx)(_,{onClick:function(e,c){e.preventDefault(),t.emit("command",c),console.log("Comando ".concat(c," emitido"))}})]}),Object(r.jsx)(k.a,{eventKey:"data",title:"Data",children:Object(r.jsx)(g,{telemetry:m})}),Object(r.jsx)(k.a,{eventKey:"charts",width:"100%",title:"Charts",children:Object(r.jsx)(w,{time:N,telemetry:m,telnames:l})}),Object(r.jsx)(k.a,{eventKey:"video",className:"tab_style",title:"Video",children:Object(r.jsx)("div",{className:"d-flex flex-row justify-content-center",children:Object(r.jsx)(E,{})})})]})]})})},K=c(7),T=c(8),P=c(11),R=c(10),I=c(123),A=c.n(I),L=function(e){Object(P.a)(c,e);var t=Object(R.a)(c);function c(){return Object(K.a)(this,c),t.apply(this,arguments)}return Object(T.a)(c,[{key:"componentDidMount",value:function(){var e=this.props.socket,t=A()("#video-canvas");t.css("cursor","move");var c=!1,n="",s=0,o=0,l=function(l){t.css("cursor","grab"),l.pageX>s&&l.pageY===o?!1===c&&(c=!0,n="right",console.log(n),e.emit("uxcommand","RIGHT")):l.pageX===s&&l.pageY>o?!1===c&&(c=!0,n="down",console.log(n),e.emit("uxcommand","DOWN")):l.pageX===s&&l.pageY<o?!1===c&&(c=!0,n="up",console.log(n),e.emit("uxcommand","UP")):l.pageX<s&&l.pageY===o&&!1===c&&(c=!0,n="left",console.log(n),e.emit("uxcommand","LEFT")),s=l.pageX,o=l.pageY,n};t.on("touchstart mousedown",(function(e){t.on("touchmove mousemove",l)})),t.on("touchend mouseup",(function(n){t.off("touchend mousemove",l),t.css("cursor","move"),e.emit("uxcommand","STOP"),c=!1,""}))}},{key:"render",value:function(){return Object(r.jsx)("div",{className:"iframe-container",children:Object(r.jsx)("div",{className:"responsive-iframe border ",onMouseDown:this.handleEvent,onMouseUp:this.handleEvent,onDrag:this.handleDrag,id:"video-canvas"})})}}]),c}(n.Component),Y=function(e){var t=e.socket,c=e.ANDROID_IP,s=e.SOCKET_IP,o=e.SOCKET_PORT,l=e.ANDROID_FFMPEG_PORT;Object(n.useEffect)((function(){t.on("msg",(function(e){return console.log("From server --\x3e",e)}))}),[]),Object(n.useEffect)((function(){if(l){var e="wss://".concat("172.20.85.181",":").concat(l,"/stream"),t=new D.a.VideoElement("#video-canvas",e,{autoplay:!0});console.log(t)}}),[]);return Object(r.jsxs)("div",{className:"w-100",children:[Object(r.jsx)(O.a,{className:"floating_button",onClick:function(e){return function(e){e.preventDefault(),t.emit("restartstream"),console.log("Sending restart stream")}(e)},children:"Restart stream"}),Object(r.jsx)(L,{socket:t,ANDROID_IP:c,SOCKET_IP:s,SOCKET_PORT:o})]})},z=c(128),B="172.20.85.181",X="5001";console.log(B);var M=Object(z.a)("https://".concat(B,":").concat(X,"/")),V=[{title:"Tello",image:Object(r.jsx)(f.a,{className:"option_icon"})},{title:"ASDK",image:Object(r.jsx)(f.a,{className:"option_icon"})}];function W(e){Object(i.a)(e);var t=Object(n.useState)("Panel"),c=Object(a.a)(t,2),s=c[0],o=c[1],l=Object(n.useState)(""),x=Object(a.a)(l,2),f=x[0],b=x[1],O=Object(n.useState)({}),g=Object(a.a)(O,2),p=g[0],v=g[1],y=function(e,t){e.preventDefault(),o(t)};return Object(n.useEffect)((function(){M.on("tellostatus",(function(e){b(e)})),M.on("addresses",(function(e){v(e)}))}),[]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(h,{onClick:function(e){return y(e,"Panel")}}),"Panel"===s?Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("div",{className:"main",children:Object(r.jsx)(j.a,{className:"container",fluid:!0,children:Object(r.jsx)(m.a,{children:V.map((function(e){return Object(r.jsx)(u.a,{className:"d-flex justify-content-center w-3",xs:"12",lg:"6",md:"6",style:{padding:"1rem"},children:Object(r.jsx)(d,{title:e.title,image:e.image,onClick:function(t){return y(t,e.title)}})})}))})})})}):"Tello"===s?Object(r.jsx)(F,{socket:M,tellostatus:f}):Object(r.jsx)(Y,{socket:M,SOCKET_IP:B,SOCKET_PORT:X,ANDROID_IP:p.android_ip,ANDROID_FFMPEG_PORT:p.android_ffmpeg_port})]})}var G=function(){return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(W,{})})},Q=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,155)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,o=t.getLCP,l=t.getTTFB;c(e),n(e),s(e),o(e),l(e)}))};l.a.render(Object(r.jsx)(s.a.StrictMode,{children:Object(r.jsx)(G,{})}),document.getElementById("root")),Q()},58:function(e,t,c){}},[[146,1,2]]]);