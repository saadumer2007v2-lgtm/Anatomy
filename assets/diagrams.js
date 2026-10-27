/* Original labelled schematics for the organ-systems chapter.
   Each entry returns an SVG string themed with the page's CSS variables, so it works in light and dark mode. */
window.ATLAS_DIAGRAMS = (function(){
'use strict';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* wrap text into lines of at most n characters */
function wrap(t,n){const w=String(t).split(' '),L=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n&&l){L.push(l);l=x;}else l=(l+' '+x).trim();});if(l)L.push(l);return L;}
function tl(x,y,t,n,cls,lh,anchor){const L=wrap(t,n||999);return `<text class="${cls||''}" x="${x}" y="${y}"${anchor?` text-anchor="${anchor}"`:''}>${L.map((l,i)=>`<tspan x="${x}" dy="${i?lh||14:0}">${esc(l)}</tspan>`).join('')}</text>`;}
const mk=(id,col)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${col}"/></marker>`;
const num=(x,y,n)=>`<g class="dnum"><circle cx="${x}" cy="${y}" r="10"/><text x="${x}" y="${y}">${n}</text></g>`;
const svg=(vb,label,body)=>`<svg class="dg" viewBox="${vb}" role="img" aria-label="${esc(label)}">${body}</svg>`;

/* ---------- 1. blood flow through the heart ---------- */
function heartflow(){
  const V='var(--vein)',A='var(--artery)';
  const box=(x,y,t,s,kind)=>`<rect x="${x}" y="${y}" width="130" height="70" rx="10" fill="var(--${kind}-tint)" stroke="var(--${kind})" stroke-width="1.6"/><text class="b" x="${x+65}" y="${y+31}" text-anchor="middle">${t}</text><text class="sm" x="${x+65}" y="${y+51}" text-anchor="middle">${s}</text>`;
  return svg('0 0 760 410','Blood flow through the heart and the two circulations',`<defs>${mk('hf-v',V)}${mk('hf-a',A)}</defs>
  <rect x="250" y="14" width="260" height="62" rx="12" fill="color-mix(in srgb,var(--sys-resp) 14%,var(--paper))" stroke="var(--sys-resp)" stroke-width="1.6"/>
  <text class="b" x="380" y="40" text-anchor="middle">Lungs</text><text class="sm" x="380" y="60" text-anchor="middle">CO₂ given off · O₂ loaded onto haemoglobin</text>
  <rect x="250" y="322" width="260" height="62" rx="12" fill="var(--sunk)" stroke="var(--line-2)" stroke-width="1.6"/>
  <text class="b" x="380" y="348" text-anchor="middle">Body tissues</text><text class="sm" x="380" y="368" text-anchor="middle">O₂ delivered · CO₂ and waste collected</text>
  <text class="hd" x="215" y="120" text-anchor="middle">RIGHT HEART</text><text class="hd" x="545" y="120" text-anchor="middle">LEFT HEART</text>
  ${box(150,130,'Right atrium','≈ 2–6 mmHg','vein')}${box(150,222,'Right ventricle','≈ 25 / 4 mmHg','vein')}
  ${box(480,130,'Left atrium','≈ 8 mmHg','artery')}${box(480,222,'Left ventricle','≈ 120 / 8 mmHg','artery')}
  <path d="M380,128 V296" stroke="var(--line-2)" stroke-width="2" stroke-dasharray="5 4"/><text class="sm" x="380" y="310" text-anchor="middle">septum</text>
  <g fill="none" stroke-width="3">
    <path d="M250,353 H90 V165 H146" stroke="${V}" marker-end="url(#hf-v)"/>
    <path d="M215,200 V218" stroke="${V}" marker-end="url(#hf-v)"/>
    <path d="M280,257 H320 V82" stroke="${V}" marker-end="url(#hf-v)"/>
    <path d="M440,78 V165 H476" stroke="${A}" marker-end="url(#hf-a)"/>
    <path d="M545,200 V218" stroke="${A}" marker-end="url(#hf-a)"/>
    <path d="M610,257 H670 V353 H516" stroke="${A}" marker-end="url(#hf-a)"/>
  </g>
  <text class="sm" x="80" y="262" text-anchor="middle" transform="rotate(-90 80 262)">Superior + inferior venae cavae</text>
  <text class="sm" x="142" y="214" text-anchor="end">tricuspid</text>
  ${tl(328,160,'Pulmonary valve → pulmonary arteries (deoxygenated)',20,'sm',14)}
  ${tl(448,100,'Pulmonary veins (oxygenated)',14,'sm',14)}
  <text class="sm" x="618" y="214">mitral</text>
  ${tl(680,290,'Aortic valve → aorta',11,'sm',14)}
  <text class="b" x="526" y="34">Pulmonary circuit</text><text class="sm" x="526" y="52">low pressure, same flow</text>
  <text class="sm" x="380" y="404" text-anchor="middle">Systemic circuit: high pressure · both circuits carry ≈ 5 L/min at rest</text>`);
}

