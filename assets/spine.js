/* Vertebral column: one plate with cervical, thoracic and lumbar vertebrae (superior views), plus quiz items.
   Shown in the Nervous system chapter. */
(function(){
'use strict';
const X=window.ATLAS_EXT, {lab}=window.ATLAS_UTIL;
const B='class="bone"';
const views={
 Cervical:`<path ${B} d="M126,200 C126,176 234,176 234,200 C236,236 220,250 180,250 C140,250 124,236 126,200 Z"/>
   <path ${B} d="M120,186 C96,186 64,184 50,170 C40,156 52,140 70,144 C86,148 104,160 128,166 Z"/><path ${B} d="M240,186 C264,186 296,184 310,170 C320,156 308,140 290,144 C274,148 256,160 232,166 Z"/>
   <circle cx="78" cy="162" r="11" fill="var(--bone-art)" stroke="var(--bone-line)"/><circle cx="282" cy="162" r="11" fill="var(--bone-art)" stroke="var(--bone-line)"/>
   <path ${B} d="M130,170 C120,140 130,110 160,96 L180,90 L200,96 C230,110 240,140 230,170 L214,172 C214,140 200,118 180,118 C160,118 146,140 146,172 Z"/>
   <path ${B} d="M164,98 L160,40 L172,36 L180,70 L188,36 L200,40 L196,98 Z"/>
   <path class="bone-art" d="M112,150 C104,140 108,128 118,126 C126,126 130,136 126,146 Z"/><path class="bone-art" d="M248,150 C256,140 252,128 242,126 C234,126 230,136 234,146 Z"/>`,
 Thoracic:`<path ${B} d="M126,214 C126,176 156,168 180,180 C204,168 234,176 234,214 C234,256 210,270 180,270 C150,270 126,256 126,214 Z"/>
   <ellipse class="bone-f" cx="128" cy="196" rx="7" ry="9"/><ellipse class="bone-f" cx="232" cy="196" rx="7" ry="9"/>
   <path ${B} d="M140,182 C126,150 136,120 162,108 L180,102 L198,108 C224,120 234,150 220,182 L206,180 C208,152 198,134 180,134 C162,134 152,152 154,180 Z"/>
   <path ${B} d="M146,140 C110,128 70,118 52,108 C40,100 46,86 60,88 C90,96 124,108 154,120 Z"/><path ${B} d="M214,140 C250,128 290,118 308,108 C320,100 314,86 300,88 C270,96 236,108 206,120 Z"/>
   <ellipse class="bone-f" cx="58" cy="100" rx="8" ry="6"/><ellipse class="bone-f" cx="302" cy="100" rx="8" ry="6"/>
   <path ${B} d="M170,106 L174,20 L186,20 L190,106 Z"/>`,
 Lumbar:`<path ${B} d="M100,220 C100,180 260,180 260,220 C262,262 230,280 180,280 C130,280 98,262 100,220 Z"/>
   <path ${B} d="M132,184 C120,154 128,124 156,110 L180,104 L204,110 C232,124 240,154 228,184 L212,182 C214,156 202,138 180,138 C158,138 146,156 148,182 Z"/>
   <path ${B} d="M134,160 C100,156 60,150 34,144 C24,140 26,128 36,128 C64,130 104,136 140,140 Z"/><path ${B} d="M226,160 C260,156 300,150 326,144 C336,140 334,128 324,128 C296,130 256,136 220,140 Z"/>
   <path ${B} d="M164,110 L160,46 C170,38 190,38 200,46 L196,110 Z"/>
   <path class="bone-art" d="M138,120 C130,110 132,96 144,92 C154,92 158,104 152,116 Z"/><path class="bone-art" d="M222,120 C230,110 228,96 216,92 C206,92 202,104 208,116 Z"/>`
};
const vb='0 0 360 300';
X.plates.vertebrae={title:'Vertebrae, superior views',cap:'Anterior (body) at the bottom. Compare the three regions.',views:['Cervical','Thoracic','Lumbar'],
 clin:'Spot the region: cervical = transverse foramina and bifid spines; thoracic = costal facets for the ribs and long downward spines; lumbar = big kidney-shaped bodies and short square spines. Spinal nerves C1–C7 leave above their vertebra, C8 below C7, and every nerve below that leaves below its own vertebra; a posterolateral disc compresses the root that exits one level lower.',
 svg:Object.fromEntries(Object.entries(views).map(([k,s])=>[k,{vb,s:s+lab(180,292,k.toUpperCase()+' · ANTERIOR')}])),
 items:[
  ['Vertebral body','Weight-bearing; grows larger from cervical to lumbar. Intervertebral discs join the bodies.',{Cervical:[180,220],Thoracic:[180,236],Lumbar:[180,246]}],
  ['Vertebral foramen','Holds the spinal cord and meninges; triangular and large in the cervical and lumbar regions, small and round in the thoracic.',{Cervical:[180,148],Thoracic:[180,160],Lumbar:[180,164]}],
  ['Pedicle','Joins body to arch; intervertebral foramina lie between adjacent pedicles.',{Cervical:[136,178],Thoracic:[148,176],Lumbar:[140,176]}],
  ['Lamina','Roof of the canal; removed in a laminectomy.',{Cervical:[150,120],Thoracic:[158,124],Lumbar:[150,128]}],
  ['Spinous process','Bifid in C3–C6; long and sloping in thoracic; short and hatchet-shaped in lumbar. Ligamentum flavum joins laminae beneath.',{Cervical:[180,50],Thoracic:[180,40],Lumbar:[180,60]}],
  ['Transverse process','Lumbar ones are long and thin; thoracic ones carry facets for the rib tubercles.',{Cervical:[60,154],Thoracic:[90,110],Lumbar:[70,140]}],
  ['Transverse foramen','Cervical only: vertebral artery (from C6 upwards) and vein.',{Cervical:[78,162]}],
  ['Superior articular facet','Faces backwards in the cervical and thoracic regions; medially in the lumbar region, limiting rotation.',{Cervical:[118,138],Lumbar:[146,104]}],
  ['Costal facets','Thoracic only: on the body for the rib head and on the transverse process for the rib tubercle.',{Thoracic:[128,196]}],
  ['Uncinate process','Raised lips on cervical bodies; osteophytes here narrow the foramina (cervical radiculopathy).',{Cervical:[132,196]}]
 ]};
X.quiz.push(
 {id:'sp1',c:'neuro',type:'sba',q:'An isolated vertebra has a foramen in each transverse process. Which region does it come from?',o:['Cervical','Coccygeal','Lumbar','Sacral','Thoracic'],a:0,e:'Transverse foramina (for the vertebral artery and vein) are unique to cervical vertebrae.'},
 {id:'sp2',c:'neuro',type:'vsaq',q:'Which ligament joins adjacent laminae and gives the "loss of resistance" during an epidural?',a:['ligamentumflavum','flavum','ligamentaflava','theligamentumflavum'],e:'The ligamentum flavum: elastic, yellow ligament between laminae; the epidural space lies just deep to it.'}
);
Object.assign(X.model,{sp2:'Ligamentum flavum'});
})();
