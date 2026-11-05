/* Nervous system chapter: inline SVG figures, their data and interactivity.
   Every figure is drawn here (no external images) and themed with the page's CSS variables.
   Also exports flowchart data (window.NEURO_TREES) and quiz items (window.NEURO_QUIZ / NEURO_MODEL),
   which the main script merges into TREES, QUIZ and MODEL. */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const svg=(vb,label,body,cls)=>`<svg class="nx ${cls||''}" viewBox="${vb}" role="group" aria-label="${esc(label)}">${body}</svg>`;
/* multi-line text: lines is an array */
const tl=(x,y,lines,cls,anchor,lh)=>`<text class="${cls||''}" x="${x}" y="${y}"${anchor?` text-anchor="${anchor}"`:''}>${[].concat(lines).map((l,i)=>`<tspan x="${x}" dy="${i?(lh||13):0}">${esc(l)}</tspan>`).join('')}</text>`;
const dl=rows=>`<dl>${rows.filter(r=>r[1]).map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
/* make SVG groups behave like buttons: focusable, Enter/Space, click */
function bind(root,sel,fn){
  $$(sel,root).forEach(el=>{
    if(!el.hasAttribute('tabindex')) el.setAttribute('tabindex','0');
    el.setAttribute('role','button');
    el.addEventListener('click',()=>fn(el));
    el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); fn(el);}});
  });
}
/* a group of .pbtn toggles: returns setter that updates aria-pressed */
function pillGroup(container,attr,fn){
  const btns=$$('.pbtn',container);
  const set=v=>btns.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[attr]===v&&v!=='')));
  btns.forEach(b=>b.addEventListener('click',()=>{fn(b.dataset[attr]); set(b.dataset[attr]);}));
  return set;
}

/* =====================================================================
   2. SKULL BASE
   ===================================================================== */
const FOSSAE={
  ant:{name:'Anterior cranial fossa',level:'Highest and shallowest of the three',
    bones:'Orbital plates of the frontal bone; cribriform plate and crista galli of the ethmoid; lesser wings and front of the body of the sphenoid',
    holds:'Frontal lobes, with the olfactory bulbs lying on the cribriform plate',
    open:[['Cribriform plate','Olfactory nerve fibres (I)']],
    clin:'A fracture through the cribriform plate tears the dura: clear CSF runs from the nose (rhinorrhoea, positive for beta-2 transferrin) and smell is lost. Bruising around both eyes ("raccoon eyes").'},
  mid:{name:'Middle cranial fossa',level:'Butterfly-shaped: a central body with two deep lateral bowls',
    bones:'Body and greater wings of the sphenoid; squamous and petrous parts of the temporal bone',
    holds:'Temporal lobes laterally; the pituitary in the sella turcica centrally, with the optic chiasm above it and a cavernous sinus on each side',
    open:[['Optic canal','Optic nerve (II), ophthalmic artery'],['Superior orbital fissure','III, IV, V1, VI, superior ophthalmic vein'],['Foramen rotundum','Maxillary nerve (V2)'],['Foramen ovale','Mandibular nerve (V3)'],['Foramen spinosum','Middle meningeal artery'],['Carotid canal','Internal carotid artery']],
    clin:'The pterion lies over the lateral part of this fossa, with the anterior branch of the middle meningeal artery just inside: fracture here causes an extradural haematoma. A pituitary tumour growing upwards presses on the optic chiasm (bitemporal hemianopia). Petrous temporal fracture: CSF otorrhoea, Battle\'s sign, facial nerve palsy.'},
  post:{name:'Posterior cranial fossa',level:'Deepest; roofed over by the tentorium cerebelli',
    bones:'Mainly the occipital bone; petrous and mastoid parts of the temporal bone; the clivus (sphenoid and occipital)',
    holds:'Cerebellum, pons and medulla',
    open:[['Internal acoustic meatus','Facial (VII) and vestibulocochlear (VIII) nerves'],['Jugular foramen','IX, X, XI, internal jugular vein'],['Hypoglossal canal','Hypoglossal nerve (XII)'],['Foramen magnum','Medulla, vertebral arteries, spinal roots of XI']],
    clin:'Raised pressure can push the cerebellar tonsils down through the foramen magnum (coning), squeezing the medulla\'s cardiorespiratory centres. An acoustic neuroma grows on VIII in the internal acoustic meatus and can involve V and VII at the cerebellopontine angle.'}
};
function skullSVG(){
  const P={ant:'M58,178 C52,90 120,22 200,22 C280,22 348,90 342,178 C310,170 280,160 252,152 L228,158 L200,152 L172,158 L148,152 C120,160 90,170 58,178 Z',
    mid:'M58,178 C90,170 120,160 148,152 L172,158 L200,152 L228,158 L252,152 C280,160 310,170 342,178 C360,215 365,262 360,300 L232,248 L200,252 L168,248 L40,300 C35,262 40,215 58,178 Z',
    post:'M40,300 L168,248 L200,252 L232,248 L360,300 C350,372 290,440 200,442 C110,440 50,372 40,300 Z'};
  const fos=Object.keys(P).map(k=>`<g class="nx-t fossa" data-f="${k}" aria-label="${FOSSAE[k].name}"><path class="nx-s" d="${P[k]}"/></g>`).join('');
  const m=x=>400-x; /* mirror about the midline */
  const pair=(f,fn)=>fn(false)+fn(true);
  const hole=(f,shape)=>`<g class="sk-hole" data-f="${f}">${shape}</g>`;
  const holes=[
    hole('ant',`<ellipse cx="189" cy="78" rx="7" ry="20"/><ellipse cx="211" cy="78" rx="7" ry="20"/>`),
    hole('mid',pair('mid',r=>`<circle cx="${r?m(176):176}" cy="165" r="6"/><path d="M${r?m(160):160},171 L${r?m(140):140},186" stroke-width="6" stroke-linecap="round" fill="none"/><circle cx="${r?m(148):148}" cy="199" r="5"/><ellipse cx="${r?m(137):137}" cy="222" rx="6" ry="9"/><circle cx="${r?m(122):122}" cy="238" r="4"/><circle cx="${r?m(172):172}" cy="240" r="6"/>`)),
    hole('mid',`<ellipse cx="200" cy="206" rx="22" ry="16"/>`),
    hole('post',pair('post',r=>`<ellipse cx="${r?m(118):118}" cy="285" rx="6" ry="5"/><ellipse cx="${r?m(140):140}" cy="318" rx="10" ry="6"/><circle cx="${r?m(167):167}" cy="352" r="4"/>`)),
    hole('post',`<ellipse cx="200" cy="370" rx="30" ry="36"/>`)
  ].join('');
  const ld=(x1,y1,x2,y2)=>`<path class="ldr" d="M${x1},${y1} L${x2},${y2}"/>`;
  const L=(f,body)=>`<g class="sk-lbl" data-f="${f}">${body}</g>`;
  const labels=
    L('ant',ld(201,54,232,48)+tl(234,51,'Crista galli','xs')+ld(214,84,236,80)+tl(238,83,['Cribriform plate','(olfactory, I)'],'xs')+tl(112,126,['Orbital plate','(frontal bone)'],'xs','middle')+tl(292,128,['Lesser wing','(sphenoid)'],'xs','middle'))+
    L('mid',ld(146,180,136,174)+tl(134,171,['Superior','orbital fissure'],'xs','end')+ld(143,199,136,198)+tl(134,201,'F. rotundum (V2)','xs','end')+ld(131,222,126,222)+tl(124,225,'F. ovale (V3)','xs','end')+ld(118,238,112,244)+tl(110,248,'F. spinosum (MMA)','xs','end')+
      ld(230,163,246,150)+tl(248,150,'Optic canal (II)','xs')+tl(226,209,'Sella turcica','xs')+ld(234,241,246,245)+tl(248,248,'Carotid canal (ICA)','xs')+tl(312,214,'Greater wing','xs','middle'))+
    L('post',ld(115,280,86,250)+tl(70,232,['Internal acoustic','meatus (VII, VIII)'],'xs','middle')+ld(270,318,276,322)+tl(278,320,['Jugular foramen','(IX, X, XI, IJV)'],'xs')+ld(164,355,150,368)+tl(150,378,['Hypoglossal','canal (XII)'],'xs','end')+ld(226,392,250,404)+tl(252,408,['Foramen magnum','(medulla, vertebral aa.)'],'xs')+tl(200,300,'Clivus','xs','middle')+tl(200,428,'Occipital bone','xs','middle'));
  const names=tl(200,140,'ANTERIOR','hd','middle')+tl(200,184,'MIDDLE','hd','middle')+tl(200,414,'POSTERIOR','hd','middle');
  const relief=`<path d="M200,46 L200,94" stroke="var(--bone-line)" stroke-width="3" stroke-linecap="round"/>
    <path d="M188,236 L212,236 L218,330 L182,330 Z" fill="var(--bone-detail)" opacity=".25"/>
    <path d="M40,300 L168,248 M360,300 L232,248" stroke="var(--bone-line)" stroke-width="3"/>
    <path d="M58,178 C90,170 120,160 148,152 M342,178 C310,170 280,160 252,152" stroke="var(--bone-line)" stroke-width="2.4" fill="none"/>`;
  return svg('0 0 400 460','Internal skull base with anterior, middle and posterior cranial fossae',
    `<ellipse cx="200" cy="232" rx="178" ry="226" fill="var(--bone)" stroke="var(--bone-line)" stroke-width="2"/>${fos}<g class="sk-deco" pointer-events="none">${relief}${holes}${names}${labels}</g>`);
}
function initSkull(){
  const host=$('#nx-skull'); if(!host) return;
  host.innerHTML=skullSVG();
  const s=$('svg',host), det=$('#nx-skull-detail');
  let setBtn=()=>{};
  const pick=k=>{
    s.dataset.sel=k; $$('.fossa',s).forEach(g=>g.classList.toggle('on',g.dataset.f===k));
    const F=FOSSAE[k];
    det.innerHTML=`<b>${F.name}</b><span class="small muted">${F.level}</span>${dl([['Bones',F.bones],['Holds',F.holds],['Openings',`<ul>${F.open.map(([a,b])=>`<li><b>${a}:</b> ${b}</li>`).join('')}</ul>`],['Clinical',F.clin]])}`;
    setBtn(k);
  };
  bind(s,'.fossa',g=>pick(g.dataset.f));
  const grp=$('[data-fossa]',$('#neuro-skull'))?.parentElement;
  if(grp) setBtn=pillGroup(grp,'fossa',pick);
}

/* =====================================================================
   3. MENINGES
   ===================================================================== */
function meningesSVG(){
  const dura='color-mix(in srgb,var(--ink-2) 30%,var(--paper))';
  const brain='color-mix(in srgb,var(--sys-nerv) 16%,var(--paper))';
  const half=`<path d="M44,98 L130,98 L164,144 L164,330 L44,330 Z" fill="var(--accent-tint)"/>
    <path d="M60,100 V140 M88,100 V142 M116,100 V142 M140,112 V146" stroke="var(--accent)" stroke-width="1" opacity=".5"/>
    <path d="M44,96 H131 L167,143 V330" fill="none" stroke="var(--ink-2)" stroke-width="3"/>
    <circle cx="74" cy="124" r="7" fill="var(--artery)"/>
    <path d="M44,150 C56,140 70,140 80,150 L86,190 L92,150 C104,140 118,140 128,150 L134,186 L140,152 C148,146 156,148 160,158 L160,330 L44,330 Z" fill="${brain}" stroke="var(--sys-nerv)" stroke-width="2"/>`;
  const pills=[['EDH',68,'var(--artery)'],['SDH',92,'var(--vein)'],['SAH',122,'var(--clin)']].map(([t,y,c])=>`<rect x="2" y="${y-9}" width="38" height="18" rx="9" fill="${c}"/><text x="21" y="${y+4}" text-anchor="middle" style="fill:var(--paper);font-size:10.5px;font-weight:700">${t}</text>`).join('');
  const labels=[['Skull (bone)',null,296,40],['Dura: periosteal layer',null,296,72],['Dura: meningeal layer',null,296,84],['Superior sagittal sinus','(between the dural layers)',196,92],['Subdural space','(potential)',296,93],['Arachnoid granulation','(CSF back into blood)',200,98],['Arachnoid mater',null,296,97],['Bridging vein','(torn in subdural bleeds)',236,118],['Subarachnoid space','(CSF and arteries)',282,124],['Pia mater',null,300,146],['Cerebral cortex',null,280,220],['Falx cerebri',null,178,250]];
  let lab='', y=24;
  labels.forEach(([a,b,px,py])=>{lab+=`<path class="ldr" d="M${px},${py} L314,${y-4}"/>`+tl(318,y,b?[a,b]:[a],'xs','start',12); y+=b?27:21;});
  return svg('0 0 480 340','Meninges in coronal section: bone, dura with superior sagittal sinus, arachnoid, subarachnoid space, pia and cortex',
    `<rect x="44" y="18" width="266" height="48" rx="4" fill="var(--bone)" stroke="var(--bone-line)" stroke-width="1.6"/>
    <path d="M50,30 H304 M50,54 H304" stroke="var(--bone-line)" stroke-width="1" opacity=".5"/>
    <rect x="44" y="66" width="266" height="12" fill="${dura}"/>
    ${half}<g transform="translate(356,0) scale(-1,1)">${half}</g>
    <path d="M44,78 L142,78 L178,128 L214,78 L310,78 L310,90 L220,90 L184,138 L184,330 L172,330 L172,138 L136,90 L44,90 Z" fill="${dura}" stroke="var(--ink-2)" stroke-width=".8"/>
    <path d="M142,78 L214,78 L178,128 Z" fill="var(--vein-tint)" stroke="var(--vein)" stroke-width="2"/>
    <path d="M210,104 C210,96 206,90 199,90 C192,90 189,96 194,102 Z" fill="var(--accent-tint)" stroke="var(--accent)" stroke-width="1.5"/>
    <path d="M246,146 C244,120 224,104 205,93" fill="none" stroke="var(--vein)" stroke-width="3"/>
    ${pills}${lab}`);
}

/* =====================================================================
   4. LATERAL BRAIN (three modes) + MID-SAGITTAL
   ===================================================================== */
const LOBES={
  frontal:{n:'Frontal lobe',c:'--sys-resp',fn:'Personality, planning and judgement (prefrontal cortex); primary motor cortex in the precentral gyrus; Broca\'s area for speech production (inferior frontal gyrus, dominant hemisphere).',
    les:'Personality change and disinhibition; contralateral weakness; Broca\'s (expressive) aphasia: non-fluent, effortful speech with good understanding.',sup:'ACA (medial and superior strip), MCA (lateral surface)'},
  parietal:{n:'Parietal lobe',c:'--sys-lymph',fn:'Primary somatosensory cortex in the postcentral gyrus; spatial awareness and attention; recognising objects by touch.',
    les:'Contralateral sensory loss; astereognosis; sensory inattention; neglect of the left side of space with a non-dominant (right) lesion.',sup:'MCA (lateral), ACA (medial)'},
  temporal:{n:'Temporal lobe',c:'--sys-gi',fn:'Hearing (primary auditory cortex in the superior temporal gyrus); memory (hippocampus in the medial temporal lobe); Wernicke\'s area for understanding language (dominant hemisphere).',
    les:'Wernicke\'s (receptive) aphasia: fluent but meaningless speech with poor understanding; memory loss; contralateral upper quadrant field loss.',sup:'MCA (lateral), PCA (inferior and medial)'},
  occipital:{n:'Occipital lobe',c:'--sys-endo',fn:'Vision: primary visual cortex around the calcarine sulcus on the medial surface, plus visual association areas.',
    les:'Contralateral homonymous hemianopia. In a PCA stroke the macula is often spared, because the occipital pole also receives MCA blood.',sup:'PCA'},
  cerebellum:{n:'Cerebellum',c:'--sys-repro',fn:'Coordination, balance, muscle tone and motor learning. Each hemisphere controls the same side of the body; the midline vermis controls the trunk.',
    les:'Ipsilateral DANISH: dysdiadochokinesia, ataxia, nystagmus, intention tremor, slurred (scanning) speech, hypotonia and heel–shin ataxia.',sup:'PICA, AICA and superior cerebellar arteries (vertebrobasilar)'},
  brainstem:{n:'Brainstem',c:'--sys-msk',fn:'Every long tract passes through it; nuclei of cranial nerves III–XII; reticular formation for consciousness; cardiovascular and respiratory centres in the pons and medulla.',
    les:'Crossed signs (cranial nerve palsy on the same side, limb weakness or sensory loss on the other); reduced consciousness or coma.',sup:'Vertebral and basilar arteries'}
};
const TERR={
  aca:{n:'Anterior cerebral artery',c:'--sys-resp',from:'Internal carotid',sup:'Medial surface of the frontal and parietal lobes, wrapping over the top of the lateral surface: the leg and foot area of the motor and sensory strips.',
    stroke:'Contralateral leg &gt; arm weakness and sensory loss; behaviour change; urinary incontinence.'},
  mca:{n:'Middle cerebral artery',c:'--sys-gi',from:'Internal carotid (its direct continuation)',sup:'Most of the lateral surface: face and arm areas, Broca\'s and Wernicke\'s areas, optic radiation; lenticulostriate branches to the internal capsule and basal ganglia.',
    stroke:'Contralateral face and arm &gt; leg weakness and sensory loss; aphasia if dominant (usually left); neglect if non-dominant; homonymous hemianopia.'},
  pca:{n:'Posterior cerebral artery',c:'--sys-endo',from:'Basilar (terminal branches)',sup:'Occipital lobe including visual cortex, inferior and medial temporal lobe, thalamus.',
    stroke:'Contralateral homonymous hemianopia with macular sparing; memory loss if the medial temporal lobes are involved.'},
  vb:{n:'Vertebrobasilar (posterior circulation)',c:'--sys-lymph',from:'Subclavian → vertebral → basilar',sup:'Brainstem and cerebellum through PICA, AICA, pontine branches and the superior cerebellar arteries.',
    stroke:'Vertigo, ataxia, double vision, slurred speech, difficulty swallowing and crossed signs. PICA: lateral medullary syndrome. Basilar: locked-in syndrome or coma.'}
};
function brainSVG(){
  const P={
    frontal:'M38,175 C34,105 90,48 170,40 C210,36 240,35 262,36 L226,200 L150,212 C120,220 90,222 70,212 C50,205 40,192 38,175 Z',
    parietal:'M262,36 C310,36 360,40 395,50 L398,205 L330,185 L226,200 Z',
    occipital:'M395,50 C445,68 484,130 478,200 C474,236 452,256 400,262 L398,205 Z',
    temporal:'M150,212 L226,200 L330,185 L398,205 L400,262 C360,285 300,292 240,285 C190,280 150,270 138,250 C132,235 138,220 150,212 Z',
    cerebellum:'M332,300 C345,275 410,262 448,266 C486,272 494,312 466,334 C432,356 372,352 345,334 C333,325 328,312 332,300 Z',
    brainstem:'M268,283 C292,286 318,290 330,305 C336,330 328,352 318,376 L296,376 C292,352 282,330 272,312 C266,300 264,290 268,283 Z'};
  const outline='M38,175 C34,105 90,48 170,40 C230,34 330,32 395,50 C445,68 484,130 478,200 C474,236 452,256 400,262 C360,285 300,292 240,285 C190,280 150,270 138,250 C132,235 138,220 150,212 C120,220 90,222 70,212 C50,205 40,192 38,175 Z';
  const lobes=Object.keys(P).map(k=>`<g class="nx-t lobe" data-k="${k}" style="--lc:var(${LOBES[k].c})" aria-label="${LOBES[k].n}"><path class="nx-s" d="${P[k]}"/></g>`).join('');
  const deco=`<g pointer-events="none" class="brain-deco">
    <path d="M96,80 C120,110 110,150 92,180 M150,58 C165,90 160,140 175,178 M300,60 C290,100 300,140 290,180 M345,62 C335,110 350,150 360,190 M195,232 C250,226 300,222 360,230 M215,262 C260,258 310,256 370,252" fill="none" stroke="var(--ink-2)" stroke-width="1" opacity=".35"/>
    <path d="M352,300 C380,292 430,292 466,304 M350,318 C385,312 432,314 470,322" fill="none" stroke="var(--ink-2)" stroke-width="1" opacity=".35"/>
    <path d="M262,36 L226,200" stroke="var(--ink)" stroke-width="3" fill="none"/>
    <path d="M150,212 L226,200 L330,185" stroke="var(--ink)" stroke-width="3" fill="none"/>
    <path d="M395,50 L398,205 L400,262" stroke="var(--ink-2)" stroke-width="1.4" stroke-dasharray="5 4" fill="none"/>
    <path class="ldr" d="M262,38 L272,18"/>${tl(276,18,'Central sulcus','xs')}
    <path class="ldr" d="M170,209 L120,300"/>${tl(118,312,'Lateral (Sylvian) fissure','xs','middle')}
  </g>`;
  const fnOnly=`<g class="only-fn" pointer-events="none">
    <ellipse cx="176" cy="186" rx="19" ry="11" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="3 2"/>${tl(176,170,'Broca','xs','middle')}
    <ellipse cx="318" cy="210" rx="22" ry="12" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="3 2"/>${tl(318,232,'Wernicke','xs','middle')}
    ${tl(118,125,'Frontal','b','middle')}${tl(330,118,'Parietal','b','middle')}${tl(440,165,'Occipital','b','middle')}${tl(250,256,'Temporal','b','middle')}${tl(412,316,'Cerebellum','b','middle')}${tl(262,372,'Brainstem','b','end')}
  </g>`;
  const ter=(k,d)=>`<g class="nx-t terr" data-t="${k}" style="--lc:var(${TERR[k].c})" aria-label="${TERR[k].n} territory"><path class="nx-s" d="${d}"/></g>`;
  const bs=`<g class="only-bs">
    ${ter('mca',outline)}
    ${ter('aca','M58,112 C80,62 120,45 170,40 C230,34 330,32 395,50 L390,80 C330,64 240,62 175,70 C125,76 92,95 80,125 Z')}
    ${ter('pca','M395,50 C445,68 484,130 478,200 C474,236 452,256 400,262 C360,285 300,292 240,285 C200,281 170,275 160,265 C210,262 270,262 330,250 C368,236 382,200 384,160 C386,112 388,80 395,50 Z')}
    ${ter('vb',P.cerebellum)}${ter('vb',P.brainstem)}
    <g pointer-events="none">${tl(150,40,'ACA','b','middle')}${tl(210,140,'MCA','b','middle')}${tl(436,140,'PCA','b','middle')}${tl(410,312,'Vertebrobasilar','b','middle')}</g>
  </g>`;
  /* homunculus: precentral (motor) and postcentral (sensory) strips with body map */
  const strip=(id,pts,c,lab)=>`<g class="nx-t hom-strip" data-h="${id}" aria-label="${lab}"><polygon class="nx-s" points="${pts}" style="fill:color-mix(in srgb,var(${c}) 55%,var(--paper));stroke:var(${c})"/></g>`;
  const parts=[[0.06,'Leg and foot (onto medial surface)'],[0.185,'Trunk'],[0.35,'Arm'],[0.535,'Hand and fingers'],[0.735,'Face and lips'],[0.925,'Tongue, swallowing']];
  const cuts=[0.12,0.25,0.45,0.62,0.85].map(t=>{const y1=38+166*t, x1=236-38*t, y2=36+164*t, x2=290-36*t; return `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}" stroke="var(--paper)" stroke-width="1.6"/>`;}).join('');
  const hom=`<g class="only-hom">
    ${strip('motor','236,38 262,36 226,200 198,204','--muscle','Precentral gyrus: primary motor cortex')}
    ${strip('sensory','262,36 290,37 254,197 226,200','--nerve','Postcentral gyrus: primary sensory cortex')}
    <g pointer-events="none">${cuts}
    ${parts.map(([t,l])=>{const y=38+166*t, x=236-38*t; return `<path class="ldr" d="M${(x+4).toFixed(1)},${y.toFixed(1)} L${(x-10).toFixed(1)},${y.toFixed(1)}"/>`+tl((x-13).toFixed(1),(y+4).toFixed(1),l,'xs','end');}).join('')}
    <path d="M298,38 V58 M298,62 V200" stroke="var(--ink)" stroke-width="2"/>${tl(304,52,'ACA','b')}${tl(304,135,'MCA','b')}
    ${tl(226,32,'Motor','xs b','end')}${tl(300,32,'Sensory','xs b','start')}</g>
  </g>`;
  return svg('0 0 520 390','Lateral view of the left cerebral hemisphere with cerebellum and brainstem',
    `<g class="lobes">${lobes}</g>${bs}${hom}${deco}${fnOnly}`,'m-fn');
}
/* legend chips double as 44px buttons that select the matching region */
const chip=(k,c,t)=>`<button class="pbtn nx-chip" data-pick="${k}" aria-pressed="false"><i style="background:var(${c})"></i>${t}</button>`;
const LEGENDS={
  fn:Object.keys(LOBES).map(k=>chip(k,LOBES[k].c,LOBES[k].n)).join(''),
  bs:Object.keys(TERR).map(k=>chip(k,TERR[k].c,TERR[k].n.replace(' (posterior circulation)',''))).join(''),
  hom:chip('motor','--muscle','Precentral gyrus: motor (UMN)')+chip('sensory','--nerve','Postcentral gyrus: sensory')
};
const HOM={motor:{n:'Precentral gyrus: primary motor cortex',body:'Upper motor neurones start here and run in the corticospinal tract to the opposite side of the body. The body is mapped upside down: tongue and face just above the lateral fissure, then hand (a huge area), arm and trunk, with the leg and foot over the top onto the medial surface.',
    clin:'Face and hand areas lie on the lateral surface (MCA), the leg area on the medial surface (ACA). So an MCA stroke weakens face and arm more than leg, and an ACA stroke the reverse.'},
  sensory:{n:'Postcentral gyrus: primary somatosensory cortex',body:'Receives touch, vibration, position, pain and temperature from the opposite side of the body, relayed by the thalamus. The map mirrors the motor strip; lips, tongue and fingertips have the largest areas because they have the most receptors.',
    clin:'A lesion causes contralateral loss of fine sensation in the matching body part; the association cortex behind it is needed to recognise objects by touch (astereognosis if damaged).'}};