/* ---------- 2. ECG and the conduction system ---------- */
function ecg(){
  let g='';
  for(let x=40;x<=750;x+=20) g+=`<line class="${(x-40)%100?'grid':'grid2'}" x1="${x}" y1="50" x2="${x}" y2="245"/>`;
  for(let y=50;y<=245;y+=20) g+=`<line class="grid" x1="40" y1="${y}" x2="750" y2="${y}"/>`;
  const beat=o=>`M${80+o},200 C${92+o},182 ${118+o},182 ${130+o},200 L${160+o},200 L${166+o},212 L${178+o},70 L${190+o},232 L${200+o},200 L${250+o},200 C${268+o},158 ${312+o},158 ${330+o},200 L${480+o},200`;
  const br=(x1,x2,y,t)=>`<path class="brk" d="M${x1},${y-6} V${y} H${x2} V${y-6}"/><text class="sm" x="${(x1+x2)/2}" y="${y+16}" text-anchor="middle">${t}</text>`;
  return svg('0 0 760 330','Labelled ECG trace showing P wave, QRS complex, T wave and intervals',`${g}
  <path d="${beat(0)}" fill="none" stroke="var(--artery)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="${beat(400).replace('L880,200','L740,200')}" fill="none" stroke="var(--artery)" stroke-width="2.6" stroke-linejoin="round"/>
  <text class="b" x="105" y="174" text-anchor="middle">P</text><text class="b" x="178" y="62" text-anchor="middle">R</text>
  <text class="b" x="160" y="226" text-anchor="middle">Q</text><text class="b" x="196" y="250" text-anchor="middle">S</text>
  <text class="b" x="290" y="150" text-anchor="middle">T</text>
  <path class="brk" d="M178,40 V34 H578 V40"/><text class="sm" x="378" y="28" text-anchor="middle">RR interval 0.8 s → heart rate 75 / min</text>
  ${br(80,160,262,'PR 0.12–0.20 s')}${br(162,330,262,'QT ≈ 0.35–0.45 s')}${br(160,200,298,'QRS &lt; 0.12 s')}
  ${tl(500,282,'P: atrial depolarisation · PR: AV-node delay · QRS: ventricular depolarisation (atrial repolarisation hidden) · T: ventricular repolarisation',58,'sm',14)}
  <text class="sm" x="40" y="326">25 mm/s: small square 0.04 s, large square 0.2 s</text>`);
}

