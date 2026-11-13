/* Pelvis, perineum and reproductive chapter: plates, flowcharts and quiz items. */
(function(){
'use strict';
const X=window.ATLAS_EXT, {lab}=window.ATLAS_UTIL;
const bone='fill="var(--bone)" stroke="var(--bone-line)" stroke-width="1.6"';
const org=(c,o)=>`fill="color-mix(in srgb,var(${c}) ${o||30}%,var(--paper))" stroke="var(${c})" stroke-width="1.6"`;
const musc=o=>`fill="color-mix(in srgb,var(--muscle) ${o||35}%,var(--paper))" stroke="var(--muscle)" stroke-width="1.4"`;

/* ---------- bony pelvis ---------- */
(function(){
  const half=`<path d="M40,64 C84,30 164,40 192,92 L198,150 C176,168 156,188 144,212 C134,238 122,258 92,250 C62,242 52,204 60,172 C42,140 30,100 40,64 Z" ${bone}/>
   <path d="M144,212 C150,252 172,282 206,294 L216,294 L214,276 C196,268 184,250 182,232 C200,226 206,214 204,204 L170,206 Z" ${bone}/>
   <ellipse cx="156" cy="258" rx="20" ry="26" fill="var(--bone-art)" stroke="var(--bone-line)"/>
   <circle cx="112" cy="210" r="24" fill="var(--bone-art)" stroke="var(--bone-line)" stroke-width="1.6"/>
   <path d="M72,120 C110,104 160,108 190,140" fill="none" stroke="var(--bone-detail)" stroke-width="2.4"/>`;
  X.plates.bonypelvis={title:'Bony pelvis, anterior view',cap:'Two hip bones (ilium, ischium, pubis fused at the acetabulum), sacrum and coccyx.',views:['Anterior'],
   clin:'The pelvic brim (sacral promontory, arcuate lines, pectineal lines, pubic crest) divides the greater (false) pelvis above from the lesser (true) pelvis below. The female pelvis has a wider, rounder inlet, a subpubic angle near 90° (male about 60°) and everted ischial spines: adaptations for childbirth. Pelvic ring fractures can bleed massively from the internal iliac veins and sacral plexus: a pelvic binder at the trochanters is life-saving.',
   svg:{Anterior:{vb:'0 0 440 330',s:`${half}<g transform="translate(440,0) scale(-1,1)">${half}</g>
    <path d="M182,92 L258,92 L248,206 C240,232 230,246 220,252 C210,246 200,232 192,206 Z" ${bone}/>
    <path d="M190,110 H250 M192,140 H248 M196,170 H244" stroke="var(--bone-detail)" stroke-width="1.4"/>
    <rect x="214" y="270" width="12" height="28" rx="3" fill="color-mix(in srgb,var(--bone-detail) 50%,var(--paper))" stroke="var(--bone-line)"/>
    ${lab(70,320,'RIGHT','start')}${lab(370,320,'LEFT','end')}`}},
   items:[
    ['Iliac crest','Top of the ilium; tops of the crests mark L4 (lumbar puncture landmark).',{Anterior:[80,48]}],
    ['Anterior superior iliac spine','Attachment of the inguinal ligament and sartorius; landmark for McBurney\'s point and the mid-inguinal point.',{Anterior:[44,72]}],
    ['Anterior inferior iliac spine','Origin of rectus femoris (straight head) and the iliofemoral ligament.',{Anterior:[58,170]}],
    ['Iliac fossa','Concave inner surface of the ilium: origin of iliacus.',{Anterior:[110,96]}],
    ['Sacral promontory','Front of the S1 body; posterior point of the pelvic brim. Obstetric conjugate is measured from here.',{Anterior:[220,96]}],
    ['Sacroiliac joint','Synovial in front, fibrous behind; very strong ligaments transmit body weight.',{Anterior:[190,120]}],
    ['Arcuate line (pelvic brim)','Ridge on the inner ilium marking the edge of the true pelvis.',{Anterior:[156,126]}],
    ['Acetabulum','Socket formed by ilium, ischium and pubis; meets the femoral head.',{Anterior:[112,210]}],
    ['Obturator foramen','Closed by the obturator membrane except the obturator canal (obturator nerve and vessels).',{Anterior:[156,258]}],
    ['Pubic tubercle','Attachment of the inguinal ligament; landmark for inguinal and femoral hernias.',{Anterior:[196,272]}],
    ['Pubic symphysis','Secondary cartilaginous joint (fibrocartilage disc). Behind it lies the bladder.',{Anterior:[220,284]}],
    ['Ischial tuberosity','Weight-bearing when sitting; hamstring origin; attachment of the sacrotuberous ligament.',{Anterior:[168,290]}],
    ['Ischial spine','Attachment of the sacrospinous ligament; landmark for a pudendal nerve block, which crosses just behind it.',{Anterior:[186,226]}],
    ['Sacrum and coccyx','Five fused sacral vertebrae; the sacral hiatus at the bottom allows caudal epidural injections.',{Anterior:[220,180]}]
   ]};
})();

/* ---------- pelvic floor ---------- */
X.plates.pelvicfloor={title:'Pelvic floor from above',cap:'Female pelvis, front at the top. Levator ani plus coccygeus form the pelvic diaphragm.',views:['Superior'],
 clin:'"S2, 3, 4 keeps the wee and poo off the floor": levator ani is supplied by the nerve to levator ani (S4) and the pudendal nerve (S2–4). Stretching or tearing in childbirth weakens it, leading to stress incontinence and uterovaginal prolapse. Puborectalis keeps the anorectal angle; it relaxes for defecation.',
 svg:{Superior:{vb:'0 0 420 380',s:`
  <path d="M210,30 C320,30 396,110 392,200 C388,300 310,360 210,360 C110,360 32,300 28,200 C24,110 100,30 210,30 Z" fill="var(--bone)" stroke="var(--bone-line)" stroke-width="2"/>
  <path d="M210,54 C306,56 368,120 364,200 C360,284 300,334 210,336 C120,334 60,284 56,200 C52,120 114,56 210,54 Z" ${musc(18)}/>
  <path d="M86,240 C96,176 140,120 180,100 L190,150 C150,170 120,210 120,262 Z" ${musc(40)}/><path d="M334,240 C324,176 280,120 240,100 L230,150 C270,170 300,210 300,262 Z" ${musc(40)}/>
  <path d="M120,262 C130,190 170,150 196,150 L200,232 C186,260 160,282 136,290 Z" ${musc(55)}/><path d="M300,262 C290,190 250,150 224,150 L220,232 C234,260 260,282 284,290 Z" ${musc(55)}/>
  <path d="M182,214 C176,256 186,292 210,300 C234,292 244,256 238,214" fill="none" stroke="var(--muscle)" stroke-width="12" opacity=".75"/>
  <path d="M100,276 C130,300 170,318 200,326 L210,330 L220,326 C250,318 290,300 320,276 L300,262 C270,288 240,302 210,306 C180,302 150,288 120,262 Z" ${musc(70)}/>
  <ellipse cx="210" cy="132" rx="12" ry="10" ${org('--sys-renal',45)}/><ellipse cx="210" cy="176" rx="20" ry="14" ${org('--sys-repro',45)}/><circle cx="210" cy="252" r="20" ${org('--sys-gi',45)}/>
  <rect x="198" y="330" width="24" height="16" rx="4" fill="var(--bone-detail)"/>
  ${lab(210,22,'PUBIC SYMPHYSIS')}${lab(210,372,'COCCYX')}`}},
 items:[
  ['Urethra','Passes through the urogenital hiatus at the front.',{Superior:[210,132]}],
  ['Vagina','Also through the urogenital hiatus, behind the urethra.',{Superior:[210,176]}],
  ['Rectum (anorectal junction)','Behind the hiatus, wrapped by puborectalis.',{Superior:[210,252]}],
  ['Puborectalis','U-shaped sling from the pubis around the anorectal junction: maintains the 90° anorectal angle for continence.',{Superior:[236,286]}],
  ['Pubococcygeus','From the pubis back to the coccyx, beside the hiatus.',{Superior:[166,214]}],
  ['Iliococcygeus','From the tendinous arch over obturator internus to the coccyx: thinner lateral part.',{Superior:[112,190]}],
  ['Coccygeus (ischiococcygeus)','From the ischial spine to the coccyx; overlies the sacrospinous ligament. Nerves S4–S5.',{Superior:[280,306]}],
  ['Obturator internus (side wall)','Covered by fascia whose thickening (tendinous arch) anchors iliococcygeus.',{Superior:[66,170]}],
  ['Urogenital hiatus','Gap in the front of levator ani for the urethra (and vagina): weak point for prolapse.',{Superior:[236,160]}]
 ]};

/* ---------- female reproductive tract ---------- */
X.plates.femcoronal={title:'Female reproductive tract, posterior view',cap:'Uterus, tubes and ovaries with their ligaments; broad ligament shaded.',views:['Posterior'],
 clin:'Fertilisation usually occurs in the ampulla, the commonest site of ectopic pregnancy. The uterine artery (from the internal iliac) crosses above the ureter about 2 cm lateral to the cervix ("water under the bridge"): the ureter is at risk when the artery is clamped at hysterectomy. The ovarian artery comes from the aorta at L2 in the suspensory ligament.',
 svg:{Posterior:{vb:'0 0 440 340',s:`
  <path d="M40,150 C80,110 150,100 190,96 L250,96 C290,100 360,110 400,150 L380,230 C320,200 270,210 250,230 L190,230 C170,210 120,200 60,230 Z" fill="color-mix(in srgb,var(--sys-repro) 10%,var(--paper))" stroke="var(--sys-repro)" stroke-dasharray="5 4"/>
  <path d="M188,90 C186,60 254,60 252,90 L250,180 C248,200 236,214 228,232 L212,232 C204,214 192,200 190,180 Z" ${org('--sys-repro',38)}/>
  <rect x="208" y="232" width="24" height="30" rx="6" ${org('--sys-repro',55)}/><path d="M206,262 L202,330 L238,330 L234,262 Z" ${org('--sys-repro',22)}/>
  <path d="M190,100 C150,92 110,92 80,110 C64,120 56,134 58,150" fill="none" stroke="color-mix(in srgb,var(--sys-repro) 70%,var(--paper))" stroke-width="9" stroke-linecap="round"/>
  <path d="M250,100 C290,92 330,92 360,110 C376,120 384,134 382,150" fill="none" stroke="color-mix(in srgb,var(--sys-repro) 70%,var(--paper))" stroke-width="9" stroke-linecap="round"/>
  <path d="M50,150 l-8,14 M58,152 l-2,16 M66,150 l6,14" stroke="var(--sys-repro)" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="96" cy="164" rx="28" ry="16" ${org('--sys-endo',40)}/><ellipse cx="344" cy="164" rx="28" ry="16" ${org('--sys-endo',40)}/>
  <path d="M122,166 L190,150 M318,166 L250,150" stroke="var(--ink-2)" stroke-width="3"/>
  <path d="M70,160 C50,130 40,90 30,50 M370,160 C390,130 400,90 410,50" stroke="var(--artery)" stroke-width="3" fill="none"/>
  <path d="M190,122 C150,150 110,200 70,300 M250,122 C290,150 330,200 370,300" stroke="var(--ink-2)" stroke-width="2.4" fill="none" stroke-dasharray="2 4"/>
  <path d="M120,300 C150,280 180,250 214,240" stroke="var(--artery)" stroke-width="3.5" fill="none"/>
  <path d="M150,330 C160,300 176,270 196,250" stroke="color-mix(in srgb,var(--sys-renal) 80%,var(--paper))" stroke-width="5" fill="none"/>`}},
 items:[
  ['Fundus of uterus','Above the openings of the uterine tubes; palpable above the pubis from about 12 weeks of pregnancy.',{Posterior:[220,76]}],
  ['Body of uterus','Usual site of implantation. Wall: endometrium (glandular mucosa), myometrium (smooth muscle), perimetrium (peritoneum).',{Posterior:[220,140]}],
  ['Cervix','Ectocervix: stratified squamous; endocervical canal: columnar. The transformation zone between them is where cervical cancer starts (screened by HPV testing).',{Posterior:[220,246]}],
  ['Vagina','Fibromuscular canal; the urethra lies in front of it and the rectum behind.',{Posterior:[220,300]}],
  ['Ampulla of uterine tube','Widest part: usual site of fertilisation and of ectopic pregnancy.',{Posterior:[124,94]}],
  ['Isthmus of uterine tube','Narrow part next to the uterus.',{Posterior:[170,98]}],
  ['Infundibulum and fimbriae','Funnel with finger-like fimbriae that sweep the ovulated oocyte into the tube.',{Posterior:[58,156]}],
  ['Ovary','On the lateral pelvic wall (ovarian fossa); pain can refer to the medial thigh (obturator nerve nearby).',{Posterior:[96,164]}],
  ['Ligament of the ovary','From the ovary to the uterus, just below the tube.',{Posterior:[156,158]}],
  ['Suspensory ligament of the ovary','Carries the ovarian vessels from the lateral pelvic wall (ovarian artery from the aorta at L2).',{Posterior:[40,92]}],
  ['Round ligament of the uterus','From the uterine horn through the deep ring and inguinal canal to the labium majus: keeps the uterus anteverted.',{Posterior:[110,220]}],
  ['Broad ligament','Double fold of peritoneum draped over the uterus and tubes; the mesosalpinx, mesovarium and mesometrium are its parts.',{Posterior:[330,206]}],
  ['Uterine artery','From the anterior division of the internal iliac; crosses over the ureter near the cervix.',{Posterior:[160,276]}],
  ['Ureter','Passes under the uterine artery ("water under the bridge") on its way to the bladder.',{Posterior:[170,300]}]
 ]};
X.plates.femsagittal={title:'Female pelvis in sagittal section',cap:'Front to the left. Uterus in its usual anteverted and anteflexed position.',views:['Sagittal'],
 clin:'The rectouterine pouch (of Douglas) is the lowest point of the female peritoneal cavity: fluid, blood (ruptured ectopic) or pus collects here and can be reached through the posterior fornix. The urethra is short (about 4 cm) and opens just in front of the vagina, which is why UTIs are common.',
 svg:{Sagittal:{vb:'0 0 420 400',s:`
  <path d="M310,30 C370,90 380,200 350,280 C340,310 320,330 300,340" fill="none" stroke="var(--bone-line)" stroke-width="22" stroke-linecap="round" opacity=".55"/>
  <rect x="40" y="250" width="34" height="60" rx="10" ${bone}/>
  <path d="M84,220 C80,180 110,160 150,166 C180,170 190,200 184,230 C180,256 150,268 120,264 C96,260 86,242 84,220 Z" ${org('--sys-renal',30)}/>
  <path d="M150,170 C140,120 160,80 200,76 C236,72 252,104 240,140 C232,166 214,186 196,196 L186,214 L172,210 C176,196 168,184 150,170 Z" ${org('--sys-repro',38)}/>
  <path d="M180,212 C190,240 200,270 210,320 L228,320 C218,270 206,236 196,206 Z" ${org('--sys-repro',20)}/>
  <path d="M124,264 C130,290 136,320 140,350" stroke="color-mix(in srgb,var(--sys-renal) 70%,var(--paper))" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M290,60 C300,120 300,190 280,240 C268,270 262,300 266,350 L288,350 C286,300 292,270 304,240 C322,190 322,120 312,60 Z" ${org('--sys-gi',32)}/>
  <path d="M90,166 C120,140 150,150 160,170 M200,196 C230,230 262,240 280,230" fill="none" stroke="var(--sys-endo)" stroke-width="2.4"/>
  ${lab(40,20,'ANTERIOR','start')}${lab(400,20,'POSTERIOR','end')}`}},
 items:[
  ['Pubic symphysis','Anterior landmark; the bladder lies directly behind it.',{Sagittal:[57,280]}],
  ['Bladder','Behind the pubis, below the anteverted uterus.',{Sagittal:[134,216]}],
  ['Uterus (anteverted, anteflexed)','Tipped forwards on the vagina (anteverted) and bent forwards on the cervix (anteflexed). About 1 in 5 women have a retroverted uterus.',{Sagittal:[200,124]}],
  ['Vagina','Runs up and back from the vestibule; the cervix projects into its upper end, forming the fornices.',{Sagittal:[204,276]}],
  ['Urethra','About 4 cm; opens in the vestibule in front of the vaginal orifice.',{Sagittal:[134,320]}],
  ['Vesicouterine pouch','Shallow peritoneal pouch between bladder and uterus.',{Sagittal:[152,164]}],
  ['Rectouterine pouch (of Douglas)','Lowest point of the peritoneal cavity; reached through the posterior vaginal fornix.',{Sagittal:[250,226]}],
  ['Rectum','Follows the curve of the sacrum; ends at the anorectal junction where puborectalis loops round it.',{Sagittal:[296,190]}],
  ['Sacrum','Posterior wall of the pelvis.',{Sagittal:[356,180]}]
 ]};

/* ---------- male reproductive tract ---------- */
X.plates.malesagittal={title:'Male pelvis and genitalia in sagittal section',cap:'Front to the left.',views:['Sagittal'],
 clin:'Prostate cancer arises mostly in the peripheral zone, which lies against the rectum and is felt on digital rectal examination; benign prostatic hyperplasia affects the transition zone around the urethra, obstructing flow. The male urethra is about 20 cm: prostatic, membranous (through the external sphincter, the narrowest and least distensible part, at risk in catheterisation and pelvic fractures) and spongy.',
 svg:{Sagittal:{vb:'0 0 440 420',s:`
  <path d="M330,20 C390,90 396,200 366,280 C356,306 340,320 322,328" fill="none" stroke="var(--bone-line)" stroke-width="22" stroke-linecap="round" opacity=".55"/>
  <rect x="60" y="170" width="32" height="58" rx="10" ${bone}/>
  <path d="M110,140 C110,90 150,74 190,80 C226,86 240,118 232,150 C226,178 200,190 170,190 C136,190 112,172 110,140 Z" ${org('--sys-renal',30)}/>
  <ellipse cx="176" cy="210" rx="30" ry="22" ${org('--sys-endo',35)}/>
  <path d="M232,136 C252,142 262,160 258,180 L240,186 C238,168 236,154 226,148 Z" ${org('--sys-repro',40)}/>
  <path d="M176,190 L176,232 C176,250 168,262 156,272 C130,292 110,300 90,300 L40,300" fill="none" stroke="var(--sys-renal)" stroke-width="6" stroke-linecap="round"/>
  <path d="M150,262 C120,276 90,282 40,282 C26,282 22,300 30,308 C40,318 80,316 150,286 Z" ${org('--sys-repro',25)}/>
  <path d="M36,286 C20,284 14,300 24,310 C30,316 40,314 44,306" ${org('--sys-repro',45)}/>
  <ellipse cx="128" cy="356" rx="26" ry="32" ${org('--sys-repro',30)}/><path d="M150,336 C164,344 166,370 152,382" fill="none" stroke="var(--sys-repro)" stroke-width="7"/>
  <path d="M152,372 C178,352 120,300 104,250 C94,214 84,170 96,128 C112,64 210,52 238,104 C254,136 246,172 204,204" fill="none" stroke="var(--ink-2)" stroke-width="3"/>
  <path d="M168,232 L186,232" stroke="var(--muscle)" stroke-width="8" opacity=".7"/>
  <path d="M300,60 C312,130 312,200 296,250 C286,280 282,310 286,350 L306,350 C304,310 308,280 318,250 C332,200 332,130 320,60 Z" ${org('--sys-gi',32)}/>
  <path d="M232,150 C250,170 270,180 296,180" fill="none" stroke="var(--sys-endo)" stroke-width="2.4"/>
  ${lab(40,20,'ANTERIOR','start')}${lab(420,20,'POSTERIOR','end')}`}},
 items:[
  ['Bladder','Rests on the prostate; the internal urethral sphincter (smooth muscle) at its neck prevents retrograde ejaculation.',{Sagittal:[170,134]}],
  ['Prostate','Around the prostatic urethra below the bladder; secretions with PSA liquefy semen.',{Sagittal:[176,210]}],
  ['Seminal vesicle','Behind the bladder; makes about 70% of semen volume (alkaline, fructose-rich).',{Sagittal:[246,160]}],
  ['Vas deferens','From the tail of the epididymis through the inguinal canal in the spermatic cord, over the ureter, to join the seminal vesicle duct as the ejaculatory duct.',{Sagittal:[98,160]}],
  ['Prostatic urethra','Receives the ejaculatory and prostatic ducts.',{Sagittal:[176,224]}],
  ['Membranous urethra and external sphincter','Passes through the external urethral sphincter (skeletal, pudendal S2–4); bulbourethral glands sit beside it.',{Sagittal:[177,248]}],
  ['Spongy (penile) urethra','Runs in the corpus spongiosum to the external meatus on the glans.',{Sagittal:[110,296]}],
  ['Corpora cavernosa','Paired erectile bodies on the dorsum; erection is parasympathetic (S2–4, nitric oxide). "Point and shoot": parasympathetic erection, sympathetic emission.',{Sagittal:[96,284]}],
  ['Glans penis','Expanded end of the corpus spongiosum; sensory supply from the dorsal nerve of the penis (pudendal).',{Sagittal:[32,298]}],
  ['Testis','Seminiferous tubules (Sertoli cells, spermatogenesis) and Leydig cells (testosterone). Lymph to para-aortic nodes.',{Sagittal:[128,356]}],
  ['Epididymis','Head, body and tail on the back of the testis: sperm mature and are stored.',{Sagittal:[160,356]}],
  ['Rectovesical pouch','Lowest point of the male peritoneal cavity.',{Sagittal:[270,174]}],
  ['Rectum','Lies directly behind the prostate and seminal vesicles: DRE palpates the prostate through it.',{Sagittal:[310,260]}]
 ]};

/* ---------- breast ---------- */
X.plates.breast={title:'Breast in sagittal section',cap:'Over pectoralis major from the 2nd to the 6th rib, with an axillary tail.',views:['Sagittal'],
 clin:'Lymph: about 75% to axillary nodes, most of the rest to parasternal (internal thoracic) nodes from the medial breast. Most cancers arise in the upper outer quadrant. Tumour tethering Cooper\'s ligaments dimples the skin; blocked lymphatics give peau d\'orange; infiltration of pectoral fascia fixes the lump. Axillary clearance risks the long thoracic nerve (winged scapula) and the intercostobrachial nerve.',
 svg:{Sagittal:{vb:'0 0 400 380',s:`
  ${[60,120,180,240,300].map(y=>`<ellipse cx="44" cy="${y}" rx="16" ry="20" ${bone}/>`).join('')}
  <rect x="62" y="30" width="36" height="320" rx="10" ${musc(45)}/>
  <path d="M100,40 C200,40 300,110 320,190 C330,240 300,300 240,330 C190,350 140,350 100,340 Z" fill="color-mix(in srgb,var(--sys-skin) 18%,var(--paper))" stroke="var(--sys-skin)" stroke-width="1.6"/>
  <path d="M100,40 C200,40 300,110 320,190 C330,240 300,300 240,330 C190,350 140,350 100,340" fill="none" stroke="var(--ink-2)" stroke-width="3"/>
  ${[[170,120],[200,170],[150,180],[190,240],[150,270],[230,210]].map(([x,y])=>`<g>${[0,1,2,3].map(i=>`<circle cx="${x+(i%2)*12}" cy="${y+Math.floor(i/2)*12}" r="7" ${org('--sys-repro',45)}/>`).join('')}</g><path d="M${x+6},${y+6} C${(x+300)/2},${(y+190)/2} 300,190 322,192" fill="none" stroke="var(--sys-repro)" stroke-width="2"/>`).join('')}
  <ellipse cx="300" cy="192" rx="10" ry="6" fill="color-mix(in srgb,var(--sys-repro) 30%,var(--paper))" stroke="var(--sys-repro)"/>
  <path d="M322,182 C334,184 340,200 322,204 Z" fill="color-mix(in srgb,var(--sys-repro) 60%,var(--paper))" stroke="var(--sys-repro)"/>
  <path d="M110,90 C150,80 190,70 230,92 M110,300 C150,310 200,316 250,312" fill="none" stroke="var(--ink-2)" stroke-width="1.4" stroke-dasharray="4 3"/>
  ${lab(60,370,'CHEST WALL','start')}`}},
 items:[
  ['Lobules (glandular tissue)','15–20 lobes of milk-secreting alveoli embedded in fat; the glandular part responds to oestrogen and progesterone.',{Sagittal:[176,126]}],
  ['Lactiferous duct','One per lobe, converging on the nipple.',{Sagittal:[256,176]}],
  ['Lactiferous sinus','Dilated end of a duct behind the areola: milk collects here during feeding.',{Sagittal:[300,192]}],
  ['Nipple and areola','At about the 4th intercostal space in men and nulliparous women (dermatome T4).',{Sagittal:[330,193]}],
  ['Suspensory ligaments (of Cooper)','Fibrous bands from skin to deep fascia supporting the breast; tethered by cancer to cause dimpling.',{Sagittal:[170,80]}],
  ['Retromammary space','Loose areolar layer between breast and pectoral fascia: lets the breast move; implants are placed here or behind the muscle.',{Sagittal:[102,200]}],
  ['Pectoralis major and its fascia','Deep relation of most of the breast.',{Sagittal:[80,120]}],
  ['Ribs 2–6','Vertical extent of the breast; arterial supply from the internal thoracic (perforators in spaces 2–6), lateral thoracic and intercostal arteries.',{Sagittal:[44,180]}]
 ]};

/* ---------- flowcharts ---------- */
X.trees.pvIliac={kind:'artery',dir:'ltr',root:{t:'Internal iliac a.',s:'at the pelvic brim',d:'Divides into anterior (visceral) and posterior (parietal) divisions. Supplies pelvic organs, perineum, gluteal region and medial thigh.',c:[
  {t:'Anterior division',s:'mostly visceral',d:'Pelvic organs and perineum.',c:[
    {t:'Umbilical a.',s:'→ superior vesical',d:'Patent part gives the superior vesical arteries; the rest becomes the medial umbilical ligament.'},
    {t:'Obturator a.',d:'Through the obturator canal to the medial thigh.'},
    {t:'Inferior vesical a.',s:'male',d:'Bladder base, prostate, seminal vesicles, artery to the vas.'},
    {t:'Uterine a.',s:'female',d:'Crosses above the ureter near the cervix; runs up the side of the uterus to anastomose with the ovarian artery.'},
    {t:'Vaginal a.',s:'female',d:'Vagina and bladder base.'},
    {t:'Middle rectal a.',d:'Lower rectum.'},
    {t:'Internal pudendal a.',s:'leaves via greater sciatic foramen',d:'Re-enters via the lesser sciatic foramen into the pudendal canal: perineum, anal canal below the pectinate line, penis or clitoris.'},
    {t:'Inferior gluteal a.',d:'Gluteus maximus; below piriformis.'}]},
  {t:'Posterior division',s:'parietal',d:'Pelvic walls and buttock.',c:[
    {t:'Iliolumbar a.',d:'Iliacus, psoas, quadratus lumborum.'},{t:'Lateral sacral aa.',d:'Sacral canal contents.'},{t:'Superior gluteal a.',s:'above piriformis',d:'Largest branch; gluteus medius and minimus.'}]}]}};

/* ---------- quiz ---------- */
X.quiz.push(
 {id:'pv1',c:'pelvis',type:'sba',q:'During a hysterectomy, a structure is clamped about 2 cm lateral to the cervix along with the uterine artery. Which structure is most at risk?',o:['Internal iliac vein','Obturator nerve','Ovarian artery','Round ligament','Ureter'],a:4,e:'The ureter passes under the uterine artery near the lateral fornix ("water under the bridge").'},
 {id:'pv2',c:'pelvis',type:'sba',q:'A 28-year-old has a positive pregnancy test and sudden pelvic pain. Ultrasound shows an ectopic pregnancy. Where is it most likely to be?',o:['Ampulla of the uterine tube','Cervix','Infundibulum','Isthmus of the uterine tube','Ovary'],a:0,e:'Fertilisation normally occurs in the ampulla, and most ectopic pregnancies implant there.'},
 {id:'pv3',c:'pelvis',type:'sba',q:'After a difficult vaginal delivery, a woman leaks urine when she coughs. Damage to which nerve supply is most likely?',o:['Femoral nerve','Genitofemoral nerve','Obturator nerve','Pudendal nerve and nerve to levator ani (S2–4)','Superior gluteal nerve'],a:3,e:'Stretching of the pudendal nerve and levator ani during delivery weakens the external urethral sphincter and pelvic floor: stress incontinence.'},
 {id:'pv4',c:'pelvis',type:'sba',q:'A 28-year-old man has a testicular tumour. To which nodes will it spread first?',o:['Deep inguinal','External iliac','Internal iliac','Para-aortic (lumbar)','Superficial inguinal'],a:3,e:'The testis develops on the posterior abdominal wall and its lymphatics follow the testicular vessels to the para-aortic nodes at L1–L2. Scrotal skin drains to the superficial inguinal nodes.'},
 {id:'pv5',c:'pelvis',type:'sba',q:'On digital rectal examination, which part of the prostate do you feel, where most cancers arise?',o:['Anterior fibromuscular stroma','Central zone','Median lobe','Peripheral zone','Transition zone'],a:3,e:'The peripheral zone lies posteriorly against the rectum: about 70% of cancers arise here. Benign hyperplasia arises in the transition zone around the urethra.'},
 {id:'pv6',c:'pelvis',type:'sba',q:'Which part of the male urethra is narrowest, least distensible and most often damaged in pelvic fractures?',o:['Intramural (preprostatic)','Membranous','Navicular fossa','Prostatic','Spongy'],a:1,e:'The membranous urethra passes through the external sphincter and perineal membrane; it is torn from the prostate in pelvic fractures.'},
 {id:'pv7',c:'pelvis',type:'sba',q:'A woman has a breast lump in the upper inner quadrant. Which node group, besides the axillary nodes, is most likely to receive its lymph?',o:['Deep cervical','Infraclavicular only','Inguinal','Para-aortic','Parasternal (internal thoracic)'],a:4,e:'About 75% of breast lymph goes to axillary nodes; the medial breast also drains to parasternal nodes along the internal thoracic vessels.'},
 {id:'pv8',c:'pelvis',type:'sba',q:'Which nerve is blocked by injecting local anaesthetic near the ischial spine for perineal anaesthesia in labour?',o:['Genitofemoral','Ilioinguinal','Obturator','Posterior cutaneous nerve of the thigh','Pudendal'],a:4,e:'The pudendal nerve (S2–4) leaves the pelvis through the greater sciatic foramen, crosses the sacrospinous ligament next to the ischial spine and re-enters through the lesser foramen into the pudendal canal.'},
 {id:'pv9',c:'pelvis',type:'sba',q:'Fluid from a ruptured ectopic pregnancy collects first in which space when the patient is upright?',o:['Lesser sac','Paracolic gutter','Rectouterine pouch','Subphrenic space','Vesicouterine pouch'],a:2,e:'The rectouterine pouch (of Douglas) is the lowest point of the female peritoneal cavity.'},
 {id:'pv10',c:'pelvis',type:'vsaq',q:'Name the U-shaped part of levator ani that loops around the anorectal junction to maintain continence.',a:['puborectalis','puborectalismuscle'],e:'Puborectalis pulls the anorectal junction forwards (anorectal angle about 90°) and relaxes for defecation.'},
 {id:'pv11',c:'pelvis',type:'vsaq',q:'Which artery supplies the ovary?',a:['ovarianartery','ovarian','ovariana','theovarianartery'],e:'The ovarian artery, from the abdominal aorta at about L2, running in the suspensory ligament of the ovary. It anastomoses with the uterine artery.'},
 {id:'pv12',c:'pelvis',type:'vsaq',q:'Which nerve mediates the cremasteric reflex (L1–L2)?',a:['genitofemoral','genitofemoralnerve','genitalbranchofgenitofemoral','genitalbranchofthegenitofemoralnerve'],e:'The genital branch of the genitofemoral nerve supplies cremaster. An absent reflex suggests testicular torsion.'}
);
Object.assign(X.model,{pv10:'Puborectalis',pv11:'Ovarian artery',pv12:'Genitofemoral nerve (genital branch)'});
})();
