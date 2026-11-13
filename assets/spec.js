/* The unofficial Year 1 anatomy spec: learning objectives by area, red/amber/green self-rating saved on this device,
   progress bars, a clickable body map and revision flowcharts. Renders into the #panel-spec shell in index.html. */
(function(){
'use strict';
const {esc,tl}=window.ATLAS_UTIL;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const KEY='atlas-spec';
const LS={get(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return {};}},set(v){try{localStorage.setItem(KEY,JSON.stringify(v));}catch(e){}}};

/* Each objective: [text, section id to study it]. Kept to Year 1 depth. */
const AREAS=[
 {id:'found',name:'Foundations',tab:'systems',c:'--sys-msk',sum:'Anatomical language, tissues, body systems and the general plan of bones, joints, muscles, vessels and nerves.',items:[
  ['Describe the anatomical position and use the planes (sagittal, coronal, axial) and terms of relation (medial, lateral, proximal, distal, superficial, deep) correctly.','language'],
  ['Define the movement terms: flexion, extension, abduction, adduction, rotation, circumduction, pronation, supination, inversion, eversion, dorsiflexion, plantarflexion.','language'],
  ['Name the twelve organ systems with their main organs and functions.','systems-map'],
  ['Describe the four basic tissues (epithelium, connective tissue, muscle, nervous tissue) with an example of each.','blueprint'],
  ['Classify joints as fibrous, cartilaginous or synovial and give an example of each type of synovial joint.','sys-msk'],
  ['Describe the structure of bone (compact, spongy, periosteum, marrow) and classify bones by shape.','sys-msk'],
  ['Compare skeletal, cardiac and smooth muscle and describe muscle shapes and fibre arrangements.','sys-musc'],
  ['Outline the divisions of the nervous system: CNS and PNS, somatic and autonomic, sympathetic and parasympathetic outflow.','sys-nerv'],
  ['Explain how a spinal nerve is formed (roots, rami) and define dermatome and myotome.','ul-dermatomes'],
  ['Describe the general plan of arteries, veins, capillaries and lymphatics, including the three layers of a vessel wall.','th-vessels'],
  ['Describe the lymphatic system: nodes, trunks, the thoracic duct, and primary and secondary lymphoid organs.','sys-lymph'],
  ['Describe the layers of the skin and its appendages.','sys-skin'],
  ['Describe superficial and deep fascia and how deep fascia makes muscle compartments.','ul-fascia'],
  ['Use embryology to explain adult anatomy: foregut, midgut and hindgut; ascent of the kidneys; descent of the testes.','ab-vessels']]},
 {id:'hn',name:'Head and neck',tab:'headneck',c:'--sys-endo',sum:'Scalp and face, neck triangles and fascia, vessels and lymph, upper airway, mouth and swallowing.',items:[
  ['List the five layers of the scalp and explain why scalp wounds bleed freely and where infection spreads.','hn-scalp'],
  ['Map facial sensation to V1, V2 and V3 and name the branches you test.','hn-scalp'],
  ['Name the five branches of the facial nerve and the muscles they supply; tell an upper from a lower motor neuron facial palsy.','hn-scalp'],
  ['Name the muscles of mastication and their nerve; predict jaw deviation in a V3 lesion.','hn-scalp'],
  ['Recall the neck vertebral levels: C3 hyoid, C4 carotid bifurcation, C6 cricoid, C7 vertebra prominens.','hn-neck'],
  ['Describe the boundaries and contents of the anterior and posterior triangles and their subdivisions.','hn-neck'],
  ['Describe the layers of deep cervical fascia and the contents of the carotid sheath.','hn-neck'],
  ['Name the branches of the external carotid artery; describe the internal carotid and vertebral arteries in the neck.','hn-vessels'],
  ['Describe the venous drainage of the head and neck and where the JVP is read.','hn-vessels'],
  ['Describe the cervical lymph node levels and how to examine a neck lump.','hn-vessels'],
  ['Describe the nasal cavity, where each paranasal sinus drains and the source of most nosebleeds.','hn-airway'],
  ['Divide the pharynx into three parts with their boundaries, lining and contents.','hn-airway'],
  ['Describe the cartilages and intrinsic muscles of the larynx and their nerve supply.','hn-airway'],
  ['Explain the causes and effects of recurrent laryngeal nerve palsy.','hn-airway'],
  ['Locate the cricothyroid membrane and describe emergency front-of-neck access.','hn-airway'],
  ['Describe the motor, sensory and taste supply of the tongue.','hn-mouth'],
  ['Describe the salivary glands, where their ducts open and their parasympathetic supply.','hn-mouth'],
  ['Describe the phases of swallowing and Waldeyer\'s ring.','hn-mouth'],
  ['Describe the thyroid gland: position, blood supply, hormones and relation to the recurrent laryngeal nerve.','sys-endo']]},
 {id:'th',name:'Thorax',tab:'thorax',c:'--sys-cvs',sum:'Chest wall and breathing, pleura and lungs, diaphragm, mediastinum, heart and great vessels.',items:[
  ['Describe typical and atypical ribs, the sternum and the costal margin.','th-wall'],
  ['Describe the intercostal muscles and the order of the neurovascular bundle (vein, artery, nerve).','th-wall'],
  ['Name the muscles of quiet and forced inspiration and expiration.','th-wall'],
  ['Locate the triangle of safety for a chest drain and the sites for needle decompression.','th-wall'],
  ['Define the thoracic inlet and explain thoracic outlet syndrome.','th-wall'],
  ['Recall the thoracic vertebral levels, especially the sternal angle (T4/5) and what happens there.','th-levels'],
  ['Describe the pleura, the pleural recesses and the surface markings of the lungs and pleura.','th-lungs'],
  ['Compare the right and left lungs: lobes, fissures and the arrangement of structures at each hilum.','th-lungs'],
  ['Describe the bronchial tree and how its lining changes from trachea to alveolus.','th-lungs'],
  ['Distinguish the pulmonary and bronchial circulations and describe the nerve supply of lungs and pleura.','th-lungs'],
  ['Describe the diaphragm: attachments, openings with their levels, and the phrenic nerve (C3–5).','th-diaphragm'],
  ['Explain referred shoulder-tip pain from the diaphragm.','th-diaphragm'],
  ['Describe the divisions of the mediastinum and the contents of each.','th-mediastinum'],
  ['Trace the oesophagus, thoracic duct, vagus and phrenic nerves through the thorax.','th-mediastinum'],
  ['Describe the pericardium, its sinuses and the anatomy of cardiac tamponade.','th-heart'],
  ['Describe the surfaces and borders of the heart and the features of each chamber.','th-heart'],
  ['Describe the four valves and locate the auscultation areas and apex beat.','th-heart'],
  ['Describe the coronary arteries, their territories, dominance and the ECG leads for each territory.','th-heart'],
  ['Describe cardiac venous drainage through the coronary sinus.','th-heart'],
  ['Describe the conduction system and the autonomic supply of the heart.','sys-cvs'],
  ['Describe the aortic arch, its branches, and the azygos system.','th-vessels']]},
 {id:'ab',name:'Abdomen',tab:'abdomen',c:'--sys-gi',sum:'Regions and planes, wall and inguinal canal, peritoneum, gut and accessory organs, blood supply, kidneys and urinary tract.',items:[
  ['Describe the nine regions and four quadrants and the planes that define them.','ab-regions'],
  ['List the organs that lie in each abdominal region.','ab-regions'],
  ['Explain visceral, parietal and referred abdominal pain using foregut, midgut and hindgut.','ab-regions'],
  ['Describe the layers of the anterior abdominal wall and the rectus sheath above and below the arcuate line.','ab-wall'],
  ['Describe the inguinal canal: rings, walls and contents in each sex.','ab-wall'],
  ['Distinguish indirect inguinal, direct inguinal and femoral hernias.','ab-wall'],
  ['Describe the peritoneum: greater and lesser sacs, omenta, mesenteries, intra- and retroperitoneal organs.','ab-peritoneum'],
  ['Give the boundaries of the epiploic foramen.','ab-peritoneum'],
  ['Describe the four layers of the gut wall and the two enteric plexuses.','ab-gut'],
  ['Describe the oesophageal constrictions and the parts and cell types of the stomach.','ab-gut'],
  ['Describe the four parts of the duodenum and their relations.','ab-gut'],
  ['Tell jejunum from ileum and small from large intestine.','ab-gut'],
  ['Describe the appendix and the surface marking of its base (McBurney\'s point).','ab-gut'],
  ['Compare the anal canal above and below the pectinate line.','ab-gut'],
  ['Describe the liver: lobes, ligaments, porta hepatis and the lobule.','ab-liver'],
  ['Trace bile from hepatocyte to duodenum and describe Calot\'s triangle.','ab-liver'],
  ['Describe the pancreas and spleen: parts, relations and blood supply.','ab-liver'],
  ['Name the branches of the coeliac trunk, SMA and IMA and the gut each supplies.','ab-vessels'],
  ['Describe the hepatic portal system and the portosystemic anastomoses.','ab-vessels'],
  ['Describe the lymph drainage of the abdomen, the cisterna chyli and thoracic duct.','ab-vessels'],
  ['Describe the position, relations and coverings of the kidneys.','ab-urinary'],
  ['Describe the parts of the nephron and where the main diuretics act.','ab-urinary'],
  ['Trace the ureter and name the three sites where stones lodge.','ab-urinary'],
  ['Describe the bladder, the male and female urethra and the nerve control of micturition.','ab-urinary'],
  ['Outline kidney development and common anomalies (horseshoe kidney, duplex ureter).','ab-urinary']]},
 {id:'pv',name:'Pelvis and reproductive',tab:'pelvis',c:'--sys-repro',sum:'Bony pelvis, pelvic floor and perineum, female and male reproductive organs, breast.',items:[
  ['Describe the bones and palpable landmarks of the pelvis and the differences between female and male pelves.','pv-bones'],
  ['Describe what passes through the greater and lesser sciatic foramina and the obturator canal.','pv-bones'],
  ['Name the main branches of the internal iliac artery.','pv-bones'],
  ['Describe the pelvic floor muscles and their nerve supply.','pv-floor'],
  ['Describe the perineum: urogenital and anal triangles, perineal body, ischioanal fossa.','pv-floor'],
  ['Trace the pudendal nerve and describe a pudendal block.','pv-floor'],
  ['Describe the uterus, uterine tubes and ovaries: position, parts and layers of the uterine wall.','pv-female'],
  ['Describe the ligaments that support the uterus and cervix.','pv-female'],
  ['Describe the blood supply and lymph drainage of the female reproductive organs, including the ureter passing under the uterine artery.','pv-female'],
  ['Describe the testis, epididymis, vas deferens and the layers and contents of the spermatic cord.','pv-male'],
  ['Describe the prostate, seminal vesicles and bulbourethral glands and what each adds to semen.','pv-male'],
  ['Contrast lymph drainage of the testis (para-aortic) and scrotum (superficial inguinal).','pv-male'],
  ['Explain the nerve control of erection, emission and ejaculation.','pv-male'],
  ['Explain testicular torsion and left-sided varicocele from the anatomy.','pv-male'],
  ['Describe the structure, blood supply and lymph drainage of the breast.','pv-breast'],
  ['Outline the hypothalamic–pituitary–gonadal axis and the menstrual cycle.','sys-repro']]},
 {id:'ul',name:'Upper limb',tab:'upper',c:'--sys-musc',sum:'Bones and joints, muscles, brachial plexus and nerve injuries, vessels, lymph and regions.',items:[
  ['Identify the main features of the clavicle, scapula, humerus, radius, ulna and carpal bones.','ul-bones'],
  ['Describe the shoulder, elbow and wrist joints: type, ligaments, movements and stabilisers.','ul-joints'],
  ['Name the rotator cuff muscles with their actions and nerves.','ul-muscles'],
  ['Describe the muscle compartments of arm and forearm with their nerve supply.','ul-muscles'],
  ['Draw the brachial plexus: roots, trunks, divisions, cords and terminal branches.','ul-plexus'],
  ['Trace the courses of the axillary, musculocutaneous, radial, median and ulnar nerves.','ul-nerve-courses'],
  ['Predict the deficit from each nerve injury (wrist drop, claw hand, ape hand, winged scapula) and from Erb\'s and Klumpke\'s palsies.','ul-nerve-injury'],
  ['Map the upper limb dermatomes, myotomes and reflexes.','ul-dermatomes'],
  ['Trace the arterial supply from subclavian to palmar arches and locate the pulses.','ul-arteries'],
  ['Describe the superficial veins and the venepuncture site in the cubital fossa.','ul-veins'],
  ['Describe the lymph drainage of the upper limb and the axillary node groups.','ul-lymph'],
  ['Describe the boundaries and contents of the axilla, cubital fossa, carpal tunnel and anatomical snuffbox.','ul-regions'],
  ['Explain common injuries: clavicle, scaphoid, supracondylar and Colles\' fractures; carpal tunnel syndrome.','ul-clinical']]},
 {id:'ll',name:'Lower limb',tab:'lower',c:'--sys-skin',sum:'Bones and joints, gluteal region, compartments, lumbar and sacral plexuses, vessels, lymph and regions.',items:[
  ['Identify the main features of the hip bone, femur, patella, tibia, fibula and foot bones.','ll-bones'],
  ['Describe the hip, knee and ankle joints: ligaments, menisci, movements and stabilisers.','ll-joints'],
  ['Describe the gluteal muscles and the safe site for intramuscular injection.','ll-muscles'],
  ['Describe the muscle compartments of the thigh and leg with their nerve supply.','ll-muscles'],
  ['Describe the lumbar and sacral plexuses and their main branches with roots.','ll-plexus'],
  ['Trace the femoral, obturator, sciatic, tibial and common fibular nerves.','ll-nerve-courses'],
  ['Predict the deficit from each nerve injury (foot drop, Trendelenburg gait, weak knee extension).','ll-nerve-injury'],
  ['Map the lower limb dermatomes, myotomes and the knee and ankle reflexes.','ll-dermatomes'],
  ['Trace the arterial supply from external iliac to the foot and locate the pulses.','ll-arteries'],
  ['Describe the great and small saphenous veins, perforators and why DVT matters.','ll-veins'],
  ['Describe the lymph drainage of the lower limb and the inguinal nodes.','ll-lymph'],
  ['Describe the femoral triangle, adductor canal and popliteal fossa.','ll-regions'],
  ['Explain neck of femur fracture blood supply, the unhappy triad, ankle sprains and compartment syndrome.','ll-clinical']]},
 {id:'ns',name:'Nervous system',tab:'neuro',c:'--sys-nerv',sum:'Neurons and pathways, skull, meninges and CSF, brain, blood supply, cranial nerves, spinal cord and vertebral column.',items:[
  ['Describe neurons, glia and the basic neuronal chain from receptor to effector.','neuro-chain'],
  ['Identify the skull bones, sutures and fontanelles, and the foramina of the cranial fossae.','neuro-skull'],
  ['Describe the meninges, their spaces and extradural, subdural and subarachnoid haemorrhage.','neuro-meninges'],
  ['Describe the dural venous sinuses and how blood drains from the brain.','neuro-meninges'],
  ['Describe CSF production, flow and absorption, and hydrocephalus.','neuro-meninges'],
  ['Describe the lobes and functional areas of the cortex and the effects of lesions.','neuro-lobes'],
  ['Describe the roles of the basal ganglia, thalamus, cerebellum and brainstem.','neuro-lobes'],
  ['Describe the circle of Willis and the ACA, MCA and PCA territories and stroke syndromes.','neuro-blood'],
  ['Name the twelve cranial nerves with their foramina, components and bedside tests.','neuro-cn'],
  ['Describe lesions of cranial nerves III, VI, VII and XII.','neuro-cn'],
  ['Describe the spinal cord: segments, grey and white matter, the conus and cauda equina.','neuro-cord'],
  ['Trace the DCML, spinothalamic and corticospinal tracts, where each crosses, and Brown-Séquard syndrome.','neuro-cord'],
  ['Tell upper motor neuron signs from lower motor neuron signs.','neuro-cord'],
  ['Describe the regions of the vertebral column and the features of typical cervical, thoracic and lumbar vertebrae.','neuro-spine'],
  ['Describe the intervertebral disc and which root a posterolateral prolapse compresses.','neuro-spine'],
  ['List the layers a lumbar puncture needle passes and the level used.','neuro-spine'],
  ['Recognise cauda equina syndrome as a surgical emergency.','neuro-spine'],
  ['Describe the autonomic nervous system outflows and neurotransmitters.','sys-nerv']]},
 {id:'sk',name:'Surface anatomy and FY1 skills',tab:'thorax',c:'--sys-resp',sum:'Landmarks you will use on the ward: pulses, cannulation, injections, drains and emergency access.',items:[
  ['Locate the carotid, brachial, radial, femoral, popliteal, posterior tibial and dorsalis pedis pulses.','ll-arteries'],
  ['Locate the veins used for venepuncture and cannulation, and the femoral vein for emergency access (NAVY).','ul-veins'],
  ['Locate the safe intramuscular injection sites: deltoid, ventrogluteal and vastus lateralis.','ll-muscles'],
  ['Count ribs and spaces from the sternal angle and mark the surface anatomy of heart and lungs.','th-levels'],
  ['Locate the apex beat and the four auscultation areas.','th-heart'],
  ['Locate McBurney\'s point, Murphy\'s point and the renal angle.','ab-regions'],
  ['Locate the landmarks for lumbar puncture, chest drain and cricothyroidotomy.','th-wall'],
  ['Read the outline of the mediastinum on a chest X-ray and name the structures forming each border.','th-heart'],
  ['Examine for cervical, axillary and inguinal lymphadenopathy.','hn-vessels']]}
];

const total=AREAS.reduce((n,a)=>n+a.items.length,0);
let st=LS.get(), filter='all';
const id=(a,i)=>a.id+'-'+(i+1);
const RATE={r:'Red: not yet',a:'Amber: shaky',g:'Green: could teach it'};

function counts(a){const c={r:0,a:0,g:0,u:0}; a.items.forEach((_,i)=>{c[st[id(a,i)]||'u']++;}); return c;}
function bar(c,n){const p=k=>(c[k]/n*100).toFixed(1)+'%';
  return `<div class="spec-bar" role="img" aria-label="${c.g} green, ${c.a} amber, ${c.r} red, ${c.u} not rated, out of ${n}"><span class="g" style="width:${p('g')}"></span><span class="a" style="width:${p('a')}"></span><span class="r" style="width:${p('r')}"></span></div>`;}

function drawProgress(){
  const host=$('#spec-progress-out'); if(!host) return;
  const all={r:0,a:0,g:0,u:0}; AREAS.forEach(a=>{const c=counts(a); Object.keys(all).forEach(k=>all[k]+=c[k]);});
  host.innerHTML=`<div class="spec-total"><b>${all.g}</b> of ${total} objectives green · ${all.a} amber · ${all.r} red · ${all.u} not rated</div>${bar(all,total)}
   <div class="spec-areas">${AREAS.map(a=>{const c=counts(a); return `<a class="spec-area" href="#spec-${a.id}" style="--c:var(${a.c})"><span class="spec-an">${esc(a.name)}</span><span class="small muted">${c.g}/${a.items.length} green</span>${bar(c,a.items.length)}</a>`;}).join('')}</div>`;
}

function drawList(){
  const host=$('#spec-list-out'); if(!host) return;
  const open=new Set($$('details.spec-sec[open]',host).map(d=>d.dataset.a));
  const first=!host.dataset.done;
  host.innerHTML=AREAS.map((a,ai)=>{
    const rows=a.items.map((it,i)=>{const k=id(a,i), v=st[k]||'u';
      if(filter!=='all'&&filter!==v) return '';
      return `<li class="spec-obj" data-k="${k}" data-v="${v}"><span class="spec-n">${k.toUpperCase()}</span><span class="spec-t">${esc(it[0])} <a href="#${it[1]}" class="spec-go">Study&nbsp;→</a></span>
        <span class="spec-rag" role="group" aria-label="Rate: ${esc(it[0].slice(0,60))}">${['r','a','g'].map(r=>`<button class="rag rag-${r}" data-r="${r}" aria-pressed="${v===r}" title="${RATE[r]}"><span class="sr">${RATE[r]}</span></button>`).join('')}</span></li>`;}).join('');
    const c=counts(a), isOpen=first?ai===0:open.has(a.id)||filter!=='all';
    return `<details class="spec-sec" id="spec-${a.id}" data-a="${a.id}" style="--c:var(${a.c})"${isOpen?' open':''}><summary><span class="spec-h">${esc(a.name)}</span><span class="small muted">${a.items.length} objectives · ${c.g} green</span></summary>
      <p class="small muted spec-sum">${esc(a.sum)} <a href="#${a.tab}">Open the chapter →</a></p>${rows?`<ol class="spec-ol">${rows}</ol>`:'<p class="small muted">Nothing in this filter.</p>'}</details>`;
  }).join('');
  host.dataset.done='1';
  syncExpand();
}
function syncExpand(){const ex=$('#spec-expand'); if(ex) ex.textContent=$$('details.spec-sec').some(d=>!d.open)?'Expand all':'Collapse all';}

function wire(){
  const list=$('#spec-list-out'); if(!list) return;
  list.addEventListener('click',e=>{const b=e.target.closest('.rag'); if(!b) return;
    const li=b.closest('.spec-obj'), k=li.dataset.k, r=b.dataset.r;
    if(st[k]===r) delete st[k]; else st[k]=r;
    LS.set(st);
    li.dataset.v=st[k]||'u'; $$('.rag',li).forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.r===st[k])));
    const sec=li.closest('details'), a=AREAS.find(x=>x.id===sec.dataset.a), c=counts(a);
    $('summary .small',sec).textContent=`${a.items.length} objectives · ${c.g} green`;
    drawProgress(); drawMap(curRegion);
  });
  $$('#spec-filter .pbtn').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.f;
    $$('#spec-filter .pbtn').forEach(x=>x.setAttribute('aria-pressed',String(x===b))); drawList();}));
  const ex=$('#spec-expand'); if(ex) ex.addEventListener('click',()=>{const ds=$$('details.spec-sec'), anyClosed=ds.some(d=>!d.open); ds.forEach(d=>d.open=anyClosed); syncExpand();});
  list.addEventListener('toggle',syncExpand,true);
  const pr=$('#spec-print'); if(pr) pr.addEventListener('click',()=>{$$('details.spec-sec').forEach(d=>d.open=true); window.print();});
  const rs=$('#spec-reset'), rm=$('#spec-reset-msg'); let armed=false;
  if(rs) rs.addEventListener('click',()=>{if(!armed){armed=true; rs.textContent='Click again to clear'; setTimeout(()=>{armed=false; rs.textContent='Clear my ratings';},4000); return;}
    armed=false; st={}; LS.set(st); rs.textContent='Clear my ratings'; rm.textContent='Ratings cleared.'; drawProgress(); drawList(); drawMap(curRegion);});
}