/* ---------- 3. neuronal action potential ---------- */
function ap(){
  const Y=mv=>30+(40-mv)*2.3;
  const ticks=[30,0,-55,-70].map(v=>`<text class="sm" x="72" y="${Y(v)+4}" text-anchor="end">${v>0?'+':''}${v}</text><line class="grid" x1="80" y1="${Y(v)}" x2="720" y2="${Y(v)}" ${v===-55||v===0?'stroke-dasharray="4 4"':''}/>`).join('');
  const items=[[125,Y(-70),'Resting potential −70 mV: K⁺ leak channels; Na⁺/K⁺-ATPase keeps the gradients'],
    [200,Y(-55),'A graded stimulus reaches threshold (about −55 mV)'],
    [209,150,'Voltage-gated Na⁺ channels open: Na⁺ rushes in (positive feedback)'],
    [218,Y(30),'Peak ≈ +30 mV: Na⁺ channels inactivate'],
    [241,190,'Voltage-gated K⁺ channels open: K⁺ leaves, membrane repolarises'],
    [276,Y(-80)-2,'After-hyperpolarisation: K⁺ channels are slow to close']];
  let legend='';
  items.forEach((it,i)=>{const y=48+i*46; legend+=num(445,y,i+1)+tl(462,y+4,it[2],40,'sm',14);});
  return svg('0 0 760 360','Neuronal action potential with phases and refractory periods',`
  <rect x="200" y="30" width="62" height="305" fill="var(--clin)" opacity=".1"/><rect x="262" y="30" width="98" height="305" fill="var(--warn)" opacity=".1"/>
  ${ticks}<path class="ax" d="M80,26 V335 H420"/>
  <text class="sm" x="22" y="190" transform="rotate(-90 22 190)" text-anchor="middle">Membrane potential (mV)</text>
  <text class="sm" x="250" y="352" text-anchor="middle">time ≈ 3–4 ms</text>
  <text class="sm" x="231" y="326" text-anchor="middle">ARP</text><text class="sm" x="311" y="326" text-anchor="middle">RRP</text>
  <text class="sm" x="740" y="${Y(-55)-6}" text-anchor="end">threshold</text>
  <path d="M80,${Y(-70)} H170 C185,${Y(-70)} 190,${Y(-60)} 200,${Y(-55)} C206,200 210,80 218,${Y(30)} C226,60 238,150 250,250 C258,300 266,${Y(-80)} 280,${Y(-80)} C310,${Y(-80)} 340,${Y(-70)} 380,${Y(-70)} H420" fill="none" stroke="var(--nerve-ink)" stroke-width="3"/>
  ${items.map((it,i)=>num(it[0],it[1],i+1)).join('')}${legend}
  ${tl(445,330,'ARP: absolute refractory period (Na⁺ channels inactivated, no second spike possible). RRP: relative refractory period (a stronger stimulus is needed).',48,'sm',13)}`);
}

