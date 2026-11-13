/* Head and neck chapter: plates, flowcharts and quiz items. (Skull, brain and cranial nerves are in the Nervous system chapter.) */
(function(){
'use strict';
const X=window.ATLAS_EXT, {lab}=window.ATLAS_UTIL;
const bone='fill="var(--bone)" stroke="var(--bone-line)" stroke-width="1.6"';
const org=(c,o)=>`fill="color-mix(in srgb,var(${c}) ${o||30}%,var(--paper))" stroke="var(${c})" stroke-width="1.6"`;
const musc=o=>`fill="color-mix(in srgb,var(--muscle) ${o||35}%,var(--paper))" stroke="var(--muscle)" stroke-width="1.4"`;

/* ---------- scalp ---------- */
X.plates.scalp={title:'Layers of the scalp',cap:'S-C-A-L-P, outside in, then the skull and dura.',views:['Section'],
 clin:'Scalp wounds bleed heavily because vessels in the dense connective tissue are held open and cannot retract: apply firm pressure or suture. A wound through the aponeurosis gapes. The loose areolar layer is the "danger area": infection spreads through it and along valveless emissary veins into the dural venous sinuses. Blood here gives a boggy swelling and can track to the eyelids (black eyes).',
 svg:{Section:{vb:'0 0 440 300',s:`
  <rect x="20" y="20" width="400" height="40" fill="color-mix(in srgb,var(--sys-skin) 35%,var(--paper))" stroke="var(--sys-skin)"/>
  ${[60,110,160,210,260,310,360].map(x=>`<path d="M${x},20 V8" stroke="var(--ink-2)" stroke-width="1.4"/>`).join('')}
  <rect x="20" y="60" width="400" height="42" fill="color-mix(in srgb,var(--sys-skin) 18%,var(--paper))" stroke="var(--line-2)"/>
  ${[90,190,300].map(x=>`<circle cx="${x}" cy="80" r="7" fill="var(--artery)"/><circle cx="${x+18}" cy="82" r="6" fill="var(--vein)"/>`).join('')}
  <rect x="20" y="102" width="400" height="18" fill="color-mix(in srgb,var(--ink-2) 35%,var(--paper))"/>
  <rect x="20" y="102" width="50" height="18" ${musc(60)}/><rect x="370" y="102" width="50" height="18" ${musc(60)}/>
  <rect x="20" y="120" width="400" height="40" fill="var(--paper)" stroke="var(--line-2)" stroke-dasharray="4 3"/>
  <rect x="20" y="160" width="400" height="10" fill="color-mix(in srgb,var(--bone-line) 30%,var(--paper))"/>
  <rect x="20" y="170" width="400" height="62" ${bone}/><path d="M20,190 H420 M20,212 H420" stroke="var(--bone-line)" opacity=".4"/>
  <path d="M248,140 C246,170 250,200 246,236" stroke="var(--vein)" stroke-width="4" fill="none"/>
  <rect x="20" y="232" width="400" height="12" fill="color-mix(in srgb,var(--ink-2) 30%,var(--paper))"/>
  <path d="M220,244 L280,244 L250,276 Z" fill="var(--vein-tint)" stroke="var(--vein)" stroke-width="1.6"/>
  ${lab(250,292,'DURAL VENOUS SINUS')}`}},
 items:[
  ['Skin','Thick, hair-bearing, many sebaceous glands (sebaceous cysts are common).',{Section:[40,40]}],
  ['Connective tissue (dense)','Fibrous septa binding skin to aponeurosis; vessels and nerves run here and are held open when cut, so wounds bleed freely.',{Section:[140,80]}],
  ['Aponeurosis (galea aponeurotica)','Tendon linking the frontal and occipital bellies of occipitofrontalis. Wounds through it gape.',{Section:[220,111]}],
  ['Occipitofrontalis','Frontal belly raises the eyebrows (facial nerve, temporal branch).',{Section:[45,111]}],
  ['Loose areolar tissue','The "danger area": lets the scalp slide; infection and blood spread here.',{Section:[140,140]}],
  ['Pericranium','Periosteum of the outer skull; firmly attached at sutures, so subperiosteal bleeds (cephalhaematoma) are limited to one bone.',{Section:[100,165]}],
  ['Emissary vein','Valveless vein linking scalp veins to the dural venous sinuses: route for intracranial spread of infection.',{Section:[248,190]}],
  ['Skull (with diploë)','Outer and inner tables with spongy diploë between.',{Section:[340,200]}],
  ['Dura mater','Periosteal and meningeal layers; the sinuses lie between them.',{Section:[100,238]}],
  ['Superficial temporal and occipital vessels','Rich anastomoses from internal and external carotid branches.',{Section:[90,80]}]
 ]};

/* ---------- facial sensation ---------- */
X.plates.facesensory={title:'Sensory supply of the face',cap:'Front view. The three trigeminal divisions, with C2–C3 over the angle of the jaw.',views:['Front'],
 clin:'Test light touch in each division (forehead, cheek, chin). Shingles of V1 (herpes zoster ophthalmicus) with vesicles on the tip of the nose (Hutchinson\'s sign, nasociliary branch) predicts eye involvement: urgent ophthalmology. The angle of the jaw is supplied by the great auricular nerve (C2–C3), not the trigeminal: a useful sign when someone has "non-anatomical" facial numbness.',
 svg:{Front:{vb:'0 0 360 420',s:`
  <defs><clipPath id="face-clip"><path d="M180,24 C270,24 316,100 314,190 C312,270 290,330 250,370 C226,394 200,404 180,404 C160,404 134,394 110,370 C70,330 48,270 46,190 C44,100 90,24 180,24 Z"/></clipPath></defs>
  <g clip-path="url(#face-clip)">
   <rect x="0" y="0" width="360" height="150" ${org('--sys-resp',35)}/>
   <path d="M164,150 L196,150 L204,236 L156,236 Z" ${org('--sys-resp',35)}/>
   <path d="M0,150 L164,150 L156,236 L204,236 L196,150 L360,150 L360,262 L0,262 Z" ${org('--sys-gi',35)}/>
   <rect x="0" y="262" width="360" height="160" ${org('--sys-lymph',35)}/>
   <path d="M0,300 C40,300 70,330 80,420 L0,420 Z M360,300 C320,300 290,330 280,420 L360,420 Z" ${org('--sys-endo',45)}/>
  </g>
  <path d="M180,24 C270,24 316,100 314,190 C312,270 290,330 250,370 C226,394 200,404 180,404 C160,404 134,394 110,370 C70,330 48,270 46,190 C44,100 90,24 180,24 Z" fill="none" stroke="var(--ink-2)" stroke-width="2"/>
  <path d="M110,170 C130,160 150,160 166,170 M194,170 C210,160 230,160 250,170" stroke="var(--ink)" stroke-width="2" fill="none"/>
  <path d="M150,300 C170,292 190,292 210,300 C190,312 170,312 150,300 Z" fill="none" stroke="var(--ink)" stroke-width="2"/>`}},
 items:[
  ['Ophthalmic division (V1)','Forehead and scalp to the vertex, upper eyelid, cornea (afferent limb of the corneal reflex), bridge and tip of the nose. Leaves the skull through the superior orbital fissure.',{Front:[180,90]}],
  ['External nasal branch of V1 (tip of nose)','Vesicles here in shingles (Hutchinson\'s sign) warn of eye involvement.',{Front:[180,226]}],
  ['Maxillary division (V2)','Lower eyelid, cheek, side of the nose, upper lip, upper teeth. Leaves through foramen rotundum.',{Front:[100,206]}],
  ['Mandibular division (V3)','Lower lip, chin, lower teeth, skin over the mandible and in front of the ear; general sensation of the anterior two-thirds of the tongue (lingual nerve); motor to muscles of mastication. Leaves through foramen ovale.',{Front:[180,340]}],
  ['Great auricular nerve (C2–C3)','Skin over the angle of the mandible and the parotid, and the ear lobe.',{Front:[40,360]}]
 ]};

/* ---------- airway, sagittal ---------- */
X.plates.airway={title:'Nose, pharynx and larynx in sagittal section',cap:'Midline section, face to the left. Vertebral levels on the right.',views:['Sagittal'],
 clin:'The pharynx runs from the skull base to the lower border of the cricoid (C6), where it becomes the oesophagus and the larynx becomes the trachea. Swallowing: the soft palate closes off the nasopharynx, the larynx rises and the epiglottis tips over the laryngeal inlet. Foreign bodies stick at cricopharyngeus (C6), the narrowest part of the gut.',
 svg:{Sagittal:{vb:'0 0 420 460',s:`
  ${[...Array(7)].map((_,i)=>`<rect x="340" y="${110+i*44}" width="46" height="36" rx="5" ${bone}/><text class="bone-lbl" x="398" y="${132+i*44}">C${i+1}</text>`).join('')}
  <path d="M40,60 C60,40 150,40 250,60 L250,140 L60,140 C40,120 34,90 40,60 Z" fill="color-mix(in srgb,var(--sys-resp) 12%,var(--paper))" stroke="var(--sys-resp)"/>
  <path d="M90,80 C130,72 190,72 230,84 M80,104 C130,96 200,96 240,108 M90,126 C140,120 200,120 240,128" stroke="color-mix(in srgb,var(--sys-resp) 70%,var(--paper))" stroke-width="9" stroke-linecap="round" fill="none"/>
  <path d="M60,146 L230,146 C250,150 266,160 276,176" fill="none" stroke="var(--bone-line)" stroke-width="7" stroke-linecap="round"/>
  <path d="M276,176 C290,190 300,200 304,214" fill="none" stroke="var(--muscle)" stroke-width="12" stroke-linecap="round"/>
  <path d="M70,170 C70,240 140,290 230,284 C260,282 280,260 284,240 C270,220 240,200 200,190 C150,180 100,170 70,170 Z" ${musc(32)}/>
  <path d="M260,60 C300,60 320,80 326,110 L330,430 L300,430 C296,380 300,330 296,300 C290,270 286,250 284,240" fill="color-mix(in srgb,var(--sys-gi) 10%,var(--paper))" stroke="var(--sys-gi)"/>
  <path d="M312,96 C326,104 330,118 326,130" stroke="var(--lymph)" stroke-width="10" stroke-linecap="round" fill="none"/>
  <circle cx="276" cy="120" r="6" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="2"/>
  <ellipse cx="290" cy="226" rx="7" ry="13" fill="var(--lymph)" opacity=".7"/>
  <path d="M262,268 C270,250 282,246 288,252 C282,262 276,276 270,288" fill="none" stroke="color-mix(in srgb,var(--sys-resp) 80%,var(--paper))" stroke-width="6" stroke-linecap="round"/>
  <path d="M240,300 C238,330 236,350 238,380 L236,440 L276,440 L278,380 C280,350 280,320 276,296 Z" fill="color-mix(in srgb,var(--sys-resp) 12%,var(--paper))" stroke="var(--sys-resp)"/>
  <path d="M236,318 C232,330 230,346 232,360" stroke="var(--bone-line)" stroke-width="9" stroke-linecap="round"/>
  <path d="M244,338 L272,338" stroke="var(--sys-resp)" stroke-width="5"/>
  <path d="M236,370 C232,380 232,392 236,400 M270,360 C282,372 284,392 278,402" stroke="var(--bone-line)" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M236,410 H276 M236,424 H276" stroke="var(--bone-line)" stroke-width="5"/>
  <path d="M296,406 L300,440 L326,440 L322,406 Z" ${org('--sys-gi',35)}/>
  <circle cx="226" cy="300" r="7" ${bone}/>`}},
 items:[
  ['Nasal conchae','Three shelves (superior, middle, inferior) that warm, humidify and filter air. Sinuses drain under them; the nasolacrimal duct opens under the inferior concha.',{Sagittal:[150,98]}],
  ['Hard palate','Maxilla and palatine bones; separates nose from mouth.',{Sagittal:[150,146]}],
  ['Soft palate','Rises to seal the nasopharynx during swallowing (vagus, except tensor veli palatini: V3).',{Sagittal:[290,196]}],
  ['Nasopharynx','Behind the nose, above the soft palate; respiratory epithelium.',{Sagittal:[296,150]}],
  ['Pharyngeal tonsil (adenoid)','On the posterior nasopharyngeal wall; enlarged in children (mouth breathing, glue ear).',{Sagittal:[320,112]}],
  ['Pharyngotympanic (Eustachian) tube opening','At the level of the inferior meatus; equalises middle-ear pressure. Blocked by adenoids, causing otitis media with effusion.',{Sagittal:[276,120]}],
  ['Tongue','Hypoglossal nerve (XII) for all muscles except palatoglossus (X).',{Sagittal:[160,226]}],
  ['Oropharynx and palatine tonsil','Between soft palate and epiglottis; tonsil in the tonsillar fossa (glossopharyngeal nerve: earache after tonsillectomy).',{Sagittal:[290,226]}],
  ['Epiglottis','Elastic cartilage leaf that tips over the laryngeal inlet when swallowing.',{Sagittal:[276,262]}],
  ['Laryngopharynx','From the epiglottis to the lower border of the cricoid (C6), behind the larynx.',{Sagittal:[300,320]}],
  ['Hyoid bone (C3)','Anchors tongue and larynx muscles; does not articulate with other bones.',{Sagittal:[226,300]}],
  ['Thyroid cartilage','Shield-shaped; laryngeal prominence; vocal folds attach to its inner surface.',{Sagittal:[222,352]}],
  ['Vocal folds (glottis)','Narrowest part of the adult airway; stratified squamous epithelium.',{Sagittal:[258,338]}],
  ['Cricoid cartilage (C6)','Only complete cartilage ring; marks the start of the trachea and oesophagus.',{Sagittal:[256,384]}],
  ['Trachea','C6 to T4/5; C-shaped hyaline rings open posteriorly (trachealis muscle against the oesophagus).',{Sagittal:[256,428]}],
  ['Oesophagus','Begins at C6 at cricopharyngeus, behind the trachea.',{Sagittal:[310,424]}]
 ]};

/* ---------- larynx, anterior ---------- */
X.plates.larynx={title:'Larynx and thyroid, anterior view',cap:'From the hyoid (C3) to the upper trachea.',views:['Anterior'],
 clin:'Emergency front-of-neck access goes through the cricothyroid membrane: feel the thyroid prominence, slide down to the gap above the cricoid. The thyroid isthmus lies over tracheal rings 2–4 and is enclosed in pretracheal fascia, so the gland moves up when the patient swallows. Recurrent laryngeal nerves run in the tracheo-oesophageal grooves near the inferior thyroid arteries: at risk in thyroidectomy (hoarse voice).',
 svg:{Anterior:{vb:'0 0 320 440',s:`
  <path d="M60,40 C110,30 210,30 260,40 C262,52 250,58 236,56 C200,50 120,50 84,56 C70,58 58,52 60,40 Z" ${bone}/>
  <path d="M90,58 L230,58 L226,92 L94,92 Z" fill="color-mix(in srgb,var(--ink-2) 15%,var(--paper))" stroke="var(--line-2)"/>
  <path d="M80,92 L240,92 L232,140 C220,190 190,212 160,214 C130,212 100,190 88,140 Z" fill="color-mix(in srgb,var(--bone) 70%,var(--paper))" stroke="var(--bone-line)" stroke-width="1.8"/>
  <path d="M150,92 L160,112 L170,92" fill="none" stroke="var(--bone-line)" stroke-width="2"/>
  <path d="M136,214 L184,214 L188,236 L132,236 Z" fill="var(--paper)" stroke="var(--clin)" stroke-width="2" stroke-dasharray="4 3"/>
  <path d="M96,180 C110,210 120,230 128,244 M224,180 C210,210 200,230 192,244" stroke="var(--muscle)" stroke-width="12" opacity=".55" fill="none" stroke-linecap="round"/>
  <path d="M110,238 C130,234 190,234 210,238 L208,262 C190,258 130,258 112,262 Z" fill="color-mix(in srgb,var(--bone) 70%,var(--paper))" stroke="var(--bone-line)" stroke-width="1.8"/>
  ${[0,1,2,3,4,5].map(i=>`<rect x="122" y="${272+i*26}" width="76" height="16" rx="7" fill="color-mix(in srgb,var(--bone) 55%,var(--paper))" stroke="var(--bone-line)"/>`).join('')}
  <path d="M60,280 C40,330 60,390 112,396 C132,394 136,360 134,330 L134,300 C150,296 170,296 186,300 L186,330 C184,360 188,394 208,396 C260,390 280,330 260,280 C240,266 216,272 200,296 C180,290 140,290 120,296 C104,272 80,266 60,280 Z" ${org('--sys-endo',30)}/>`}},
 items:[
  ['Hyoid bone (C3)','Suspended by muscles; the larynx hangs from it by the thyrohyoid membrane.',{Anterior:[160,44]}],
  ['Thyrohyoid membrane','Pierced by the internal laryngeal nerve (sensation above the vocal folds) and superior laryngeal vessels.',{Anterior:[160,76]}],
  ['Laryngeal prominence','"Adam\'s apple": junction of the two thyroid laminae, more angled in men; upper border at C4 (carotid bifurcation).',{Anterior:[160,104]}],
  ['Thyroid cartilage','Hyaline cartilage shield protecting the vocal folds.',{Anterior:[116,150]}],
  ['Cricothyroid membrane','Between thyroid and cricoid cartilages: site of emergency cricothyroidotomy.',{Anterior:[160,225]}],
  ['Cricothyroid muscle','Only intrinsic laryngeal muscle supplied by the external laryngeal nerve (superior laryngeal branch of X): tenses the vocal folds. At risk when ligating the superior thyroid artery.',{Anterior:[106,200]}],
  ['Cricoid cartilage (C6)','Signet-ring shaped, the only complete ring.',{Anterior:[160,250]}],
  ['Tracheal rings','C-shaped; the thyroid isthmus crosses rings 2–4.',{Anterior:[160,330]}],
  ['Thyroid isthmus','Joins the lobes in front of the trachea; divided at tracheostomy.',{Anterior:[160,302]}],
  ['Lobe of the thyroid','Reaches from the thyroid cartilage to the 6th tracheal ring; the parathyroids lie on its back.',{Anterior:[80,340]}]
 ]};

/* ---------- neck in cross-section ---------- */
X.plates.neckfascia={title:'Neck in cross-section at C6',cap:'Viewed from below, front at the top. Fascial layers in colour.',views:['Axial'],
 clin:'Infections spread along fascial planes: a retropharyngeal abscess (between pretracheal/buccopharyngeal and prevertebral fascia) can track into the mediastinum. Air from a pneumothorax tracks up the same planes as subcutaneous emphysema (crackling under the skin). The carotid sheath carries the common carotid artery, internal jugular vein and vagus nerve, with deep cervical nodes.',
 svg:{Axial:{vb:'0 0 420 360',s:`
  <ellipse cx="210" cy="180" rx="190" ry="160" fill="color-mix(in srgb,var(--sys-skin) 10%,var(--paper))" stroke="var(--sys-skin)" stroke-width="2"/>
  <ellipse cx="210" cy="180" rx="176" ry="146" fill="none" stroke="var(--sys-resp)" stroke-width="2.5"/>
  <path d="M80,90 C60,120 52,160 60,190 L100,170 C110,140 112,110 100,90 Z" ${musc(45)}/><path d="M340,90 C360,120 368,160 360,190 L320,170 C310,140 308,110 320,90 Z" ${musc(45)}/>
  <path d="M60,250 C90,300 140,326 210,330 C280,326 330,300 360,250 L320,240 C290,280 250,296 210,298 C170,296 130,280 100,240 Z" ${musc(40)}/>
  <ellipse cx="210" cy="118" rx="84" ry="56" fill="none" stroke="var(--sys-endo)" stroke-width="2.4" stroke-dasharray="6 3"/>
  <rect x="180" y="58" width="60" height="16" rx="6" ${musc(55)}/>
  <circle cx="210" cy="104" r="22" fill="var(--paper)" stroke="var(--bone-line)" stroke-width="5"/>
  <ellipse cx="210" cy="140" rx="16" ry="10" ${org('--sys-gi',40)}/>
  <path d="M146,90 C130,110 132,140 154,150 L178,128 L180,96 Z M274,90 C290,110 288,140 266,150 L242,128 L240,96 Z" ${org('--sys-endo',35)}/>
  <ellipse cx="120" cy="142" rx="26" ry="20" fill="none" stroke="var(--sys-lymph)" stroke-width="2.4"/><ellipse cx="300" cy="142" rx="26" ry="20" fill="none" stroke="var(--sys-lymph)" stroke-width="2.4"/>
  <circle cx="128" cy="138" r="9" fill="var(--artery)"/><circle cx="108" cy="140" r="11" fill="var(--vein)"/><circle cx="120" cy="155" r="4" fill="var(--nerve)"/>
  <circle cx="292" cy="138" r="9" fill="var(--artery)"/><circle cx="312" cy="140" r="11" fill="var(--vein)"/><circle cx="300" cy="155" r="4" fill="var(--nerve)"/>
  <path d="M150,170 C150,240 270,240 270,170 C250,160 170,160 150,170 Z" fill="none" stroke="var(--sys-gi)" stroke-width="2.4" stroke-dasharray="6 3"/>
  <ellipse cx="210" cy="196" rx="34" ry="22" ${bone}/><path d="M196,214 L188,250 L232,250 L224,214 Z M210,250 L210,272" ${bone}/>
  <circle cx="164" cy="190" r="5" fill="var(--artery)"/><circle cx="256" cy="190" r="5" fill="var(--artery)"/>
  ${lab(210,22,'ANTERIOR')}${lab(210,350,'POSTERIOR')}`}},
 items:[
  ['Investing layer of deep cervical fascia','Outermost deep layer: encloses sternocleidomastoid and trapezius like a collar.',{Axial:[210,38]}],
  ['Sternocleidomastoid','Accessory nerve (XI); turns the face to the opposite side.',{Axial:[80,140]}],
  ['Trapezius','Accessory nerve (XI); shrugs the shoulder.',{Axial:[210,316]}],
  ['Pretracheal fascia','Encloses the thyroid, trachea and oesophagus (and the strap muscles); attached to the larynx, so the thyroid moves with swallowing.',{Axial:[292,98]}],
  ['Infrahyoid (strap) muscles','In front of the trachea; supplied by the ansa cervicalis (C1–C3).',{Axial:[210,66]}],
  ['Trachea','Midline; palpable above the jugular notch. Deviation suggests tension pneumothorax or a mass.',{Axial:[210,104]}],
  ['Oesophagus','Behind the trachea, slightly to the left.',{Axial:[210,140]}],
  ['Thyroid gland','Lobes wrap the trachea; inferior thyroid artery and recurrent laryngeal nerve meet near its back.',{Axial:[150,116]}],
  ['Carotid sheath','Encloses the common carotid artery (medial), internal jugular vein (lateral) and vagus nerve (between and behind), with deep cervical nodes.',{Axial:[300,124]}],
  ['Internal jugular vein','Lateral in the sheath: route for central lines (ultrasound-guided).',{Axial:[108,140]}],
  ['Vagus nerve','Behind, between artery and vein.',{Axial:[120,155]}],
  ['Prevertebral fascia','Encloses the vertebral column and deep muscles; continues into the arm as the axillary sheath around the brachial plexus and axillary artery.',{Axial:[150,210]}],
  ['Vertebral artery','Ascends in the transverse foramina from C6.',{Axial:[164,190]}]
 ]};

/* ---------- flowcharts ---------- */
X.trees.hnCarotid={kind:'artery',dir:'ltr',root:{t:'Common carotid a.',s:'bifurcates at C4',d:'Right from the brachiocephalic trunk, left from the arch. Divides at the upper border of the thyroid cartilage (C4); carotid sinus (baroreceptor, IX) and carotid body (chemoreceptor) here.',c:[
  {t:'Internal carotid a.',s:'no branches in the neck',d:'Enters the skull through the carotid canal; see the circle of Willis in the Nervous system chapter.'},
  {t:'External carotid a.',s:'8 branches',d:'"Some Anatomists Like Freaking Out Poor Medical Students".',c:[
    {t:'Superior thyroid a.',d:'Thyroid upper pole and larynx (superior laryngeal a.); external laryngeal nerve runs close.'},
    {t:'Ascending pharyngeal a.',d:'Pharynx and meninges.'},
    {t:'Lingual a.',d:'Tongue.'},
    {t:'Facial a.',d:'Pulse felt where it crosses the mandible in front of masseter; supplies the face, tonsil (tonsillar branch) and nose.'},
    {t:'Occipital a.',d:'Back of the scalp.'},
    {t:'Posterior auricular a.',d:'Behind the ear.'},
    {t:'Maxillary a.',s:'terminal',d:'Deep face: middle meningeal a. (through foramen spinosum), sphenopalatine a. (nosebleeds), teeth.'},
    {t:'Superficial temporal a.',s:'terminal',d:'Pulse in front of the ear; tender and thickened in giant cell arteritis.'}]}]}};
X.trees.hnSubclavian={kind:'artery',dir:'ltr',root:{t:'Subclavian a.',s:'arches over 1st rib',d:'Behind scalenus anterior. Branches: "VIT C and D".',c:[
  {t:'Vertebral a.',d:'Through the transverse foramina C6–C1 to form the basilar artery.'},
  {t:'Internal thoracic a.',d:'Behind the costal cartilages; anterior intercostals and breast perforators; used as a coronary bypass graft.'},
  {t:'Thyrocervical trunk',d:'Inferior thyroid a. (near the recurrent laryngeal nerve), suprascapular and transverse cervical aa.'},
  {t:'Costocervical trunk',d:'Deep cervical and supreme intercostal aa.'},
  {t:'Dorsal scapular a.',d:'Rhomboids and levator scapulae (sometimes from the transverse cervical).'},
  {t:'Axillary a.',s:'from outer border of 1st rib',d:'Continues into the upper limb (see Upper limb).'}]}};
X.trees.hnVeins={kind:'vein',dir:'rtl',root:{t:'Brachiocephalic vein',s:'→ SVC',d:'Formed at the venous angle by the internal jugular and subclavian veins; lymphatic ducts enter here.',c:[
  {t:'Internal jugular vein',s:'in the carotid sheath',d:'Begins at the jugular foramen as the continuation of the sigmoid sinus.',c:[
    {t:'Sigmoid sinus and inferior petrosal sinus',d:'Drain the brain (see Nervous system).'},
    {t:'Facial vein',d:'Valveless link to the cavernous sinus via the ophthalmic veins: the danger triangle.'},
    {t:'Lingual, superior and middle thyroid veins',d:'Join along the neck.'}]},
  {t:'Subclavian vein',s:'in front of scalenus anterior',d:'Continuation of the axillary vein; site for central lines below the clavicle.',c:[
    {t:'External jugular vein',s:'over SCM',d:'Formed by the posterior auricular vein and the posterior division of the retromandibular vein; visible when venous pressure is raised.',c:[
      {t:'Anterior jugular vein',d:'Usually joins the external jugular low in the neck.'}]}]}]}};

/* ---------- quiz ---------- */
X.quiz.push(
 {id:'hn1',c:'headneck',type:'sba',q:'A rugby player has a deep scalp laceration that bleeds profusely. Why do scalp wounds bleed so much?',o:['The emissary veins are very large','The scalp arteries have no smooth muscle','Vessels in the dense connective tissue layer are held open and cannot retract','The galea aponeurotica contains a venous plexus','Scalp blood comes only from the internal carotid'],a:2,e:'Fibrous septa in the dense connective tissue hold the vessel walls open, so cut vessels cannot constrict and retract. Pressure or suturing controls it.'},
 {id:'hn2',c:'headneck',type:'sba',q:'An infection in the scalp spreads to the dural venous sinuses. Through which layer did it spread before entering emissary veins?',o:['Aponeurosis','Connective tissue (dense)','Loose areolar tissue','Pericranium','Skin'],a:2,e:'The loose areolar layer is the "danger area": it allows spread of infection and blood, and valveless emissary veins connect it to the dural sinuses.'},
 {id:'hn3',c:'headneck',type:'sba',q:'At which vertebral level does the common carotid artery bifurcate?',o:['C2','C4','C6','C7','T2'],a:1,e:'At the upper border of the thyroid cartilage, about C4. The carotid sinus lies at the bifurcation.'},
 {id:'hn4',c:'headneck',type:'sba',q:'After a lymph node biopsy in the posterior triangle, a patient cannot shrug the shoulder fully on that side. Which nerve was injured?',o:['Accessory nerve','Dorsal scapular nerve','Great auricular nerve','Long thoracic nerve','Phrenic nerve'],a:0,e:'The accessory nerve (XI) crosses the posterior triangle superficially on its way to trapezius and is easily cut there.'},
 {id:'hn5',c:'headneck',type:'sba',q:'In an emergency airway, where do you insert the tube through the front of the neck?',o:['Between hyoid and thyroid cartilage','Between the 2nd and 3rd tracheal rings','Cricothyroid membrane','Suprasternal notch','Thyrohyoid membrane'],a:2,e:'The cricothyroid membrane lies between the thyroid and cricoid cartilages, is superficial and relatively avascular: the site of cricothyroidotomy.'},
 {id:'hn6',c:'headneck',type:'sba',q:'Following thyroidectomy, a singer cannot reach high notes but her voice is otherwise normal. Which nerve was damaged?',o:['External laryngeal nerve','Hypoglossal nerve','Internal laryngeal nerve','Left recurrent laryngeal nerve','Right recurrent laryngeal nerve'],a:0,e:'The external laryngeal nerve supplies cricothyroid, which tenses the vocal folds for high pitch. It runs with the superior thyroid artery.'},
 {id:'hn7',c:'headneck',type:'sba',q:'Which structures lie within the carotid sheath?',o:['Common carotid artery, internal jugular vein and vagus nerve','Common carotid artery, external jugular vein and phrenic nerve','Internal carotid artery, vertebral artery and accessory nerve','Subclavian artery, subclavian vein and brachial plexus','Trachea, oesophagus and recurrent laryngeal nerve'],a:0,e:'The carotid sheath contains the common (then internal) carotid artery, internal jugular vein, vagus nerve and deep cervical nodes.'},
 {id:'hn8',c:'headneck',type:'sba',q:'A midline neck swelling moves up when the patient swallows. Which fascia explains this?',o:['Carotid sheath','Investing fascia','Pretracheal fascia','Prevertebral fascia','Superficial fascia'],a:2,e:'The thyroid is enclosed in pretracheal fascia, which is attached to the larynx; the larynx rises on swallowing, carrying the thyroid with it. (A thyroglossal cyst moves with tongue protrusion.)'},
 {id:'hn9',c:'headneck',type:'sba',q:'A child has recurrent middle-ear effusions and breathes through the mouth. What is the most likely cause?',o:['Enlarged lingual tonsils','Enlarged palatine tonsils','Enlarged pharyngeal tonsil (adenoids) blocking the Eustachian tubes','Nasal polyps','Deviated septum'],a:2,e:'The adenoid lies on the posterior nasopharyngeal wall next to the openings of the pharyngotympanic tubes; enlargement blocks the tubes and the posterior nasal airway.'},
 {id:'hn10',c:'headneck',type:'vsaq',q:'Which nerve carries taste from the anterior two-thirds of the tongue?',a:['chordatympani','chordatympanifacial','facial','facialnerve','chordatympaniofthefacialnerve','cnvii','vii'],e:'The chorda tympani, a branch of the facial nerve (VII), carried with the lingual nerve. Posterior third: glossopharyngeal (IX) for both taste and general sensation.'},
 {id:'hn11',c:'headneck',type:'vsaq',q:'At which vertebral level does the larynx become the trachea?',a:['c6','cricoid','c6cricoid','sixthcervical'],e:'C6, at the lower border of the cricoid cartilage, where the pharynx also becomes the oesophagus.'},
 {id:'hn12',c:'headneck',type:'vsaq',q:'Name the area on the anterior nasal septum where most nosebleeds arise.',a:['kiesselbachsplexus','kiesselbach','kiesselbachs','littlesarea','littles','kiesselbachplexus','kiesselbachsarea'],e:'Kiesselbach\'s plexus (Little\'s area): anastomosis of branches of the sphenopalatine, greater palatine, anterior ethmoidal and superior labial arteries.'}
);
Object.assign(X.model,{hn10:'Chorda tympani (facial nerve, VII)',hn11:'C6',hn12:'Kiesselbach\'s plexus (Little\'s area)'});
})();