function initBrain(){
  const host=$('#nx-brain'); if(!host) return;
  host.innerHTML=brainSVG();
  const s=$('svg',host), det=$('#nx-brain-detail'), leg=$('#nx-brain-legend');
  let mode='fn';
  const setMode=m=>{
    mode=m; s.classList.remove('m-fn','m-bs','m-hom'); s.classList.add('m-'+m); leg.innerHTML=LEGENDS[m];
    $$('.nx-t',s).forEach(g=>{g.classList.remove('on');
      const live=(m==='fn'&&g.classList.contains('lobe'))||(m==='bs'&&g.classList.contains('terr'))||(m==='hom'&&g.classList.contains('hom-strip'));
      g.setAttribute('tabindex',live?'0':'-1'); g.setAttribute('aria-hidden',String(!live));});
    det.innerHTML={fn:'Tap a lobe, the cerebellum or the brainstem.',bs:'Tap a coloured territory to see what the artery supplies and what its stroke looks like.',hom:'Tap the motor (precentral) or sensory (postcentral) strip.'}[m];
  };
  const on=(sel,attr,k)=>$$(sel,s).forEach(g=>g.classList.toggle('on',g.dataset[attr]===k));
  bind(s,'.lobe',g=>{if(mode!=='fn') return; const L=LOBES[g.dataset.k]; on('.lobe','k',g.dataset.k);
    det.innerHTML=`<b>${L.n}</b>${dl([['Function',L.fn],['Lesion',L.les],['Supply',L.sup]])}`;});
  bind(s,'.terr',g=>{if(mode!=='bs') return; const T=TERR[g.dataset.t]; on('.terr','t',g.dataset.t);
    det.innerHTML=`<b>${T.n}</b>${dl([['From',T.from],['Supplies',T.sup],['Stroke',T.stroke]])}`;});
  bind(s,'.hom-strip',g=>{if(mode!=='hom') return; const H=HOM[g.dataset.h]; on('.hom-strip','h',g.dataset.h);
    det.innerHTML=`<b>${H.n}</b><span>${H.body}</span><span><b>Why it matters:</b> ${H.clin}</span>`;});
  leg.addEventListener('click',e=>{const b=e.target.closest('[data-pick]'); if(!b) return;
    const sel={fn:`.lobe[data-k="${b.dataset.pick}"]`,bs:`.terr[data-t="${b.dataset.pick}"]`,hom:`.hom-strip[data-h="${b.dataset.pick}"]`}[mode];
    const g=$(sel,s); if(g) g.dispatchEvent(new MouseEvent('click'));
    $$('[data-pick]',leg).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));});
  pillGroup($('#nx-brain-modes'),'mode',setMode);
  setMode('fn');
}
const SAG=[['Corpus callosum','the largest commissure, joining the two hemispheres'],['Cingulate gyrus','limbic system: emotion and pain'],['Fornix','limbic pathway from hippocampus to mammillary body'],['Lateral ventricle','seen through the septum pellucidum'],['Thalamus','relay for all sensation except smell; forms the wall of the third ventricle'],['Hypothalamus','autonomic and endocrine control; homeostasis'],['Pituitary gland','in the sella turcica, hanging from the hypothalamus'],['Mammillary body','limbic: memory (damaged in Wernicke–Korsakoff)'],['Midbrain and cerebral aqueduct','CN III and IV; aqueduct links the third and fourth ventricles'],['Pons','CN V–VIII; bridge to the cerebellum'],['Medulla','CN IX–XII; cardiovascular and respiratory centres'],['Fourth ventricle','between brainstem and cerebellum'],['Cerebellum','coordination; arbor vitae of white matter inside'],['Pineal gland','melatonin']];
function sagittalSVG(){
  const n=(x,y,i)=>`<g class="nx-num"><circle cx="${x}" cy="${y}" r="10"/><text x="${x}" y="${y}">${i}</text></g>`;
  const brain='color-mix(in srgb,var(--sys-nerv) 14%,var(--paper))';
  return svg('0 0 500 350','Mid-sagittal section of the brain showing midline structures',
    `<path d="M42,185 C30,105 100,38 220,32 C335,26 445,62 472,140 C484,185 474,225 448,245 C420,262 380,262 350,250 L300,230 C270,226 240,224 215,222 C180,222 150,226 120,226 C85,224 55,210 42,185 Z" fill="${brain}" stroke="var(--ink-2)" stroke-width="1.6"/>
    <path d="M140,150 C138,95 200,78 250,78 C305,78 360,95 362,150" fill="none" stroke="color-mix(in srgb,var(--sys-lymph) 45%,var(--paper))" stroke-width="16" stroke-linecap="round"/>
    <path d="M150,150 C150,110 200,95 250,96 C300,96 345,110 350,148 C352,162 338,166 332,152 C326,124 296,112 250,112 C206,112 170,124 168,150 C168,166 150,166 150,150 Z" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.6"/>
    <path d="M175,150 C178,128 210,120 250,120 C290,120 322,128 326,150 C318,160 300,150 250,150 C210,150 190,160 175,150 Z" fill="var(--accent-tint)" stroke="var(--accent)" stroke-width="1.2"/>
    <path d="M320,158 C300,170 230,165 205,180 C195,190 198,205 205,212" fill="none" stroke="color-mix(in srgb,var(--sys-lymph) 70%,var(--paper))" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="258" cy="182" rx="38" ry="19" fill="color-mix(in srgb,var(--sys-endo) 30%,var(--paper))" stroke="var(--sys-endo)" stroke-width="1.4"/>
    <ellipse cx="214" cy="208" rx="18" ry="10" fill="color-mix(in srgb,var(--sys-endo) 50%,var(--paper))" stroke="var(--sys-endo)" stroke-width="1.4"/>
    <ellipse cx="190" cy="226" rx="12" ry="5" fill="var(--nerve-tint)" stroke="var(--nerve)"/>
    <path d="M208,216 L206,234" stroke="var(--ink-2)" stroke-width="3"/><ellipse cx="205" cy="242" rx="10" ry="8" fill="color-mix(in srgb,var(--sys-endo) 40%,var(--paper))" stroke="var(--sys-endo)"/>
    <circle cx="234" cy="221" r="5" fill="color-mix(in srgb,var(--sys-lymph) 60%,var(--paper))" stroke="var(--sys-lymph)"/>
    <circle cx="302" cy="190" r="5" fill="color-mix(in srgb,var(--sys-endo) 40%,var(--paper))" stroke="var(--sys-endo)"/>
    <path d="M265,215 L300,218 C306,240 312,265 312,290 C310,305 306,320 304,335 L284,335 C282,318 278,300 270,290 C252,282 244,262 250,248 C254,236 262,228 265,215 Z" fill="color-mix(in srgb,var(--sys-msk) 30%,var(--paper))" stroke="var(--sys-msk)" stroke-width="1.4"/>
    <path d="M294,220 L299,248" stroke="var(--accent)" stroke-width="2.5"/>
    <path d="M302,250 L330,268 L305,290 Z" fill="var(--accent-tint)" stroke="var(--accent)"/>
    <path d="M318,248 C345,232 410,236 425,262 C438,290 410,318 370,318 C340,318 318,300 314,285 Z" fill="color-mix(in srgb,var(--sys-repro) 25%,var(--paper))" stroke="var(--sys-repro)" stroke-width="1.4"/>
    <path d="M330,270 C350,262 380,262 400,270 M332,285 C352,280 382,282 405,290 M340,300 C360,296 385,298 400,305" fill="none" stroke="var(--sys-repro)" stroke-width="1" opacity=".6"/>
    ${n(250,104,1)}${n(200,72,2)}${n(212,170,3)}${n(250,136,4)}${n(262,182,5)}${n(214,208,6)}${n(185,250,7)}${n(240,236,8)}${n(296,232,9)}${n(256,268,10)}${n(290,316,11)}${n(316,268,12)}${n(390,300,13)}${n(318,186,14)}`);
}

