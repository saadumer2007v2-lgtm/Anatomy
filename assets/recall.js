/* Recall mode: blurs the answers in summary tables, card lists and flow chains so only the headings show.
   Tap (or Enter/Space) a blurred answer to reveal it; each table gets Reveal table / Write answers controls.
   The topbar toggle (or "R") turns it on and off; the choice is remembered on this device. */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const KEY='atlas-recall';
const SKIP='#panel-spec,#panel-test,#panel-exams,#panel-sources';
const HIDDEN='Hidden answer: press to reveal';
let on=false;

/* Move everything in el after an optional bold lead into a span.rc-ans (done once per element). */
function wrap(el,keepLead){
  if(el.dataset.rc) return; el.dataset.rc='1';
  let start=el.firstChild;
  if(keepLead){
    let n=start; while(n&&n.nodeType===3&&!n.textContent.trim()) n=n.nextSibling;
    if(n&&n.nodeName==='B') start=n.nextSibling;
  }
  const nodes=[]; for(let n=start;n;n=n.nextSibling) nodes.push(n);
  const txt=nodes.map(n=>n.textContent).join('').trim();
  if(!txt||txt==='—'||txt==='-') return;
  const span=document.createElement('span'); span.className='rc-ans';
  nodes.forEach(n=>span.appendChild(n)); el.appendChild(span); el.classList.add('rc-item');
}
function prep(){
  $$('.panel').forEach(p=>{
    if(p.matches(SKIP)) return;
    $$('table tbody td',p).forEach(td=>{ if(!td.closest('.qz,[class*="mx-"]')) wrap(td,false); });
    $$('.sec .card li',p).forEach(li=>{ if(!li.closest('.qz')) wrap(li,true); });
    $$('.nchain .nk',p).forEach(nk=>{ const sm=$('small',nk); if(sm&&!nk.dataset.rc){ nk.dataset.rc='1'; sm.classList.add('rc-ans'); nk.classList.add('rc-item'); } });
  });
}
function setOpen(it,open){
  it.classList.toggle('rc-open',open);
  const a=$(':scope > .rc-ans',it)||$('.rc-ans',it); if(!a) return;
  a.setAttribute('aria-expanded',String(open));
  if(open) a.removeAttribute('aria-label'); else a.setAttribute('aria-label',HIDDEN);
}
function colHead(td){
  const tr=td.parentElement, table=td.closest('table'), ths=$$('thead th',table);
  let col=0; for(const c of tr.children){ if(c===td) break; col+=c.colSpan||1; }
  let i=0, head=''; for(const th of ths){ if(col>=i&&col<i+(th.colSpan||1)){head=th.textContent.trim(); break;} i+=th.colSpan||1; }
  const row=$('th',tr); return [row?row.textContent.trim():'',head].filter(Boolean).join(', ');
}
function count(bar){
  const wrap=bar.nextElementSibling, its=$$('.rc-item',wrap), n=its.filter(x=>x.classList.contains('rc-open')).length;
  $('.rc-count',bar).textContent=`${n} of ${its.length} revealed`;
  const all=$('[data-rc="all"]',bar); const done=n===its.length;
  all.textContent=done?'Hide again':'Reveal table'; all.setAttribute('aria-pressed',String(done));
}
function bars(){
  $$('.panel').forEach(p=>{ if(p.matches(SKIP)) return;
    $$('.tbl-wrap',p).forEach(w=>{ if(!$('.rc-item',w)||(w.previousElementSibling&&w.previousElementSibling.classList.contains('rc-bar'))) return;
      const b=document.createElement('div'); b.className='rc-bar';
      b.innerHTML='<button class="pbtn" type="button" data-rc="all" aria-pressed="false">Reveal table</button><button class="pbtn" type="button" data-rc="write" aria-pressed="false">Write answers</button><span class="small muted rc-count" aria-live="polite"></span>';
      w.parentNode.insertBefore(b,w); count(b);
    });
  });
}
function enable(){
  on=true; prep();
  $$('.rc-ans').forEach(a=>{ if(!a.closest('.rc-item')) return; a.setAttribute('role','button'); a.setAttribute('tabindex','0'); });
  $$('.rc-item').forEach(it=>setOpen(it,false));
  bars(); document.body.classList.add('recall'); pill(true); sync();
}
function disable(){
  on=false; document.body.classList.remove('recall');
  $$('.rc-item').forEach(it=>{ it.classList.remove('rc-open'); const a=$('.rc-ans',it); if(a){ ['role','tabindex','aria-label','aria-expanded'].forEach(k=>a.removeAttribute(k)); } });
  $$('.rc-bar,.rc-in').forEach(x=>x.remove()); pill(false); sync();
}
function sync(){
  const b=$('#recall-toggle'); if(b){ b.setAttribute('aria-pressed',String(on)); $('.rc-l',b).textContent=on?'Recall on':'Recall'; }
  try{ localStorage.setItem(KEY,on?'1':'0'); }catch(e){}
  try{ document.dispatchEvent(new CustomEvent('atlas-recall',{detail:{on}})); }catch(e){}
}
/* for widgets that render their own .rc-item / .rc-ans markup after recall mode is switched on */
window.ATLAS_RECALL={
  isOn:()=>on,
  apply(root){ if(!on||!root) return;
    $$('.rc-item',root).forEach(it=>{ it.dataset.rc='1'; const a=$('.rc-ans',it); if(!a) return; a.setAttribute('role','button'); a.setAttribute('tabindex','0'); setOpen(it,it.classList.contains('rc-open')); }); }
};
function toggle(){ on?disable():enable(); }