/* ------------------------------------------------ clickable body map */
const REG=[
 {k:'hn',go:'headneck',a:'hn',label:'Head and neck',d:'M100,22 C100,4 140,4 140,22 L142,52 C142,66 134,74 128,76 L128,92 L112,92 L112,76 C106,74 98,66 98,52 Z'},
 {k:'ns',go:'neuro',a:'ns',label:'Brain and spine',d:'M106,20 C108,10 132,10 134,20 C136,30 130,36 120,36 C110,36 104,30 106,20 Z'},
 {k:'th',go:'thorax',a:'th',label:'Thorax',d:'M84,98 L156,98 C166,104 168,120 166,140 L162,176 L78,176 L74,140 C72,120 74,104 84,98 Z'},
 {k:'ab',go:'abdomen',a:'ab',label:'Abdomen',d:'M78,178 L162,178 L164,226 L76,226 Z'},
 {k:'pv',go:'pelvis',a:'pv',label:'Pelvis and perineum',d:'M76,228 L164,228 C168,246 160,262 146,270 L120,280 L94,270 C80,262 72,246 76,228 Z'},
 {k:'ulL',go:'upper',a:'ul',label:'Upper limb',d:'M72,104 C58,110 54,130 52,160 L46,230 L40,282 L54,286 L62,232 L70,170 L74,140 Z'},
 {k:'ulR',go:'upper',a:'ul',label:'Upper limb',d:'M168,104 C182,110 186,130 188,160 L194,230 L200,282 L186,286 L178,232 L170,170 L166,140 Z'},
 {k:'llL',go:'lower',a:'ll',label:'Lower limb',d:'M90,272 L118,284 L114,360 L112,440 L114,466 L92,466 L94,440 L88,360 C84,320 84,290 90,272 Z'},
 {k:'llR',go:'lower',a:'ll',label:'Lower limb',d:'M150,272 L122,284 L126,360 L128,440 L126,466 L148,466 L146,440 L152,360 C156,320 156,290 150,272 Z'}
];
let curRegion=null;
function drawMap(sel){
  const fig=$('#spec-map-fig'), det=$('#spec-map-det'); if(!fig) return;
  curRegion=sel;
  const selA=sel&&REG.find(r=>r.k===sel).a;
  const shapes=REG.map(r=>{const A=AREAS.find(x=>x.id===r.a), on=selA===r.a, c=counts(A), pct=Math.round(c.g/A.items.length*100);
    return `<g data-k="${r.k}" aria-label="${esc(r.label)}: ${pct}% green"><path class="nx-s" d="${r.d}" fill="color-mix(in srgb,var(${A.c}) ${on?60:22+Math.round(pct*.35)}%,var(--paper))" stroke="var(${A.c})" stroke-width="${on?3:1.5}"/></g>`;}).join('');
  const L=(x,y,t,a,x2,y2)=>`<path d="M${x2},${y2} L${a==='end'?x+4:x-4},${y-4}" class="ldr"/>`+tl(x,y,t,'sm',a);
  fig.innerHTML=`<svg class="nx" viewBox="-60 0 370 480" role="group" aria-label="Body map: choose a region">${shapes}
    <path d="M120,96 L120,276" stroke="var(--sys-nerv)" stroke-width="3" stroke-dasharray="5 5" pointer-events="none" opacity=".8"/>
    ${L(214,24,'Brain and spine','start',130,24)}${L(214,62,'Head and neck','start',140,60)}${L(214,138,'Thorax','start',166,138)}${L(214,204,'Abdomen','start',162,204)}${L(214,252,'Pelvis','start',158,252)}
    ${L(22,200,'Upper limb','end',50,200)}${L(66,380,'Lower limb','end',88,380)}</svg>`;
  $$('[data-k]',fig).forEach(g=>{g.setAttribute('tabindex','0'); g.setAttribute('role','button'); g.classList.add('nx-t');
    const go=()=>{drawMap(g.dataset.k); const b=$('#spec-map-det button'); if(b) b.focus({preventScroll:true});};
    g.addEventListener('click',go); g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); go();}});});
  $$('#spec-map-btns .pbtn').forEach(b=>b.setAttribute('aria-pressed',String(!!sel&&REG.find(r=>r.k===b.dataset.k).a===selA)));
  if(!sel){det.innerHTML='<b>Choose a region</b><p>Tap part of the body, or use the buttons, to see what that chapter covers and how much of it you have rated green.</p>'; return;}
  const r=REG.find(x=>x.k===sel), A=AREAS.find(x=>x.id===r.a), c=counts(A);
  det.innerHTML=`<b>${esc(A.name)}</b><p>${esc(A.sum)}</p>${bar(c,A.items.length)}<p class="small muted">${c.g} green, ${c.a} amber, ${c.r} red, ${c.u} not rated of ${A.items.length}.</p>
    <div class="fig-tools"><a class="btn" href="#${r.go}">Open the chapter</a><a class="btn ghost" href="#spec-${A.id}">See objectives</a></div>`;
  const op=document.getElementById('spec-'+A.id); if(op) op.open=true;
}
function mapBtns(){const h=$('#spec-map-btns'); if(!h) return;
  const seen=new Set(); h.innerHTML=REG.filter(r=>{if(seen.has(r.a)) return false; seen.add(r.a); return true;}).map(r=>`<button class="pbtn" data-k="${r.k}" aria-pressed="false">${esc(r.label)}</button>`).join('');
  $$('.pbtn',h).forEach(b=>b.addEventListener('click',()=>drawMap(b.dataset.k)));}

