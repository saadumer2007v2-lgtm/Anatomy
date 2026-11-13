/* Abdomen chapter: plates, flowcharts and quiz items (merged by the main script). */
(function(){
'use strict';
const X=window.ATLAS_EXT, {lab}=window.ATLAS_UTIL;
const bone='fill="var(--bone)" stroke="var(--bone-line)" stroke-width="1.6"';
const org=(c,o)=>`fill="color-mix(in srgb,var(${c}) ${o||30}%,var(--paper))" stroke="var(${c})" stroke-width="1.6"`;

/* ---------- peritoneum, sagittal ---------- */
X.plates.peritoneum={title:'Peritoneum in sagittal section',cap:'Midline section, front to the left. The peritoneal lining is drawn in purple.',views:['Sagittal'],
 clin:'Intraperitoneal organs hang on a mesentery and move; retroperitoneal organs are fixed to the back wall (SAD PUCKER: suprarenals, aorta/IVC, duodenum 2nd–4th parts, pancreas except tail, ureters, colon ascending and descending, kidneys, oesophagus, rectum). The rectovesical (or rectouterine, Douglas) pouch is the lowest point of the peritoneal cavity when upright, where pus and blood collect.',
 svg:{Sagittal:{vb:'0 0 420 460',s:`
  <rect x="20" y="40" width="26" height="380" fill="color-mix(in srgb,var(--muscle) 25%,var(--paper))" stroke="var(--muscle)"/>
  ${[...Array(10)].map((_,i)=>`<rect x="372" y="${60+i*38}" width="36" height="32" rx="4" ${bone}/>`).join('')}
  <rect x="352" y="70" width="14" height="330" fill="var(--artery)" opacity=".75"/>
  <path d="M40,64 C120,22 300,20 366,70" fill="none" stroke="var(--muscle)" stroke-width="6"/>
  <path d="M48,66 C120,40 230,42 252,70 C244,110 204,130 150,140 C100,142 62,124 48,104 Z" ${org('--sys-gi',35)}/>
  <ellipse cx="150" cy="176" rx="50" ry="28" ${org('--sys-gi',22)}/>
  <path d="M206,158 C250,148 292,160 302,188 C282,210 240,214 206,200 Z" fill="color-mix(in srgb,var(--sys-endo) 14%,var(--paper))" stroke="var(--sys-endo)" stroke-dasharray="4 3"/>
  <ellipse cx="322" cy="192" rx="24" ry="12" ${org('--sys-endo',35)}/>
  <circle cx="172" cy="240" r="18" ${org('--sys-gi',28)}/>
  <circle cx="336" cy="252" r="12" ${org('--sys-gi',40)}/>
  ${[[200,290],[232,312],[262,290],[214,336],[250,350],[288,330]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="16" ${org('--sys-gi',18)}/>`).join('')}
  <ellipse cx="116" cy="410" rx="42" ry="26" ${org('--sys-renal',28)}/><ellipse cx="300" cy="404" rx="24" ry="32" ${org('--sys-gi',30)}/>
  <g fill="none" stroke="var(--sys-endo)" stroke-width="2.4">
   <path d="M48,70 V384 C70,380 92,380 116,384 C150,388 190,372 210,386 C230,410 262,420 276,404 C280,380 300,368 344,372 V280 C320,284 280,296 262,312"/>
   <path d="M190,124 L168,150"/><path d="M188,236 C240,232 300,226 344,222 V200"/>
   <path d="M112,196 C88,250 90,320 104,338 C122,342 134,300 156,252"/>
   <path d="M344,276 L270,306"/>
  </g>
  ${lab(30,30,'ANTERIOR','start')}${lab(400,30,'POSTERIOR','end')}`}},
 items:[
  ['Liver','Intraperitoneal except the bare area against the diaphragm.',{Sagittal:[140,92]}],
  ['Lesser omentum','From the lesser curvature of the stomach and first part of the duodenum to the liver. Its free edge (hepatoduodenal ligament) holds the portal triad.',{Sagittal:[178,138]}],
  ['Stomach','Intraperitoneal; anterior wall of the lesser sac.',{Sagittal:[140,176]}],
  ['Lesser sac (omental bursa)','Behind the stomach, entered through the epiploic foramen (of Winslow). A posterior gastric ulcer can perforate into it.',{Sagittal:[254,184]}],
  ['Pancreas','Retroperitoneal (except the tail) on the posterior abdominal wall behind the lesser sac.',{Sagittal:[322,192]}],
  ['Transverse colon and mesocolon','Intraperitoneal; its mesentery attaches to the posterior wall over the pancreas.',{Sagittal:[172,240]}],
  ['Greater omentum','Four-layered apron from the greater curvature hanging in front of the bowel, folding back to the transverse colon. Walls off infection ("policeman of the abdomen").',{Sagittal:[96,300]}],
  ['Small intestine and mesentery','Jejunum and ileum on a fan-shaped mesentery whose root runs from the duodenojejunal flexure (left of L2) to the right sacroiliac joint.',{Sagittal:[240,320]}],
  ['Duodenum (3rd part)','Retroperitoneal; crosses in front of the aorta and IVC, under the SMA.',{Sagittal:[336,252]}],
  ['Aorta','Retroperitoneal on the vertebral bodies.',{Sagittal:[359,140]}],
  ['Rectovesical pouch','Lowest part of the peritoneal cavity (rectouterine pouch of Douglas in females).',{Sagittal:[244,404]}],
  ['Parietal peritoneum','Lines the walls; somatic nerves, so pain is sharp and localised (peritonism).',{Sagittal:[48,240]}]
 ]};

/* ---------- gut wall ---------- */
(function(){
  const c=(r,f,s,w)=>`<circle cx="210" cy="176" r="${r}" fill="${f}" stroke="${s||'none'}" stroke-width="${w||1}"/>`;
  let villi=''; for(let i=0;i<18;i++){const a=i/18*Math.PI*2, x1=210+66*Math.cos(a), y1=176+66*Math.sin(a), x2=210+48*Math.cos(a), y2=176+48*Math.sin(a); villi+=`<path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}" stroke="color-mix(in srgb,var(--sys-gi) 70%,var(--paper))" stroke-width="7" stroke-linecap="round"/>`;}
  let dots=(r,col)=>{let d=''; for(let i=0;i<14;i++){const a=i/14*Math.PI*2; d+=`<circle cx="${(210+r*Math.cos(a)).toFixed(1)}" cy="${(176+r*Math.sin(a)).toFixed(1)}" r="3" fill="${col}"/>`;} return d;};
  X.plates.gutwall={title:'Wall of the gut in cross-section',cap:'Small intestine. The same four layers run from oesophagus to anal canal.',views:['Section'],
   clin:'Mucosa, submucosa, muscularis externa and serosa (or adventitia where the gut is retroperitoneal or in the thorax). Cancers are staged by how deep they invade these layers. The two enteric plexuses work without the brain; the vagus and sympathetic nerves only modulate them.',
   svg:{Section:{vb:'0 0 420 380',s:`
    <path d="M200,330 L190,380 M220,330 L230,380" stroke="var(--sys-gi)" stroke-width="3"/><path d="M206,336 L204,378" stroke="var(--artery)" stroke-width="3"/><path d="M214,336 L216,378" stroke="var(--vein)" stroke-width="3"/>
    ${c(168,'color-mix(in srgb,var(--sys-endo) 22%,var(--paper))','var(--sys-endo)',2)}
    ${c(162,'color-mix(in srgb,var(--muscle) 40%,var(--paper))')}${c(146,'var(--paper)')}${dots(147,'var(--nerve)')}
    ${c(142,'color-mix(in srgb,var(--muscle) 58%,var(--paper))')}${c(118,'color-mix(in srgb,var(--sys-msk) 22%,var(--paper))')}${dots(108,'var(--nerve)')}
    ${c(92,'color-mix(in srgb,var(--sys-gi) 32%,var(--paper))')}${c(88,'none','var(--muscle)',3)}
    ${c(66,'color-mix(in srgb,var(--sys-gi) 18%,var(--paper))')}${villi}${c(42,'var(--bone-art)')}
    <ellipse cx="248" cy="98" rx="10" ry="7" fill="color-mix(in srgb,var(--lymph) 50%,var(--paper))" stroke="var(--lymph)"/>
    ${lab(210,180,'LUMEN')}`}},
   items:[
    ['Epithelium','Simple columnar with villi in the small intestine; stratified squamous in the oesophagus and lower anal canal.',{Section:[256,176]}],
    ['Lamina propria','Loose connective tissue with capillaries, lacteals and lymphoid cells.',{Section:[210,98]}],
    ['Muscularis mucosae','Thin smooth muscle that moves the mucosa; marks the lower limit of the mucosa.',{Section:[126,140]}],
    ['Submucosa','Dense connective tissue, larger vessels; Brunner\'s glands in the duodenum.',{Section:[300,176]}],
    ['Submucosal (Meissner\'s) plexus','Controls secretion and local blood flow.',{Section:[318,176]}],
    ['Circular muscle layer','Inner layer of the muscularis externa; thickens into sphincters (pyloric, internal anal).',{Section:[210,44]}],
    ['Myenteric (Auerbach\'s) plexus','Between the two muscle layers: controls motility. Absent in Hirschsprung\'s disease.',{Section:[357,176]}],
    ['Longitudinal muscle layer','Outer layer; gathered into three taeniae coli in the large intestine.',{Section:[210,22]}],
    ['Serosa (visceral peritoneum)','Outer coat of intraperitoneal gut; called adventitia where there is no peritoneum.',{Section:[60,176]}],
    ['Mesentery','Double layer of peritoneum carrying vessels, nerves and lymphatics to the gut.',{Section:[210,360]}],
    ['Lymphoid follicle (Peyer\'s patch)','Gut-associated lymphoid tissue, most prominent in the ileum.',{Section:[248,98]}]
   ]};
})();