/* floating control while recall mode is on */
function pill(show){
  let p=$('#rc-pill');
  if(!show){ if(p) p.hidden=true; return; }
  if(!p){ p=document.createElement('div'); p.id='rc-pill'; p.setAttribute('role','region'); p.setAttribute('aria-label','Recall mode controls');
    p.innerHTML='<span class="rc-pt"><b>Recall mode</b><span class="small"> Tap a blurred answer to check it</span></span><button class="pbtn" type="button" data-pg="show">Reveal page</button><button class="pbtn" type="button" data-pg="hide">Hide all</button><button class="pbtn" type="button" data-pg="off">Turn off</button>';
    document.body.appendChild(p);
    p.addEventListener('click',e=>{ const b=e.target.closest('[data-pg]'); if(!b) return;
      if(b.dataset.pg==='off'){ disable(); return; }
      const panel=$('.panel:not([hidden])'); if(!panel) return;
      $$('.rc-item',panel).forEach(it=>setOpen(it,b.dataset.pg==='show'));
      if(b.dataset.pg==='hide') $$('.rc-in',panel).forEach(t=>t.remove()), $$('[data-rc="write"]',panel).forEach(x=>x.setAttribute('aria-pressed','false'));
      $$('.rc-bar',panel).forEach(count); });
  }
  p.hidden=false;
}

/* interactions */
document.addEventListener('click',e=>{
  if(!on) return;
  const bb=e.target.closest('.rc-bar [data-rc]');
  if(bb){ const bar=bb.closest('.rc-bar'), w=bar.nextElementSibling, its=$$('.rc-item',w);
    if(bb.dataset.rc==='all'){ const open=!its.every(x=>x.classList.contains('rc-open')); its.forEach(it=>setOpen(it,open)); }
    else { const has=!!$('.rc-in',w);
      if(has){ $$('.rc-in',w).forEach(t=>t.remove()); bb.setAttribute('aria-pressed','false'); bb.textContent='Write answers'; }
      else { its.forEach(it=>{ if(it.tagName!=='TD') return; const t=document.createElement('textarea'); t.className='rc-in'; t.rows=2; t.setAttribute('aria-label','Your answer: '+colHead(it)); t.placeholder='Your answer'; it.insertBefore(t,it.firstChild); });
        bb.setAttribute('aria-pressed','true'); bb.textContent='Remove my answers'; const f=$('.rc-in',w); if(f) f.focus(); } }
    count(bar); return; }
  if(e.target.closest('textarea,input,select,button,a')) return;
  const it=e.target.closest('.rc-item'); if(!it) return;
  setOpen(it,!it.classList.contains('rc-open'));
  const w=it.closest('.tbl-wrap'), bar=w&&w.previousElementSibling; if(bar&&bar.classList.contains('rc-bar')) count(bar);
});
document.addEventListener('keydown',e=>{
  if(on&&(e.key==='Enter'||e.key===' ')&&e.target.classList&&e.target.classList.contains('rc-ans')){ e.preventDefault(); e.target.closest('.rc-item').click(); return; }
  const typing=/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)||e.target.isContentEditable;
  if(!typing&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&(e.key==='r'||e.key==='R')&&!(document.getElementById('srch')||{}).open){ e.preventDefault(); toggle(); }
});

function init(){
  const b=$('#recall-toggle'); if(b) b.addEventListener('click',toggle);
  let saved='0'; try{ saved=localStorage.getItem(KEY)||'0'; }catch(e){}
  if(saved==='1') enable(); else sync();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
