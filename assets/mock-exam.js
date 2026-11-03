/* Timed mock exam engine: exam mode (mark at the end) or tutor mode (feedback after each answer).
   State lives in localStorage so an attempt survives a reload. */
(function(){
'use strict';
const host=document.getElementById('mock-host'); if(!host||!window.MOCK_PAPERS) return;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const KEY='atlas-mock-v1';
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return {};}};
let DB=load(); DB.history=DB.history||[];
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(DB));}catch(e){}};
const PAPERS=window.MOCK_PAPERS, P=id=>PAPERS.find(p=>p.id===id);
const TOPICS={ul:'Upper limb',ll:'Lower limb',msk:'Musculoskeletal (general)',nerv:'Nervous system',cvs:'Cardiovascular',resp:'Respiratory',gi:'Gastrointestinal',renal:'Renal & urinary',endo:'Endocrine',repro:'Reproductive',imm:'Immune & lymphatic',blood:'Blood',skin:'Skin'};
const L='ABCDE';

/* ---------- helpers ---------- */
function rng(seed){let s=seed>>>0||1; return ()=>{s^=s<<13; s>>>=0; s^=s>>17; s^=s<<5; s>>>=0; return s/4294967296;};}
function shuffle(a,r){a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a;}
const seedOf=s=>Array.from(s).reduce((h,c)=>Math.imul(h^c.charCodeAt(0),16777619)>>>0,2166136261);
const fmt=s=>{s=Math.max(0,Math.round(s)); const h=Math.floor(s/3600), m=Math.floor(s%3600/60), x=s%60; return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(x).padStart(2,'0');};
const norm=s=>String(s).toLowerCase().replace(/α/g,'alpha').replace(/β/g,'beta').replace(/[^a-z0-9]/g,'');
function lev(a,b){if(Math.abs(a.length-b.length)>2) return 9; const d=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){let p=d[0]; d[0]=i; for(let j=1;j<=b.length;j++){const t=d[j]; d[j]=Math.min(d[j]+1,d[j-1]+1,p+(a[i-1]===b[j-1]?0:1)); p=t;}} return d[b.length];}
function checkVSA(q,ans){
  const n=norm(ans); if(!n) return false;
  if(q.req&&q.req.every(g=>g.split('|').some(x=>n.includes(norm(x))))) return true;
  return q.a.some(x=>{const a=norm(x); if(n===a) return true;
    const tol=a.length>=10?2:a.length>=5?1:0; if(tol&&lev(n,a)<=tol) return true;
    return a.length>=6&&n.includes(a);});
}
/* null = unanswered, true / false = marked */
function mark(att,qi){
  const q=P(att.paper).qs[qi], a=att.ans[qi];
  if(att.over&&att.over[qi]!=null) return att.over[qi];
  if(a==null||a==='') return null;
  return q.t==='s'?a===q.a:checkVSA(q,a);
}
function score(att){
  const p=P(att.paper); let c=0,n=0,un=0; const top={}, typ={s:[0,0],v:[0,0]};
  att.order.forEach(qi=>{const q=p.qs[qi], m=mark(att,qi); n++; if(m) c++; if(m==null) un++;
    top[q.s]=top[q.s]||[0,0]; top[q.s][1]++; if(m) top[q.s][0]++; typ[q.t][1]++; if(m) typ[q.t][0]++;});
  return {c,n,un,top,typ,pct:n?Math.round(c/n*100):0};
}

/* ---------- timer ---------- */
let tick=null, lastT=0, saveCount=0;
function startClock(){stopClock(); lastT=Date.now(); tick=setInterval(onTick,1000);}
function stopClock(){if(tick){clearInterval(tick); tick=null;} }
function onTick(){
  const A=DB.active; if(!A||A.paused) {lastT=Date.now(); return;}
  const now=Date.now(); A.elapsed+=(now-lastT)/1000; lastT=now;
  paintClock();
  if(A.limit&&A.elapsed>=A.limit){A.elapsed=A.limit; submit(true); return;}
  if(++saveCount%5===0) save();
}
function paintClock(){
  const A=DB.active, el=$('#mx-clock'); if(!A||!el) return;
  if(A.limit){const left=A.limit-A.elapsed; el.textContent=fmt(left)+' left'; el.classList.toggle('warn',left<300);}
  else el.textContent=fmt(A.elapsed)+' elapsed';
}
document.addEventListener('visibilitychange',()=>{if(DB.active){ if(document.hidden) save(); else lastT=Date.now(); }});
window.addEventListener('pagehide',save);