/* =====================================================================
   5. CIRCLE OF WILLIS, CAVERNOUS SINUS, VENOUS TREE
   ===================================================================== */
const VESSELS={
  icaL:['M160,198 L160,172','Internal carotid artery (left)','Enters through the carotid canal, runs through the cavernous sinus, then gives the ophthalmic and posterior communicating arteries before dividing into the ACA and MCA.'],
  icaR:['M260,198 L260,172','Internal carotid artery (right)','Mirror of the left: anterior circulation for the right hemisphere.'],
  ophL:['M160,170 C152,150 146,130 140,108','Ophthalmic artery','First intracranial branch of the ICA; passes through the optic canal with the optic nerve. Supplies the eye and retina (central retinal artery): occlusion causes sudden monocular blindness.'],
  ophR:['M260,170 C268,150 274,130 280,108','Ophthalmic artery','First intracranial branch of the ICA; through the optic canal to the eye.'],
  mcaL:['M160,172 C130,168 100,160 54,164','Middle cerebral artery','Direct continuation of the ICA into the lateral fissure. Lateral surface: face and arm areas, speech areas; lenticulostriate branches to the internal capsule.'],
  mcaR:['M260,172 C290,168 320,160 366,164','Middle cerebral artery','Lateral surface of the right hemisphere: a stroke here often causes left-sided neglect.'],
  acaL:['M160,172 C170,150 190,130 198,118 L198,36','Anterior cerebral artery','Runs forward and up between the hemispheres onto the medial surface: leg and foot area.'],
  acaR:['M260,172 C250,150 230,130 222,118 L222,36','Anterior cerebral artery','Medial surface of the right hemisphere.'],
  acom:['M198,118 L222,118','Anterior communicating artery','Joins the two ACAs. The commonest site of berry aneurysms; rupture causes subarachnoid haemorrhage.'],
  pcomL:['M168,252 L160,176','Posterior communicating artery','Joins the ICA to the PCA: the link between front and back circulations. An aneurysm here can compress the oculomotor nerve (painful III palsy with a dilated pupil).'],
  pcomR:['M252,252 L260,176','Posterior communicating artery','Joins the ICA to the PCA.'],
  pcaL:['M210,262 C196,258 182,254 168,252 C140,250 100,262 70,290','Posterior cerebral artery','Terminal branch of the basilar. Occipital lobe (vision), inferior temporal lobe and thalamus.'],
  pcaR:['M210,262 C224,258 238,254 252,252 C280,250 320,262 350,290','Posterior cerebral artery','Terminal branch of the basilar to the right occipital lobe.'],
  scaL:['M210,272 C190,274 160,278 126,290','Superior cerebellar artery','Last branch of the basilar before it divides; upper cerebellum and midbrain. CN III runs between it and the PCA.'],
  scaR:['M210,272 C230,274 260,278 294,290','Superior cerebellar artery','Upper cerebellum and midbrain.'],
  basilar:['M210,380 L210,262','Basilar artery','Formed by the two vertebrals at the lower border of the pons; runs up the basilar groove; ends by dividing into the two PCAs. Occlusion: locked-in syndrome or coma.'],
  pont:['M210,300 L190,302 M210,300 L230,302 M210,322 L192,324 M210,322 L228,324','Pontine branches','Small perforators to the pons.'],
  aicaL:['M210,352 C190,354 160,356 128,364','Anterior inferior cerebellar artery','From the lower basilar; front of the lower cerebellum and lateral pons; usually gives the labyrinthine artery to the inner ear.'],
  aicaR:['M210,352 C230,354 260,356 292,364','Anterior inferior cerebellar artery','Lower cerebellum and lateral pons.'],
  vertL:['M182,452 C182,430 186,400 206,380','Vertebral artery (left)','First branch of the subclavian; up through the transverse foramina of C6–C1; through the foramen magnum.'],
  vertR:['M238,452 C238,430 234,400 214,380','Vertebral artery (right)','Mirror of the left; the two join to form the basilar.'],
  picaL:['M186,418 C170,420 140,425 112,436','Posterior inferior cerebellar artery','Largest branch of the vertebral: lateral medulla and inferior cerebellum. Occlusion causes lateral medullary (Wallenberg) syndrome.'],
  picaR:['M234,418 C250,420 280,425 308,436','Posterior inferior cerebellar artery','Lateral medulla and inferior cerebellum.'],
  asp:['M196,398 C202,404 206,410 210,416 M224,398 C218,404 214,410 210,416 L210,456','Anterior spinal artery','One branch from each vertebral unite in the midline; runs down the front of the cord supplying its anterior two-thirds.']
};
const TRACE={
  icaL:{set:['icaL','ophL','mcaL','acaL','acom','pcomL'],t:'Left internal carotid: anterior circulation',d:'Common carotid bifurcation (C4) → no branches in the neck → carotid canal → cavernous sinus → <b>ophthalmic</b> → <b>posterior communicating</b> → ends as the <b>ACA</b> and <b>MCA</b>. The anterior communicating artery links it to the other side as a collateral.'},
  icaR:{set:['icaR','ophR','mcaR','acaR','acom','pcomR'],t:'Right internal carotid: anterior circulation',d:'Same route on the right: ophthalmic, posterior communicating, then ACA and MCA. Supplies about 80% of each hemisphere\'s blood together with its partner.'},
  vert:{set:['vertL','vertR','picaL','picaR','asp','basilar','aicaL','aicaR','pont','scaL','scaR','pcaL','pcaR'],t:'Vertebral arteries: posterior circulation',d:'Subclavian → transverse foramina C6–C1 → foramen magnum → <b>PICA</b> and <b>anterior spinal</b> → join as the <b>basilar</b> → AICA, pontine branches, superior cerebellar → ends as the two <b>PCAs</b>. Brainstem, cerebellum, occipital lobes.'},
  basilar:{set:['basilar','aicaL','aicaR','pont','scaL','scaR','pcaL','pcaR'],t:'Basilar artery',d:'From the lower border of the pons to the midbrain: <b>AICA</b>, pontine branches, <b>superior cerebellar</b>, then divides into the <b>PCAs</b>. Basilar occlusion can cause locked-in syndrome: awake, aware, only vertical eye movements.'}
};
function willisSVG(){
  const bg=`<g pointer-events="none">
    <ellipse cx="210" cy="320" rx="50" ry="62" fill="color-mix(in srgb,var(--sys-msk) 18%,var(--paper))" stroke="var(--line-2)"/>
    <path d="M186,382 C188,410 196,430 200,452 L220,452 C224,430 232,410 234,382" fill="color-mix(in srgb,var(--sys-msk) 12%,var(--paper))" stroke="var(--line-2)"/>
    <ellipse cx="210" cy="150" rx="26" ry="9" fill="var(--nerve-tint)" stroke="var(--nerve)"/><path d="M192,146 L176,112 M228,146 L244,112" stroke="var(--nerve)" stroke-width="6" opacity=".6"/>
    <circle cx="210" cy="176" r="6" fill="var(--paper)" stroke="var(--ink-2)"/>
    <circle cx="203" cy="210" r="4.5" fill="var(--paper)" stroke="var(--ink-2)"/><circle cx="217" cy="210" r="4.5" fill="var(--paper)" stroke="var(--ink-2)"/>
    ${tl(210,16,'ANTERIOR','hd','middle')}${tl(210,474,'POSTERIOR','hd','middle')}
    ${tl(246,104,'Optic chiasm','xs')}${tl(210,198,'Pituitary stalk','xs','middle')}
  </g>`;
  const ves=Object.entries(VESSELS).map(([k,[d]])=>`<path class="ves" data-v="${k}" d="${d}"/>`).join('');
  const hits=Object.entries(VESSELS).map(([k,[d,n]])=>`<g class="nx-t vhit-g" data-v="${k}" aria-label="${esc(n)}"><path class="vhit" d="${d}"/></g>`).join('');
  const ica=`<g pointer-events="none"><circle cx="160" cy="176" r="9" fill="var(--artery)"/><circle cx="260" cy="176" r="9" fill="var(--artery)"/></g>`;
  const lab=`<g pointer-events="none">
    ${tl(194,58,'ACA','sm b','end')}${tl(210,108,'ACom','xs','middle')}${tl(60,152,'MCA','sm b','start')}${tl(146,192,'ICA','sm b','end')}${tl(136,100,'Ophthalmic','xs','end')}
    ${tl(158,226,'PCom','xs','end')}${tl(70,306,'PCA','sm b','middle')}${tl(122,280,'SCA','xs','end')}${tl(218,340,'Basilar','xs')}${tl(124,376,'AICA','xs','end')}
    ${tl(108,450,'PICA','xs','end')}${tl(176,466,'Vertebral','xs','end')}${tl(216,462,'Anterior spinal','xs')}
  </g>`;
  return svg('0 0 420 480','Circle of Willis and the vertebrobasilar system viewed from below',bg+ves+ica+hits+lab);
}
function initWillis(){
  const host=$('#nx-willis'); if(!host) return;
  host.innerHTML=willisSVG();
  const s=$('svg',host), det=$('#nx-willis-detail');
  let setBtn=()=>{};
  const light=set=>{$$('.ves',s).forEach(p=>{const on=!set||set.includes(p.dataset.v); p.classList.toggle('dim',!!set&&!on); p.classList.toggle('lit',!!set&&on);});};
  const trace=k=>{
    if(!k){light(null); det.innerHTML='Tap an internal carotid, a vertebral or the basilar artery to light up everything downstream.'; setBtn(''); return;}
    const T=TRACE[k]; light(T.set); det.innerHTML=`<b>${T.t}</b><span>${T.d}</span>`; setBtn(k);
  };
  bind(s,'.vhit-g',g=>{
    const v=g.dataset.v;
    if(v==='icaL'||v==='icaR'||v==='basilar') return trace(v);
    if(v==='vertL'||v==='vertR') return trace('vert');
    const [,n,d]=VESSELS[v]; light([v]); setBtn(''); det.innerHTML=`<b>${esc(n)}</b><span>${esc(d)}</span>`;
  });
  setBtn=pillGroup($('#nx-willis-btns'),'trace',trace);
}
function cavernousSVG(){
  const nv=(x,y,r,lab)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--nerve-tint)" stroke="var(--nerve)" stroke-width="2"/>`;
  const side=`<path d="M244,118 L300,108 L322,175 L270,192 L244,176 Z" fill="var(--vein-tint)" stroke="var(--vein)" stroke-width="2"/>
    <circle cx="270" cy="150" r="14" fill="var(--artery-tint)" stroke="var(--artery)" stroke-width="3"/>
    ${nv(292,166,6)}${nv(306,121,6)}${nv(310,137,5)}${nv(314,154,6)}${nv(318,172,6)}`;
  const labels=[['Oculomotor (III)',306,121,100],['Trochlear (IV)',310,137,122],['Ophthalmic (V1)',314,154,144],['Maxillary (V2)',318,172,166]]
    .map(([t,x,y,ly])=>`<path class="ldr" d="M${x+6},${y} L344,${ly-4}"/>`+tl(348,ly,t,'xs')).join('');
  return svg('0 0 430 290','Coronal section through the cavernous sinuses either side of the pituitary',
    `<path d="M150,184 C150,170 166,168 172,178 L248,178 C254,168 270,170 270,184 L276,262 L144,262 Z" fill="var(--bone)" stroke="var(--bone-line)" stroke-width="1.6"/>
    <rect x="164" y="196" width="92" height="56" rx="8" fill="var(--bone-art)" stroke="var(--bone-line)"/>${tl(210,228,'Sphenoid sinus','xs','middle')}
    <ellipse cx="210" cy="152" rx="32" ry="24" fill="color-mix(in srgb,var(--sys-endo) 30%,var(--paper))" stroke="var(--sys-endo)" stroke-width="1.6"/>${tl(210,156,'Pituitary','xs','middle')}
    <ellipse cx="210" cy="100" rx="40" ry="10" fill="var(--nerve-tint)" stroke="var(--nerve)" stroke-width="1.6"/>${tl(210,80,'Optic chiasm','xs','middle')}
    <path d="M178,128 L242,128" stroke="var(--ink-2)" stroke-width="1.5" stroke-dasharray="4 3"/>
    ${side}<g transform="translate(420,0) scale(-1,1)">${side}</g>
    <path class="ldr" d="M270,136 L282,64"/>${tl(284,62,['Internal carotid artery','(inside the sinus)'],'xs')}
    <path class="ldr" d="M292,172 L300,232"/>${tl(302,244,['Abducens (VI)','(free inside the sinus)'],'xs')}
    ${labels}${tl(370,196,['Lateral wall:','III, IV, V1, V2'],'xs b','middle')}
    <path class="ldr" d="M296,110 L336,34"/>${tl(340,32,'Cavernous sinus','xs b')}
    ${tl(14,272,['Drains via the superior','and inferior petrosal sinuses'],'xs')}`);
}

