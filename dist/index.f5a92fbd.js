const e=document.querySelector("[preview-image]"),t=document.querySelector("[sign-input]"),i=document.querySelector("[download-button]"),a=document.createElement("canvas"),r=a.getContext("2d"),n=new Image,d={text:{font:"32px Arial",color:"white"},image:{width:e.naturalWidth,height:e.naturalHeight,format:"image/jpeg",padding:30}},o=(e,t=d.image.width,i=d.image.padding)=>{let a=e,n=r.measureText(a).width;for(;n>t-2*i;)a=a.slice(0,-1),n=r.measureText(a).width;return a},g=(e,t="")=>{let i=a.width,n=a.height;// Clear canvas
r.clearRect(0,0,i,n),// Draw image
r.drawImage(e,0,0,i,n);// Draw text
let o=r.measureText(t).width,g=[i-o-d.image.padding,n-d.image.padding];return r.fillText(t,g[0],g[1]),a.toDataURL(d.image.format)},l=(t,a="")=>{if(!a)return i.removeAttribute("href");let r=g(t,a);e.src=r,i.href=r},m=()=>{let i=e.complete,a=o(t.value);i&&l(n,a)};a.width=d.image.width,a.height=d.image.height,r.font=d.text.font,r.fillStyle=d.text.color,n.src=e.src,t.addEventListener("input",m),m();