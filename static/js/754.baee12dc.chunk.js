"use strict";(self.webpackChunkoctoprint=self.webpackChunkoctoprint||[]).push([[754],{8754:(s,i,e)=>{e.r(i),e.d(i,{default:()=>c});e(5043);var t=e(6244),o=e(443),a=e(3402),r=e(5475),n=(e(7002),e(3413)),l=e(579);const d=new a.qw({id:"application-0-lpfzcpx"}),p=(s,i)=>(s.password!==s.confirmPassword&&i.confirmPassword.addError("Passwords don't match"),i),c=()=>(0,l.jsxs)("div",{className:"form-container",children:[(0,l.jsx)(t.Ay,{schema:n.kz.w,uiSchema:n.kz.o,validator:o.Ay,onSubmit:async s=>{let{formData:i}=s;const{email:e,password:t}=i;try{await d.emailPasswordAuth.registerUser({email:e,password:t})}catch(o){console.log(o.error)}window.location.href="/octoprint/login"},customValidate:p}),(0,l.jsx)("div",{className:"additional-links",children:(0,l.jsx)(r.N_,{to:"/octoprint/login",className:"link",children:"Login"})})]})},7002:()=>{},3413:s=>{s.exports=JSON.parse('{"kz":{"w":{"title":"Register","type":"object","required":["email","password","confirmPassword"],"properties":{"email":{"type":"string","title":"Email","format":"email"},"password":{"type":"string","title":"Password","minLength":6},"confirmPassword":{"type":"string","title":"Confirm Password","minLength":6}}},"o":{"password":{"ui:widget":"password","ui:placeholder":"M\u1eadt kh\u1ea9u"},"email":{"ui:placeholder":"Email"},"confirmPassword":{"ui:widget":"password","ui:placeholder":"X\xe1c nh\u1eadn m\u1eadt kh\u1ea9u"},"ui:options":{"submitButtonOptions":{"props":{"disabled":false,"className":"btn btn-info"},"norender":false,"submitText":"\u0110\u0103ng k\xfd"}}}},"iD":{"w":{"title":"Register","type":"object","required":["email","password"],"properties":{"email":{"type":"string","title":"Email","format":"email"},"password":{"type":"string","title":"Password","minLength":6}}},"o":{"password":{"ui:widget":"password","ui:placeholder":"M\u1eadt kh\u1ea9u"},"email":{"ui:placeholder":"Email"},"confirmPassword":{"ui:widget":"password","ui:placeholder":"X\xe1c nh\u1eadn m\u1eadt kh\u1ea9u"},"ui:options":{"submitButtonOptions":{"props":{"disabled":false,"className":"btn btn-info"},"norender":false,"submitText":"\u0110\u0103ng k\xfd"}}}}}')}}]);
//# sourceMappingURL=754.baee12dc.chunk.js.map