/* venous drainage: rendered by the main TREES renderer (right-to-left, vein colours) */
window.NEURO_TREES={neuroVenous:{kind:'vein',dir:'rtl',tall:true,root:
  {t:'Internal jugular vein',s:'leaves via jugular foramen',d:'Receives the sigmoid sinus at the jugular foramen and the inferior petrosal sinus just below it. Runs down the neck in the carotid sheath to join the subclavian vein.',c:[
    {t:'Sigmoid sinus',s:'S-shaped groove, mastoid',d:'Continues the transverse sinus down to the jugular foramen. Lies close to the mastoid air cells: mastoiditis can spread to cause sigmoid sinus thrombosis.',c:[
      {t:'Transverse sinus',s:'edge of tentorium',d:'Runs laterally from the confluence along the attached edge of the tentorium cerebelli.',c:[
        {t:'Confluence of sinuses',s:'internal occipital protuberance',d:'Where the superior sagittal, straight and occipital sinuses meet before draining into the transverse sinuses.',c:[
          {t:'Superior sagittal sinus',s:'upper edge of falx',d:'Receives the superior cerebral veins (via bridging veins) and CSF through the arachnoid granulations.'},
          {t:'Straight sinus',s:'falx meets tentorium',d:'Formed by the inferior sagittal sinus joining the great cerebral vein. Drains the deep brain.',c:[
            {t:'Inferior sagittal sinus',s:'free edge of falx',d:'Runs along the lower free edge of the falx cerebri.'},
            {t:'Great cerebral vein',s:'of Galen',d:'Formed by the internal cerebral veins; drains the deep structures (thalamus, basal ganglia).'}]},
          {t:'Occipital sinus',s:'falx cerebelli',d:'Small sinus in the attached edge of the falx cerebelli.'}]}]},
      {t:'Superior petrosal sinus',s:'petrous ridge',d:'Runs along the petrous ridge from the cavernous sinus to the transverse–sigmoid junction.',c:[
        {t:'Cavernous sinus',s:'beside the sella',d:'Receives the ophthalmic veins (and so the face). Drains backwards through the superior and inferior petrosal sinuses.',c:[
          {t:'Ophthalmic veins',s:'face, danger triangle',d:'Valveless veins linking the face to the cavernous sinus: the route for cavernous sinus thrombosis.'}]}]}]},
    {t:'Inferior petrosal sinus',s:'joins the IJV',d:'Runs from the cavernous sinus along the petro-occipital fissure to the internal jugular vein.',c:[
      {t:'Cavernous sinus',s:'second exit',d:'The cavernous sinus has two exits: superior petrosal (to the transverse–sigmoid junction) and inferior petrosal (to the internal jugular vein).'}]}]}}};