/* ---------- start screen ---------- */
function home(msg){
  stopClock(); document.body.classList.remove('exam-on');
  const A=DB.active, s=readSettings();
  const best=id=>{const h=DB.history.filter(x=>x.paper===id&&!x.subset); if(!h.length) return 'Not attempted yet';
    const b=Math.max(...h.map(x=>x.pct)), l=h[h.length-1]; return `Last ${l.pct}% · best ${b}% · ${h.length} attempt${h.length>1?'s':''}`;};
  const mix=p=>{const c={}; p.qs.forEach(q=>c[q.s]=(c[q.s]||0)+1); return Object.entries(c).map(([k,v])=>`<span class="rt">${esc(TOPICS[k])} ${v}</span>`).join(' ');};
  host.innerHTML=`${msg?`<div class="note exam"><span class="tag">Notice</span><p>${msg}</p></div>`:''}
  ${A?`<div class="mx-resume"><div><b>Attempt in progress:</b> ${esc(P(A.paper).title)} · ${A.mode==='tutor'?'tutor mode':'exam mode'} · ${Object.keys(A.ans).length} of ${A.order.length} answered · ${A.limit?fmt(A.limit-A.elapsed)+' left':fmt(A.elapsed)+' elapsed'}</div>
    <div class="mx-row"><button class="btn" data-act="resume">Resume</button><button class="btn ghost" data-act="abandon">Discard attempt</button></div></div>`:''}
  <fieldset class="mx-set"><legend>1 · How do you want feedback?</legend>
    <label class="mx-opt"><input type="radio" name="mx-mode" value="exam" ${s.mode==='exam'?'checked':''}><span><b>Exam mode</b> — answer everything, change your mind, flag questions; marked only when you submit or time runs out.</span></label>
    <label class="mx-opt"><input type="radio" name="mx-mode" value="tutor" ${s.mode==='tutor'?'checked':''}><span><b>Tutor mode</b> — each answer is marked as soon as you choose it, with the correct answer and explanation shown straight away.</span></label>
  </fieldset>
  <fieldset class="mx-set"><legend>2 · Time limit</legend><div class="pill-btns">
    ${[[6000,'100 min'],[7200,'2 hours (≈ 72 s / question)'],[9000,'2 h 30 min'],[0,'Untimed']].map(([v,t])=>`<label class="pbtn mx-pill"><input type="radio" name="mx-time" value="${v}" ${+s.time===v?'checked':''}>${t}</label>`).join('')}</div></fieldset>
  <fieldset class="mx-set"><legend>3 · Question order</legend><div class="pill-btns">
    ${[['mixed','Mixed systems (fixed order)'],['random','New random order'],['grouped','Grouped by system']].map(([v,t])=>`<label class="pbtn mx-pill"><input type="radio" name="mx-order" value="${v}" ${s.order===v?'checked':''}>${t}</label>`).join('')}</div>
    <p class="small muted">Answer options are shuffled for every attempt, so you remember content, not letters.</p></fieldset>
  <div class="mx-papers">${PAPERS.map(p=>`<div class="card mx-paper"><span class="eyebrow">${p.qs.length} questions · ${p.qs.filter(q=>q.t==='s').length} SBA + ${p.qs.filter(q=>q.t==='v').length} short answer</span>
    <h4>${esc(p.title)}</h4><p>${esc(p.sub)}</p><p class="small">${mix(p)}</p><p class="meta">${best(p.id)}</p>
    <div class="mx-row"><button class="btn" data-act="start" data-p="${p.id}">Start ${esc(p.title.toLowerCase())}</button>${DB.last&&DB.last.paper===p.id?`<button class="btn ghost" data-act="review">Review last attempt</button>`:''}</div></div>`).join('')}</div>
  ${DB.history.length?`<div class="sub"><h3>Your attempts on this device</h3><div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Paper</th><th>Mode</th><th>Score</th><th>Time used</th></tr></thead><tbody>
    ${DB.history.slice().reverse().slice(0,15).map(h=>`<tr><td>${new Date(h.date).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</td><td>${esc(P(h.paper)?P(h.paper).title:h.paper)}${h.subset?' (wrong-answer practice)':''}</td><td>${h.mode==='tutor'?'Tutor':'Exam'}</td><td><b>${h.c}/${h.n}</b> (${h.pct}%)</td><td>${fmt(h.elapsed)}</td></tr>`).join('')}
    </tbody></table></div><div class="mx-row"><button class="btn ghost" data-act="wipe">Clear attempt history</button><span class="small muted" id="mx-wipe-msg"></span></div></div>`:''}`;
}
function readSettings(){const d=DB.settings||{mode:'exam',time:7200,order:'mixed'};
  const get=n=>{const el=$(`input[name="${n}"]:checked`,host); return el?el.value:null;};
  if($('input[name="mx-mode"]',host)){d.mode=get('mx-mode')||d.mode; d.time=+(get('mx-time')??d.time); d.order=get('mx-order')||d.order;}
  DB.settings=d; return d;}