/* ---------- 4. spinal cord pathways and where they cross ---------- */
function tracts(){
  const lv=[['Cortex',60],['Thalamus · internal capsule',125],['Medulla',205],['Spinal cord',325],['Periphery',420]];
  let bands=lv.map(([t,y])=>`<line class="grid" x1="112" y1="${y}" x2="770" y2="${y}"/>${tl(8,y+4,t,14,'sm',13)}`).join('');
  const P=[{cx:225,t:'Dorsal columns (DCML)',s:'fine touch · vibration · proprioception',c:'var(--accent)',x:'crosses in the medulla',
      d:cx=>`M${cx+80},420 L${cx+28},330 L${cx+28},215 L${cx-26},196 L${cx-26},125 L${cx-55},62`,dots:cx=>[[cx+28,330],[cx+28,215],[cx-26,125]],cross:cx=>[cx,205]},
    {cx:440,t:'Spinothalamic tract',s:'pain · temperature · crude touch',c:'var(--artery)',x:'crosses within 1–2 segments',
      d:cx=>`M${cx+80},420 L${cx+28},330 L${cx-28},308 L${cx-28},125 L${cx-55},62`,dots:cx=>[[cx+28,330],[cx-26,125]],cross:cx=>[cx,319]},
    {cx:655,t:'Lateral corticospinal',s:'voluntary movement (UMN → LMN)',c:'var(--lymph)',x:'crosses at the medullary pyramids',
      d:cx=>`M${cx-55},62 L${cx-26},125 L${cx-26},196 L${cx+28},216 L${cx+28},330 L${cx+80},418`,dots:cx=>[[cx+28,330]],cross:cx=>[cx,206]}];
  let body='';
  P.forEach((p,i)=>{const id='tr'+i;
    body+=`<defs>${mk(id,p.c)}</defs><text class="b" x="${p.cx}" y="18" text-anchor="middle" style="font-size:12.5px">${p.t}</text><text class="sm" x="${p.cx}" y="35" text-anchor="middle">${p.s}</text>
    <line x1="${p.cx}" y1="46" x2="${p.cx}" y2="440" stroke="var(--line-2)" stroke-dasharray="4 4"/>
    <path d="${p.d(p.cx)}" fill="none" stroke="${p.c}" stroke-width="3.2" stroke-linejoin="round" marker-end="url(#${id})"/>
    ${p.dots(p.cx).map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="var(--paper)" stroke="${p.c}" stroke-width="2.4"/>`).join('')}
    <circle cx="${p.cross(p.cx)[0]}" cy="${p.cross(p.cx)[1]}" r="11" fill="none" stroke="var(--clin)" stroke-width="2"/>
    <text class="sm" x="${p.cx-92}" y="458">L</text><text class="sm" x="${p.cx+86}" y="458">R</text>
    <text class="sm" x="${p.cx}" y="474" text-anchor="middle" style="fill:var(--clin)">${p.x}</text>`;});
  return svg('0 0 780 484','Three spinal pathways showing where each crosses the midline',bands+body+`<text class="sm" x="8" y="474">○ = crossing</text>`);
}

/* ---------- 5. oxygen–haemoglobin dissociation curve ---------- */
function odc(){
  const X=p=>70+p*32.14, Y=s=>330-s*3, S=(p,p50)=>100*Math.pow(p,2.7)/(Math.pow(p,2.7)+Math.pow(p50,2.7));
  const curve=p50=>{let d='';for(let p=0;p<=14.001;p+=0.1)d+=(p?'L':'M')+X(p).toFixed(1)+','+Y(S(p,p50)).toFixed(1);return d;};
  let ax='';for(let p=0;p<=14;p+=2)ax+=`<line class="grid" x1="${X(p)}" y1="30" x2="${X(p)}" y2="330"/><text class="sm" x="${X(p)}" y="348" text-anchor="middle">${p}</text>`;
  for(let s=0;s<=100;s+=25)ax+=`<line class="grid" x1="70" y1="${Y(s)}" x2="520" y2="${Y(s)}"/><text class="sm" x="62" y="${Y(s)+4}" text-anchor="end">${s}</text>`;
  const pt=(p,s,t,dx,dy,a)=>`<circle cx="${X(p)}" cy="${Y(s)}" r="5" fill="var(--ink)"/><text class="sm" x="${X(p)+dx}" y="${Y(s)+dy}" text-anchor="${a||'start'}">${t}</text>`;
  return svg('0 0 760 380','Oxygen–haemoglobin dissociation curve with right and left shifts',`${ax}<path class="ax" d="M70,30 V330 H520"/>
  <text class="sm" x="295" y="372" text-anchor="middle">PO₂ (kPa) · 1 kPa = 7.5 mmHg</text>
  <text class="sm" x="20" y="180" transform="rotate(-90 20 180)" text-anchor="middle">Haemoglobin O₂ saturation (%)</text>
  <path d="${curve(2.6)}" fill="none" stroke="var(--vein)" stroke-width="2.4" stroke-dasharray="7 4"/>
  <path d="${curve(4.6)}" fill="none" stroke="var(--artery)" stroke-width="2.4" stroke-dasharray="7 4"/>
  <path d="${curve(3.5)}" fill="none" stroke="var(--ink)" stroke-width="3"/>
  <path d="M70,${Y(50)} H${X(3.5)} V330" fill="none" stroke="var(--muted)" stroke-dasharray="3 3"/>
  ${pt(13.3,97.3,'Arterial: ≈ 13 kPa, 97%',0,-12,'end')}${pt(5.3,75.4,'Mixed venous: ≈ 5.3 kPa, 75%',10,18)}${pt(3.5,50,'P50 ≈ 3.5 kPa',8,-8)}
  <rect x="540" y="40" width="210" height="130" rx="10" fill="var(--artery-tint)"/>
  <text class="b" x="552" y="62" style="fill:var(--artery)">Right shift (P50 ↑)</text>
  ${tl(552,82,'↑CO₂, ↑H⁺ (Bohr effect), ↑temperature, ↑2,3-BPG. Hb lets go of O₂: ideal in exercising muscle.',30,'sm',15)}
  <rect x="540" y="182" width="210" height="130" rx="10" fill="var(--vein-tint)"/>
  <text class="b" x="552" y="204" style="fill:var(--vein)">Left shift (P50 ↓)</text>
  ${tl(552,224,'↓CO₂, ↓H⁺, ↓temperature, ↓2,3-BPG, fetal Hb, carbon monoxide. Hb grips O₂ more tightly.',30,'sm',15)}
  ${tl(540,334,'Flat top protects saturation if alveolar PO₂ falls; steep middle unloads lots of O₂ for a small fall in PO₂.',36,'sm',14)}`);
}

/* ---------- 6. lung volumes ---------- */
function volumes(){
  const Y=v=>330-v*50;
  let tr='M60,'+Y(2.4);
  for(let x=60;x<=230;x+=2)tr+=' L'+x+','+(Y(2.65)+12.5*Math.cos((x-60)/56.7*2*Math.PI)).toFixed(1);
  tr+=` C250,${Y(2.4)} 270,${Y(6)} 290,${Y(6)} C320,${Y(6)} 345,${Y(1.2)} 370,${Y(1.2)} C390,${Y(1.2)} 400,${Y(2.4)} 410,${Y(2.4)}`;
  for(let x=410;x<=490;x+=2)tr+=' L'+x+','+(Y(2.65)+12.5*Math.cos((x-410)/56.7*2*Math.PI)).toFixed(1);
  let ax='';for(let v=0;v<=6;v++)ax+=`<text class="sm" x="44" y="${Y(v)+4}" text-anchor="end">${v}</text><line class="grid" x1="50" y1="${Y(v)}" x2="505" y2="${Y(v)}"/>`;
  const bar=(v1,v2,t,val,fill)=>`<rect x="520" y="${Y(v2)}" width="64" height="${(v2-v1)*50}" fill="${fill}" stroke="var(--paper)" stroke-width="2"/><text class="b" x="552" y="${(Y(v1)+Y(v2))/2+1}" text-anchor="middle" style="font-size:11.5px">${t}</text><text class="sm" x="552" y="${(Y(v1)+Y(v2))/2+15}" text-anchor="middle">${val}</text>`;
  const brk=(x,v1,v2,t,val)=>`<path class="brk" d="M${x-6},${Y(v2)+1} H${x} V${Y(v1)-1} H${x-6}"/><text class="b" x="${x+6}" y="${(Y(v1)+Y(v2))/2}" style="font-size:11.5px">${t}</text><text class="sm" x="${x+6}" y="${(Y(v1)+Y(v2))/2+14}">${val}</text>`;
  return svg('0 0 760 350','Spirogram of lung volumes and capacities',`${ax}<path class="ax" d="M50,24 V330 H505"/>
  <text class="sm" x="16" y="180" transform="rotate(-90 16 180)" text-anchor="middle">Volume in lungs (L)</text>
  <path d="${tr}" fill="none" stroke="var(--sys-resp)" stroke-width="2.6"/>
  <text class="sm" x="145" y="${Y(2.9)-10}" text-anchor="middle">quiet tidal breathing</text>
  <text class="sm" x="300" y="${Y(6)+18}">maximal inspiration</text><text class="sm" x="378" y="${Y(1.2)+16}">maximal expiration</text>
  ${bar(0,1.2,'RV','1.2 L','color-mix(in srgb,var(--sys-resp) 55%,var(--paper))')}${bar(1.2,2.4,'ERV','1.2 L','color-mix(in srgb,var(--sys-resp) 38%,var(--paper))')}
  ${bar(2.4,2.9,'','','color-mix(in srgb,var(--sys-resp) 70%,var(--paper))')}<text class="sm" x="590" y="${Y(2.65)+4}" style="font-size:10px">TV 0.5 L</text>
  ${bar(2.9,6,'IRV','3.1 L','color-mix(in srgb,var(--sys-resp) 22%,var(--paper))')}
  ${brk(640,2.4,6,'IC','3.6 L')}${brk(640,0,2.4,'FRC','2.4 L')}${brk(692,1.2,6,'VC','4.8 L')}${brk(735,0,6,'TLC','6 L')}`);
}

/* ---------- 7. gut blood supply ---------- */
function gutsupply(){
  const rows=[[70,'T12','Foregut · coeliac trunk','Abdominal oesophagus, stomach, duodenum as far as the major papilla; liver, gallbladder, pancreas (in part).','The spleen is supplied by the coeliac trunk but is not a gut derivative.','Visceral pain: epigastric · Parasympathetic: vagus'],
    [165,'L1','Midgut · superior mesenteric artery','Duodenum beyond the papilla, jejunum, ileum, caecum, appendix,','ascending colon and the proximal two-thirds of the transverse colon.','Visceral pain: periumbilical · Parasympathetic: vagus'],
    [260,'L3','Hindgut · inferior mesenteric artery','Distal third of the transverse colon, descending and sigmoid colon,','rectum and the anal canal above the pectinate line.','Visceral pain: suprapubic · Parasympathetic: pelvic splanchnic nerves (S2–4)']];
  let r='';
  rows.forEach(([y,lvl,t,a,b,c],i)=>{const sh=[14,22,30][i];
    r+=`<text class="b" x="48" y="${y+4}" text-anchor="end">${lvl}</text><path d="M84,${y} H146" stroke="var(--artery)" stroke-width="5" marker-end="url(#gs)"/>
    <rect x="150" y="${y-40}" width="600" height="82" rx="10" fill="color-mix(in srgb,var(--sys-gi) ${sh}%,var(--paper))" stroke="var(--sys-gi)"/>
    <text class="b" x="164" y="${y-18}">${t}</text><text class="sm" x="164" y="${y+1}">${a}</text><text class="sm" x="164" y="${y+17}">${b}</text><text class="sm" x="164" y="${y+34}" style="fill:var(--clin)">${c}</text>`;});
  return svg('0 0 760 320','Foregut, midgut and hindgut with their arteries, vertebral levels and pain referral',`<defs>${mk('gs','var(--artery)')}</defs>
  <rect x="60" y="22" width="24" height="294" rx="10" fill="var(--artery-tint)" stroke="var(--artery)" stroke-width="1.6"/>
  <text class="sm" x="72" y="14" text-anchor="middle">Aorta</text><text class="sm" x="48" y="314" text-anchor="end">L4</text>${r}`);
}

/* ---------- 8. nephron ---------- */
function nephron(){
  const seg=(d,c)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>`;
  const L=[['Glomerulus','Filters ≈ 180 L of plasma a day (GFR ≈ 125 mL/min); cells and most proteins stay in the blood.'],
    ['Proximal convoluted tubule','Reabsorbs ≈ 65% of Na⁺ and water, all glucose (SGLT2) and amino acids, most HCO₃⁻; secretes drugs and creatinine.'],
    ['Thin descending limb','Permeable to water (aquaporin-1), not solute: water leaves into the salty medulla.'],
    ['Thin ascending limb','Impermeable to water; NaCl leaves passively.'],
    ['Thick ascending limb','NKCC2 moves Na⁺, K⁺, 2Cl⁻ out; impermeable to water (diluting segment). Loop diuretics act here.'],
    ['Juxtaglomerular apparatus','Macula densa senses NaCl; JG cells in the afferent arteriole release renin.'],
    ['Distal convoluted tubule','NCC reabsorbs NaCl (thiazides act here); PTH increases Ca²⁺ reabsorption.'],
    ['Collecting duct','Aldosterone: ENaC Na⁺ in, K⁺ out. ADH inserts aquaporin-2 to concentrate urine.']];
  let leg='';L.forEach(([t,d],i)=>{const y=34+i*55; leg+=num(470,y,i+1)+`<text class="b" x="488" y="${y+4}" style="font-size:12px">${t}</text>`+tl(488,y+20,d,46,'sm',13);});
  return svg('0 0 760 470','Nephron segments and what each one does',`
  <rect x="20" y="20" width="420" height="150" fill="var(--sunk)"/><rect x="20" y="170" width="420" height="130" fill="color-mix(in srgb,var(--sys-renal) 9%,var(--paper))"/><rect x="20" y="300" width="420" height="150" fill="color-mix(in srgb,var(--sys-renal) 18%,var(--paper))"/>
  <text class="hd" x="30" y="160">CORTEX</text><text class="hd" x="150" y="190">OUTER MEDULLA</text><text class="hd" x="150" y="320">INNER MEDULLA</text>
  <text class="sm" x="432" y="160" text-anchor="end">≈ 300 mOsm/kg</text><text class="sm" x="432" y="190" text-anchor="end">≈ 600</text><text class="sm" x="432" y="444" text-anchor="end">up to ≈ 1200</text>
  <path d="M250,45 L192,80 M192,92 L250,128" stroke="var(--artery)" stroke-width="5" fill="none"/>
  <text class="sm" x="254" y="44">afferent arteriole</text><text class="sm" x="254" y="140">efferent arteriole</text>
  <circle cx="160" cy="85" r="32" fill="var(--paper)" stroke="var(--ink-2)" stroke-width="2"/>
  <path d="M146,74 C160,60 176,70 168,82 C160,94 176,104 162,104 C148,104 138,92 150,86 C162,80 150,70 146,74 Z" fill="var(--artery-tint)" stroke="var(--artery)" stroke-width="2"/>
  ${seg('M128,85 C110,60 90,110 75,85 C62,65 45,95 52,115 L60,135','var(--accent)')}
  ${seg('M60,135 L60,410','var(--vein)')}${seg('M60,410 C60,440 100,440 100,410 L100,300','var(--lymph)')}
  ${seg('M100,300 L100,190 C100,150 150,135 196,110','var(--warn)')}
  ${seg('M196,110 C215,100 240,96 260,100 C280,106 292,86 312,95 C332,104 345,86 362,95 L396,95','var(--sys-endo)')}
  ${seg('M400,40 L400,450','var(--sys-renal)')}<text class="sm" x="392" y="464" text-anchor="end">to renal pelvis</text>
  <circle cx="194" cy="111" r="6" fill="var(--clin)"/>
  ${num(160,85,1)}${num(86,72,2)}${num(60,260,3)}${num(100,360,4)}${num(100,235,5)}${num(206,128,6)}${num(312,95,7)}${num(400,300,8)}${leg}`);
}

