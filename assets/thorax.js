/* Thorax chapter: labelled plates (rendered by the bone-plate engine, with "Hide labels" self-test),
   flowchart trees and quiz items. Merged into BONES / TREES / QUIZ / MODEL by the main script. */
(function(){
'use strict';
const X=window.ATLAS_EXT, {lab}=window.ATLAS_UTIL;
const bone='fill="var(--bone)" stroke="var(--bone-line)" stroke-width="1.6"';
const musc=o=>`fill="color-mix(in srgb,var(--muscle) ${o||35}%,var(--paper))" stroke="var(--muscle)" stroke-width="1.2"`;

/* ---------- intercostal space ---------- */
X.plates.intercostal={title:'Intercostal space in section',cap:'Coronal section through the chest wall between two ribs. Outside on the left, lung on the right.',views:['Coronal'],
 clin:'Chest drains and pleural needles go just above the rib below, avoiding the vein, artery and nerve in the costal groove under the rib above. Intercostal nerve blocks are placed just below a rib, at the groove.',
 svg:{Coronal:{vb:'0 0 520 360',s:`
  <rect x="20" y="16" width="34" height="328" fill="color-mix(in srgb,var(--sys-skin) 30%,var(--paper))" stroke="var(--line-2)"/>
  <rect x="54" y="16" width="40" height="328" fill="color-mix(in srgb,var(--sys-skin) 12%,var(--paper))" stroke="var(--line-2)"/>
  <ellipse cx="190" cy="74" rx="72" ry="44" ${bone}/><path d="M228,104 C236,116 232,126 222,128 C214,120 214,110 228,104 Z" fill="var(--bone-art)" stroke="var(--bone-line)"/>
  <ellipse cx="190" cy="290" rx="72" ry="44" ${bone}/>
  <rect x="118" y="112" width="48" height="140" ${musc(30)}/><path d="M122,120 L162,160 M122,150 L162,190 M122,180 L162,220 M122,210 L162,248" stroke="var(--muscle)" opacity=".6"/>
  <rect x="166" y="112" width="44" height="140" ${musc(45)}/><path d="M170,160 L206,120 M170,200 L206,160 M170,240 L206,200" stroke="var(--muscle)" opacity=".6"/>
  <rect x="236" y="150" width="22" height="104" ${musc(55)}/>
  <circle cx="222" cy="122" r="7" fill="var(--vein)"/><circle cx="222" cy="138" r="6" fill="var(--artery)"/><circle cx="222" cy="152" r="5" fill="var(--nerve)"/>
  <path d="M264,16 V344" stroke="var(--ink-2)" stroke-width="2"/><path d="M272,16 V344" stroke="var(--accent)" stroke-width="3"/>
  <rect x="284" y="16" width="216" height="328" fill="color-mix(in srgb,var(--sys-resp) 14%,var(--paper))"/><path d="M284,16 V344" stroke="var(--accent)" stroke-width="2"/>
  <path d="M30,252 H254" stroke="var(--clin)" stroke-width="3" stroke-dasharray="7 4"/><path d="M254,252 l-10,-6 v12 z" fill="var(--clin)"/>
  ${lab(140,350,'NEEDLE: ABOVE THE RIB BELOW')}${lab(390,30,'LUNG')}${lab(190,74,'RIB')}${lab(190,290,'RIB')}`}},
 items:[
  ['Skin and subcutaneous tissue','Superficial layers; thick in obese patients, so use a longer needle.',{Coronal:[54,190]}],
  ['External intercostal','Fibres run down and forwards ("hands in pockets"). Raises the ribs: inspiration.',{Coronal:[142,182]}],
  ['Internal intercostal','Fibres at right angles to the external layer. Forced expiration.',{Coronal:[188,222]}],
  ['Innermost intercostal','Deepest muscle layer; the neurovascular bundle runs between it and the internal intercostal.',{Coronal:[247,232]}],
  ['Intercostal vein','Highest of the bundle: V-A-N from top to bottom.',{Coronal:[222,122]}],
  ['Intercostal artery','Posterior intercostal arteries from the aorta; anterior from the internal thoracic artery.',{Coronal:[222,138]}],
  ['Intercostal nerve','Lowest of the bundle; least protected by the groove. Ventral ramus of a thoracic spinal nerve.',{Coronal:[222,152]}],
  ['Costal groove','On the inner lower border of each rib: shelters the neurovascular bundle.',{Coronal:[226,116]}],
  ['Endothoracic fascia and parietal pleura','Parietal pleura is pain-sensitive (intercostal nerves): sharp, well-localised pleuritic pain.',{Coronal:[270,60]}],
  ['Pleural cavity','Potential space with 10–20 mL of fluid. Air here is a pneumothorax; fluid an effusion.',{Coronal:[278,180]}],
  ['Visceral pleura and lung','Visceral pleura has autonomic supply only and is insensitive to pain.',{Coronal:[330,180]}]
 ]};

/* ---------- surface markings of lungs and pleura ---------- */
(function(){
  let ribs='';
  for(let i=1;i<=10;i++){const y=50+i*28; ribs+=`<path d="M206,${y-6} C150,${y-2} 100,${y+6} 64,${y+22}" fill="none" stroke="var(--bone-line)" stroke-width="3" opacity=".35"/><path d="M234,${y-6} C290,${y-2} 340,${y+6} 376,${y+22}" fill="none" stroke="var(--bone-line)" stroke-width="3" opacity=".35"/>`+lab(388,y+26,String(i),'start');}
  X.plates.lungsurface={title:'Lungs and pleura: surface markings',cap:'Anterior chest. Solid lines: lungs; dashed lines: parietal pleura. Rib numbers on the right.',views:['Anterior'],
   clin:'Rule of 6-8-10 for the lower lung border (mid-clavicular, mid-axillary, scapular lines) and 8-10-12 for the pleura. The gap is the costodiaphragmatic recess, where effusions collect first. The apex rises 2–3 cm above the medial clavicle: a stab or line insertion there can cause a pneumothorax.',
   svg:{Anterior:{vb:'0 0 440 400',s:`
    <path d="M44,60 C120,30 320,30 396,60 L410,390 L30,390 Z" fill="var(--paper)" stroke="var(--line-2)"/>${ribs}
    <path d="M60,62 C120,50 170,56 208,64 M380,62 C320,50 270,56 232,64" stroke="var(--bone-line)" stroke-width="8" stroke-linecap="round" fill="none"/>
    <rect x="206" y="62" width="28" height="210" rx="10" ${bone}/>
    <path d="M200,40 C170,40 150,70 140,110 C120,180 104,230 90,260 C120,262 170,252 204,244 L210,70 Z" fill="color-mix(in srgb,var(--sys-resp) 20%,var(--paper))" stroke="var(--sys-resp)" stroke-width="2.2"/>
    <path d="M240,40 C270,40 290,70 300,110 C320,180 336,230 350,262 C330,264 300,256 280,248 C262,230 258,200 248,188 L236,180 L234,70 Z" fill="color-mix(in srgb,var(--sys-resp) 20%,var(--paper))" stroke="var(--sys-resp)" stroke-width="2.2"/>
    <path d="M204,44 C170,48 140,90 126,140 C108,210 90,260 70,318 C120,312 180,302 210,296" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-dasharray="6 4"/>
    <path d="M236,44 C270,48 300,90 314,140 C332,210 350,260 370,318 C320,312 260,302 230,296" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-dasharray="6 4"/>
    <path d="M206,158 C180,160 150,164 118,170" stroke="var(--ink)" stroke-width="2"/><path d="M196,236 C170,210 150,190 128,164" stroke="var(--ink)" stroke-width="2"/>
    <path d="M254,236 C280,214 300,196 316,172" stroke="var(--ink)" stroke-width="2"/>
    ${lab(220,22,'MANUBRIUM')}${lab(160,388,'RIGHT')}${lab(290,388,'LEFT')}`}},
   items:[
    ['Apex of the lung','2–3 cm above the medial third of the clavicle, covered by cervical pleura (suprapleural membrane).',{Anterior:[200,48]}],
    ['Sternal angle (2nd costal cartilage)','Pleurae of both sides meet in the midline here (T4/5 behind).',{Anterior:[220,108]}],
    ['Horizontal fissure (right lung)','Along the 4th costal cartilage and rib, separating the upper and middle lobes.',{Anterior:[160,162]}],
    ['Oblique fissure','From about T4/5 at the back, following the 6th rib to the 6th costal cartilage in front.',{Anterior:[170,214]}],
    ['Cardiac notch (left lung)','Left lung border deviates laterally at the 4th costal cartilage to make room for the heart; the lingula lies below it.',{Anterior:[262,200]}],
    ['Lower border of the lung (6th rib, MCL)','6th rib in the mid-clavicular line, 8th in the mid-axillary line, 10th at the scapular line.',{Anterior:[96,256]}],
    ['Lower border of the pleura (8th rib, MCL)','8th rib in the mid-clavicular line, 10th in the mid-axillary line, 12th at the back.',{Anterior:[78,312]}],
    ['Costodiaphragmatic recess','Space between lung and pleural borders; lung expands into it on deep inspiration. Fluid collects here (blunted costophrenic angle on X-ray).',{Anterior:[96,286]}]
   ]};
})();

/* ---------- lung roots (hila) ---------- */
(function(){
  const lung=`<path d="M190,30 C120,40 70,120 64,220 C60,300 90,360 150,370 C220,378 300,350 320,280 C336,220 320,120 290,70 C266,38 226,26 190,30 Z" fill="color-mix(in srgb,var(--sys-resp) 16%,var(--paper))" stroke="var(--sys-resp)" stroke-width="2"/>`;
  const br=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="3"/>`;
  const pa=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--vein)" stroke="var(--paper)" stroke-width="1.5"/>`;
  const pv=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--artery)" stroke="var(--paper)" stroke-width="1.5"/>`;
  X.plates.hila={title:'Lung roots (hila), medial surfaces',cap:'Pulmonary arteries carry deoxygenated blood (blue); pulmonary veins oxygenated (red). Anterior is towards the heart impression.',views:['Right lung','Left lung'],
   clin:'"RALS": the right pulmonary artery is anterior to its bronchus, the left artery is superior. The right lung has an extra (eparterial) upper lobe bronchus above the artery, so the right has two bronchi at the hilum. Veins are always the most anterior and inferior structures.',
   svg:{'Right lung':{vb:'0 0 380 400',s:`${lung}
     <path d="M150,60 C140,110 150,150 164,170" fill="none" stroke="var(--vein)" stroke-width="10" opacity=".35"/>
     <path d="M210,64 C240,60 262,72 270,96" fill="none" stroke="var(--vein)" stroke-width="10" opacity=".35"/>
     <path d="M240,220 C262,250 270,290 268,330" fill="none" stroke="var(--sys-gi)" stroke-width="12" opacity=".3"/>
     <ellipse cx="128" cy="230" rx="50" ry="70" fill="color-mix(in srgb,var(--sys-cvs) 16%,var(--paper))" stroke="var(--sys-cvs)" stroke-dasharray="5 4"/>
     ${br(212,144,13)}${pa(186,170,15)}${br(222,184,15)}${pv(178,208,13)}${pv(200,236,13)}
     <path d="M214,250 L224,300" stroke="var(--ink-2)" stroke-width="3"/>${lab(190,392,'RIGHT LUNG, MEDIAL VIEW')}`},
    'Left lung':{vb:'0 0 380 400',s:`<g transform="translate(384,0) scale(-1,1)">${lung}</g>
     <path d="M220,50 C170,50 150,90 152,130 C154,180 170,260 176,350" fill="none" stroke="var(--artery)" stroke-width="12" opacity=".28"/>
     <ellipse cx="250" cy="236" rx="62" ry="82" fill="color-mix(in srgb,var(--sys-cvs) 16%,var(--paper))" stroke="var(--sys-cvs)" stroke-dasharray="5 4"/>
     <path d="M290,286 C300,310 300,330 284,346" fill="none" stroke="var(--ink-2)" stroke-width="2"/>
     ${pa(196,150,15)}${br(176,178,15)}${pv(212,196,13)}${pv(196,226,13)}
     <path d="M182,242 L174,296" stroke="var(--ink-2)" stroke-width="3"/>${lab(190,392,'LEFT LUNG, MEDIAL VIEW')}`}},
   items:[
    ['Upper lobe (eparterial) bronchus','Right only: leaves above the pulmonary artery. Inhaled foreign bodies favour the wider, steeper right main bronchus.',{'Right lung':[212,144]}],
    ['Pulmonary artery','Right: anterior to the bronchus. Left: the highest structure in the hilum.',{'Right lung':[186,170],'Left lung':[196,150]}],
    ['Main (intermediate) bronchus','Posterior structure of the hilum; on the left it lies below the artery.',{'Right lung':[222,184],'Left lung':[176,178]}],
    ['Superior pulmonary vein','Anterior and below the artery; drains to the left atrium.',{'Right lung':[178,208],'Left lung':[212,196]}],
    ['Inferior pulmonary vein','Lowest structure of the hilum.',{'Right lung':[200,236],'Left lung':[196,226]}],
    ['Pulmonary ligament','Fold of pleura hanging below the hilum; allows the root to move with breathing.',{'Right lung':[220,280],'Left lung':[178,276]}],
    ['Cardiac impression','Right: shallow, from the right atrium. Left: deep, from the left ventricle; continues as the cardiac notch.',{'Right lung':[120,230],'Left lung':[262,240]}],
    ['Groove for SVC and azygos arch','Right lung: the azygos vein arches over the right hilum to join the SVC at T4.',{'Right lung':[154,96]}],
    ['Groove for the oesophagus','Right lung, behind the hilum.',{'Right lung':[258,276]}],
    ['Groove for the aortic arch and descending aorta','Left lung: the aorta arches over the left hilum and descends behind it.',{'Left lung':[158,104]}],
    ['Lingula','Tongue of the left upper lobe below the cardiac notch: the equivalent of the right middle lobe.',{'Left lung':[292,326]}]
   ]};
})();

/* ---------- diaphragm ---------- */
X.plates.diaphragm={title:'Diaphragm viewed from below',cap:'Abdominal surface. Front at the top. "I 8 10 Eggs At 12".',views:['Inferior'],
 clin:'Phrenic nerve (C3, 4, 5 keeps the diaphragm alive). Irritation of central diaphragmatic pleura or peritoneum refers pain to the shoulder tip (C4). A newly raised hemidiaphragm on X-ray can be the first sign of a mediastinal tumour involving the phrenic nerve.',
 svg:{Inferior:{vb:'0 0 440 380',s:`
  <path d="M40,190 C40,90 120,30 220,30 C320,30 400,90 400,190 C400,250 360,290 300,300 L140,300 C80,290 40,250 40,190 Z" ${musc(28)}/>
  <path d="M130,120 C150,80 200,70 220,92 C240,70 290,80 310,120 C300,170 260,190 220,186 C180,190 140,170 130,120 Z" fill="var(--bone-art)" stroke="var(--ink-2)" stroke-width="1.6"/>
  <path d="M192,200 C186,250 184,300 188,350 L208,350 C210,300 210,250 214,206 Z" ${musc(55)}/><path d="M230,206 C234,250 236,300 236,340 L252,340 C252,300 252,250 246,200 Z" ${musc(55)}/>
  <rect x="182" y="350" width="82" height="22" rx="5" ${bone}/>${lab(222,365,'L1–L3')}
  <ellipse cx="254" cy="132" rx="14" ry="12" fill="var(--vein)"/>
  <ellipse cx="206" cy="214" rx="11" ry="15" fill="color-mix(in srgb,var(--sys-gi) 60%,var(--paper))" stroke="var(--sys-gi)"/>
  <path d="M190,262 C200,248 244,248 252,262" fill="none" stroke="var(--ink-2)" stroke-width="3"/><circle cx="222" cy="282" r="14" fill="var(--artery)"/>
  <path d="M140,300 C150,320 170,330 182,336 M300,300 C290,320 272,330 262,336" fill="none" stroke="var(--ink-2)" stroke-width="2"/>
  ${lab(70,60,'RIGHT','start')}${lab(370,60,'LEFT','end')}`}},
 items:[
  ['Central tendon','Trefoil aponeurosis that all the muscle fibres insert into; fused with the fibrous pericardium above.',{Inferior:[180,150]}],
  ['Caval opening (T8)','In the central tendon, to the right: IVC and right phrenic nerve branches. Opens wider on inspiration.',{Inferior:[254,132]}],
  ['Oesophageal hiatus (T10)','Through the right crus: oesophagus, vagal trunks, oesophageal branches of the left gastric vessels. Sling acts as a lower oesophageal sphincter; widening allows a hiatus hernia.',{Inferior:[206,214]}],
  ['Aortic hiatus (T12)','Behind the median arcuate ligament, so not truly through the diaphragm: aorta, thoracic duct, often the azygos vein.',{Inferior:[222,282]}],
  ['Median arcuate ligament','Joins the two crura in front of the aorta.',{Inferior:[222,252]}],
  ['Right crus','Larger, from L1–L3 bodies; its fibres encircle the oesophagus.',{Inferior:[198,320]}],
  ['Left crus','From L1–L2.',{Inferior:[244,310]}],
  ['Medial and lateral arcuate ligaments','Arch over psoas major and quadratus lumborum respectively.',{Inferior:[160,320]}],
  ['Costal (muscular) part','Arises from the inner surfaces of the lower six costal cartilages; motor supply from the phrenic nerve only.',{Inferior:[90,200]}]
 ]};

/* ---------- heart, anterior surface ---------- */
X.plates.heartant={title:'Heart, anterior (sternocostal) surface',cap:'Patient\'s right on the viewer\'s left.',views:['Anterior'],
 clin:'The right ventricle forms most of the anterior surface, so a parasternal stab wound usually enters it. On a PA chest X-ray the right border is the right atrium and the left border is the left ventricle with the left auricle above.',
 svg:{Anterior:{vb:'0 0 440 420',s:`
  <path d="M168,40 L196,40 L196,150 L168,150 Z" fill="var(--vein-tint)" stroke="var(--vein)" stroke-width="1.6"/>
  <path d="M220,150 C214,90 222,46 270,40 C320,34 344,66 336,96 L310,96 C312,74 296,64 276,66 C250,70 248,110 252,150 Z" fill="var(--artery-tint)" stroke="var(--artery)" stroke-width="1.8"/>
  <path d="M262,58 L262,24 M286,52 L292,20 M306,62 L318,30" stroke="var(--artery)" stroke-width="8" stroke-linecap="round"/>
  <path d="M240,160 C236,120 250,100 276,104 C300,108 306,130 300,160 Z" fill="var(--vein-tint)" stroke="var(--vein)" stroke-width="1.8"/>
  <path d="M120,170 C110,120 150,120 196,140 C200,190 196,260 186,300 C150,310 116,290 108,250 C102,220 108,190 120,170 Z" fill="color-mix(in srgb,var(--vein) 22%,var(--paper))" stroke="var(--vein)" stroke-width="1.8"/>
  <path d="M196,150 C240,150 290,150 320,170 C350,210 352,270 320,320 C292,354 250,372 226,378 C210,350 196,320 186,300 C196,250 200,200 196,150 Z" fill="color-mix(in srgb,var(--vein) 12%,var(--paper))" stroke="var(--ink-2)" stroke-width="1.8"/>
  <path d="M320,170 C350,200 362,250 350,300 C340,340 300,370 226,378 C268,360 300,330 318,290 C334,250 330,200 320,170 Z" fill="var(--artery-tint)" stroke="var(--artery)" stroke-width="1.8"/>
  <path d="M310,150 C330,140 350,150 348,170 C340,178 326,176 318,170 Z" fill="var(--artery-tint)" stroke="var(--artery)"/>
  <path d="M196,148 C184,200 180,260 190,300 C200,330 214,356 226,378" fill="none" stroke="var(--artery)" stroke-width="4"/>
  <path d="M300,166 C290,230 270,300 232,374" fill="none" stroke="var(--artery)" stroke-width="4"/><path d="M308,168 C298,232 278,302 240,374" fill="none" stroke="var(--vein)" stroke-width="2.5"/>
  <path d="M172,300 L172,334 L190,334 L190,304" fill="var(--vein-tint)" stroke="var(--vein)"/>
  ${lab(220,410,'APEX: LEFT 5TH ICS, MID-CLAVICULAR LINE')}`}},
 items:[
  ['Superior vena cava','Formed by the brachiocephalic veins; enters the right atrium.',{Anterior:[182,90]}],
  ['Ascending aorta and arch','Arises from the left ventricle; gives the coronary arteries from its sinuses, then the three arch branches.',{Anterior:[236,110]}],
  ['Pulmonary trunk','From the right ventricle; divides under the arch into the right and left pulmonary arteries (T4/5).',{Anterior:[272,130]}],
  ['Right atrium','Forms the right border of the heart.',{Anterior:[140,220]}],
  ['Right auricle','Ear-like pouch overlapping the root of the aorta.',{Anterior:[178,150]}],
  ['Right ventricle','Most of the anterior surface.',{Anterior:[250,250]}],
  ['Left ventricle','Forms the apex and left border; wall about three times thicker than the right.',{Anterior:[330,256]}],
  ['Left auricle','Upper left border of the cardiac silhouette.',{Anterior:[332,162]}],
  ['Right coronary artery','In the right atrioventricular (coronary) groove; supplies the SA node (≈60%) and AV node (≈80–90%).',{Anterior:[186,250]}],
  ['Left anterior descending artery','In the anterior interventricular groove: anterior two-thirds of the septum and the front of the left ventricle.',{Anterior:[284,240]}],
  ['Great cardiac vein','Runs with the LAD, then round to the coronary sinus at the back.',{Anterior:[300,200]}],
  ['Inferior vena cava','Enters the lower right atrium after passing through the diaphragm at T8.',{Anterior:[180,320]}],
  ['Apex','Normally in the left 5th intercostal space at the mid-clavicular line.',{Anterior:[230,372]}]
 ]};

/* ---------- flowcharts ---------- */
X.trees.thAorta={kind:'artery',dir:'ltr',root:{t:'Aorta',s:'from left ventricle',d:'Ascending aorta, arch (T4/5 to T4/5), descending thoracic aorta, then abdominal aorta below T12.',c:[
  {t:'Right and left coronary arteries',s:'aortic sinuses',d:'The only branches of the ascending aorta; fill mainly in diastole.'},
  {t:'Brachiocephalic trunk',s:'1st arch branch',d:'Right side only.',c:[
    {t:'Right subclavian a.',d:'Branches: vertebral, internal thoracic, thyrocervical trunk, costocervical trunk, dorsal scapular.'},
    {t:'Right common carotid a.',d:'Bifurcates at C4 into internal and external carotids.'}]},
  {t:'Left common carotid a.',s:'2nd arch branch',d:'Arises directly from the arch.'},
  {t:'Left subclavian a.',s:'3rd arch branch',d:'Stenosis proximal to the vertebral origin causes subclavian steal: arm exercise reverses flow down the vertebral artery, causing dizziness or syncope.'},
  {t:'Descending thoracic aorta',s:'T4/5 → T12',d:'In the posterior mediastinum, left of the oesophagus.',c:[
    {t:'Posterior intercostal aa.',s:'3rd–11th spaces',d:'Run in the costal grooves with the vein and nerve.'},
    {t:'Bronchial arteries',d:'Nourish the airways and lung tissue (the pulmonary arteries are for gas exchange).'},
    {t:'Oesophageal branches',d:'Middle third of the oesophagus.'},
    {t:'Abdominal aorta',s:'through aortic hiatus T12',d:'See the abdomen chapter for coeliac, SMA, renal and IMA branches.'}]}]}};
X.trees.thCoronary={kind:'artery',dir:'ltr',root:{t:'Aortic root',s:'aortic sinuses',d:'Coronary arteries arise from the right and left aortic sinuses just above the aortic valve cusps.',c:[
  {t:'Right coronary a.',s:'right AV groove',d:'Supplies the right atrium and ventricle, the inferior wall in right-dominant hearts, and usually both nodes.',c:[
    {t:'SA nodal a.',s:'≈60% of people',d:'In the rest it comes from the circumflex.'},
    {t:'Right marginal a.',d:'Along the inferior border of the right ventricle.'},
    {t:'AV nodal a.',s:'≈80–90%',d:'Why inferior MIs cause heart block.'},
    {t:'Posterior descending a.',s:'right-dominant ≈70–80%',d:'Posterior interventricular groove: posterior third of the septum, inferior wall. ECG leads II, III, aVF.'}]},
  {t:'Left main stem',s:'short',d:'Occlusion is catastrophic ("widow-maker" territory with the proximal LAD).',c:[
    {t:'Left anterior descending a.',s:'anterior IV groove',d:'Anterior two-thirds of the septum, front of the left ventricle, apex. ECG V1–V4.',c:[
      {t:'Diagonal branches',d:'Anterolateral left ventricle.'},{t:'Septal perforators',d:'Septum including the bundle branches.'}]},
    {t:'Circumflex a.',s:'left AV groove',d:'Lateral and posterior left ventricle, left atrium. ECG I, aVL, V5–V6.',c:[
      {t:'Obtuse marginal branches',d:'Lateral wall of the left ventricle.'}]}]}]}};
X.trees.thCardiacVeins={kind:'vein',dir:'rtl',root:{t:'Right atrium',d:'Receives almost all venous blood from the heart.',c:[
  {t:'Coronary sinus',s:'posterior AV groove',d:'Opens into the right atrium between the IVC and tricuspid valve.',c:[
    {t:'Great cardiac vein',s:'with the LAD',d:'Starts at the apex, runs up the anterior interventricular groove, then round the left AV groove.'},
    {t:'Middle cardiac vein',s:'with the PDA',d:'In the posterior interventricular groove.'},
    {t:'Small cardiac vein',s:'with right marginal a.',d:'Along the inferior border of the right ventricle.'},
    {t:'Oblique vein of the left atrium',d:'Small remnant of the left superior vena cava.'}]},
  {t:'Anterior cardiac veins',s:'direct',d:'Drain the front of the right ventricle straight into the right atrium.'},
  {t:'Smallest cardiac veins',s:'Thebesian',d:'Drain directly into all chambers.'}]}};
X.trees.thAzygos={kind:'vein',dir:'rtl',root:{t:'Superior vena cava',s:'enters right atrium',d:'The azygos system links the IVC and SVC: a collateral route if either is blocked.',c:[
  {t:'Azygos vein',s:'arches over right hilum at T4',d:'Ascends on the right of the vertebral bodies in the posterior mediastinum.',c:[
    {t:'Right posterior intercostal veins',d:'Spaces 4–11 on the right.'},
    {t:'Hemiazygos vein',s:'crosses at ≈T8/9',d:'Drains the lower left posterior intercostal veins.'},
    {t:'Accessory hemiazygos vein',s:'crosses at ≈T7/8',d:'Drains the upper left posterior intercostal veins (4–8).'},
    {t:'Right ascending lumbar vein',s:'origin',d:'The azygos begins from the ascending lumbar or subcostal veins.'}]},
  {t:'Brachiocephalic veins',d:'Formed by the internal jugular and subclavian veins at each venous angle (where the lymphatic ducts enter).'}]}};

/* ---------- quiz ---------- */
X.quiz.push(
 {id:'th1',c:'thorax',type:'sba',q:'A 24-year-old has a chest drain inserted for a pneumothorax. Why is the needle and tube passed just above the upper border of a rib?',o:['The internal thoracic artery runs along the lower border of each rib','The intercostal vein, artery and nerve run in the costal groove under each rib','The parietal pleura is thinnest above each rib','The external intercostal is absent above each rib','The long thoracic nerve runs above each rib'],a:1,e:'The neurovascular bundle (vein, artery, nerve from top to bottom) runs in the costal groove on the inner lower border of the rib above, between the internal and innermost intercostals.'},
 {id:'th2',c:'thorax',type:'sba',q:'A toddler inhales a peanut. On a chest X-ray, which lung is most likely to show collapse?',o:['Left lower lobe','Left upper lobe','Lingula','Right lower lobe','Right upper lobe'],a:3,e:'The right main bronchus is wider, shorter and more vertical, so foreign bodies usually enter it and, when upright, lodge in the right lower lobe bronchi.'},
 {id:'th3',c:'thorax',type:'sba',q:'A 70-year-old has hoarseness and a mass at the left hilum. Which nerve is most likely involved?',o:['External laryngeal nerve','Left phrenic nerve','Left recurrent laryngeal nerve','Right recurrent laryngeal nerve','Superior laryngeal nerve'],a:2,e:'The left recurrent laryngeal nerve hooks under the aortic arch (by the ligamentum arteriosum) close to the left hilum and its nodes, then supplies the vocal fold muscles.'},
 {id:'th4',c:'thorax',type:'sba',q:'In the mid-axillary line, at which rib does the lower border of the parietal pleura lie?',o:['6th','8th','10th','11th','12th'],a:2,e:'Pleura: 8th rib (mid-clavicular), 10th (mid-axillary), 12th (posteriorly). Lung: 6, 8, 10.'},
 {id:'th5',c:'thorax',type:'sba',q:'A patient with an inferior STEMI (ST elevation in II, III and aVF) becomes bradycardic with complete heart block. Which artery supplies the structure that has failed?',o:['Circumflex artery','Left anterior descending artery','Left main stem','Obtuse marginal artery','Right coronary artery'],a:4,e:'The AV nodal artery arises from the right coronary artery in about 80–90% of people, the same vessel that supplies the inferior wall in right-dominant hearts.'},
 {id:'th6',c:'thorax',type:'sba',q:'After blunt chest trauma a patient is hypotensive with a raised JVP and quiet heart sounds. Where has blood collected?',o:['Between fibrous and parietal serous pericardium','Between parietal and visceral serous pericardium','Between visceral pericardium and myocardium','In the pleural cavity','In the posterior mediastinum'],a:1,e:'Cardiac tamponade: blood fills the pericardial cavity between the parietal and visceral (epicardium) layers of serous pericardium. Beck\'s triad: hypotension, raised JVP, muffled heart sounds.'},
 {id:'th7',c:'thorax',type:'sba',q:'Which structure passes through the diaphragm with the oesophagus at T10?',o:['Azygos vein','Right phrenic nerve','Thoracic duct','Vagal trunks','Inferior vena cava'],a:3,e:'The anterior and posterior vagal trunks accompany the oesophagus through the hiatus. The IVC and right phrenic branches pass at T8; the aorta, thoracic duct and azygos at T12.'},
 {id:'th8',c:'thorax',type:'sba',q:'In which division of the mediastinum does the thoracic duct ascend from the diaphragm to T4/5?',o:['Anterior','Middle','Posterior','Superior','It does not enter the mediastinum'],a:2,e:'The thoracic duct enters through the aortic hiatus and ascends in the posterior mediastinum between the aorta and azygos vein, crossing to the left at about T4/5 before entering the superior mediastinum.'},
 {id:'th9',c:'thorax',type:'sba',q:'A 30-year-old woman has tingling in her little finger and wasting of the hand muscles when her arm is raised; X-ray shows a cervical rib. Which structure is being compressed?',o:['Lateral cord of the brachial plexus','Lower trunk of the brachial plexus','Phrenic nerve','Subclavian vein only','Upper trunk of the brachial plexus'],a:1,e:'Thoracic outlet syndrome: a cervical rib or band narrows the space over the first rib, compressing the lower trunk (C8–T1), giving ulnar-side symptoms and small-muscle wasting. The subclavian artery can also be compressed.'},
 {id:'th10',c:'thorax',type:'vsaq',q:'At which vertebral level is the sternal angle (and the tracheal bifurcation)?',a:['t4t5','t4','t5','t45','t4tot5','t4t5disc'],e:'The sternal angle lies at the level of the T4/5 intervertebral disc: carina, beginning and end of the aortic arch, azygos joining the SVC, superior/inferior mediastinal boundary.'},
 {id:'th11',c:'thorax',type:'vsaq',q:'Name the vein that arches over the root of the right lung to join the superior vena cava.',a:['azygos','azygosvein','theazygosvein','azygous','azygousvein'],e:'The azygos vein arches over the right hilum at T4 to enter the SVC.'},
 {id:'th12',c:'thorax',type:'vsaq',q:'Which valve is best heard at the apex in the left 5th intercostal space, mid-clavicular line?',a:['mitral','mitralvalve','themitralvalve','bicuspid','bicuspidvalve'],e:'The mitral area is at the apex. Mitral regurgitation gives a pansystolic murmur there radiating to the axilla.'}
);
Object.assign(X.model,{th10:'T4/5 (sternal angle)',th11:'Azygos vein',th12:'Mitral valve'});
})();
