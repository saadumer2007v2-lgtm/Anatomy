/* Musculoskeletal explorer for the upper limb, lower limb and pelvis chapters.
   - [data-msk-explorer="ul|ll|pv"]: bones in several views; tap a landmark to see what attaches there, tap a muscle for its
     nerve, compartment, action and blood supply; "Test me" quizzes; recall mode hides names.
   - [data-msk-oi]: origin vs insertion lesson with an animated muscle and a quick drill.
   - [data-msk-comp]: compartment cards (one nerve, one artery, one job), [data-msk-hot]: landmark hot-spot table,
     [data-msk-rules]: rules that link the region together. Needs msk-data.js and msk-bones.js. */
(function(){
'use strict';
const D=window.MSK, B=window.MSK_BONES; if(!D||!B) return;
const {LM,MUS,COMP,RULES}=D;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
const RC=()=>window.ATLAS_RECALL&&window.ATLAS_RECALL.isOn();

/* short labels for long landmark names */
const SHORT={'hb.glutMid':'Gluteal surface (middle)','hb.glutPost':'Gluteal surface (back)','hb.glutLow':'Gluteal surface (front)','hu.postUpper':'Above radial groove','hu.postLower':'Below radial groove',
 'sc.medBorderLow':'Medial border (lower)','sc.medBorderCostal':'Medial border (costal)','cl.delt':'Anterior border (lateral)','cl.trap':'Posterior border (lateral)','cl.pecmaj':'Anterior surface (medial)',
 'cl.scm':'Superior surface (medial)','cl.shaft':'Shaft (middle third)','ha.extExp':'Extensor expansions','ha.thumbProx':'Thumb proximal phalanx','ha.thumbDistal':'Thumb distal phalanx','ha.littleProx':'Little finger prox. phalanx',
 'fe.aboveMedCond':'Above medial condyle','ti.poplArea':'Popliteus area','ti.latSurface':'Lateral surface','ti.postLat':'Posterior surface (lateral)','ti.postMed':'Posterior surface (medial)',
 'fi.postUpper':'Posterior surface (upper)','fi.postLower':'Posterior surface (lower)','fi.antSurface':'Anterior surface','fi.latSurface':'Lateral surface','ti.pes':'Pes anserinus','hb.pubicBodyPost':'Back of pubic body',
 'hb.tendArch':'Tendinous arch','pe.brim':'Pelvic brim','hb.pecten':'Pecten pubis','ft.toeMid':'Middle phalanges','ft.toeDistal':'Distal phalanges','ft.calcDorsal':'Dorsolateral calcaneus',
 'ul.anconeus':'Lateral olecranon','ra.distAnt':'Distal anterior radius','ul.distAnt':'Distal anterior ulna','ra.antShaft':'Anterior shaft (radius)','ra.postShaft':'Posterior shaft (radius)',
 'ul.antShaft':'Anterior shaft (ulna)','ul.postShaft':'Posterior shaft (ulna)','hu.antDistal':'Anterior shaft (lower)','hu.medShaft':'Medial shaft','ra.midLat':'Lateral surface (middle)','ra.oblique':'Anterior oblique line',
 'fe.antShaft':'Anterior shaft','sa.dorsal':'Dorsal surface','ha.mcShafts':'Metacarpal shafts','hu.itGroove':'Intertubercular groove','hu.ulnarGroove':'Ulnar nerve groove','hb.asis':'ASIS','hb.aiis':'AIIS',
 'hb.psis':'PSIS','hb.piis':'PIIS','fe.pectLine':'Pectineal line','ft.mt5Tub':'5th metatarsal tuberosity','ha.mc1Base':'Base of 1st metacarpal','ha.mc2Base':'Base of 2nd metacarpal','ha.mc3Base':'Base of 3rd metacarpal',
 'ha.mc5Base':'Base of 5th metacarpal','ha.mc1Shaft':'1st metacarpal shaft','ha.mc5Shaft':'5th metacarpal shaft','ti.medCondPost':'Medial condyle (back)','ti.medSurface':'Medial surface','ti.antBorder':'Anterior border (shin)',
 'hb.iliacTub':'Iliac tubercle','fe.poplSurf':'Popliteal surface','ft.halluxProx':'Hallux proximal phalanx','ft.halluxDistal':'Hallux distal phalanx','ft.littleProx':'Little toe prox. phalanx','sa.antForamina':'Anterior sacral foramina',
 'sa.postForamina':'Posterior sacral foramina','hu.anatNeck':'Anatomical neck','sc.supraFossa':'Supraspinous fossa','sc.infraFossa':'Infraspinous fossa','sc.subFossa':'Subscapular fossa','hb.greaterNotch':'Greater sciatic notch',
 'hb.lesserNotch':'Lesser sciatic notch','hb.pubicBody':'Body of pubis','fe.intercond':'Intercondylar fossa','fe.latSupra':'Lateral supracondylar line','fe.medSupra':'Medial supracondylar line','hu.latSupra':'Lateral supracondylar ridge',
 'hu.medSupra':'Medial supracondylar ridge','ti.mallGroove':'Malleolar groove','hb.iliacFossa':'Iliac fossa','hb.obtForamen':'Obturator foramen'};
const sn=id=>SHORT[id]||LM[id].n.replace(/\s*\(.*\)$/,'');
const mctx=document.createElement('canvas').getContext('2d');
const tw=t=>{ mctx.font='700 15px "Atkinson Hyperlegible", system-ui, sans-serif'; return mctx.measureText(t).width; };
const TIER={1:['★','Key','Learn first: palpable, often fractured or close to a nerve or vessel'],2:['●','Core','Know it'],3:['○','Detail','Nice to know']};
const firstClause=t=>t.split(/[.;]/)[0];
const short=(m,role)=>{const ids=m[role]; return ids.length?ids.map(sn).join(' + '):firstClause(role==='o'?m.ot:m.it);};

/* orientation labels for each bone view (after mirroring): [left, right, caption] */
const SIDES={
 humerus:{Anterior:['LATERAL','MEDIAL','Right humerus, from the front'],Posterior:['MEDIAL','LATERAL','Right humerus, from behind']},
 forearm:{Anterior:['LATERAL · RADIUS','MEDIAL · ULNA','Right forearm, from the front (supinated)'],Posterior:['MEDIAL · ULNA','LATERAL · RADIUS','Right forearm, from behind']},
 scapula:{Posterior:['MEDIAL','LATERAL','Right scapula, from behind'],Anterior:['LATERAL','MEDIAL','Right scapula, from the front (rib side)']},
 clavicle:{Superior:['LATERAL','MEDIAL','Right clavicle, from above (front at the bottom)'],Inferior:['MEDIAL','LATERAL','Right clavicle, from below (front at the bottom)']},
 hand:{Palmar:['','','Right hand, palm up']},foot:{Dorsal:['','','Right foot, from above']},
 hipbone:{Lateral:['POSTERIOR','ANTERIOR','Right hip bone, outer (lateral) surface'],Medial:['ANTERIOR','POSTERIOR','Right hip bone, inner (medial) surface']},
 femur:{Anterior:['LATERAL','MEDIAL','Right femur, from the front'],Posterior:['MEDIAL','LATERAL','Right femur, from behind']},
 leg:{Anterior:['LATERAL · FIBULA','MEDIAL · TIBIA','Right tibia and fibula, from the front'],Posterior:['MEDIAL · TIBIA','LATERAL · FIBULA','Right tibia and fibula, from behind']},
 pelvis:{Anterior:["PATIENT'S RIGHT","PATIENT'S LEFT",'Bony pelvis, from the front']},sacrum:{Posterior:["LEFT","RIGHT",'Sacrum and coccyx, from behind']}
};

/* ---------------------------------------------------------------- shared SVG defs */
if(!document.getElementById('msk-defs')){
  const d=document.createElement('div'); d.innerHTML=`<svg id="msk-defs" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
   <linearGradient id="mskBoneG" x1="0" x2="1" y1="0" y2="0.25"><stop offset="0" style="stop-color:color-mix(in srgb,var(--bone) 74%,#000)"/><stop offset=".42" style="stop-color:color-mix(in srgb,var(--bone) 88%,#fff)"/><stop offset=".7" style="stop-color:var(--bone)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--bone) 68%,#000)"/></linearGradient>
   <radialGradient id="mskArtG" cx=".4" cy=".35" r=".8"><stop offset="0" style="stop-color:color-mix(in srgb,var(--bone-art) 70%,#fff)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--bone-art) 82%,var(--vein))"/></radialGradient>
   <pattern id="mskHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" style="fill:color-mix(in srgb,var(--vein) 26%,transparent)"/><line x1="1" y1="0" x2="1" y2="7" style="stroke:var(--vein)" stroke-width="2.4"/></pattern>
   <marker id="mskArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" style="fill:var(--ink)"/></marker>
  </defs></svg>`; document.body.appendChild(d.firstElementChild);
}

/* ---------------------------------------------------------------- explorer */
function explorer(host){
  const reg=host.dataset.mskExplorer, bones=B[reg]; if(!bones) return;
  const bmap=Object.fromEntries(bones);
  const start=bmap[host.dataset.mskStart]?host.dataset.mskStart:bones[0][0];
  const st={bone:start,view:Object.keys(bmap[start].views)[0],sel:null,hist:[],tier:LS.get('atlas-msk-tier',2),att:true,labels:true,cavity:false,quiz:null,score:LS.get('atlas-msk-score-'+reg,{c:0,n:0})};
  const regMus=Object.values(MUS).filter(m=>m.reg===reg||(reg==='pv'&&['ll'].includes(m.reg)&&[...m.o,...m.i].some(id=>id.startsWith('hb.')||id.startsWith('sa.'))));
  const where=id=>{ /* every [bone,view] in this region showing landmark id; current first */
    const out=[]; bones.forEach(([bk,b])=>Object.entries(b.views).forEach(([vk,v])=>{ if(v.lm[id]) out.push([bk,vk]); }));
    out.sort((a,b)=>(b[0]===st.bone&&b[1]===st.view)-(a[0]===st.bone&&a[1]===st.view)||(b[0]===st.bone)-(a[0]===st.bone)); return out; };
  const regionLms=()=>{const s=new Set(); bones.forEach(([,b])=>Object.values(b.views).forEach(v=>Object.keys(v.lm).forEach(k=>s.add(k)))); return [...s];};
  const musHere=id=>({O:(LM[id].O||[]).filter(m=>MUS[m]),I:(LM[id].I||[]).filter(m=>MUS[m])});

  host.classList.add('msk');
  host.innerHTML=`<div class="msk-bar">
     <div class="pill-btns msk-bones" role="group" aria-label="Bone">${bones.map(([k,b])=>`<button class="pbtn" type="button" data-bone="${k}">${esc(b.n)}</button>`).join('')}</div>
     <div class="pill-btns msk-views" role="group" aria-label="View"></div>
   </div>
   <div class="msk-tools">
     <label class="msk-search"><span class="sr">Find a landmark or muscle</span><input type="search" placeholder="Find a landmark or muscle" autocomplete="off"></label>
     <div class="pill-btns msk-tier" role="group" aria-label="Which labels to show">${[1,2,3].map(t=>`<button class="pbtn" type="button" data-tier="${t}" aria-pressed="${st.tier===t}">${t===1?'★ Key':t===2?'★ + core':'All'}</button>`).join('')}</div>
     <button class="pbtn" type="button" data-tog="labels" aria-pressed="true">Labels</button>
     <button class="pbtn" type="button" data-tog="att" aria-pressed="true">Attachments</button>
     ${reg==='pv'?'<button class="pbtn" type="button" data-tog="cavity" aria-pressed="false">True and false pelvis</button>':''}
     <button class="pbtn msk-testbtn" type="button" data-tog="quiz" aria-pressed="false">Test me</button>
   </div>
   <div class="msk-results" hidden></div>
   <div class="msk-main">
     <figure class="msk-fig"><div class="msk-svg"></div>
       <figcaption><span class="msk-cap"></span><span class="msk-key"><span><i class="k-o"></i>Origin</span><span><i class="k-i"></i>Insertion</span><span><i class="k-b"></i>Both</span><span>★ Key landmark</span></span></figcaption></figure>
     <aside class="msk-side">
       <div class="msk-detail" aria-live="polite"></div>
       <div class="msk-list"><h5>Landmarks in this view</h5><ol></ol></div>
     </aside>
   </div>`;
  const svgHost=$('.msk-svg',host), det=$('.msk-detail',host), list=$('.msk-list ol',host), res=$('.msk-results',host), inp=$('.msk-search input',host);

  function view(){return bmap[st.bone].views[st.view];}
  function pt(v,c){const x=v.mirror?v.w-c[0]:c[0]; return {x,y:c[1],rx:c[2],ry:c[3],rot:c[4]?(v.mirror?-c[4]:c[4]):0,area:c.length>2};}

  function drawPlates(v,sides){
    svgHost.innerHTML=`<div class="msk-plate-imgs">${v.plates.map(([f,n,d,side])=>`<figure class="msk-plate">
      <a href="assets/img/gray/${f}" target="_blank" rel="noopener" title="Open full size"><img src="assets/img/gray/${f}" alt="Gray's Anatomy figure ${n}: ${esc(d)}, ${side.toLowerCase()} side, with muscle attachments outlined" loading="lazy" onerror="this.closest('figure').classList.add('img-fail')"></a>
      <span class="msk-plate-fail">This plate has not been downloaded yet.</span>
      <figcaption><b>Fig. ${n}.</b> ${esc(d)}${side==='Left'?' (<b>left</b> bone: the mirror image of the drawing)':side==='Right'?' (right bone, same side as the drawing)':''}</figcaption></figure>`).join('')}</div>
      <p class="msk-plate-note small muted">Henry Vandyke Carter, <i>Gray's Anatomy</i> (20th US edition, 1918), public domain. On the plates that show them, muscle attachment areas are outlined in red and blue lines mark joint capsules. 1918 names: <i>sublimis</i> = superficialis, <i>communis</i> = extensor digitorum, <i>digiti quinti</i> = digiti minimi, <i>peronæus</i> = fibularis. Tap a landmark in the list to jump back to the drawing with it highlighted.</p>`;
    $('.msk-cap',host).textContent=sides[2]+' · textbook plate';
  }
  function drawSVG(){
    const v=view(), W=v.w, H=v.h, sides=(SIDES[st.bone]||{})[st.view]||['','',''];
    if(st.plate&&v.plates&&!st.quiz){ drawPlates(v,sides); return; }
    /* label margins sized to the longest label on each side, so the bone is drawn as large as possible */
    let ML=50, MR=50; Object.keys(v.lm).forEach(id=>{ if(!LM[id]) return; const p=pt(v,v.lm[id]), w=tw((LM[id].t===1?'★ ':'')+sn(id))+30; if(p.x<W/2) ML=Math.max(ML,w); else MR=Math.max(MR,w); });
    const M=Math.max(ML,MR);
    const draw=typeof v.draw==='function'?v.draw():v.draw;
    const selM=st.sel&&st.sel.t==='m'?MUS[st.sel.id]:null, selL=st.sel&&st.sel.t==='l'?st.sel.id:null;
    const q=st.quiz, hideNames=!!q||RC()||!st.labels;
    let att='', marks='', labs='', pull='';
    const ids=Object.keys(v.lm);
    ids.forEach(id=>{
      const p=pt(v,v.lm[id]), L=LM[id], h=musHere(id); if(!L) return;
      const hasO=h.O.length>0, hasI=h.I.length>0;
      let role=null; if(selM){ if(selM.o.includes(id)) role='o'; if(selM.i.includes(id)) role=role?'b':'i'; }
      const dim=(selM&&!role)||(q&&q.target&&q.target!==id&&q.kind!=='find');
      if(st.att&&!q){
        if(p.area){
          const fill=(selM?(role==='o'?'o':role==='i'?'i':role==='b'?'b':null):(hasO&&hasI?'b':hasO?'o':hasI?'i':null));
          if(fill) att+=`<ellipse class="msk-area a-${fill}${dim?' dim':''}" cx="${p.x}" cy="${p.y}" rx="${p.rx}" ry="${p.ry}" transform="rotate(${p.rot} ${p.x} ${p.y})"/>`;
        } else if(!selM||role){
          const o=selM?(role==='o'||role==='b'):hasO, i=selM?(role==='i'||role==='b'):hasI;
          if(o) att+=`<circle class="msk-dot a-o${dim?' dim':''}" cx="${p.x-(i?6:0)}" cy="${p.y}" r="6.5"/>`;
          if(i) att+=`<rect class="msk-dot a-i${dim?' dim':''}" x="${p.x+(o?6:0)-5.5}" y="${p.y-5.5}" width="11" height="11" transform="rotate(45 ${p.x+(o?6:0)} ${p.y})"/>`;
        }
      }
      const on=selL===id||(q&&q.target===id)||(q&&q.kind==='find'&&q.shown&&q.answer.includes(id));
      marks+=`<g class="msk-lm t${L.t}${on?' on':''}${dim?' dim':''}${q&&q.kind==='find'&&q.picked===id?(q.answer.includes(id)?' ok':' no'):''}" data-lm="${id}" tabindex="0" role="button" aria-label="${esc(hideNames?'Landmark':L.n)}">
        ${p.area?`<ellipse class="hit" cx="${p.x}" cy="${p.y}" rx="${Math.max(p.rx,14)}" ry="${Math.max(p.ry,14)}" transform="rotate(${p.rot} ${p.x} ${p.y})"/>`:`<circle class="hit" cx="${p.x}" cy="${p.y}" r="16"/>`}
        <circle class="pin" cx="${p.x}" cy="${p.y}" r="${L.t===1?4.6:3.6}"/>${L.t===1?`<circle class="ring" cx="${p.x}" cy="${p.y}" r="8.5"/>`:''}
        ${on?`<circle class="halo" cx="${p.x}" cy="${p.y}" r="15"/>`:''}</g>`;
    });
    /* pull line when a muscle has both ends in this view */
    if(selM){
      const os=selM.o.filter(id=>v.lm[id]).map(id=>pt(v,v.lm[id])), is=selM.i.filter(id=>v.lm[id]).map(id=>pt(v,v.lm[id]));
      if(os.length&&is.length){const a=is[0], b=os[0], mx=a.x+(b.x-a.x)*.55, my=a.y+(b.y-a.y)*.55;
        pull=`<path class="msk-pull" d="M${a.x},${a.y} L${b.x},${b.y}"/><path class="msk-pull-arrow" d="M${a.x},${a.y} L${mx},${my}" marker-end="url(#mskArrow)"/>`;}
    }
    /* labels with leader lines, stacked so they never overlap */
    if(!hideNames){
      const want=ids.filter(id=>LM[id]&&(LM[id].t<=st.tier||id===selL||(selM&&(selM.o.includes(id)||selM.i.includes(id))))).map(id=>{const p=pt(v,v.lm[id]); return {id,x:p.x,y:p.y,side:p.x<W/2?'l':'r'};});
      ['l','r'].forEach(side=>{
        const g=want.filter(w=>w.side===side).sort((a,b)=>a.y-b.y); let last=-1e9;
        g.forEach(w=>{w.ly=Math.max(w.y,last+19); last=w.ly;});
        const over=g.length?g[g.length-1].ly-(H+14):0; if(over>0){g.forEach(w=>w.ly-=over); for(let i=g.length-2;i>=0;i--) if(g[i].ly>g[i+1].ly-19) g[i].ly=g[i+1].ly-19;}
        g.forEach(w=>{const L=LM[w.id], lx=side==='l'?-12:W+12, hot=w.id===selL||(selM&&(selM.o.includes(w.id)||selM.i.includes(w.id)));
          labs+=`<g class="msk-lab${hot?' hot':''}${L.t===1?' key':''}" data-lm="${w.id}"><path d="M${w.x},${w.y} L${side==='l'?lx+6:lx-6},${w.ly}"/><text x="${lx}" y="${w.ly+4}" text-anchor="${side==='l'?'end':'start'}">${L.t===1?'★ ':''}${esc(sn(w.id))}</text></g>`;});
      });
    }
    const layer=(st.cavity&&bmap[st.bone].layers)?bmap[st.bone].layers.cavity:'';
    svgHost.innerHTML=`<svg class="msk-svgel" viewBox="${-ML} -34 ${W+ML+MR} ${H+60}" role="group" aria-label="${esc(sides[2])}">
      <text class="msk-ori" x="${W/2}" y="-16" text-anchor="middle">SUPERIOR</text>
      ${sides[0]?`<text class="msk-ori" x="${-ML+8}" y="${H+20}">${sides[0]}</text>`:''}${sides[1]?`<text class="msk-ori" x="${W+MR-8}" y="${H+20}" text-anchor="end">${sides[1]}</text>`:''}
      <g class="msk-draw">${v.mirror?`<g transform="translate(${W},0) scale(-1,1)">${draw}</g>`:draw}</g>${layer}
      <g class="msk-atts">${att}</g>${pull}<g class="msk-labs">${labs}</g><g class="msk-marks">${marks}</g></svg>`;
    $('.msk-cap',host).textContent=sides[2]+(st.cavity?' · false pelvis tinted amber, true pelvis blue, brim dashed':'');
  }

  function drawList(){
    const v=view(), ids=Object.keys(v.lm).filter(id=>LM[id]).sort((a,b)=>LM[a].t-LM[b].t||LM[a].n.localeCompare(LM[b].n));
    const hide=!!st.quiz;
    $('.msk-list',host).hidden=hide;
    list.innerHTML=ids.map(id=>{const L=LM[id], h=musHere(id), on=st.sel&&st.sel.t==='l'&&st.sel.id===id;
      return `<li class="msk-li${on?' on':''}${RC()?' rc-item':''}" data-lm="${id}" tabindex="0"><span class="tier t${L.t}" title="${TIER[L.t][1]}">${TIER[L.t][0]}</span><span class="${RC()?'rc-ans':''}">${esc(sn(id))}</span>${h.O.length?`<i class="k-o" title="Origins here"></i>`:''}${h.I.length?`<i class="k-i" title="Insertions here"></i>`:''}</li>`;}).join('');
    if(RC()) window.ATLAS_RECALL.apply(list);
  }

  const chip=(mid,role)=>`<li class="${RC()?'rc-item':''}"><span class="oi ${role}">${role==='o'?'O':'I'}</span> <span class="${RC()?'rc-ans':''}"><button class="msk-chip" type="button" data-m="${mid}">${esc(MUS[mid].n)}</button></span></li>`;
  const lmBtn=id=>`<button class="msk-lmbtn" type="button" data-go="${id}">${esc(sn(id))}${where(id).length?'':' <small>(not drawn)</small>'}</button>`;
  const row=(k,v)=>`<div class="msk-row${RC()?' rc-item':''}"><dt>${k}</dt><dd class="${RC()?'rc-ans':''}">${v}</dd></div>`;

  function drawDetail(){
    if(st.quiz){ drawQuiz(); return; }
    const s=st.sel;
    if(!s){ det.innerHTML=`<div class="msk-card msk-hello"><h4>Tap any landmark</h4><p>Each dot is a bony landmark; ★ marks the key ones. Coloured patches show what attaches: <b class="c-o">red = origin</b>, <b class="c-i">blue = insertion</b>. Tap a muscle name to see its nerve, compartment, action and blood supply, and where its other end attaches.</p><p class="small muted">Use the view buttons to turn the bone over. "Test me" quizzes you on this region.</p></div>`; return; }
    const back=st.hist.length?`<button class="msk-back" type="button">← Back</button>`:'';
    if(s.t==='l'){
      const L=LM[s.id], h=musHere(s.id), T=TIER[L.t];
      det.innerHTML=`<div class="msk-card">${back}<div class="msk-kicker"><span class="tier t${L.t}">${T[0]} ${T[1]}</span> ${esc(boneName(L.bone))}</div>
        <h4>${esc(L.n)}</h4><p class="${RC()?'':''}">${esc(L.d)}</p>
        ${h.O.length?`<h5><span class="oi o">O</span> Muscles that start here (origin)</h5><ul class="msk-chips">${h.O.map(m=>chip(m,'o')).join('')}</ul>`:''}
        ${h.I.length?`<h5><span class="oi i">I</span> Muscles that end here (insertion)</h5><ul class="msk-chips">${h.I.map(m=>chip(m,'i')).join('')}</ul>`:''}
        ${!h.O.length&&!h.I.length?'<p class="small muted">No muscles attach here: it is a joint surface, a passage for a nerve or vessel, or a ligament attachment.</p>':''}</div>`;
    } else {
      const m=MUS[s.id], C=COMP[m.comp], sibs=Object.values(MUS).filter(x=>x.comp===m.comp&&x.id!==m.id);
      det.innerHTML=`<div class="msk-card msk-mcard" style="--c:var(${C.c})">${back}<div class="msk-kicker">${esc(C.n)}</div><h4>${esc(m.n)}</h4>
        <div class="msk-ends">
          <div class="msk-end o${RC()?' rc-item':''}"><span class="oi o">O</span><div><b>Origin</b> <span class="${RC()?'rc-ans':''}">${esc(m.ot)}</span><div>${m.o.map(lmBtn).join('')}</div></div></div>
          <div class="msk-end i${RC()?' rc-item':''}"><span class="oi i">I</span><div><b>Insertion</b> <span class="${RC()?'rc-ans':''}">${esc(m.it)}</span><div>${m.i.map(lmBtn).join('')}</div></div></div>
        </div>
        <dl class="msk-dl">${row('Nerve',`${esc(m.nv)} <span class="rt">${esc(m.rt)}</span>`)}${row('Action',esc(m.act))}${row('Blood supply',esc(m.bs))}${row('Compartment',`${esc(C.n)}: ${esc(C.nv)}; ${esc(C.art)}`)}</dl>
        ${m.tip?`<p class="msk-tip"><b>Link it:</b> ${esc(m.tip)}</p>`:''}
        ${sibs.length?`<h5>Same compartment</h5><div class="msk-sibs">${sibs.map(x=>`<button class="msk-chip" type="button" data-m="${x.id}">${esc(x.n)}</button>`).join('')}</div>`:''}</div>`;
    }
    if(RC()) window.ATLAS_RECALL.apply(det);
  }
  const boneName=b=>({cl:'Clavicle',sc:'Scapula',hu:'Humerus',ra:'Radius',ul:'Ulna',ha:'Hand',hb:'Hip bone',pe:'Pelvis',sa:'Sacrum',fe:'Femur',ti:'Tibia',fi:'Fibula',ft:'Foot'})[b]||b;

  function drawBar(){
    $$('.msk-bones .pbtn',host).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.bone===st.bone)));
    const vs=Object.keys(bmap[st.bone].views);
    const hasPlate=!!view().plates;
    $('.msk-views',host).innerHTML=vs.map(v=>`<button class="pbtn" type="button" data-view="${v}" aria-pressed="${v===st.view}">${v}</button>`).join('')+(vs.length>1?`<button class="pbtn msk-turn" type="button" data-turn="1" title="Turn the bone over">↻ Turn over</button>`:'')+
      (hasPlate?`<span class="msk-mode" role="group" aria-label="Picture"><button class="pbtn" type="button" data-plate="0" aria-pressed="${!st.plate}">Drawing</button><button class="pbtn" type="button" data-plate="1" aria-pressed="${!!st.plate}">Gray's plate</button></span>`:'');
    $$('.msk-tools [data-tog]',host).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tog==='quiz'?!!st.quiz:!!st[b.dataset.tog])));
    $$('.msk-tier .pbtn',host).forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.tier===st.tier)));
  }
  function render(){ drawBar(); drawSVG(); drawList(); drawDetail(); }

  function goTo(id,keepSel){ const w=where(id); if(w.length){ st.bone=w[0][0]; st.view=w[0][1]; } if(!keepSel) select({t:'l',id}); else render(); }
  function select(s,push=true){ if(push&&st.sel&&!(st.sel.t===s.t&&st.sel.id===s.id)) st.hist.push(st.sel); if(st.hist.length>20) st.hist.shift(); st.sel=s;
    if(s.t==='m'){ /* make sure at least one end is visible */ const m=MUS[s.id], v=view(); if(![...m.o,...m.i].some(id=>v.lm[id])){ const end=[...m.o,...m.i].find(id=>where(id).length); if(end){const w=where(end)[0]; st.bone=w[0]; st.view=w[1];} } }
    render(); }

  /* ---------- quiz ---------- */
  const KINDS=[['name','Name the landmark'],['attach','What attaches here?'],['find','Find the attachment'],['oi','Origin or insertion?']];
  function newQ(kind){
    kind=kind||(st.quiz&&st.quiz.kind)||'name';
    const lms=regionLms().filter(id=>LM[id]&&LM[id].t<=Math.max(2,st.tier));
    let q={kind};
    if(kind==='name'){ q.target=rnd(lms); }
    else if(kind==='attach'){ const c=regionLms().filter(id=>LM[id]&&(musHere(id).O.length+musHere(id).I.length)>0); q.target=rnd(c); }
    else if(kind==='find'){ const ms=regMus.filter(m=>[...m.o,...m.i].some(id=>where(id).length)); const m=rnd(ms);
      const roles=['o','i'].filter(r=>m[r].some(id=>where(id).length)); q.role=rnd(roles); q.m=m.id; q.answer=m[q.role].filter(id=>where(id).length); }
    else { const pairs=[]; regMus.forEach(m=>{m.o.forEach(id=>where(id).length&&pairs.push([m.id,id,'o'])); m.i.forEach(id=>where(id).length&&pairs.push([m.id,id,'i']));}); const p=rnd(pairs); q.m=p[0]; q.target=p[1]; q.role=p[2]; }
    const focus=q.target||(q.answer&&q.answer[0]); if(focus){ const w=where(focus); if(w.length){st.bone=w[0][0]; st.view=w[0][1];} }
    st.quiz=q; st.sel=null; render();
  }
  function grade(ok){ const q=st.quiz; if(q.graded) return; q.graded=true; q.ok=ok; st.score.n++; if(ok) st.score.c++; LS.set('atlas-msk-score-'+reg,st.score); }
  function drawQuiz(){
    const q=st.quiz, L=q.target&&LM[q.target], m=q.m&&MUS[q.m];
    let body='';
    if(q.kind==='name'){ body=`<p class="msk-q">Name the highlighted landmark on the ${esc(boneName(L.bone).toLowerCase())}.</p>`+
      (q.shown?`<div class="msk-ans"><b>${esc(L.n)}</b> <span class="tier t${L.t}">${TIER[L.t][0]} ${TIER[L.t][1]}</span><p>${esc(L.d)}</p></div>`+gradeBtns():`<button class="btn" type="button" data-q="show">Show answer</button>`); }
    if(q.kind==='attach'){ const h=musHere(q.target); body=`<p class="msk-q">Which muscles start or end at the <b>${esc(L.n)}</b>? Say them, then check.</p>`+
      (q.shown?`<div class="msk-ans"><ul class="msk-chips">${h.O.map(x=>chip(x,'o')).join('')}${h.I.map(x=>chip(x,'i')).join('')}</ul></div>`+gradeBtns():`<button class="btn" type="button" data-q="show">Show answer</button>`); }
    if(q.kind==='find'){ body=`<p class="msk-q">Tap where <b>${esc(m.n)}</b> has its <b class="c-${q.role}">${q.role==='o'?'origin':'insertion'}</b>.</p>`+
      (q.graded?`<div class="msk-ans ${q.ok?'ok':'no'}"><b>${q.ok?'Correct.':'Not quite.'}</b> ${q.role==='o'?'Origin':'Insertion'}: ${esc(q.role==='o'?m.ot:m.it)}</div><button class="btn" type="button" data-q="next">Next question</button>`:`<p class="small muted">Use the view buttons if you need to turn the bone over.</p><button class="btn ghost" type="button" data-q="giveup">Show me</button>`); }
    if(q.kind==='oi'){ body=`<p class="msk-q">Is the <b>${esc(LM[q.target].n)}</b> the origin or the insertion of <b>${esc(m.n)}</b>?</p>`+
      (q.graded?`<div class="msk-ans ${q.ok?'ok':'no'}"><b>${q.ok?'Correct':'Not quite'}: it is the ${q.role==='o'?'origin':'insertion'}.</b> ${esc(oiWhy(m,q.role))}</div><button class="btn" type="button" data-q="next">Next question</button>`
       :`<div class="msk-oibtns"><button class="btn oi-b o" type="button" data-q="o"><span class="oi o">O</span> Origin</button><button class="btn oi-b i" type="button" data-q="i"><span class="oi i">I</span> Insertion</button></div>`); }
    det.innerHTML=`<div class="msk-card msk-quiz"><div class="pill-btns" role="group" aria-label="Question type">${KINDS.map(([k,t])=>`<button class="pbtn" type="button" data-qk="${k}" aria-pressed="${q.kind===k}">${t}</button>`).join('')}</div>
      ${body}<div class="msk-score small muted">Score: ${st.score.c} of ${st.score.n}${st.score.n?` (${Math.round(st.score.c/st.score.n*100)}%)`:''} · <button class="msk-link" type="button" data-q="reset">reset</button> · <button class="msk-link" type="button" data-q="stop">stop testing</button></div></div>`;
  }
  const gradeBtns=()=>`<div class="msk-oibtns"><button class="btn" type="button" data-q="got">Got it</button><button class="btn ghost" type="button" data-q="miss">Missed it</button></div>`;

  /* ---------- events ---------- */
  host.addEventListener('click',e=>{
    const t=e.target;
    const bb=t.closest('[data-bone]'); if(bb&&bb.closest('.msk-bones')){ st.bone=bb.dataset.bone; st.view=Object.keys(bmap[st.bone].views)[0]; if(st.quiz) st.quiz=null; render(); return; }
    const vb=t.closest('[data-view]'); if(vb){ st.view=vb.dataset.view; render(); return; }
    const pb=t.closest('[data-plate]'); if(pb){ st.plate=pb.dataset.plate==='1'; render(); return; }
    if(t.closest('[data-turn]')){ const vs=Object.keys(bmap[st.bone].views); st.view=vs[(vs.indexOf(st.view)+1)%vs.length]; render(); return; }
    const tb=t.closest('[data-tier]'); if(tb){ st.tier=+tb.dataset.tier; LS.set('atlas-msk-tier',st.tier); render(); return; }
    const tg=t.closest('[data-tog]'); if(tg){ const k=tg.dataset.tog; if(k==='quiz'){ if(st.quiz){st.quiz=null; render();} else newQ('name'); } else { st[k]=!st[k]; render(); } return; }
    const qk=t.closest('[data-qk]'); if(qk){ newQ(qk.dataset.qk); return; }
    const qb=t.closest('[data-q]'); if(qb){ const a=qb.dataset.q, q=st.quiz;
      if(a==='show'){ q.shown=true; render(); }
      else if(a==='got'||a==='miss'){ grade(a==='got'); newQ(); }
      else if(a==='next') newQ();
      else if(a==='giveup'){ q.shown=true; grade(false); render(); }
      else if(a==='o'||a==='i'){ grade(a===q.role); render(); }
      else if(a==='reset'){ st.score={c:0,n:0}; LS.set('atlas-msk-score-'+reg,st.score); render(); }
      else if(a==='stop'){ st.quiz=null; render(); }
      return; }
    if(t.closest('.msk-back')){ st.sel=st.hist.pop()||null; if(st.sel&&st.sel.t==='l') goTo(st.sel.id,true); else render(); return; }
    const go=t.closest('[data-go]'); if(go){ goTo(go.dataset.go,true); return; }
    const ch=t.closest('[data-m]'); if(ch){ const it=ch.closest('.rc-item'); if(RC()&&it&&!it.classList.contains('rc-open')) return; if(st.quiz) st.quiz=null; select({t:'m',id:ch.dataset.m}); return; }
    const lmEl=t.closest('[data-lm]'); if(lmEl){ const id=lmEl.dataset.lm;
      if(st.plate&&lmEl.classList.contains('msk-li')) st.plate=false; /* show the highlighted landmark on the drawing */
      if(st.quiz){ const q=st.quiz; if(q.kind==='find'&&!q.graded){ q.picked=id; q.shown=true; grade(q.answer.includes(id)); render(); } return; }
      if(lmEl.classList.contains('msk-li')&&RC()&&!lmEl.classList.contains('rc-open')) { /* let recall reveal first */ setTimeout(()=>{select({t:'l',id});},0); return; }
      select({t:'l',id}); return; }
    const r=t.closest('[data-res]'); if(r){ res.hidden=true; inp.value=''; const [k,id]=r.dataset.res.split(':'); if(k==='l') goTo(id); else select({t:'m',id}); return; }
  });
  host.addEventListener('keydown',e=>{ if((e.key==='Enter'||e.key===' ')&&e.target.matches('g[data-lm], li[data-lm]')){ e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click',{bubbles:true})); } });
  inp.addEventListener('input',()=>{ const v=inp.value.trim().toLowerCase(); if(v.length<2){res.hidden=true; return;}
    const ls=regionLms().filter(id=>LM[id]&&(LM[id].n.toLowerCase().includes(v)||sn(id).toLowerCase().includes(v))).slice(0,8);
    const ms=regMus.filter(m=>m.n.toLowerCase().includes(v)||m.nv.toLowerCase().includes(v)).slice(0,10);
    res.innerHTML=(ls.length||ms.length)?ls.map(id=>`<button class="msk-chip" type="button" data-res="l:${id}">◎ ${esc(LM[id].n)}</button>`).join('')+ms.map(m=>`<button class="msk-chip" type="button" data-res="m:${m.id}">${esc(m.n)}</button>`).join(''):'<span class="small muted">No match in this region.</span>';
    res.hidden=false; });
  document.addEventListener('atlas-recall',()=>render());
  host._msk={select,goTo,st,render};
  render();
}

/* why a landmark is the origin or insertion */
function oiWhy(m,role){
  return role==='o'?`The origin is the fixed anchor, usually the end nearer the trunk. ${m.n} pulls its insertion (${firstClause(m.it).toLowerCase()}) towards this point.`
                  :`The insertion is the end on the bone that moves, usually further from the trunk. ${m.n} pulls it towards its origin (${firstClause(m.ot).toLowerCase()}).`;
}

/* ---------------------------------------------------------------- origin vs insertion lesson */
function oiLesson(host){
  const reg=host.dataset.mskOi;
  const pairs=[]; Object.values(MUS).filter(m=>m.reg===reg).forEach(m=>{m.o.forEach(id=>pairs.push([m.id,id,'o'])); m.i.forEach(id=>pairs.push([m.id,id,'i']));});
  host.classList.add('msk-oi');
  host.innerHTML=`<div class="msk-oi-grid">
   <figure class="msk-oi-fig"><svg viewBox="0 0 360 300" role="img" aria-label="Biceps contracting: its origin on the scapula stays still while its insertion on the radius moves up towards it">
     <g class="oi-arm"><path class="mb" d="M60,40 C90,30 130,30 150,44 L160,60 L128,66 L110,60 C90,64 70,60 60,40 Z"/>
      <path class="mb" d="M128,56 C138,54 150,58 154,66 L168,200 C170,212 164,220 154,220 C144,220 138,212 138,204 Z"/>
      <circle class="mb-art" cx="156" cy="214" r="12"/></g>
     <g class="oi-fore"><path class="mb" d="M150,214 C160,210 168,214 170,222 L300,236 C312,238 314,252 302,254 L168,238 C156,236 148,226 150,214 Z"/></g>
     <path class="oi-muscle" d="M140,60 C176,96 196,170 206,226"/>
     <g class="oi-pin"><circle cx="140" cy="60" r="9"/><text x="140" y="64" text-anchor="middle">O</text></g>
     <g class="oi-ins"><rect x="198" y="218" width="16" height="16" transform="rotate(45 206 226)"/><text x="206" y="230" text-anchor="middle">I</text></g>
     <text class="oi-t" x="20" y="24">Scapula: origin stays still</text><text class="oi-t oi-t2" x="190" y="282">Radius: insertion moves</text>
   </svg><figcaption><button class="btn" type="button" data-oi="flex">Contract biceps</button> <span class="small muted">Watch which end moves.</span></figcaption></figure>
   <div class="msk-oi-text">
    <h4>Origin = anchor. Insertion = the end that moves.</h4>
    <ol class="msk-oi-rules">
     <li><b>O is the "Original home".</b> It is usually the end nearer the trunk (proximal) and stays still. The <b>insertion</b> is further out, on the bone that moves.</li>
     <li><b>Contraction pulls the insertion towards the origin.</b> Ask: "Which bone moves when this muscle works?" That end is the insertion.</li>
     <li><b>Read the bone.</b> Broad, flat areas (fossae, surfaces, borders, epicondyles, crests) are usually origins: fleshy muscle grips them. Small bumps that a tendon grabs (tubercles, tuberosities, trochanters, bases of metacarpals and phalanges) are usually insertions. Exceptions: the ischial tuberosity and the glenoid tubercles are origins.</li>
     <li><b>Same colours everywhere on this site:</b> <span class="c-o">red ● = origin</span>, <span class="c-i">blue ◆ = insertion</span>. "Red roots, blue moves."</li>
     <li><b>Watch out:</b> if the far end is fixed (standing on your feet, doing a pull-up), the muscle moves the "origin" bone instead. The names stay the same.</li>
    </ol>
   </div></div>
   <div class="msk-drill"><div class="msk-drill-q"></div><div class="small muted msk-drill-s"></div></div>`;
  let sc={c:0,n:0}, cur=null;
  const fig=$('.msk-oi-fig',host);
  $('[data-oi]',host).addEventListener('click',e=>{ fig.classList.toggle('flexed'); e.currentTarget.textContent=fig.classList.contains('flexed')?'Relax biceps':'Contract biceps'; });
  const q=$('.msk-drill-q',host), s=$('.msk-drill-s',host);
  function next(){ cur=rnd(pairs); const m=MUS[cur[0]];
    q.innerHTML=`<p><b>Quick drill:</b> is the <b>${esc(LM[cur[1]].n)}</b> the origin or the insertion of <b>${esc(m.n)}</b>?</p><div class="msk-oibtns"><button class="btn oi-b o" type="button" data-a="o"><span class="oi o">O</span> Origin</button><button class="btn oi-b i" type="button" data-a="i"><span class="oi i">I</span> Insertion</button></div>`;
    s.textContent=sc.n?`Score: ${sc.c} of ${sc.n}`:''; }
  q.addEventListener('click',e=>{ const b=e.target.closest('[data-a]'), n=e.target.closest('[data-next]');
    if(n){ next(); return; } if(!b) return;
    const ok=b.dataset.a===cur[2]; sc.n++; if(ok) sc.c++; const m=MUS[cur[0]];
    q.innerHTML=`<p><b>${esc(LM[cur[1]].n)}</b> → <b>${esc(m.n)}</b></p><div class="msk-ans ${ok?'ok':'no'}"><b>${ok?'Correct':'Not quite'}: ${cur[2]==='o'?'origin':'insertion'}.</b> ${esc(oiWhy(m,cur[2]))}</div><button class="btn" type="button" data-next="1">Next</button>`;
    s.textContent=`Score: ${sc.c} of ${sc.n}`; });
  next();
}

/* ---------------------------------------------------------------- compartment cards, hot spots, rules */
function scrollToExplorer(reg,fn){ const h=document.querySelector(`[data-msk-explorer="${reg}"]`); if(!h||!h._msk) return; fn(h._msk); h.scrollIntoView({behavior:'smooth',block:'start'}); }
function compCards(host){
  const reg=host.dataset.mskComp;
  host.classList.add('msk-comps');
  host.innerHTML=Object.entries(COMP).filter(([,c])=>c.reg===reg).map(([k,c])=>{
    const ms=Object.values(MUS).filter(m=>m.comp===k);
    return `<div class="card msk-comp" style="--c:var(${c.c})"><h4>${esc(c.n)}</h4>
      <div class="msk-comp-meta"><span><b>Nerve</b>${esc(c.nv)}</span><span><b>Artery</b>${esc(c.art)}</span><span><b>Job</b>${esc(c.job)}</span></div>
      <ul>${ms.map(m=>`<li><b><button class="msk-mlink" type="button" data-reg="${reg}" data-m="${m.id}">${esc(m.n)}</button></b> <span class="msk-ft"><span class="oi o">O</span> ${esc(short(m,'o'))} <span class="arr">→</span> <span class="oi i">I</span> ${esc(short(m,'i'))}</span></li>`).join('')}</ul></div>`;
  }).join('');
}
function hotTable(host){
  const reg=host.dataset.mskHot, ids=[];
  B[reg].forEach(([,b])=>Object.values(b.views).forEach(v=>Object.keys(v.lm).forEach(id=>{ if(LM[id]&&!ids.includes(id)) ids.push(id); })));
  const rows=ids.filter(id=>{const L=LM[id]; const n=(L.O||[]).length+(L.I||[]).length; return n>=2||(L.t===1&&n>0);});
  const mlist=a=>(a||[]).filter(x=>MUS[x]).map(x=>esc(MUS[x].n)).join(', ')||'—';
  host.innerHTML=`<div class="tbl-wrap"><table class="msk-hot"><thead><tr><th>Landmark</th><th><span class="oi o">O</span> Muscles starting here</th><th><span class="oi i">I</span> Muscles ending here</th></tr></thead><tbody>
    ${rows.map(id=>{const L=LM[id]; return `<tr><th><button class="msk-mlink" type="button" data-reg="${reg}" data-l="${id}">${L.t===1?'★ ':''}${esc(L.n)}</button></th><td>${mlist(L.O)}</td><td>${mlist(L.I)}</td></tr>`;}).join('')}</tbody></table></div>`;
}
function rules(host){
  const reg=host.dataset.mskRules;
  host.classList.add('msk-rules');
  host.innerHTML=(RULES[reg]||[]).map(([t,d],i)=>`<div class="msk-rule"><span class="n">${i+1}</span><div><b>${esc(t)}</b><p>${esc(d)}</p></div></div>`).join('');
}
document.addEventListener('click',e=>{ const a=e.target.closest('.msk-mlink'); if(!a) return;
  const reg=a.dataset.reg; scrollToExplorer(reg,x=>{ if(a.dataset.m) x.select({t:'m',id:a.dataset.m}); else x.goTo(a.dataset.l); }); });

/* ---------------------------------------------------------------- mount */
$$('[data-msk-explorer]').forEach(explorer);
$$('[data-msk-oi]').forEach(oiLesson);
$$('[data-msk-comp]').forEach(compCards);
$$('[data-msk-hot]').forEach(hotTable);
$$('[data-msk-rules]').forEach(rules);
})();
