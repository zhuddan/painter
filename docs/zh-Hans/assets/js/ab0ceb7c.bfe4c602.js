"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4578],{5623:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>t,metadata:()=>c,toc:()=>l});var r=i(5723),a=i(1525);i(2155);const s=function(e){let{children:n}=e;return(0,r.jsxs)("div",{className:"bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded",children:[(0,r.jsxs)("div",{className:"flex items-center mb-2",children:["\ud83c\udf89\ud83c\udf89\ud83c\udf89",(0,r.jsx)("span",{className:"font-bold",children:"\u6fc0\u52a8\u4eba\u5fc3\u7684\u6d88\u606f!"})]}),(0,r.jsx)("p",{children:n})]})},t={sidebar_position:1},o="\u5fae\u4fe1\u5c0f\u7a0b\u5e8f",c={id:"note/diff",title:"\u5fae\u4fe1\u5c0f\u7a0b\u5e8f",description:'\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u5b98\u65b9\u65b0\u7248 Canvas 2D \u63a5\u53e3, \u867d\u7136\u5b98\u65b9\u8868\u793a"\u4e0eWeb\u6807\u51c6\u4fdd\u6301\u4e00\u81f4",\u4f46\u662f\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u8fd0\u884c\u5728\u7279\u5b9a\u7684\u73af\u5883\u4e2d,\u800c\u975e\u6807\u51c6\u7684Web\u6d4f\u89c8\u5668\u73af\u5883, \u56e0\u6b64\u5176 CanvasRenderingContext2D \u5bf9\u8c61\u4e0eWeb\u6807\u51c6\u4e2d\u7684 CanvasRenderingContext2D \u4ecd\u5b58\u5728\u4e00\u4e9b\u5dee\u5f02\u3002',source:"@site/docs/note/diff.mdx",sourceDirName:"note",slug:"/note/diff",permalink:"/canvas/zh-Hans/docs/note/diff",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"\u6e32\u67d3\u5143\u7d20",permalink:"/canvas/zh-Hans/docs/basics/renderable"},next:{title:"README",permalink:"/canvas/zh-Hans/docs/types/"}},d={},l=[];function m(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",li:"li",p:"p",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"\u5fae\u4fe1\u5c0f\u7a0b\u5e8f",children:"\u5fae\u4fe1\u5c0f\u7a0b\u5e8f"})}),"\n",(0,r.jsx)(n.admonition,{type:"danger",children:(0,r.jsxs)(n.p,{children:["\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u5b98\u65b9",(0,r.jsx)(n.a,{href:"https://developers.weixin.qq.com/miniprogram/dev/api/canvas/RenderingContext.html",children:"\u65b0\u7248 Canvas 2D \u63a5\u53e3"}),', \u867d\u7136\u5b98\u65b9\u8868\u793a"\u4e0eWeb\u6807\u51c6\u4fdd\u6301\u4e00\u81f4",\u4f46\u662f\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u8fd0\u884c\u5728\u7279\u5b9a\u7684\u73af\u5883\u4e2d,\u800c\u975e\u6807\u51c6\u7684Web\u6d4f\u89c8\u5668\u73af\u5883, \u56e0\u6b64\u5176 CanvasRenderingContext2D \u5bf9\u8c61\u4e0eWeb\u6807\u51c6\u4e2d\u7684 CanvasRenderingContext2D \u4ecd\u5b58\u5728\u4e00\u4e9b\u5dee\u5f02\u3002']})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"requestAnimationFrame/cancelAnimationFrame"}),"\n",(0,r.jsxs)(n.p,{children:["\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u6ca1\u6709\u63d0\u4f9b ",(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame",children:"window.requestAnimationFrame"})," \u548c ",(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame",children:"window.cancelAnimationFrame"})," api, \u800c\u662f\u6302\u8f7d\u5728",(0,r.jsx)(n.code,{children:"canvas"}),"\u5bf9\u8c61\u4e0a\uff0c\u53c2\u8003",(0,r.jsx)(n.a,{href:"https://developers.weixin.qq.com/miniprogram/dev/api/canvas/Canvas.requestAnimationFrame.html",children:"Canvas.requestAnimationFrame"})," ",(0,r.jsx)(n.a,{href:"https://developers.weixin.qq.com/miniprogram/dev/api/canvas/Canvas.cancelAnimationFrame.html",children:"Canvas.cancelAnimationFrame"}),"\u3002"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Image\u5bf9\u8c61"}),"\n",(0,r.jsxs)(n.p,{children:["\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u6ca1\u6709\u63d0\u4f9bdom\u5bf9\u8c61\u3002\u6240\u4ee5\u7ed8\u5236\u56fe\u7247\u65f6\u5019\u65f6\u5019, \u4f60\u65e0\u6cd5\u4f7f\u7528",(0,r.jsx)(n.code,{children:"new Image()"})," \u6216\u8005 ",(0,r.jsx)(n.code,{children:'document.createElement("img")'}),",\r\n\u4f46\u662f\u4ed6\u4eec\u63d0\u4f9b\u4e86",(0,r.jsx)(n.a,{href:"https://developers.weixin.qq.com/miniprogram/dev/api/canvas/Canvas.createImage.html",children:"canvas.createImage"}),"\u3002"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"\u7ed8\u5236\u5706\u89d2\u77e9\u5f62(CanvasRenderingContext2D.roundRect)"}),"\n",(0,r.jsxs)(n.p,{children:["\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u63d0\u4f9b\u7684",(0,r.jsx)(n.code,{children:"CanvasRenderingContext2D.roundRect"}),"\u65e0\u6cd5\u6b63\u5e38\u8fd0\u884c\uff0c\u4f46\u662f\u6211\u4eec\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"CanvasRenderingContext2D.moveTo"})," \u548c ",(0,r.jsx)(n.code,{children:"CanvasRenderingContext2D.arcTo"})," Api\u5df2\u7ecf\u505a\u4e86\u517c\u5bb9\u5904\u7406\u3002\u4f60\u65e0\u9700\u4e3a\u6b64\u62c5\u5fe7\u3002"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s,{children:(0,r.jsx)(n.p,{children:"\u5e78\u8fd0\u7684\u662f,\u6211\u4eec\u5df2\u4e3a\u8fd9\u4e9b\u5dee\u5f02\u5b9e\u73b0\u4e86\u517c\u5bb9\u6027\u5904\u7406\u3002\u60a8\u53ea\u9700\u4e13\u6ce8\u4e8e\u4ee3\u7801\u672c\u8eab,\u65e0\u9700\u989d\u5916\u8003\u8651\u591a\u7aef\u9002\u914d,\u5373\u53ef\u5b9e\u73b0\u4e00\u5957\u4ee3\u7801\u8de8\u5e73\u53f0\u8fd0\u884c\u3002"})})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}},1525:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>o});var r=i(2155);const a={},s=r.createContext(a);function t(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:t(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);