function start(pid,subset){
  const s=readSettings(), p=P(pid), seed=Date.now()>>>0;
  let order=p.qs.map((_,i)=>i);
  if(subset){order=subset;}
  else if(s.order==='mixed') order=shuffle(order,rng(seedOf(pid)));
  else if(s.order==='random') order=shuffle(order,rng(seed));
  const r=rng(seed^0x9e3779b9), opt={};
  order.forEach(qi=>{if(p.qs[qi].t==='s') opt[qi]=shuffle([0,1,2,3,4],r);});
  DB.active={paper:pid,mode:subset?'tutor':s.mode,limit:subset?0:+s.time,order,opt,ans:{},locked:{},flags:{},over:{},cur:0,elapsed:0,started:new Date().toISOString(),subset:!!subset};
  save(); exam();
}

/* ---------- exam view ---------- */
function exam(){
  const A=DB.active; if(!A){home(); return;}
  document.body.classList.add('exam-on');
  host.innerHTML=`<div class="mx-bar" role="region" aria-label="Exam controls">
    <div class="mx-bar-l"><b>${esc(P(A.paper).title)}</b><span class="rt">${A.mode==='tutor'?'Tutor mode':'Exam mode'}</span><span class="small" id="mx-prog"></span></div>
    <div class="mx-bar-r"><span class="mx-clock" id="mx-clock" aria-live="off"></span>
      <button class="btn ghost" data-act="pause">Pause</button>
      <button class="btn ghost mx-navtoggle" data-act="navtoggle" aria-expanded="false">Questions</button>
      <button class="btn" data-act="submit">${A.mode==='tutor'?'Finish':'Submit'}</button></div>
    <div class="mx-progress"><i id="mx-bar-fill"></i></div></div>
  <div class="mx-body"><div class="mx-main" id="mx-q"></div><aside class="mx-nav" id="mx-nav" aria-label="Question navigator"></aside></div>
  <div class="mx-modal" id="mx-modal" hidden></div>`;
  drawQ(); drawNav(); paintClock(); if(A.paused) pauseOverlay(); startClock();
}
function drawQ(){
  const A=DB.active, p=P(A.paper), qi=A.order[A.cur], q=p.qs[qi], box=$('#mx-q');
  const locked=A.mode==='tutor'&&A.locked[qi], ans=A.ans[qi], flag=!!A.flags[qi];
  let body='';
  if(q.t==='s'){
    body=`<div class="opts" role="group" aria-label="Answer options">${A.opt[qi].map((oi,k)=>{
      let cls=''; if(locked){ if(oi===q.a) cls='right'; else if(oi===ans) cls='wrong'; } else if(oi===ans) cls='sel';
      return `<button class="opt ${cls}" data-oi="${oi}" ${locked?'disabled':''} aria-pressed="${oi===ans}"><span class="l">${L[k]}</span><span>${esc(q.o[oi])}</span></button>`;}).join('')}</div>`;
  } else {
    body=`<div class="vsaq"><input type="text" id="mx-vsa" autocomplete="off" spellcheck="false" placeholder="Type your answer (1–3 words)" aria-label="Your answer" value="${esc(ans||'')}" ${locked?'disabled':''}>
      ${A.mode==='tutor'&&!locked?'<button class="btn" data-act="check">Check answer</button>':''}</div>
      ${A.mode==='exam'?'<p class="small muted">Saved automatically. Spelling is marked leniently; you can overrule the marking when you review.</p>':''}`;
  }
  const fb=locked?feedback(A,qi):'';
  box.innerHTML=`<article class="q mx-card"><div class="qhead"><span class="qtype">Question ${A.cur+1} of ${A.order.length}</span><span class="qtype">${q.t==='s'?'Single best answer':'Very short answer'}</span><span class="qtype">${esc(TOPICS[q.s])}</span>
    <button class="pbtn mx-flag" data-act="flag" aria-pressed="${flag}">${flag?'⚑ Flagged':'⚐ Flag for review'}</button></div>
    <p class="stem">${esc(q.q)}</p>${body}${fb}
    <div class="mx-row mx-move"><button class="btn ghost" data-act="prev" ${A.cur?'':'disabled'}>← Previous</button>
      <span class="small muted mx-keys">Keys: A–E choose · ←/→ move · F flag</span>
      <button class="btn ${A.cur===A.order.length-1?'':'ghost'}" data-act="${A.cur===A.order.length-1?'submit':'next'}">${A.cur===A.order.length-1?(A.mode==='tutor'?'Finish':'Submit'):'Next →'}</button></div></article>`;
  const n=Object.keys(A.ans).filter(k=>A.ans[k]!==''&&A.ans[k]!=null).length;
  $('#mx-prog').textContent=`${n} of ${A.order.length} answered`; $('#mx-bar-fill').style.width=(n/A.order.length*100)+'%';
  if(A.mode==='tutor'){const tl=A.order.filter(i=>A.locked[i]), ok=tl.filter(i=>mark(A,i)).length; if(tl.length) $('#mx-prog').textContent+=` · ${ok}/${tl.length} correct so far`;}
}
function feedback(A,qi){
  const q=P(A.paper).qs[qi], m=mark(A,qi), auto=q.t==='v'&&A.over[qi]==null;
  const right=q.t==='s'?`${L[A.opt[qi].indexOf(q.a)]}. ${q.o[q.a]}`:q.m;
  return `<div class="expl mx-fb ${m?'ok':'no'}"><span class="verdict ${m?'ok':'no'}">${m?'Correct.':(A.ans[qi]==null||A.ans[qi]===''?'Not answered.':'Incorrect.')}</span>
    <span><b>Answer:</b> ${esc(right)}</span>${q.t==='v'&&A.ans[qi]?`<span><b>You wrote:</b> ${esc(A.ans[qi])}</span>`:''}
    <span>${esc(q.e)}</span>
    ${q.t==='v'?`<span class="mx-row small">${auto?'Marked automatically.':'You overruled the marking.'} <button class="pbtn" data-act="over" data-v="1">Count as correct</button><button class="pbtn" data-act="over" data-v="0">Count as wrong</button></span>`:''}</div>`;
}
function drawNav(){
  const A=DB.active, nav=$('#mx-nav'); if(!nav) return;
  nav.innerHTML=`<div class="mx-legend small"><span><i class="c-ans"></i>answered</span><span><i class="c-flag"></i>flagged</span>${A.mode==='tutor'?'<span><i class="c-ok"></i>correct</span><span><i class="c-no"></i>wrong</span>':''}</div>
  <div class="mx-grid">${A.order.map((qi,i)=>{const a=A.ans[qi]!=null&&A.ans[qi]!=='', cls=[i===A.cur?'cur':'',a?'ans':'',A.flags[qi]?'flag':''];
    if(A.mode==='tutor'&&A.locked[qi]) cls.push(mark(A,qi)?'ok':'no');
    return `<button class="${cls.join(' ')}" data-go="${i}" aria-label="Question ${i+1}${a?', answered':''}${A.flags[qi]?', flagged':''}">${i+1}</button>`;}).join('')}</div>
  <p class="small muted">${A.limit?'Time keeps running while this page is open. ':''}Your progress is saved on this device.</p>`;
}
function go(i){const A=DB.active; A.cur=Math.max(0,Math.min(A.order.length-1,i)); save(); drawQ(); drawNav();
  const top=$('.mx-bar',host); if(top){const r=top.getBoundingClientRect(); if(r.top<0||r.top>window.innerHeight*0.4) top.scrollIntoView({block:'start'});}}