/* ---------- 9. endocrine axis and negative feedback ---------- */
function axis(){
  const B=[[20,'Hypothalamus','e.g. CRH'],[210,'Anterior pituitary','e.g. ACTH'],[400,'Peripheral gland','adrenal cortex → cortisol'],[590,'Target tissues','liver, muscle, fat, immune cells']];
  let b=B.map(([x,t,s],i)=>`<rect x="${x}" y="110" width="150" height="64" rx="10" fill="${i===3?'var(--sunk)':'color-mix(in srgb,var(--sys-endo) 14%,var(--paper))'}" stroke="var(--sys-endo)" stroke-width="1.6"/><text class="b" x="${x+75}" y="136" text-anchor="middle">${t}</text>${tl(x+75,155,s,22,'sm',13,'middle')}`).join('');
  const arr=[[170,208,'releasing hormone'],[360,398,'trophic hormone'],[550,588,'hormone']].map(([a,c,t])=>`<path d="M${a},142 H${c-4}" stroke="var(--sys-endo)" stroke-width="3" marker-end="url(#ax1)"/><text class="sm" x="${(a+c)/2}" y="98" text-anchor="middle">${t}</text>`).join('');
  return svg('0 0 760 330','Hypothalamic–pituitary–target gland axis with negative feedback',`<defs>${mk('ax1','var(--sys-endo)')}${mk('ax2','var(--artery)')}</defs>
  <text class="sm" x="95" y="30" text-anchor="middle">Inputs: stress, circadian clock,</text><text class="sm" x="95" y="44" text-anchor="middle">cold, falling hormone level</text>
  <path d="M95,52 V104" stroke="var(--ink-2)" stroke-width="2" marker-end="url(#ax1)"/>${b}${arr}
  <path d="M475,176 C475,236 300,236 287,180" fill="none" stroke="var(--artery)" stroke-width="2.2" stroke-dasharray="6 4" marker-end="url(#ax2)"/>
  <path d="M480,176 C480,292 110,292 97,180" fill="none" stroke="var(--artery)" stroke-width="2.2" stroke-dasharray="6 4" marker-end="url(#ax2)"/>
  <circle cx="380" cy="221" r="11" fill="var(--artery)"/><text x="380" y="226" text-anchor="middle" style="fill:var(--paper);font-weight:700">−</text>
  <circle cx="290" cy="263" r="11" fill="var(--artery)"/><text x="290" y="268" text-anchor="middle" style="fill:var(--paper);font-weight:700">−</text>
  <text class="sm" x="510" y="250" style="fill:var(--artery)">negative feedback on both levels</text>
  ${tl(20,312,'Exogenous steroids act like the hormone: they switch off CRH and ACTH, so the adrenal cortex atrophies. Stop them suddenly and an adrenal crisis can follow.',120,'sm',14)}`);
}

return {heartflow,ecg,ap,tracts,odc,volumes,gutsupply,nephron,axis};
})();