/* =====================================================================
   6. BRAINSTEM AND CRANIAL NERVES
   ===================================================================== */
const CN=[
  {r:'I',n:'Olfactory',type:'S',ex:'Cribriform plate (ethmoid)',leaves:'Olfactory bulb on the forebrain',fn:'Smell',test:'Each nostril in turn with a familiar smell (rarely done at the bedside)',les:'Anosmia: head injury with anterior fossa fracture (with CSF rhinorrhoea), Parkinson\'s disease, viral infection, frontal tumour.'},
  {r:'II',n:'Optic',type:'S',ex:'Optic canal (sphenoid), with the ophthalmic artery',leaves:'Optic chiasm on the diencephalon',fn:'Vision; afferent limb of the pupillary light reflex',test:'Acuity, colour, visual fields, pupils (direct and consensual light reflex), fundoscopy',les:'Optic nerve: loss of vision in that eye and a relative afferent pupillary defect. Chiasm (pituitary tumour): bitemporal hemianopia. Behind the chiasm: contralateral homonymous hemianopia.'},
  {r:'III',n:'Oculomotor',type:'M + PS',ex:'Superior orbital fissure',leaves:'Midbrain: interpeduncular fossa',fn:'Superior, inferior and medial rectus, inferior oblique, levator palpebrae superioris; parasympathetic to the sphincter pupillae (constriction) and ciliary muscle (accommodation)',test:'Eye movements in an "H", eyelid, pupil size and light reflex',les:'Eye "down and out", ptosis, fixed dilated pupil. Compression (posterior communicating artery aneurysm, uncal herniation) affects the pupil early; diabetic microvascular palsy often spares it.'},
  {r:'IV',n:'Trochlear',type:'M',ex:'Superior orbital fissure',leaves:'Back of the midbrain (the only nerve to leave dorsally), winding round the cerebral peduncle',fn:'Superior oblique: moves the eye down when adducted; intorsion',test:'Look down and in',les:'Vertical double vision, worst going downstairs or reading; head tilts away from the affected side.'},
  {r:'V',n:'Trigeminal',type:'S + M',ex:'V1 superior orbital fissure · V2 foramen rotundum · V3 foramen ovale',leaves:'Lateral pons',fn:'Sensation of the face, scalp to the vertex, cornea, nose and mouth, anterior two-thirds of the tongue (general sensation); motor (V3) to the muscles of mastication',test:'Light touch in V1, V2, V3; clench the jaw (masseter, temporalis); open the mouth against resistance; corneal reflex (afferent limb)',les:'Facial numbness; jaw deviates towards the side of a V3 lesion on opening; lost corneal reflex. Trigeminal neuralgia: brief electric-shock pains.'},
  {r:'VI',n:'Abducens',type:'M',ex:'Superior orbital fissure (after running through the cavernous sinus)',leaves:'Pontomedullary junction, near the midline',fn:'Lateral rectus: abducts the eye',test:'Look to the side',les:'Eye turned inwards, horizontal double vision worse looking towards the lesion. Its long course makes it a "false localising sign" in raised intracranial pressure.'},
  {r:'VII',n:'Facial',type:'S + M + PS',ex:'Internal acoustic meatus → facial canal → stylomastoid foramen',leaves:'Cerebellopontine angle',fn:'Muscles of facial expression and stapedius; taste from the anterior two-thirds of the tongue (chorda tympani); parasympathetic to the lacrimal, submandibular and sublingual glands',test:'Raise eyebrows, screw eyes shut, puff out cheeks, show teeth',les:'LMN (Bell\'s palsy): whole side of the face including the forehead. UMN (stroke): forehead spared. Also hyperacusis, loss of taste, dry eye.'},
  {r:'VIII',n:'Vestibulocochlear',type:'S',ex:'Internal acoustic meatus',leaves:'Cerebellopontine angle',fn:'Hearing (cochlear) and balance (vestibular)',test:'Whispered voice; Rinne and Weber with a 512 Hz tuning fork',les:'Sensorineural deafness, tinnitus, vertigo, nystagmus. Acoustic neuroma (vestibular schwannoma) at the cerebellopontine angle.'},
  {r:'IX',n:'Glossopharyngeal',type:'S + M + PS',ex:'Jugular foramen',leaves:'Medulla: groove behind the olive',fn:'Taste and sensation from the posterior third of the tongue and pharynx; afferents from the carotid sinus and body; motor to stylopharyngeus; parasympathetic to the parotid',test:'Gag reflex (afferent limb)',les:'Reduced gag sensation on that side; usually damaged together with X and XI at the jugular foramen.'},
  {r:'X',n:'Vagus',type:'S + M + PS',ex:'Jugular foramen',leaves:'Medulla: groove behind the olive',fn:'Muscles of the palate, pharynx and larynx (swallowing, voice); sensation from the larynx and part of the ear; parasympathetic to heart, lungs and gut as far as the splenic flexure',test:'Say "aah" and watch the uvula; voice, cough, swallow; gag reflex (efferent limb)',les:'Uvula deviates away from the lesion; hoarse voice (recurrent laryngeal nerve), nasal speech, difficulty swallowing.'},
  {r:'XI',n:'Accessory',type:'M',ex:'Jugular foramen (spinal root rises through the foramen magnum first)',leaves:'Spinal root from C1–C5, joining cranial rootlets behind the olive',fn:'Sternocleidomastoid and trapezius',test:'Shrug against resistance; turn the head against resistance',les:'Weak shrug on the same side; weak head turn to the opposite side. At risk in posterior triangle surgery and lymph node biopsy.'},
  {r:'XII',n:'Hypoglossal',type:'M',ex:'Hypoglossal canal',leaves:'Medulla: groove between pyramid and olive',fn:'All muscles of the tongue except palatoglossus (vagus)',test:'Stick out the tongue; look for wasting and fasciculation',les:'Tongue deviates towards the side of the lesion, with wasting and fasciculation (LMN).'}
];
function brainstemSVG(){
  const cx=230, M=x=>460-x;
  const tissue='color-mix(in srgb,var(--sys-msk) 26%,var(--paper))';
  const body=`<g pointer-events="none">
    <ellipse cx="110" cy="330" rx="72" ry="56" fill="var(--sunk)" stroke="var(--line-2)"/><ellipse cx="350" cy="330" rx="72" ry="56" fill="var(--sunk)" stroke="var(--line-2)"/>
    ${tl(84,340,'Cerebellum','xs','middle')}
    <path d="M210,420 L250,420 L248,548 L212,548 Z" fill="${tissue}" stroke="var(--sys-msk)" stroke-width="1.4"/>${tl(258,530,'Spinal cord','xs')}
    <path d="M196,282 L264,282 C266,330 258,380 250,420 L210,420 C202,380 194,330 196,282 Z" fill="${tissue}" stroke="var(--sys-msk)" stroke-width="1.4"/>
    <ellipse cx="220" cy="346" rx="9" ry="52" fill="color-mix(in srgb,var(--sys-msk) 45%,var(--paper))"/><ellipse cx="240" cy="346" rx="9" ry="52" fill="color-mix(in srgb,var(--sys-msk) 45%,var(--paper))"/>
    <ellipse cx="192" cy="325" rx="9" ry="24" fill="color-mix(in srgb,var(--sys-msk) 55%,var(--paper))" stroke="var(--sys-msk)"/><ellipse cx="268" cy="325" rx="9" ry="24" fill="color-mix(in srgb,var(--sys-msk) 55%,var(--paper))" stroke="var(--sys-msk)"/>
    <path d="M214,404 L246,420 M246,404 L214,420" stroke="var(--sys-msk)" stroke-width="2"/>
    <path d="M182,170 C120,172 116,280 182,284 L278,284 C344,280 340,172 278,170 Z" fill="${tissue}" stroke="var(--sys-msk)" stroke-width="1.4"/>
    <path d="M150,200 C200,192 260,192 310,200 M140,230 C200,222 260,222 320,230 M148,258 C200,252 260,252 312,258" fill="none" stroke="var(--sys-msk)" stroke-width="1" opacity=".5"/>
    <path d="M230,176 V280" stroke="var(--sys-msk)" stroke-width="1.4" stroke-dasharray="4 4"/>
    <path d="M176,98 L214,104 L218,172 L188,172 Z" fill="${tissue}" stroke="var(--sys-msk)" stroke-width="1.4"/><path d="M284,98 L246,104 L242,172 L272,172 Z" fill="${tissue}" stroke="var(--sys-msk)" stroke-width="1.4"/>
    <circle cx="222" cy="114" r="5" fill="var(--paper)" stroke="var(--ink-2)"/><circle cx="238" cy="114" r="5" fill="var(--paper)" stroke="var(--ink-2)"/>
    <path d="M206,84 L170,104 M254,84 L290,104" stroke="var(--nerve)" stroke-width="5" opacity=".55"/>
    <ellipse cx="230" cy="80" rx="30" ry="9" fill="var(--nerve-tint)" stroke="var(--nerve)" stroke-width="1.4"/>
    <circle cx="230" cy="93" r="4" fill="var(--paper)" stroke="var(--ink-2)"/>
    ${tl(cx,136,'MIDBRAIN','hd','middle')}${tl(cx,236,'PONS','hd','middle')}${tl(cx,296,'MEDULLA','hd','middle')}
    ${tl(274,390,'Pyramid','xs')}${tl(160,326,'Olive','xs','end')}
  </g>`;
  /* exit points [left side]; right side mirrored. each: stub path from exit outward */
  const EX={
    I:[[168,60],'M168,60 L150,18'],II:[[204,52],'M212,76 L196,30'],III:[[216,150],'M216,150 C200,156 186,162 172,166'],IV:[[180,166],'M180,166 C164,168 150,172 136,176'],
    V:[[142,212],'M142,212 L104,206'],VI:[[218,284],'M218,284 C212,296 204,304 196,312'],VII:[[182,288],'M182,288 L148,296'],VIII:[[170,292],'M170,292 L140,308'],
    IX:[[180,305],'M180,305 L150,316'],X:[[180,322],'M180,322 L150,334'],XI:[[181,342],'M181,342 L150,352 M210,500 C200,460 188,400 182,350'],XII:[[206,332],'M206,332 C198,344 188,352 176,360']};
  const mirrorPath=d=>d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g,(m,x,y)=>`${M(+x)},${y}`);
  let stubs='';
  Object.entries(EX).forEach(([r,[,d]])=>{stubs+=`<path class="cn-stub" data-r="${r}" data-side="L" d="${d}"/><path class="cn-stub" data-r="${r}" data-side="R" d="${mirrorPath(d)}"/>`;});
  /* bulbs for I */
  stubs+=`<ellipse cx="148" cy="16" rx="8" ry="12" fill="var(--nerve-tint)" stroke="var(--nerve)" stroke-width="1.6"/><ellipse cx="312" cy="16" rx="8" ry="12" fill="var(--nerve-tint)" stroke="var(--nerve)" stroke-width="1.6"/>`;
  const leftCol=['I','III','V','VII','IX','XI'], rightCol=['II','IV','VI','VIII','X','XII'];
  const yL=[34,124,212,300,388,476], yR=[64,154,244,332,420,508];
  let badges='';
  const badge=(r,bx,by,side)=>{const [ex,ey]=EX[r][0], px=side==='L'?ex:M(ex), C=CN.find(c=>c.r===r);
    badges+=`<path class="cn-ld" data-r="${r}" d="M${side==='L'?bx+20:bx-20},${by} L${px},${ey}"/>
      <g class="nx-t cnb" data-r="${r}" data-side="${side}" aria-label="Cranial nerve ${r}: ${C.n}"><rect class="hit" x="${bx-38}" y="${by-38}" width="76" height="76" rx="12"/><circle class="nx-s" cx="${bx}" cy="${by}" r="19"/><text x="${bx}" y="${by}">${r}</text></g>`;};
  leftCol.forEach((r,i)=>badge(r,26,yL[i],'L')); rightCol.forEach((r,i)=>badge(r,434,yR[i],'R'));
  return svg('-14 -12 488 584','Anterior view of the brainstem with the twelve cranial nerves',body+stubs+badges);
}
function initBrainstem(){
  const host=$('#nx-brainstem'); if(!host) return;
  host.innerHTML=brainstemSVG();
  const s=$('svg',host), det=$('#nx-cn-detail');
  bind(s,'.cnb',g=>{
    const r=g.dataset.r, side=g.dataset.side, C=CN.find(c=>c.r===r);
    $$('.cnb',s).forEach(x=>x.classList.toggle('on',x===g));
    $$('.cn-stub',s).forEach(p=>p.classList.toggle('on',p.dataset.r===r&&p.dataset.side===side));
    $$('.cn-ld',s).forEach(p=>p.classList.toggle('on',p.dataset.r===r));
    det.innerHTML=`<b>CN ${r} · ${C.n}</b> <span class="rt">${C.type}</span>${dl([['Leaves the brain',C.leaves],['Exits the skull',C.ex],['Function',C.fn],['Bedside test',C.test],['Lesion sign',C.les]])}`;
  });
  const tb=$('#nx-cn-table');
  if(tb) tb.innerHTML=CN.map(C=>`<tr><th class="tn">${C.r} · ${C.n}</th><td class="nowrap">${C.type}</td><td>${C.ex}</td><td>${C.fn}</td><td>${C.test}</td><td>${C.les}</td></tr>`).join('');
}