/* ---------- abdominal viscera ---------- */
X.plates.viscera={title:'Abdominal organs, anterior view',cap:'Patient\'s right on the viewer\'s left. Greater omentum removed.',views:['Anterior'],
 clin:'Each organ projects onto a region: use it to turn a site of pain or a mass into a differential. The spleen lies under ribs 9–11 and is not normally palpable; it enlarges towards the right iliac fossa. The liver enlarges downwards from the right costal margin.',
 svg:{Anterior:{vb:'0 0 420 480',s:`
  <path d="M60,40 C120,20 300,20 360,40 L384,250 C388,330 380,420 350,462 L70,462 C40,420 32,330 36,250 Z" fill="var(--paper)" stroke="var(--line-2)"/>
  <path d="M50,70 C110,52 240,50 280,70 C300,96 270,128 230,138 C170,150 100,150 60,140 C46,120 44,90 50,70 Z" ${org('--sys-gi',38)}/>
  <ellipse cx="120" cy="150" rx="14" ry="22" fill="color-mix(in srgb,var(--lymph) 45%,var(--paper))" stroke="var(--lymph)" stroke-width="1.6"/>
  <path d="M248,104 C300,90 340,110 336,156 C332,200 290,222 250,214 C236,190 254,168 238,150 C226,136 232,114 248,104 Z" ${org('--sys-gi',22)}/>
  <ellipse cx="356" cy="140" rx="18" ry="34" ${org('--sys-blood',35)}/>
  <path d="M60,216 C60,200 72,190 90,192 L330,192 C350,194 358,206 356,222 L352,330 C350,350 338,360 320,354 L318,240 L100,240 L96,360 C90,372 66,370 62,352 Z" ${org('--sys-gi',26)}/>
  ${[[150,270],[196,262],[244,272],[150,316],[200,306],[250,316],[176,350],[230,352]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="22" ${org('--sys-gi',14)}/>`).join('')}
  <path d="M318,350 C320,392 290,412 250,404 C228,400 214,412 210,428" fill="none" stroke="color-mix(in srgb,var(--sys-gi) 60%,var(--paper))" stroke-width="22" stroke-linecap="round"/>
  <path d="M86,382 C96,400 92,420 80,428" fill="none" stroke="color-mix(in srgb,var(--sys-gi) 60%,var(--paper))" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="208" cy="444" rx="34" ry="16" ${org('--sys-renal',30)}/>
  ${lab(70,476,'RIGHT','start')}${lab(350,476,'LEFT','end')}`}},
 items:[
  ['Liver','Right upper quadrant under ribs 7–11, extending to the left upper quadrant. Moves down on inspiration: palpate from below as the patient breathes in.',{Anterior:[150,100]}],
  ['Gallbladder','Fundus at the tip of the right 9th costal cartilage in the mid-clavicular line (Murphy\'s point).',{Anterior:[120,150]}],
  ['Stomach','Left upper quadrant and epigastrium: cardia, fundus, body, antrum, pylorus (L1).',{Anterior:[290,156]}],
  ['Spleen','Left upper quadrant under ribs 9–11, behind the mid-axillary line.',{Anterior:[356,140]}],
  ['Transverse colon','Hangs on the transverse mesocolon; intraperitoneal and mobile.',{Anterior:[210,200]}],
  ['Ascending colon','Retroperitoneal, in the right flank; hepatic flexure under the liver.',{Anterior:[78,290]}],
  ['Descending colon','Retroperitoneal, in the left flank; splenic flexure is higher than the hepatic.',{Anterior:[338,290]}],
  ['Jejunum and ileum','Jejunum mostly upper left, ileum lower right: about 6 m of small bowel on the mesentery.',{Anterior:[200,306]}],
  ['Caecum','Blind pouch in the right iliac fossa below the ileocaecal valve.',{Anterior:[86,360]}],
  ['Appendix','Base at McBurney\'s point (one-third from ASIS to umbilicus), where the three taeniae coli converge; tip position varies (retrocaecal commonest).',{Anterior:[84,416]}],
  ['Sigmoid colon','Intraperitoneal on the sigmoid mesocolon in the left iliac fossa; site of diverticular disease and volvulus.',{Anterior:[270,404]}],
  ['Bladder','Pelvic organ; rises above the pubis into the hypogastrium when full.',{Anterior:[208,444]}]
 ]};

/* ---------- kidney, coronal ---------- */
X.plates.kidney={title:'Kidney in coronal section',cap:'Right kidney; hilum faces medially (right of the drawing).',views:['Coronal'],
 clin:'At the hilum, front to back: renal vein, renal artery, renal pelvis (VAP). Hydronephrosis distends the calyces and pelvis when outflow is blocked. Kidneys lie at T12–L3, the right a little lower (liver above it); the hila are at L1.',
 svg:{Coronal:{vb:'0 0 400 460',s:`
  <path d="M120,40 C190,10 270,40 290,80 C280,100 250,110 244,126 L300,60 L320,74 L262,140" fill="color-mix(in srgb,var(--sys-endo) 30%,var(--paper))" stroke="var(--sys-endo)"/>
  <path d="M150,70 C80,80 50,170 56,250 C60,330 110,410 180,410 C240,410 270,370 272,330 C260,300 240,290 238,240 C236,200 256,180 270,160 C266,110 220,62 150,70 Z" fill="color-mix(in srgb,var(--sys-renal) 38%,var(--paper))" stroke="var(--sys-renal)" stroke-width="2.4"/>
  <path d="M150,96 C100,104 80,170 84,250 C88,320 124,384 180,384 C220,384 240,360 244,334 C230,310 218,290 216,240 C214,200 226,180 240,166 C236,128 200,92 150,96 Z" fill="color-mix(in srgb,var(--sys-renal) 22%,var(--paper))"/>
  ${[[110,150,180,210],[96,230,176,246],[108,312,178,284],[146,358,190,320]].map(([x1,y1,x2,y2])=>`<path d="M${x1},${y1} L${x1+30},${y1-26} L${x2},${y2} Z" fill="color-mix(in srgb,var(--sys-renal) 60%,var(--paper))" stroke="var(--sys-renal)"/>`).join('')}
  <path d="M196,196 C214,206 226,220 228,240 C230,268 214,290 196,300 C220,300 248,290 262,270 C280,262 300,262 310,272 L330,440 L344,440 L322,262 C306,240 270,230 262,214 C252,198 222,190 196,196 Z" fill="color-mix(in srgb,var(--sys-renal) 12%,var(--paper))" stroke="var(--ink-2)" stroke-width="1.6"/>
  <path d="M236,220 L360,206" stroke="var(--artery)" stroke-width="10"/><path d="M240,250 L360,244" stroke="var(--vein)" stroke-width="12"/>`}},
 items:[
  ['Renal capsule','Tough fibrous coat; outside it lie perirenal fat, renal (Gerota\'s) fascia and pararenal fat.',{Coronal:[66,200]}],
  ['Renal cortex','Contains glomeruli and convoluted tubules; extends between the pyramids as renal columns.',{Coronal:[96,300]}],
  ['Renal pyramid (medulla)','Loops of Henle and collecting ducts; 8–18 per kidney.',{Coronal:[140,232]}],
  ['Renal column','Cortex dipping between pyramids; carries interlobar vessels.',{Coronal:[124,196]}],
  ['Renal papilla','Apex of a pyramid, draining into a minor calyx.',{Coronal:[176,246]}],
  ['Minor calyx','Cup around one papilla; 2–3 join to form a major calyx.',{Coronal:[200,212]}],
  ['Major calyx','Two or three per kidney, opening into the renal pelvis.',{Coronal:[222,282]}],
  ['Renal pelvis','Funnel-shaped start of the ureter; the pelviureteric junction is the first narrowing where stones lodge.',{Coronal:[270,262]}],
  ['Ureter','Runs down on psoas, crosses the pelvic brim at the common iliac bifurcation, enters the bladder obliquely.',{Coronal:[328,400]}],
  ['Renal artery','From the aorta at L1/2; anterior and posterior divisions, then five segmental (end) arteries. The right artery passes behind the IVC.',{Coronal:[320,206]}],
  ['Renal vein','Front of the hilum. The left renal vein crosses in front of the aorta below the SMA and receives the left gonadal and adrenal veins.',{Coronal:[320,244]}],
  ['Adrenal (suprarenal) gland','On the upper pole inside the renal fascia but in its own compartment, so it stays when the kidney is removed.',{Coronal:[180,40]}]
 ]};

/* ---------- inguinal region ---------- */
X.plates.inguinal={title:'Right inguinal region, anterior view',cap:'External oblique removed. Patient\'s right side: lateral on the left of the drawing.',views:['Anterior'],
 clin:'Indirect hernia: through the deep ring, lateral to the inferior epigastric vessels, down the canal (often into the scrotum); controlled by pressure over the deep ring. Direct hernia: through Hesselbach\'s triangle, medial to the vessels. Femoral hernia: below the inguinal ligament, lateral and below the pubic tubercle, through the femoral canal; narrow neck, high strangulation risk.',
 svg:{Anterior:{vb:'0 0 440 360',s:`
  <path d="M40,60 C160,120 260,190 360,250" stroke="var(--bone-line)" stroke-width="5" fill="none"/>
  <circle cx="40" cy="60" r="10" ${bone}/><circle cx="364" cy="252" r="9" ${bone}/>
  <rect x="330" y="30" width="80" height="200" rx="10" fill="color-mix(in srgb,var(--muscle) 30%,var(--paper))" stroke="var(--muscle)"/>
  <path d="M330,226 L296,92 L240,182 Z" fill="var(--clin-tint)" stroke="var(--clin)" stroke-dasharray="5 3"/>
  <path d="M286,60 C276,110 262,150 244,176 L236,200" stroke="var(--artery)" stroke-width="4" fill="none"/><path d="M294,60 C284,110 270,150 252,176" stroke="var(--vein)" stroke-width="3" fill="none"/>
  <ellipse cx="206" cy="160" rx="18" ry="13" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.4"/>
  <ellipse cx="336" cy="232" rx="16" ry="11" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.4"/>
  <path d="M206,170 C250,196 300,222 334,236" stroke="color-mix(in srgb,var(--sys-repro) 70%,var(--paper))" stroke-width="12" stroke-linecap="round" fill="none" opacity=".7"/>
  <path d="M344,244 C350,280 352,310 348,344" stroke="color-mix(in srgb,var(--sys-repro) 70%,var(--paper))" stroke-width="12" stroke-linecap="round" fill="none" opacity=".7"/>
  <path d="M196,236 L200,350" stroke="var(--nerve)" stroke-width="7"/><path d="M226,236 L228,350" stroke="var(--artery)" stroke-width="10"/><path d="M256,236 L258,350" stroke="var(--vein)" stroke-width="11"/>
  <rect x="270" y="236" width="20" height="40" rx="6" fill="var(--paper)" stroke="var(--ink-2)" stroke-dasharray="3 3"/>
  ${lab(40,40,'ASIS','start')}`}},
 items:[
  ['Anterior superior iliac spine','Lateral attachment of the inguinal ligament.',{Anterior:[40,60]}],
  ['Inguinal ligament','Rolled lower edge of the external oblique aponeurosis from ASIS to pubic tubercle: floor of the canal.',{Anterior:[130,104]}],
  ['Pubic tubercle','Medial attachment. Inguinal hernias appear above and medial to it; femoral hernias below and lateral.',{Anterior:[364,252]}],
  ['Deep inguinal ring','Opening in the transversalis fascia about 1.5 cm above the midpoint of the inguinal ligament, lateral to the inferior epigastric vessels.',{Anterior:[206,160]}],
  ['Superficial inguinal ring','Triangular gap in the external oblique aponeurosis just above and lateral to the pubic tubercle.',{Anterior:[336,232]}],
  ['Spermatic cord (round ligament in females)','Runs through the canal; the ilioinguinal nerve accompanies it out of the superficial ring.',{Anterior:[270,206]}],
  ['Inferior epigastric vessels','Rise from the external iliac vessels: the landmark dividing indirect (lateral) from direct (medial) hernias.',{Anterior:[264,120]}],
  ['Hesselbach\'s (inguinal) triangle','Inferior epigastric vessels, lateral edge of rectus abdominis, inguinal ligament: site of direct hernias.',{Anterior:[296,180]}],
  ['Rectus abdominis','Its lateral border forms the medial side of Hesselbach\'s triangle.',{Anterior:[370,110]}],
  ['Femoral nerve','Lateral, outside the femoral sheath (NAVY: nerve, artery, vein, Y-fronts).',{Anterior:[198,300]}],
  ['Femoral artery','Mid-inguinal point: halfway between ASIS and pubic symphysis.',{Anterior:[227,300]}],
  ['Femoral vein','Medial to the artery: femoral venous access.',{Anterior:[257,300]}],
  ['Femoral canal','Medial compartment of the femoral sheath (lymphatics, Cloquet\'s node): femoral hernia route.',{Anterior:[280,256]}]
 ]};

/* ---------- flowcharts ---------- */
X.trees.abCoeliac={kind:'artery',dir:'ltr',root:{t:'Coeliac trunk',s:'T12 · foregut',d:'Short trunk just below the aortic hiatus. Supplies the foregut from the abdominal oesophagus to the major duodenal papilla, plus liver, gallbladder, pancreas (part) and spleen.',c:[
  {t:'Left gastric a.',s:'lesser curvature',d:'Gives oesophageal branches through the hiatus; anastomoses with the right gastric.'},
  {t:'Splenic a.',s:'tortuous, along pancreas',d:'Runs along the upper border of the pancreas to the splenic hilum.',c:[
    {t:'Pancreatic branches',d:'Body and tail of the pancreas.'},{t:'Short gastric aa.',d:'Fundus of the stomach.'},{t:'Left gastro-omental a.',d:'Greater curvature (left).'}]},
  {t:'Common hepatic a.',s:'to the right',d:'Runs right along the upper border of the pancreas.',c:[
    {t:'Proper hepatic a.',s:'in the hepatoduodenal lig.',d:'With the portal vein and bile duct (portal triad); compress them all in the Pringle manoeuvre.',c:[
      {t:'Right gastric a.',d:'Lesser curvature (right).'},{t:'Right hepatic a.',s:'→ cystic a.',d:'The cystic artery usually arises here, within Calot\'s triangle.'},{t:'Left hepatic a.',d:'Left lobe.'}]},
    {t:'Gastroduodenal a.',s:'behind 1st part of duodenum',d:'Eroded by a posterior duodenal ulcer: major upper GI bleed.',c:[
      {t:'Right gastro-omental a.',d:'Greater curvature (right).'},{t:'Superior pancreaticoduodenal aa.',d:'Head of pancreas and duodenum; anastomose with the inferior branches from the SMA.'}]}]}]}};
X.trees.abSMA={kind:'artery',dir:'ltr',root:{t:'Superior mesenteric a.',s:'L1 · midgut',d:'Arises behind the neck of the pancreas and passes in front of the 3rd part of the duodenum and the left renal vein. Supplies from the major papilla to two-thirds along the transverse colon.',c:[
  {t:'Inferior pancreaticoduodenal a.',d:'Head of pancreas and lower duodenum.'},
  {t:'Jejunal and ileal aa.',s:'15–18 branches',d:'Form arcades: jejunum has long vasa recta and few arcades; ileum short vasa recta and many arcades.'},
  {t:'Middle colic a.',d:'Transverse colon; anastomoses with the left colic via the marginal artery.'},
  {t:'Right colic a.',d:'Ascending colon.'},
  {t:'Ileocolic a.',s:'last branch',d:'Terminal ileum, caecum and appendix.',c:[{t:'Appendicular a.',d:'An end artery in the free edge of the mesoappendix: thrombosis leads to gangrene and perforation.'}]}]}};
X.trees.abIMA={kind:'artery',dir:'ltr',root:{t:'Inferior mesenteric a.',s:'L3 · hindgut',d:'Supplies the distal third of the transverse colon to the upper anal canal (above the pectinate line).',c:[
  {t:'Left colic a.',d:'Descending colon; joins the middle colic through the marginal artery. The splenic flexure is a watershed (ischaemic colitis).'},
  {t:'Sigmoid aa.',s:'2–4',d:'Sigmoid colon.'},
  {t:'Superior rectal a.',s:'terminal branch',d:'Upper rectum and anal canal above the pectinate line; its vein drains to the portal system.'}]}};
X.trees.abPortal={kind:'vein',dir:'rtl',root:{t:'Liver',s:'→ hepatic veins → IVC',d:'The portal vein brings about 75% of liver blood flow (nutrient-rich, oxygen-poor); the hepatic artery the rest. Blood leaves by the hepatic veins into the IVC.',c:[
  {t:'Hepatic portal vein',s:'forms at L1/2 behind pancreatic neck',d:'Runs up in the free edge of the lesser omentum behind the bile duct and hepatic artery.',c:[
    {t:'Splenic vein',s:'behind pancreas',d:'Receives pancreatic veins, short gastric and left gastro-omental veins.',c:[
      {t:'Inferior mesenteric vein',s:'usually joins splenic',d:'Drains the hindgut including the superior rectal vein (a portosystemic anastomosis site).'}]},
    {t:'Superior mesenteric vein',s:'beside the SMA',d:'Drains the midgut: jejunal, ileal, ileocolic, right and middle colic, right gastro-omental and inferior pancreaticoduodenal veins.'},
    {t:'Left and right gastric veins',d:'Lesser curvature. Oesophageal tributaries of the left gastric vein anastomose with the azygos system: oesophageal varices in portal hypertension.'},
    {t:'Paraumbilical veins',s:'in the ligamentum teres',d:'Link to the anterior abdominal wall veins: caput medusae in portal hypertension.'},
    {t:'Cystic vein',d:'From the gallbladder.'}]}]}};
X.trees.abLymph={kind:'lymph',dir:'rtl',root:{t:'Left venous angle',s:'IJV + subclavian',d:'The thoracic duct returns about three-quarters of the body\'s lymph here. The right lymphatic duct drains the right arm, right side of the head, neck and thorax into the right venous angle.',c:[
  {t:'Thoracic duct',s:'T12 → root of neck',d:'Through the aortic hiatus, up the posterior mediastinum, crossing left at T4/5.',c:[
    {t:'Cisterna chyli',s:'L1/2',d:'Sac at the start of the thoracic duct receiving the abdominal trunks.',c:[
      {t:'Intestinal trunk',d:'From coeliac, superior and inferior mesenteric nodes: chyle (fat absorbed by lacteals).'},
      {t:'Right and left lumbar trunks',d:'From para-aortic (lateral aortic) nodes: lower limbs (via inguinal and iliac nodes), pelvic organs, kidneys, testes or ovaries.'}]},
    {t:'Left bronchomediastinal trunk',d:'Left lung, heart and mediastinum (may enter the vein separately).'},
    {t:'Left subclavian and jugular trunks',d:'Left arm, left head and neck. Enlarged left supraclavicular (Virchow\'s) node can signal gastric or other abdominal cancer.'}]}]}};

/* ---------- quiz ---------- */
X.quiz.push(
 {id:'ab1',c:'abdomen',type:'sba',q:'A 78-year-old with atrial fibrillation has severe abdominal pain out of proportion to examination. CT shows an embolus in the artery arising from the aorta at L1. Which part of the bowel is NOT at risk?',o:['Ascending colon','Caecum','Ileum','Jejunum','Sigmoid colon'],a:4,e:'The SMA (L1) supplies the midgut, from the major duodenal papilla to two-thirds along the transverse colon. The sigmoid colon is hindgut, supplied by the IMA (L3).'},
 {id:'ab2',c:'abdomen',type:'sba',q:'A 21-year-old has central abdominal pain that moves to the right iliac fossa over 12 hours. Why does the pain start centrally?',o:['The appendix lies behind the umbilicus','Visceral afferents from the appendix enter the cord at about T10','The parietal peritoneum is inflamed first','The vagus refers pain to the umbilicus','The ilioinguinal nerve supplies the appendix'],a:1,e:'Early visceral pain is felt in the dermatome of the cord segment receiving the afferents (midgut T10, the umbilicus). Once the inflamed appendix irritates the parietal peritoneum (somatic), pain localises to McBurney\'s point.'},
 {id:'ab3',c:'abdomen',type:'sba',q:'A groin hernia appears above and medial to the pubic tubercle, and does not reappear on coughing when you press over the midpoint of the inguinal ligament. What type is it?',o:['Direct inguinal','Femoral','Indirect inguinal','Obturator','Spigelian'],a:2,e:'Pressure over the deep ring (just above the midpoint of the inguinal ligament) controls an indirect hernia, which enters the canal through the deep ring lateral to the inferior epigastric vessels.'},
 {id:'ab4',c:'abdomen',type:'sba',q:'A man with cirrhosis vomits blood. Varices have formed where the portal system meets systemic veins. Which portal tributary is involved?',o:['Inferior mesenteric vein','Left gastric vein','Paraumbilical vein','Splenic vein','Superior rectal vein'],a:1,e:'Oesophageal branches of the left gastric vein (portal) anastomose with oesophageal veins draining to the azygos (systemic). Paraumbilical: caput medusae; superior rectal: rectal varices.'},
 {id:'ab5',c:'abdomen',type:'sba',q:'Which structure is retroperitoneal?',o:['Jejunum','Second part of the duodenum','Sigmoid colon','Stomach','Transverse colon'],a:1,e:'The duodenum (2nd–4th parts) is retroperitoneal (SAD PUCKER). The others hang on a mesentery or omenta.'},
 {id:'ab6',c:'abdomen',type:'sba',q:'A patient has painless jaundice and a palpable gallbladder. Where is the obstruction most likely to be?',o:['Common hepatic duct above the cystic duct','Cystic duct','Head of the pancreas, compressing the common bile duct','Left hepatic duct','Neck of the gallbladder'],a:2,e:'Courvoisier\'s law: a palpable gallbladder with painless jaundice suggests malignant obstruction of the distal common bile duct (pancreatic head). A block above the cystic duct would not distend the gallbladder.'},
 {id:'ab7',c:'abdomen',type:'sba',q:'A 40-year-old has severe colicky pain spreading from the loin to the groin and scrotum. Pain from the ureter is referred along these dermatomes because its sensory fibres enter the spinal cord at which segments?',o:['L3–L5','S2–S4','T5–T9','T10 only','T11–L2'],a:4,e:'Ureteric afferents travel with sympathetic fibres to T11–L2, so pain is felt from the loin (T11–12) to the groin and scrotum or labia (L1). Stones lodge at the pelviureteric junction, pelvic brim and vesicoureteric junction.'},
 {id:'ab8',c:'abdomen',type:'sba',q:'At the renal hilum, what is the order of structures from front to back?',o:['Artery, pelvis, vein','Artery, vein, pelvis','Pelvis, artery, vein','Vein, artery, pelvis','Vein, pelvis, artery'],a:3,e:'VAP: renal Vein most anterior, then Artery, then the Pelvis of the ureter posteriorly.'},
 {id:'ab9',c:'abdomen',type:'sba',q:'An anal squamous cell carcinoma below the pectinate line will first spread to which nodes?',o:['Coeliac nodes','Inferior mesenteric nodes','Internal iliac nodes','Para-aortic nodes','Superficial inguinal nodes'],a:4,e:'Below the pectinate line the anal canal is ectodermal: somatic nerves (painful), systemic veins and superficial inguinal lymph drainage.'},
 {id:'ab10',c:'abdomen',type:'vsaq',q:'Name the vertebral level of the transpyloric plane.',a:['l1','firstlumbar','l1vertebra'],e:'L1: pylorus, pancreatic neck, SMA origin, renal hila, gallbladder fundus (9th costal cartilage), end of spinal cord.'},
 {id:'ab11',c:'abdomen',type:'vsaq',q:'Name the opening that connects the greater sac with the lesser sac.',a:['epiploicforamen','foramenofwinslow','omentalforamen','winslow','epiploicforamenofwinslow'],e:'The epiploic (omental) foramen of Winslow, behind the free edge of the lesser omentum (portal triad in front, IVC behind).'},
 {id:'ab12',c:'abdomen',type:'vsaq',q:'Which artery is the terminal branch of the inferior mesenteric artery?',a:['superiorrectal','superiorrectalartery','superiorrectala'],e:'The superior rectal artery, supplying the upper rectum and the anal canal above the pectinate line.'}
);
Object.assign(X.model,{ab10:'L1',ab11:'Epiploic foramen (of Winslow)',ab12:'Superior rectal artery'});
})();