function answer(val){
  const A=DB.active, qi=A.order[A.cur], q=P(A.paper).qs[qi];
  if(A.mode==='tutor'&&A.locked[qi]) return;
  if(q.t==='s'&&A.mode==='exam'&&A.ans[qi]===val) delete A.ans[qi]; else A.ans[qi]=val;
  if(A.mode==='tutor') A.locked[qi]=true;
  save(); drawQ(); drawNav();
}
function pauseOverlay(){
  const m=$('#mx-modal'); m.hidden=false;
  m.innerHTML=`<div class="mx-dialog"><h3>Paused</h3><p>The clock is stopped and the question is hidden.</p><div class="mx-row"><button class="btn" data-act="unpause">Resume</button><button class="btn ghost" data-act="leave">Save and leave</button></div></div>`;
  $('[data-act="unpause"]',m).focus();
}
function confirmSubmit(){
  const A=DB.active, n=A.order.filter(qi=>A.ans[qi]!=null&&A.ans[qi]!=='').length, f=A.order.filter(qi=>A.flags[qi]).length, m=$('#mx-modal');
  m.hidden=false;
  m.innerHTML=`<div class="mx-dialog"><h3>${A.mode==='tutor'?'Finish and see results?':'Submit for marking?'}</h3>
    <p>You have answered <b>${n} of ${A.order.length}</b> questions${f?` and flagged <b>${f}</b>`:''}.${n<A.order.length?' Unanswered questions score zero.':''}</p>
    <div class="mx-row"><button class="btn" data-act="dosubmit">${A.mode==='tutor'?'Finish':'Submit'}</button><button class="btn ghost" data-act="closemodal">Keep going</button>${f?'<button class="btn ghost" data-act="firstflag">Go to first flagged</button>':''}</div></div>`;
  $('[data-act="dosubmit"]',m).focus();
}
function submit(timeUp){
  const A=DB.active; if(!A) return; stopClock();
  const r=Object.assign({},A,{date:new Date().toISOString(),timeUp:!!timeUp}); delete r.cur; delete r.paused;
  const sc=score(r);
  DB.history.push({paper:r.paper,mode:r.mode,date:r.date,c:sc.c,n:sc.n,pct:sc.pct,elapsed:r.elapsed,subset:r.subset});
  if(DB.history.length>60) DB.history=DB.history.slice(-60);
  DB.last=r; DB.active=null; save();
  results(timeUp?'Time is up. Your answers have been submitted and marked.':'');
}

