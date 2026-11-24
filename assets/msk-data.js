/* Musculoskeletal atlas data: bony landmarks (with importance tier), muscles (origin/insertion linked to landmarks,
   nerve, compartment, action, blood supply) and compartments. Used by msk-explorer.js for the upper limb, lower limb
   and pelvis chapters. Tier: 1 = key (palpable, fractures, nerve or vessel nearby: learn first), 2 = core, 3 = detail. */
window.MSK = (function(){
'use strict';
const LM = {};
const L = (id,n,t,d) => { LM[id] = {id,n,t,d,bone:id.split('.')[0]}; };

/* ---------------- clavicle ---------------- */
L('cl.acromialEnd','Acromial end',2,'Flat lateral end; meets the acromion at the acromioclavicular joint. A step here after a fall on the shoulder is an AC joint separation.');
L('cl.sternalEnd','Sternal end',2,'Bulbous medial end at the sternoclavicular joint, the only bony joint between the upper limb and the trunk.');
L('cl.shaft','Shaft (junction of middle and lateral thirds)',1,'The commonest fracture site in the body after a fall on the shoulder or outstretched hand. SCM pulls the medial fragment up and the weight of the arm pulls the lateral fragment down. The subclavian vessels and brachial plexus lie just behind.');
L('cl.delt','Anterior border, lateral third',3,'Rough anterior edge of the lateral third: origin of deltoid (anterior fibres).');
L('cl.trap','Posterior border, lateral third',3,'Insertion of trapezius, directly opposite the deltoid origin on the front edge.');
L('cl.pecmaj','Anterior surface, medial half',3,'Origin of the clavicular head of pectoralis major.');
L('cl.scm','Superior surface, medial third',3,'Origin of the clavicular head of sternocleidomastoid.');
L('cl.conoid','Conoid tubercle',2,'Underside near the lateral end: attachment of the conoid part of the coracoclavicular ligament, which holds the scapula on the clavicle.');
L('cl.trapezoid','Trapezoid line',3,'Ridge running laterally from the conoid tubercle: trapezoid part of the coracoclavicular ligament.');
L('cl.subGroove','Subclavian groove',3,'Groove on the underside of the middle third for subclavius, which cushions the subclavian vessels in a fracture.');
L('cl.costoclav','Costoclavicular impression',3,'Roughened area underneath the medial end for the costoclavicular ligament.');

/* ---------------- scapula ---------------- */
L('sc.acromion','Acromion',1,'Lateral end of the spine, forming the point of the shoulder. Palpable landmark for measuring arm length and for shoulder injections; the supraspinatus tendon runs beneath it (impingement).');
L('sc.spine','Spine of scapula',1,'Ridge on the posterior surface dividing the supraspinous and infraspinous fossae. Palpable along its length; its root is at T3.');
L('sc.coracoid','Coracoid process',1,'Finger-like process pointing forwards below the lateral clavicle. Palpable in the deltopectoral groove. Pectoralis minor, coracobrachialis and the short head of biceps attach here: "one in, two out".');
L('sc.glenoid','Glenoid cavity',1,'Shallow socket for the humeral head, deepened by the labrum. Its shallowness gives mobility at the cost of stability: the shoulder is the most commonly dislocated large joint.');
L('sc.supraglen','Supraglenoid tubercle',2,'Above the glenoid, inside the joint capsule: origin of the long head of biceps, whose tendon runs through the joint.');
L('sc.infraglen','Infraglenoid tubercle',2,'Below the glenoid: origin of the long head of triceps.');
L('sc.supraFossa','Supraspinous fossa',2,'Above the spine: origin of supraspinatus.');
L('sc.infraFossa','Infraspinous fossa',2,'Below the spine: origin of infraspinatus.');
L('sc.subFossa','Subscapular fossa',2,'The whole concave front (costal) surface: origin of subscapularis.');
L('sc.supraNotch','Suprascapular notch',1,'Notch in the superior border bridged by the superior transverse scapular ligament. The suprascapular nerve passes under the ligament (artery above it: "the army goes over the bridge, the navy under it"). Entrapment weakens supraspinatus and infraspinatus.');
L('sc.supAngle','Superior angle',2,'Top medial corner at about T2. Levator scapulae inserts here.');
L('sc.infAngle','Inferior angle',1,'Lowest point of the scapula at about T7 with the arms by the side: a landmark for counting ribs and for pleural aspiration. Teres major arises from its back.');
L('sc.rootSpine','Root of the spine',2,'Where the spine meets the medial border, at T3. Rhomboid minor inserts here.');
L('sc.medBorderLow','Medial border below the spine',2,'Insertion of rhomboid major on the posterior lip.');
L('sc.medBorderCostal','Medial border, costal surface',1,'Insertion of serratus anterior along the whole front lip of the medial border. Long thoracic nerve injury lets this border lift off the chest wall: winged scapula.');
L('sc.latBorder','Lateral border',2,'Thick edge running down from the glenoid. The upper two-thirds of its back gives origin to teres minor.');
L('sc.spinoglenoid','Spinoglenoid notch',3,'Between the spine and the glenoid: the suprascapular nerve passes here to reach infraspinatus.');

/* ---------------- humerus ---------------- */
L('hu.head','Head of humerus',2,'Smooth hemisphere facing medially, up and back into the glenoid. Anterior dislocation is the commonest (arm abducted and externally rotated).');
L('hu.anatNeck','Anatomical neck',3,'Groove at the edge of the articular surface; the joint capsule attaches here.');
L('hu.surgNeck','Surgical neck',1,'Narrowing below the tubercles: a common fracture site in older people. The axillary nerve and posterior circumflex humeral artery wind round it, so check regimental badge sensation and deltoid.');
L('hu.gTub','Greater tubercle',1,'Lateral bump with three facets for supraspinatus, infraspinatus and teres minor (top to bottom: S, I, T). Palpable below the acromion. Avulsion fractures happen with anterior dislocation.');
L('hu.lTub','Lesser tubercle',2,'Front bump medial to the bicipital groove: subscapularis inserts here.');
L('hu.itGroove','Intertubercular (bicipital) groove',1,'Groove between the tubercles carrying the long head of biceps tendon. Latissimus dorsi inserts in its floor.');
L('hu.latLip','Lateral lip of the groove',2,'Pectoralis major inserts here.');
L('hu.medLip','Medial lip of the groove',2,'Teres major inserts here. "The lady between two majors": latissimus dorsi in the floor between pectoralis major and teres major.');
L('hu.deltTub','Deltoid tuberosity',2,'V-shaped rough area halfway down the lateral shaft: deltoid insertion.');
L('hu.medShaft','Medial shaft (middle)',3,'Insertion of coracobrachialis.');
L('hu.radGroove','Radial groove',1,'Spiral groove on the back of the shaft for the radial nerve and profunda brachii artery. Mid-shaft fractures injure the nerve: wrist drop with triceps spared.');
L('hu.postUpper','Posterior shaft above the radial groove',3,'Origin of the lateral head of triceps.');
L('hu.postLower','Posterior shaft below the radial groove',3,'Origin of the medial head of triceps.');
L('hu.antDistal','Anterior shaft, lower half',2,'Origin of brachialis, the main elbow flexor.');
L('hu.latSupra','Lateral supracondylar ridge',2,'Origin of brachioradialis (upper) and extensor carpi radialis longus (lower).');
L('hu.medSupra','Medial supracondylar ridge',3,'A supracondylar spur here (in about 1%) can trap the median nerve and brachial artery.');
L('hu.latEpi','Lateral epicondyle',1,'Common extensor origin: the posterior forearm muscles arise here. Tennis elbow (lateral epicondylitis) is pain at this origin, mostly ECRB.');
L('hu.medEpi','Medial epicondyle',1,'Common flexor origin: the anterior forearm muscles arise here. The ulnar nerve runs in a groove behind it (the "funny bone"); epicondyle fractures in children can injure it. Golfer\'s elbow is pain at this origin.');
L('hu.ulnarGroove','Groove for the ulnar nerve',1,'Behind the medial epicondyle. The nerve is subcutaneous here and easily compressed (cubital tunnel syndrome).');
L('hu.capitulum','Capitulum',2,'Rounded lateral articular knob for the head of the radius.');
L('hu.trochlea','Trochlea',2,'Spool-shaped medial articular surface for the trochlear notch of the ulna.');
L('hu.olecFossa','Olecranon fossa',2,'Deep hollow on the back that receives the olecranon in full extension. On a lateral X-ray, a displaced fat pad here (sail sign) suggests a hidden fracture.');
L('hu.coronFossa','Coronoid fossa',3,'Receives the coronoid process of the ulna in full flexion.');
L('hu.radFossa','Radial fossa',3,'Receives the radial head in full flexion.');

/* ---------------- radius ---------------- */
L('ra.head','Head of radius',1,'Disc that spins inside the annular ligament in pronation and supination. Palpable below the lateral epicondyle as you turn the hand. Fractured in falls on the outstretched hand; pulled elbow in toddlers.');
L('ra.neck','Neck of radius',2,'Narrow part below the head; supinator wraps round it. The posterior interosseous nerve winds round here.');
L('ra.tub','Radial tuberosity',1,'Medial bump below the neck: insertion of biceps. Biceps supinates by unwinding the radius around this point.');
L('ra.oblique','Anterior oblique line',3,'Origin of the radial head of flexor digitorum superficialis.');
L('ra.midLat','Middle of the lateral surface',2,'Pronator tuberosity: insertion of pronator teres at the point of maximum curvature of the radius.');
L('ra.antShaft','Anterior shaft',3,'Origin of flexor pollicis longus.');
L('ra.postShaft','Posterior shaft',3,'Origins of abductor pollicis longus and extensor pollicis brevis.');
L('ra.distAnt','Distal anterior surface',3,'Insertion of pronator quadratus.');
L('ra.listers','Dorsal (Lister\'s) tubercle',2,'Palpable bump on the back of the distal radius. The extensor pollicis longus tendon hooks round it and can rupture weeks after a distal radius fracture.');
L('ra.styloid','Radial styloid',1,'Palpable lateral tip of the radius at the wrist, about 1 cm lower than the ulnar styloid. Brachioradialis inserts just above it. In a Colles\' fracture its level rises.');

/* ---------------- ulna ---------------- */
L('ul.olecranon','Olecranon',1,'Point of the elbow, subcutaneous. Triceps inserts here. With the elbow flexed it forms a triangle with the two epicondyles; the triangle is lost in dislocation but kept in supracondylar fracture.');
L('ul.trochNotch','Trochlear notch',2,'Deep C-shaped articular surface gripping the trochlea: the main stabiliser of the elbow.');
L('ul.coronoid','Coronoid process',2,'Front lip of the trochlear notch. Brachialis inserts here; the ulnar head of pronator teres and part of FDS arise from it.');
L('ul.tub','Ulnar tuberosity',2,'Rough area below the coronoid: brachialis inserts here.');
L('ul.radialNotch','Radial notch',3,'Facet on the lateral side of the coronoid for the radial head (proximal radio-ulnar joint).');
L('ul.supCrest','Supinator crest',3,'Ridge below the radial notch: origin of part of supinator.');
L('ul.antShaft','Anterior and medial shaft',2,'Origin of flexor digitorum profundus, the deepest finger flexor.');
L('ul.postBorder','Posterior border',2,'Subcutaneous along its whole length (feel it from olecranon to wrist). Aponeurotic origin of FCU, FDP and ECU.');
L('ul.postShaft','Posterior shaft',3,'Origins of abductor pollicis longus, extensor pollicis longus and extensor indicis.');
L('ul.anconeus','Lateral olecranon and upper posterior ulna',3,'Insertion of anconeus.');
L('ul.distAnt','Distal anterior surface',3,'Origin of pronator quadratus.');
L('ul.head','Head of ulna',3,'Distal knob, prominent on the back of the wrist in pronation; separated from the carpus by the triangular fibrocartilage.');
L('ul.styloid','Ulnar styloid',2,'Medial tip at the wrist; often fractured with a Colles\' fracture.');

/* ---------------- hand ---------------- */
L('ha.scaphoid','Scaphoid (tubercle)',1,'Palpable at the base of the thenar eminence and in the anatomical snuffbox. The most fractured carpal; blood enters distally, so waist fractures risk avascular necrosis. The flexor retinaculum and abductor pollicis brevis attach to its tubercle.');
L('ha.trapezium','Trapezium (tubercle)',2,'Saddle joint with the 1st metacarpal for opposition. The flexor retinaculum and thenar muscles attach to its tubercle.');
L('ha.pisiform','Pisiform',1,'Pea-shaped sesamoid in the FCU tendon, palpable at the base of the hypothenar eminence; medial wall of Guyon\'s canal. Abductor digiti minimi arises from it.');
L('ha.hookHamate','Hook of hamate',1,'Palpable deep in the hypothenar eminence: lateral wall of Guyon\'s canal (ulnar nerve and artery). Fractured in golfers and racquet players.');
L('ha.capitate','Capitate',3,'Largest carpal: origin of the oblique head of adductor pollicis.');
L('ha.mc1Base','Base of 1st metacarpal',2,'Abductor pollicis longus inserts here. Bennett\'s fracture is an intra-articular fracture of this base.');
L('ha.mc1Shaft','Shaft of 1st metacarpal',3,'Lateral side: insertion of opponens pollicis.');
L('ha.mc2Base','Base of 2nd metacarpal',2,'Front: flexor carpi radialis. Back: extensor carpi radialis longus.');
L('ha.mc3Base','Base of 3rd metacarpal',3,'Back: extensor carpi radialis brevis.');
L('ha.mcShafts','Metacarpal shafts',3,'Origins of the interossei; the 3rd metacarpal shaft gives origin to the transverse head of adductor pollicis.');
L('ha.mc5Base','Base of 5th metacarpal',2,'Back: extensor carpi ulnaris. FCU reaches it through the pisometacarpal ligament.');
L('ha.mc5Shaft','Shaft of 5th metacarpal',3,'Medial side: opponens digiti minimi. Its neck breaks in a boxer\'s fracture.');
L('ha.thumbProx','Base of proximal phalanx of thumb',2,'Thenar short muscles (abductor and flexor pollicis brevis), adductor pollicis and extensor pollicis brevis insert here.');
L('ha.thumbDistal','Distal phalanx of thumb',2,'Front: flexor pollicis longus. Back: extensor pollicis longus.');
L('ha.extExp','Extensor expansions (over the proximal phalanges)',2,'Dorsal hoods into which extensor digitorum, the lumbricals and interossei insert, letting them flex the MCP joints while extending the IP joints.');
L('ha.midPhal','Middle phalanges',2,'Front: the split tendons of flexor digitorum superficialis. Back: central slip of the extensor expansion (boutonnière deformity if torn).');
L('ha.distPhal','Distal phalanges',2,'Front: flexor digitorum profundus. Back: terminal extensor tendon (mallet finger if torn).');
L('ha.littleProx','Base of proximal phalanx of little finger',3,'Abductor digiti minimi and flexor digiti minimi brevis insert here.');

/* ---------------- hip bone, pelvis, sacrum ---------------- */
L('hb.iliacCrest','Iliac crest',1,'Palpable upper border of the ilium. A line joining the highest points (supracristal or Tuffier\'s line) crosses L4: the landmark for lumbar puncture. Bone marrow is sampled from the posterior crest. Abdominal wall muscles, latissimus dorsi and quadratus lumborum attach to it.');
L('hb.iliacTub','Tubercle of the iliac crest',2,'Thickening about 5 cm behind the ASIS. The transtubercular plane through both tubercles is at L5.');
L('hb.asis','Anterior superior iliac spine (ASIS)',1,'Palpable front end of the crest. Lateral end of the inguinal ligament; sartorius and tensor fasciae latae arise here. Used to measure leg length (ASIS to medial malleolus) and to place a pelvic binder. Avulsed by sartorius in sprinting teenagers.');
L('hb.aiis','Anterior inferior iliac spine (AIIS)',2,'Below the ASIS: origin of the straight head of rectus femoris and the iliofemoral ligament. Avulsed in kicking sports.');
L('hb.psis','Posterior superior iliac spine (PSIS)',1,'Under the dimples of Venus at S2, the level where the dural sac ends.');
L('hb.piis','Posterior inferior iliac spine',3,'Below the PSIS, above the greater sciatic notch.');
L('hb.glutPost','Gluteal surface behind the posterior gluteal line',3,'Origin of gluteus maximus (with the sacrum, coccyx and sacrotuberous ligament).');
L('hb.glutMid','Gluteal surface between the anterior and posterior lines',2,'Origin of gluteus medius.');
L('hb.glutLow','Gluteal surface between the anterior and inferior lines',3,'Origin of gluteus minimus.');
L('hb.iliacFossa','Iliac fossa',2,'Smooth concave inner surface of the ilium: origin of iliacus. Forms the back wall of the false pelvis (right and left iliac regions of the abdomen).');
L('hb.auricular','Auricular surface',2,'Ear-shaped surface on the inner ilium for the sacrum at the sacroiliac joint, a synovial joint held by very strong ligaments.');
L('hb.arcuate','Arcuate line',2,'Ridge on the inner ilium from the sacroiliac joint to the iliopubic eminence; part of the pelvic brim.');
L('hb.pecten','Pecten pubis (pectineal line)',2,'Sharp ridge on the superior pubic ramus continuing the arcuate line; part of the pelvic brim. Pectineus arises here.');
L('hb.greaterNotch','Greater sciatic notch',1,'Converted into the greater sciatic foramen by the sacrospinous ligament. Piriformis, the sciatic nerve, the gluteal vessels and nerves and the pudendal nerve leave the pelvis through it. Wide in females.');
L('hb.ischialSpine','Ischial spine',1,'Projects backwards between the two notches; sacrospinous ligament and coccygeus attach. The pudendal nerve hooks round it (pudendal block site, felt per vaginam). The distance between the spines is the narrowest diameter of the birth canal.');
L('hb.lesserNotch','Lesser sciatic notch',2,'Becomes the lesser sciatic foramen with the sacrotuberous ligament. Obturator internus tendon leaves and the pudendal nerve and internal pudendal vessels re-enter the perineum here.');
L('hb.ischialTub','Ischial tuberosity',1,'What you sit on: palpable in the buttock. Origin of the hamstrings and the hamstring part of adductor magnus; sacrotuberous ligament attaches. Avulsion fractures in sprinters and hurdlers.');
L('hb.ischialRamus','Ischial ramus',3,'Joins the inferior pubic ramus to form the side of the pubic arch. Adductor magnus and obturator externus arise from it.');
L('hb.acetabulum','Acetabulum',1,'Deep socket formed by all three bones of the hip bone, facing out, forwards and down. Its horseshoe-shaped lunate surface carries the load; the notch below is bridged by the transverse ligament.');
L('hb.obtForamen','Obturator foramen',1,'Large opening closed by the obturator membrane except for the obturator canal (obturator nerve and vessels to the medial thigh). Obturator externus arises from its outer surface, obturator internus from its inner surface.');
L('hb.supRamus','Superior pubic ramus',2,'Upper border of the obturator foramen; carries the pecten. Fractures here are common in older people after a fall (check if hip X-ray is normal but they cannot weight-bear).');
L('hb.infRamus','Inferior pubic ramus',2,'Runs down and back to the ischial ramus. Adductor brevis, adductor magnus and gracilis arise here.');
L('hb.pubicBody','Body of pubis (front)',2,'Adductor longus arises from the angle between the crest and the symphysis; its tendon is the cord you feel in the groin when you adduct against resistance.');
L('hb.pubicTub','Pubic tubercle',1,'Palpable at the lateral end of the pubic crest: medial attachment of the inguinal ligament. Inguinal hernias emerge above and medial to it; femoral hernias lie below and lateral.');
L('hb.pubicCrest','Pubic crest',2,'Upper border of the pubic body: rectus abdominis and pyramidalis attach.');
L('hb.pubicSym','Pubic symphysis',1,'Secondary cartilaginous joint between the pubic bodies. Widens in pregnancy; diastasis can follow an open-book pelvic fracture.');
L('hb.pubicBodyPost','Back of the pubic body',3,'Origin of puborectalis and pubococcygeus, the front parts of levator ani.');
L('hb.tendArch','Tendinous arch of levator ani',3,'Thickening of the obturator internus fascia from the pubis to the ischial spine; iliococcygeus arises from it.');
L('pe.brim','Pelvic brim (inlet)',1,'Sacral promontory, alae, arcuate lines, pectineal lines, pubic crests and the top of the symphysis. Above it is the false (greater) pelvis, part of the abdomen; below it the true (lesser) pelvis and birth canal.');
L('pe.arch','Pubic arch',1,'Formed by the inferior pubic and ischial rami of both sides. Wide (about 80–90°) in females, narrow (50–60°) in males.');
L('pe.sij','Sacroiliac joint',2,'Synovial joint between the auricular surfaces, bound by the strongest ligaments in the body. A pelvic fracture often disrupts it as a second break in the ring.');
L('sa.promontory','Sacral promontory',1,'Projecting front edge of S1: the back of the pelvic brim. The obstetric conjugate is measured from here to the back of the symphysis.');
L('sa.ala','Ala of sacrum',2,'Wing-like lateral part of S1 on each side of the promontory; part of the pelvic brim. The lumbosacral trunk crosses it.');
L('sa.antForamina','Anterior sacral foramina',2,'Four pairs carrying the anterior rami of S1–S4 into the sacral plexus. Piriformis arises from the bone between them.');
L('sa.medianCrest','Median sacral crest',2,'Fused spinous processes of the sacrum, palpable in the natal cleft above the coccyx.');
L('sa.postForamina','Posterior sacral foramina',3,'Carry the posterior rami of S1–S4.');
L('sa.hiatus','Sacral hiatus',1,'Gap at the lower end of the sacral canal where the S5 laminae fail to fuse. Entry point for a caudal epidural, found between the sacral cornua.');
L('sa.cornua','Sacral cornua',2,'Two small horns either side of the hiatus, palpable above the natal cleft: the landmarks for finding the hiatus.');
L('sa.dorsal','Dorsal surface of sacrum',3,'Gluteus maximus and erector spinae arise from it.');
L('sa.coccyx','Coccyx',2,'Three to five fused segments. Coccygeus and levator ani (via the anococcygeal body) attach. Bruised or fractured falling onto the bottom.');

/* ---------------- femur ---------------- */
L('fe.head','Head of femur',1,'Two-thirds of a sphere. Most of its blood comes from the medial circumflex femoral artery via retinacular vessels up the neck, so displaced intracapsular neck fractures risk avascular necrosis.');
L('fe.fovea','Fovea capitis',3,'Pit for the ligament of the head, which carries a small artery (important in children).');
L('fe.neck','Neck of femur',1,'Joins head to shaft at about 125°. Neck of femur fracture in an older person after a fall: shortened, externally rotated leg. Intracapsular fractures threaten the head\'s blood supply.');
L('fe.gTroch','Greater trochanter',1,'Palpable on the side of the hip, a hand\'s breadth below the iliac crest. The hip abductors and lateral rotators insert here: gluteus medius and minimus, piriformis, obturator internus and the gemelli. Trochanteric bursitis causes lateral hip pain.');
L('fe.trochFossa','Trochanteric fossa',3,'Pit on the medial side of the greater trochanter: obturator externus inserts here.');
L('fe.lTroch','Lesser trochanter',1,'Posteromedial bump below the neck: iliopsoas inserts here, the main hip flexor. Isolated avulsion in an adult suggests a tumour.');
L('fe.itLine','Intertrochanteric line',2,'Front ridge between the trochanters: attachment of the hip capsule and iliofemoral ligament. The upper ends of vastus lateralis and medialis arise from it.');
L('fe.itCrest','Intertrochanteric crest',3,'Back ridge between the trochanters, with the quadrate tubercle.');
L('fe.quadTub','Quadrate tubercle',3,'On the intertrochanteric crest: quadratus femoris inserts here.');
L('fe.glutTub','Gluteal tuberosity',2,'Rough ridge on the upper lateral back of the shaft: insertion of the deep part of gluteus maximus.');
L('fe.pectLine','Pectineal line (spiral line region)',3,'Below the lesser trochanter: pectineus and part of adductor brevis insert here.');
L('fe.lineaAspera','Linea aspera',1,'Rough double ridge down the back of the shaft: the attachment for the adductors (insertion), vastus lateralis and medialis (origin) and the short head of biceps femoris. Feeding arteries from the profunda enter here, so shaft fractures can bleed 1–1.5 litres.');
L('fe.latSupra','Lateral supracondylar line',3,'Origin of plantaris and the lateral head of gastrocnemius just above it.');
L('fe.medSupra','Medial supracondylar line',3,'Adductor magnus attaches along it down to the adductor tubercle.');
L('fe.adductorTub','Adductor tubercle',1,'Palpable bump at the top of the medial condyle: insertion of the hamstring part of adductor magnus. The femoral artery passes through the adductor hiatus just above it to become the popliteal artery.');
L('fe.poplSurf','Popliteal surface',3,'Flat triangle on the back above the condyles: floor of the popliteal fossa where the popliteal artery lies on bone (at risk in supracondylar fractures).');
L('fe.aboveMedCond','Above the medial condyle (back)',3,'Origin of the medial head of gastrocnemius.');
L('fe.latCondyle','Lateral condyle',2,'Lateral head of gastrocnemius arises above it; popliteus arises from a groove on its side.');
L('fe.medCondyle','Medial condyle',2,'Larger and lower than the lateral condyle, keeping the knees under the body.');
L('fe.latEpi','Lateral epicondyle',2,'Attachment of the lateral (fibular) collateral ligament.');
L('fe.medEpi','Medial epicondyle',2,'Attachment of the medial collateral ligament, injured in valgus knee strains.');
L('fe.intercond','Intercondylar fossa',2,'Notch between the condyles at the back: the ACL attaches to its lateral wall, the PCL to its medial wall.');
L('fe.patSurf','Patellar surface',2,'Groove at the front for the patella. A shallow groove predisposes to lateral patellar dislocation.');
L('fe.antShaft','Anterior and lateral shaft',3,'Origin of vastus intermedius.');

/* ---------------- tibia ---------------- */
L('ti.medCond','Medial condyle',2,'Larger tibial plateau half; the medial meniscus is fixed to it and to the MCL, so it tears more often.');
L('ti.medCondPost','Back of the medial condyle',3,'Groove for the insertion of semimembranosus.');
L('ti.latCond','Lateral condyle',2,'Extensor digitorum longus arises from it. Lateral plateau fractures follow a blow to the outside of the knee (bumper fracture).');
L('ti.eminence','Intercondylar eminence',2,'Raised area between the plateaus with the tibial spines; the cruciate ligaments and menisci attach around it.');
L('ti.tub','Tibial tuberosity',1,'Palpable bump below the patella: the quadriceps insert here through the patellar ligament. Painful and enlarged in adolescents with Osgood-Schlatter disease. Site for intraosseous access in children.');
L('ti.gerdy','Gerdy\'s tubercle',2,'Anterolateral bump where the iliotibial tract inserts.');
L('ti.pes','Pes anserinus (upper medial surface)',1,'Goose\'s foot: sartorius, gracilis and semitendinosus insert in a line, front to back ("Say Grace before Tea"). A bursa here causes medial knee pain.');
L('ti.antBorder','Anterior border (shin)',1,'Sharp subcutaneous edge you can feel down the front of the leg. Open fractures are common here because there is no muscle cover.');
L('ti.medSurface','Medial surface',1,'Subcutaneous: the great saphenous vein crosses its lower end. Little soft-tissue cover, so fractures are often open and heal slowly.');
L('ti.latSurface','Lateral surface (upper two-thirds)',2,'Origin of tibialis anterior, the bulky muscle beside the shin.');
L('ti.soleal','Soleal line',2,'Oblique ridge on the upper back: origin of soleus.');
L('ti.poplArea','Posterior surface above the soleal line',3,'Insertion of popliteus.');
L('ti.postLat','Posterior surface, lateral part',3,'Origin of tibialis posterior (with the interosseous membrane and fibula).');
L('ti.postMed','Posterior surface, medial part',3,'Origin of flexor digitorum longus.');
L('ti.medMall','Medial malleolus',1,'Palpable inner ankle bone; the great saphenous vein runs just in front of it (cut-down site). Tenderness of its posterior edge is an Ottawa ankle rule criterion.');
L('ti.mallGroove','Groove behind the medial malleolus',3,'Carries the tibialis posterior tendon. "Tom, Dick And Very Nervous Harry" pass behind the malleolus.');

/* ---------------- fibula ---------------- */
L('fi.head','Head of fibula',1,'Palpable below the lateral side of the knee: biceps femoris inserts here, with the lateral collateral ligament. Soleus and fibularis longus arise from it.');
L('fi.neck','Neck of fibula',1,'The common fibular nerve winds round it, just under the skin: fractures, tight casts or crossing the legs can cause foot drop.');
L('fi.latSurface','Lateral surface',2,'Origins of fibularis longus (upper two-thirds) and fibularis brevis (lower two-thirds).');
L('fi.antSurface','Anterior (extensor) surface',3,'Narrow strip: extensor digitorum longus, extensor hallucis longus and fibularis tertius arise here.');
L('fi.postUpper','Posterior surface, upper part',3,'Soleus and tibialis posterior arise here.');
L('fi.postLower','Posterior surface, lower two-thirds',3,'Origin of flexor hallucis longus.');
L('fi.latMall','Lateral malleolus',1,'Lower and further back than the medial malleolus. Tenderness of its posterior edge or tip is an Ottawa ankle rule criterion; the lateral ligament complex (ATFL most often torn) attaches here.');

/* ---------------- foot ---------------- */
L('ft.calcTub','Calcaneal tuberosity',1,'Back of the heel: the Achilles tendon (gastrocnemius, soleus, plantaris) inserts here. The plantar fascia and the short muscles of the sole arise from its underside.');
L('ft.calcDorsal','Dorsolateral calcaneus',3,'Origin of extensor digitorum brevis, the soft bump on the outer dorsum of the foot.');
L('ft.talus','Talus',2,'No muscle attachments at all. Its body is held in the ankle mortise; blood enters mainly through the neck, so neck fractures risk avascular necrosis.');
L('ft.navTub','Navicular tuberosity',1,'Palpable on the medial foot: main insertion of tibialis posterior. Tenderness here is an Ottawa foot rule criterion.');
L('ft.medCun','Medial cuneiform',2,'Tibialis anterior and fibularis longus both insert on it and the 1st metatarsal base, forming a stirrup under the medial arch.');
L('ft.mt1Base','Base of 1st metatarsal',2,'Shares the tibialis anterior and fibularis longus insertions with the medial cuneiform.');
L('ft.mt5Tub','Tuberosity of 5th metatarsal',1,'Palpable on the outer border of the foot: fibularis brevis inserts (fibularis tertius just beyond). Avulsed in inversion injuries; tenderness here is an Ottawa foot rule criterion.');
L('ft.halluxProx','Proximal phalanx of hallux',3,'Abductor hallucis, flexor hallucis brevis and extensor hallucis brevis insert here.');
L('ft.halluxDistal','Distal phalanx of hallux',2,'Top: extensor hallucis longus (L5 test). Underneath: flexor hallucis longus.');
L('ft.toeMid','Middle phalanges of toes 2–5',3,'Underneath: flexor digitorum brevis. Top: extensor digitorum longus through its expansions.');
L('ft.toeDistal','Distal phalanges of toes 2–5',3,'Underneath: flexor digitorum longus. Top: extensor digitorum longus.');
L('ft.littleProx','Proximal phalanx of little toe',3,'Abductor digiti minimi inserts here.');

/* ================= compartments ================= */
const COMP = {
 'ul-pect':{reg:'ul',n:'Pectoral group',nv:'Medial and lateral pectoral nerves; long thoracic for serratus',art:'Thoracoacromial and lateral thoracic arteries',job:'Pull the arm forwards and across; hold the scapula on the chest wall',c:'--sys-cvs'},
 'ul-back':{reg:'ul',n:'Superficial back group',nv:'Accessory nerve, dorsal scapular and thoracodorsal nerves',art:'Transverse cervical, dorsal scapular and thoracodorsal arteries',job:'Move and steady the scapula; latissimus pulls the arm down and back',c:'--sys-endo'},
 'ul-cuff':{reg:'ul',n:'Shoulder: deltoid and rotator cuff',nv:'Axillary, suprascapular and subscapular nerves (C5–6)',art:'Suprascapular, circumflex humeral and subscapular arteries',job:'Abduct and rotate the arm; the cuff holds the humeral head in the glenoid',c:'--sys-musc'},
 'ul-armA':{reg:'ul',n:'Arm: anterior compartment',nv:'Musculocutaneous nerve (C5–6)',art:'Brachial artery',job:'Flex the elbow (biceps also supinates)',c:'--sys-gi'},
 'ul-armP':{reg:'ul',n:'Arm: posterior compartment',nv:'Radial nerve (C6–8)',art:'Profunda brachii artery',job:'Extend the elbow',c:'--sys-resp'},
 'ul-faA':{reg:'ul',n:'Forearm: anterior (flexor) compartment',nv:'Median nerve, except FCU and the medial half of FDP (ulnar)',art:'Radial, ulnar and anterior interosseous arteries',job:'Flex the wrist and fingers; pronate',c:'--sys-repro'},
 'ul-faP':{reg:'ul',n:'Forearm: posterior (extensor) compartment',nv:'Radial nerve and its posterior interosseous branch',art:'Posterior interosseous and radial arteries',job:'Extend the wrist and fingers; supinate',c:'--sys-lymph'},
 'ul-hand':{reg:'ul',n:'Intrinsic hand muscles',nv:'Ulnar nerve, except "LOAF" (median): lateral 2 lumbricals, opponens, abductor and flexor pollicis brevis',art:'Superficial and deep palmar arches',job:'Fine movements of the thumb and fingers',c:'--sys-nerv'},
 'll-hip':{reg:'ll',n:'Iliopsoas (hip flexors)',nv:'Femoral nerve and anterior rami L1–3',art:'Lumbar and iliolumbar arteries',job:'Flex the hip',c:'--sys-renal'},
 'll-glut':{reg:'ll',n:'Gluteal region',nv:'Superior and inferior gluteal nerves; small nerves to the deep rotators',art:'Superior and inferior gluteal arteries',job:'Extend, abduct and rotate the hip; keep the pelvis level when walking',c:'--sys-endo'},
 'll-thA':{reg:'ll',n:'Thigh: anterior compartment',nv:'Femoral nerve (L2–4)',art:'Femoral artery and lateral circumflex femoral',job:'Extend the knee; rectus femoris and sartorius also flex the hip',c:'--sys-gi'},
 'll-thM':{reg:'ll',n:'Thigh: medial compartment',nv:'Obturator nerve (L2–4)',art:'Obturator artery and profunda femoris',job:'Adduct the hip',c:'--sys-repro'},
 'll-thP':{reg:'ll',n:'Thigh: posterior compartment (hamstrings)',nv:'Sciatic nerve: tibial division (short head of biceps: common fibular)',art:'Perforating branches of profunda femoris',job:'Flex the knee and extend the hip',c:'--sys-resp'},
 'll-legA':{reg:'ll',n:'Leg: anterior compartment',nv:'Deep fibular nerve (L4–5)',art:'Anterior tibial artery',job:'Dorsiflex the ankle and extend the toes',c:'--sys-lymph'},
 'll-legL':{reg:'ll',n:'Leg: lateral compartment',nv:'Superficial fibular nerve (L5–S1)',art:'Fibular artery (and anterior tibial)',job:'Evert the foot',c:'--sys-nerv'},
 'll-legPs':{reg:'ll',n:'Leg: posterior compartment, superficial',nv:'Tibial nerve (S1–2)',art:'Sural arteries and posterior tibial artery',job:'Plantarflex the ankle (calf raise, push-off)',c:'--sys-cvs'},
 'll-legPd':{reg:'ll',n:'Leg: posterior compartment, deep',nv:'Tibial nerve',art:'Posterior tibial and fibular arteries',job:'Plantarflex, invert and flex the toes; popliteus unlocks the knee',c:'--sys-musc'},
 'll-foot':{reg:'ll',n:'Foot',nv:'Deep fibular (dorsum); medial and lateral plantar (sole)',art:'Dorsalis pedis; medial and lateral plantar arteries',job:'Support the arches and fine-tune toe movement',c:'--sys-skin'},
 'pv-floor':{reg:'pv',n:'Pelvic floor (pelvic diaphragm)',nv:'Nerve to levator ani (S4) and pudendal nerve (S2–4)',art:'Inferior gluteal, internal pudendal and inferior vesical arteries',job:'Hold up the pelvic organs; keep urinary and faecal continence',c:'--sys-repro'},
 'pv-trunk':{reg:'pv',n:'Trunk muscles on the pelvis',nv:'Thoracoabdominal (T7–11), subcostal and L1 nerves',art:'Epigastric, deep circumflex iliac and lumbar arteries',job:'Flex and steady the trunk; protect the abdomen',c:'--sys-gi'}
};

/* ================= muscles =================
   [id, name, comp, origin text, origin landmarks, insertion text, insertion landmarks, nerve, roots, action, blood supply, link/clinical] */
const RAW = [
/* pectoral */
['pecmaj','Pectoralis major','ul-pect','Clavicular head: medial half of the clavicle. Sternocostal head: sternum and upper six costal cartilages',['cl.pecmaj'],'Lateral lip of the intertubercular groove',['hu.latLip'],'Lateral and medial pectoral','C5–T1','Adducts and medially rotates the arm; the clavicular head flexes it','Pectoral branch of the thoracoacromial artery','Its lower edge is the anterior axillary fold.'],
['pecmin','Pectoralis minor','ul-pect','Ribs 3–5 near their costal cartilages',[],'Coracoid process',['sc.coracoid'],'Medial pectoral','C8–T1','Pulls the scapula forwards and down','Thoracoacromial and lateral thoracic arteries','It divides the axillary artery into three parts (one branch, two branches, three branches).'],
['subclavius','Subclavius','ul-pect','First rib and its costal cartilage',[],'Subclavian groove on the underside of the clavicle',['cl.subGroove'],'Nerve to subclavius','C5–6','Anchors and depresses the clavicle','Clavicular branch of the thoracoacromial artery','Cushions the subclavian vessels if the clavicle breaks.'],
['serrant','Serratus anterior','ul-pect','Outer surfaces of ribs 1–8',[],'Costal surface of the medial border of the scapula',['sc.medBorderCostal'],'Long thoracic','C5–7','Protracts the scapula (punching) and rotates it upwards; holds it against the chest wall','Lateral thoracic and thoracodorsal arteries','Long thoracic nerve injury (axillary surgery, carrying heavy loads) gives a winged scapula when pushing against a wall. "C5, 6, 7 raise your wings to heaven".'],
/* back */
['trap','Trapezius','ul-back','Occipital bone, ligamentum nuchae, spines of C7–T12',[],'Lateral third of the clavicle, acromion and spine of the scapula',['cl.trap','sc.acromion','sc.spine'],'Accessory nerve (CN XI)','CN XI (C3–4 sensory)','Upper fibres elevate (shrug), middle retract, lower depress the scapula; upper and lower fibres together rotate it upwards','Transverse cervical artery','It inserts on exactly the bony line where deltoid arises: the two muscles continue each other across the shoulder.'],
['latdorsi','Latissimus dorsi','ul-back','Spines of T7–T12, thoracolumbar fascia, iliac crest, lower 3–4 ribs and a slip from the inferior angle',['hb.iliacCrest','sc.infAngle'],'Floor of the intertubercular groove',['hu.itGroove'],'Thoracodorsal','C6–8','Extends, adducts and medially rotates the arm (climbing, swimming, pulling)','Thoracodorsal artery','Forms the posterior axillary fold with teres major. Used as a flap in breast reconstruction.'],
['levscap','Levator scapulae','ul-back','Transverse processes of C1–C4',[],'Medial border from the superior angle to the root of the spine',['sc.supAngle'],'Dorsal scapular and C3–4','C3–5','Elevates the scapula and tilts the glenoid down','Dorsal scapular artery','A common source of neck and shoulder knots.'],
['rhmin','Rhomboid minor','ul-back','Spines of C7–T1',[],'Medial border at the root of the spine',['sc.rootSpine'],'Dorsal scapular','C4–5','Retracts and steadies the scapula','Dorsal scapular artery','Squeeze your shoulder blades together to feel the rhomboids.'],
['rhmaj','Rhomboid major','ul-back','Spines of T2–T5',[],'Medial border below the spine to the inferior angle',['sc.medBorderLow'],'Dorsal scapular','C4–5','Retracts the scapula and rotates the glenoid down','Dorsal scapular artery','Paired with serratus anterior: rhomboids pull the medial border in, serratus pulls it forwards.'],
/* shoulder */
['deltoid','Deltoid','ul-cuff','Lateral third of the clavicle, acromion and spine of the scapula',['cl.delt','sc.acromion','sc.spine'],'Deltoid tuberosity of the humerus',['hu.deltTub'],'Axillary','C5–6','Middle fibres abduct (about 15–90°); anterior fibres flex and medially rotate; posterior fibres extend and laterally rotate','Posterior circumflex humeral artery and deltoid branch of the thoracoacromial','Axillary nerve injury (surgical neck fracture, shoulder dislocation): flat shoulder and numb "regimental badge" patch.'],
['supra','Supraspinatus','ul-cuff','Supraspinous fossa',['sc.supraFossa'],'Top facet of the greater tubercle',['hu.gTub'],'Suprascapular','C5–6','Starts abduction (first 15°); holds the humeral head in the glenoid','Suprascapular artery','The most commonly torn cuff tendon; it is pinched under the acromion between 60° and 120° of abduction (painful arc).'],
['infra','Infraspinatus','ul-cuff','Infraspinous fossa',['sc.infraFossa'],'Middle facet of the greater tubercle',['hu.gTub'],'Suprascapular','C5–6','Laterally rotates the arm; holds the head in place','Suprascapular and circumflex scapular arteries','Test lateral rotation against resistance with the elbow at the side.'],
['tmin','Teres minor','ul-cuff','Upper two-thirds of the lateral border (back)',['sc.latBorder'],'Bottom facet of the greater tubercle',['hu.gTub'],'Axillary','C5–6','Laterally rotates the arm','Circumflex scapular and posterior circumflex humeral arteries','Rotator cuff = SITS: Supraspinatus, Infraspinatus, Teres minor on the greater tubercle; Subscapularis on the lesser.'],
['subscap','Subscapularis','ul-cuff','Subscapular fossa',['sc.subFossa'],'Lesser tubercle',['hu.lTub'],'Upper and lower subscapular','C5–6','Medially rotates the arm; holds the head in place','Subscapular artery','The only cuff muscle on the front. Lift-off test: hand behind the back, push away.'],
['tmaj','Teres major','ul-cuff','Back of the inferior angle of the scapula',['sc.infAngle'],'Medial lip of the intertubercular groove',['hu.medLip'],'Lower subscapular','C5–6','Adducts, medially rotates and extends the arm','Circumflex scapular and thoracodorsal arteries','Not a cuff muscle: it inserts on the front of the humerus with latissimus dorsi. It forms the lower border of the quadrangular and triangular spaces.'],
/* arm */
['biceps','Biceps brachii','ul-armA','Long head: supraglenoid tubercle. Short head: coracoid process',['sc.supraglen','sc.coracoid'],'Radial tuberosity and, through the bicipital aponeurosis, the forearm fascia',['ra.tub'],'Musculocutaneous','C5–6','Supinates the forearm (strongest with the elbow bent), flexes the elbow, weakly flexes the shoulder','Muscular branches of the brachial artery','Biceps reflex tests C5–6. A ruptured long head gives the "Popeye" bulge.'],
['brachialis','Brachialis','ul-armA','Lower half of the anterior humerus',['hu.antDistal'],'Coronoid process and ulnar tuberosity',['ul.coronoid','ul.tub'],'Musculocutaneous (small part radial)','C5–6','Flexes the elbow in every forearm position: the workhorse flexor','Brachial artery and radial recurrent artery','Lies under biceps on the front of the elbow capsule.'],
['coracob','Coracobrachialis','ul-armA','Coracoid process',['sc.coracoid'],'Middle of the medial humerus',['hu.medShaft'],'Musculocutaneous','C5–7','Flexes and adducts the arm','Brachial artery','The musculocutaneous nerve pierces it, a useful landmark in the axilla.'],
['triceps','Triceps brachii','ul-armP','Long head: infraglenoid tubercle. Lateral head: posterior humerus above the radial groove. Medial head: below the groove',['sc.infraglen','hu.postUpper','hu.postLower'],'Olecranon',['ul.olecranon'],'Radial','C6–8 (mainly C7)','Extends the elbow; the long head also extends and adducts the shoulder','Profunda brachii and superior ulnar collateral arteries','Triceps reflex tests C7. The radial nerve runs in the groove between the lateral and medial head origins.'],
['anconeus','Anconeus','ul-armP','Back of the lateral epicondyle',['hu.latEpi'],'Lateral olecranon and upper posterior ulna',['ul.anconeus'],'Radial','C7–8','Helps extend the elbow and steadies it during pronation','Middle collateral and recurrent interosseous arteries','A small triangle continuing triceps below the elbow.'],
/* forearm anterior */
['pt','Pronator teres','ul-faA','Humeral head: medial epicondyle. Ulnar head: coronoid process',['hu.medEpi','ul.coronoid'],'Middle of the lateral surface of the radius',['ra.midLat'],'Median','C6–7','Pronates the forearm; helps flex the elbow','Anterior ulnar recurrent and radial arteries','The median nerve passes between its two heads (pronator syndrome). Forms the medial border of the cubital fossa.'],
['fcr','Flexor carpi radialis','ul-faA','Medial epicondyle (common flexor origin)',['hu.medEpi'],'Bases of the 2nd and 3rd metacarpals (front)',['ha.mc2Base'],'Median','C6–7','Flexes and abducts the wrist','Radial artery','Its tendon is a guide to the radial artery at the wrist, which lies just lateral to it.'],
['pl','Palmaris longus','ul-faA','Medial epicondyle',['hu.medEpi'],'Flexor retinaculum and palmar aponeurosis',[],'Median','C7–8','Flexes the wrist; tenses the palmar fascia','Ulnar artery','Absent in about 1 in 7 people. The median nerve lies just deep and lateral to its tendon at the wrist.'],
['fcu','Flexor carpi ulnaris','ul-faA','Humeral head: medial epicondyle. Ulnar head: olecranon and posterior border of the ulna',['hu.medEpi','ul.olecranon','ul.postBorder'],'Pisiform, then hook of hamate and base of the 5th metacarpal through ligaments',['ha.pisiform','ha.hookHamate','ha.mc5Base'],'Ulnar','C7–T1','Flexes and adducts the wrist','Ulnar artery (posterior ulnar recurrent)','The ulnar nerve enters the forearm between its two heads (cubital tunnel).'],
['fds','Flexor digitorum superficialis','ul-faA','Humero-ulnar head: medial epicondyle and coronoid process. Radial head: upper anterior radius',['hu.medEpi','ul.coronoid','ra.oblique'],'Sides of the middle phalanges of fingers 2–5',['ha.midPhal'],'Median','C8–T1','Flexes the PIP joints (and MCP joints and wrist)','Ulnar and radial arteries','Test: hold the other fingers straight and ask the patient to bend one finger at the PIP joint.'],
['fdp','Flexor digitorum profundus','ul-faA','Anterior and medial ulna and interosseous membrane',['ul.antShaft'],'Distal phalanges of fingers 2–5',['ha.distPhal'],'Lateral half: anterior interosseous (median). Medial half: ulnar','C8–T1','Flexes the DIP joints: the only muscle that bends the fingertips','Ulnar and anterior interosseous arteries','Split nerve supply: a high ulnar lesion weakens fingertip flexion of the ring and little fingers.'],
['fpl','Flexor pollicis longus','ul-faA','Anterior radius and interosseous membrane',['ra.antShaft'],'Distal phalanx of the thumb',['ha.thumbDistal'],'Anterior interosseous (median)','C8–T1','Flexes the thumb IP joint','Anterior interosseous artery','AIN palsy: cannot make an "OK" sign (FPL and index FDP weak).'],
['pq','Pronator quadratus','ul-faA','Distal anterior ulna',['ul.distAnt'],'Distal anterior radius',['ra.distAnt'],'Anterior interosseous (median)','C8–T1','Pronates the forearm (the main pronator); holds the distal radius and ulna together','Anterior interosseous artery','The deepest muscle at the front of the wrist.'],
/* forearm posterior */
['br','Brachioradialis','ul-faP','Upper lateral supracondylar ridge',['hu.latSupra'],'Lateral distal radius just above the styloid',['ra.styloid'],'Radial','C5–6','Flexes the elbow, strongest with the forearm mid-prone (beer-drinking position)','Radial recurrent artery','The exception: a posterior compartment muscle (radial nerve) that flexes the elbow. Supinator (brachioradialis) reflex tests C6.'],
['ecrl','Extensor carpi radialis longus','ul-faP','Lower lateral supracondylar ridge',['hu.latSupra'],'Base of the 2nd metacarpal (back)',['ha.mc2Base'],'Radial','C6–7','Extends and abducts the wrist','Radial artery','Holds the wrist extended so the finger flexors can grip.'],
['ecrb','Extensor carpi radialis brevis','ul-faP','Lateral epicondyle (common extensor origin)',['hu.latEpi'],'Base of the 3rd metacarpal (back)',['ha.mc3Base'],'Deep branch of the radial nerve','C7–8','Extends and abducts the wrist','Radial artery','Tennis elbow mainly affects the ECRB origin.'],
['ed','Extensor digitorum','ul-faP','Lateral epicondyle',['hu.latEpi'],'Extensor expansions of fingers 2–5 (to middle and distal phalanges)',['ha.extExp','ha.midPhal','ha.distPhal'],'Posterior interosseous','C7–8','Extends the fingers and the wrist','Posterior interosseous artery','Radial nerve palsy causes wrist and finger drop.'],
['edm','Extensor digiti minimi','ul-faP','Lateral epicondyle',['hu.latEpi'],'Extensor expansion of the little finger',['ha.extExp'],'Posterior interosseous','C7–8','Extends the little finger','Posterior interosseous artery','Lets you raise your little finger on its own.'],
['ecu','Extensor carpi ulnaris','ul-faP','Lateral epicondyle and posterior border of the ulna',['hu.latEpi','ul.postBorder'],'Base of the 5th metacarpal (back)',['ha.mc5Base'],'Posterior interosseous','C7–8','Extends and adducts the wrist','Posterior interosseous and ulnar arteries','With FCU it adducts the wrist: the ulnar pair.'],
['supinator','Supinator','ul-faP','Lateral epicondyle, collateral and annular ligaments, supinator crest of the ulna',['hu.latEpi','ul.supCrest'],'Upper lateral radius, wrapping round the neck',['ra.neck'],'Posterior interosseous','C5–6','Supinates the forearm, especially with the elbow straight','Radial recurrent and recurrent interosseous arteries','The posterior interosseous nerve passes through it (arcade of Frohse), a site of entrapment.'],
['apl','Abductor pollicis longus','ul-faP','Posterior ulna, radius and interosseous membrane',['ul.postShaft','ra.postShaft'],'Base of the 1st metacarpal',['ha.mc1Base'],'Posterior interosseous','C7–8','Abducts and extends the thumb at the carpometacarpal joint','Posterior interosseous artery','APL and EPB form the lateral border of the anatomical snuffbox; their shared sheath inflames in de Quervain\'s tenosynovitis.'],
['epb','Extensor pollicis brevis','ul-faP','Posterior radius',['ra.postShaft'],'Base of the proximal phalanx of the thumb',['ha.thumbProx'],'Posterior interosseous','C7–8','Extends the thumb MCP joint','Posterior interosseous artery','Lateral border of the snuffbox with APL.'],
['epl','Extensor pollicis longus','ul-faP','Posterior ulna',['ul.postShaft'],'Distal phalanx of the thumb',['ha.thumbDistal'],'Posterior interosseous','C7–8','Extends the thumb IP joint','Posterior interosseous artery','Hooks round Lister\'s tubercle; forms the medial border of the snuffbox. Can rupture after a distal radius fracture.'],
['ei','Extensor indicis','ul-faP','Posterior ulna',['ul.postShaft'],'Extensor expansion of the index finger',['ha.extExp'],'Posterior interosseous','C7–8','Extends the index finger (pointing)','Posterior interosseous artery','Lets you point with the index finger alone.'],
/* hand */
['apb','Abductor pollicis brevis','ul-hand','Flexor retinaculum and tubercles of the scaphoid and trapezium',['ha.scaphoid','ha.trapezium'],'Lateral base of the proximal phalanx of the thumb',['ha.thumbProx'],'Recurrent branch of the median','T1 (C8–T1)','Abducts the thumb (points it to the ceiling)','Superficial palmar branch of the radial artery','Best test for the median nerve at the wrist: wasted in carpal tunnel syndrome.'],
['fpb','Flexor pollicis brevis','ul-hand','Flexor retinaculum and trapezium',['ha.trapezium'],'Base of the proximal phalanx of the thumb',['ha.thumbProx'],'Recurrent branch of the median (deep head: ulnar)','C8–T1','Flexes the thumb MCP joint','Superficial palmar branch of the radial artery','Thenar muscles: abductor, flexor and opponens pollicis.'],
['op','Opponens pollicis','ul-hand','Flexor retinaculum and trapezium',['ha.trapezium'],'Lateral shaft of the 1st metacarpal',['ha.mc1Shaft'],'Recurrent branch of the median','C8–T1','Opposes the thumb (touches the little finger)','Superficial palmar branch of the radial artery','Opposition is what makes the human hand a precision tool.'],
['addp','Adductor pollicis','ul-hand','Oblique head: capitate and bases of metacarpals 2–3. Transverse head: shaft of the 3rd metacarpal',['ha.capitate','ha.mcShafts'],'Medial base of the proximal phalanx of the thumb',['ha.thumbProx'],'Deep branch of the ulnar','C8–T1','Adducts the thumb (grips paper against the index finger)','Deep palmar arch','Froment\'s sign: with ulnar palsy the thumb IP flexes (FPL substitutes) when gripping paper.'],
['adm','Abductor digiti minimi','ul-hand','Pisiform',['ha.pisiform'],'Base of the proximal phalanx of the little finger',['ha.littleProx'],'Deep branch of the ulnar','C8–T1','Abducts the little finger','Ulnar artery','Hypothenar muscles: abductor, flexor and opponens digiti minimi, all ulnar.'],
['fdmb','Flexor digiti minimi brevis','ul-hand','Hook of hamate',['ha.hookHamate'],'Base of the proximal phalanx of the little finger',['ha.littleProx'],'Deep branch of the ulnar','C8–T1','Flexes the little finger MCP joint','Ulnar artery','Hook of hamate fractures can weaken it and irritate the ulnar nerve.'],
['odm','Opponens digiti minimi','ul-hand','Hook of hamate',['ha.hookHamate'],'Medial shaft of the 5th metacarpal',['ha.mc5Shaft'],'Deep branch of the ulnar','C8–T1','Cups the palm by bringing the 5th metacarpal forwards','Ulnar artery','Helps opposition from the little-finger side.'],
['lumb','Lumbricals','ul-hand','Tendons of flexor digitorum profundus (no bone origin)',[],'Radial side of the extensor expansions',['ha.extExp'],'1st and 2nd: median. 3rd and 4th: ulnar','C8–T1','Flex the MCP joints while extending the IP joints (the "tabletop" position)','Superficial and deep palmar arches','The only muscles that arise from tendons. Claw hand happens when they and the interossei are weak.'],
['dorsint','Dorsal interossei','ul-hand','Adjacent sides of two metacarpals (two heads)',['ha.mcShafts'],'Bases of the proximal phalanges and extensor expansions',['ha.extExp'],'Deep branch of the ulnar','C8–T1 (T1)','Abduct the fingers from the middle finger: DAB (Dorsal ABduct)','Dorsal metacarpal arteries and deep palmar arch','Test T1 and the ulnar nerve: spread the fingers against resistance. First dorsal interosseous wastes visibly in ulnar palsy.'],
['palmint','Palmar interossei','ul-hand','Palmar surfaces of metacarpals 2, 4 and 5',['ha.mcShafts'],'Extensor expansions',['ha.extExp'],'Deep branch of the ulnar','C8–T1','Adduct the fingers towards the middle finger: PAD (Palmar ADduct)','Palmar metacarpal arteries','Card test: grip a card between straight fingers.'],
/* hip flexors */
['psoas','Psoas major','ll-hip','Bodies and transverse processes of T12–L5',[],'Lesser trochanter',['fe.lTroch'],'Anterior rami of L1–3','L1–3','Flexes the hip (with iliacus); flexes the trunk when the leg is fixed','Lumbar arteries','An inflamed appendix or psoas abscess makes hip extension painful (psoas sign).'],
['iliacus','Iliacus','ll-hip','Iliac fossa',['hb.iliacFossa'],'Lesser trochanter, with the psoas tendon',['fe.lTroch'],'Femoral','L2–3','Flexes the hip','Iliac branch of the iliolumbar artery and deep circumflex iliac','Iliacus and psoas share one tendon: iliopsoas, the strongest hip flexor (L2 myotome).'],
/* gluteal */
['gmax','Gluteus maximus','ll-glut','Posterior ilium behind the posterior gluteal line, back of sacrum and coccyx, sacrotuberous ligament',['hb.glutPost','sa.dorsal'],'Gluteal tuberosity and the iliotibial tract (to Gerdy\'s tubercle)',['fe.glutTub','ti.gerdy'],'Inferior gluteal','L5–S2','Extends and laterally rotates the hip: rising from sitting, climbing stairs','Superior and inferior gluteal arteries','Inject into the upper outer quadrant of the buttock to avoid the sciatic nerve (or use the ventrogluteal site).'],
['gmed','Gluteus medius','ll-glut','Gluteal surface between the anterior and posterior gluteal lines',['hb.glutMid'],'Lateral surface of the greater trochanter',['fe.gTroch'],'Superior gluteal','L4–S1','Abducts and medially rotates the hip; keeps the pelvis level when standing on one leg','Superior gluteal artery','Trendelenburg sign: superior gluteal nerve injury lets the pelvis drop on the opposite side when standing on the affected leg.'],
['gmin','Gluteus minimus','ll-glut','Gluteal surface between the anterior and inferior gluteal lines',['hb.glutLow'],'Anterior surface of the greater trochanter',['fe.gTroch'],'Superior gluteal','L4–S1','Abducts and medially rotates the hip','Superior gluteal artery','Works with gluteus medius: both from the outer ilium to the greater trochanter.'],
['tfl','Tensor fasciae latae','ll-glut','ASIS and the front of the outer lip of the iliac crest',['hb.asis'],'Iliotibial tract, which inserts on Gerdy\'s tubercle',['ti.gerdy'],'Superior gluteal','L4–S1','Abducts, medially rotates and flexes the hip; tenses the iliotibial tract to steady the knee','Superior gluteal and lateral circumflex femoral arteries','Iliotibial band syndrome: lateral knee pain in runners.'],
['piri','Piriformis','ll-glut','Front of the sacrum between the anterior sacral foramina',['sa.antForamina'],'Top of the greater trochanter',['fe.gTroch'],'Nerve to piriformis','S1–2','Laterally rotates the extended hip; abducts the flexed hip','Superior and inferior gluteal arteries','The key to the gluteal region: superior gluteal vessels and nerve pass above it; the sciatic nerve and everything else below.'],
['oi','Obturator internus','ll-glut','Inner surface of the obturator membrane and the surrounding bone',['hb.obtForamen'],'Medial surface of the greater trochanter',['fe.gTroch'],'Nerve to obturator internus','L5–S2','Laterally rotates the hip; steadies the head in the acetabulum','Internal pudendal and obturator arteries','Its tendon leaves the pelvis through the lesser sciatic foramen. Its fascia gives origin to levator ani.'],
['gsup','Superior gemellus','ll-glut','Ischial spine',['hb.ischialSpine'],'Medial greater trochanter with the obturator internus tendon',['fe.gTroch'],'Nerve to obturator internus','L5–S2','Laterally rotates the hip','Inferior gluteal artery','The gemelli ("twins") sandwich the obturator internus tendon.'],
['ginf','Inferior gemellus','ll-glut','Upper ischial tuberosity',['hb.ischialTub'],'Medial greater trochanter with the obturator internus tendon',['fe.gTroch'],'Nerve to quadratus femoris','L4–S1','Laterally rotates the hip','Inferior gluteal artery','Each gemellus shares a nerve with its neighbour: superior with obturator internus, inferior with quadratus femoris.'],
['qf','Quadratus femoris','ll-glut','Lateral border of the ischial tuberosity',['hb.ischialTub'],'Quadrate tubercle on the intertrochanteric crest',['fe.quadTub'],'Nerve to quadratus femoris','L4–S1','Laterally rotates the hip','Medial circumflex femoral artery','The medial circumflex femoral artery runs near it to the femoral neck.'],
/* thigh anterior */
['sart','Sartorius','ll-thA','ASIS',['hb.asis'],'Upper medial tibia (pes anserinus)',['ti.pes'],'Femoral','L2–3','Flexes, abducts and laterally rotates the hip and flexes the knee: sitting cross-legged','Muscular branches of the femoral artery','The longest muscle in the body; lateral border of the femoral triangle.'],
['rf','Rectus femoris','ll-thA','Straight head: AIIS. Reflected head: just above the acetabulum',['hb.aiis'],'Quadriceps tendon, patella and patellar ligament to the tibial tuberosity',['ti.tub'],'Femoral','L2–4','Extends the knee; flexes the hip (the only quadriceps muscle crossing the hip)','Descending branch of the lateral circumflex femoral artery','Kicking muscle. AIIS avulsion in adolescent footballers.'],
['vl','Vastus lateralis','ll-thA','Greater trochanter, upper intertrochanteric line and lateral lip of the linea aspera',['fe.gTroch','fe.itLine','fe.lineaAspera'],'Quadriceps tendon to the tibial tuberosity',['ti.tub'],'Femoral','L2–4','Extends the knee','Lateral circumflex femoral artery','Largest quadriceps muscle; intramuscular injection site in infants (anterolateral thigh).'],
['vm','Vastus medialis','ll-thA','Lower intertrochanteric line and medial lip of the linea aspera',['fe.itLine','fe.lineaAspera'],'Quadriceps tendon and medial patella to the tibial tuberosity',['ti.tub'],'Femoral','L2–4','Extends the knee; its lowest fibres (VMO) stop the patella sliding laterally','Femoral and profunda femoris arteries','Wastes quickly after knee injury; rehab targets it.'],
['vi','Vastus intermedius','ll-thA','Anterior and lateral surfaces of the femoral shaft',['fe.antShaft'],'Quadriceps tendon to the tibial tuberosity',['ti.tub'],'Femoral','L2–4','Extends the knee','Lateral circumflex femoral and profunda femoris arteries','Lies directly on the femur under rectus femoris. Knee reflex tests L3–4.'],
/* thigh medial */
['pect','Pectineus','ll-thM','Pecten pubis',['hb.pecten','hb.supRamus'],'Pectineal line of the femur',['fe.pectLine'],'Femoral (sometimes obturator too)','L2–3','Adducts and flexes the hip','Medial circumflex femoral and obturator arteries','A transition muscle: in the medial compartment but usually supplied by the femoral nerve. Floor of the femoral triangle.'],
['al','Adductor longus','ll-thM','Body of the pubis below the crest',['hb.pubicBody'],'Middle third of the linea aspera',['fe.lineaAspera'],'Obturator (anterior division)','L2–4','Adducts the hip','Profunda femoris and obturator arteries','Medial border of the femoral triangle; the classic groin strain.'],
['ab','Adductor brevis','ll-thM','Body and inferior ramus of the pubis',['hb.infRamus'],'Pectineal line and upper linea aspera',['fe.pectLine','fe.lineaAspera'],'Obturator','L2–4','Adducts the hip','Profunda femoris and obturator arteries','The obturator nerve splits round it: anterior division in front, posterior behind.'],
['am','Adductor magnus','ll-thM','Adductor part: inferior pubic ramus and ischial ramus. Hamstring part: ischial tuberosity',['hb.infRamus','hb.ischialRamus','hb.ischialTub'],'Adductor part: gluteal tuberosity, linea aspera and medial supracondylar line. Hamstring part: adductor tubercle',['fe.lineaAspera','fe.medSupra','fe.adductorTub'],'Adductor part: obturator. Hamstring part: tibial division of the sciatic','L2–4','Adducts the hip; the hamstring part also extends it','Profunda femoris and obturator arteries','Two muscles in one, with two nerves. The adductor hiatus in its tendon lets the femoral vessels into the popliteal fossa.'],
['gracilis','Gracilis','ll-thM','Body and inferior ramus of the pubis',['hb.infRamus'],'Upper medial tibia (pes anserinus)',['ti.pes'],'Obturator','L2–3','Adducts the hip and flexes the knee','Profunda femoris and obturator arteries','The only adductor that crosses the knee. A popular tendon graft.'],
['oe','Obturator externus','ll-thM','Outer surface of the obturator membrane and the surrounding bone',['hb.obtForamen'],'Trochanteric fossa',['fe.trochFossa'],'Obturator','L3–4','Laterally rotates the hip','Obturator and medial circumflex femoral arteries','A medial compartment muscle by nerve, a lateral rotator by action.'],
/* hamstrings */
['bf','Biceps femoris','ll-thP','Long head: ischial tuberosity. Short head: lateral lip of the linea aspera',['hb.ischialTub','fe.lineaAspera'],'Head of the fibula',['fi.head'],'Long head: tibial division. Short head: common fibular division','L5–S2','Flexes the knee and rotates it laterally; the long head extends the hip','Perforating branches of the profunda femoris','Follow its tendon down to find the common fibular nerve at the neck of the fibula.'],
['st','Semitendinosus','ll-thP','Ischial tuberosity',['hb.ischialTub'],'Upper medial tibia (pes anserinus)',['ti.pes'],'Tibial division of the sciatic','L5–S2','Flexes the knee, extends the hip, medially rotates the knee','Perforating branches of the profunda femoris','"Say Grace before Tea": Sartorius, Gracilis, semiTendinosus at the pes anserinus. Its tendon is harvested for ACL reconstruction.'],
['sm','Semimembranosus','ll-thP','Ischial tuberosity',['hb.ischialTub'],'Back of the medial tibial condyle',['ti.medCondPost'],'Tibial division of the sciatic','L5–S2','Flexes the knee, extends the hip, medially rotates the knee','Profunda femoris perforators and popliteal artery','A Baker\'s (popliteal) cyst usually arises from its bursa.'],
/* leg anterior */
['ta','Tibialis anterior','ll-legA','Upper two-thirds of the lateral tibia and interosseous membrane',['ti.latSurface'],'Medial cuneiform and base of the 1st metatarsal',['ft.medCun','ft.mt1Base'],'Deep fibular','L4–5','Dorsiflexes and inverts the foot','Anterior tibial artery','Tests L4. Weakness causes foot drop and a high-stepping gait.'],
['ehl','Extensor hallucis longus','ll-legA','Middle of the anterior fibula and interosseous membrane',['fi.antSurface'],'Base of the distal phalanx of the hallux',['ft.halluxDistal'],'Deep fibular','L5','Extends the big toe; dorsiflexes','Anterior tibial artery','Big toe extension against resistance is the best test of L5.'],
['edl','Extensor digitorum longus','ll-legA','Lateral tibial condyle and upper anterior fibula',['ti.latCond','fi.antSurface'],'Extensor expansions to the middle and distal phalanges of toes 2–5',['ft.toeMid','ft.toeDistal'],'Deep fibular','L5–S1','Extends the toes; dorsiflexes','Anterior tibial artery','Its tendons are easy to see on the dorsum when you lift your toes.'],
['ft3','Fibularis tertius','ll-legA','Lower anterior fibula',['fi.antSurface'],'Dorsum of the base of the 5th metatarsal',['ft.mt5Tub'],'Deep fibular','L5–S1','Dorsiflexes and everts the foot','Anterior tibial artery','A slip of extensor digitorum longus; absent in some people.'],
/* leg lateral */
['fl','Fibularis longus','ll-legL','Head and upper two-thirds of the lateral fibula',['fi.head','fi.latSurface'],'Medial cuneiform and base of the 1st metatarsal (underneath), via a groove under the cuboid',['ft.medCun','ft.mt1Base'],'Superficial fibular','L5–S1','Everts and plantarflexes the foot; supports the arches','Fibular and anterior tibial arteries','Its tendon crosses the sole to the same bones as tibialis anterior: together they make a stirrup.'],
['fb','Fibularis brevis','ll-legL','Lower two-thirds of the lateral fibula',['fi.latSurface'],'Tuberosity of the 5th metatarsal',['ft.mt5Tub'],'Superficial fibular','L5–S1','Everts the foot','Fibular artery','Its pull avulses the 5th metatarsal base in an inversion injury.'],
/* leg posterior superficial */
['gastro','Gastrocnemius','ll-legPs','Lateral head: lateral femoral condyle. Medial head: popliteal surface above the medial condyle',['fe.latCondyle','fe.aboveMedCond'],'Calcaneal tuberosity through the Achilles tendon',['ft.calcTub'],'Tibial','S1–2','Plantarflexes the ankle; flexes the knee','Sural arteries from the popliteal','Ankle reflex tests S1. Achilles rupture: Simmonds\' (Thompson\'s) test, squeezing the calf does not plantarflex the foot.'],
['soleus','Soleus','ll-legPs','Soleal line of the tibia, head and upper posterior fibula',['ti.soleal','fi.head','fi.postUpper'],'Calcaneal tuberosity through the Achilles tendon',['ft.calcTub'],'Tibial','S1–2','Plantarflexes the ankle; keeps you upright when standing','Posterior tibial, fibular and sural arteries','The calf muscle pump: its large venous sinuses are where DVTs often start.'],
['plantaris','Plantaris','ll-legPs','Lateral supracondylar line of the femur',['fe.latSupra'],'Calcaneus, beside the Achilles tendon',['ft.calcTub'],'Tibial','S1–2','Weakly plantarflexes the ankle and flexes the knee','Sural arteries','Its long thin tendon can be mistaken for nerve; used as a graft.'],
/* leg posterior deep */
['popliteus','Popliteus','ll-legPd','Groove on the lateral femoral condyle',['fe.latCondyle'],'Posterior tibia above the soleal line',['ti.poplArea'],'Tibial','L4–S1','Unlocks the extended knee by rotating the femur laterally on the tibia','Inferior genicular arteries','The key that starts knee flexion from the locked, fully straight position.'],
['tp','Tibialis posterior','ll-legPd','Interosseous membrane and adjacent posterior tibia and fibula',['ti.postLat','fi.postUpper'],'Navicular tuberosity (and most other tarsals)',['ft.navTub'],'Tibial','L4–5','Plantarflexes and inverts the foot; holds up the medial arch','Posterior tibial and fibular arteries','Tibialis posterior dysfunction is the commonest cause of adult acquired flat foot.'],
['fdl','Flexor digitorum longus','ll-legPd','Medial part of the posterior tibia',['ti.postMed'],'Distal phalanges of toes 2–5',['ft.toeDistal'],'Tibial','S2–3','Flexes the toes; helps plantarflex','Posterior tibial artery','Behind the medial malleolus: "Tom, Dick And Very Nervous Harry".'],
['fhl','Flexor hallucis longus','ll-legPd','Lower two-thirds of the posterior fibula',['fi.postLower'],'Base of the distal phalanx of the hallux',['ft.halluxDistal'],'Tibial','S2–3','Flexes the big toe: the final push-off in walking','Fibular artery','Its tendon grooves the talus and runs under the sustentaculum tali.'],
/* foot */
['edb','Extensor digitorum brevis','ll-foot','Dorsolateral calcaneus',['ft.calcDorsal'],'Proximal phalanx of the hallux (as extensor hallucis brevis) and EDL tendons of toes 2–4',['ft.halluxProx','ft.toeMid'],'Deep fibular','S1–2','Extends the toes','Dorsalis pedis artery','The only muscle on the dorsum of the foot: the soft bump in front of the lateral malleolus.'],
['abdh','Abductor hallucis','ll-foot','Medial calcaneal tuberosity',['ft.calcTub'],'Medial base of the proximal phalanx of the hallux',['ft.halluxProx'],'Medial plantar','S1–2','Abducts and flexes the big toe; supports the medial arch','Medial plantar artery','Forms the bulge on the inner border of the sole.'],
['fdb','Flexor digitorum brevis','ll-foot','Medial calcaneal tuberosity',['ft.calcTub'],'Middle phalanges of toes 2–5',['ft.toeMid'],'Medial plantar','S1–2','Flexes the toes','Medial and lateral plantar arteries','The sole\'s version of FDS: it splits to let the long flexor tendon through.'],
['admf','Abductor digiti minimi (foot)','ll-foot','Calcaneal tuberosity',['ft.calcTub'],'Proximal phalanx of the little toe',['ft.littleProx'],'Lateral plantar','S1–2','Abducts the little toe; supports the lateral arch','Lateral plantar artery','Forms the outer border of the sole.'],
/* pelvic floor */
['pubococc','Pubococcygeus (levator ani)','pv-floor','Back of the body of the pubis and the front of the tendinous arch',['hb.pubicBodyPost'],'Perineal body, anococcygeal body and coccyx',['sa.coccyx'],'Nerve to levator ani (S4) and pudendal nerve','S2–4','Supports the pelvic organs; helps continence','Inferior gluteal, internal pudendal and inferior vesical arteries','Stretched in vaginal childbirth: pelvic floor exercises strengthen it.'],
['puborect','Puborectalis (levator ani)','pv-floor','Back of the body of the pubis',['hb.pubicBodyPost'],'Loops behind the anorectal junction to join its partner (no bony insertion)',[],'Nerve to levator ani and pudendal nerve','S2–4','Keeps the anorectal angle (faecal continence); relaxes to allow defecation','Inferior rectal and inferior gluteal arteries','"S2, 3, 4 keeps the poo off the floor".'],
['iliococc','Iliococcygeus (levator ani)','pv-floor','Tendinous arch of the obturator fascia and the ischial spine',['hb.tendArch','hb.ischialSpine'],'Anococcygeal body and coccyx',['sa.coccyx'],'Nerve to levator ani','S3–4','Supports the pelvic organs','Inferior gluteal and internal pudendal arteries','The thin back part of levator ani.'],
['coccygeus','Coccygeus (ischiococcygeus)','pv-floor','Ischial spine',['hb.ischialSpine'],'Side of the coccyx and lower sacrum',['sa.coccyx'],'Anterior rami of S4–5','S4–5','Supports the pelvic floor; pulls the coccyx forwards','Inferior gluteal artery','Lies on the sacrospinous ligament. Levator ani + coccygeus = pelvic diaphragm ("Could I Peek Please").'],
/* trunk muscles on the pelvis */
['rectab','Rectus abdominis','pv-trunk','Pubic crest and pubic symphysis',['hb.pubicCrest','hb.pubicSym'],'Xiphoid process and costal cartilages 5–7',[],'Thoracoabdominal nerves (T7–11) and subcostal (T12)','T7–T12','Flexes the trunk; raises abdominal pressure','Superior and inferior epigastric arteries','The inferior epigastric artery runs behind it: avoid it when placing laparoscopic ports.'],
['extobl','External oblique','pv-trunk','Outer surfaces of ribs 5–12',[],'Linea alba, pubic tubercle (via the inguinal ligament) and anterior half of the iliac crest',['hb.pubicTub','hb.iliacCrest','hb.asis'],'Thoracoabdominal nerves (T7–11) and subcostal (T12)','T7–T12','Compresses the abdomen; flexes and rotates the trunk','Lower posterior intercostal and deep circumflex iliac arteries','Its folded lower edge between the ASIS and pubic tubercle is the inguinal ligament.'],
['ql','Quadratus lumborum','pv-trunk','Posterior iliac crest and iliolumbar ligament',['hb.iliacCrest'],'12th rib and transverse processes of L1–L4',[],'Anterior rami T12–L4','T12–L4','Side-bends the trunk; fixes the 12th rib in breathing','Lumbar and subcostal arteries','A common source of low back pain.']
];

const MUS = {};
RAW.forEach(r=>{ MUS[r[0]] = {id:r[0],n:r[1],comp:r[2],ot:r[3],o:r[4],it:r[5],i:r[6],nv:r[7],rt:r[8],act:r[9],bs:r[10],tip:r[11],reg:COMP[r[2]].reg}; });

/* attachments per landmark */
Object.values(MUS).forEach(m=>{
  m.o.forEach(id=>{ const l=LM[id]; if(!l){console.warn('MSK: missing landmark',id); return;} (l.O=l.O||[]).push(m.id); });
  m.i.forEach(id=>{ const l=LM[id]; if(!l){console.warn('MSK: missing landmark',id); return;} (l.I=l.I||[]).push(m.id); });
});

/* linking rules shown with each region */
const RULES = {
 ul:[
  ['One compartment, one nerve, one job','Arm front = musculocutaneous = flex the elbow. Arm back = radial = extend. Forearm front = median (plus two ulnar exceptions: FCU and the medial half of FDP) = flex the wrist and fingers. Forearm back = radial/PIN = extend.'],
  ['Two epicondyles, two teams','Medial epicondyle = common flexor origin (the front of the forearm). Lateral epicondyle = common extensor origin (the back). Golfer\'s elbow is medial, tennis elbow lateral.'],
  ['The scapula is a hub','Fossae give origins (supraspinatus, infraspinatus, subscapularis); the humeral tubercles take the insertions. Coracoid: one in (pectoralis minor), two out (coracobrachialis, short head of biceps).'],
  ['Trapezius and deltoid are continuous','Trapezius inserts on the lateral clavicle, acromion and spine; deltoid arises from the same three. Learn them as one line over the shoulder.'],
  ['Three tendons on the intertubercular groove','"The lady between two majors": pectoralis major on the lateral lip, latissimus dorsi in the floor, teres major on the medial lip. All three adduct and medially rotate.'],
  ['Long flexors reach further than short ones','Superficialis stops at the middle phalanx, profundus goes deeper to the distal phalanx. FDS splits to let FDP through.']
 ],
 ll:[
  ['One compartment, one nerve, one job','Thigh front = femoral = extend the knee. Medial = obturator = adduct. Back = sciatic (tibial) = flex the knee and extend the hip. Leg front = deep fibular = dorsiflex. Lateral = superficial fibular = evert. Back = tibial = plantarflex.'],
  ['Trochanters: big one rotates, small one flexes','Greater trochanter = abductors and lateral rotators (gluteus medius and minimus, piriformis, obturator internus, gemelli). Lesser trochanter = iliopsoas, the main hip flexor.'],
  ['The ischial tuberosity starts the hamstrings','All three hamstrings (and the hamstring part of adductor magnus) arise from it, so they all extend the hip as well as flex the knee. Short head of biceps is the odd one out (femur, common fibular nerve).'],
  ['Three goose-foot tendons, three compartments','Pes anserinus: Sartorius (anterior, femoral), Gracilis (medial, obturator), semiTendinosus (posterior, sciatic): one from each thigh compartment.'],
  ['Everything for the knee meets at the tibial tuberosity','All four quadriceps converge on one tendon, the patella and the patellar ligament: knee extension and the L3–4 reflex.'],
  ['Stirrup under the foot','Tibialis anterior (from the front) and fibularis longus (from the side) both insert on the medial cuneiform and 1st metatarsal base, holding up the arch from two sides.']
 ],
 pv:[
  ['Hip bone = three bones, one socket','Ilium, ischium and pubis fuse in the acetabulum (Y-shaped cartilage until the mid-teens).'],
  ['The brim divides abdomen from pelvis','Above the pelvic brim: false pelvis (abdomen, iliac fossae, iliacus). Below: true pelvis (bladder, rectum, reproductive organs, birth canal).'],
  ['The ischial spine is a crossroads','Sacrospinous ligament, coccygeus, iliococcygeus and superior gemellus attach to it; the pudendal nerve hooks round it.'],
  ['Pelvic floor hangs from the side walls','Levator ani arises from the pubis, the obturator internus fascia (tendinous arch) and the ischial spine, and inserts in the midline (perineal body, anococcygeal body, coccyx).']
 ]
};

return {LM,MUS,COMP,RULES};
})();