/* ------------------------------------------------ revision flowchart (SVG with a decision diamond) */
function flowSVG(){
  const box=(x,y,w,t,cls)=>`<g><rect x="${x}" y="${y}" width="${w}" height="44" rx="10" fill="${cls==='c'?'var(--accent-tint)':cls==='m'?'var(--muscle-tint)':'var(--nerve-tint)'}" stroke="var(--line-2)"/>${tl(x+w/2,y+[].concat(t).length*-6+27,t,'sm','middle')}</g>`;
  const arr=(x1,y1,x2,y2)=>`<path d="M${x1},${y1} L${x2},${y2}" stroke="var(--ink-2)" stroke-width="1.6" marker-end="url(#spec-ah)" fill="none"/>`;
  return `<svg class="nx" viewBox="0 0 640 420" role="img" aria-label="Revision loop flowchart: read the region card, learn the labelled plate, test yourself with labels hidden, trace the flowcharts, read the clinical links, take the chapter quiz; if you score under 80 percent go back to the plates, otherwise rate the objectives and sit a mock exam, then revisit red objectives after 1, 3 and 7 days.">
   <defs><marker id="spec-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ink-2)"/></marker></defs>
   ${box(20,20,180,['1. Read the region card','and "Think of it as"'],'c')}${arr(200,42,228,42)}
   ${box(230,20,180,['2. Learn the labelled','plates (tap each label)'],'c')}${arr(410,42,438,42)}
   ${box(440,20,180,['3. Hide labels and','name every structure'],'c')}${arr(530,64,530,98)}
   ${box(440,100,180,['4. Trace the flowcharts','(arteries, nerves, lymph)'],'s')}${arr(440,122,412,122)}
   ${box(230,100,180,['5. Read the clinical and','FY1 links aloud'],'s')}${arr(230,122,202,122)}
   ${box(20,100,180,['6. Chapter quiz'],'s')}${arr(110,144,110,176)}
   <g><path d="M110,178 L180,222 L110,266 L40,222 Z" fill="var(--paper)" stroke="var(--clin)" stroke-width="1.6"/>${tl(110,218,['Score','≥ 80%?'],'sm b','middle')}</g>
   <path d="M180,222 L300,222" stroke="var(--ink-2)" stroke-width="1.6" marker-end="url(#spec-ah)"/>${tl(240,214,'Yes','xs','middle')}
   <path d="M40,222 L12,222 L12,60 L18,60" stroke="var(--clin)" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#spec-ah)" fill="none"/>${tl(16,286,'No: back to the plates','xs')}
   ${box(302,200,150,['7. Rate objectives','red, amber, green'],'m')}${arr(452,222,478,222)}
   ${box(480,200,140,['8. Timed mock','exam'],'m')}${arr(550,244,550,300)}
   ${box(380,302,240,['9. Revisit reds and wrong answers','after 1, 3 and 7 days'],'m')}
   <path d="M380,324 L130,324 L130,268" stroke="var(--ink-2)" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#spec-ah)" fill="none"/>${tl(250,342,'Next region, same loop','xs','middle')}
   ${tl(320,398,'Spaced retrieval beats re-reading: test first, then look.','sm','middle')}
  </svg>`;
}

function init(){
  if(!$('#panel-spec')) return;
  const f=$('#spec-flow-fig'); if(f) f.innerHTML=flowSVG();
  const n=$('#spec-count'); if(n) n.textContent=total;
  mapBtns(); drawMap(null); drawProgress(); drawList(); wire();
}
window.ATLAS_SPEC={AREAS,total};
init();
})();