/* ---------- results ---------- */
let rFilter='all';
function results(msg){
  const R=DB.last; if(!R){home(); return;}
  document.body.classList.remove('exam-on'); stopClock();
  const p=P(R.paper), sc=score(R);
  const band=sc.pct>=75?'Excellent':sc.pct>=60?'Good: comfortably above a typical pass mark':sc.pct>=50?'Borderline: review your weakest systems':'Below a typical pass mark: target the systems below';
  const topRows=Object.entries(sc.top).sort((a,b)=>a[1][0]/a[1][1]-b[1][0]/b[1][1]).map(([k,[c,n]])=>{const pc=Math.round(c/n*100);
    return `<tr><th>${esc(TOPICS[k])}</th><td class="nowrap">${c}/${n}</td><td style="width:50%"><div class="mx-meter ${pc<50?'low':pc<70?'mid':''}"><i style="width:${pc}%"></i></div></td><td class="nowrap">${pc}%</td></tr>`;}).join('');
  host.innerHTML=`${msg?`<div class="note exam"><span class="tag">Marked</span><p>${esc(msg)}</p></div>`:''}
  <div class="mx-score"><div class="mx-big"><span class="mx-pct">${sc.pct}%</span><span>${sc.c} of ${sc.n} correct</span></div>
    <div class="mx-facts"><p><b>${esc(p.title)}</b>${R.subset?' · wrong-answer practice':''} · ${R.mode==='tutor'?'tutor mode':'exam mode'} · ${new Date(R.date).toLocaleString('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</p>
      <p>Single best answer: <b>${sc.typ.s[0]}/${sc.typ.s[1]}</b> · Short answer: <b>${sc.typ.v[0]}/${sc.typ.v[1]}</b> · Unanswered: <b>${sc.un}</b></p>
      <p>Time used: <b>${fmt(R.elapsed)}</b>${R.limit?` of ${fmt(R.limit)}`:' (untimed)'}${R.limit?` · ${(R.elapsed/sc.n).toFixed(0)} s per question`:''}</p>
      <p class="mx-band">${band}</p></div></div>
  <div class="mx-row"><button class="btn" data-act="retake" data-p="${R.paper}">Retake ${esc(p.title.toLowerCase())}</button>
    ${sc.c<sc.n?`<button class="btn ghost" data-act="practise">Practise the ${sc.n-sc.c} I got wrong (tutor mode)</button>`:''}
    <button class="btn ghost" data-act="home">Back to mock exams</button></div>
  <div class="sub"><h3>Score by system</h3><p class="small muted">Weakest first. Use the matching chapter of the atlas to revise.</p><div class="tbl-wrap"><table class="mx-topics"><tbody>${topRows}</tbody></table></div></div>
  <div class="sub"><h3>Review every question</h3>
    <div class="pill-btns" id="mx-rf">${[['all','All'],['wrong','Incorrect'],['un','Unanswered'],['flag','Flagged'],['vsa','Short answers']].map(([v,t])=>`<button class="pbtn" data-rf="${v}" aria-pressed="${rFilter===v}">${t}</button>`).join('')}</div>
    <div class="qz" id="mx-review"></div></div>`;
  drawReview();
}
function drawReview(){
  const R=DB.last, p=P(R.paper), box=$('#mx-review'); if(!box) return;
  const items=R.order.map((qi,i)=>({qi,i,q:p.qs[qi],m:mark(R,qi)})).filter(x=>rFilter==='all'||(rFilter==='wrong'&&x.m===false)||(rFilter==='un'&&x.m==null)||(rFilter==='flag'&&R.flags[x.qi])||(rFilter==='vsa'&&x.q.t==='v'));
  box.innerHTML=items.length?items.map(({qi,i,q,m})=>{
    const your=R.ans[qi];
    let body='';
    if(q.t==='s') body=`<div class="opts">${R.opt[qi].map((oi,k)=>`<div class="opt ${oi===q.a?'right':oi===your?'wrong':''}"><span class="l">${L[k]}</span><span>${esc(q.o[oi])}${oi===your?' <em class="small">(your answer)</em>':''}</span></div>`).join('')}</div>`;
    else body=`<p><b>You wrote:</b> ${your?esc(your):'<em>no answer</em>'}</p><p><b>Model answer:</b> ${esc(q.m)}</p>
      <div class="mx-row small"><span>${R.over[qi]==null?'Marked automatically.':'You overruled the marking.'}</span><button class="pbtn" data-rover="1" data-qi="${qi}" aria-pressed="${m===true}">Count as correct</button><button class="pbtn" data-rover="0" data-qi="${qi}" aria-pressed="${m===false}">Count as wrong</button></div>`;
    return `<div class="q mx-rev ${m?'is-ok':'is-no'}"><div class="qhead"><span class="qtype">Q${i+1}</span><span class="qtype">${esc(TOPICS[q.s])}</span><span class="qtype">${q.t==='s'?'SBA':'Short answer'}</span>${R.flags[qi]?'<span class="qtype">⚑ flagged</span>':''}<span class="verdict ${m?'ok':'no'}">${m?'✓ Correct':m===false?'✗ Incorrect':'— Unanswered'}</span></div>
      <p class="stem">${esc(q.q)}</p>${body}<div class="expl"><span>${esc(q.e)}</span></div></div>`;}).join(''):'<p class="muted">Nothing in this filter.</p>';
}

