/* Shared pieces for the regional chapters (head & neck, thorax, abdomen, pelvis) and the spec.
   - window.ATLAS_EXT collects labelled plates, flowchart trees and quiz items from the chapter files;
     the main script merges them into BONES, TREES, QUIZ and MODEL.
   - Interactive widgets (vertebral levels, abdominal regions, mediastinum, auscultation, neck triangles)
     mount on any element with data-widget="name". */
window.ATLAS_EXT = window.ATLAS_EXT || {plates:{}, trees:{}, quiz:[], model:{}};
window.ATLAS_UTIL = (function(){
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const tl=(x,y,lines,cls,anchor,lh)=>`<text class="${cls||''}" x="${x}" y="${y}"${anchor?` text-anchor="${anchor}"`:''}>${[].concat(lines).map((l,i)=>`<tspan x="${x}" dy="${i?(lh||13):0}">${esc(l)}</tspan>`).join('')}</text>`;
  const dl=rows=>`<dl>${rows.filter(r=>r[1]).map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  /* label used on plates (same look as the bone plates) */
  const lab=(x,y,t,a)=>`<text class="bone-lbl" x="${x}" y="${y}" text-anchor="${a||'middle'}">${esc(t)}</text>`;
  return {esc,tl,dl,lab};
})();

(function(){
'use strict';
const {esc,tl,dl}=window.ATLAS_UTIL;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const svg=(vb,label,body,cls)=>`<svg class="nx ${cls||''}" viewBox="${vb}" role="group" aria-label="${esc(label)}">${body}</svg>`;

/* Generic widget: a figure, a row of 44px buttons and a detail panel. Items: {k, label, title, html}.
   draw(sel) returns SVG for the current selection; svg targets carry data-k. */
function mount(host,{items,draw,intro,label,pick}){
  host.innerHTML=`<div class="pill-btns wg-btns" role="group" aria-label="${esc(label)}">${items.map(i=>`<button class="pbtn" data-k="${i.k}" aria-pressed="false">${esc(i.label)}</button>`).join('')}</div>
    <div class="fig-grid wg-grid"><div class="nx-fig wg-fig"></div><div class="tdetail nx-detail wg-det" aria-live="polite">${intro}</div></div>`;
  const fig=$('.wg-fig',host), det=$('.wg-det',host);
  let cur=null;
  const render=()=>{
    fig.innerHTML=draw(cur);
    $$('[data-k]',fig).forEach(g=>{g.setAttribute('tabindex','0'); g.setAttribute('role','button'); g.classList.add('nx-t');
      const go=()=>select(g.dataset.k);
      g.addEventListener('click',go); g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); go();}});});
  };
  function select(k){
    cur=k; const it=items.find(i=>i.k===k);
    $$('.wg-btns .pbtn',host).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.k===k)));
    det.innerHTML=`<b>${it.title||it.label}</b>${it.html}`;
    render(); if(pick) pick(k);
  }
  $$('.wg-btns .pbtn',host).forEach(b=>b.addEventListener('click',()=>select(b.dataset.k)));
  render();
}

/* ---------------------------------------------------------------- vertebral levels ladder */
const LEVELS=[
  {k:'C3',v:'C3',label:'C3 · Hyoid',title:'C3: hyoid bone',html:'<ul><li>Hyoid bone; top of the larynx (larynx spans C3–C6).</li><li>Level of the floor of the mouth from behind.</li></ul>'},
  {k:'C4',v:'C4',label:'C4 · Carotid fork',title:'C4: upper border of the thyroid cartilage',html:'<ul><li><b>Common carotid artery bifurcates</b> into internal and external carotids (carotid sinus here: pressing it slows the heart).</li><li>Thyroid cartilage (Adam\'s apple) lies at C4–C5; vocal folds at about C5.</li></ul>'},
  {k:'C6',v:'C6',label:'C6 · Cricoid',title:'C6: cricoid cartilage',html:'<ul><li>Larynx becomes trachea; pharynx becomes oesophagus.</li><li>Vertebral artery enters the transverse foramen of C6.</li><li>Carotid tubercle on the C6 transverse process: compress the common carotid against it.</li><li>Narrowest point of the oesophagus (cricopharyngeus).</li></ul>'},
  {k:'C7',v:'C7',label:'C7 · Prominens',title:'C7: vertebra prominens',html:'<ul><li>Most prominent spinous process at the base of the neck: the usual starting point for counting spinous processes.</li></ul>'},
  {k:'T2',v:'T2',label:'T2/3 · Jugular notch',title:'T2/3: suprasternal (jugular) notch',html:'<ul><li>Top of the manubrium. The trachea is palpable in the midline just above it.</li></ul>'},
  {k:'T4',v:'T4',label:'T4/5 · Sternal angle',title:'T4/5: sternal angle (angle of Louis)',html:'<ul><li>2nd costal cartilage joins here: count ribs and spaces from it.</li><li>Aortic arch begins and ends; <b>carina</b> (tracheal bifurcation).</li><li>Azygos vein drains into the SVC; thoracic duct crosses to the left.</li><li>Divides the superior from the inferior mediastinum.</li></ul>'},
  {k:'T7',v:'T7',label:'T7 · Scapula angle',title:'T7: inferior angle of the scapula',html:'<ul><li>With the arms by the sides. A posterior landmark for counting ribs and for pleural taps.</li></ul>'},
  {k:'T8',v:'T8',label:'T8 · IVC',title:'T8: caval opening of the diaphragm',html:'<ul><li>Inferior vena cava and branches of the right phrenic nerve pass through the central tendon. "I 8 10 Eggs At 12".</li></ul>'},
  {k:'T9',v:'T9',label:'T9 · Xiphisternum',title:'T9: xiphisternal joint',html:'<ul><li>Lower end of the body of the sternum; dermatome T6 lies over the xiphoid.</li></ul>'},
  {k:'T10',v:'T10',label:'T10 · Oesophagus',title:'T10: oesophageal hiatus',html:'<ul><li>Oesophagus with the anterior and posterior vagal trunks and oesophageal branches of the left gastric vessels.</li><li>Dermatome T10 is at the umbilicus (a skin level, not a vertebral one).</li></ul>'},
  {k:'T12',v:'T12',label:'T12 · Aorta, coeliac',title:'T12: aortic hiatus and coeliac trunk',html:'<ul><li>Aorta passes behind the median arcuate ligament with the thoracic duct and (often) the azygos vein.</li><li><b>Coeliac trunk</b> arises here: the foregut artery.</li></ul>'},
  {k:'L1',v:'L1',label:'L1 · Transpyloric',title:'L1: transpyloric plane',html:'<ul><li>Halfway between the jugular notch and the pubic symphysis; crosses the 9th costal cartilages.</li><li>Pylorus, neck of pancreas, 2nd part of duodenum, <b>superior mesenteric artery</b> origin, renal hila, fundus of the gallbladder.</li><li>Portal vein forms behind the neck of the pancreas (L1/2); cisterna chyli; <b>spinal cord ends</b> at L1/2.</li></ul>'},
  {k:'L3',v:'L3',label:'L3 · Subcostal',title:'L3: subcostal plane',html:'<ul><li>Lowest point of the costal margin (10th costal cartilage).</li><li><b>Inferior mesenteric artery</b> origin. Umbilicus usually lies at L3/4.</li></ul>'},
  {k:'L4',v:'L4',label:'L4 · Iliac crests',title:'L4: supracristal plane',html:'<ul><li>Tops of the iliac crests (Tuffier\'s line): landmark for lumbar puncture at L3/4 or L4/5.</li><li><b>Aorta bifurcates</b> into the common iliac arteries.</li></ul>'},
  {k:'L5',v:'L5',label:'L5 · Tubercles, IVC',title:'L5: transtubercular plane',html:'<ul><li>Tubercles of the iliac crests.</li><li>Common iliac veins join to form the <b>inferior vena cava</b> (L5, to the right of the midline).</li></ul>'},
  {k:'S2',v:'S2',label:'S2 · Dural sac ends',title:'S2: posterior superior iliac spines',html:'<ul><li>Dimples over the PSIS mark S2.</li><li>Dural sac and subarachnoid space (with CSF) end here; the filum terminale continues to the coccyx.</li></ul>'}
];
function levelsSVG(sel){
  const verts=[...Array(7)].map((_,i)=>'C'+(i+1)).concat([...Array(12)].map((_,i)=>'T'+(i+1)),[...Array(5)].map((_,i)=>'L'+(i+1)),['S1','S2','S3']);
  const y0=14, h=17.5, x=118;
  let body='', lbls='';
  const LV=LEVELS.find(l=>l.k===sel);
  verts.forEach((v,i)=>{
    const y=y0+i*h, w=v[0]==='C'?44:v[0]==='T'?54:v[0]==='L'?66:58, on=LV&&LV.v===v, mark=LEVELS.find(l=>l.v===v);
    const fill=v[0]==='S'?'color-mix(in srgb,var(--bone) 75%,var(--bone-line))':'var(--bone)';
    body+=`<rect x="${x-w/2}" y="${y}" width="${w}" height="${h-3}" rx="4" fill="${on?'var(--clin)':fill}" stroke="var(--bone-line)" stroke-width="1.2"/>`;
    body+=tl(x-w/2-8,y+h/2+1,v,'xs','end');
    if(mark){const lx=x+w/2+6; body+=`<g data-k="${mark.k}"><rect class="hit" x="${lx-4}" y="${y-2}" width="210" height="${h+1}" fill="transparent"/><path d="M${lx},${y+h/2-1.5} H${lx+16}" stroke="${on?'var(--clin)':'var(--line-2)'}" stroke-width="${on?2.5:1.2}"/>`+tl(lx+20,y+h/2+2,mark.label.split(' · ')[1],on?'b':'xs')+'</g>';}
  });
  return svg('0 0 340 492','Vertebral levels from C1 to the sacrum with key landmarks',body);
}
/* ---------------------------------------------------------------- abdominal regions */
const REGIONS=[
  {k:'rh',label:'R hypochondrium',html:dl([['Contains','Right lobe of liver, gallbladder, hepatic flexure, upper right kidney'],['Pain suggests','Biliary colic, cholecystitis (Murphy\'s sign), hepatitis, right lower lobe pneumonia']])},
  {k:'ep',label:'Epigastric',html:dl([['Contains','Stomach, left lobe of liver, pancreas, duodenum (1st part), aorta and coeliac trunk'],['Pain suggests','Peptic ulcer, gastritis, pancreatitis (radiating to the back), myocardial infarction (always consider), early appendicitis (foregut/midgut boundary)']])},
  {k:'lh',label:'L hypochondrium',html:dl([['Contains','Spleen, stomach fundus, splenic flexure, tail of pancreas, upper left kidney'],['Pain suggests','Splenic injury or infarct, gastric pathology']])},
  {k:'rf',label:'R flank',html:dl([['Contains','Ascending colon, right kidney, small bowel'],['Pain suggests','Renal colic, pyelonephritis (loin to groin)']])},
  {k:'um',label:'Umbilical',html:dl([['Contains','Jejunum and ileum, transverse colon, aortic bifurcation, duodenum (3rd part)'],['Pain suggests','Early appendicitis (midgut visceral pain, T10), small bowel obstruction, AAA, mesenteric ischaemia']])},
  {k:'lf',label:'L flank',html:dl([['Contains','Descending colon, left kidney'],['Pain suggests','Renal colic, diverticulitis (descending)']])},
  {k:'ri',label:'R iliac fossa',html:dl([['Contains','Caecum, appendix, terminal ileum, right ovary and tube'],['Pain suggests','Appendicitis (McBurney\'s point), Crohn\'s terminal ileitis, ectopic pregnancy, ovarian torsion, inguinal hernia']])},
  {k:'hy',label:'Hypogastric',html:dl([['Contains','Bladder (when full), uterus, sigmoid colon, rectum'],['Pain suggests','Cystitis, urinary retention, pelvic inflammatory disease; hindgut (colonic) visceral pain']])},
  {k:'li',label:'L iliac fossa',html:dl([['Contains','Sigmoid colon, left ovary and tube'],['Pain suggests','Sigmoid diverticulitis, ectopic pregnancy, ovarian cyst, inguinal hernia']])}
];
function regionsSVG(sel){
  const xs=[64,138,222,296], ys=[70,162,236,318];
  let cells='';
  REGIONS.forEach((r,i)=>{const c=i%3, rw=Math.floor(i/3), x=xs[c], y=ys[rw], w=xs[c+1]-x, h=ys[rw+1]-y, on=sel===r.k;
    cells+=`<g data-k="${r.k}" aria-label="${r.label}"><rect class="nx-s" x="${x+2}" y="${y+2}" width="${w-4}" height="${h-4}" rx="8" fill="${on?'var(--clin-tint)':'color-mix(in srgb,var(--sys-gi) 10%,var(--paper))'}" stroke="${on?'var(--clin)':'var(--line-2)'}" stroke-width="${on?3:1.2}"/>${tl(x+w/2,y+h/2-3,r.label.split(' '),on?'b':'sm','middle',13)}</g>`;});
  return svg('0 0 360 400','Nine regions of the abdomen',
    `<path d="M70,30 C90,48 120,58 180,58 C240,58 270,48 290,30 L312,180 C318,250 316,330 300,372 C260,392 100,392 60,372 C44,330 42,250 48,180 Z" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="1.6"/>
    <path d="M40,162 H320 M40,236 H320" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="6 4"/><path d="M138,46 V380 M222,46 V380" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="6 4"/>
    ${cells}
    ${tl(326,166,['Subcostal','(L3)'],'xs')}${tl(326,240,['Trans-','tubercular (L5)'],'xs')}${tl(138,394,'MCL','xs','middle')}${tl(222,394,'MCL','xs','middle')}
    <circle cx="180" cy="210" r="4" fill="var(--ink-2)"/>`);
}
/* ---------------------------------------------------------------- mediastinum */
const MEDI=[
  {k:'sup',label:'Superior',title:'Superior mediastinum (thoracic inlet to T4/5)',html:dl([['Contents','Thymus, great veins (brachiocephalic veins, upper SVC), aortic arch and its three branches, trachea, oesophagus, thoracic duct, vagus and phrenic nerves, left recurrent laryngeal nerve, lymph nodes'],['Mnemonic','"Try To Eat Toast And Vitamins Now, Laura": Thymus, Trachea, Esophagus, Thoracic duct, Aortic arch, Veins, Nerves, Lymphatics'],['Clinical','A widened superior mediastinum on X-ray suggests aortic dissection or rupture, lymphoma or a retrosternal goitre.']])},
  {k:'ant',label:'Anterior',title:'Anterior mediastinum (sternum to pericardium)',html:dl([['Contents','Remnants of the thymus, fat, lymph nodes, sternopericardial ligaments'],['Clinical','The "four Ts" of an anterior mediastinal mass: thymoma, teratoma, thyroid (retrosternal), terrible lymphoma.']])},
  {k:'mid',label:'Middle',title:'Middle mediastinum (the pericardium and its contents)',html:dl([['Contents','Heart and pericardium, ascending aorta, pulmonary trunk and arteries, pulmonary veins, lower SVC, terminal IVC, phrenic nerves (running on the pericardium), main bronchi and hila'],['Clinical','Pericardial effusion and tamponade; the phrenic nerves pass in front of the lung roots, the vagus nerves behind.']])},
  {k:'post',label:'Posterior',title:'Posterior mediastinum (pericardium to T5–T12)',html:dl([['Contents','Descending thoracic aorta, azygos and hemiazygos veins, thoracic duct, oesophagus, vagus nerves, thoracic splanchnic nerves and sympathetic chains (alongside), lymph nodes'],['Mnemonic','"The DATES": Descending aorta, Azygos, Thoracic duct, Esophagus, Sympathetic/splanchnic nerves (plus vagus)'],['Clinical','The oesophagus lies directly behind the left atrium: an enlarged left atrium can cause difficulty swallowing; transoesophageal echo images the heart from here.']])}
];
function mediSVG(sel){
  const reg={sup:'M120,60 L296,60 L300,170 L104,170 Z',ant:'M104,170 L150,170 L156,214 C150,270 130,320 106,350 L92,350 Z',
    mid:'M156,176 C200,170 240,172 262,190 C286,230 284,300 250,330 C220,350 180,348 160,330 C140,300 140,230 156,176 Z',
    post:'M262,176 L300,170 L304,380 L246,380 C268,350 290,300 290,250 C290,220 280,196 262,176 Z'};
  const cols={sup:'--sys-resp',ant:'--sys-lymph',mid:'--sys-cvs',post:'--sys-gi'};
  let r='';
  Object.entries(reg).forEach(([k,d])=>{const on=sel===k, it=MEDI.find(m=>m.k===k);
    r+=`<g data-k="${k}" aria-label="${it.label} mediastinum"><path class="nx-s" d="${d}" fill="color-mix(in srgb,var(${cols[k]}) ${on?55:22}%,var(--paper))" stroke="var(${cols[k]})" stroke-width="${on?3:1.4}"/></g>`;});
  const vert=[...Array(12)].map((_,i)=>`<rect x="306" y="${48+i*29}" width="38" height="25" rx="4" fill="var(--bone)" stroke="var(--bone-line)"/>${tl(325,64+i*29,'T'+(i+1),'xs','middle')}`).join('');
  return svg('0 0 380 420','Divisions of the mediastinum in sagittal section',
    `<path d="M88,44 L104,170 L96,360" fill="none" stroke="var(--bone-line)" stroke-width="10" stroke-linecap="round"/>${tl(60,110,['Manubrium'],'xs','middle')}${tl(60,270,['Sternum'],'xs','middle')}
    ${vert}${r}<path d="M100,170 L306,166" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 4"/>
    ${tl(92,172,['Sternal angle','(T4/5 disc)'],'xs','end')}
    <g pointer-events="none">${tl(208,118,'SUPERIOR','hd','middle')}${tl(120,250,'ANT','hd','middle')}${tl(212,262,'MIDDLE','hd','middle')}${tl(278,360,'POST','hd','middle')}</g>
    <path d="M110,392 C180,370 250,370 304,392" fill="none" stroke="var(--ink-2)" stroke-width="3"/>${tl(206,410,'Diaphragm','xs','middle')}`);
}
/* ---------------------------------------------------------------- auscultation */
const AUSC=[
  {k:'aortic',label:'Aortic',title:'Aortic area: 2nd intercostal space, right sternal edge',html:dl([['Listen for','Aortic stenosis: ejection systolic murmur radiating to the carotids; aortic regurgitation: early diastolic murmur (best at the left sternal edge, patient sitting forward, breath held in expiration)'],['Remember','Areas are where valve sounds are best heard downstream, not where the valves lie (all four valves sit behind the sternum).']])},
  {k:'pulm',label:'Pulmonary',title:'Pulmonary area: 2nd intercostal space, left sternal edge',html:dl([['Listen for','Splitting of S2 (louder on inspiration); pulmonary stenosis']])},
  {k:'erb',label:"Erb's point",title:"Erb's point: 3rd intercostal space, left sternal edge",html:dl([['Listen for','Aortic regurgitation; a good place to hear both S1 and S2']])},
  {k:'tri',label:'Tricuspid',title:'Tricuspid area: 4th intercostal space, left sternal edge',html:dl([['Listen for','Tricuspid regurgitation: pansystolic, louder on inspiration (common in IV drug-use endocarditis)']])},
  {k:'mitral',label:'Mitral',title:'Mitral area: apex, 5th intercostal space, mid-clavicular line',html:dl([['Listen for','Mitral regurgitation: pansystolic murmur radiating to the axilla. Mitral stenosis: low mid-diastolic rumble with the bell, patient rolled onto the left side'],['Apex beat','Normally here; displaced laterally in left ventricular dilatation.']])}
];
function auscSVG(sel){
  const P={aortic:[150,118],pulm:[210,118],erb:[214,158],tri:[206,214],mitral:[262,238]};
  let ribs=''; for(let i=0;i<7;i++){const y=84+i*40; ribs+=`<path d="M60,${y+8} C100,${y-10} 150,${y-6} 168,${y}" fill="none" stroke="var(--bone-line)" stroke-width="5" opacity=".45"/><path d="M300,${y+8} C260,${y-10} 210,${y-6} 192,${y}" fill="none" stroke="var(--bone-line)" stroke-width="5" opacity=".45"/>`+tl(316,y+12,(i+1)+'','xs');}
  let pts='';
  Object.entries(P).forEach(([k,[x,y]])=>{const on=sel===k, it=AUSC.find(a=>a.k===k);
    pts+=`<g data-k="${k}" aria-label="${it.label} area"><circle class="hit" cx="${x}" cy="${y}" r="24" fill="transparent"/><circle class="nx-s" cx="${x}" cy="${y}" r="13" fill="${on?'var(--clin)':'var(--artery-tint)'}" stroke="var(--artery)" stroke-width="2.4"/>${tl(x,y+4,it.label[0],'b','middle')}</g>`;});
  return svg('0 0 360 340','Auscultation areas on the anterior chest',
    `<path d="M40,60 C90,40 270,40 320,60 L330,330 L30,330 Z" fill="var(--paper)" stroke="var(--line-2)"/>${ribs}
    <rect x="166" y="70" width="28" height="210" rx="10" fill="var(--bone)" stroke="var(--bone-line)"/>${tl(180,64,'Sternum','xs','middle')}
    <path d="M168,186 C190,180 240,182 290,230 C300,254 280,268 252,262 C210,256 190,240 168,236 Z" fill="var(--artery-tint)" opacity=".55" stroke="var(--artery)" stroke-dasharray="4 3"/>
    ${pts}${tl(330,52,'Rib','xs','end')}`);
}
/* ---------------------------------------------------------------- neck triangles */
const NECK=[
  {k:'subm',label:'Submental',title:'Submental triangle (anterior)',html:dl([['Boundaries','Anterior bellies of both digastrics and the hyoid bone (midline, unpaired)'],['Contents','Submental lymph nodes (level Ia), small veins forming the anterior jugular vein']])},
  {k:'subman',label:'Submandibular',title:'Submandibular (digastric) triangle (anterior)',html:dl([['Boundaries','Lower border of the mandible and the anterior and posterior bellies of digastric'],['Contents','Submandibular gland and nodes (level Ib), facial artery and vein, hypoglossal nerve, nerve to mylohyoid']])},
  {k:'carotid',label:'Carotid',title:'Carotid triangle (anterior)',html:dl([['Boundaries','Posterior belly of digastric, superior belly of omohyoid, anterior border of sternocleidomastoid'],['Contents','Carotid bifurcation (C4), carotid sinus and body, internal jugular vein, vagus nerve, hypoglossal nerve, ansa cervicalis, deep cervical nodes'],['Clinical','Carotid pulse is felt here; carotid endarterectomy and the carotid sinus massage site.']])},
  {k:'musc',label:'Muscular',title:'Muscular triangle (anterior)',html:dl([['Boundaries','Midline of the neck, superior belly of omohyoid, anterior border of sternocleidomastoid'],['Contents','Infrahyoid (strap) muscles, thyroid and parathyroid glands, larynx, trachea, oesophagus']])},
  {k:'occ',label:'Occipital',title:'Occipital triangle (posterior)',html:dl([['Boundaries','Posterior border of sternocleidomastoid, anterior border of trapezius, inferior belly of omohyoid'],['Contents','<b>Accessory nerve (XI)</b> crossing superficially to trapezius, cervical plexus branches emerging at Erb\'s point, occipital nodes'],['Clinical','Lymph node biopsy here can cut XI: weak shrug and drooping shoulder.']])},
  {k:'supra',label:'Supraclavicular',title:'Supraclavicular (subclavian) triangle (posterior)',html:dl([['Boundaries','Inferior belly of omohyoid, clavicle, posterior border of sternocleidomastoid'],['Contents','Subclavian artery (3rd part), trunks of the brachial plexus, external jugular vein, supraclavicular nodes (left one = Virchow\'s node)'],['Clinical','Supraclavicular brachial plexus block; a hard left supraclavicular node suggests abdominal malignancy (Troisier\'s sign).']])}
];
function neckSVG(sel){
  const R={subm:'M318,214 L276,230 L296,262 L334,250 Z',subman:'M276,230 L196,214 C200,200 228,192 262,192 L318,206 L318,214 Z',
    carotid:'M196,214 L276,230 L262,282 L214,300 C204,270 198,240 196,214 Z',musc:'M276,230 L296,262 L334,250 L340,372 L250,378 L214,300 L262,282 Z',
    occ:'M186,214 C190,250 196,280 206,308 L150,330 C130,290 126,250 128,214 Z',supra:'M150,330 L206,308 C214,330 224,356 236,380 L150,380 Z'};
  const cols={subm:'--sys-endo',subman:'--sys-gi',carotid:'--sys-cvs',musc:'--sys-resp',occ:'--sys-lymph',supra:'--sys-nerv'};
  let r='';
  Object.entries(R).forEach(([k,d])=>{const on=sel===k, it=NECK.find(n=>n.k===k);
    r+=`<g data-k="${k}" aria-label="${it.label} triangle"><path class="nx-s" d="${d}" fill="color-mix(in srgb,var(${cols[k]}) ${on?58:26}%,var(--paper))" stroke="var(${cols[k]})" stroke-width="${on?3:1.4}"/></g>`;});
  return svg('0 0 380 400','Triangles of the neck, lateral view, face to the right',
    `<path d="M120,40 C170,20 260,24 300,60 C330,90 344,130 340,170 L346,200 L322,212 L262,192 C230,192 200,200 190,214 L126,214 C112,160 104,90 120,40 Z" fill="color-mix(in srgb,var(--sys-skin) 14%,var(--paper))" stroke="var(--line-2)"/>
    ${r}
    <path d="M206,308 C196,270 190,240 188,206 L178,206 C182,246 190,282 200,314 L236,382 L250,378 Z" fill="color-mix(in srgb,var(--muscle) 50%,var(--paper))" stroke="var(--muscle)" pointer-events="none"/>
    <path class="ldr" d="M108,264 L198,270"/>${tl(104,268,['SCM'],'xs b','end')}
    <path d="M128,214 C124,280 132,340 150,382" fill="none" stroke="var(--muscle)" stroke-width="6" opacity=".6" pointer-events="none"/>${tl(110,300,'Trapezius','xs','end')}
    <path d="M150,384 L340,374" stroke="var(--bone-line)" stroke-width="8" stroke-linecap="round" pointer-events="none"/>${tl(250,396,'Clavicle','xs','middle')}
    <path d="M196,214 C230,200 280,200 340,206" fill="none" stroke="var(--bone-line)" stroke-width="5" pointer-events="none"/>${tl(330,198,'Mandible','xs','end')}
    <circle cx="300" cy="246" r="5" fill="var(--bone)" stroke="var(--bone-line)" pointer-events="none"/><path class="ldr" d="M305,248 L344,266"/>${tl(346,272,'Hyoid','xs')}
    <circle cx="194" cy="236" r="4" fill="var(--nerve)" pointer-events="none"/><path class="ldr" d="M108,232 L190,236"/>${tl(104,236,"Erb's point",'xs','end')}`);
}

const W={
  levels:{items:LEVELS,draw:levelsSVG,label:'Vertebral levels',intro:'Choose a level to see what lies there. These landmarks recur across every regional chapter.'},
  regions:{items:REGIONS.map(r=>({...r,title:r.label+' region'})),draw:regionsSVG,label:'Abdominal regions',intro:'Tap a region to see what lies under it and what pain there suggests.'},
  mediastinum:{items:MEDI,draw:mediSVG,label:'Mediastinal divisions',intro:'Tap a division of the mediastinum to see its contents.'},
  ausc:{items:AUSC,draw:auscSVG,label:'Auscultation areas',intro:'Tap an area to see which valve it is named after and what you listen for.'},
  neck:{items:NECK,draw:neckSVG,label:'Triangles of the neck',intro:'Tap a triangle to see its boundaries and contents.'}
};
document.querySelectorAll('[data-widget]').forEach(h=>{const w=W[h.dataset.widget]; if(w) mount(h,w);});
window.ATLAS_LEVELS=LEVELS;
})();