/* =====================================================================
   7. SPINAL CORD: CROSS-SECTION, TRACT TRACE, LESION SIMULATOR
   ===================================================================== */
const TRACTS={
  dcml:{n:'Dorsal column–medial lemniscus',c:'--accent',carries:'Fine touch, vibration, proprioception',cross:'Medulla',
    steps:['1st-order neurone: receptor → dorsal root ganglion → straight up the dorsal column on the <b>same side</b> (gracile for the leg, cuneate for the arm).','2nd-order: gracile and cuneate nuclei in the medulla → fibres <b>cross in the medulla</b> (internal arcuate fibres) → medial lemniscus.','3rd-order: thalamus (VPL) → internal capsule → postcentral gyrus of the <b>opposite</b> hemisphere.'],
    clin:'A cord lesion loses vibration and position sense on the same side below it. The pathway ends in the cortex contralateral to the body. Romberg\'s test is positive when dorsal columns fail (B12 deficiency, tabes dorsalis).'},
  stt:{n:'Lateral spinothalamic tract',c:'--artery',carries:'Pain and temperature (anterior tract: crude touch)',cross:'At entry, within 1–2 segments',
    steps:['1st-order: receptor → dorsal root ganglion → synapses in the dorsal horn.','2nd-order: <b>crosses within one or two segments</b> in the anterior white commissure → ascends in the lateral spinothalamic tract on the <b>opposite</b> side.','3rd-order: thalamus (VPL) → postcentral gyrus.'],
    clin:'A cord lesion loses pain and temperature on the opposite side, starting a segment or two below. Central cord lesions cut the crossing fibres, giving a "cape" of pain and temperature loss.'},
  cst:{n:'Lateral corticospinal tract',c:'--lymph',carries:'Voluntary movement, especially of the distal limbs',cross:'Medullary pyramids',
    steps:['Upper motor neurone: precentral gyrus → corona radiata → posterior limb of the internal capsule → cerebral peduncle → pons → medullary pyramid.','About 85% of fibres <b>cross at the decussation of the pyramids</b> → descend in the lateral corticospinal tract on the <b>opposite</b> side (the rest descend uncrossed in the anterior tract to axial muscles).','Synapse on the lower motor neurone in the anterior horn → ventral root → muscle.'],
    clin:'Above the pyramids a lesion weakens the opposite side; below them (in the cord) the same side. UMN signs below the lesion, LMN signs at its level.'}
};
const LESIONS={
  hemi:{n:'Left hemisection (Brown-Séquard)',cause:'Stab wound, tumour, disc or bone fragment on one side',hit:['dcml-L','cst-L','stt-L','x-R'],
    left:['Below the lesion: UMN weakness (spastic, brisk reflexes, upgoing plantar)','Below the lesion: loss of vibration, position sense and fine touch (dorsal columns not yet crossed)','At the level: LMN weakness and a band of total sensory loss'],
    right:['Loss of pain and temperature from one or two segments below the lesion (the left spinothalamic tract carries the right side)'],both:[]},
  ant:{n:'Anterior cord syndrome',cause:'Anterior spinal artery occlusion (aortic surgery or dissection), flexion injury, disc',hit:['cst-L','cst-R','stt-L','stt-R','x-L','x-R'],
    left:[],right:[],both:['Below the lesion: weakness of both sides (UMN, after a period of spinal shock)','Below the lesion: loss of pain and temperature on both sides','At the level: LMN weakness','<b>Preserved:</b> vibration, position sense and fine touch (dorsal columns, supplied by the posterior spinal arteries)','Bladder and bowel dysfunction']},
  central:{n:'Central cord syndrome',cause:'Neck hyperextension in an older person with cervical spondylosis; syringomyelia (a fluid cavity in the cord)',hit:['x-L','x-R'],
    left:[],right:[],both:['Loss of pain and temperature in a "cape" over the shoulders and arms: the crossing fibres in the anterior white commissure are cut at those segments','Arms weaker than legs: arm fibres lie most medially in the corticospinal tracts, and anterior horn cells at the level are damaged (LMN signs in the hands)','Dorsal columns usually spared','Bladder involvement is variable']}
};
function cordSVG(){
  const grey='color-mix(in srgb,var(--ink-2) 24%,var(--paper))', white='color-mix(in srgb,var(--sys-nerv) 10%,var(--paper))';
  const H='M206,150 C190,148 175,130 168,100 C162,80 152,64 146,58 C140,56 136,62 140,70 C150,95 160,130 160,160 C150,185 128,215 125,240 C122,262 150,268 170,250 C185,232 196,200 206,182 Z';
  const tract=(k,side,shape)=>`<g class="trk-g" data-k="${k}" data-side="${side}">${shape}</g>`;
  const half=s=>`${tract('dcml',s,`<path class="trk" style="fill:var(--accent)" d="M208,36 L208,148 C195,140 180,118 170,95 C162,75 155,60 150,47 C170,40 190,36 208,36 Z"/>`)}
    ${tract('cst',s,`<ellipse class="trk" style="fill:var(--lymph)" cx="95" cy="140" rx="36" ry="36"/>`)}
    ${tract('stt',s,`<ellipse class="trk" style="fill:var(--artery)" cx="92" cy="216" rx="33" ry="30"/>`)}
    ${tract('x',s,`<path class="trk-x" d="M168,112 C190,182 232,192 296,214"/>`)}
    <path d="${H}" fill="${grey}" stroke="var(--ink-2)" stroke-width="1.2"/>`;
  const roots=`<path d="M146,58 C128,38 104,28 76,22" fill="none" stroke="var(--nerve)" stroke-width="5"/><ellipse cx="94" cy="27" rx="13" ry="8" fill="var(--nerve-tint)" stroke="var(--nerve)" stroke-width="1.6"/>
    <path d="M128,252 C108,276 86,292 60,304" fill="none" stroke="var(--nerve)" stroke-width="5"/>`;
  const txt=`<g pointer-events="none">${tl(186,80,'DC','xs b','middle')}${tl(95,144,'CST','xs b','middle')}${tl(92,220,'STT','xs b','middle')}
    ${tl(22,18,'LEFT','hd')}${tl(398,18,'RIGHT','hd','end')}${tl(210,314,'Ventral (anterior)','xs','middle')}${tl(210,24,'Dorsal','xs','middle')}
    ${tl(60,50,'Dorsal root + ganglion','xs','middle')}${tl(40,316,'Ventral root','xs','start')}${tl(160,282,'Anterior horn (LMN)','xs','middle')}</g>`;
  return svg('0 0 420 330','Spinal cord cross-section with dorsal columns, spinothalamic and corticospinal tracts',
    `<defs><clipPath id="nx-cord-clip"><ellipse cx="210" cy="165" rx="175" ry="130"/></clipPath>
      <pattern id="nx-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="var(--clin)" opacity=".22"/><path d="M0,0 V8" stroke="var(--clin)" stroke-width="3" opacity=".55"/></pattern></defs>
    <ellipse cx="210" cy="165" rx="175" ry="130" fill="${white}" stroke="var(--ink-2)" stroke-width="1.6"/>
    <g clip-path="url(#nx-cord-clip)">${half('L')}<g transform="translate(420,0) scale(-1,1)">${half('R')}</g>
      <path d="M200,150 L220,150 L220,176 L200,176 Z" fill="${grey}"/></g>
    ${roots}<g transform="translate(420,0) scale(-1,1)">${roots}</g>
    <path d="M210,36 V150 M210,250 V294" stroke="var(--ink-2)" stroke-width="2"/><circle cx="210" cy="168" r="4" fill="var(--paper)" stroke="var(--ink-2)"/>
    <g clip-path="url(#nx-cord-clip)" pointer-events="none">
      <rect class="les" data-l="hemi" x="0" y="0" width="210" height="330" fill="url(#nx-hatch)"/>
      <path class="les" data-l="ant" d="M0,124 L162,124 L182,150 L238,150 L258,124 L420,124 L420,330 L0,330 Z" fill="url(#nx-hatch)"/>
      <ellipse class="les" data-l="central" cx="210" cy="178" rx="58" ry="46" fill="url(#nx-hatch)"/>
    </g>${txt}`);
}
function traceSVG(k){
  const T=TRACTS[k], c=`var(${T.c})`;
  const lv=[['Cortex',40],['Thalamus · internal capsule',110],['Medulla',190],['Spinal cord',290],['Periphery',385]];
  const P={dcml:{d:'M250,388 L190,296 L190,200 L132,182 L132,112 L108,44',dots:[[190,296],[190,200],[132,112]],x:[160,190],dir:'up'},
    stt:{d:'M250,388 L190,296 L132,276 L132,112 L108,44',dots:[[190,296],[132,112]],x:[160,286],dir:'up'},
    cst:{d:'M108,44 L132,112 L132,186 L190,206 L190,296 L250,386',dots:[[190,296]],x:[160,196],dir:'down'}}[k];
  return svg('0 0 320 420',`${T.n}: course from receptor to cortex`,
    `<defs><marker id="nx-tr-${k}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker></defs>
    ${lv.map(([t,y])=>`<line x1="70" y1="${y}" x2="316" y2="${y}" stroke="var(--line)"/>`+tl(4,y+4,t.split(' · '),'xs')).join('')}
    <line x1="160" y1="26" x2="160" y2="404" stroke="var(--line-2)" stroke-dasharray="4 4"/>${tl(96,414,'L','hd','middle')}${tl(250,414,'R','hd','middle')}
    <path d="${P.d}" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round" marker-end="url(#nx-tr-${k})"/>
    ${P.dots.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="var(--paper)" stroke="${c}" stroke-width="2.6"/>`).join('')}
    <circle cx="${P.x[0]}" cy="${P.x[1]}" r="13" fill="none" stroke="var(--clin)" stroke-width="2.4"/>${tl(P.x[0]+18,P.x[1]+4,'crosses','xs b')}
    ${tl(160,18,T.n,'sm b','middle')}`);
}
function initCord(){
  const host=$('#nx-cord'); if(!host) return;
  host.innerHTML=cordSVG();
  const s=$('svg',host), det=$('#nx-cord-detail'), tr=$('#nx-trace'), trPlate=tr&&tr.closest('.plate');
  if(trPlate) trPlate.hidden=true;
  let setT=()=>{}, setL=()=>{};
  const reset=()=>{$$('.trk-g',s).forEach(g=>g.classList.remove('hit','dim','lit')); $$('.les',s).forEach(p=>p.classList.remove('on'));};
  const doTrace=k=>{
    reset(); setL('');
    if(!k){det.innerHTML='Choose a tract to trace, or a lesion to simulate.'; if(trPlate) trPlate.hidden=true; return;}
    const T=TRACTS[k];
    $$('.trk-g',s).forEach(g=>{const m=g.dataset.k===k||(k==='stt'&&g.dataset.k==='x'); g.classList.toggle('lit',m); g.classList.toggle('dim',!m);});
    tr.innerHTML=traceSVG(k); if(trPlate) trPlate.hidden=false;
    det.innerHTML=`<b>${T.n}</b>${dl([['Carries',T.carries],['Crosses',`<b>${T.cross}</b>`],['Route',`<ol>${T.steps.map(x=>`<li>${x}</li>`).join('')}</ol>`],['Clinical',T.clin]])}`;
  };
  const doLesion=k=>{
    reset(); setT(''); if(trPlate) trPlate.hidden=true;
    if(!k){det.innerHTML='Choose a tract to trace, or a lesion to simulate.'; return;}
    const L=LESIONS[k];
    $$('.les',s).forEach(p=>p.classList.toggle('on',p.dataset.l===k));
    $$('.trk-g',s).forEach(g=>g.classList.toggle('hit',L.hit.includes(g.dataset.k+'-'+g.dataset.side)));
    const list=(t,a)=>a.length?`<div><span class="eyebrow">${t}</span><ul>${a.map(x=>`<li>${x}</li>`).join('')}</ul></div>`:'';
    det.innerHTML=`<b>${L.n}</b><span class="small muted">${L.cause}</span>${list('Left side (same side as the lesion)',L.left)}${list('Right side (opposite)',L.right)}${list('Both sides',L.both)}`;
  };
  setT=pillGroup($('#nx-trace-btns'),'tract',doTrace);
  setL=pillGroup($('#nx-lesion-btns'),'lesion',doLesion);
}

/* =====================================================================
   8. QUIZ ITEMS (merged into the main QUIZ by the page script)
   ===================================================================== */
window.NEURO_QUIZ=[
 {id:'n1',c:'neuro',type:'sba',q:'A 68-year-old right-handed man suddenly develops weakness of the right side of his face and right arm; his right leg is only slightly weak. He understands what is said but can only produce short, effortful phrases. Which artery is most likely occluded?',o:['Basilar artery','Left anterior cerebral artery','Left middle cerebral artery','Left posterior cerebral artery','Right middle cerebral artery'],a:2,e:'Face and arm more than leg, on the right, with expressive (Broca\'s) aphasia = left (dominant) MCA territory: lateral motor strip plus the inferior frontal gyrus.'},
 {id:'n2',c:'neuro',type:'sba',q:'A 71-year-old woman suddenly cannot lift her left leg and has reduced sensation in it. Her left arm and face are almost normal. Which artery is most likely affected?',o:['Left anterior cerebral artery','Right anterior cerebral artery','Right middle cerebral artery','Right posterior cerebral artery','Vertebral artery'],a:1,e:'The leg and foot area of the motor and sensory strips lies on the medial surface, supplied by the ACA. Left-sided signs mean the right hemisphere: right ACA.'},
 {id:'n3',c:'neuro',type:'sba',q:'A 74-year-old man notices he keeps bumping into things on his right. Examination shows loss of the right half of the visual field in both eyes, with central vision preserved. Power and sensation are normal. Where is the lesion most likely to be?',o:['Left middle cerebral artery territory','Left posterior cerebral artery territory','Optic chiasm','Right ophthalmic artery territory','Right posterior cerebral artery territory'],a:1,e:'A right homonymous hemianopia with macular sparing and no weakness points to the left occipital lobe: left PCA. The macula is spared because the occipital pole also gets MCA blood. A chiasmal lesion gives a bitemporal hemianopia.'},
 {id:'n4',c:'neuro',type:'sba',q:'A 59-year-old has sudden vertigo, vomiting, hoarseness and difficulty swallowing. There is loss of pain and temperature on the left side of the face and the right side of the body, a left Horner\'s syndrome and left-sided ataxia. Which artery is occluded?',o:['Left anterior inferior cerebellar artery','Left posterior inferior cerebellar artery','Left superior cerebellar artery','Right posterior cerebral artery','Right posterior inferior cerebellar artery'],a:1,e:'Lateral medullary (Wallenberg) syndrome: crossed sensory loss (same-side face from the spinal trigeminal nucleus, opposite-side body from the spinothalamic tract), same-side Horner\'s, ataxia and IX/X palsy. Left-sided face signs place it on the left: left PICA (or vertebral).'},
 {id:'n5',c:'neuro',type:'sba',q:'A 19-year-old is hit on the side of the head by a cricket ball. He is briefly knocked out, recovers and chats normally, then becomes drowsy two hours later. CT shows a biconvex collection. Through which opening does the vessel responsible enter the skull?',o:['Foramen lacerum','Foramen ovale','Foramen rotundum','Foramen spinosum','Jugular foramen'],a:3,e:'An extradural haematoma from the middle meningeal artery, which enters the middle cranial fossa through the foramen spinosum and runs under the pterion. Lucid interval, then decline: a neurosurgical emergency.'},
 {id:'n6',c:'neuro',type:'sba',q:'A 55-year-old has a headache that reached maximum intensity within a minute, with neck stiffness. CT shows blood in the sulci and basal cisterns. Which layer lies immediately superficial to the blood?',o:['Arachnoid mater','Meningeal layer of the dura','Periosteal layer of the dura','Pia mater','Skull'],a:0,e:'Subarachnoid haemorrhage: blood in the CSF-filled space between arachnoid (above) and pia (below), usually from a ruptured berry aneurysm.'},
 {id:'n7',c:'neuro',type:'sba',q:'A 34-year-old woman has slurred speech. When she sticks out her tongue, it deviates to the left, and the left side of the tongue is wasted with fasciculations. Which nerve is damaged?',o:['Left glossopharyngeal nerve','Left hypoglossal nerve','Left vagus nerve','Right hypoglossal nerve','Right vagus nerve'],a:1,e:'The tongue deviates towards the side of a hypoglossal lesion because the healthy genioglossus pushes it over. Wasting and fasciculation make it a lower motor neuron lesion on the left.'},
 {id:'n8',c:'neuro',type:'sba',q:'After neck surgery a patient has a hoarse voice. When she says "aah", the uvula is pulled to the right. Which nerve is damaged?',o:['Left glossopharyngeal nerve','Left hypoglossal nerve','Left vagus nerve','Right glossopharyngeal nerve','Right vagus nerve'],a:2,e:'The uvula deviates away from the side of a vagal lesion: the healthy right side pulls it over. Hoarseness fits loss of the recurrent laryngeal fibres in the vagus.'},
 {id:'n9',c:'neuro',type:'sba',q:'A man has weakness of the lower right face and right arm, but can wrinkle both sides of his forehead normally. Where is the lesion?',o:['Left facial nerve at the stylomastoid foramen','Left precentral gyrus','Right facial nerve in the facial canal','Right parotid gland','Right precentral gyrus'],a:1,e:'Forehead sparing means an upper motor neuron lesion: the upper face is supplied from both hemispheres. With a right arm weakness too, the lesion is in the left motor cortex. Any facial nerve lesion (LMN) would paralyse the whole of that side, forehead included.'},
 {id:'n10',c:'neuro',type:'sba',q:'A man is stabbed in the back and the right half of his spinal cord is cut at T8. Which pattern do you expect below the lesion?',o:['Bilateral weakness and loss of pain sense, with vibration preserved','Left-sided weakness and vibration loss, right-sided pain and temperature loss','Loss of pain and temperature in a cape over both shoulders','Right-sided weakness and pain loss, left-sided vibration loss','Right-sided weakness and vibration loss, left-sided pain and temperature loss'],a:4,e:'Brown-Séquard syndrome: corticospinal and dorsal column fibres have not crossed yet in the cord (same side), while spinothalamic fibres crossed near entry (opposite side).'},
 {id:'n11',c:'neuro',type:'sba',q:'A 62-year-old has double vision that is worst when going downstairs and reading. She tilts her head away from the affected side. Which nerve is affected?',o:['Abducens nerve','Facial nerve','Oculomotor nerve','Optic nerve','Trochlear nerve'],a:4,e:'The trochlear nerve supplies superior oblique, which moves the adducted eye down and intorts it. Weakness causes vertical diplopia on looking down; tilting the head away compensates for the lost intorsion.'},
 {id:'n12',c:'neuro',type:'sba',q:'A man squeezes a boil beside his nose. Days later he has fever, headache, a bulging eye and double vision. Which cranial nerve is typically affected first?',o:['Abducens nerve','Facial nerve','Mandibular nerve','Optic nerve','Trochlear nerve'],a:0,e:'Infection spreads through the valveless facial and ophthalmic veins to the cavernous sinus. The abducens nerve runs freely inside the sinus next to the ICA, so it is often first; III, IV, V1 and V2 in the lateral wall follow. V3 does not pass through the sinus.'},
 {id:'n13',c:'neuro',type:'vsaq',q:'Through which foramen does the mandibular division of the trigeminal nerve (V3) leave the skull?',a:['foramenovale','ovale','theforamenovale'],e:'Foramen ovale in the greater wing of the sphenoid. V1 leaves through the superior orbital fissure and V2 through the foramen rotundum.'},
 {id:'n14',c:'neuro',type:'vsaq',q:'Which dural venous sinus is formed by the inferior sagittal sinus joining the great cerebral vein?',a:['straightsinus','straight','thestraightsinus','sinusrectus'],e:'The straight sinus, running along the junction of the falx cerebri and tentorium cerebelli to the confluence of sinuses.'},
 {id:'n15',c:'neuro',type:'vsaq',q:'At which vertebral level does the adult spinal cord usually end?',a:['l1l2','l12','l1','l2','l1tol2','l1l2disc','l1orl2'],e:'At about the L1/L2 intervertebral disc (conus medullaris); lower (around L3) in newborns. Lumbar puncture is done at L3/4 or L4/5, below it.'}
];
window.NEURO_MODEL={n13:'Foramen ovale',n14:'Straight sinus',n15:'L1/L2 (intervertebral disc)'};

/* =====================================================================
   INIT
   ===================================================================== */
initSkull();
const mh=$('#nx-meninges'); if(mh) mh.innerHTML=meningesSVG();
initBrain();
const sg=$('#nx-sagittal'); if(sg) sg.innerHTML=sagittalSVG();
const sk=$('#nx-sagittal-key'); if(sk) sk.innerHTML=SAG.map(([a,b])=>`<li><b>${a}</b>: ${b}</li>`).join('');
initWillis();
const cv=$('#nx-cavernous'); if(cv) cv.innerHTML=cavernousSVG();
initBrainstem();
initCord();
})();