/* ---------- events ---------- */
host.addEventListener('click',e=>{
  const t=e.target.closest('[data-act],[data-oi],[data-go],[data-rf],[data-rover]'); if(!t) return;
  const A=DB.active;
  if(t.dataset.oi!=null){answer(+t.dataset.oi); return;}
  if(t.dataset.go!=null){go(+t.dataset.go); host.classList.remove('nav-open'); return;}
  if(t.dataset.rf){rFilter=t.dataset.rf; $$('#mx-rf .pbtn').forEach(b=>b.setAttribute('aria-pressed',String(b===t))); drawReview(); return;}
  if(t.dataset.rover!=null){const R=DB.last, qi=+t.dataset.qi; R.over[qi]=t.dataset.rover==='1';
    const sc=score(R), h=DB.history.find(x=>x.date===R.date); if(h){h.c=sc.c; h.pct=sc.pct;} save(); const y=window.scrollY; results(); window.scrollTo(0,y); return;}
  switch(t.dataset.act){
    case 'start': start(t.dataset.p); break;
    case 'resume': exam(); break;
    case 'abandon': if(t.dataset.armed){DB.active=null; save(); home('Attempt discarded.');} else {t.dataset.armed='1'; t.textContent='Click again to discard';} break;
    case 'review': rFilter='all'; results(); break;
    case 'wipe': if(t.dataset.armed){DB.history=[]; DB.last=null; save(); home('Attempt history cleared.');} else {t.dataset.armed='1'; t.textContent='Click again to clear';} break;
    case 'prev': go(A.cur-1); break;
    case 'next': go(A.cur+1); break;
    case 'flag': {const qi=A.order[A.cur]; if(A.flags[qi]) delete A.flags[qi]; else A.flags[qi]=1; save(); drawQ(); drawNav(); break;}
    case 'check': {const v=$('#mx-vsa').value; if(!v.trim()){$('#mx-vsa').focus(); return;} answer(v); break;}
    case 'over': {const qi=A.order[A.cur]; A.over[qi]=t.dataset.v==='1'; save(); drawQ(); drawNav(); break;}
    case 'pause': A.paused=true; save(); pauseOverlay(); break;
    case 'unpause': A.paused=false; lastT=Date.now(); save(); $('#mx-modal').hidden=true; break;
    case 'leave': save(); home('Your attempt is saved. Resume it any time.'); break;
    case 'navtoggle': {const on=host.classList.toggle('nav-open'); t.setAttribute('aria-expanded',String(on)); break;}
    case 'submit': confirmSubmit(); break;
    case 'dosubmit': submit(false); break;
    case 'closemodal': $('#mx-modal').hidden=true; break;
    case 'firstflag': {$('#mx-modal').hidden=true; const i=A.order.findIndex(qi=>A.flags[qi]); if(i>=0) go(i); break;}
    case 'retake': start(t.dataset.p); break;
    case 'practise': {const R=DB.last; start(R.paper,R.order.filter(qi=>!mark(R,qi))); break;}
    case 'home': home(); break;
  }
});
host.addEventListener('change',e=>{if(e.target.name&&e.target.name.startsWith('mx-')){readSettings(); save();}});
host.addEventListener('input',e=>{
  if(e.target.id!=='mx-vsa') return; const A=DB.active; if(!A||A.mode!=='exam') return;
  const qi=A.order[A.cur]; const v=e.target.value; if(v.trim()) A.ans[qi]=v; else delete A.ans[qi];
  save(); drawNav(); const n=A.order.filter(i=>A.ans[i]!=null&&A.ans[i]!=='').length; $('#mx-prog').textContent=`${n} of ${A.order.length} answered`; $('#mx-bar-fill').style.width=(n/A.order.length*100)+'%';
});
host.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='mx-vsa'){const b=$('[data-act="check"]',host); if(b) b.click(); else {const n=$('[data-act="next"]',host); if(n) n.click();}}});
document.addEventListener('keydown',e=>{
  const A=DB.active; if(!A||!document.body.classList.contains('exam-on')||host.offsetParent===null) return;
  if((e.target.matches&&e.target.matches('input,textarea,select,[contenteditable]'))||e.ctrlKey||e.metaKey||e.altKey) return;
  if(!$('#mx-modal').hidden) return;
  const k=e.key.toLowerCase(), qi=A.order[A.cur], q=P(A.paper).qs[qi];
  if(q.t==='s'&&'abcde'.includes(k)&&k.length===1){e.preventDefault(); answer(A.opt[qi]['abcde'.indexOf(k)]);}
  else if(q.t==='s'&&'12345'.includes(k)&&k.length===1){e.preventDefault(); answer(A.opt[qi][+k-1]);}
  else if(k==='arrowright'||k==='n'){e.preventDefault(); if(A.cur<A.order.length-1) go(A.cur+1);}
  else if(k==='arrowleft'||k==='p'){e.preventDefault(); if(A.cur>0) go(A.cur-1);}
  else if(k==='f'){e.preventDefault(); $('[data-act="flag"]',host).click();}
});

/* ---------- init ---------- */
home();
})();
