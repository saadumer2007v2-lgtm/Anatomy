/* Contents and search overlay (topbar button, "/" or Ctrl+K), plus previous/next chapter links at the foot of every chapter. */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const tabs=$$('.tabs .tab').map(b=>({k:b.dataset.tab,name:b.textContent.trim()}));

/* ---------- previous / next chapter ---------- */
tabs.forEach((t,i)=>{
  const p=$('#panel-'+t.k); if(!p) return;
  const prev=tabs[i-1], next=tabs[i+1];
  const nav=document.createElement('nav'); nav.className='chap-nav'; nav.setAttribute('aria-label','Chapter navigation');
  nav.innerHTML=(prev?`<a class="chap-prev" href="#${prev.k}"><small>Previous chapter</small><b>← ${esc(prev.name)}</b></a>`:'<span></span>')+
    (next?`<a class="chap-next" href="#${next.k}"><small>Next chapter</small><b>${esc(next.name)} →</b></a>`:'<span></span>');
  p.appendChild(nav);
});

/* ---------- search index (built on first open, after the page has rendered) ---------- */
let IDX=null;
function build(){
  IDX=[];
  tabs.forEach(t=>{const p=$('#panel-'+t.k); if(!p) return;
    IDX.push({id:t.k,title:t.name,chap:'Chapter',text:(($('.opener',p)||p).textContent||'').replace(/\s+/g,' ').toLowerCase(),lvl:0});
    $$('.sec[id]',p).forEach(s=>{const h=$('h2',s);
      IDX.push({id:s.id,title:h?h.textContent.trim():s.id,chap:t.name,text:s.textContent.replace(/\s+/g,' ').toLowerCase(),lvl:1});});
  });
}
function snippet(text,q){const i=text.indexOf(q); if(i<0) return '';
  const a=Math.max(0,i-50), b=Math.min(text.length,i+q.length+70);
  return (a?'…':'')+esc(text.slice(a,i))+'<mark>'+esc(text.slice(i,i+q.length))+'</mark>'+esc(text.slice(i+q.length,b))+(b<text.length?'…':'');}
function search(q){
  q=q.trim().toLowerCase(); const out=$('#srch-out'); if(!out) return;
  if(!IDX) build();
  if(!q){ /* contents view */
    out.innerHTML=tabs.map(t=>{const secs=IDX.filter(x=>x.lvl===1&&x.chap===t.name);
      return `<div class="srch-chap"><a class="srch-c" href="#${t.k}">${esc(t.name)}</a>${secs.length?`<ul>${secs.map(s=>`<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join('')}</ul>`:''}</div>`;}).join('');
    $('#srch-status').textContent='Contents: every chapter and section.'; return;
  }
  const words=q.split(/\s+/).filter(Boolean);
  const hits=IDX.map(x=>{const tl=x.title.toLowerCase(); let sc=0;
      for(const w of words){ if(tl.includes(w)) sc+=10; else if(x.text.includes(w)) sc+=1+Math.min(4,x.text.split(w).length-1)*.2; else return null; }
      if(tl.includes(q)) sc+=10; if(x.lvl===0) sc-=2;
      if(/(^|-)quiz$|^anki$|^mock/.test(x.id)) sc*=.5; /* question banks mention everything: rank teaching sections first */
      return {x,sc};})
    .filter(Boolean).sort((a,b)=>b.sc-a.sc).slice(0,30);
  out.innerHTML=hits.length?`<ul class="srch-hits">${hits.map(({x})=>`<li><a href="#${x.id}"><b>${esc(x.title)}</b><small>${esc(x.chap)}</small><span>${snippet(x.text,words.find(w=>x.text.includes(w))||q)}</span></a></li>`).join('')}</ul>`:'<p class="muted">No matches. Try a structure name, such as "phrenic" or "inguinal".</p>';
  $('#srch-status').textContent=hits.length?`${hits.length} section${hits.length>1?'s':''} found.`:'No matches.';
}

/* ---------- dialog ---------- */
const dlg=document.createElement('dialog'); dlg.id='srch'; dlg.setAttribute('aria-label','Contents and search');
dlg.innerHTML=`<div class="srch-box"><div class="srch-top"><label class="sr" for="srch-q">Search the atlas</label>
  <input id="srch-q" type="search" placeholder="Search every chapter, e.g. recurrent laryngeal" autocomplete="off">
  <button class="btn ghost" id="srch-close" type="button">Close</button></div>
  <p class="small muted" id="srch-status" aria-live="polite"></p><div id="srch-out"></div></div>`;
document.body.appendChild(dlg);
const inp=$('#srch-q');
function open(){ if(dlg.open) return; inp.value=''; search(''); try{dlg.showModal();}catch(e){dlg.setAttribute('open','');} inp.focus(); }
function close(){ try{dlg.close();}catch(e){dlg.removeAttribute('open');} }
let t=null; inp.addEventListener('input',()=>{clearTimeout(t); t=setTimeout(()=>search(inp.value),120);});
inp.addEventListener('keydown',e=>{if(e.key==='Enter'){const a=$('#srch-out a'); if(a){e.preventDefault(); a.click();}}});
$('#srch-close').addEventListener('click',close);
dlg.addEventListener('click',e=>{ if(e.target===dlg){close(); return;} if(e.target.closest('a[href^="#"]')) setTimeout(close,0); });

const btn=$('#srch-open'); if(btn) btn.addEventListener('click',open);
document.addEventListener('keydown',e=>{
  const typing=/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)||e.target.isContentEditable;
  if((e.key==='k'||e.key==='K')&&(e.ctrlKey||e.metaKey)){e.preventDefault(); open();}
  else if(e.key==='/'&&!typing&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault(); open();}
});
})();
