"use strict";(self.webpackChunkoctoprint=self.webpackChunkoctoprint||[]).push([[217],{9217:(e,n,i)=>{i.r(n),i.d(n,{default:()=>s});var t=i(5043),a=i(3402),o=i(579);const c=new a.qw({id:"application-0-lpfzcpx"}),s=()=>{const[e,n]=(0,t.useState)("");return(0,t.useEffect)((()=>{(async()=>{const e=new URLSearchParams(window.location.search),i=e.get("token"),t=e.get("tokenId");if(i&&t)try{await c.emailPasswordAuth.confirmUser({token:i,tokenId:t}),n("Email confirmed successfully!"),setTimeout((()=>{window.location.href("/octoprint/login")}),3e3)}catch(a){n("Email confirmation failed. Please try again.")}else n("Invalid confirmation link")})()}),[]),(0,o.jsx)("div",{className:"confirmation-container",children:(0,o.jsx)("div",{className:"confirmation-message",children:(0,o.jsx)("h1",{children:e})})})}}}]);
//# sourceMappingURL=217.3a0e74af.chunk.js.map