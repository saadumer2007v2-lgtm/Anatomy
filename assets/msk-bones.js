/* Shaded bone drawings for the musculoskeletal explorer. Every bone is a right bone in the anatomical position.
   Each view: w, h (drawing frame), draw (SVG markup), lm (landmark id -> [x,y] point or [x,y,rx,ry,rotate] area),
   mirror:true draws the same frame flipped left-right (used for posterior/medial views so the outline matches).
   Classes: mb bone body, mb-art articular cartilage, mb-sh shallow fossa, mb-dk deep hollow, mb-ln ridge, mb-rg rough area. */
window.MSK_BONES = (function(){
'use strict';
const P=(c,d,extra)=>`<path class="${c}" d="${d}"${extra||''}/>`;
const E=(c,x,y,rx,ry,rot)=>`<ellipse class="${c}" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${rot?` transform="rotate(${rot} ${x} ${y})"`:''}/>`;

/* ---------------------------------------------------------------- humerus (frame: lateral on the left) */
const HUM='M104,70 C104,50 122,38 142,40 C152,28 176,24 198,30 C224,38 238,62 234,88 C230,110 214,124 196,128 C184,134 176,146 172,160 L168,300 C168,380 170,440 178,480 C190,505 214,520 230,532 C241,540 241,556 228,562 C218,566 210,572 208,584 C206,604 196,614 182,612 C168,610 160,604 150,606 C140,610 126,612 116,604 C106,596 102,584 98,574 C90,566 80,560 78,550 C76,538 84,526 94,512 C112,486 120,450 122,400 L122,300 C122,240 118,190 120,160 C116,140 104,122 100,104 C98,90 100,78 104,70 Z';
const humAnt = P('mb',HUM)+
 P('mb-art','M150,42 C170,30 212,34 228,58 C238,80 230,108 206,120 C190,112 172,92 160,72 C156,62 152,52 150,42 Z')+
 P('mb-sh','M104,74 C110,62 124,58 134,64 C136,86 132,110 124,124 C112,118 104,100 104,74 Z')+
 E('mb-bump',152,114,10,15)+
 P('mb-dk','M128,96 C126,120 128,150 130,176 L140,176 C140,150 140,124 142,100 Z')+
 P('mb-ln','M126,100 C124,140 126,180 128,212')+P('mb-ln','M144,104 C144,140 144,180 146,204')+
 P('mb-rg','M119,248 L127,320 L135,252')+
 P('mb-ln','M120,158 C140,163 158,163 172,158',' stroke-dasharray="4 3"')+
 P('mb-ln','M120,420 C112,470 100,500 88,520')+P('mb-ln','M170,440 C180,480 200,505 226,530')+
 E('mb-dk',122,534,9,7)+E('mb-dk',170,530,15,10)+
 P('mb-art','M104,572 C104,558 118,550 132,554 C146,558 150,576 146,592 C140,606 120,608 110,598 C104,590 104,580 104,572 Z')+
 P('mb-art','M150,562 C162,552 196,550 206,566 C210,584 204,604 190,610 C178,604 164,604 152,606 C146,592 146,574 150,562 Z')+
 P('mb-ln','M178,556 C176,575 176,595 178,610');
const humPost = P('mb',HUM)+
 P('mb-art','M196,34 C218,40 234,62 232,86 C228,104 216,116 204,120 C210,96 208,60 196,34 Z')+
 P('mb-sh','M104,72 C112,60 128,56 140,62 C140,84 136,108 126,124 C112,116 104,98 104,72 Z')+
 P('mb-ln','M112,78 L136,74')+P('mb-ln','M110,100 L134,98')+
 P('mb-dk','M170,186 C152,226 132,268 122,300 L131,306 C142,276 162,236 176,198 Z')+
 P('mb-rg','M119,248 L127,320 L135,252')+
 P('mb-dk','M138,506 C140,484 176,480 186,502 C192,520 184,540 164,544 C146,544 136,528 138,506 Z')+
 P('mb-art','M140,560 C150,548 196,548 206,566 C210,586 200,606 184,610 C170,606 156,606 146,604 C138,590 136,574 140,560 Z')+
 P('mb-dk','M214,544 C222,550 226,560 224,570 L216,568 C216,560 214,552 210,548 Z')+
 P('mb-ln','M120,420 C112,470 100,500 88,520')+P('mb-ln','M170,440 C180,480 200,505 226,530');
const humerus={n:'Humerus',views:{
 Anterior:{w:300,h:640,draw:humAnt,lm:{
  'hu.head':[198,74],'hu.anatNeck':[176,116],'hu.gTub':[114,92],'hu.lTub':[152,114],'hu.itGroove':[134,140],'hu.latLip':[126,196],'hu.medLip':[146,190],
  'hu.surgNeck':[150,162],'hu.deltTub':[127,286,9,30,0],'hu.medShaft':[168,300],'hu.antDistal':[146,440,18,48,0],'hu.latSupra':[106,478],'hu.medSupra':[198,500],
  'hu.latEpi':[82,550],'hu.medEpi':[234,548],'hu.capitulum':[126,582],'hu.trochlea':[182,588],'hu.radFossa':[122,534],'hu.coronFossa':[170,530]}},
 Posterior:{w:300,h:640,mirror:true,draw:humPost,lm:{
  'hu.head':[214,78],'hu.gTub':[118,90],'hu.surgNeck':[150,162],'hu.postUpper':[132,212,10,30,-20],'hu.radGroove':[150,244],'hu.postLower':[150,390,18,62,0],
  'hu.deltTub':[124,290],'hu.olecFossa':[162,514],'hu.latEpi':[82,550],'hu.medEpi':[234,548],'hu.ulnarGroove':[220,558],'hu.trochlea':[176,590],'hu.latSupra':[106,478]}}
}};

/* ---------------------------------------------------------------- radius and ulna (frame: radius on the left) */
const RAD='M92,72 C92,62 140,62 140,72 L140,90 C140,96 132,98 126,100 L126,124 C136,128 142,140 138,154 C136,166 134,190 136,230 C138,320 148,430 156,520 C158,550 162,572 162,590 C162,604 150,612 132,614 C112,616 90,618 74,624 C66,626 62,618 66,608 C70,596 76,580 80,560 C88,480 92,400 94,320 C96,240 100,180 106,140 C108,128 108,110 108,100 C100,98 92,96 92,90 Z';
const ULN='M170,44 C176,30 214,28 222,44 C228,60 224,90 216,112 C210,130 204,148 200,170 C196,260 194,420 194,560 C196,574 204,584 206,598 C208,612 202,622 196,616 C192,610 190,600 186,596 C178,600 168,598 164,588 C162,576 166,566 170,560 C172,440 174,280 178,160 C176,140 168,124 166,110 C164,92 166,60 170,44 Z';
let iom=''; for(let i=0;i<11;i++){const y=210+i*30; const xr=136+ (y-210)*0.06, xu=177-(y-210)*0.01; iom+=`<path class="mb-mem" d="M${xr.toFixed(1)},${y} L${xu.toFixed(1)},${y+26}"/>`;}
const raAnt = iom+P('mb',ULN)+P('mb',RAD)+
 P('mb-art','M92,72 C92,62 140,62 140,72 C140,80 92,80 92,72 Z')+
 E('mb-rg',134,146,7,12)+
 P('mb-art','M174,52 C186,44 206,46 212,58 C214,74 210,92 200,104 C190,108 178,104 174,96 C170,84 170,64 174,52 Z')+
 P('mb-sh','M178,112 C186,106 200,108 206,118 C204,128 194,134 184,132 C178,128 176,120 178,112 Z')+
 E('mb-rg',190,150,6,10)+E('mb-art',170,98,4,8)+
 P('mb-ln','M108,200 C116,220 124,240 128,262');
const raPost = iom+P('mb',ULN)+P('mb',RAD)+
 P('mb-art','M92,72 C92,62 140,62 140,72 C140,80 92,80 92,72 Z')+
 P('mb-sh','M172,40 C182,30 212,30 220,44 C220,60 210,72 196,74 C182,72 172,58 172,40 Z')+
 P('mb-ln','M204,80 C198,200 194,400 196,560')+
 P('mb-ln','M178,150 C180,170 182,190 184,212')+
 E('mb-bump',122,588,6,11)+P('mb-ln','M106,560 L104,606')+P('mb-ln','M140,566 L142,608');
const forearm={n:'Radius and ulna',views:{
 Anterior:{w:300,h:650,draw:raAnt,lm:{
  'ra.head':[116,70],'ra.neck':[116,112],'ra.tub':[134,146],'ra.oblique':[122,236],'ra.midLat':[92,330],'ra.antShaft':[122,390,9,58,-4],'ra.distAnt':[128,566,16,20,0],'ra.styloid':[68,612],
  'ul.trochNotch':[194,76],'ul.coronoid':[192,120],'ul.tub':[190,152],'ul.radialNotch':[170,98],'ul.antShaft':[186,330,9,90,0],'ul.distAnt':[182,560,9,20,0],'ul.head':[180,592],'ul.styloid':[200,612]}},
 Posterior:{w:300,h:650,mirror:true,draw:raPost,lm:{
  'ul.olecranon':[196,46],'ul.anconeus':[180,104],'ul.supCrest':[182,186],'ul.postBorder':[198,300],'ul.postShaft':[186,410,8,70,0],'ul.styloid':[200,612],'ul.head':[182,590],
  'ra.head':[116,70],'ra.neck':[116,112],'ra.postShaft':[106,390,9,60,0],'ra.listers':[122,588],'ra.styloid':[68,612]}}
}};

/* ---------------------------------------------------------------- scapula (frame: posterior view, lateral on the right) */
const SCA='M100,68 C140,62 180,72 204,80 C208,86 212,88 216,84 C222,78 236,76 252,80 L268,92 C282,98 292,108 298,120 C306,128 310,150 306,170 C304,182 298,190 290,194 C276,240 236,320 180,400 C172,412 160,414 156,404 C130,330 104,220 92,140 C90,110 92,84 100,68 Z';
const scPost = P('mb','M248,80 C246,62 262,46 282,44 C294,44 298,54 290,60 C278,66 270,74 268,86 Z')+P('mb',SCA)+
 P('mb-sh','M104,76 C150,70 200,82 250,84 C230,96 160,112 100,124 C98,104 100,88 104,76 Z')+
 P('mb-sh','M104,156 C160,150 230,132 284,120 C280,172 240,262 180,362 C150,300 120,224 104,156 Z')+
 P('mb-dk','M98,148 C160,142 232,126 292,112 L294,124 C232,138 160,154 100,160 Z')+
 P('mb','M96,126 C150,116 220,100 280,82 C300,74 318,62 340,56 C362,52 378,62 372,80 C368,94 350,100 332,100 C316,100 302,106 292,112 C232,126 160,142 98,148 Z')+
 E('mb-art',356,60,8,4,-20)+
 P('mb-ln','M300,122 C310,132 312,160 304,180',' stroke-width="3"')+
 P('mb-ln','M290,196 C270,250 230,330 182,396');
const scAnt = P('mb','M300,74 C320,60 350,52 368,60 C376,68 370,82 354,86 C336,88 316,86 300,84 Z')+P('mb',SCA)+
 P('mb-sh','M104,80 C160,80 230,90 280,104 C286,150 250,260 182,392 C140,300 110,200 104,80 Z')+
 P('mb-ln','M128,140 L232,118')+P('mb-ln','M138,200 L250,166')+P('mb-ln','M150,262 L238,236')+
 P('mb','M244,82 C238,60 250,36 276,30 C292,28 300,40 292,50 C280,58 272,68 270,90 Z')+
 P('mb-art','M296,122 C306,130 310,156 304,178 C298,184 292,180 292,170 C292,150 292,134 296,122 Z');
const scapula={n:'Scapula',views:{
 Posterior:{w:400,h:440,draw:scPost,lm:{
  'sc.acromion':[352,74],'sc.spine':[200,118],'sc.supraFossa':[168,96,48,13,-8],'sc.infraFossa':[184,236,56,70,-12],'sc.supraNotch':[214,84],'sc.supAngle':[102,72],'sc.rootSpine':[98,138],
  'sc.medBorderLow':[126,284,5,80,-14],'sc.infAngle':[160,402],'sc.latBorder':[262,236,7,30,30],'sc.glenoid':[306,150],'sc.infraglen':[294,190],'sc.spinoglenoid':[288,122],'sc.coracoid':[282,50]}},
 Anterior:{w:400,h:440,mirror:true,draw:scAnt,lm:{
  'sc.subFossa':[192,200,58,86,0],'sc.coracoid':[276,40],'sc.glenoid':[302,150],'sc.supraglen':[298,118],'sc.infraglen':[292,192],'sc.medBorderCostal':[112,250,5,120,-10],
  'sc.supAngle':[102,72],'sc.infAngle':[160,402],'sc.supraNotch':[214,84],'sc.acromion':[344,70],'sc.latBorder':[246,290]}}
}};

/* ---------------------------------------------------------------- clavicle (frame: superior view, acromial end left, anterior at the bottom) */
const CLA='M40,70 C40,52 60,44 82,46 C112,48 142,58 172,72 C222,94 272,96 322,86 C362,78 402,64 442,58 C470,54 490,70 490,92 C490,116 472,128 448,126 C402,128 362,140 320,140 C270,140 220,128 180,112 C150,100 120,92 94,98 C66,104 42,92 40,70 Z';
const clSup = P('mb',CLA)+P('mb-art','M40,64 C42,54 52,52 56,58 C56,70 50,84 44,84 C40,80 40,72 40,64 Z')+P('mb-art','M472,66 C486,74 490,96 482,112 C476,104 474,86 472,66 Z')+P('mb-ln','M70,80 C120,74 170,92 220,108 C280,122 360,112 450,92',' opacity=".35"');
const clInf = P('mb',CLA)+E('mb-rg',110,64,9,6)+P('mb-rg','M110,66 C90,72 74,80 62,86')+P('mb-sh','M214,96 C254,106 300,106 344,96 L344,108 C300,118 254,118 214,108 Z')+E('mb-rg',430,104,15,9)+P('mb-art','M472,66 C486,74 490,96 482,112 C476,104 474,86 472,66 Z');
const clavicle={n:'Clavicle',views:{
 Superior:{w:520,h:170,draw:clSup,lm:{'cl.acromialEnd':[52,70],'cl.sternalEnd':[474,92],'cl.shaft':[186,100],'cl.delt':[110,94,30,6,8],'cl.trap':[110,54,30,6,4],'cl.pecmaj':[380,128,58,7,-6],'cl.scm':[432,74,22,7,-8]}},
 Inferior:{w:520,h:170,mirror:true,draw:clInf,lm:{'cl.acromialEnd':[52,70],'cl.sternalEnd':[474,92],'cl.conoid':[110,64],'cl.trapezoid':[78,80],'cl.subGroove':[280,102,54,6,0],'cl.costoclav':[430,104],'cl.shaft':[186,100]}}
}};

/* ---------------------------------------------------------------- hand and foot (reuse the site's existing drawings) */
const hand={n:'Hand',views:{Palmar:{w:340,h:640,draw:()=>(typeof handSVG==='function'?handSVG():''),lm:{
 'ha.scaphoid':[134,534],'ha.trapezium':[112,488],'ha.pisiform':[248,526],'ha.hookHamate':[242,500],'ha.capitate':[188,486],'ha.mc1Base':[112,456],'ha.mc1Shaft':[90,414],
 'ha.mc2Base':[154,454],'ha.mc3Base':[190,450],'ha.mcShafts':[214,384,30,40,0],'ha.mc5Base':[252,462],'ha.mc5Shaft':[268,400],'ha.thumbProx':[64,340],'ha.thumbDistal':[42,250],
 'ha.extExp':[143,262],'ha.midPhal':[197,160],'ha.distPhal':[198,100],'ha.littleProx':[294,280]}}}};
const foot={n:'Foot',views:{Dorsal:{w:380,h:690,draw:()=>(typeof footSVG==='function'?footSVG():''),lm:{
 'ft.calcTub':[194,654],'ft.calcDorsal':[232,556],'ft.talus':[176,512],'ft.navTub':[104,428],'ft.medCun':[106,376],'ft.mt1Base':[108,336],'ft.mt5Tub':[264,374],
 'ft.halluxProx':[88,156],'ft.halluxDistal':[85,96],'ft.toeMid':[194,122],'ft.toeDistal':[198,96],'ft.littleProx':[288,206]}}}};

/* ---------------------------------------------------------------- hip bone (frame: lateral view, anterior on the right) */
const HIP='M70,178 C64,140 90,100 130,78 C170,56 230,52 270,72 C300,88 326,118 332,150 C334,162 326,170 320,178 C322,192 326,204 318,214 C310,226 304,248 306,262 C320,276 350,290 376,300 C392,306 398,326 392,346 C388,364 378,374 366,378 C342,392 318,418 300,440 C286,456 266,468 244,474 C222,480 200,476 192,460 C184,444 182,426 186,410 C178,396 170,388 166,376 C162,366 156,358 150,352 C146,348 150,340 156,336 C150,320 140,300 128,286 C114,270 96,254 92,240 C82,234 76,226 78,216 C72,206 70,192 70,178 Z M262,392 C262,366 296,352 322,362 C344,372 348,402 336,420 C320,438 284,438 270,422 C264,412 262,402 262,392 Z';
const hipLat = `<path class="mb" fill-rule="evenodd" d="${HIP}"/>`+
 P('mb-sh','M80,180 C80,140 120,96 170,76 C220,62 280,76 318,140 C300,190 250,230 190,250 C140,262 100,240 80,180 Z')+
 P('mb-ln','M118,92 C112,130 108,170 110,212')+P('mb-ln','M262,74 C230,120 190,190 150,262')+P('mb-ln','M314,204 C280,230 230,246 180,258')+
 P('mb-ln','M76,170 C70,140 94,104 132,84 C172,64 230,60 268,78 C296,92 318,118 326,146',' opacity=".45"')+
 E('mb-bump',286,84,8,6,-20)+
 `<circle class="mb-rim" cx="245" cy="300" r="56"/>`+
 P('mb-art','M252,349.5 A50,50 0 1 1 284.4,330.8 L267.1,317.2 A28,28 0 1 0 248.9,327.7 Z')+
 `<circle class="mb-dk" cx="245" cy="300" r="26"/>`+
 E('mb-rg',218,452,26,17,-20)+P('mb-ln','M262,392 C262,380 270,370 280,364',' stroke-width="2.4"');
const hipMed = `<path class="mb" fill-rule="evenodd" d="${HIP}"/>`+
 P('mb-sh','M140,190 C150,130 210,80 270,84 C300,100 318,130 322,152 C318,180 304,206 296,232 C250,220 190,214 150,226 C142,214 138,200 140,190 Z')+
 P('mb-art','M86,196 C96,176 124,172 138,186 C146,200 140,226 150,240 C140,252 118,252 108,242 C100,232 88,224 86,196 Z')+
 E('mb-rg',100,164,16,12,-20)+
 P('mb-ln','M150,244 C200,236 260,246 304,264 C330,276 356,290 376,300',' stroke-width="2.6"')+
 P('mb-art','M380,316 C392,320 396,340 390,356 C384,366 376,370 370,370 C374,352 376,332 380,316 Z')+
 E('mb-bump',372,300,6,5)+
 P('mb-sh','M180,300 C220,290 270,330 262,392 C240,420 210,420 196,400 C184,380 176,340 180,300 Z')+
 P('mb-ln','M356,336 C300,330 220,332 156,346',' stroke-dasharray="5 4"')+
 E('mb-rg',218,452,24,16,-20);
const hipbone={n:'Hip bone',views:{
 Lateral:{w:420,h:500,draw:hipLat,lm:{
  'hb.iliacCrest':[190,58],'hb.iliacTub':[286,84],'hb.asis':[330,152],'hb.aiis':[320,210],'hb.psis':[70,180],'hb.piis':[80,218],
  'hb.glutPost':[96,170,13,30,0],'hb.glutMid':[184,140,42,40,-20],'hb.glutLow':[240,212,32,20,-20],'hb.greaterNotch':[126,286],'hb.ischialSpine':[148,350],'hb.lesserNotch':[170,384],
  'hb.ischialTub':[218,452,24,15,-20],'hb.ischialRamus':[274,452],'hb.acetabulum':[245,300],'hb.obtForamen':[302,394],'hb.pubicTub':[374,302],'hb.pubicBody':[380,338],'hb.supRamus':[340,292],'hb.infRamus':[330,412]}},
 Medial:{w:420,h:500,mirror:true,draw:hipMed,lm:{
  'hb.iliacCrest':[190,58],'hb.iliacFossa':[232,150,58,40,-10],'hb.auricular':[116,212],'hb.arcuate':[220,240],'hb.pecten':[336,284],'hb.pubicTub':[372,300],'hb.pubicCrest':[386,312],
  'hb.pubicSym':[384,344],'hb.pubicBodyPost':[360,352],'hb.tendArch':[256,334],'hb.asis':[330,152],'hb.psis':[70,180],'hb.greaterNotch':[126,286],'hb.ischialSpine':[148,350],
  'hb.lesserNotch':[170,384],'hb.ischialTub':[218,452],'hb.obtForamen':[302,394],'hb.infRamus':[330,412]}}
}};

/* ---------------------------------------------------------------- whole pelvis (anterior), drawn as one half and mirrored */
const PHALF='M252,146 C222,108 172,74 122,70 C88,70 62,96 58,130 C56,150 58,166 64,178 C72,186 76,200 80,214 C76,230 68,248 64,266 C62,292 70,316 90,330 C100,360 120,390 150,404 C164,414 180,414 192,404 C210,392 240,384 270,376 C282,372 290,368 294,360 L294,324 C280,314 252,302 224,292 C196,282 176,262 176,238 C178,212 212,180 252,164 Z M168,340 C170,318 200,306 226,314 C246,322 248,346 236,362 C222,378 190,380 176,368 C168,360 166,350 168,340 Z';
const half = `<path class="mb" fill-rule="evenodd" d="${PHALF}"/>`+
 P('mb-sh','M240,152 C206,118 160,88 120,86 C92,90 74,112 76,140 C80,160 96,178 120,190 C150,204 172,220 180,240 C188,210 214,180 250,164 Z')+
 P('mb-dk','M66,256 C64,238 76,226 92,228 C108,232 114,258 108,282 C102,304 86,310 76,300 C68,290 66,272 66,256 Z')+
 P('mb-art','M70,256 C70,242 80,234 92,236 C102,240 106,258 102,276 C98,292 88,296 80,290 C84,280 86,262 80,252 C76,250 72,252 70,256 Z');
let foram=''; [[164,32],[192,28],[218,22],[242,16]].forEach(([y,dx])=>{foram+=E('mb-dk',300-dx,y,7,5)+E('mb-dk',300+dx,y,7,5);});
const pelvisAnt = half+`<g transform="translate(600,0) scale(-1,1)">${half}</g>`+
 P('mb','M232,140 C260,128 340,128 368,140 C372,168 362,204 348,236 C338,260 322,282 310,296 C305,302 295,302 290,296 C278,282 262,260 252,236 C238,204 228,168 232,140 Z')+
 P('mb-art','M262,140 C285,132 315,132 338,140 C320,150 280,150 262,140 Z')+foram+
 P('mb-ln','M262,178 L338,178')+P('mb-ln','M266,206 L334,206')+P('mb-ln','M272,230 L328,230')+
 P('mb','M292,298 C296,304 304,304 308,298 L305,318 C303,322 297,322 295,318 Z')+
 `<rect class="mb-art" x="294" y="324" width="12" height="38" rx="3"/>`;
const PBRIM='M300,142 C280,146 262,152 252,160 C222,176 190,206 182,240 C178,262 200,282 232,294 C260,304 282,314 294,322 L306,322 C318,314 340,304 368,294 C400,282 422,262 418,240 C410,206 378,176 348,160 C338,152 320,146 300,142 Z';
const pelvis={n:'Pelvis (assembled)',layers:{cavity:`<path class="msk-false" d="M120,80 C170,72 222,108 252,160 C222,176 190,206 182,240 C150,214 100,196 76,150 C70,110 90,86 120,80 Z M480,80 C430,72 378,108 348,160 C378,176 410,206 418,240 C450,214 500,196 524,150 C530,110 510,86 480,80 Z"/><path class="msk-true" d="${PBRIM}"/>`},
 views:{Anterior:{w:600,h:440,draw:pelvisAnt+`<path class="msk-brim" d="${PBRIM}"/>`,lm:{
  'hb.iliacCrest':[140,74],'hb.iliacTub':[516,104],'hb.asis':[62,172],'hb.aiis':[520,214],'hb.iliacFossa':[150,140,32,26,-30],'hb.arcuate':[414,236],'pe.brim':[384,184],
  'hb.acetabulum':[86,268],'hb.supRamus':[386,300],'hb.obtForamen':[394,342],'hb.pubicTub':[252,326],'hb.pubicCrest':[276,318],'hb.pubicSym':[300,344],'hb.pubicBody':[280,350],
  'hb.infRamus':[342,376],'hb.ischialRamus':[404,398],'hb.ischialTub':[168,406],'pe.arch':[300,390],'sa.promontory':[300,136],'sa.ala':[260,152],'pe.sij':[244,170],
  'sa.antForamina':[332,192],'sa.coccyx':[300,312]}}}};

/* ---------------------------------------------------------------- sacrum (posterior) */
let pf=''; [[80,42],[116,38],[150,32],[182,25]].forEach(([y,dx])=>{pf+=E('mb-dk',150-dx,y,7,6)+E('mb-dk',150+dx,y,7,6);});
const sacPost = P('mb','M60,40 C100,28 200,28 240,40 C250,70 244,110 230,150 C214,196 192,240 170,270 C164,278 136,278 130,270 C108,240 86,196 70,150 C56,110 50,70 60,40 Z')+
 P('mb-art','M62,48 C74,52 80,80 76,110 C72,126 64,120 60,104 C56,84 56,62 62,48 Z')+P('mb-art','M238,48 C226,52 220,80 224,110 C228,126 236,120 240,104 C244,84 244,62 238,48 Z')+
 E('mb-art',110,36,12,6)+E('mb-art',190,36,12,6)+
 [70,105,140,172].map(y=>E('mb-bump',150,y,7,9)).join('')+pf+
 P('mb-dk','M138,232 C138,214 162,214 162,232 L162,258 L138,258 Z')+E('mb-bump',132,250,5,9)+E('mb-bump',168,250,5,9)+
 P('mb','M136,276 C146,282 154,282 164,276 L160,300 C158,310 142,310 140,300 Z')+P('mb','M142,310 C146,314 154,314 158,310 L154,328 C152,334 148,334 146,328 Z');
const sacrum={n:'Sacrum and coccyx',views:{Posterior:{w:300,h:350,draw:sacPost,lm:{
 'sa.medianCrest':[150,120],'sa.postForamina':[192,80],'sa.hiatus':[150,238],'sa.cornua':[132,252],'sa.coccyx':[150,304],'sa.dorsal':[214,150,14,30,-20],'hb.auricular':[64,92]}}}};

/* ---------------------------------------------------------------- femur (frame: anterior view, lateral on the left) */
const FEM='M86,52 C92,46 104,50 110,60 C122,74 140,84 160,82 C172,62 186,40 210,36 C236,34 250,56 246,80 C242,100 226,108 210,106 C196,110 186,126 176,148 C172,160 176,170 172,180 C164,196 156,220 154,260 C152,350 156,440 168,520 C176,548 196,566 222,566 C236,566 246,580 244,600 C244,620 236,640 222,650 C208,660 192,656 184,646 C176,640 166,640 156,646 C142,656 120,658 106,648 C92,638 86,620 88,602 C90,584 100,568 112,556 C124,520 124,440 122,350 C120,260 116,200 106,150 C96,130 80,110 76,90 C72,72 76,58 86,52 Z';
const feAnt = P('mb',FEM)+
 P('mb-art','M178,58 C188,42 206,36 222,38 C240,42 248,60 244,80 C240,98 224,106 208,104 C194,96 184,78 178,58 Z')+`<circle class="mb-dk" cx="226" cy="70" r="4"/>`+
 P('mb-sh','M86,54 C96,50 106,56 112,66 C116,90 114,118 106,140 C94,124 80,104 78,84 C76,70 78,60 86,54 Z')+
 P('mb-sh','M120,86 C140,90 160,86 172,70 C182,100 186,120 176,144 C160,140 140,126 122,112 Z',' opacity=".5"')+
 P('mb-rg','M110,112 C128,132 150,150 172,176')+
 P('mb','M168,166 C178,162 186,170 182,182 C178,190 170,188 168,180 Z')+
 P('mb-art','M126,598 C138,578 178,576 200,594 C202,618 192,640 178,640 C162,636 152,636 140,640 C128,630 122,612 126,598 Z')+
 E('mb-bump',224,566,6,5)+E('mb-bump',94,600,5,7)+E('mb-bump',240,600,5,7);
const fePost = P('mb',FEM)+
 P('mb-art','M196,40 C216,34 242,46 246,72 C246,92 232,104 214,106 C220,86 214,60 196,40 Z')+
 P('mb-sh','M84,54 C96,48 108,56 112,70 C114,96 112,124 104,146 C92,130 78,108 76,88 C74,72 76,60 84,54 Z')+
 E('mb-dk',112,74,8,6)+
 P('mb-ln','M108,70 C120,100 140,140 168,176',' stroke-width="3"')+E('mb-bump',128,118,6,8)+
 P('mb','M164,166 C178,160 190,170 186,186 C182,196 170,194 166,184 Z')+
 P('mb-rg','M110,170 C114,200 118,230 122,250')+P('mb-ln','M170,188 C164,210 158,230 152,250')+
 P('mb-sh','M128,470 L150,470 C170,510 196,540 222,560 L96,570 C104,540 116,510 128,470 Z',' opacity=".5"')+
 P('mb-rg','M124,250 C130,330 134,400 128,470')+P('mb-rg','M150,250 C144,330 140,400 150,470')+
 P('mb-ln','M128,470 C116,510 104,540 96,570')+P('mb-ln','M150,470 C170,510 196,540 222,560')+
 P('mb-art','M96,590 C96,574 118,570 132,580 C146,600 146,640 120,654 C104,656 92,640 92,620 Z')+
 P('mb-art','M186,600 C192,578 228,572 240,594 C246,616 238,646 216,652 C196,652 186,630 186,600 Z')+
 P('mb-dk','M146,604 C154,592 176,592 184,606 C186,626 180,646 172,648 C166,640 160,640 152,646 C146,634 144,616 146,604 Z');
const femur={n:'Femur',views:{
 Anterior:{w:300,h:680,draw:feAnt,lm:{
  'fe.head':[214,72],'fe.fovea':[226,70],'fe.neck':[150,104],'fe.gTroch':[92,84],'fe.lTroch':[178,176],'fe.itLine':[140,142],'fe.antShaft':[140,330,13,80,0],
  'fe.latCondyle':[112,620],'fe.medCondyle':[222,624],'fe.latEpi':[94,600],'fe.medEpi':[240,600],'fe.adductorTub':[226,566],'fe.patSurf':[164,612]}},
 Posterior:{w:300,h:680,mirror:true,draw:fePost,lm:{
  'fe.head':[222,74],'fe.gTroch':[92,84],'fe.trochFossa':[112,74],'fe.lTroch':[178,178],'fe.itCrest':[148,150],'fe.quadTub':[128,118],'fe.glutTub':[116,212],
  'fe.pectLine':[162,222],'fe.lineaAspera':[138,370,8,80,0],'fe.latSupra':[108,522],'fe.medSupra':[192,528],'fe.adductorTub':[226,566],'fe.poplSurf':[158,540],
  'fe.aboveMedCond':[208,576],'fe.intercond':[166,620],'fe.latCondyle':[110,612],'fe.medCondyle':[216,620]}}
}};

/* ---------------------------------------------------------------- tibia and fibula (frame: anterior view, fibula on the left) */
const TIB='M108,62 C108,44 140,36 180,36 C220,36 252,44 254,62 C256,80 246,92 230,100 C214,110 204,130 200,160 C198,250 202,400 212,520 C216,560 226,590 232,610 C236,626 230,636 220,632 C212,628 206,620 196,618 C176,616 156,618 146,612 C140,600 142,580 146,560 C150,440 150,300 150,200 C150,160 144,130 128,112 C116,104 108,84 108,62 Z';
const FIB='M76,96 C74,84 88,78 100,84 C110,92 112,108 104,120 C96,130 94,140 94,160 L98,500 C100,540 108,570 112,592 C114,610 110,632 100,646 C90,656 76,650 72,636 C68,612 70,580 72,550 C74,440 76,300 76,160 C76,140 70,124 68,112 C66,104 70,98 76,96 Z';
let iom2=''; for(let i=0;i<11;i++){const y=180+i*32; iom2+=`<path class="mb-mem" d="M96,${y} L${(149-i*0.3).toFixed(1)},${y+26}"/>`;}
const tiAnt = iom2+P('mb',FIB)+P('mb',TIB)+
 P('mb-art','M112,58 C120,44 160,40 180,42 C206,40 240,44 250,58 C230,54 200,52 180,54 C160,52 130,54 112,58 Z')+
 P('mb','M166,40 L172,30 L178,40 Z')+P('mb','M182,40 L188,30 L194,40 Z')+
 P('mb-rg','M170,108 C180,100 194,104 196,116 C196,132 186,142 178,140 C170,136 166,122 170,108 Z')+E('mb-bump',128,104,7,6)+
 P('mb-ln','M182,142 C178,250 176,400 184,520 C190,560 200,590 212,606',' stroke-width="2"')+
 P('mb-sh','M186,150 C198,140 204,150 202,180 C200,300 204,420 214,520 C206,470 196,320 186,150 Z',' opacity=".45"')+
 E('mb-bump',86,94,8,10);
const tiPost = iom2+P('mb',FIB)+P('mb',TIB)+
 P('mb-sh','M130,112 C160,110 196,120 204,150 L200,224 C176,200 150,176 132,150 Z',' opacity=".55"')+
 P('mb-rg','M132,150 C150,175 176,200 200,226')+
 P('mb-ln','M176,226 C174,300 172,380 176,440')+
 P('mb-dk','M214,580 C220,600 224,616 224,628 L218,626 C216,610 214,596 210,582 Z')+
 P('mb-dk','M168,38 C176,52 188,52 196,38 Z')+
 P('mb-ln','M84,160 L86,500',' opacity=".5"')+P('mb-ln','M70,560 C78,590 96,610 108,620',' opacity=".5"');
const leg={n:'Tibia and fibula',views:{
 Anterior:{w:300,h:660,draw:tiAnt,lm:{
  'ti.medCond':[234,70],'ti.latCond':[124,68],'ti.eminence':[180,34],'ti.tub':[184,122],'ti.gerdy':[128,104],'ti.pes':[212,150,9,16,0],'ti.antBorder':[180,300],
  'ti.medSurface':[200,370,7,80,-3],'ti.latSurface':[164,250,10,66,0],'ti.medMall':[228,622],'fi.head':[86,94],'fi.neck':[96,140],'fi.latSurface':[80,340,5,110,0],
  'fi.antSurface':[92,380,4,110,0],'fi.latMall':[92,640]}},
 Posterior:{w:300,h:660,mirror:true,draw:tiPost,lm:{
  'ti.medCondPost':[236,84],'ti.latCond':[124,70],'ti.eminence':[180,40],'ti.poplArea':[166,132],'ti.soleal':[166,188],'ti.postLat':[162,320,6,70,0],'ti.postMed':[190,320,6,70,0],
  'ti.medMall':[228,622],'ti.mallGroove':[222,604],'fi.head':[86,94],'fi.neck':[96,140],'fi.postUpper':[84,190],'fi.postLower':[84,420,6,90,0],'fi.latMall':[92,640]}}
}};

/* Gray's Anatomy (1918) plates stored in assets/img/gray: [file, figure, description, side] */
const PL={
 clavicle:{Superior:[['Gray200.png',200,'Clavicle, superior surface','Left']],Inferior:[['Gray201.png',201,'Clavicle, inferior surface','Left']]},
 scapula:{Anterior:[['Gray202.png',202,'Scapula, anterior (costal) surface','Left']],Posterior:[['Gray203.png',203,'Scapula, posterior surface','Left']]},
 humerus:{Anterior:[['Gray207.png',207,'Humerus, anterior view','Left']],Posterior:[['Gray208.png',208,'Humerus, posterior view','Left']]},
 forearm:{Anterior:[['Gray213.png',213,'Radius and ulna, anterior aspect','Left']],Posterior:[['Gray214.png',214,'Radius and ulna, posterior surface','Left']]},
 hand:{Palmar:[['Gray219.png',219,'Bones of the hand, palmar (volar) surface','Left']]},
 hipbone:{Lateral:[['Gray235.png',235,'Hip bone, external surface','Right']],Medial:[['Gray236.png',236,'Hip bone, internal surface','Right']]},
 pelvis:{Anterior:[['Gray241.png',241,'Male pelvis, from the front','Both'],['Gray242.png',242,'Female pelvis, from the front','Both']]},
 femur:{Anterior:[['Gray244.png',244,'Femur, anterior surface','Right']],Posterior:[['Gray245.png',245,'Femur, posterior surface','Right']]},
 leg:{Anterior:[['Gray258.png',258,'Tibia and fibula, anterior surface','Right']],Posterior:[['Gray259.png',259,'Tibia and fibula, posterior surface','Right']]},
 foot:{Dorsal:[['Gray268.png',268,'Bones of the foot, dorsal surface','Right'],['Gray269.png',269,'Bones of the foot, plantar surface','Right']]}
};
const ALL={clavicle,scapula,humerus,forearm,hand,hipbone,pelvis,femur,leg,foot,sacrum};
Object.entries(PL).forEach(([b,vs])=>Object.entries(vs).forEach(([v,p])=>{ if(ALL[b].views[v]) ALL[b].views[v].plates=p; }));

return {
 ul:[['clavicle',clavicle],['scapula',scapula],['humerus',humerus],['forearm',forearm],['hand',hand]],
 ll:[['hipbone',hipbone],['femur',femur],['leg',leg],['foot',foot]],
 pv:[['pelvis',pelvis],['hipbone',hipbone],['sacrum',sacrum]]
};
})();
