// Dataset sourced directly from https://github.com/hasaneyldrm/exercises-dataset
export interface VirtualGymExercise {
  id: string;
  name: string;
  category: string;
  body_part: string;
  equipment: string;
  target: string;
  secondary_muscles: string[];
  image: string;
  gif_url: string;
  instruction_steps: string[];
  instructions_all?: Record<string, string>;
}

export const RAW_GITHUB_BASE = "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/";

export const getExerciseImageUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${RAW_GITHUB_BASE}${path}`;
};

export const getExerciseGifUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${RAW_GITHUB_BASE}${path}`;
};

export const CURATED_EXERCISES: VirtualGymExercise[] = [
  {
    "id": "0025",
    "name": "barbell bench press",
    "category": "chest",
    "body_part": "chest",
    "equipment": "barbell",
    "target": "pectorals",
    "secondary_muscles": [
      "triceps",
      "shoulders"
    ],
    "image": "images/0025-EIeI8Vf.jpg",
    "gif_url": "videos/0025-EIeI8Vf.gif",
    "instruction_steps": [
      "Lie flat on a bench with your feet flat on the ground and your back pressed against the bench.",
      "Grasp the barbell with an overhand grip slightly wider than shoulder-width apart.",
      "Lift the barbell off the rack and hold it directly above your chest with your arms fully extended.",
      "Lower the barbell slowly towards your chest, keeping your elbows tucked in.",
      "Pause for a moment when the barbell touches your chest.",
      "Push the barbell back up to the starting position by extending your arms.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Lie flat on a bench with your feet flat on the ground and your back pressed against the bench. Grasp the barbell with an overhand grip slightly wider than shoulder-width apart. Lift the barbell off the rack and hold it directly above your chest with your arms fully extended. Lower the barbell slowly towards your chest, keeping your elbows tucked in. Pause for a moment when the barbell touches your chest. Push the barbell back up to the starting position by extending your arms. Repeat for the desired number of repetitions.",
      "it": "Sdraiati su una panca con i piedi appoggiati a terra e la schiena premuta contro la panca. Afferrare il bilanciere con una presa prona leggermente più larga della larghezza delle spalle. Solleva il bilanciere dal rack e tienilo direttamente sopra il petto con le braccia completamente distese. Abbassa lentamente il bilanciere verso il petto, tenendo i gomiti piegati. Fai una pausa per un momento quando il bilanciere tocca il petto. Spingi il bilanciere nella posizione iniziale estendendo le braccia. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız yere düz basacak ve sırtınız banka yaslanacak şekilde bir bankın üzerine düz bir şekilde uzanın. Halteri omuz genişliğinden biraz daha geniş olacak şekilde üstten kavrayın. Halteri raftan kaldırın ve kollarınız tamamen uzatılmış halde doğrudan göğsünüzün üzerinde tutun. Dirseklerinizi içeride tutarak halteri yavaşça göğsünüze doğru indirin. Halter göğsünüze dokunduğunda bir an duraklayın. Kollarınızı uzatarak halteri başlangıç ​​pozisyonuna doğru itin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Túmbate sobre un banco con los pies apoyados en el suelo y la espalda presionada contra el banco. Agarra la barra con un agarre pronado un poco más ancho que la separación de los hombros. Levanta la barra del soporte y sostenla directamente sobre el pecho con los brazos completamente extendidos. Baja la barra lentamente hacia el pecho, manteniendo los codos pegados al cuerpo. Haz una pausa breve cuando la barra toque el pecho. Empuja la barra de vuelta a la posición inicial extendiendo los brazos. Repite el número de repeticiones deseado.",
      "ru": "Лягте на скамью, поставьте ступни на землю и прижмите спину к скамье. Возьмите штангу хватом сверху на расстоянии чуть шире плеч. Снимите штангу со стойки и держите ее прямо над грудью, полностью вытянув руки. Медленно опустите штангу к груди, держа локти прижатыми. Сделайте паузу на мгновение, когда штанга коснется вашей груди. Верните штангу в исходное положение, вытянув руки. Повторите необходимое количество повторений.",
      "zh": "平躺在长凳上，双脚平放在地上，背部紧贴长凳。 正手握住杠铃，握距略宽于肩宽。 将杠铃从架子上提起，并将其直接放在胸部上方，双臂完全伸展。 将杠铃慢慢降低到胸部，保持肘部内收。 当杠铃触及胸部时暂停片刻。 伸展双臂，将杠铃推回到起始位置。 重复所需的重复次数。",
      "hi": "एक बेंच पर सीधे लेट जाएं और आपके पैर जमीन पर सपाट हों और आपकी पीठ बेंच से सटी हुई हो। बारबेल को कंधे की चौड़ाई से थोड़ी अधिक चौड़ी पकड़ के साथ पकड़ें। बारबेल को रैक से उठाएं और अपनी बाहों को पूरी तरह फैलाकर सीधे अपनी छाती के ऊपर पकड़ें। अपनी कोहनियों को अंदर की ओर रखते हुए बारबेल को धीरे-धीरे अपनी छाती की ओर नीचे लाएँ। जब बारबेल आपकी छाती को छुए तो एक क्षण के लिए रुकें। अपनी भुजाओं को फैलाकर बारबेल को वापस प्रारंभिक स्थिति में धकेलें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Połóż się płasko na ławce, stopy oprzyj płasko na podłodze, a plecy przyciśnij do ławki. Chwyć sztangę chwytem nachwytem nieco szerszym niż szerokość barków. Zdejmij sztangę ze stojaka i utrzymuj ją bezpośrednio nad klatką piersiową przy w pełni wyprostowanych rękach. Powoli opuszczaj sztangę w kierunku klatki piersiowej, trzymając łokcie blisko ciała. Zatrzymaj się na chwilę, gdy sztanga dotknie klatki piersiowej. Wypchnij sztangę z powrotem do pozycji wyjściowej, prostując ręce. Powtórz odpowiednią liczbę razy.",
      "ko": "벤치에 눕되 발을 땅에 댑니다. 등을 벤치에 밀착합니다. 어깨 너비보다 약간 더 넓게 오버그립으로 바벨을 잡습니다. 바벨을 랙에서 들어 가슴 위에서 팔을 완전히 뻗은 상태로 잡습니다. 팔꿈치를 안쪽으로 유지하면서 천천히 바벨을 가슴 쪽으로 내립니다. 바벨이 가슴에 닿을 때 잠시 멈춘 후, 팔을 펴서 바벨을 처음 위치로 밀어냅니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Allonge-toi à plat sur un banc, les pieds à plat au sol et le dos plaqué contre le banc. Saisis la barre avec une prise en pronation un peu plus large que la largeur des épaules. Soulève la barre du rack et maintiens-la directement au-dessus de ta poitrine, les bras complètement tendus. Abaisse lentement la barre vers ta poitrine, en gardant tes coudes serrés. Marque une pause lorsque la barre touche ta poitrine. Repousse la barre vers le haut jusqu'à la position de départ en étendant tes bras. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0289",
    "name": "dumbbell bench press",
    "category": "chest",
    "body_part": "chest",
    "equipment": "dumbbell",
    "target": "pectorals",
    "secondary_muscles": [
      "triceps",
      "shoulders"
    ],
    "image": "images/0289-SpYC0Kp.jpg",
    "gif_url": "videos/0289-SpYC0Kp.gif",
    "instruction_steps": [
      "Lie flat on a bench with your feet flat on the ground and your back pressed against the bench.",
      "Hold a dumbbell in each hand, with your palms facing forward and your arms extended above your chest.",
      "Lower the dumbbells slowly to the sides of your chest, keeping your elbows at a 90-degree angle.",
      "Pause for a moment, then push the dumbbells back up to the starting position, fully extending your arms.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Lie flat on a bench with your feet flat on the ground and your back pressed against the bench. Hold a dumbbell in each hand, with your palms facing forward and your arms extended above your chest. Lower the dumbbells slowly to the sides of your chest, keeping your elbows at a 90-degree angle. Pause for a moment, then push the dumbbells back up to the starting position, fully extending your arms. Repeat for the desired number of repetitions.",
      "it": "Sdraiati disteso su una panca con i piedi piatti a terra e la schiena premuta contro la panca. Tieni un manubrio in ogni mano, con i palmi rivolti in avanti e le braccia estese sopra il petto. Abbassa lentamente i manubri ai lati del petto, mantenendo i gomiti a 90 gradi. Fermati un attimo, poi spingi i manubri di nuovo alla posizione iniziale, estendendo completamente le braccia. Ripeti per il numero desiderato di ripetizioni.",
      "tr": "Ayaklarınız yere düz basacak ve sırtınız banka yaslanacak şekilde bir bankın üzerine düz bir şekilde uzanın. Avuç içleriniz öne bakacak ve kollarınız göğsünüzün üzerine uzatılacak şekilde her iki elinize de birer dambıl tutun. Dirseklerinizi 90 derecelik bir açıda tutarak dambılları yavaşça göğsünüzün yanlarına doğru indirin. Bir an duraklayın, ardından kollarınızı tamamen uzatarak dambılları başlangıç ​​pozisyonuna doğru itin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Túmbate sobre un banco con los pies apoyados en el suelo y la espalda presionada contra el banco. Sujeta una mancuerna en cada mano, con las palmas hacia adelante y los brazos extendidos por encima del pecho. Baja lentamente las mancuernas hacia los lados del pecho, manteniendo los codos en un ángulo de 90 grados. Haz una pausa breve, luego empuja las mancuernas de vuelta hacia arriba hasta la posición inicial, extendiendo completamente los brazos. Repite el número de repeticiones deseado.",
      "ru": "Лягте на скамью, поставьте ступни на землю и прижмите спину к скамье. Возьмите в каждую руку по гантели ладонями вперед и руками, вытянутыми над грудью. Медленно опустите гантели по бокам груди, держа локти под углом 90 градусов. Сделайте паузу на мгновение, затем верните гантели в исходное положение, полностью выпрямляя руки. Повторите необходимое количество повторений.",
      "zh": "平躺在长凳上，双脚平放在地上，背部紧贴长凳。 双手各握一个哑铃，手掌朝前，双臂伸至胸部上方。 慢慢地将哑铃降低到胸部两侧，保持肘部呈 90 度角。 暂停片刻，然后将哑铃推回起始位置，完全伸展双臂。 重复所需的重复次数。",
      "hi": "एक बेंच पर सीधे लेट जाएं और आपके पैर जमीन पर सपाट हों और आपकी पीठ बेंच से सटी हुई हो। प्रत्येक हाथ में एक डम्बल पकड़ें, आपकी हथेलियाँ आगे की ओर हों और आपकी भुजाएँ आपकी छाती के ऊपर फैली हुई हों। अपनी कोहनियों को 90 डिग्री के कोण पर रखते हुए, डम्बल को धीरे-धीरे अपनी छाती के किनारों तक नीचे लाएँ। एक पल के लिए रुकें, फिर अपनी बाहों को पूरी तरह फैलाते हुए डम्बल को वापस प्रारंभिक स्थिति में धकेलें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Połóż się płasko na ławce, stopy płasko na podłodze, plecy dociśnięte do ławki. Trzymaj hantlę w każdej dłoni, dłonie skierowane do przodu, ramiona wyprostowane nad klatką piersiową. Powoli opuść hantle po bokach klatki piersiowej, trzymając łokcie pod kątem 90 stopni. Zatrzymaj się na chwilę, a następnie wypchnij hantle z powrotem do pozycji wyjściowej, w pełni prostując ramiona. Powtórz zalecaną liczbę powtórzeń.",
      "ko": "벤치에 누워 발을 바닥에 붙이고 등을 벤치에 기대십시오. 양손에 덤벨을 들고 손바닥이 앞을 향하며 팔이 가슴 위로 펼쳐진 상태입니다. 덤벨을 천천히 가슴 옆으로 내리고 팔꿈치를 90도로 유지합니다. 잠시 멈춘 후 덤벨을 처음 위치로 밀어 올리며 팔을 완전히 펼칩니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Allonge-toi à plat sur un banc, les pieds à plat au sol et le dos plaqué contre le banc. Tiens un haltère dans chaque main, les paumes tournées vers l'avant et les bras étendus au-dessus de ta poitrine. Abaisse lentement les haltères sur les côtés de ta poitrine, en gardant tes coudes à un angle de 90 degrés. Marque une pause, puis repousse les haltères vers le haut jusqu'à la position de départ, en tendant complètement tes bras. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0975",
    "name": "band close-grip push-up",
    "category": "upper arms",
    "body_part": "upper arms",
    "equipment": "band",
    "target": "triceps",
    "secondary_muscles": [
      "chest",
      "shoulders"
    ],
    "image": "images/0975-ufaxB52.jpg",
    "gif_url": "videos/0975-ufaxB52.gif",
    "instruction_steps": [
      "Place a band around your upper arms, just above the elbows.",
      "Assume a push-up position with your hands directly under your shoulders and your body in a straight line from head to heels.",
      "Bend your elbows and lower your chest towards the ground, keeping your elbows close to your sides.",
      "Push through your palms to extend your arms and return to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Place a band around your upper arms, just above the elbows. Assume a push-up position with your hands directly under your shoulders and your body in a straight line from head to heels. Bend your elbows and lower your chest towards the ground, keeping your elbows close to your sides. Push through your palms to extend your arms and return to the starting position. Repeat for the desired number of repetitions.",
      "it": "Posiziona una fascia attorno alla parte superiore delle braccia, appena sopra i gomiti. Assumi una posizione di push-up con le mani direttamente sotto le spalle e il corpo in linea retta dalla testa ai talloni. Piega i gomiti e abbassa il petto verso terra, mantenendo i gomiti vicini ai fianchi. Spingi attraverso i palmi delle mani per estendere le braccia e tornare alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Üst kollarınızın etrafına, dirseklerin hemen üstüne bir bant yerleştirin. Elleriniz doğrudan omuzlarınızın altında ve vücudunuz baştan topuklara kadar düz bir çizgide olacak şekilde şınav pozisyonu alın. Dirseklerinizi bükün ve göğsünüzü yere doğru indirin, dirseklerinizi yanlarınıza yakın tutun. Kollarınızı uzatmak ve başlangıç ​​pozisyonuna dönmek için avuçlarınızı itin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Coloca una banda alrededor de la parte superior de los brazos, justo por encima de los codos. Adopta una posición de flexión de brazos con las manos justo debajo de los hombros y el cuerpo en línea recta desde la cabeza hasta los talones. Flexiona los codos y baja el pecho hacia el suelo, manteniendo los codos cerca de los costados. Empuja con las palmas para extender los brazos y regresar a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Наденьте ленту на плечи чуть выше локтей. Примите позу для отжимания, положив руки прямо под плечи, а тело образуя прямую линию от головы до пяток. Согните локти и опустите грудь к земле, держа локти близко к бокам. Оттолкнитесь ладонями, чтобы вытянуть руки и вернуться в исходное положение. Повторите необходимое количество повторений.",
      "zh": "将一条带子绕在你的上臂上，就在肘部上方。 采取俯卧撑姿势，双手直接放在肩膀下方，身体从头到脚跟呈一条直线。 弯曲肘部，将胸部降低到地面，保持肘部靠近身体两侧。 推动手掌以伸展手臂并返回到起始位置。 重复所需的重复次数。",
      "hi": "अपनी ऊपरी भुजाओं के चारों ओर, कोहनियों के ठीक ऊपर एक बैंड रखें। अपने हाथों को सीधे अपने कंधों के नीचे और अपने शरीर को सिर से एड़ी तक एक सीधी रेखा में रखते हुए पुश-अप स्थिति लें। अपनी कोहनियों को मोड़ें और अपनी छाती को ज़मीन की ओर नीचे करें, अपनी कोहनियों को अपनी भुजाओं के पास रखें। अपनी हथेलियों से धक्का देकर अपनी भुजाओं को फैलाएं और प्रारंभिक स्थिति में लौट आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Umieść taśmę na ramionach, tuż nad łokciami. Ustaw się w pozycji pompki, dłonie dokładnie pod barkami, a ciało tworzy prostą linię od głowy do pięt. Ugnij łokcie i opuść klatkę piersiową w kierunku podłogi, trzymając łokcie blisko boków ciała. Odepchnij się dłońmi, prostując ramiona i wracając do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "팔 위쪽, 팔꿈치 바로 위에 밴드를 감습니다. 손이 어깨 바로 아래에 있고 머리에서 발까지 일직선을 이루도록 푸시업 자세를 취합니다. 팔꿈치를 구부리고 가슴을 지면을 향해 내리되 팔꿈치를 몸 옆에 가깝게 유지합니다. 손바닥으로 밀어 팔을 펴고 시작 자세로 돌아갑니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Place un élastique autour de tes bras, juste au-dessus des coudes. Prends une position de pompes, tes mains directement sous tes épaules et ton corps aligné de la tête aux talons. Plie tes coudes et abaisse ta poitrine vers le sol en gardant tes coudes près de tes côtés. Pousse à travers tes paumes pour étendre tes bras et revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0009",
    "name": "assisted chest dip (kneeling)",
    "category": "chest",
    "body_part": "chest",
    "equipment": "leverage machine",
    "target": "pectorals",
    "secondary_muscles": [
      "triceps",
      "shoulders"
    ],
    "image": "images/0009-PAgTVaK.jpg",
    "gif_url": "videos/0009-PAgTVaK.gif",
    "instruction_steps": [
      "Adjust the machine to your desired height and secure your knees on the pad.",
      "Grasp the handles with your palms facing down and your arms fully extended.",
      "Lower your body by bending your elbows until your upper arms are parallel to the floor.",
      "Pause for a moment, then push yourself back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Adjust the machine to your desired height and secure your knees on the pad. Grasp the handles with your palms facing down and your arms fully extended. Lower your body by bending your elbows until your upper arms are parallel to the floor. Pause for a moment, then push yourself back up to the starting position. Repeat for the desired number of repetitions.",
      "it": "Regola la macchina all'altezza desiderata e fissa le ginocchia sul cuscinetto. Afferrare le maniglie con i palmi rivolti verso il basso e le braccia completamente distese. Abbassa il corpo piegando i gomiti finché la parte superiore delle braccia non è parallela al pavimento. Fai una pausa per un momento, quindi ritorna alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Makineyi istediğiniz yüksekliğe ayarlayın ve dizlerinizi yastığa sabitleyin. Avuç içleriniz aşağıya bakacak ve kollarınız tamamen uzatılmış halde tutacakları kavrayın. Üst kollarınız yere paralel oluncaya kadar dirseklerinizi bükerek vücudunuzu indirin. Bir an duraklayın ve ardından kendinizi başlangıç ​​pozisyonuna doğru itin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ajusta la máquina a la altura deseada y asegura las rodillas sobre la almohadilla. Agarra las agarraderas con las palmas hacia abajo y los brazos completamente extendidos. Baja el cuerpo flexionando los codos hasta que los brazos queden paralelos al suelo. Haz una pausa por un momento, luego empuja tu cuerpo de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Отрегулируйте машину на желаемую высоту и зафиксируйте колени на подставке. Возьмитесь за ручки ладонями вниз и полностью выпрямите руки. Опустите тело, сгибая локти, пока плечи не станут параллельны полу. Сделайте паузу на мгновение, затем вернитесь в исходное положение. Повторите необходимое количество повторений.",
      "zh": "将机器调整到您想要的高度，并将膝盖固定在垫子上。 手掌朝下，抓住手柄，双臂完全伸展。 弯曲肘部降低身体，直到上臂与地板平行。 暂停片刻，然后将自己推回到起始位置。 重复所需的重复次数。",
      "hi": "मशीन को अपनी इच्छित ऊंचाई पर समायोजित करें और अपने घुटनों को पैड पर सुरक्षित करें। अपनी हथेलियों को नीचे की ओर रखते हुए और अपनी बाहों को पूरी तरह फैलाकर हैंडल को पकड़ें। अपनी कोहनियों को मोड़कर अपने शरीर को तब तक नीचे लाएँ जब तक कि आपकी ऊपरी भुजाएँ फर्श के समानांतर न हो जाएँ। एक पल के लिए रुकें, फिर अपने आप को वापस प्रारंभिक स्थिति में धकेलें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Ustaw maszynę na odpowiednią wysokość i oprzyj kolana na poduszce. Chwyć uchwyty dłońmi skierowanymi w dół, ramiona w pełni wyprostowane. Opuść ciało, uginając łokcie, aż ramiona będą równoległe do podłogi. Zatrzymaj się na chwilę, a następnie wypchnij się z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "머신을 원하는 높이로 조절하고 무릎을 패드에 고정합니다. 손으로 손잡이를 손바닥이 아래를 향하도록 잡고 팔을 완전히 펼칩니다. 팔꿈치를 구부려 몸을 내리되 팔뚝이 바닥과 평행하게 될 때까지 내립니다. 잠깐 멈췄다가 몸을 시작 자세로 밀어 올립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Règle la machine à la hauteur souhaitée et cale tes genoux sur le coussin. Saisis les poignées avec les paumes tournées vers le bas et les bras complètement étendus. Abaisse ton corps en fléchissant tes coudes jusqu'à ce que le haut de tes bras soit parallèle au sol. Marque une pause, puis repousse-toi vers le haut jusqu'à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0188",
    "name": "cable middle fly",
    "category": "chest",
    "body_part": "chest",
    "equipment": "cable",
    "target": "pectorals",
    "secondary_muscles": [
      "deltoids",
      "triceps"
    ],
    "image": "images/0188-xLYSdtg.jpg",
    "gif_url": "videos/0188-xLYSdtg.gif",
    "instruction_steps": [
      "Attach cables to both sides of a cable machine at chest height.",
      "Stand in the center of the machine with one foot slightly in front of the other.",
      "Grasp the handles with an overhand grip and extend your arms out to the sides.",
      "Keep a slight bend in your elbows and maintain a slight forward lean.",
      "Engage your chest muscles and bring your arms forward in a sweeping motion.",
      "Pause for a moment at the center, then slowly return your arms back to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Attach cables to both sides of a cable machine at chest height. Stand in the center of the machine with one foot slightly in front of the other. Grasp the handles with an overhand grip and extend your arms out to the sides. Keep a slight bend in your elbows and maintain a slight forward lean. Engage your chest muscles and bring your arms forward in a sweeping motion. Pause for a moment at the center, then slowly return your arms back to the starting position. Repeat for the desired number of repetitions.",
      "it": "Attacca cavi su entrambi i lati di una macchina a cavo all'altezza del petto. Stai al centro della macchina con un piede leggermente davanti all'altro. Afferra le manici con una presa sopra la mano e estendi le braccia ai lati. Mantieni una leggera piega dei gomiti e una leggera inclinazione in avanti. Attiva i muscoli del petto e porta le braccia in avanti con un movimento ampio. Fermati un attimo al centro, poi riporta lentamente le braccia alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
      "tr": "Kabloları kablo makinesinin her iki tarafına göğüs hizasında bağlayın. Bir ayağınız diğerinin biraz önünde olacak şekilde makinenin ortasında durun. Tutma yerlerini üstten kavrayarak kollarınızı yanlara doğru uzatın. Dirseklerinizi hafif bir şekilde bükün ve hafif öne eğilmeyi sürdürün. Göğüs kaslarınızı çalıştırın ve kollarınızı geniş bir hareketle öne doğru getirin. Merkezde bir an duraklayın, ardından kollarınızı yavaşça başlangıç ​​pozisyonuna geri getirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Sujeta los cables a ambos lados de una máquina de cable a la altura del pecho. Ponte de pie en el centro de la máquina con un pie ligeramente delante del otro. Sujeta las agarraderas con un agarre prono y extiende los brazos hacia los lados. Mantén una ligera flexión en los codos y conserva una leve inclinación hacia adelante. Activa los músculos del pecho y lleva los brazos hacia adelante con un movimiento amplio. Haz una pausa por un momento en el centro y luego regresa lentamente los brazos a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Прикрепите кабели к обеим сторонам канатной машины на уровне груди. Встаньте в центре тренажера, поставив одну ногу немного впереди другой. Возьмитесь за рукоятки верхним хватом и вытяните руки в стороны. Сохраняйте небольшой изгиб в локтях и сохраняйте небольшой наклон вперед. Задействуйте мышцы груди и сделайте размашистое движение руками вперед. Задержитесь на мгновение в центре, затем медленно верните руки в исходное положение. Повторите необходимое количество повторений.",
      "zh": "将电缆连接到电缆机两侧胸部高度处。 站在机器的中央，一只脚稍微在另一只脚前面。 正手握住手柄，并将手臂向两侧伸展。 保持肘部轻微弯曲并保持轻微前倾。 收紧胸部肌肉，并以扫过的动作将手臂向前伸。 在中心停顿片刻，然后慢慢将手臂放回起始位置。 重复所需的重复次数。",
      "hi": "केबल मशीन के दोनों किनारों पर छाती की ऊंचाई पर केबल जोड़ें। मशीन के बीच में एक पैर दूसरे पैर से थोड़ा सा सामने रखकर खड़े हो जाएं। हैंडल को ओवरहैंड ग्रिप से पकड़ें और अपनी भुजाओं को बगल की ओर फैलाएँ। अपनी कोहनियों को थोड़ा मोड़ें और थोड़ा आगे की ओर झुकें। अपनी छाती की मांसपेशियों को शामिल करें और अपनी भुजाओं को व्यापक गति में आगे लाएँ। केंद्र में एक पल के लिए रुकें, फिर धीरे-धीरे अपनी भुजाओं को प्रारंभिक स्थिति में वापस लौटाएँ। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Podłącz linki do obu stron wyciągu na wysokości klatki piersiowej. Stań pośrodku maszyny, jedną stopą lekko wysuniętą do przodu. Chwyć uchwyty nachwytem i rozłóż ramiona na boki. Zachowaj lekkie ugięcie w łokciach i lekkie pochylenie do przodu. Napnij mięśnie klatki piersiowej i przesuń ramiona do przodu ruchem zataczającym. Zatrzymaj się na moment pośrodku, a następnie powoli wróć ramionami do pozycji wyjściowej. Powtórz zalecaną liczbę powtórzeń.",
      "ko": "케이블 머신의 양쪽에 케이블을 가슴 높이에 부착합니다. 머신 중앙에 서서 한 발을 약간 앞으로 합니다. 손잡이를 오버핸드 그립으로 잡고 팔을 옆으로 펼칩니다. 팔꿈치에 약간의 굽곡을 유지하고 약간 앞으로 기울인 자세를 유지합니다. 가슴 근육을 활성화하고 팔을 앞으로 쓸어 움직입니다. 중앙에서 잠깐 멈추었다가 팔을 천천히 시작 위치로 돌아옵니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Fixe des câbles des deux côtés d'une machine à câble à hauteur de la poitrine. Tiens-toi au centre de la machine, un pied légèrement devant l'autre. Saisis les poignées avec une prise en pronation et étends les bras sur les côtés. Garde une légère flexion dans tes coudes et maintiens une légère inclinaison vers l'avant. Sollicite les muscles de ta poitrine et ramène tes bras vers l'avant dans un mouvement de balayage. Marque une pause au centre, puis ramène lentement tes bras à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0032",
    "name": "barbell deadlift",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "barbell",
    "target": "glutes",
    "secondary_muscles": [
      "hamstrings",
      "lower back"
    ],
    "image": "images/0032-ila4NZS.jpg",
    "gif_url": "videos/0032-ila4NZS.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and the barbell on the ground in front of you.",
      "Bend your knees and hinge at the hips to lower your torso and grip the barbell with an overhand grip, hands slightly wider than shoulder-width apart.",
      "Keep your back straight and chest lifted as you drive through your heels to lift the barbell off the ground, extending your hips and knees.",
      "As you stand up straight, squeeze your glutes and keep your core engaged.",
      "Lower the barbell back down to the ground by bending at the hips and knees, keeping your back straight.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and the barbell on the ground in front of you. Bend your knees and hinge at the hips to lower your torso and grip the barbell with an overhand grip, hands slightly wider than shoulder-width apart. Keep your back straight and chest lifted as you drive through your heels to lift the barbell off the ground, extending your hips and knees. As you stand up straight, squeeze your glutes and keep your core engaged. Lower the barbell back down to the ground by bending at the hips and knees, keeping your back straight. Repeat for the desired number of repetitions.",
      "it": "Stai con i piedi alla larghezza delle spalle e il bilanciere a terra davanti a te. Piega le ginocchia e fai perno sui fianchi per abbassare il busto e afferrare il bilanciere con una presa prona, con le mani leggermente più larghe della larghezza delle spalle. Tieni la schiena dritta e il petto sollevato mentre spingi i talloni per sollevare il bilanciere da terra, estendendo i fianchi e le ginocchia. Mentre stai in piedi, contrai i glutei e mantieni il core impegnato. Abbassa il bilanciere a terra piegando le anche e le ginocchia, mantenendo la schiena dritta. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız omuz genişliğinde açık ve halter önünüzde yerde olacak şekilde ayakta durun. Dizlerinizi bükün ve kalçalarınızı menteşeleyerek gövdenizi indirin ve halteri üstten kavrayarak, eller omuz genişliğinden biraz daha geniş olacak şekilde kavrayın. Halteri yerden kaldırmak için topuklarınızın üzerinden geçerken sırtınızı düz ve göğsünüzü yukarıda tutun, kalçalarınızı ve dizlerinizi uzatın. Dik dururken kalça kaslarınızı sıkın ve merkez bölgenizi meşgul tutun. Sırtınızı düz tutarak, kalçalarınızı ve dizlerinizi bükerek halteri yere indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y la barra en el suelo frente a ti. Flexiona las rodillas y las caderas para bajar el torso y agarra la barra con un agarre pronado, con las manos un poco más separadas que el ancho de los hombros. Mantén la espalda recta y el pecho elevado mientras empujas con los talones para levantar la barra del suelo, extendiendo las caderas y las rodillas. Al ponerte de pie, aprieta los glúteos y mantén el core activado. Baja la barra de vuelta al suelo flexionando las caderas y las rodillas, manteniendo la espalda recta. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, положите штангу на землю перед собой. Согните колени и наклоните бедра, чтобы опустить туловище и взять штангу хватом сверху, руки на расстоянии чуть шире плеч. Держите спину прямо, а грудь приподнятой, пока вы двигаетесь пятками, чтобы поднять штангу с земли, вытягивая бедра и колени. Вставая прямо, сожмите ягодицы и держите корпус напряженным. Опустите штангу обратно на землю, сгибая бедра и колени, сохраняя спину прямой. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，杠铃放在你面前的地面上。 弯曲膝盖并以臀部为铰链，降低躯干，正手握住杠铃，双手分开略宽于肩宽。 当你通过脚后跟将杠铃抬离地面时，保持背部挺直，胸部抬起，伸展臀部和膝盖。 当你站直时，挤压你的臀部并保持你的核心参与。 弯曲臀部和膝盖，将杠铃放回地面，保持背部挺直。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और बारबेल आपके सामने जमीन पर हो। अपने घुटनों को मोड़ें और अपने धड़ को नीचे करने के लिए कूल्हों पर टिकाएं और बारबेल को ओवरहैंड ग्रिप से पकड़ें, हाथों को कंधे की चौड़ाई से थोड़ा चौड़ा रखें। बारबेल को जमीन से ऊपर उठाने के लिए अपनी एड़ी के माध्यम से ड्राइव करते समय अपनी पीठ सीधी और छाती ऊपर रखें, अपने कूल्हों और घुटनों को फैलाएं। जैसे ही आप सीधे खड़े हों, अपने ग्लूट्स को निचोड़ें और अपने कोर को व्यस्त रखें। अपनी पीठ को सीधा रखते हुए, कूल्हों और घुटनों पर झुकते हुए बारबेल को वापस ज़मीन पर नीचे लाएँ। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków, ze sztangą leżącą na podłodze przed tobą. Ugnij kolana i pochyl się w biodrach, aby opuścić tułów i chwycić sztangę chwytem nachwytem, dłonie nieco szerzej niż szerokość barków. Utrzymując proste plecy i uniesioną klatkę piersiową, odepchnij się piętami, unosząc sztangę z podłogi, prostując biodra i kolana. Gdy staniesz prosto, ściśnij pośladki i utrzymuj napięcie mięśni tułowia. Opuść sztangę z powrotem na podłogę, uginając biodra i kolana, utrzymując proste plecy. Powtórz odpowiednią liczbę razy.",
      "ko": "발을 어깨넓이로 벌리고 서서 바벨을 몸 앞 바닥에 놓습니다. 무릎을 굽혀 허리를 숙이면서 손가락이 앞을 향하도록 바벨을 잡고 손은 어깨넓이보다 약간 넓게 위치시킵니다. 등을 곧게 유지하고 가슴을 펴면서 발 뒤꿈치로 힘을 주어 바벨을 들어올리고 허리와 무릎을 펼칩니다. 서서 일어나면서 둔근을 조이고 복부에 힘을 줍니다. 바벨을 내릴 때는 허리와 무릎을 구부려 바닥으로 낮추면서 등을 곧게 유지합니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et la barre au sol devant toi. Fléchis les genoux et bascule au niveau des hanches pour abaisser ton torse et saisir la barre en prise pronation, les mains légèrement plus écartées que la largeur des épaules. Garde le dos droit et la poitrine relevée pendant que tu pousses sur tes talons pour soulever la barre du sol, en étendant tes hanches et tes genoux. En te redressant, contracte tes fessiers et garde ta sangle abdominale gainée. Abaisse la barre jusqu'au sol en fléchissant les hanches et les genoux, en gardant ton dos droit. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0015",
    "name": "assisted parallel close grip pull-up",
    "category": "back",
    "body_part": "back",
    "equipment": "leverage machine",
    "target": "lats",
    "secondary_muscles": [
      "biceps",
      "forearms"
    ],
    "image": "images/0015-vrhHa6D.jpg",
    "gif_url": "videos/0015-vrhHa6D.gif",
    "instruction_steps": [
      "Adjust the machine to your desired weight and height.",
      "Place your hands on the parallel bars with a close grip, palms facing each other.",
      "Hang from the bars with your arms fully extended and your feet off the ground.",
      "Engage your back muscles and pull your body up towards the bars, keeping your elbows close to your body.",
      "Continue pulling until your chin is above the bars.",
      "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Adjust the machine to your desired weight and height. Place your hands on the parallel bars with a close grip, palms facing each other. Hang from the bars with your arms fully extended and your feet off the ground. Engage your back muscles and pull your body up towards the bars, keeping your elbows close to your body. Continue pulling until your chin is above the bars. Pause for a moment at the top, then slowly lower your body back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Regola la macchina in base al peso e all'altezza desiderati. Posiziona le mani sulle barre parallele con una presa salda, i palmi rivolti l'uno verso l'altro. Appendi alle sbarre con le braccia completamente distese e i piedi sollevati da terra. Coinvolgi i muscoli della schiena e solleva il corpo verso le sbarre, mantenendo i gomiti vicini al corpo. Continua a tirare finché il mento non è sopra le sbarre. Fai una pausa per un momento in alto, quindi abbassa lentamente il corpo fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Makineyi istediğiniz ağırlığa ve yüksekliğe ayarlayın. Ellerinizi paralel çubukların üzerine, avuç içleriniz birbirine bakacak şekilde yakın bir tutuşla yerleştirin. Kollarınız tamamen uzatılmış ve ayaklarınız yerden yukarıda olacak şekilde barlardan sarkın. Sırt kaslarınızı çalıştırın ve dirseklerinizi vücudunuza yakın tutarak vücudunuzu barlara doğru yukarı çekin. Çeneniz barların üstüne çıkana kadar çekmeye devam edin. Tepe noktasında bir an duraklayın, ardından vücudunuzu yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ajusta la máquina al peso y la altura deseados. Coloca las manos en las barras paralelas con un agarre cerrado, con las palmas mirándose entre sí. Cuélgate de las barras con los brazos completamente extendidos y los pies sin tocar el suelo. Activa los músculos de la espalda y lleva el cuerpo hacia arriba hacia las barras, manteniendo los codos cerca del cuerpo. Continúa subiendo hasta que la barbilla quede por encima de las barras. Haz una pausa por un momento en la parte superior, luego baja lentamente el cuerpo de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Настройте машину на желаемый вес и рост. Положите руки на параллельные брусья узким хватом, ладонями друг к другу. Повисните на перекладинах, полностью вытянув руки и оторвав ноги от земли. Напрягите мышцы спины и подтяните тело к перекладинам, держа локти близко к телу. Продолжайте тянуть, пока подбородок не окажется над перекладинами. Задержитесь на мгновение в верхней точке, затем медленно опустите тело обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "将机器调整到您想要的重量和高度。 将双手紧紧握在双杠上，手掌相对。 悬挂在杠上，双臂完全伸展，双脚离开地面。 收紧背部肌肉，将身体拉向杠铃，保持肘部靠近身体。 继续拉，直到下巴高于杠铃。 在顶部停顿片刻，然后慢慢将身体放回起始位置。 重复所需的重复次数。",
      "hi": "मशीन को अपने इच्छित वजन और ऊंचाई के अनुसार समायोजित करें। अपने हाथों को समानान्तर पट्टियों पर कसकर पकड़ के रखें, हथेलियाँ एक-दूसरे के सामने हों। अपनी बाहों को पूरी तरह फैलाकर और अपने पैरों को ज़मीन से ऊपर रखते हुए सलाखों से लटकें। अपनी पीठ की मांसपेशियों को शामिल करें और अपनी कोहनियों को अपने शरीर के करीब रखते हुए अपने शरीर को सलाखों की ओर ऊपर खींचें। तब तक खींचते रहें जब तक आपकी ठुड्डी सलाखों से ऊपर न आ जाए। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपने शरीर को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Ustaw maszynę na odpowiedni ciężar i wysokość. Umieść dłonie na równoległych poręczach wąskim chwytem, dłońmi zwróconymi do siebie. Zwiśnij na poręczach z rękami w pełni wyprostowanymi i stopami uniesionymi nad podłogę. Napnij mięśnie pleców i podciągnij ciało w kierunku poręczy, trzymając łokcie blisko ciała. Kontynuuj podciąganie, aż broda znajdzie się nad poręczami. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść ciało z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "머신을 원하는 무게와 높이로 조절합니다. 평행봉에 손을 좁게 올려 손바닥이 서로 마주보도록 합니다. 팔을 완전히 펴고 발을 바닥에서 들어 봉에 매달립니다. 등 근육을 긴장시키고 몸을 봉 쪽으로 위로 당기되 팔꿈치는 몸 쪽으로 가깝게 유지합니다. 턱이 봉 위로 올라갈 때까지 계속 당깁니다. 맨 위에서 잠깐 멈췄다가 천천히 몸을 시작 자세로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Règle la machine au poids et à la hauteur souhaités. Place tes mains sur les barres parallèles avec une prise serrée, les paumes tournées l'une vers l'autre. Suspends-toi aux barres, les bras complètement étendus et les pieds décollés du sol. Sollicite les muscles de ton dos et tire ton corps vers les barres, en gardant tes coudes près de ton corps. Continue à tirer jusqu'à ce que ton menton soit au-dessus des barres. Marque une pause en haut, puis abaisse lentement ton corps pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0027",
    "name": "barbell bent over row",
    "category": "back",
    "body_part": "back",
    "equipment": "barbell",
    "target": "upper back",
    "secondary_muscles": [
      "biceps",
      "forearms"
    ],
    "image": "images/0027-eZyBC3j.jpg",
    "gif_url": "videos/0027-eZyBC3j.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and knees slightly bent.",
      "Bend forward at the hips while keeping your back straight and chest up.",
      "Grasp the barbell with an overhand grip, hands slightly wider than shoulder-width apart.",
      "Pull the barbell towards your lower chest by retracting your shoulder blades and squeezing your back muscles.",
      "Pause for a moment at the top, then slowly lower the barbell back to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and knees slightly bent. Bend forward at the hips while keeping your back straight and chest up. Grasp the barbell with an overhand grip, hands slightly wider than shoulder-width apart. Pull the barbell towards your lower chest by retracting your shoulder blades and squeezing your back muscles. Pause for a moment at the top, then slowly lower the barbell back to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stai in piedi con i piedi alla larghezza delle spalle e le ginocchia leggermente piegate. Piegati in avanti sui fianchi mantenendo la schiena dritta e il petto in alto. Afferrare il bilanciere con una presa prona, con le mani leggermente più larghe della larghezza delle spalle. Tirare il bilanciere verso la parte inferiore del torace ritraendo le scapole e contraendo i muscoli della schiena. Fermati per un momento in alto, quindi abbassa lentamente il bilanciere nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız omuz genişliğinde açık ve dizleriniz hafifçe bükülü şekilde ayakta durun. Sırtınızı düz ve göğsünüzü yukarıda tutarak kalçalarınızdan öne doğru eğin. Halteri üstten kavrayarak, eller omuz genişliğinden biraz daha geniş olacak şekilde kavrayın. Kürek kemiklerinizi geri çekerek ve sırt kaslarınızı sıkarak halteri alt göğsünüze doğru çekin. Tepe noktasında bir süre duraklayın, ardından halteri yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y las rodillas ligeramente flexionadas. Inclínate hacia delante desde las caderas manteniendo la espalda recta y el pecho elevado. Agarra la barra con un agarre pronado, con las manos un poco más separadas que el ancho de los hombros. Tira de la barra hacia la parte inferior del pecho retrayendo los omóplatos y contrayendo los músculos de la espalda. Haz una pausa breve en la parte alta y luego baja lentamente la barra de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч и слегка согнуты в коленях. Наклонитесь вперед в бедрах, сохраняя спину прямой и грудь вверх. Возьмите штангу хватом сверху, руки на расстоянии чуть шире плеч. Потяните штангу к нижней части груди, сводя лопатки и напрягая мышцы спины. Задержитесь на мгновение в верхней точке, затем медленно опустите штангу обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "站立，双脚分开与肩同宽，膝盖稍微弯曲。 臀部向前弯曲，同时保持背部挺直、挺胸。 正手握住杠铃，双手间距略宽于肩宽。 通过收缩肩胛骨并挤压背部肌肉，将杠铃拉向下胸部。 在顶部停顿片刻，然后慢慢将杠铃放回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर और घुटनों को थोड़ा मोड़कर खड़े हो जाएं। अपनी पीठ सीधी और छाती ऊपर रखते हुए कूल्हों के बल आगे की ओर झुकें। बारबेल को ओवरहैंड ग्रिप से पकड़ें, हाथों को कंधे की चौड़ाई से थोड़ा चौड़ा रखें। अपने कंधे के ब्लेड को पीछे खींचकर और अपनी पीठ की मांसपेशियों को निचोड़कर बारबेल को अपनी निचली छाती की ओर खींचें। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे बारबेल को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków, kolana lekko ugięte. Pochyl tułów w biodrach, utrzymując proste plecy i uniesioną klatkę piersiową. Chwyć sztangę chwytem nachwytem, dłonie nieco szerzej niż szerokość barków. Przyciągnij sztangę w kierunku dolnej części klatki piersiowej, ściągając łopatki i napinając mięśnie grzbietu. Zatrzymaj się na chwilę na górze, a następnie powoli opuść sztangę do pozycji wyjściowej. Powtórz odpowiednią liczbę razy.",
      "ko": "발을 어깨넓이로 벌리고 무릎을 약간 구부린 상태로 섭니다. 허리를 굽혀 상체를 앞으로 숙이면서 등은 곧게 유지하고 가슴을 펼칩니다. 손가락이 앞을 향하는 그립으로 바벨을 잡고 손은 어깨넓이보다 약간 넓게 위치시킵니다. 어깨뼈를 뒤로 당기면서 등 근육을 수축시켜 바벨을 아래 가슴 쪽으로 당깁니다. 맨 위에서 잠시 멈춘 후 천천히 바벨을 시작 위치로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et les genoux légèrement fléchis. Penche-toi vers l'avant au niveau des hanches en gardant ton dos droit et ta poitrine haute. Saisis la barre avec une prise en pronation, les mains un peu plus larges que la largeur des épaules. Tire la barre vers le bas de ta poitrine en rétractant tes omoplates et en contractant les muscles de ton dos. Marque une pause en haut, puis abaisse lentement la barre pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "2330",
    "name": "cable lat pulldown full range of motion",
    "category": "back",
    "body_part": "back",
    "equipment": "cable",
    "target": "lats",
    "secondary_muscles": [
      "biceps",
      "rhomboids",
      "rear deltoids"
    ],
    "image": "images/2330-LEprlgG.jpg",
    "gif_url": "videos/2330-LEprlgG.gif",
    "instruction_steps": [
      "Sit on the lat pulldown machine with your knees positioned under the pads.",
      "Grasp the cable bar with an overhand grip, slightly wider than shoulder-width apart.",
      "Lean back slightly and keep your chest up, maintaining a slight arch in your lower back.",
      "Pull the bar down towards your upper chest, squeezing your shoulder blades together.",
      "Pause for a moment at the bottom of the movement, then slowly release the bar back to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Sit on the lat pulldown machine with your knees positioned under the pads. Grasp the cable bar with an overhand grip, slightly wider than shoulder-width apart. Lean back slightly and keep your chest up, maintaining a slight arch in your lower back. Pull the bar down towards your upper chest, squeezing your shoulder blades together. Pause for a moment at the bottom of the movement, then slowly release the bar back to the starting position. Repeat for the desired number of repetitions.",
      "it": "Siediti sulla macchina per il lat pulldown con le ginocchia posizionate sotto le protezioni. Afferra la barra con una presa sopra la mano, leggermente più larga della larghezza delle spalle. Inclinati leggermente all'indietro e tieni il petto sollevato, mantenendo un leggero arco nella parte bassa della schiena. Tira la barra verso il torace superiore, stringendo le scapole insieme. Fermati un attimo alla base del movimento, poi rilasci lentamente la barra alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
      "tr": "Dizleriniz pedlerin altına gelecek şekilde lat pulldown makinesine oturun. Kablo çubuğunu omuz genişliğinden biraz daha geniş olacak şekilde üstten kavrayın. Hafifçe geriye yaslanın ve göğsünüzü yukarıda tutun, belinizin alt kısmında hafif bir kemer tutun. Omuz bıçaklarınızı birbirine sıkıştırarak çubuğu göğsünüzün üst kısmına doğru çekin. Hareketin alt noktasında bir süre duraklayın, ardından çubuğu yavaşça başlangıç ​​pozisyonuna bırakın. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Siéntate en la máquina de jalón al pecho con las rodillas colocadas debajo de las almohadillas. Sujeta la barra del cable con un agarre prono, un poco más separado que el ancho de los hombros. Inclínate ligeramente hacia atrás y mantén el pecho elevado, conservando un ligero arco en la zona lumbar. Jala la barra hacia la parte superior del pecho, apretando los omóplatos entre sí. Haz una pausa por un momento en la parte baja del movimiento y luego suelta lentamente la barra de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Сядьте на тренажер для тяги широчайших, расположив колени под подушечками. Возьмитесь за перекладину хватом сверху, на расстоянии чуть шире ширины плеч. Слегка откиньтесь назад и держите грудь вверх, сохраняя небольшой изгиб в пояснице. Потяните штангу вниз к верхней части груди, сжимая лопатки вместе. Сделайте паузу на мгновение в нижней части движения, затем медленно отпустите штангу обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "坐在高位下拉机上，膝盖位于护垫下方。 正手握住电缆杆，握距略宽于肩宽。 稍微向后倾斜，挺胸，保持下背部轻微的拱形。 将杠铃向下拉至上胸部，将肩胛骨挤压在一起。 在动作底部暂停片刻，然后慢慢松开杠铃回到起始位置。 重复所需的重复次数。",
      "hi": "अपने घुटनों को पैड के नीचे रखकर लैट पुलडाउन मशीन पर बैठें। केबल बार को कंधे की चौड़ाई से थोड़ा अधिक चौड़े ओवरहैंड ग्रिप से पकड़ें। थोड़ा पीछे झुकें और अपनी छाती को ऊपर रखें, अपनी पीठ के निचले हिस्से में हल्का सा आर्क बनाए रखें। अपने कंधे के ब्लेड को एक साथ निचोड़ते हुए, बार को अपनी ऊपरी छाती की ओर नीचे खींचें। गति के निचले भाग पर एक पल के लिए रुकें, फिर धीरे-धीरे बार को प्रारंभिक स्थिति में वापस छोड़ दें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Usiądź na maszynie do ściągania drążka, umieszczając kolana pod wałkami. Chwyć drążek wyciągu nachwytem, nieco szerzej niż na szerokość barków. Odchyl się lekko do tyłu i trzymaj klatkę piersiową uniesioną, zachowując lekkie wygięcie w dolnej części pleców. Przyciągnij drążek w dół do górnej części klatki piersiowej, ściągając łopatki. Zatrzymaj się na moment na dole ruchu, a następnie powoli wróć z drążkiem do pozycji wyjściowej. Powtórz zalecaną liczbę powtórzeń.",
      "ko": "랫 풀다운 머신에 앉아 무릎을 패드 아래에 위치시킵니다. 케이블 바를 오버핸드 그립으로 어깨너비보다 약간 넓게 잡습니다. 약간 뒤로 기울이고 가슴을 위로 유지하면서 허리에 살짝 굽곡을 유지합니다. 바를 위팔 쪽으로 당겨 견갑골을 함께 쥡니다. 동작 아래에서 잠깐 멈추었다가 천천히 바를 시작 위치로 돌려놓습니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Assieds-toi sur la machine de tirage vertical, les genoux placés sous les coussinets. Saisis la barre du câble avec une prise en pronation, un peu plus large que la largeur des épaules. Penche-toi légèrement en arrière et garde la poitrine ouverte, en maintenant une légère cambrure dans le bas du dos. Tire la barre vers le haut de ta poitrine, en contractant tes omoplates. Marque une pause en bas du mouvement, puis relâche lentement la barre jusqu'à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0043",
    "name": "barbell full squat",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "barbell",
    "target": "glutes",
    "secondary_muscles": [
      "quadriceps",
      "hamstrings",
      "calves",
      "core"
    ],
    "image": "images/0043-qXTaZnJ.jpg",
    "gif_url": "videos/0043-qXTaZnJ.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart, toes slightly turned out.",
      "Hold the barbell across your upper back, resting it on your traps or rear delts.",
      "Engage your core and keep your chest up as you begin to lower your body down.",
      "Bend at the knees and hips, pushing your hips back and down as if sitting into a chair.",
      "Lower yourself until your thighs are parallel to the ground or slightly below.",
      "Keep your knees in line with your toes and your weight in your heels.",
      "Drive through your heels to stand back up, extending your hips and knees.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart, toes slightly turned out. Hold the barbell across your upper back, resting it on your traps or rear delts. Engage your core and keep your chest up as you begin to lower your body down. Bend at the knees and hips, pushing your hips back and down as if sitting into a chair. Lower yourself until your thighs are parallel to the ground or slightly below. Keep your knees in line with your toes and your weight in your heels. Drive through your heels to stand back up, extending your hips and knees. Repeat for the desired number of repetitions.",
      "it": "Stai con i piedi alla larghezza delle spalle, le dita leggermente rivolte verso l'esterno. Tieni il bilanciere sulla parte superiore della schiena, appoggiandolo sulle trappole o sui deltoidi posteriori. Coinvolgi il tuo core e mantieni il petto sollevato mentre inizi ad abbassare il corpo. Piega le ginocchia e i fianchi, spingendo i fianchi indietro e in basso come se fossi seduto su una sedia. Abbassati finché le cosce non sono parallele al suolo o leggermente più in basso. Tieni le ginocchia in linea con le dita dei piedi e il peso sui talloni. Spingi i talloni per rialzarti, estendendo i fianchi e le ginocchia. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız omuz genişliğinde açık, ayak parmaklarınız hafifçe dışa dönük olacak şekilde ayakta durun. Halterinizi sırtınızın üst kısmında tutun ve trapezlerinize veya arka deltalarınıza dayayın. Vücudunuzu aşağı indirmeye başladığınızda merkez bölgenizi devreye sokun ve göğsünüzü yukarıda tutun. Dizlerinizi ve kalçalarınızı bükün, sanki bir sandalyeye oturuyormuş gibi kalçalarınızı geriye ve aşağı doğru itin. Uyluklarınız yere paralel veya biraz aşağıda oluncaya kadar kendinizi indirin. Dizlerinizi ayak parmaklarınızla aynı hizada ve ağırlığınızı topuklarınızda tutun. Kalçalarınızı ve dizlerinizi uzatarak ayağa kalkmak için topuklarınızı kullanın. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros, con los dedos de los pies ligeramente hacia afuera. Sujeta la barra sobre la parte superior de la espalda, apoyándola en los trapecios o los deltoides posteriores. Activa el core y mantén el pecho elevado mientras comienzas a bajar el cuerpo. Flexiona las rodillas y las caderas, empujando las caderas hacia atrás y hacia abajo como si te sentaras en una silla. Baja hasta que los muslos queden paralelos al suelo o un poco por debajo. Mantén las rodillas alineadas con los dedos de los pies y el peso sobre los talones. Empuja con los talones para volver a ponerte de pie, extendiendo las caderas y las rodillas. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, носки слегка развернуты наружу. Держите штангу на верхней части спины, опираясь на трапеции или задние дельты. Напрягите корпус и держите грудь поднятой, когда начинаете опускать тело вниз. Согните колени и бедра, отводя бедра назад и вниз, как будто вы сидите на стуле. Опускайтесь до тех пор, пока бедра не станут параллельны земле или немного ниже. Держите колени на одной линии с пальцами ног, а вес тела перенесите на пятки. Протолкните пятки, чтобы встать обратно, выпрямляя бедра и колени. Повторите необходимое количество повторений.",
      "zh": "站立，双脚分开与肩同宽，脚趾稍微向外。 将杠铃放在上背部，将其放在斜方肌或三角肌后束上。 当你开始降低身体时，启动你的核心并保持胸部挺直。 弯曲膝盖和臀部，向后和向下推臀部，就像坐在椅子上一样。 放低身体，直到大腿与地面平行或稍低于地面。 保持膝盖与脚趾对齐，并将重量放在脚后跟上。 通过脚后跟站起来，伸展臀部和膝盖。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं, पैर की उंगलियां थोड़ी बाहर निकली हुई हों। बारबेल को अपनी ऊपरी पीठ पर पकड़ें, इसे अपने जाल या पीछे के डेल्टा पर टिकाएं। जब आप अपने शरीर को नीचे करना शुरू करें तो अपने कोर को संलग्न करें और अपनी छाती को ऊपर रखें। घुटनों और कूल्हों पर झुकें, अपने कूल्हों को पीछे और नीचे धकेलें जैसे कि कुर्सी पर बैठे हों। अपने आप को तब तक नीचे रखें जब तक आपकी जांघें ज़मीन के समानांतर या थोड़ा नीचे न हो जाएं। अपने घुटनों को अपने पंजों की सीध में रखें और अपना वजन अपनी एड़ियों पर रखें। अपने कूल्हों और घुटनों को फैलाते हुए वापस खड़े होने के लिए अपनी एड़ी से ड्राइव करें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków, z lekko rozstawionymi na zewnątrz palcami stóp. Trzymaj sztangę na górnej części pleców, opierając ją na mięśniach czworobocznych lub tylnych aktonach barków. Napnij mięśnie tułowia i utrzymuj uniesioną klatkę piersiową, rozpoczynając opuszczanie ciała. Ugnij kolana i biodra, cofając biodra w dół, jakbyś siadał na krześle. Opuszczaj się, aż uda będą równoległe do podłoża lub nieco niżej. Utrzymuj kolana w linii ze stopami, a ciężar ciała w piętach. Wypchnij się przez pięty, wracając do pozycji stojącej, prostując biodra i kolana. Powtórz odpowiednią liczbę razy.",
      "ko": "발을 어깨넓이로 벌리고 발가락을 약간 바깥쪽으로 향하게 섭니다. 바벨을 상체 뒤쪽에 올려놓으면서 승모근이나 후삼각근에 걸쳐놓습니다. 복부에 힘을 주고 가슴을 펼친 상태를 유지하면서 몸을 내리기 시작합니다. 무릎과 허리를 구부려 의자에 앉는 것처럼 허리를 뒤로 내립니다. 넓적다리가 바닥과 평행하거나 약간 아래까지 내려갑니다. 무릎이 발가락과 일직선상에 있고 체중은 발 뒤꿈치에 있는지 확인합니다. 발 뒤꿈치로 힘을 주어 일어나면서 허리와 무릎을 펼칩니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules, les orteils légèrement tournés vers l'extérieur. Tiens la barre en travers du haut de ton dos, en la faisant reposer sur tes trapèzes ou tes deltoïdes postérieurs. Gaine ta sangle abdominale et garde ta poitrine relevée pendant que tu commences à abaisser ton corps. Fléchis les genoux et les hanches en poussant tes hanches vers l'arrière et vers le bas comme si tu t'asseyais sur une chaise. Descends jusqu'à ce que tes cuisses soient parallèles au sol ou légèrement en dessous. Garde les genoux alignés avec les orteils et le poids dans les talons. Pousse sur tes talons pour te relever, en étendant tes hanches et tes genoux. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0336",
    "name": "dumbbell lunge",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "dumbbell",
    "target": "glutes",
    "secondary_muscles": [
      "quadriceps",
      "hamstrings",
      "calves"
    ],
    "image": "images/0336-RRWFUcw.jpg",
    "gif_url": "videos/0336-RRWFUcw.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart, holding a dumbbell in each hand.",
      "Take a step forward with your right foot, lowering your body into a lunge position.",
      "Keep your back straight and your chest up as you lower your body.",
      "Push through your right heel to return to the starting position.",
      "Repeat with your left leg.",
      "Alternate legs for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart, holding a dumbbell in each hand. Take a step forward with your right foot, lowering your body into a lunge position. Keep your back straight and your chest up as you lower your body. Push through your right heel to return to the starting position. Repeat with your left leg. Alternate legs for the desired number of repetitions.",
      "it": "Stai con i piedi a larghezza delle spalle, tenendo un manubrio in ciascuna mano. Fai un passo avanti con il piede destro, abbassando il corpo in posizione di affondamento. Tieni la schiena dritta e il petto sollevato mentre abbassi il corpo. Spingi attraverso il tallone destro per tornare alla posizione di partenza. Ripeti con la gamba sinistra. Alterna le gambe per il numero desiderato di ripetizioni.",
      "tr": "Ayaklarınız omuz genişliğinde açık, her iki elinizde de birer dambıl tutarak ayakta durun. Sağ ayağınızla öne doğru bir adım atın ve vücudunuzu hamle pozisyonuna indirin. Vücudunuzu indirirken sırtınızı düz ve göğsünüzü yukarıda tutun. Başlangıç ​​pozisyonuna dönmek için sağ topuğunuzu itin. Sol bacağınızla tekrarlayın. İstenilen tekrar sayısı için alternatif bacaklar.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros, sujetando una mancuerna en cada mano. Da un paso adelante con el pie derecho, bajando el cuerpo hasta una posición de zancada. Mantén la espalda recta y el pecho erguido mientras bajas el cuerpo. Empuja con el talón derecho para regresar a la posición inicial. Repite con la pierna izquierda. Alterna las piernas el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, держа в каждой руке по гантели. Сделайте шаг вперед правой ногой, опуская тело в положение выпада. При опускании тела держите спину прямо и грудь вверх. Оттолкнитесь правой пяткой, чтобы вернуться в исходное положение. Повторите с левой ногой. Чередуйте ноги необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，每只手各握一个哑铃。 右脚向前迈出一步，将身体降低至弓步位置。 降低身体时保持背部挺直、挺胸。 推动右脚跟回到起始位置。 左腿重复上述动作。 交替腿进行所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं, प्रत्येक हाथ में डम्बल पकड़ें। अपने दाहिने पैर से एक कदम आगे बढ़ाएं, अपने शरीर को नीचे झुकाकर स्थिति में लाएं। अपने शरीर को नीचे करते समय अपनी पीठ सीधी और अपनी छाती ऊपर रखें। प्रारंभिक स्थिति में लौटने के लिए अपनी दाहिनी एड़ी को धक्का दें। अपने बाएँ पैर से दोहराएँ। दोहराव की वांछित संख्या के लिए पैरों को वैकल्पिक करें।",
      "pl": "Stań w rozkroku na szerokość barków, trzymając hantle w obu rękach. Zrób krok w przód prawą nogą, opuszczając ciało do pozycji wypadu. Trzymaj proste plecy i uniesioną klatkę piersiową, opuszczając ciało. Odepchnij się prawą piętą, aby wrócić do pozycji wyjściowej. Powtórz z lewą nogą. Wykonuj naprzemiennie na obie nogi przez zalecaną liczbę powtórzeń.",
      "ko": "어깨 너비만큼 발을 벌리고 각 손에 덤벨을 들어 시작합니다. 오른발을 앞으로 내딛으며 런지 자세로 몸을 낮춥니다. 등을 쭉 펴고 가슴을 펴면서 몸을 낮춥니다. 오른발 뒤꿈치를 통해 힘을 주어 시작 위치로 돌아옵니다. 왼발로 반복합니다. 양쪽 다리를 번갈아가며 원하는 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules, en tenant un haltère dans chaque main. Fais un pas en avant avec le pied droit, en abaissant ton corps en position de fente. Garde le dos droit et la poitrine relevée pendant que tu abaisses ton corps. Pousse à travers ton talon droit pour revenir à la position de départ. Répète avec ta jambe gauche. Alterne les jambes pour le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0085",
    "name": "barbell romanian deadlift",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "barbell",
    "target": "glutes",
    "secondary_muscles": [
      "hamstrings",
      "lower back"
    ],
    "image": "images/0085-wQ2c4XD.jpg",
    "gif_url": "videos/0085-wQ2c4XD.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and your toes pointing forward.",
      "Hold the barbell with an overhand grip, hands slightly wider than shoulder-width apart.",
      "Bend at the hips, keeping your back straight and your knees slightly bent.",
      "Lower the barbell towards the ground, keeping it close to your body.",
      "Feel the stretch in your hamstrings as you lower the barbell.",
      "Once you feel a stretch in your hamstrings, push your hips forward and stand up straight.",
      "Squeeze your glutes at the top of the movement.",
      "Lower the barbell back down to the starting position and repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and your toes pointing forward. Hold the barbell with an overhand grip, hands slightly wider than shoulder-width apart. Bend at the hips, keeping your back straight and your knees slightly bent. Lower the barbell towards the ground, keeping it close to your body. Feel the stretch in your hamstrings as you lower the barbell. Once you feel a stretch in your hamstrings, push your hips forward and stand up straight. Squeeze your glutes at the top of the movement. Lower the barbell back down to the starting position and repeat for the desired number of repetitions.",
      "it": "Stai con i piedi alla larghezza delle spalle e le dita dei piedi rivolte in avanti. Tieni il bilanciere con una presa prona, con le mani leggermente più larghe della larghezza delle spalle. Piegati sui fianchi, mantenendo la schiena dritta e le ginocchia leggermente piegate. Abbassa il bilanciere verso terra, tenendolo vicino al corpo. Senti l'allungamento dei muscoli posteriori della coscia mentre abbassi il bilanciere. Una volta che senti un allungamento nei muscoli posteriori della coscia, spingi i fianchi in avanti e stai dritto. Contrai i glutei nella parte superiore del movimento. Abbassare nuovamente il bilanciere nella posizione iniziale e ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız omuz genişliğinde açık ve ayak parmaklarınız ileriyi gösterecek şekilde ayakta durun. Halteri üstten kavrayarak tutun, eller omuz genişliğinden biraz daha açık olsun. Kalçalarınızı bükün, sırtınızı düz tutun ve dizlerinizi hafifçe bükün. Halteri vücudunuza yakın tutarak yere doğru indirin. Halteri indirirken diz arkası kaslarınızın gerginliğini hissedin. Diz arkası kaslarınızın gerildiğini hissettiğinizde kalçalarınızı öne doğru itin ve dik durun. Hareketin üst noktasında kalçalarınızı sıkın. Halteri başlangıç ​​pozisyonuna indirin ve istenilen sayıda tekrar yapın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y los dedos de los pies apuntando hacia delante. Sujeta la barra con un agarre pronado, manos un poco más separadas que el ancho de los hombros. Flexiona las caderas, manteniendo la espalda recta y las rodillas ligeramente flexionadas. Baja la barra hacia el suelo, manteniéndola cerca del cuerpo. Siente el estiramiento en los isquiotibiales mientras bajas la barra. Cuando sientas el estiramiento en los isquiotibiales, empuja las caderas hacia delante y ponte de pie. Aprieta los glúteos en la parte alta del movimiento. Baja la barra de vuelta a la posición inicial y repite el número de repeticiones deseado.",
      "ru": "Встаньте, поставив ноги на ширине плеч, носки ног направлены вперед. Возьмите штангу хватом сверху, руки чуть шире плеч. Согните бедра, сохраняя спину прямой и слегка согнутыми в коленях. Опустите штангу к земле, держа ее близко к телу. Почувствуйте растяжение подколенных сухожилий, когда опускаете штангу. Как только вы почувствуете растяжение подколенных сухожилий, выдвиньте бедра вперед и встаньте прямо. Напрягите ягодицы в верхней точке движения. Опустите штангу обратно в исходное положение и повторите желаемое количество повторений.",
      "zh": "站立，双脚分开与肩同宽，脚趾指向前方。 正手握住杠铃，双手分开略宽于肩宽。 弯曲臀部，保持背部挺直，膝盖稍微弯曲。 将杠铃向地面降低，使其靠近身体。 当你降低杠铃时，感受腿筋的拉伸。 一旦感觉到腿筋拉伸，就将臀部向前推并站直。 在动作的最高点挤压臀部。 将杠铃放回起始位置，然后重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और आपके पैर की उंगलियां आगे की ओर हों। बारबेल को ओवरहैंड ग्रिप से पकड़ें, हाथों को कंधे की चौड़ाई से थोड़ा चौड़ा रखें। अपनी पीठ को सीधा रखते हुए और अपने घुटनों को थोड़ा मोड़ते हुए, कूल्हों पर झुकें। बारबेल को अपने शरीर के करीब रखते हुए जमीन की ओर नीचे करें। जैसे ही आप बारबेल को नीचे करते हैं, अपनी हैमस्ट्रिंग में खिंचाव महसूस करें। एक बार जब आप अपनी हैमस्ट्रिंग में खिंचाव महसूस करें, तो अपने कूल्हों को आगे की ओर धकेलें और सीधे खड़े हो जाएं। आंदोलन के शीर्ष पर अपने ग्लूट्स को निचोड़ें। बारबेल को वापस प्रारंभिक स्थिति में लाएँ और वांछित संख्या में दोहराव के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków, palce stóp skierowane do przodu. Chwyć sztangę chwytem nachwytem, dłonie nieco szerzej niż szerokość barków. Pochyl się w biodrach, utrzymując proste plecy i lekko ugięte kolana. Opuszczaj sztangę w kierunku podłogi, trzymając ją blisko ciała. Poczuj rozciąganie mięśni dwugłowych uda podczas opuszczania sztangi. Gdy poczujesz rozciąganie w tych mięśniach, wypchnij biodra do przodu i wyprostuj się. Ściśnij pośladki na szczycie ruchu. Opuść sztangę z powrotem do pozycji wyjściowej i powtórz odpowiednią liczbę razy.",
      "ko": "발을 어깨 너비로 벌리고 발끝은 앞을 향하도록 섭니다. 오버핸드 그립으로 바벨을 잡으며 손은 어깨 너비보다 약간 넓게 합니다. 허리에서 굽히며 등은 곧게 유지하고 무릎은 약간만 구부립니다. 바벨을 몸 가까이 유지하며 천천히 땅을 향해 내립니다. 햄스트링에 스트레칭 감각이 들 때까지 내립니다. 햄스트링에 스트레칭이 감지되면 엉덩이를 앞으로 밀어 일어섭니다. 동작 상단에서 글루트를 조입니다. 바벨을 시작 위치로 다시 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et les orteils pointés vers l'avant. Tiens la barre en prise pronation, les mains un peu plus écartées que la largeur des épaules. Fléchis les hanches en gardant ton dos droit et tes genoux légèrement fléchis. Abaisse la barre vers le sol, en la gardant près de ton corps. Sens l'étirement dans tes ischio-jambiers en abaissant la barre. Une fois que tu ressens un étirement dans tes ischio-jambiers, pousse tes hanches vers l'avant et redresse-toi. Contracte tes fessiers en haut du mouvement. Abaisse la barre jusqu'à la position de départ et répète pour le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1760",
    "name": "dumbbell goblet squat",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "dumbbell",
    "target": "quads",
    "secondary_muscles": [
      "glutes",
      "hamstrings",
      "calves"
    ],
    "image": "images/1760-yn8yg1r.jpg",
    "gif_url": "videos/1760-yn8yg1r.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart, holding a dumbbell vertically against your chest with both hands.",
      "Keeping your chest up and core engaged, lower your body down into a squat position by pushing your hips back and bending your knees.",
      "Continue lowering until your thighs are parallel to the ground, or as low as you can comfortably go.",
      "Pause for a moment at the bottom, then push through your heels to return to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart, holding a dumbbell vertically against your chest with both hands. Keeping your chest up and core engaged, lower your body down into a squat position by pushing your hips back and bending your knees. Continue lowering until your thighs are parallel to the ground, or as low as you can comfortably go. Pause for a moment at the bottom, then push through your heels to return to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stai con i piedi a larghezza delle spalle, tenendo un manubrio verticalmente contro il petto con entrambe le mani. Mantenendo il petto sollevato e il core attivo, abbassa il corpo in posizione squat spingendo indietro i fianchi e piegando le ginocchia. Continua ad abbassare finché le cosce non sono parallele al suolo, o il più in basso che puoi comodamente. Fermati un attimo in fondo, poi spingi attraverso i talloni per tornare alla posizione di partenza. Ripeti per il numero desiderato di ripetizioni.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve iki elinizle dambılı göğsünüze dik olarak tutun. Göğsünüzü yukarıda ve göbek bölgenizi meşgul tutarak, kalçalarınızı geriye doğru iterek ve dizlerinizi bükerek vücudunuzu çömelme pozisyonuna indirin. Uyluklarınız yere paralel veya rahatça gidebileceğiniz kadar alçalana kadar alçaltmaya devam edin. Altta bir an duraklayın, ardından başlangıç ​​pozisyonuna dönmek için topuklarınızı itin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros, sosteniendo una mancuerna verticalmente contra el pecho con ambas manos. Manteniendo el pecho erguido y el core activado, baja el cuerpo a una posición de sentadilla empujando las caderas hacia atrás y flexionando las rodillas. Continúa bajando hasta que los muslos queden paralelos al suelo, o tan abajo como puedas hacerlo cómodamente. Haz una pausa por un momento en la parte inferior, luego empuja con los talones para regresar a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, удерживая гантель вертикально у груди обеими руками. Удерживая грудь поднятой и напряженным корпус, опустите тело в присед, отведя бедра назад и согнув колени. Продолжайте опускаться до тех пор, пока ваши бедра не станут параллельны земле или настолько низко, насколько вам будет удобно. Задержитесь на мгновение внизу, затем оттолкнитесь пятками, чтобы вернуться в исходное положение. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，双手握住哑铃垂直放在胸前。 保持胸部挺直，核心收紧，通过向后推臀部并弯曲膝盖，将身体降低至蹲姿。 继续降低，直到大腿与地面平行，或者尽可能低。 在底部停顿片刻，然后推动脚后跟回到起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं, दोनों हाथों से डंबल को अपनी छाती पर सीधा पकड़ लें। अपनी छाती को ऊपर और कोर को व्यस्त रखते हुए, अपने कूल्हों को पीछे धकेलते हुए और अपने घुटनों को मोड़ते हुए अपने शरीर को स्क्वाट स्थिति में नीचे लाएँ। तब तक नीचे उतरना जारी रखें जब तक कि आपकी जांघें ज़मीन के समानांतर न हो जाएं, या उतना नीचे न आ जाएं जितना आप आराम से जा सकें। नीचे एक पल के लिए रुकें, फिर प्रारंभिक स्थिति में लौटने के लिए अपनी एड़ियों से धक्का दें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków, trzymając hantlę pionowo przy klatce piersiowej obiema rękami. Trzymając uniesioną klatkę piersiową i napięty brzuch, opuść ciało do przysiadu, cofając biodra i uginając kolana. Kontynuuj opuszczanie, aż uda będą równoległe do podłogi, lub tak nisko, jak pozwala Ci komfort. Zatrzymaj się na chwilę w najniższym punkcie, a następnie odepchnij się piętami, aby wrócić do pozycji wyjściowej. Powtórz zalecaną liczbę powtórzeń.",
      "ko": "어깨너비로 발을 벌리고 서서 덤벨을 양손으로 수직으로 잡아 가슴에 안깁니다. 가슴을 위로 유지하고 코어를 조이면서 엉덩이를 뒤로 밀고 무릎을 굽혀 몸을 스쿼트 자세로 내립니다. 허벅지가 지면과 평행해질 때까지 또는 편안한 범위까지 계속 내립니다. 바닥에서 잠깐 멈춘 후 발꿈치를 밀어 시작 위치로 돌아옵니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules, en tenant un haltère verticalement contre ta poitrine à deux mains. En gardant la poitrine relevée et la sangle abdominale gainée, abaisse ton corps en position de squat en poussant tes hanches vers l'arrière et en fléchissant tes genoux. Continue à descendre jusqu'à ce que tes cuisses soient parallèles au sol, ou aussi bas que tu peux confortablement aller. Marque une pause en bas, puis pousse sur tes talons pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0585",
    "name": "lever leg extension",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "leverage machine",
    "target": "quads",
    "secondary_muscles": [
      "hamstrings"
    ],
    "image": "images/0585-my33uHU.jpg",
    "gif_url": "videos/0585-my33uHU.gif",
    "instruction_steps": [
      "Adjust the seat height and backrest of the machine to fit your body.",
      "Sit on the machine with your back against the backrest and your feet on the footpad.",
      "Grasp the handles or sidebars for stability.",
      "Extend your legs forward by straightening your knees, lifting the weight.",
      "Pause for a moment at the top, then slowly lower the weight back to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Adjust the seat height and backrest of the machine to fit your body. Sit on the machine with your back against the backrest and your feet on the footpad. Grasp the handles or sidebars for stability. Extend your legs forward by straightening your knees, lifting the weight. Pause for a moment at the top, then slowly lower the weight back to the starting position. Repeat for the desired number of repetitions.",
      "it": "Regola l'altezza del sedile e lo schienale della macchina per adattarli al tuo corpo. Sedersi sulla macchina con la schiena appoggiata allo schienale e i piedi sul poggiapiedi. Afferrare le maniglie o le barre laterali per garantire stabilità. Estendi le gambe in avanti raddrizzando le ginocchia, sollevando il peso. Fermati per un momento in alto, quindi abbassa lentamente il peso nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Makinenin koltuk yüksekliğini ve sırtlığını vücudunuza göre ayarlayın. Sırtınız koltuk arkalığına dayalı ve ayaklarınız ayak tabanının üzerinde olacak şekilde makinenin üzerine oturun. Denge için tutamaçları veya kenar çubuklarını kavrayın. Ağırlığı kaldırarak dizlerinizi düzleştirerek bacaklarınızı öne doğru uzatın. Tepe noktasında bir süre duraklayın, ardından ağırlığı yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ajusta la altura del asiento y el respaldo de la máquina a tu cuerpo. Siéntate en la máquina con la espalda apoyada en el respaldo y los pies sobre la almohadilla para los pies. Sujeta las asas o las barras laterales para mayor estabilidad. Extiende las piernas hacia adelante enderezando las rodillas, levantando el peso. Haz una pausa breve en lo alto, luego baja lentamente el peso de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Отрегулируйте высоту сиденья и спинки машины в соответствии с вашим телом. Сядьте на тренажер, прислонившись спиной к спинке сиденья и положив ноги на подножку. Возьмитесь за ручки или боковые перекладины для устойчивости. Вытяните ноги вперед, выпрямив колени и подняв вес. Задержитесь на мгновение в верхней точке, затем медленно опустите вес обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "调整机器的座椅高度和靠背以适合您的身体。 坐在机器上，背部靠在靠背上，双脚放在脚垫上。 抓住手柄或侧杆以保持稳定性。 伸直膝盖，举起重物，向前伸展双腿。 在顶部暂停片刻，然后慢慢将重量放回起始位置。 重复所需的重复次数。",
      "hi": "मशीन की सीट की ऊंचाई और बैकरेस्ट को अपने शरीर के अनुरूप समायोजित करें। मशीन पर अपनी पीठ बैकरेस्ट से सटाकर और अपने पैरों को फ़ुटपैड पर रखकर बैठें। स्थिरता के लिए हैंडल या साइडबार को पकड़ें। अपने घुटनों को सीधा करके, वजन उठाते हुए अपने पैरों को आगे की ओर फैलाएँ। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे वजन वापस प्रारंभिक स्थिति में लाएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Wyreguluj wysokość siedziska i oparcie maszyny do swojej sylwetki. Usiądź na maszynie, opierając plecy o oparcie, a stopy na wałku. Chwyć uchwyty lub boczne poręcze dla stabilizacji. Wyprostuj nogi do przodu, prostując kolana i unosząc obciążenie. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść obciążenie do pozycji wyjściowej. Powtórz zadaną liczbę powtórzeń.",
      "ko": "머신의 시트 높이와 백레스트를 몸에 맞게 조정합니다. 등을 백레스트에 기대고 발을 풋패드에 올린 상태로 머신에 앉습니다. 안정성을 위해 핸들이나 사이드바를 잡습니다. 무릎을 펴서 다리를 앞으로 뻗고 무게를 들어올립니다. 상단에서 잠깐 멈춘 후, 무게를 천천히 처음 위치로 낮춥니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Règle la hauteur du siège et le dossier de la machine pour les adapter à ton corps. Assieds-toi sur la machine, le dos contre le dossier et les pieds sur le coussinet de pied. Saisis les poignées ou les barres latérales pour te stabiliser. Étends tes jambes vers l'avant en tendant les genoux, en soulevant le poids. Marque une pause en haut, puis abaisse lentement le poids pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0586",
    "name": "lever lying leg curl",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "leverage machine",
    "target": "hamstrings",
    "secondary_muscles": [
      "calves"
    ],
    "image": "images/0586-17lJ1kr.jpg",
    "gif_url": "videos/0586-17lJ1kr.gif",
    "instruction_steps": [
      "Adjust the machine to fit your body and select the desired weight.",
      "Lie face down on the machine with your legs straight and your heels against the padded lever.",
      "Grasp the handles or the sides of the machine for stability.",
      "Keeping your upper body stationary, exhale and curl your legs up as far as possible without lifting your hips off the pad.",
      "Hold the contracted position for a brief pause as you squeeze your hamstrings.",
      "Inhale and slowly lower the lever back to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Adjust the machine to fit your body and select the desired weight. Lie face down on the machine with your legs straight and your heels against the padded lever. Grasp the handles or the sides of the machine for stability. Keeping your upper body stationary, exhale and curl your legs up as far as possible without lifting your hips off the pad. Hold the contracted position for a brief pause as you squeeze your hamstrings. Inhale and slowly lower the lever back to the starting position. Repeat for the desired number of repetitions.",
      "it": "Regola la macchina per adattarla al tuo corpo e seleziona il peso desiderato. Sdraiati a faccia in giù sulla macchina con le gambe dritte e i talloni contro la leva imbottita. Afferrare le maniglie o i lati della macchina per mantenerla stabile. Mantenendo ferma la parte superiore del corpo, espira e piega le gambe il più possibile senza sollevare i fianchi dal cuscino. Mantieni la posizione contratta per una breve pausa mentre contrai i muscoli posteriori della coscia. Inspira e abbassa lentamente la leva nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Makineyi vücudunuza göre ayarlayın ve istediğiniz ağırlığı seçin. Bacaklarınız düz ve topuklarınız yastıklı kola dayanacak şekilde makinenin üzerine yüzüstü yatın. Dengeyi sağlamak için makinenin kollarını veya yanlarını tutun. Üst vücudunuzu sabit tutarak nefes verin ve kalçalarınızı yastıktan kaldırmadan bacaklarınızı mümkün olduğunca yukarı doğru kıvırın. Diz arkası kaslarınızı sıkarken kısa bir süre kasılmış pozisyonu koruyun. Nefes alın ve kolu yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ajusta la máquina a tu cuerpo y selecciona el peso deseado. Túmbate boca abajo en la máquina con las piernas rectas y los talones contra la palanca acolchada. Sujeta las asas o los lados de la máquina para mayor estabilidad. Manteniendo la parte superior del cuerpo inmóvil, exhala y flexiona las piernas hacia arriba tanto como sea posible sin levantar las caderas de la almohadilla. Mantén la posición contraída durante una pausa breve mientras aprietas los isquiotibiales. Inhala y baja lentamente la palanca de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Отрегулируйте тренажер под свое тело и выберите желаемый вес. Лягте на тренажер лицом вниз, выпрямив ноги и упираясь пятками в мягкий рычаг. Возьмитесь за ручки или боковые стороны машины для устойчивости. Удерживая верхнюю часть тела неподвижно, выдохните и согните ноги как можно выше, не отрывая бедра от подушки. Задержитесь в сокращенном положении на короткую паузу, сжимая мышцы задней поверхности бедра. Вдохните и медленно опустите рычаг обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "调整机器以适合您的身体并选择所需的重量。 面朝下躺在机器上，双腿伸直，脚跟靠在带衬垫的杠杆上。 抓住机器的手柄或侧面以保持稳定性。 保持上半身静止，呼气并尽可能向上弯曲双腿，但不要将臀部抬离垫子。 挤压腿筋时，保持收缩位置短暂停顿。 吸气并缓慢地将控制杆降低回起始位置。 重复所需的重复次数。",
      "hi": "अपने शरीर के अनुरूप मशीन को समायोजित करें और वांछित वजन का चयन करें। मशीन पर अपने पैरों को सीधा करके और अपनी एड़ियों को गद्देदार लीवर के सामने रखकर लेटें। स्थिरता के लिए मशीन के हैंडल या किनारों को पकड़ें। अपने ऊपरी शरीर को स्थिर रखते हुए, सांस छोड़ें और अपने कूल्हों को पैड से ऊपर उठाए बिना अपने पैरों को जितना संभव हो सके ऊपर की ओर मोड़ें। जब आप अपनी हैमस्ट्रिंग को निचोड़ें तो थोड़ी देर के लिए अनुबंधित स्थिति में रहें। श्वास लें और धीरे-धीरे लीवर को प्रारंभिक स्थिति में वापस लाएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Wyreguluj maszynę do swojej sylwetki i wybierz odpowiedni ciężar. Połóż się na brzuchu na maszynie, wyprostuj nogi, a pięty oprzyj o wyścielony wałek dźwigni. Chwyć uchwyty lub boki maszyny dla stabilizacji. Utrzymując górną część ciała nieruchomo, wydychaj powietrze i unieś nogi jak najdalej, nie odrywając bioder od maty. Przytrzymaj skurczoną pozycję przez chwilę, napinając mięśnie dwugłowe uda. Wdychaj powietrze i powoli opuść wałek do pozycji wyjściowej. Powtórz zadaną liczbę powtórzeń.",
      "ko": "머신을 몸에 맞게 조정하고 원하는 무게를 선택합니다. 머신에 얼굴을 아래로 향하게 하고 누워 다리를 일직선으로 펼친 후 발뒤꿈치를 패드 레버에 올립니다. 안정성을 위해 핸들이나 머신의 옆면을 잡습니다. 상체를 고정하고 숨을 내쉬면서 발을 들어올리지 않고 다리를 위로 가능한 멀리 컬업합니다. 햄스트링을 짜면서 짧은 순간 이 수축 위치를 유지합니다. 숨을 들이쉬면서 레버를 천천히 처음 위치로 낮춥니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Règle la machine pour l'adapter à ton corps et sélectionne le poids souhaité. Allonge-toi face vers le bas sur la machine, les jambes droites et les talons contre le levier rembourré. Saisis les poignées ou les côtés de la machine pour te stabiliser. En gardant le haut de ton corps immobile, expire et fléchis tes jambes le plus loin possible sans soulever tes hanches du coussin. Maintiens la position contractée pendant une brève pause en contractant tes ischio-jambiers. Inspire et abaisse lentement le levier jusqu'à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0294",
    "name": "dumbbell biceps curl",
    "category": "upper arms",
    "body_part": "upper arms",
    "equipment": "dumbbell",
    "target": "biceps",
    "secondary_muscles": [
      "forearms"
    ],
    "image": "images/0294-NbVPDMW.jpg",
    "gif_url": "videos/0294-NbVPDMW.gif",
    "instruction_steps": [
      "Stand up straight with a dumbbell in each hand, palms facing forward and arms fully extended.",
      "Keeping your upper arms stationary, exhale and curl the weights while contracting your biceps.",
      "Continue to raise the weights until your biceps are fully contracted and the dumbbells are at shoulder level.",
      "Hold the contracted position for a brief pause as you squeeze your biceps.",
      "Inhale and slowly begin to lower the dumbbells back to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand up straight with a dumbbell in each hand, palms facing forward and arms fully extended. Keeping your upper arms stationary, exhale and curl the weights while contracting your biceps. Continue to raise the weights until your biceps are fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a brief pause as you squeeze your biceps. Inhale and slowly begin to lower the dumbbells back to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stai dritto con un manubrio in ogni mano, palmi rivolti in avanti e braccia completamente estese. Mantenendo ferme le braccia superiori, espira e arriccia i pesi mentre contrahi i bicipiti. Continua ad alzare i pesi finché i bicipiti non sono completamente contratti e i manubri non sono all'altezza delle spalle. Mantieni la posizione contratta per una breve pausa mentre stringi i bicipiti. Inspira e inizia lentamente ad abbassare i manubri fino alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
      "tr": "Her iki elinizde de birer dambıl olacak şekilde dik durun, avuçlarınız öne doğru baksın ve kollarınız tamamen uzatılsın. Üst kollarınızı sabit tutarak, bicepslerinizi kasarken ağırlıkları nefes verin ve kıvırın. Bisepsleriniz tamamen kasılana ve dambıllar omuz hizasına gelene kadar ağırlıkları kaldırmaya devam edin. Bicepslerinizi sıkarken kasılmış pozisyonu kısa bir süre koruyun. Nefes alın ve dambılları yavaşça başlangıç ​​pozisyonuna indirmeye başlayın. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con una mancuerna en cada mano, con las palmas hacia adelante y los brazos completamente extendidos. Manteniendo los brazos superiores fijos, exhala y levanta el peso mientras contraes los bíceps. Continúa levantando las pesas hasta que los bíceps estén completamente contraídos y las mancuernas estén a la altura de los hombros. Mantén la posición contraída durante una breve pausa mientras aprietas los bíceps. Inhala y comienza a bajar lentamente las mancuernas de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте прямо, взяв в каждую руку по гантели, ладони направлены вперед, руки полностью выпрямлены. Удерживая плечи неподвижно, выдохните и согните гири, одновременно сокращая бицепсы. Продолжайте поднимать гири до тех пор, пока ваши бицепсы полностью не сократятся и гантели не окажутся на уровне плеч. Задержитесь в сокращенном положении на короткую паузу, одновременно сжимая бицепсы. Вдохните и медленно начните опускать гантели обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "站直，双手各握一个哑铃，手掌朝前，双臂完全伸展。 保持上臂静止，呼气并弯举哑铃，同时收缩二头肌。 继续举重，直到二头肌完全收缩并且哑铃与肩部齐平。 挤压二头肌时，保持收缩位置短暂停顿。 吸气并慢慢开始将哑铃放回起始位置。 重复所需的重复次数。",
      "hi": "प्रत्येक हाथ में डम्बल लेकर सीधे खड़े हो जाएं, हथेलियाँ आगे की ओर हों और बाहें पूरी तरह फैली हुई हों। अपनी ऊपरी बांहों को स्थिर रखते हुए, सांस छोड़ें और अपने बाइसेप्स को सिकोड़ते हुए वजन को मोड़ें। जब तक आपके बाइसेप्स पूरी तरह से सिकुड़ न जाएं और डंबल कंधे के स्तर पर न आ जाएं, तब तक वजन उठाना जारी रखें। जब आप अपने बाइसेप्स को निचोड़ते हैं तो थोड़ी देर के लिए अनुबंधित स्थिति में रहें। श्वास लें और धीरे-धीरे डम्बल को वापस प्रारंभिक स्थिति में लाना शुरू करें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań prosto, trzymając hantle w obu rękach, dłonie skierowane do przodu, ramiona całkowicie wyprostowane. Trzymając ramiona nieruchomo, wydychaj powietrze i uginaj przedramiona, napinając bicepsy. Kontynuuj unoszenie ciężarów, aż bicepsy będą w pełni napięte, a hantle znajdą się na wysokości barków. Zatrzymaj się na chwilę w napiętej pozycji, mocno napinając bicepsy. Wdychaj powietrze i powoli opuszczaj hantle do pozycji wyjściowej. Powtórz zalecaną liczbę powtórzeń.",
      "ko": "똑바로 서서 각 손에 덤벨을 하나씩 들고 손바닥이 정면을 향하고 팔은 완전히 펼친 상태입니다. 위팔을 고정하고 숨을 내쉬면서 덤벨을 컬하여 이두근을 수축시킵니다. 이두근이 완전히 수축되고 덤벨이 어깨 높이에 올 때까지 계속 올립니다. 이두근을 꽉 조여주면서 수축된 자세를 잠시 멈춥니다. 숨을 들이쉬며 천천히 덤벨을 시작 자세로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Tiens-toi bien droit avec un haltère dans chaque main, les paumes tournées vers l'avant et les bras complètement tendus. En gardant le haut des bras immobile, expire et fléchis les poids en contractant tes biceps. Continue à lever les poids jusqu'à ce que tes biceps soient complètement contractés et que les haltères soient à hauteur d'épaule. Maintiens la position contractée pendant une brève pause en contractant tes biceps. Inspire et commence lentement à abaisser les haltères jusqu'à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0031",
    "name": "barbell curl",
    "category": "upper arms",
    "body_part": "upper arms",
    "equipment": "barbell",
    "target": "biceps",
    "secondary_muscles": [
      "forearms"
    ],
    "image": "images/0031-25GPyDY.jpg",
    "gif_url": "videos/0031-25GPyDY.gif",
    "instruction_steps": [
      "Stand up straight with your feet shoulder-width apart and hold a barbell with an underhand grip, palms facing forward.",
      "Keep your elbows close to your torso and exhale as you curl the weights while contracting your biceps.",
      "Continue to raise the bar until your biceps are fully contracted and the bar is at shoulder level.",
      "Hold the contracted position for a brief pause as you squeeze your biceps.",
      "Inhale as you slowly begin to lower the bar back to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand up straight with your feet shoulder-width apart and hold a barbell with an underhand grip, palms facing forward. Keep your elbows close to your torso and exhale as you curl the weights while contracting your biceps. Continue to raise the bar until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a brief pause as you squeeze your biceps. Inhale as you slowly begin to lower the bar back to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stai dritto con i piedi alla larghezza delle spalle e tieni un bilanciere con una presa subdola, con i palmi rivolti in avanti. Tieni i gomiti vicini al busto ed espira mentre pieghi i pesi mentre contrai i bicipiti. Continua a sollevare la barra finché i bicipiti non sono completamente contratti e la barra è all'altezza delle spalle. Mantieni la posizione contratta per una breve pausa mentre contrai i bicipiti. Inspira mentre inizi lentamente ad abbassare la barra nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız omuz genişliğinde açık olacak şekilde dik durun ve halteri avuç içleriniz öne bakacak şekilde alttan kavrayarak tutun. Dirseklerinizi gövdenize yakın tutun ve bicepslerinizi kasarken ağırlıkları kıvırırken nefes verin. Bicepsleriniz tamamen kasılana ve bar omuz hizasına gelinceye kadar barı kaldırmaya devam edin. Bicepslerinizi sıkarken kasılmış pozisyonu kısa bir süre koruyun. Çubuğu yavaşça başlangıç ​​pozisyonuna indirmeye başlarken nefes alın. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y sujeta una barra con un agarre supino, con las palmas mirando hacia delante. Mantén los codos cerca del torso y exhala mientras levantas el peso contrayendo los bíceps. Continúa levantando la barra hasta que los bíceps estén completamente contraídos y la barra esté a la altura de los hombros. Mantén la posición contraída durante una breve pausa mientras aprietas los bíceps. Inhala mientras comienzas a bajar lentamente la barra de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте прямо, ноги на ширине плеч, возьмите штангу обратным хватом ладонями вперед. Держите локти близко к туловищу и выдыхайте, сгибая штангу и одновременно сокращая бицепсы. Продолжайте поднимать штангу до тех пор, пока ваши бицепсы полностью не сократятся и штанга не окажется на уровне плеч. Задержитесь в сокращенном положении на короткую паузу, одновременно сжимая бицепсы. На вдохе начните медленно опускать штангу обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "站直，双脚分开与肩同宽，反手握住杠铃，手掌朝前。 保持肘部靠近躯干，在弯举哑铃时呼气，同时收缩二头肌。 继续抬高杠铃，直到二头肌完全收缩并且杠铃与肩部齐平。 挤压二头肌时，保持收缩位置短暂停顿。 吸气，慢慢开始将杠铃放回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर सीधे खड़े हो जाएं और हथेलियां आगे की ओर रखते हुए बारबेल को हाथ से पकड़ें। अपनी कोहनियों को अपने धड़ के पास रखें और अपने बाइसेप्स को सिकोड़ते हुए वजन को मोड़ते हुए सांस छोड़ें। जब तक आपके बाइसेप्स पूरी तरह से सिकुड़ न जाएं और बार कंधे के स्तर पर न आ जाए, तब तक बार को ऊपर उठाना जारी रखें। जब आप अपने बाइसेप्स को निचोड़ते हैं तो थोड़ी देर के लिए अनुबंधित स्थिति में रहें। जैसे ही आप धीरे-धीरे बार को प्रारंभिक स्थिति में वापस लाना शुरू करते हैं, श्वास लें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań prosto, stopy rozstaw na szerokość barków, i chwyć sztangę chwytem podchwytem, dłonie skierowane do przodu. Trzymaj łokcie blisko tułowia i wydychaj powietrze, uginając ręce i napinając biceps. Unoś sztangę, aż biceps będzie w pełni napięty, a sztanga znajdzie się na wysokości barków. Zatrzymaj się na chwilę w pozycji szczytowej, mocno napinając biceps. Wdychaj powietrze, powoli opuszczając sztangę do pozycji wyjściowej. Powtórz odpowiednią liczbę razy.",
      "ko": "발을 어깨넓이로 벌리고 서서 손가락이 앞을 향하도록 바벨을 잡고 손바닥이 앞을 향하게 합니다. 팔꿈치를 몸 가까이 유지하면서 숨을 내쉬고 이두근을 수축시켜 바벨을 컬합니다. 이두근이 완전히 수축되어 바벨이 어깨 높이에 올 때까지 계속 올립니다. 수축된 상태를 잠시 유지하면서 이두근을 꽉 조입니다. 숨을 들이마시면서 천천히 바벨을 시작 위치로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Tiens-toi bien droit, les pieds écartés à la largeur des épaules, et tiens une barre en prise supination, les paumes tournées vers l'avant. Garde tes coudes près de ton torse et expire pendant que tu enroules les poids en contractant tes biceps. Continue à lever la barre jusqu'à ce que tes biceps soient complètement contractés et que la barre soit à hauteur d'épaule. Maintiens la position contractée pendant une brève pause en contractant tes biceps. Inspire pendant que tu commences lentement à abaisser la barre jusqu'à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0313",
    "name": "dumbbell hammer curl",
    "category": "upper arms",
    "body_part": "upper arms",
    "equipment": "dumbbell",
    "target": "biceps",
    "secondary_muscles": [
      "forearms"
    ],
    "image": "images/0313-slDvUAU.jpg",
    "gif_url": "videos/0313-slDvUAU.gif",
    "instruction_steps": [
      "Stand up straight with a dumbbell in each hand, palms facing your torso.",
      "Keep your elbows close to your torso and rotate the palms of your hands until they are facing forward.",
      "This will be your starting position.",
      "Now, keeping the upper arms stationary, exhale and curl the weights while contracting your biceps.",
      "Continue to raise the weights until your biceps are fully contracted and the dumbbells are at shoulder level.",
      "Hold the contracted position for a brief pause as you squeeze your biceps.",
      "Then, inhale and slowly begin to lower the dumbbells back to the starting position.",
      "Repeat for the recommended amount of repetitions."
    ],
    "instructions_all": {
      "en": "Stand up straight with a dumbbell in each hand, palms facing your torso. Keep your elbows close to your torso and rotate the palms of your hands until they are facing forward. This will be your starting position. Now, keeping the upper arms stationary, exhale and curl the weights while contracting your biceps. Continue to raise the weights until your biceps are fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a brief pause as you squeeze your biceps. Then, inhale and slowly begin to lower the dumbbells back to the starting position. Repeat for the recommended amount of repetitions.",
      "it": "Stai dritto con un manubrio in ogni mano, i palmi rivolti verso il busto. Tieni i gomiti vicini al busto e ruota i palmi delle mani finché non sono rivolti in avanti. Questa sarà la tua posizione di partenza. Ora, mantenendo ferme le braccia superiori, espira e arriccia i pesi mentre contrahi i bicipiti. Continua ad alzare i pesi finché i bicipiti non sono completamente contratti e i manubri non sono all'altezza delle spalle. Mantieni la posizione contratta per una breve pausa mentre stringi i bicipiti. Poi, inspira e inizia lentamente ad abbassare i manubri fino alla posizione iniziale. Ripeti per il numero consigliato di ripetizioni.",
      "tr": "Her iki elinizde de birer dambıl olacak şekilde dik durun, avuçlarınız gövdenize bakacak şekilde. Dirseklerinizi gövdenize yakın tutun ve avuçlarınızı öne bakana kadar döndürün. Bu sizin başlangıç ​​pozisyonunuz olacaktır. Şimdi üst kolları sabit tutarak nefes verin ve bicepslerinizi kasarken ağırlıkları kıvırın. Bisepsleriniz tamamen kasılana ve dambıllar omuz hizasına gelene kadar ağırlıkları kaldırmaya devam edin. Bicepslerinizi sıkarken kasılmış pozisyonu kısa bir süre koruyun. Daha sonra nefes alın ve dambılları yavaşça başlangıç ​​pozisyonuna indirmeye başlayın. Önerilen tekrar sayısı kadar tekrarlayın.",
      "es": "Ponte de pie con una mancuerna en cada mano, con las palmas mirando hacia el torso. Mantén los codos cerca del torso y gira las palmas de las manos hasta que queden mirando hacia adelante. Esta será tu posición inicial. Ahora, manteniendo los brazos superiores quietos, exhala y flexiona los brazos contrayendo los bíceps. Continúa levantando las pesas hasta que los bíceps estén completamente contraídos y las mancuernas estén a la altura de los hombros. Mantén la posición contraída durante una breve pausa mientras aprietas los bíceps. Luego, inhala y comienza a bajar lentamente las mancuernas de vuelta a la posición inicial. Repite el número de repeticiones recomendado.",
      "ru": "Встаньте прямо, возьмите в каждую руку по гантели, ладони обращены к туловищу. Держите локти близко к туловищу и поворачивайте ладони рук так, чтобы они смотрели вперед. Это будет ваша исходная позиция. Теперь, удерживая плечи неподвижно, выдохните и согните гантели, одновременно сокращая бицепсы. Продолжайте поднимать гири до тех пор, пока ваши бицепсы полностью не сократятся и гантели не окажутся на уровне плеч. Задержитесь в сокращенном положении на короткую паузу, одновременно сжимая бицепсы. Затем вдохните и медленно начните опускать гантели обратно в исходное положение. Повторите рекомендованное количество повторений.",
      "zh": "站直，双手各持一个哑铃，手掌朝向躯干。 保持肘部靠近躯干，并旋转手掌，直到手掌朝前。 这将是您的起始位置。 现在，保持上臂静止，呼气并卷曲哑铃，同时收缩二头肌。 继续举重，直到二头肌完全收缩并且哑铃与肩部齐平。 挤压二头肌时，保持收缩位置短暂停顿。 然后，吸气并慢慢开始将哑铃放回起始位置。 重复建议的重复次数。",
      "hi": "प्रत्येक हाथ में डम्बल लेकर सीधे खड़े हो जाएं, हथेलियाँ आपके धड़ की ओर हों। अपनी कोहनियों को अपने धड़ के पास रखें और अपने हाथों की हथेलियों को तब तक घुमाएँ जब तक वे आगे की ओर न आ जाएँ। यह आपकी प्रारंभिक स्थिति होगी. अब, ऊपरी बांहों को स्थिर रखते हुए, सांस छोड़ें और अपने बाइसेप्स को सिकोड़ते हुए वजन को मोड़ें। जब तक आपके बाइसेप्स पूरी तरह से सिकुड़ न जाएं और डंबल कंधे के स्तर पर न आ जाएं, तब तक वजन उठाना जारी रखें। जब आप अपने बाइसेप्स को निचोड़ते हैं तो थोड़ी देर के लिए अनुबंधित स्थिति में रहें। फिर, सांस लें और धीरे-धीरे डम्बल को वापस प्रारंभिक स्थिति में लाना शुरू करें। दोहराव की अनुशंसित मात्रा के लिए दोहराएँ।",
      "pl": "Stań prosto, trzymając hantle w obu rękach, dłonie skierowane do tułowia. Trzymaj łokcie blisko tułowia i obróć dłonie tak, aby były skierowane do przodu. To będzie twoja pozycja wyjściowa. Teraz, trzymając ramiona nieruchomo, wydychaj powietrze i uginaj przedramiona, napinając bicepsy. Kontynuuj unoszenie ciężarów, aż bicepsy będą w pełni napięte, a hantle znajdą się na wysokości barków. Zatrzymaj się na chwilę w napiętej pozycji, mocno napinając bicepsy. Następnie wdychaj powietrze i powoli opuszczaj hantle do pozycji wyjściowej. Powtórz zalecaną liczbę powtórzeń.",
      "ko": "곧게 서서 각 손에 덤벨을 들되 손바닥이 몸을 향하도록 합니다. 팔꿈치를 몸에 가깝게 유지하고 손바닥이 앞을 향할 때까지 손을 회전합니다. 이것이 시작 위치입니다. 상완을 고정한 상태에서 숨을 내쉬면서 이두근을 수축시키며 무게를 들어 올립니다. 이두근이 완전히 수축되고 덤벨이 어깨 높이에 올 때까지 계속 올립니다. 이두근을 수축하면서 짧은 시간 동안 수축된 자세를 유지합니다. 그런 다음 숨을 들이쉬면서 천천히 덤벨을 시작 위치로 내립니다. 권장되는 횟수만큼 반복합니다.",
      "fr": "Tiens-toi bien droit avec un haltère dans chaque main, les paumes tournées vers ton torse. Garde tes coudes près de ton torse et tourne les paumes de tes mains jusqu'à ce qu'elles soient tournées vers l'avant. Ce sera ta position de départ. Maintenant, en gardant le haut des bras immobile, expire et enroule les poids en contractant tes biceps. Continue à lever les poids jusqu'à ce que tes biceps soient complètement contractés et que les haltères soient à hauteur d'épaule. Maintiens la position contractée pendant une brève pause en contractant tes biceps. Ensuite, inspire et commence lentement à abaisser les haltères vers la position de départ. Répète le nombre de répétitions recommandé."
    }
  },
  {
    "id": "0019",
    "name": "assisted triceps dip (kneeling)",
    "category": "upper arms",
    "body_part": "upper arms",
    "equipment": "leverage machine",
    "target": "triceps",
    "secondary_muscles": [
      "chest",
      "shoulders"
    ],
    "image": "images/0019-J60bN17.jpg",
    "gif_url": "videos/0019-J60bN17.gif",
    "instruction_steps": [
      "Adjust the machine to your desired weight and height.",
      "Kneel down on the pad facing the machine, with your hands gripping the handles.",
      "Lower your body by bending your elbows, keeping your back straight and close to the machine.",
      "Pause for a moment at the bottom, then push yourself back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Adjust the machine to your desired weight and height. Kneel down on the pad facing the machine, with your hands gripping the handles. Lower your body by bending your elbows, keeping your back straight and close to the machine. Pause for a moment at the bottom, then push yourself back up to the starting position. Repeat for the desired number of repetitions.",
      "it": "Regola la macchina in base al peso e all'altezza desiderati. Inginocchiarsi sul tappetino di fronte alla macchina, con le mani che afferrano le maniglie. Abbassa il corpo piegando i gomiti, mantenendo la schiena dritta e vicina alla macchina. Fai una pausa per un momento in basso, quindi spingiti indietro fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Makineyi istediğiniz ağırlığa ve yüksekliğe ayarlayın. Elleriniz tutamaçları kavrayarak, makineye bakan ped üzerinde diz çökün. Dirseklerinizi bükerek, sırtınızı düz ve makineye yakın tutarak vücudunuzu indirin. Altta bir an duraklayın, ardından kendinizi başlangıç ​​pozisyonuna doğru itin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ajusta la máquina al peso y la altura deseados. Arrodíllate sobre la almohadilla frente a la máquina, con las manos sujetando las agarraderas. Baja el cuerpo flexionando los codos, manteniendo la espalda recta y cerca de la máquina. Haz una pausa por un momento en la parte inferior, luego empuja tu cuerpo de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Настройте машину на желаемый вес и рост. Встаньте на колени лицом к тренажеру, взявшись руками за ручки. Опустите тело, согнув локти, держа спину прямо и близко к тренажеру. Задержитесь на мгновение в нижней точке, затем вернитесь в исходное положение. Повторите необходимое количество повторений.",
      "zh": "将机器调整到您想要的重量和高度。 跪在面向机器的垫子上，双手握住手柄。 弯曲肘部降低身体，保持背部挺直并靠近机器。 在底部暂停片刻，然后将自己推回到起始位置。 重复所需的重复次数。",
      "hi": "मशीन को अपने इच्छित वजन और ऊंचाई के अनुसार समायोजित करें। मशीन के सामने पैड पर घुटने टेकें, अपने हाथों से हैंडल को पकड़ें। अपनी कोहनियों को मोड़कर, अपनी पीठ को सीधा और मशीन के पास रखते हुए अपने शरीर को नीचे लाएँ। नीचे एक पल के लिए रुकें, फिर अपने आप को वापस प्रारंभिक स्थिति में धकेलें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Ustaw maszynę na odpowiedni ciężar i wysokość. Uklęknij na poduszce przodem do maszyny, trzymając uchwyty dłońmi. Opuść ciało, uginając łokcie, utrzymując proste plecy blisko maszyny. Zatrzymaj się na chwilę w dolnej pozycji, a następnie wypchnij się z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "머신을 원하는 무게와 높이로 조정합니다. 머신을 마주보고 패드에 무릎을 꿇고 손잡이를 잡습니다. 팔꿈치를 구부려 몸을 내려가며 등을 펴서 머신에 가깝게 유지합니다. 맨 아래에서 잠깐 멈춘 후 팔을 펴서 시작 위치로 자신을 들어올립니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Règle la machine au poids et à la hauteur souhaités. Mets-toi à genoux sur le coussinet face à la machine, les mains agrippant les poignées. Abaisse ton corps en fléchissant tes coudes, en gardant ton dos droit et près de la machine. Marque une pause en bas, puis pousse-toi vers le haut jusqu'à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0241",
    "name": "cable triceps pushdown (v-bar)",
    "category": "upper arms",
    "body_part": "upper arms",
    "equipment": "cable",
    "target": "triceps",
    "secondary_muscles": [
      "forearms"
    ],
    "image": "images/0241-gAwDzB3.jpg",
    "gif_url": "videos/0241-gAwDzB3.gif",
    "instruction_steps": [
      "Attach a v-bar attachment to the cable machine at the highest setting.",
      "Stand facing the cable machine with your feet shoulder-width apart.",
      "Grasp the v-bar with an overhand grip, palms facing down, and your hands shoulder-width apart.",
      "Keep your elbows close to your sides and your upper arms stationary throughout the exercise.",
      "Engage your triceps and exhale as you push the v-bar down until your arms are fully extended.",
      "Pause for a moment at the bottom of the movement, squeezing your triceps.",
      "Inhale as you slowly return the v-bar to the starting position, maintaining control.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Attach a v-bar attachment to the cable machine at the highest setting. Stand facing the cable machine with your feet shoulder-width apart. Grasp the v-bar with an overhand grip, palms facing down, and your hands shoulder-width apart. Keep your elbows close to your sides and your upper arms stationary throughout the exercise. Engage your triceps and exhale as you push the v-bar down until your arms are fully extended. Pause for a moment at the bottom of the movement, squeezing your triceps. Inhale as you slowly return the v-bar to the starting position, maintaining control. Repeat for the desired number of repetitions.",
      "it": "Collega un attacco a V-bar alla macchina a cavo al massimo dei punti. Stai di fronte alla macchina per cavi con i piedi a larghezza delle spalle. Afferra la V-bar con una presa sopra la mano, i palmi rivolti verso il basso e le mani alla larghezza delle spalle. Tieni i gomiti vicini ai fianchi e le braccia superiori ferme durante l'esercizio. Attiva i tricipiti ed espira mentre spingi la V-bar verso il basso finché le braccia non sono completamente estese. Fermati un attimo alla base del movimento, stringendo i tricipiti. Inspira mentre riporti lentamente la V-bar alla posizione di partenza, mantenendo il controllo. Ripeti per il numero desiderato di ripetizioni.",
      "tr": "Kablo makinesine en yüksek ayarda bir v-bar eklentisi takın. Ayaklarınız omuz genişliğinde açık olacak şekilde kablo makinesine dönük durun. V-bar'ı üstten kavrayarak, avuçlarınız aşağıya bakacak şekilde ve elleriniz omuz genişliğinde açık olacak şekilde kavrayın. Egzersiz boyunca dirseklerinizi yanlarınıza yakın ve üst kollarınızı sabit tutun. Trisepslerinizi devreye sokun ve kollarınız tamamen uzayıncaya kadar V-bar'ı aşağı doğru iterken nefes verin. Hareketin alt noktasında bir an duraklayın ve tricepslerinizi sıkın. Kontrolü koruyarak V-bar'ı yavaşça başlangıç ​​pozisyonuna döndürürken nefes alın. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Coloca un accesorio en V en la máquina de cable en el ajuste más alto. Ponte de pie frente a la máquina de cable con los pies separados a la altura de los hombros. Agarra el accesorio en V con un agarre prono, con las palmas hacia abajo y las manos separadas a la altura de los hombros. Mantén los codos cerca de los costados y los brazos superiores quietos durante todo el ejercicio. Activa los tríceps y exhala mientras empujas el accesorio en V hacia abajo hasta que los brazos estén completamente extendidos. Haz una pausa breve en la parte baja del movimiento, apretando los tríceps. Inhala mientras regresas lentamente el accesorio en V a la posición inicial, manteniendo el control. Repite el número de repeticiones deseado.",
      "ru": "Прикрепите V-образную насадку к тросовому станку на самой высокой скорости. Встаньте лицом к канатному тренажеру, поставив ноги на ширине плеч. Возьмитесь за V-образную перекладину хватом сверху, ладонями вниз, руки на ширине плеч. На протяжении всего упражнения держите локти близко к бокам, а плечи неподвижными. Задействуйте трицепсы и на выдохе опускайте V-образную планку вниз, пока руки полностью не выпрямятся. Задержитесь на мгновение в нижней части движения, напрягая трицепсы. На вдохе медленно возвращайте V-образную планку в исходное положение, сохраняя контроль. Повторите необходимое количество повторений.",
      "zh": "在最高设置下将 V 形杆附件连接到电缆机上。 面对电缆机站立，双脚与肩同宽。 正手握住 V 形杆，手掌朝下，双手与肩同宽。 在整个练习过程中，保持肘部靠近身体两侧，上臂保持静止。 收紧三头肌并呼气，同时向下推 V 形杆，直到手臂完全伸展。 在动作的底部暂停片刻，挤压你的三头肌。 吸气，同时缓慢地将 V 形杆返回到起始位置，保持控制。 重复所需的重复次数。",
      "hi": "उच्चतम सेटिंग पर केबल मशीन में वी-बार अटैचमेंट संलग्न करें। अपने पैरों को कंधे की चौड़ाई से अलग रखते हुए केबल मशीन की ओर मुंह करके खड़े हो जाएं। वी-बार को ओवरहैंड ग्रिप से पकड़ें, हथेलियाँ नीचे की ओर हों और आपके हाथ कंधे की चौड़ाई से अलग हों। पूरे अभ्यास के दौरान अपनी कोहनियों को अपनी भुजाओं के पास और अपनी ऊपरी भुजाओं को स्थिर रखें। अपने ट्राइसेप्स को संलग्न करें और वी-बार को नीचे धकेलते हुए सांस छोड़ें जब तक कि आपकी भुजाएं पूरी तरह से विस्तारित न हो जाएं। अपने ट्राइसेप्स को निचोड़ते हुए, आंदोलन के निचले भाग में एक पल के लिए रुकें। श्वास लेते हुए आप नियंत्रण बनाए रखते हुए धीरे-धीरे वी-बार को प्रारंभिक स्थिति में लौटाएँ। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Podłącz uchwyt typu V do wyciągu na najwyższym ustawieniu. Stań przodem do wyciągu, ustawiając stopy na szerokość barków. Chwyć uchwyt typu V chwytem nachwytem, dłonie skierowane w dół, dłonie na szerokość barków. Trzymaj łokcie blisko tułowia, a ramiona górne nieruchome przez cały czas trwania ćwiczenia. Napnij mięśnie tricepsa i wykonaj wydech, popychając uchwyt typu V w dół, aż ramiona będą w pełni wyprostowane. Zatrzymaj się na chwilę w dolnej fazie ruchu, napinając triceps. Wykonaj wdech, powoli wracając uchwytem typu V do pozycji wyjściowej, zachowując kontrolę. Powtórz zalecaną liczbę powtórzeń.",
      "ko": "케이블 머신의 최고 높이에 V자 바 부착물을 연결합니다. 머신을 향해 서서 어깨너비만큼 발을 벌립니다. 오버그립으로 V자 바를 잡고 손바닥이 아래를 향하게 하며 손을 어깨너비만큼 벌립니다. 팔꿈치를 몸통 옆에 가깝게 유지하고 상완을 운동 전체에 걸쳐 고정합니다. 삼두근을 단련하고 숨을 내쉬면서 V자 바를 아래로 밀어 팔을 완전히 뻗을 때까지 내립니다. 동작의 최하단에서 잠시 멈춰 삼두근을 짜냅니다. 숨을 들이마시면서 V자 바를 처음 위치로 천천히 돌려놓고 조절을 유지합니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Fixe une barre en V à la machine à câble au réglage le plus haut. Tiens-toi face à la machine à câble, les pieds écartés à la largeur des épaules. Saisis la barre en V avec une prise en pronation, les paumes tournées vers le bas, et les mains écartées à la largeur des épaules. Garde tes coudes près de tes flancs et le haut de tes bras immobile tout au long de l'exercice. Contracte tes triceps et expire en poussant la barre en V vers le bas jusqu'à ce que tes bras soient complètement tendus. Marque une pause en bas du mouvement, en contractant tes triceps. Inspire pendant que tu ramènes lentement la barre en V à la position de départ, en gardant le contrôle. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0334",
    "name": "dumbbell lateral raise",
    "category": "shoulders",
    "body_part": "shoulders",
    "equipment": "dumbbell",
    "target": "delts",
    "secondary_muscles": [
      "traps"
    ],
    "image": "images/0334-DsgkuIt.jpg",
    "gif_url": "videos/0334-DsgkuIt.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and hold a dumbbell in each hand, palms facing your body.",
      "Keep your back straight and engage your core.",
      "Raise your arms out to the sides until they are parallel to the floor, keeping a slight bend in your elbows.",
      "Pause for a moment at the top, then slowly lower your arms back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and hold a dumbbell in each hand, palms facing your body. Keep your back straight and engage your core. Raise your arms out to the sides until they are parallel to the floor, keeping a slight bend in your elbows. Pause for a moment at the top, then slowly lower your arms back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stai in piedi con i piedi alla larghezza delle spalle e tieni un manubrio in ogni mano, palmi rivolti verso il corpo. Tieni la schiena dritta e attiva il core. Alza le braccia ai lati finché non sono parallele al pavimento, mantenendo una leggera piega dei gomiti. Fermati un attimo in cima, poi abbassa lentamente le braccia fino alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve avuçlarınız vücudunuza bakacak şekilde her iki elinizde bir dambıl tutun. Sırtınızı düz tutun ve çekirdeğinizi meşgul edin. Kollarınızı yere paralel olana kadar yanlara doğru kaldırın, dirseklerinizi hafif bir şekilde bükün. Tepe noktasında bir an duraklayın, ardından kollarınızı yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y sostén una mancuerna en cada mano, con las palmas hacia el cuerpo. Mantén la espalda recta y activa el core. Levanta los brazos hacia los lados hasta que queden paralelos al suelo, manteniendo una ligera flexión en los codos. Haz una pausa por un momento en la parte superior, luego baja lentamente los brazos de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, возьмите в каждую руку по гантели ладонями к телу. Держите спину прямо и задействуйте корпус. Поднимите руки в стороны до тех пор, пока они не станут параллельны полу, сохраняя небольшой изгиб в локтях. Задержитесь на мгновение в верхней точке, затем медленно опустите руки обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，双手各握一个哑铃，手掌朝向身体。 保持背部挺直并启动核心肌群。 将手臂向两侧抬起，直到与地板平行，保持肘部稍微弯曲。 在顶部暂停片刻，然后慢慢将手臂放回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई की दूरी पर फैलाकर खड़े हो जाएं और प्रत्येक हाथ में डंबल पकड़ें, हथेलियां आपके शरीर की ओर हों। अपनी पीठ सीधी रखें और अपने कोर को संलग्न रखें। अपनी कोहनियों को हल्का सा मोड़ते हुए अपनी भुजाओं को बगल की ओर तब तक उठाएं जब तक कि वे फर्श के समानांतर न हो जाएं। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपनी भुजाओं को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków i chwyć hantle w obie ręce, dłonie skierowane do ciała. Trzymaj proste plecy i napnij brzuch. Unieś ramiona na boki, aż będą równoległe do podłogi, utrzymując lekkie ugięcie w łokciach. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść ramiona do pozycji wyjściowej. Powtórz zalecaną liczbę powtórzeń.",
      "ko": "어깨 너비만큼 발을 벌리고 각 손에 덤벨을 들되 손가락이 몸 쪽을 향합니다. 등을 쭉 펴고 복부에 힘을 주어 유지합니다. 팔을 옆으로 들어올려 바닥과 평행하게 만들고 팔꿈치에 살짝 구부립니다. 정상에서 잠시 멈추었다가 팔을 천천히 시작 위치로 내립니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et tiens un haltère dans chaque main, paumes tournées vers ton corps. Garde le dos droit et gaine ta sangle abdominale. Lève tes bras sur les côtés jusqu'à ce qu'ils soient parallèles au sol, en gardant une légère flexion dans tes coudes. Marque une pause en haut, puis abaisse lentement tes bras pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "3544",
    "name": "bodyweight incline side plank",
    "category": "waist",
    "body_part": "waist",
    "equipment": "body weight",
    "target": "abs",
    "secondary_muscles": [
      "obliques",
      "shoulders"
    ],
    "image": "images/3544-5VXmnV5.jpg",
    "gif_url": "videos/3544-5VXmnV5.gif",
    "instruction_steps": [
      "Start by lying on your side with your legs extended and stacked on top of each other.",
      "Place your forearm on the ground directly below your shoulder, with your elbow bent at a 90-degree angle.",
      "Engage your core and lift your hips off the ground, creating a straight line from your head to your feet.",
      "Hold this position for the desired amount of time.",
      "Lower your hips back down to the ground and repeat on the other side."
    ],
    "instructions_all": {
      "en": "Start by lying on your side with your legs extended and stacked on top of each other. Place your forearm on the ground directly below your shoulder, with your elbow bent at a 90-degree angle. Engage your core and lift your hips off the ground, creating a straight line from your head to your feet. Hold this position for the desired amount of time. Lower your hips back down to the ground and repeat on the other side.",
      "it": "Inizia sdraiandoti su un fianco con le gambe distese e sovrapposte una sopra l'altra. Appoggia l'avambraccio a terra direttamente sotto la spalla, con il gomito piegato a 90 gradi. Attiva il core e solleva i fianchi da terra, creando una linea retta dalla testa ai piedi. Mantieni questa posizione per il tempo desiderato. Abbassa i fianchi di nuovo a terra e ripeti dall'altro lato.",
      "tr": "Bacaklarınız uzatılmış ve üst üste istiflenmiş halde yan yatarak başlayın. Dirseğiniz 90 derecelik bir açıyla bükülmüş halde ön kolunuzu doğrudan omzunuzun altına yere koyun. Merkez bölgenizi devreye sokun ve kalçalarınızı yerden kaldırın, başınızdan ayaklarınıza kadar düz bir çizgi oluşturun. Bu konumu istediğiniz süre boyunca basılı tutun. Kalçalarınızı yere indirin ve diğer tarafta tekrarlayın.",
      "es": "Comienza tumbado de lado con las piernas extendidas y apiladas una sobre la otra. Coloca el antebrazo en el suelo justo debajo del hombro, con el codo flexionado en un ángulo de 90 grados. Activa el core y levanta las caderas del suelo, formando una línea recta desde la cabeza hasta los pies. Mantén esta posición durante el tiempo deseado. Baja las caderas de nuevo al suelo y repite hacia el otro lado.",
      "ru": "Начните с того, что лягте на бок, вытянув ноги и положив их друг на друга. Положите предплечье на землю прямо под плечом, согнув локоть под углом 90 градусов. Напрягите корпус и поднимите бедра от земли, создавая прямую линию от головы до ступней. Удерживайте это положение желаемое время. Опустите бедра обратно на землю и повторите то же самое с другой стороны.",
      "zh": "首先侧躺，双腿伸展并叠放在一起。 将前臂放在肩膀正下方的地面上，肘部弯曲成 90 度角。 启动你的核心并将臀部抬离地面，从头到脚形成一条直线。 保持此位置所需的时间。 将臀部放回到地面，然后在另一侧重复。",
      "hi": "अपने पैरों को फैलाकर और एक दूसरे के ऊपर रखकर अपनी तरफ लेटकर शुरुआत करें। अपनी कोहनी को 90 डिग्री के कोण पर मोड़ते हुए अपने अग्रबाहु को सीधे अपने कंधे के नीचे जमीन पर रखें। अपने कोर को संलग्न करें और अपने कूल्हों को जमीन से ऊपर उठाएं, जिससे आपके सिर से आपके पैरों तक एक सीधी रेखा बन जाए। वांछित समय तक इस स्थिति में रहें। अपने कूल्हों को वापस ज़मीन पर टिकाएँ और दूसरी तरफ भी दोहराएँ।",
      "pl": "Zacznij, leżąc na boku, z nogami wyprostowanymi i ułożonymi jedna na drugiej. Umieść przedramię na podłodze bezpośrednio pod barkiem, z łokciem zgiętym pod kątem 90 stopni. Napnij mięśnie brzucha i unieś biodra nad podłogę, tworząc prostą linię od głowy do stóp. Przytrzymaj tę pozycję przez zadany czas. Opuść biodra z powrotem na podłogę i powtórz po drugiej stronie.",
      "ko": "옆으로 누운 자세에서 다리를 쭉 펼친 후 겹쳐 놓습니다. 전완을 어깨 바로 아래 바닥에 놓고 팔꿈치가 90도 각도가 되도록 합니다. 코어를 engaged 하고 엉덩이를 바닥에서 들어 올려 머리에서 발까지 일직선을 만듭니다. 이 자세를 원하는 시간 동안 유지합니다. 엉덩이를 바닥으로 내린 후 다른 쪽에서 반복합니다.",
      "fr": "Commence allongé sur le côté, les jambes tendues et superposées l'une sur l'autre. Place ton avant-bras au sol directement sous ton épaule, avec ton coude plié à un angle de 90 degrés. Gaine ta sangle abdominale et lève tes hanches du sol, en créant une ligne droite de ta tête à tes pieds. Maintiens cette position pendant la durée souhaitée. Redescends tes hanches jusqu'au sol et répète de l'autre côté."
    }
  },
  {
    "id": "0972",
    "name": "band bicycle crunch",
    "category": "waist",
    "body_part": "waist",
    "equipment": "band",
    "target": "abs",
    "secondary_muscles": [
      "hip flexors",
      "obliques"
    ],
    "image": "images/0972-tZkGYZ9.jpg",
    "gif_url": "videos/0972-tZkGYZ9.gif",
    "instruction_steps": [
      "Lie flat on your back with your hands behind your head and your knees bent.",
      "Lift your feet off the ground and bring your right knee towards your chest while simultaneously twisting your torso to bring your left elbow towards your right knee.",
      "Straighten your right leg while bringing your left knee towards your chest and twisting your torso to bring your right elbow towards your left knee.",
      "Continue alternating the twisting motion, as if you are pedaling a bicycle, while keeping your core engaged throughout the movement.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Lie flat on your back with your hands behind your head and your knees bent. Lift your feet off the ground and bring your right knee towards your chest while simultaneously twisting your torso to bring your left elbow towards your right knee. Straighten your right leg while bringing your left knee towards your chest and twisting your torso to bring your right elbow towards your left knee. Continue alternating the twisting motion, as if you are pedaling a bicycle, while keeping your core engaged throughout the movement. Repeat for the desired number of repetitions.",
      "it": "Sdraiati sulla schiena con le mani dietro la testa e le ginocchia piegate. Solleva i piedi da terra e porta il ginocchio destro verso il petto mentre contemporaneamente ruota il busto per portare il gomito sinistro verso il ginocchio destro. Raddrizza la gamba destra portando il ginocchio sinistro verso il petto e ruotando il busto per portare il gomito destro verso il ginocchio sinistro. Continua ad alternare il movimento di torsione, come se stessi pedalando su una bicicletta, mantenendo il core impegnato durante tutto il movimento. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Elleriniz başınızın arkasında ve dizleriniz bükülü olacak şekilde sırt üstü yatın. Ayaklarınızı yerden kaldırın ve sağ dizinizi göğsünüze doğru getirin, aynı anda gövdenizi bükerek sol dirseğinizi sağ dizinize doğru getirin. Sol dizinizi göğsünüze doğru getirirken sağ bacağınızı düzleştirin ve sağ dirseğinizi sol dizinize doğru getirmek için gövdenizi bükün. Hareket boyunca merkez bölgenizi meşgul ederken, bisiklet pedalı çeviriyormuş gibi bükme hareketini dönüşümlü olarak yapmaya devam edin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Túmbate sobre tu espalda con las manos detrás de la cabeza y las rodillas flexionadas. Levanta los pies del suelo y lleva la rodilla derecha hacia el pecho mientras simultáneamente giras el torso para llevar el codo izquierdo hacia la rodilla derecha. Estira la pierna derecha mientras llevas la rodilla izquierda hacia el pecho y giras el torso para llevar el codo derecho hacia la rodilla izquierda. Continúa alternando el movimiento de giro, como si estuvieras pedaleando una bicicleta, manteniendo el core activado durante todo el movimiento. Repite el número de repeticiones deseado.",
      "ru": "Лягте на спину, заведите руки за голову и согните колени. Поднимите ноги от земли и поднесите правое колено к груди, одновременно поворачивая туловище, чтобы поднести левый локоть к правому колену. Выпрямите правую ногу, одновременно подтягивая левое колено к груди и поворачивая туловище так, чтобы правый локоть приблизился к левому колену. Продолжайте чередовать скручивающие движения, как если бы вы крутили педали на велосипеде, сохраняя при этом корпус задействованным на протяжении всего движения. Повторите необходимое количество повторений.",
      "zh": "平躺，双手放在脑后，膝盖弯曲。 将脚抬离地面，将右膝盖靠近胸部，同时扭转躯干，将左肘靠近右膝盖。 伸直右腿，同时将左膝靠近胸部，并扭转躯干，使右肘靠近左膝。 继续交替扭转运动，就像踩自行车一样，同时在整个运动过程中保持核心参与。 重复所需的重复次数。",
      "hi": "अपने हाथों को अपने सिर के पीछे रखते हुए और अपने घुटनों को मोड़कर अपनी पीठ के बल सीधे लेट जाएँ। अपने पैरों को जमीन से ऊपर उठाएं और अपने दाहिने घुटने को अपनी छाती की ओर लाएं, साथ ही अपने धड़ को मोड़कर अपनी बाईं कोहनी को अपने दाहिने घुटने की ओर लाएं। अपने बाएं घुटने को अपनी छाती की ओर लाते हुए अपने दाहिने पैर को सीधा करें और अपनी दाहिनी कोहनी को अपने बाएं घुटने की ओर लाने के लिए अपने धड़ को मोड़ें। घुमाव की गति को बारी-बारी से जारी रखें, जैसे कि आप साइकिल को पैडल चला रहे हों, जबकि पूरे आंदोलन के दौरान अपने कोर को व्यस्त रखें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Połóż się płasko na plecach, dłonie za głową, kolana ugięte. Unieś stopy nad podłogę i przyciągnij prawe kolano w kierunku klatki piersiowej, jednocześnie skręcając tułów, aby przyciągnąć lewy łokieć do prawego kolana. Wyprostuj prawą nogę, przyciągając lewe kolano w kierunku klatki piersiowej i skręcając tułów, aby przyciągnąć prawy łokieć do lewego kolana. Kontynuuj naprzemienny ruch skrętny, przypominający pedałowanie na rowerze, utrzymując napięty brzuch przez cały czas trwania ćwiczenia. Powtórz zalecaną liczbę razy.",
      "ko": "등을 바닥에 펴고 누워 양손을 머리 뒤에 놓고 무릎을 구부립니다. 발을 바닥에서 들어올리고 오른쪽 무릎을 가슴 방향으로 당기면서 동시에 몸을 비틀어 왼쪽 팔꿈치가 오른쪽 무릎을 향하게 합니다. 오른쪽 다리를 펼치면서 왼쪽 무릎을 가슴 방향으로 당기고 동시에 몸을 비틀어 오른쪽 팔꿈치가 왼쪽 무릎을 향하게 합니다. 자전거를 타는 것처럼 비틀는 동작을 계속하면서 전체 운동 동안 코어를 활성화합니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Allonge-toi sur le dos, les mains derrière la tête et les genoux fléchis. Décolle tes pieds du sol et amène ton genou droit vers ta poitrine tout en tournant simultanément ton torse pour amener ton coude gauche vers ton genou droit. Tends la jambe droite tout en ramenant le genou gauche vers ta poitrine et en faisant pivoter ton torse pour amener le coude droit vers le genou gauche. Continue à alterner le mouvement de torsion, comme si tu pédalais à vélo, tout en gardant ta sangle abdominale gainée pendant tout le mouvement. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0472",
    "name": "hanging leg raise",
    "category": "waist",
    "body_part": "waist",
    "equipment": "body weight",
    "target": "abs",
    "secondary_muscles": [
      "hip flexors"
    ],
    "image": "images/0472-I3tsCnC.jpg",
    "gif_url": "videos/0472-I3tsCnC.gif",
    "instruction_steps": [
      "Hang from a pull-up bar with your arms fully extended and your palms facing away from you.",
      "Engage your core and lift your legs up in front of you, keeping them straight.",
      "Continue lifting until your legs are parallel to the ground or as high as you can comfortably go.",
      "Pause for a moment at the top, then slowly lower your legs back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Hang from a pull-up bar with your arms fully extended and your palms facing away from you. Engage your core and lift your legs up in front of you, keeping them straight. Continue lifting until your legs are parallel to the ground or as high as you can comfortably go. Pause for a moment at the top, then slowly lower your legs back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Appendi a una barra per trazioni con le braccia completamente distese e i palmi rivolti lontano da te. Coinvolgi il tuo core e solleva le gambe davanti a te, mantenendole dritte. Continua a sollevare finché le gambe non sono parallele al suolo o il più in alto possibile. Fai una pausa per un momento in alto, quindi abbassa lentamente le gambe fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Kollarınız tamamen uzatılmış ve avuçlarınız sizden uzağa bakacak şekilde barfiks barına asın. Merkez bölgenizi devreye sokun ve bacaklarınızı düz tutarak önünüze kaldırın. Bacaklarınız yere paralel veya rahatça çıkabildiğiniz kadar yükseğe çıkana kadar kaldırmaya devam edin. Tepe noktasında bir an duraklayın, ardından bacaklarınızı yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Cuélgate de una barra de dominadas con los brazos completamente extendidos y las palmas mirando hacia afuera. Activa el core y levanta las piernas frente a ti, manteniéndolas rectas. Continúa levantando hasta que las piernas estén paralelas al suelo o tan alto como puedas llegar cómodamente. Haz una pausa por un momento en la parte superior, luego baja lentamente las piernas de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Повисните на перекладине, полностью вытянув руки и повернув ладони от себя. Напрягите корпус и поднимите ноги перед собой, сохраняя их прямыми. Продолжайте поднимать до тех пор, пока ваши ноги не станут параллельны земле или не станут настолько высоко, насколько вы сможете комфортно подняться. Задержитесь на мгновение в верхней точке, затем медленно опустите ноги обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "悬挂在引体向上杆上，双臂完全伸展，手掌背向自己。 启动你的核心并将双腿抬起到你面前，保持伸直。 继续抬起，直到双腿与地面平行或达到您可以舒适地达到的高度。 在顶部暂停片刻，然后慢慢将双腿放回起始位置。 重复所需的重复次数。",
      "hi": "अपनी बाहों को पूरी तरह फैलाकर और अपनी हथेलियों को आपसे दूर की ओर रखते हुए पुल-अप बार से लटकें। अपने कोर को संलग्न करें और अपने पैरों को अपने सामने ऊपर उठाएं, उन्हें सीधा रखें। तब तक उठाना जारी रखें जब तक कि आपके पैर जमीन के समानांतर या उतने ऊपर न आ जाएं जितना आप आराम से जा सकें। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपने पैरों को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Zawiśnij na drążku do podciągania z w pełni wyprostowanymi ramionami, dłonie skierowane od siebie. Napnij mięśnie brzucha i unieś nogi przed sobą, trzymając je proste. Kontynuuj unoszenie, aż nogi będą równoległe do podłogi lub tak wysoko, jak potrafisz wygodnie sięgnąć. Zatrzymaj się na chwilę na górze, a następnie powoli opuść nogi z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "턱걸이 바에 팔을 완전히 펼쳐 매달립니다. 손바닥은 몸에서 멀어지는 방향으로 향합니다. 복부에 힘을 주고 다리를 앞으로 곧게 펼쳐 들어 올립니다. 다리가 지면과 평행하거나 편하게 갈 수 있는 높이까지 올립니다. 위에서 잠시 멈춘 후 천천히 다리를 시작 위치로 내립니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Suspends-toi à une barre de traction, les bras complètement étendus et les paumes tournées vers l'extérieur. Gaine ta sangle abdominale et lève tes jambes devant toi, en les gardant droites. Continue à soulever jusqu'à ce que tes jambes soient parallèles au sol ou aussi haut que tu peux confortablement aller. Marque une pause en haut, puis abaisse lentement tes jambes pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0014",
    "name": "assisted motion russian twist",
    "category": "waist",
    "body_part": "waist",
    "equipment": "medicine ball",
    "target": "abs",
    "secondary_muscles": [
      "obliques",
      "lower back"
    ],
    "image": "images/0014-r7cT9YD.jpg",
    "gif_url": "videos/0014-r7cT9YD.gif",
    "instruction_steps": [
      "Sit on the ground with your knees bent and feet flat on the floor.",
      "Hold the medicine ball with both hands in front of your chest.",
      "Lean back slightly, engaging your abs and keeping your back straight.",
      "Slowly twist your torso to the right, bringing the medicine ball towards the right side of your body.",
      "Pause for a moment, then twist your torso to the left, bringing the medicine ball towards the left side of your body.",
      "Continue alternating sides for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Sit on the ground with your knees bent and feet flat on the floor. Hold the medicine ball with both hands in front of your chest. Lean back slightly, engaging your abs and keeping your back straight. Slowly twist your torso to the right, bringing the medicine ball towards the right side of your body. Pause for a moment, then twist your torso to the left, bringing the medicine ball towards the left side of your body. Continue alternating sides for the desired number of repetitions.",
      "it": "Sedersi a terra con le ginocchia piegate e i piedi appoggiati sul pavimento. Tieni la palla medica con entrambe le mani davanti al petto. Appoggiati leggermente all'indietro, contraendo gli addominali e mantenendo la schiena dritta. Ruota lentamente il busto verso destra, portando la palla medica verso il lato destro del corpo. Fai una pausa per un momento, quindi ruota il busto verso sinistra, portando la palla medica verso il lato sinistro del corpo. Continua ad alternare i lati per il numero di ripetizioni desiderato.",
      "tr": "Dizleriniz bükülü ve ayaklarınız yere düz basacak şekilde yere oturun. Sağlık topunu iki elinizle göğsünüzün önünde tutun. Hafifçe geriye yaslanın, karın kaslarınızı çalıştırın ve sırtınızı düz tutun. Sağlık topunu vücudunuzun sağ tarafına doğru getirerek gövdenizi yavaşça sağa doğru çevirin. Bir an duraklayın, ardından gövdenizi sola doğru döndürerek sağlık topunu vücudunuzun sol tarafına getirin. İstenilen tekrar sayısı için alternatif taraflara devam edin.",
      "es": "Siéntate en el suelo con las rodillas flexionadas y los pies apoyados en el suelo. Sostén el balón medicinal con ambas manos frente al pecho. Inclínate ligeramente hacia atrás, activando el abdomen y manteniendo la espalda recta. Gira lentamente el torso hacia la derecha, llevando el balón medicinal hacia el lado derecho del cuerpo. Haz una pausa por un momento, luego gira el torso hacia la izquierda, llevando el balón medicinal hacia el lado izquierdo del cuerpo. Continúa alternando lados durante el número de repeticiones deseado.",
      "ru": "Сядьте на пол, согните колени и поставьте ступни на пол. Держите медицинский мяч обеими руками перед грудью. Слегка откиньтесь назад, напрягая пресс и держа спину прямо. Медленно поверните туловище вправо, направляя медицинский мяч к правой стороне тела. Сделайте паузу на мгновение, затем поверните туловище влево, направляя медицинский мяч к левой стороне тела. Продолжайте чередовать стороны желаемое количество повторений.",
      "zh": "坐在地上，膝盖弯曲，双脚平放在地板上。 双手将健身球放在胸前。 稍微向后倾斜，收紧腹肌并保持背部挺直。 慢慢地将你的躯干向右扭转，将健身球移向身体的右侧。 暂停片刻，然后将躯干向左扭转，将健身球移向身体左侧。 继续交替进行所需的重复次数。",
      "hi": "अपने घुटनों को मोड़कर और पैरों को फर्श पर सपाट करके जमीन पर बैठें। मेडिसिन बॉल को दोनों हाथों से अपनी छाती के सामने पकड़ें। अपने पेट को जोड़ते हुए और अपनी पीठ को सीधा रखते हुए थोड़ा पीछे झुकें। धीरे-धीरे अपने धड़ को दाईं ओर मोड़ें, दवा की गेंद को अपने शरीर के दाईं ओर लाएं। एक पल के लिए रुकें, फिर अपने धड़ को बाईं ओर मोड़ें, दवा की गेंद को अपने शरीर के बाईं ओर लाएं। दोहराव की वांछित संख्या के लिए पक्षों को बदलना जारी रखें।",
      "pl": "Usiądź na podłodze z ugiętymi kolanami i stopami płasko na podłodze. Trzymaj piłkę lekarską obiema rękami przed klatką piersiową. Odchyl się lekko do tyłu, napinając mięśnie brzucha i utrzymując proste plecy. Powoli skręć tułów w prawo, przenosząc piłkę lekarską w kierunku prawej strony ciała. Zatrzymaj się na chwilę, a następnie skręć tułów w lewo, przenosząc piłkę lekarską w kierunku lewej strony ciała. Kontynuuj naprzemienne wykonywanie ruchu przez zalecaną liczbę powtórzeń.",
      "ko": "바닥에 앉아 무릎을 구부리고 발을 바닥에 붙입니다. 메디신볼을 양손으로 가슴 앞에 들어 올립니다. 약간 뒤로 기울인 상태에서 복근을 긴장시키고 등을 곧게 펴 유지합니다. 천천히 몸통을 오른쪽으로 트위스트하여 메디신볼을 몸의 오른쪽으로 가져옵니다. 잠깐 멈춘 다음 몸통을 왼쪽으로 트위스트하며 메디신볼을 몸의 왼쪽으로 가져옵니다. 원하는 반복 횟수만큼 좌우를 번갈아가며 계속합니다.",
      "fr": "Assieds-toi au sol, les genoux fléchis et les pieds à plat sur le sol. Tiens le médecine-ball des deux mains devant ta poitrine. Penche-toi légèrement en arrière, en engageant tes abdominaux et en gardant le dos droit. Tourne lentement ton torse vers la droite, en amenant le médecine-ball vers le côté droit de ton corps. Marque une pause, puis fais pivoter ton torse vers la gauche, en amenant le médecine-ball vers le côté gauche de ton corps. Continue à alterner les côtés pour le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1160",
    "name": "burpee",
    "category": "cardio",
    "body_part": "cardio",
    "equipment": "body weight",
    "target": "cardiovascular system",
    "secondary_muscles": [
      "quadriceps",
      "hamstrings",
      "calves",
      "shoulders",
      "chest"
    ],
    "image": "images/1160-dK9394r.jpg",
    "gif_url": "videos/1160-dK9394r.gif",
    "instruction_steps": [
      "Start in a standing position with your feet shoulder-width apart.",
      "Lower your body into a squat position by bending your knees and placing your hands on the floor in front of you.",
      "Kick your feet back into a push-up position.",
      "Perform a push-up, keeping your body in a straight line.",
      "Jump your feet back into the squat position.",
      "Jump up explosively, reaching your arms overhead.",
      "Land softly and immediately lower back into a squat position to begin the next repetition."
    ],
    "instructions_all": {
      "en": "Start in a standing position with your feet shoulder-width apart. Lower your body into a squat position by bending your knees and placing your hands on the floor in front of you. Kick your feet back into a push-up position. Perform a push-up, keeping your body in a straight line. Jump your feet back into the squat position. Jump up explosively, reaching your arms overhead. Land softly and immediately lower back into a squat position to begin the next repetition.",
      "it": "Inizia in posizione eretta, con i piedi alla larghezza delle spalle. Abbassa il corpo in posizione accovacciata piegando le ginocchia e appoggiando le mani sul pavimento davanti a te. Rimetti i piedi in posizione di piegamenti. Fai una flessione, mantenendo il corpo in linea retta. Rimetti i piedi in posizione squat. Salta su esplosivamente, allungando le braccia sopra la testa. Atterra dolcemente e poi si abbassa subito in posizione accovacciato per iniziare la prossima ripetizione.",
      "tr": "Ayaklarınız omuz genişliğinde açık olacak şekilde ayakta durma pozisyonunda başlayın. Dizlerinizi bükerek ve ellerinizi önünüzde yere koyarak vücudunuzu çömelme pozisyonuna indirin. Ayaklarınızı tekrar şınav pozisyonuna getirin. Vücudunuzu düz bir çizgide tutarak şınav çekin. Ayaklarınızı tekrar çömelme pozisyonuna getirin. Patlayıcı bir şekilde zıplayın, kollarınızı başınızın üzerine uzatın. Yumuşak bir şekilde inin ve bir sonraki tekrara başlamak için hemen çömelme pozisyonuna geri dönün.",
      "es": "Comienza de pie con los pies separados a la altura de los hombros. Baja el cuerpo hacia una posición de sentadilla flexionando las rodillas y colocando las manos en el suelo frente a ti. Lleva los pies hacia atrás de una patada hasta una posición de flexión de brazos. Realiza una flexión de brazos, manteniendo el cuerpo en línea recta. Salta con los pies de vuelta a la posición de sentadilla. Salta hacia arriba explosivamente, llevando los brazos por encima de la cabeza. Aterriza suavemente y baja de inmediato a una posición de sentadilla para comenzar la siguiente repetición.",
      "ru": "Начните с положения стоя, поставив ноги на ширине плеч. Опустите тело в присед, согнув колени и положив руки на пол перед собой. Верните ноги в положение для отжимания. Выполните отжимание, удерживая тело прямой. Верните ноги в положение приседа. Резко подпрыгните вверх, вытянув руки над головой. Мягко приземлитесь и сразу же опуститесь в присед, чтобы начать следующее повторение.",
      "zh": "从站立位置开始，双脚分开与肩同宽。 弯曲膝盖并将双手放在身前的地板上，将身体降低至蹲姿。 将脚踢回到俯卧撑位置。 进行俯卧撑，保持身体呈一条直线。 将双脚跳回蹲姿。 爆发性地跳起，将双臂举过头顶。 轻轻落地并立即回到蹲姿，开始下一次重复。",
      "hi": "अपने पैरों को कंधे की चौड़ाई से अलग रखते हुए खड़े होकर शुरुआत करें। अपने घुटनों को मोड़कर और अपने हाथों को अपने सामने फर्श पर रखकर अपने शरीर को स्क्वाट स्थिति में लाएँ। अपने पैरों को वापस पुश-अप स्थिति में लाएँ। अपने शरीर को सीधी रेखा में रखते हुए पुश-अप करें। अपने पैरों को वापस स्क्वाट स्थिति में लाएँ। अपनी भुजाओं को ऊपर की ओर पहुँचाते हुए, विस्फोटक तरीके से ऊपर उठें। अगली पुनरावृत्ति शुरू करने के लिए धीरे से उतरें और तुरंत वापस बैठने की स्थिति में आ जाएँ।",
      "pl": "Zacznij w pozycji stojącej, ze stopami na szerokość barków. Opuść ciało w pozycję przysiadu, uginając kolana i kładąc dłonie na podłodze przed sobą. Wykop nogi do tyłu, przyjmując pozycję podporu do pompki. Wykonaj pompkę, trzymając ciało w prostej linii. Podskocz stopami z powrotem do pozycji przysiadu. Wyskocz gwałtownie w górę, sięgając ramionami nad głowę. Wyląduj miękko i natychmiast opuść się z powrotem w pozycję przysiadu, aby rozpocząć kolejne powtórzenie.",
      "ko": "발을 어깨 너비만큼 벌려 서서 시작합니다. 무릎을 구부려 스쿼트 자세로 내려가면서 손을 바닥 앞에 놓습니다. 발을 뒤로 차서 푸시업 자세로 만듭니다. 몸을 일직선으로 유지하면서 푸시업을 수행합니다. 발을 다시 스쿼트 자세로 당겨 옵니다. 폭발적으로 뛰어올라 팔을 머리 위로 올립니다. 부드럽게 착지한 후 즉시 스쿼트 자세로 내려가 다음 반복을 시작합니다.",
      "fr": "Commence en position debout, les pieds écartés à la largeur des épaules. Abaisse ton corps en position de squat en fléchissant tes genoux et en plaçant tes mains sur le sol devant toi. Renvoie tes pieds vers l'arrière en position de pompe. Effectue une pompe, en gardant ton corps aligné. Ramène tes pieds en sautant en position de squat. Saute vers le haut de manière explosive, en tendant les bras au-dessus de ta tête. Atterris en douceur et redescends immédiatement en position de squat pour commencer la répétition suivante."
    }
  },
  {
    "id": "2466",
    "name": "bridge - mountain climber (cross body)",
    "category": "waist",
    "body_part": "waist",
    "equipment": "body weight",
    "target": "abs",
    "secondary_muscles": [
      "glutes",
      "quadriceps",
      "hamstrings",
      "shoulders",
      "triceps"
    ],
    "image": "images/2466-9c6T1YX.jpg",
    "gif_url": "videos/2466-9c6T1YX.gif",
    "instruction_steps": [
      "Start in a high plank position with your hands directly under your shoulders and your body in a straight line.",
      "Engage your core and lift your right foot off the ground, bringing your right knee towards your left elbow.",
      "Return your right foot to the starting position and repeat the movement with your left foot towards your right elbow.",
      "Continue alternating sides, moving at a controlled pace.",
      "Keep your hips level and avoid lifting your hips too high or sagging them too low.",
      "Maintain a steady breathing pattern throughout the exercise.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Start in a high plank position with your hands directly under your shoulders and your body in a straight line. Engage your core and lift your right foot off the ground, bringing your right knee towards your left elbow. Return your right foot to the starting position and repeat the movement with your left foot towards your right elbow. Continue alternating sides, moving at a controlled pace. Keep your hips level and avoid lifting your hips too high or sagging them too low. Maintain a steady breathing pattern throughout the exercise. Repeat for the desired number of repetitions.",
      "it": "Inizia in posizione di plank alta con le mani direttamente sotto le spalle e il corpo in linea retta. Attiva il core e solleva il piede destro da terra, avvicinando il ginocchio destro al gomito sinistro. Riporta il piede destro nella posizione iniziale e ripeti il movimento con il piede sinistro verso il gomito destro. Continua ad alternare i lati, muovendoti a un ritmo controllato. Mantieni i fianchi in linea e evita di sollevarli troppo in alto o di abbassarli troppo. Mantieni un ritmo di respirazione regolare durante tutto l'esercizio. Ripeti per il numero desiderato di ripetizioni.",
      "tr": "Elleriniz doğrudan omuzlarınızın altında ve vücudunuz düz bir çizgide olacak şekilde yüksek bir plank pozisyonuyla başlayın. Merkez bölgenizi devreye sokun ve sağ ayağınızı yerden kaldırın, sağ dizinizi sol dirseğinize doğru getirin. Sağ ayağınızı başlangıç ​​pozisyonuna getirin ve sol ayağınızı sağ dirseğinize doğru hareket ettirerek hareketi tekrarlayın. Kontrollü bir hızda ilerleyerek alternatif taraflara devam edin. Kalçalarınızı düz tutun ve kalçalarınızı çok yükseğe kaldırmaktan veya çok aşağı sarkmaktan kaçının. Egzersiz boyunca sabit bir nefes alma düzeni sağlayın. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Comienza en una posición de plancha alta con las manos justo debajo de los hombros y el cuerpo en línea recta. Activa el core y levanta el pie derecho del suelo, llevando la rodilla derecha hacia el codo izquierdo. Vuelve a colocar el pie derecho en la posición inicial y repite el movimiento llevando el pie izquierdo hacia el codo derecho. Continúa alternando los lados, moviéndote a un ritmo controlado. Mantén las caderas niveladas y evita levantarlas demasiado alto o dejarlas caer demasiado bajo. Mantén un patrón de respiración constante durante todo el ejercicio. Repite el número de repeticiones deseado.",
      "ru": "Начните с позиции высокой планки, положив руки прямо под плечи, а тело образуя прямую линию. Напрягите корпус и поднимите правую ногу от земли, поднеся правое колено к левому локтю. Верните правую ногу в исходное положение и повторите движение левой ногой к правому локтю. Продолжайте чередовать стороны, двигаясь в контролируемом темпе. Держите бедра ровно, не поднимайте бедра слишком высоко и не опускайте их слишком низко. Поддерживайте ровный ритм дыхания на протяжении всего упражнения. Повторите необходимое количество повторений.",
      "zh": "从高平板支撑位置开始，双手直接放在肩膀下方，身体呈一条直线。 启动你的核心并将右脚抬离地面，将右膝移向左肘。 将右脚放回到起始位置，然后将左脚朝向右肘重复该动作。 继续交替两侧，以受控的速度移动。 保持臀部水平，避免臀部抬得太高或下垂得太低。 在整个练习过程中保持稳定的呼吸模式。 重复所需的重复次数。",
      "hi": "अपने हाथों को सीधे अपने कंधों के नीचे और अपने शरीर को एक सीधी रेखा में रखते हुए एक उच्च तख़्त स्थिति में शुरुआत करें। अपने कोर को संलग्न करें और अपने दाहिने पैर को जमीन से ऊपर उठाएं, अपने दाहिने घुटने को अपनी बाईं कोहनी की ओर लाएं। अपने दाहिने पैर को प्रारंभिक स्थिति में लौटाएँ और अपने बाएँ पैर से अपनी दाहिनी कोहनी की ओर इस क्रिया को दोहराएँ। नियंत्रित गति से आगे बढ़ते हुए, पक्षों को बदलना जारी रखें। अपने कूल्हों को समतल रखें और अपने कूल्हों को बहुत ऊपर उठाने या बहुत नीचे झुकाने से बचें। पूरे अभ्यास के दौरान एक स्थिर श्वास पैटर्न बनाए रखें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Zacznij w wysokiej pozycji deski, z dłońmi bezpośrednio pod barkami, a ciałem w prostej linii. Napnij mięśnie brzucha i unieś prawą stopę nad podłogę, przyciągając prawe kolano w kierunku lewego łokcia. Wróć prawą stopą do pozycji wyjściowej i powtórz ruch lewą stopą w kierunku prawego łokcia. Kontynuuj naprzemienne strony, poruszając się w kontrolowanym tempie. Trzymaj biodra na jednym poziomie, unikając ich zbytniego unoszenia lub opadania. Zachowaj stały rytm oddychania przez cały czas trwania ćwiczenia. Powtórz zadaną liczbę powtórzeń.",
      "ko": "손을 어깨 바로 아래 놓고 팔꿈치를 펼친 하이 플랭크 자세에서 시작합니다. 코어를 engaged 하고 오른쪽 발을 바닥에서 들어 올려 오른쪽 무릎을 왼쪽 팔꿈치 방향으로 가져옵니다. 오른쪽 발을 시작 자세로 돌아온 후 왼쪽 발을 들어 올려 왼쪽 무릎을 오른쪽 팔꿈치 방향으로 가져옵니다. 조절된 속도로 양쪽을 번갈아가며 계속합니다. 엉덩이를 수평으로 유지하면서 너무 높이 들거나 처지지 않도록 합니다. 운동 전체에서 안정적인 호흡 패턴을 유지합니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Commence en position de planche haute, les mains directement sous les épaules et le corps bien aligné. Gaine ta sangle abdominale et lève ton pied droit du sol, en amenant ton genou droit vers ton coude gauche. Ramène ton pied droit à la position de départ et répète le mouvement en amenant ton pied gauche vers ton coude droit. Continue à alterner les côtés en te déplaçant à un rythme contrôlé. Garde tes hanches à niveau et évite de les lever trop haut ou de les laisser trop s'affaisser. Maintiens une respiration régulière pendant tout l'exercice. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1372",
    "name": "barbell standing calf raise",
    "category": "lower legs",
    "body_part": "lower legs",
    "equipment": "barbell",
    "target": "calves",
    "secondary_muscles": [
      "hamstrings",
      "glutes"
    ],
    "image": "images/1372-8ozhUIZ.jpg",
    "gif_url": "videos/1372-8ozhUIZ.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and place a barbell across your upper back.",
      "Raise your heels off the ground as high as possible, using only your toes.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and place a barbell across your upper back. Raise your heels off the ground as high as possible, using only your toes. Pause for a moment at the top, then slowly lower your heels back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stai con i piedi a larghezza delle spalle e posiziona una barra sulla parte superiore della schiena. Alza i talloni da terra il più in alto possibile, usando solo le dita dei piedi. Fermati un attimo in cima, poi abbassa lentamente i talloni fino alla posizione di partenza. Ripeti per il numero desiderato di ripetizioni.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve halteri sırtınızın üst kısmına yerleştirin. Sadece ayak parmaklarınızı kullanarak topuklarınızı yerden mümkün olduğunca yükseğe kaldırın. Tepe noktasında bir an duraklayın, ardından topuklarınızı yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y coloca una barra sobre la parte superior de la espalda. Levanta los talones del suelo lo más alto posible, apoyándote solo en las puntas de los pies. Haz una pausa breve en la parte alta y luego baja lentamente los talones de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, положите штангу на верхнюю часть спины. Поднимите пятки от земли как можно выше, используя только пальцы ног. Задержитесь на мгновение в верхней точке, затем медленно опустите пятки обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，将杠铃放在上背部。 仅用脚趾将脚后跟抬离地面，尽可能高。 在顶部停顿片刻，然后慢慢降低脚后跟回到起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और अपनी पीठ के ऊपरी हिस्से पर एक बारबेल रखें। केवल अपने पैर की उंगलियों का उपयोग करते हुए, अपनी एड़ियों को जमीन से जितना संभव हो उतना ऊपर उठाएं। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपनी एड़ियों को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań ze stopami na szerokość barków i umieść sztangę na górnej części pleców. Unieś pięty nad podłogę jak najwyżej, opierając się tylko na palcach stóp. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść pięty z powrotem do pozycji wyjściowej. Powtórz zadaną liczbę powtórzeń.",
      "ko": "발을 어깨 너비로 벌리고 서서 바벨을 상체 위쪽에 올려 등 위에 올려놓습니다. 발꿈치를 지면에서 최대한 높이 들어올려 발가락으로만 지탱합니다. 가장 높은 지점에서 잠시 멈춘 후 천천히 발꿈치를 시작 위치로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et place une barre en travers du haut de ton dos. Lève tes talons du sol aussi haut que possible en utilisant uniquement la pointe des pieds. Marque une pause en haut, puis abaisse lentement tes talons pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "3294",
    "name": "archer push up",
    "category": "chest",
    "body_part": "chest",
    "equipment": "body weight",
    "target": "pectorals",
    "secondary_muscles": [
      "triceps",
      "shoulders",
      "core"
    ],
    "image": "images/3294-A9qxk2F.jpg",
    "gif_url": "videos/3294-A9qxk2F.gif",
    "instruction_steps": [
      "Start in a push-up position with your hands slightly wider than shoulder-width apart.",
      "Extend one arm straight out to the side, parallel to the ground.",
      "Lower your body by bending your elbows, keeping your back straight and core engaged.",
      "Push back up to the starting position.",
      "Repeat on the other side, extending the opposite arm out to the side.",
      "Continue alternating sides for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Start in a push-up position with your hands slightly wider than shoulder-width apart. Extend one arm straight out to the side, parallel to the ground. Lower your body by bending your elbows, keeping your back straight and core engaged. Push back up to the starting position. Repeat on the other side, extending the opposite arm out to the side. Continue alternating sides for the desired number of repetitions.",
      "it": "Inizia in una posizione push-up con le mani leggermente più larghe della larghezza delle spalle. Estendi un braccio di lato, parallelo al suolo. Abbassa il corpo piegando i gomiti, mantenendo la schiena dritta e il core impegnato. Spingi indietro fino alla posizione di partenza. Ripeti dall'altro lato, estendendo il braccio opposto lateralmente. Continua ad alternare i lati per il numero di ripetizioni desiderato.",
      "tr": "Elleriniz omuz genişliğinden biraz daha geniş olacak şekilde şınav pozisyonuna başlayın. Bir kolunuzu yere paralel olarak yana doğru uzatın. Dirseklerinizi bükerek, sırtınızı düz ve göbek bölgenizi meşgul tutarak vücudunuzu indirin. Başlangıç ​​pozisyonuna kadar geriye doğru itin. Karşı kolu yana doğru uzatarak diğer tarafta da tekrarlayın. İstenilen tekrar sayısı için alternatif taraflara devam edin.",
      "es": "Comienza en posición de flexión de brazos con las manos un poco más separadas que el ancho de los hombros. Extiende un brazo hacia el lado, paralelo al suelo. Baja el cuerpo flexionando los codos, manteniendo la espalda recta y el core activado. Empuja hacia arriba para volver a la posición inicial. Repite del otro lado, extendiendo el brazo opuesto hacia el lado. Continúa alternando lados durante el número de repeticiones deseado.",
      "ru": "Начните с позиции отжимания, поставив руки чуть шире ширины плеч. Вытяните одну руку прямо в сторону, параллельно земле. Опустите тело, согнув локти, сохраняя спину прямой и напряженным корпусом. Вернитесь в исходное положение. Повторите то же самое с другой стороны, вытягивая противоположную руку в сторону. Продолжайте чередовать стороны желаемое количество повторений.",
      "zh": "从俯卧撑位置开始，双手分开略宽于肩宽。 将一只手臂伸直至一侧，与地面平行。 弯曲肘部降低身体，保持背部挺直，核心参与。 推回到起始位置。 在另一侧重复上述步骤，将另一只手臂伸出到一侧。 继续交替进行所需的重复次数。",
      "hi": "अपने हाथों को कंधे की चौड़ाई से थोड़ा चौड़ा रखते हुए पुश-अप स्थिति से शुरुआत करें। एक हाथ को ज़मीन के समानांतर बगल की ओर सीधा फैलाएँ। अपनी कोहनियों को मोड़कर, अपनी पीठ को सीधा और कोर को व्यस्त रखते हुए अपने शरीर को नीचे लाएँ। प्रारंभिक स्थिति में वापस पुश करें। दूसरी ओर दोहराएं, विपरीत भुजा को बगल की ओर फैलाएं। दोहराव की वांछित संख्या के लिए पक्षों को बदलना जारी रखें।",
      "pl": "Ustaw się w pozycji pompki z dłońmi nieco szerzej niż na szerokość barków. Wyciągnij jedną rękę prosto w bok, równolegle do podłogi. Opuść ciało, uginając łokcie, utrzymując proste plecy i napięty brzuch. Odepchnij się z powrotem do pozycji wyjściowej. Powtórz po drugiej stronie, wyciągając drugą rękę w bok. Kontynuuj naprzemienne wykonywanie ruchu przez zalecaną liczbę powtórzeń.",
      "ko": "팔굽혀펴기 자세로 시작하되 손이 어깨 넓이보다 약간 넓게 벌어집니다. 한쪽 팔을 곧게 펴 바닥과 평행하게 옆으로 뻗습니다. 팔꿈치를 구부려 몸을 내리되 등을 곧게 펴고 복근을 긴장시킵니다. 시작 자세로 밀어 올립니다. 반대쪽 팔을 옆으로 펴 같은 동작을 반복합니다. 원하는 반복 횟수만큼 좌우를 번갈아가며 계속합니다.",
      "fr": "Commence en position de pompe, les mains un peu plus écartées que la largeur des épaules. Étends un bras droit sur le côté, parallèle au sol. Abaisse ton corps en fléchissant tes coudes, en gardant ton dos droit et ta sangle abdominale gainée. Repousse-toi vers la position de départ. Répète de l'autre côté en étendant le bras opposé sur le côté. Continue à alterner les côtés pour le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1716",
    "name": "assisted seated pectoralis major stretch with stability ball",
    "category": "chest",
    "body_part": "chest",
    "equipment": "assisted",
    "target": "pectorals",
    "secondary_muscles": [
      "shoulders",
      "triceps"
    ],
    "image": "images/1716-RoV1Rfa.jpg",
    "gif_url": "videos/1716-RoV1Rfa.gif",
    "instruction_steps": [
      "Sit on a stability ball with your feet flat on the ground and your back straight.",
      "Hold a stability ball with both hands and extend your arms straight out in front of you.",
      "Slowly lower the stability ball towards your chest, feeling a stretch in your pectoral muscles.",
      "Hold the stretch for a few seconds, then slowly return to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Sit on a stability ball with your feet flat on the ground and your back straight. Hold a stability ball with both hands and extend your arms straight out in front of you. Slowly lower the stability ball towards your chest, feeling a stretch in your pectoral muscles. Hold the stretch for a few seconds, then slowly return to the starting position. Repeat for the desired number of repetitions.",
      "it": "Siediti su una palla stabilizzata con i piedi appoggiati a terra e la schiena dritta. Tieni una palla stabilizzante con entrambe le mani ed estendi le braccia davanti a te. Abbassa lentamente la sfera di stabilità verso il petto, avvertendo un allungamento dei muscoli pettorali. Mantieni la posizione per alcuni secondi, quindi torna lentamente alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız yere düz basacak ve sırtınız düz olacak şekilde bir stabilite topunun üzerine oturun. Denge topunu iki elinizle tutun ve kollarınızı düz bir şekilde önünüze doğru uzatın. Göğüs kaslarınızın gerildiğini hissederek stabilite topunu yavaşça göğsünüze doğru indirin. Gerdirmeyi birkaç saniye basılı tutun, ardından yavaşça başlangıç ​​pozisyonuna dönün. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Siéntate sobre un balón de estabilidad con los pies apoyados en el suelo y la espalda recta. Sostén un balón de estabilidad con ambas manos y extiende los brazos rectos frente a ti. Baja lentamente el balón de estabilidad hacia el pecho, sintiendo un estiramiento en los pectorales. Mantén el estiramiento durante unos segundos, luego regresa lentamente a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Сядьте на мяч, поставив ноги на землю и выпрямив спину. Возьмите мяч для стабилизации обеими руками и вытяните руки прямо перед собой. Медленно опустите мяч-стабилизатор к груди, чувствуя растяжение грудных мышц. Удерживайте растяжку несколько секунд, затем медленно вернитесь в исходное положение. Повторите необходимое количество повторений.",
      "zh": "坐在稳定球上，双脚平放在地面上，背部挺直。 双手握住稳定球，并将双臂伸直至身前。 慢慢地将稳定球降低到胸部，感受胸肌的拉伸。 保持伸展几秒钟，然后慢慢回到起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को ज़मीन पर सपाट और अपनी पीठ को सीधा रखते हुए एक स्टेबिलिटी बॉल पर बैठें। दोनों हाथों से एक स्टेबिलिटी बॉल पकड़ें और अपनी भुजाओं को अपने सामने सीधा फैलाएँ। अपनी पेक्टोरल मांसपेशियों में खिंचाव महसूस करते हुए धीरे-धीरे स्टेबिलिटी बॉल को अपनी छाती की ओर नीचे लाएँ। कुछ सेकंड के लिए खिंचाव बनाए रखें, फिर धीरे-धीरे प्रारंभिक स्थिति में लौट आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Usiądź na piłce stabilizacyjnej ze stopami płasko na podłodze i prostymi plecami. Trzymaj piłkę stabilizacyjną obiema rękami i wyciągnij ramiona prosto przed siebie. Powoli opuść piłkę w kierunku klatki piersiowej, odczuwając rozciąganie w mięśniach piersiowych. Utrzymaj rozciąganie przez kilka sekund, a następnie powoli wróć do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "짐볼에 앉아 발을 바닥에 평평하게 놓고 등을 펴서 바른 자세를 유지합니다. 짐볼을 양손으로 잡고 팔을 앞으로 곧게 펼칩니다. 짐볼을 가슴 쪽으로 천천히 내려 가슴 근육에서 스트레칭을 느낍니다. 몇 초 동안 스트레칭을 유지한 후 천천히 시작 위치로 돌아옵니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Assieds-toi sur un ballon de stabilité, les pieds à plat sur le sol et le dos droit. Tiens un ballon de stabilité des deux mains et étends tes bras droit devant toi. Abaisse lentement le ballon de stabilité vers ta poitrine, en ressentant un étirement dans tes muscles pectoraux. Maintiens l'étirement pendant quelques secondes, puis reviens lentement à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "2364",
    "name": "assisted wide-grip chest dip (kneeling)",
    "category": "chest",
    "body_part": "chest",
    "equipment": "leverage machine",
    "target": "pectorals",
    "secondary_muscles": [
      "triceps",
      "shoulders"
    ],
    "image": "images/2364-PnZJIrk.jpg",
    "gif_url": "videos/2364-PnZJIrk.gif",
    "instruction_steps": [
      "Adjust the machine to your desired height and secure your knees on the pad.",
      "Grasp the handles with a wide grip and keep your elbows slightly bent.",
      "Lower your body by bending your elbows until your upper arms are parallel to the floor.",
      "Push yourself back up to the starting position by extending your arms.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Adjust the machine to your desired height and secure your knees on the pad. Grasp the handles with a wide grip and keep your elbows slightly bent. Lower your body by bending your elbows until your upper arms are parallel to the floor. Push yourself back up to the starting position by extending your arms. Repeat for the desired number of repetitions.",
      "it": "Regola la macchina all'altezza desiderata e fissa le ginocchia sul cuscinetto. Afferrare le maniglie con una presa ampia e tenere i gomiti leggermente piegati. Abbassa il corpo piegando i gomiti finché la parte superiore delle braccia non è parallela al pavimento. Spingiti indietro fino alla posizione di partenza estendendo le braccia. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Makineyi istediğiniz yüksekliğe ayarlayın ve dizlerinizi yastığa sabitleyin. Tutma yerlerini geniş bir tutuşla kavrayın ve dirseklerinizi hafifçe bükülü tutun. Üst kollarınız yere paralel oluncaya kadar dirseklerinizi bükerek vücudunuzu indirin. Kollarınızı uzatarak kendinizi başlangıç ​​pozisyonuna doğru itin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ajusta la máquina a la altura deseada y asegura las rodillas sobre la almohadilla. Agarra las agarraderas con un agarre amplio y mantén los codos ligeramente flexionados. Baja el cuerpo flexionando los codos hasta que los brazos queden paralelos al suelo. Empuja tu cuerpo de vuelta a la posición inicial extendiendo los brazos. Repite el número de repeticiones deseado.",
      "ru": "Отрегулируйте машину на желаемую высоту и зафиксируйте колени на подставке. Возьмитесь за рукоятки широким хватом и держите локти слегка согнутыми. Опустите тело, сгибая локти, пока плечи не станут параллельны полу. Вернитесь в исходное положение, вытянув руки. Повторите необходимое количество повторений.",
      "zh": "将机器调整到您想要的高度，并将膝盖固定在垫子上。 宽握手柄并保持肘部稍微弯曲。 弯曲肘部降低身体，直到上臂与地板平行。 伸展双臂，将自己推回到起始位置。 重复所需的重复次数。",
      "hi": "मशीन को अपनी इच्छित ऊंचाई पर समायोजित करें और अपने घुटनों को पैड पर सुरक्षित करें। हैंडल को चौड़ी पकड़ से पकड़ें और अपनी कोहनियों को थोड़ा मोड़कर रखें। अपनी कोहनियों को मोड़कर अपने शरीर को तब तक नीचे लाएँ जब तक कि आपकी ऊपरी भुजाएँ फर्श के समानांतर न हो जाएँ। अपनी भुजाओं को फैलाकर अपने आप को प्रारंभिक स्थिति में वापस धकेलें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Ustaw maszynę na odpowiednią wysokość i oprzyj kolana na poduszce. Chwyć uchwyty szerokim chwytem, utrzymując łokcie lekko ugięte. Opuść ciało, uginając łokcie, aż ramiona będą równoległe do podłogi. Wypchnij się z powrotem do pozycji wyjściowej, prostując ramiona. Powtórz zalecaną liczbę razy.",
      "ko": "머신을 원하는 높이로 조정하고 무릎을 패드에 고정시킵니다. 넓은 그립으로 손잡이를 잡고 팔꿈치를 약간 구부린 상태로 유지합니다. 팔꿈치를 구부려 몸을 내려가 위팔이 바닥과 평행이 될 때까지 내립니다. 팔을 펴서 시작 위치로 자신을 들어올립니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Règle la machine à la hauteur souhaitée et cale tes genoux sur le coussin. Saisis les poignées avec une prise large et garde les coudes légèrement fléchis. Abaisse ton corps en fléchissant tes coudes jusqu'à ce que le haut de tes bras soit parallèle au sol. Repousse-toi vers le haut jusqu'à la position de départ en étendant tes bras. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1254",
    "name": "band bench press",
    "category": "chest",
    "body_part": "chest",
    "equipment": "band",
    "target": "pectorals",
    "secondary_muscles": [
      "triceps",
      "shoulders"
    ],
    "image": "images/1254-khlHMqs.jpg",
    "gif_url": "videos/1254-khlHMqs.gif",
    "instruction_steps": [
      "Lie flat on a bench with your feet flat on the ground and your back pressed against the bench.",
      "Grasp the band handles with an overhand grip, slightly wider than shoulder-width apart.",
      "Extend your arms fully, pushing the bands away from your chest.",
      "Slowly lower the bands back down to your chest, keeping your elbows at a 90-degree angle.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Lie flat on a bench with your feet flat on the ground and your back pressed against the bench. Grasp the band handles with an overhand grip, slightly wider than shoulder-width apart. Extend your arms fully, pushing the bands away from your chest. Slowly lower the bands back down to your chest, keeping your elbows at a 90-degree angle. Repeat for the desired number of repetitions.",
      "it": "Sdraiati su una panca con i piedi appoggiati a terra e la schiena premuta contro la panca. Afferrare le maniglie della fascia con una presa prona, leggermente più larghe della larghezza delle spalle. Estendi completamente le braccia, allontanando le fasce dal petto. Abbassa lentamente le fasce fino al petto, mantenendo i gomiti ad un angolo di 90 gradi. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız yere düz basacak ve sırtınız banka yaslanacak şekilde bir bankın üzerine düz bir şekilde uzanın. Bandın saplarını omuz genişliğinden biraz daha geniş olacak şekilde üstten kavrayın. Bantları göğsünüzden uzağa doğru iterek kollarınızı tamamen uzatın. Dirseklerinizi 90 derecelik bir açıda tutarak bantları yavaşça göğsünüze doğru indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Túmbate sobre un banco con los pies apoyados en el suelo y la espalda presionada contra el banco. Agarra las agarraderas de la banda con un agarre prono, un poco más separadas que el ancho de los hombros. Extiende los brazos por completo, empujando las bandas alejándolas del pecho. Baja lentamente las bandas de vuelta hacia el pecho, manteniendo los codos en un ángulo de 90 grados. Repite el número de repeticiones deseado.",
      "ru": "Лягте на скамью, поставьте ступни на землю и прижмите спину к скамье. Возьмитесь за рукоятки ленты верхним хватом, на расстоянии чуть шире плеч. Полностью выпрямите руки, отталкивая ленты от груди. Медленно опустите ленты обратно к груди, держа локти под углом 90 градусов. Повторите необходимое количество повторений.",
      "zh": "平躺在长凳上，双脚平放在地上，背部紧贴长凳。 正手握住带子手柄，间距略宽于肩宽。 充分伸展双臂，将弹力带推离胸部。 慢慢将弹力带放回到胸部，保持肘部呈 90 度角。 重复所需的重复次数。",
      "hi": "एक बेंच पर सीधे लेट जाएं और आपके पैर जमीन पर सपाट हों और आपकी पीठ बेंच से सटी हुई हो। बैंड के हैंडल को कंधे की चौड़ाई से थोड़ा अधिक चौड़े ओवरहैंड ग्रिप से पकड़ें। अपनी बाहों को पूरी तरह फैलाएं, बैंड को अपनी छाती से दूर धकेलें। अपनी कोहनियों को 90 डिग्री के कोण पर रखते हुए, बैंड को धीरे-धीरे वापस अपनी छाती तक नीचे लाएँ। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Połóż się płasko na ławce, stopy płasko na podłodze, a plecy oparte o ławkę. Chwyć uchwyty taśmy nachwytem, nieco szerzej niż na szerokość barków. Wyprostuj ramiona w pełni, wypychając taśmę od klatki piersiowej. Powoli opuść taśmę z powrotem do klatki piersiowej, utrzymując łokcie pod kątem 90 stopni. Powtórz zalecaną liczbę razy.",
      "ko": "벤치에 누워 발을 바닥에 평평하게 놓고 등을 벤치에 붙입니다. 손바닥이 앞을 향하도록 밴드 손잡이를 어깨너비보다 약간 넓게 잡습니다. 팔을 완전히 펼쳐 밴드를 가슴에서 멀어지게 밀어냅니다. 밴드를 천천히 다시 가슴으로 내려 팔꿈치가 90도 각도가 되도록 합니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Allonge-toi à plat sur un banc, les pieds à plat au sol et le dos plaqué contre le banc. Saisis les poignées de l'élastique avec une prise en pronation, un peu plus large que la largeur des épaules. Étends complètement tes bras, en poussant les élastiques loin de ta poitrine. Abaisse lentement les élastiques vers ta poitrine, en gardant tes coudes à un angle de 90 degrés. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0989",
    "name": "band one arm twisting chest press",
    "category": "chest",
    "body_part": "chest",
    "equipment": "band",
    "target": "pectorals",
    "secondary_muscles": [
      "shoulders",
      "triceps"
    ],
    "image": "images/0989-c16nYGA.jpg",
    "gif_url": "videos/0989-c16nYGA.gif",
    "instruction_steps": [
      "Attach the band to a sturdy anchor point at chest height.",
      "Stand with your side facing the anchor point and grab the band with one hand.",
      "Step away from the anchor point to create tension in the band.",
      "Position your feet shoulder-width apart and slightly bend your knees.",
      "Bring your hand holding the band across your body, towards the opposite shoulder.",
      "While maintaining tension in the band, push your hand forward and away from your body, extending your arm.",
      "Slowly return to the starting position and repeat for the desired number of repetitions.",
      "Switch sides and repeat the exercise with the other hand."
    ],
    "instructions_all": {
      "en": "Attach the band to a sturdy anchor point at chest height. Stand with your side facing the anchor point and grab the band with one hand. Step away from the anchor point to create tension in the band. Position your feet shoulder-width apart and slightly bend your knees. Bring your hand holding the band across your body, towards the opposite shoulder. While maintaining tension in the band, push your hand forward and away from your body, extending your arm. Slowly return to the starting position and repeat for the desired number of repetitions. Switch sides and repeat the exercise with the other hand.",
      "it": "Attaccare la fascia a un punto di ancoraggio robusto all'altezza del petto. Stai con il fianco rivolto verso il punto di ancoraggio e afferra la fascia con una mano. Allontanati dal punto di ancoraggio per creare tensione nella fascia. Posiziona i piedi alla larghezza delle spalle e piega leggermente le ginocchia. Porta la mano che tiene la fascia lungo il corpo, verso la spalla opposta. Mantenendo la tensione nella fascia, spingi la mano in avanti e lontano dal corpo, estendendo il braccio. Ritorna lentamente alla posizione iniziale e ripeti per il numero di ripetizioni desiderato. Cambia lato e ripeti l'esercizio con l'altra mano.",
      "tr": "Bandı göğüs yüksekliğinde sağlam bir bağlantı noktasına takın. Yan tarafınız bağlantı noktasına bakacak şekilde durun ve bandı bir elinizle tutun. Bantta gerginlik yaratmak için bağlantı noktasından uzaklaşın. Ayaklarınızı omuz genişliğinde açın ve dizlerinizi hafifçe bükün. Bandı tutan elinizi vücudunuzun üzerinden karşı omzunuza doğru getirin. Bandın gerginliğini korurken, kolunuzu uzatarak elinizi ileri ve vücudunuzdan uzağa doğru itin. Yavaşça başlangıç ​​pozisyonuna dönün ve istenilen sayıda tekrar yapın. Taraf değiştirin ve egzersizi diğer elinizle tekrarlayın.",
      "es": "Sujeta la banda a un punto de anclaje resistente a la altura del pecho. Ponte de pie con el costado hacia el punto de anclaje y agarra la banda con una mano. Aléjate del punto de anclaje para generar tensión en la banda. Coloca los pies separados a la altura de los hombros y flexiona ligeramente las rodillas. Lleva la mano que sostiene la banda a través del cuerpo, hacia el hombro opuesto. Manteniendo la tensión en la banda, empuja la mano hacia adelante y alejándola del cuerpo, extendiendo el brazo. Regresa lentamente a la posición inicial y repite el número de repeticiones deseado. Cambia de lado y repite el ejercicio con la otra mano.",
      "ru": "Прикрепите ремешок к прочной точке крепления на уровне груди. Встаньте боком к точке крепления и возьмитесь за ленту одной рукой. Отойдите от точки крепления, чтобы создать напряжение в ленте. Поставьте ноги на ширине плеч и слегка согните колени. Проведите руку, удерживающую ленту, через тело к противоположному плечу. Сохраняя натяжение ленты, толкните руку вперед и в сторону от тела, вытягивая руку. Медленно вернитесь в исходное положение и повторите необходимое количество повторений. Поменяйте сторону и повторите упражнение другой рукой.",
      "zh": "将带子固定在胸部高度的坚固锚点上。 站立，一侧面向锚点，用一只手抓住带子。 远离锚点以在带子中产生张力。 将双脚分开与肩同宽，并稍微弯曲膝盖。 将握住弹力带的手穿过身体，朝向对侧的肩膀。 在保持弹力带张力的同时，将手向前推离身体，伸展手臂。 慢慢回到起始位置并重复所需的重复次数。 换边并用另一只手重复练习。",
      "hi": "बैंड को छाती की ऊंचाई पर एक मजबूत एंकर पॉइंट से जोड़ें। एंकर प्वाइंट की ओर मुंह करके खड़े हो जाएं और एक हाथ से बैंड को पकड़ लें। बैंड में तनाव पैदा करने के लिए एंकर बिंदु से दूर हट जाएं। अपने पैरों को कंधे की चौड़ाई से अलग रखें और अपने घुटनों को थोड़ा मोड़ लें। बैंड को पकड़ने वाले अपने हाथ को अपने शरीर के पार, विपरीत कंधे की ओर लाएँ। बैंड में तनाव बनाए रखते हुए, अपने हाथ को आगे बढ़ाते हुए अपने हाथ को अपने शरीर से दूर और आगे की ओर धकेलें। धीरे-धीरे प्रारंभिक स्थिति में लौटें और वांछित संख्या में दोहराव के लिए दोहराएं। करवट बदलें और दूसरे हाथ से व्यायाम दोहराएं।",
      "pl": "Przymocuj taśmę do stabilnego punktu zaczepienia na wysokości klatki piersiowej. Stań bokiem do punktu zaczepienia i chwyć taśmę jedną ręką. Odejdź od punktu zaczepienia, aby wytworzyć napięcie w taśmie. Ustaw stopy w rozkroku na szerokość barków i ugnij lekko kolana. Przyciągnij dłoń trzymającą taśmę w poprzek ciała, w kierunku przeciwległego barku. Utrzymując napięcie w taśmie, wypchnij dłoń do przodu i od ciała, prostując ramię. Powoli wróć do pozycji wyjściowej i powtórz zalecaną liczbę razy. Zmień stronę i powtórz ćwiczenie drugą ręką.",
      "ko": "밴드를 가슴 높이의 견고한 고정점에 부착합니다. 옆으로 서서 고정점을 향하고 한손으로 밴드를 잡습니다. 고정점에서 멀리 물러나 밴드에 긴장을 만듭니다. 발을 어깨너비로 벌리고 무릎을 약간 구부립니다. 밴드를 들고 있는 손을 몸 안쪽을 가로질러 반대쪽 어깨 쪽으로 가져옵니다. 밴드의 긴장을 유지하면서 손을 앞으로 밀어내며 팔을 펼칩니다. 천천히 시작 자세로 돌아오고 원하는 반복 횟수만큼 반복합니다. 반대쪽으로 바꾸어 반대 손으로 운동을 반복합니다.",
      "fr": "Fixe l'élastique à un point d'ancrage solide à hauteur de la poitrine. Tiens-toi debout de côté face au point d'ancrage et attrape l'élastique d'une main. Éloigne-toi du point d'ancrage pour créer de la tension dans l'élastique. Positionne tes pieds écartés à la largeur des épaules et fléchis légèrement tes genoux. Amène ta main qui tient l'élastique en travers de ton corps, vers l'épaule opposée. Tout en maintenant la tension dans l'élastique, pousse ta main vers l'avant et loin de ton corps en tendant ton bras. Reviens lentement à la position de départ et répète pour le nombre de répétitions souhaité. Change de côté et répète l'exercice avec l'autre main."
    }
  },
  {
    "id": "0007",
    "name": "alternate lateral pulldown",
    "category": "back",
    "body_part": "back",
    "equipment": "cable",
    "target": "lats",
    "secondary_muscles": [
      "biceps",
      "rhomboids"
    ],
    "image": "images/0007-4IKbhHV.jpg",
    "gif_url": "videos/0007-4IKbhHV.gif",
    "instruction_steps": [
      "Sit on the cable machine with your back straight and feet flat on the ground.",
      "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
      "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
      "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Sit on the cable machine with your back straight and feet flat on the ground. Grasp the handles with an overhand grip, slightly wider than shoulder-width apart. Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together. Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position. Repeat for the desired number of repetitions.",
      "it": "Siediti sulla macchina via cavo con la schiena dritta e i piedi appoggiati a terra. Afferrare le maniglie con una presa prona, leggermente più larga della larghezza delle spalle. Appoggiati leggermente all'indietro e tira le maniglie verso il petto, stringendo insieme le scapole. Fermati per un momento al culmine del movimento, quindi rilascia lentamente le maniglie nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Kablo makinesinin üzerine sırtınız düz ve ayaklarınız yere düz basacak şekilde oturun. Tutamaçları omuz genişliğinden biraz daha geniş olacak şekilde üstten kavrayın. Hafifçe geriye yaslanın ve kürek kemiklerinizi birbirine doğru sıkıştırarak kolları göğsünüze doğru çekin. Hareketin zirvesinde bir an duraklayın, ardından kolları yavaşça başlangıç ​​pozisyonuna bırakın. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Siéntate en la máquina de cable con la espalda recta y los pies apoyados en el suelo. Agarra las agarraderas con un agarre prono, un poco más separadas que el ancho de los hombros. Inclínate ligeramente hacia atrás y lleva las agarraderas hacia el pecho, juntando los omóplatos. Haz una pausa por un momento en el punto máximo del movimiento, luego suelta lentamente las agarraderas de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Сядьте на канатный тренажер, выпрямив спину и поставив ноги на землю. Возьмитесь за ручки хватом сверху, на расстоянии чуть шире плеч. Слегка откиньтесь назад и потяните ручки к груди, сжимая лопатки вместе. Задержитесь на мгновение на пике движения, затем медленно отпустите ручки обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "坐在缆绳机上，背部挺直，双脚平放在地面上。 正手握住手柄，握距略宽于肩宽。 稍微向后倾斜，将手柄拉向胸部，将肩胛骨挤压在一起。 在动作的最高点暂停片刻，然后慢慢松开手柄回到起始位置。 重复所需的重复次数。",
      "hi": "अपनी पीठ सीधी और पैर ज़मीन पर सपाट करके केबल मशीन पर बैठें। हैंडल को कंधे की चौड़ाई से थोड़ा अधिक चौड़े ओवरहैंड ग्रिप से पकड़ें। थोड़ा पीछे झुकें और अपने कंधे के ब्लेड को एक साथ निचोड़ते हुए, हैंडल को अपनी छाती की ओर खींचें। गति के चरम पर एक पल के लिए रुकें, फिर धीरे-धीरे हैंडल को प्रारंभिक स्थिति में वापस छोड़ दें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Usiądź na maszynie linkowej z prostymi plecami i stopami płasko na podłodze. Chwyć uchwyty nachwytem, nieco szerzej niż na szerokość barków. Odchyl się lekko do tyłu i przyciągnij uchwyty w kierunku klatki piersiowej, ściskając łopatki. Zatrzymaj się na chwilę w szczytowej fazie ruchu, a następnie powoli uwolnij uchwyty do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "케이블 머신에 앉아 등을 곧게 펴고 발을 바닥에 붙입니다. 손으로 손잡이를 잡되 손바닥이 위를 향하고 어깨 넓이보다 약간 넓게 잡습니다. 약간 뒤로 기울인 상태에서 손잡이를 가슴 쪽으로 당기며 어깨뼈를 모읍니다. 동작의 최고 지점에서 잠깐 멈췄다가 천천히 손잡이를 시작 자세로 놓습니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Assieds-toi sur la machine à câble, le dos droit et les pieds à plat sur le sol. Saisis les poignées avec une prise en pronation, légèrement plus écartées que la largeur des épaules. Penche-toi légèrement en arrière et tire les poignées vers ta poitrine, en contractant tes omoplates. Marque une pause au sommet du mouvement, puis relâche lentement les poignées pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "3293",
    "name": "archer pull up",
    "category": "back",
    "body_part": "back",
    "equipment": "body weight",
    "target": "lats",
    "secondary_muscles": [
      "biceps",
      "forearms"
    ],
    "image": "images/3293-72BC5Za.jpg",
    "gif_url": "videos/3293-72BC5Za.gif",
    "instruction_steps": [
      "Start by hanging from a pull-up bar with an overhand grip, slightly wider than shoulder-width apart.",
      "Engage your core and pull your shoulder blades down and back.",
      "As you pull yourself up, bend one arm and bring your elbow towards your side, while keeping the other arm straight.",
      "Continue pulling until your chin is above the bar and your bent arm is fully flexed.",
      "Lower yourself back down with control, straightening the bent arm and repeating the movement on the other side.",
      "Alternate sides with each repetition."
    ],
    "instructions_all": {
      "en": "Start by hanging from a pull-up bar with an overhand grip, slightly wider than shoulder-width apart. Engage your core and pull your shoulder blades down and back. As you pull yourself up, bend one arm and bring your elbow towards your side, while keeping the other arm straight. Continue pulling until your chin is above the bar and your bent arm is fully flexed. Lower yourself back down with control, straightening the bent arm and repeating the movement on the other side. Alternate sides with each repetition.",
      "it": "Inizia appendendoti a una barra per trazioni con una presa prona, leggermente più larga della larghezza delle spalle. Coinvolgi il tuo core e tira le scapole verso il basso e all'indietro. Mentre ti tiri su, piega un braccio e porta il gomito verso il fianco, mantenendo l'altro braccio dritto. Continua a tirare finché il mento non è sopra la barra e il braccio piegato è completamente flesso. Abbassati di nuovo con controllo, raddrizzando il braccio piegato e ripetendo il movimento dall'altro lato. Lati alternativi ad ogni ripetizione.",
      "tr": "Omuz genişliğinden biraz daha geniş, üstten tutuşla bir barfiks barına asılarak başlayın. Merkez bölgenizi devreye sokun ve kürek kemiklerinizi aşağı ve geriye doğru çekin. Kendinizi yukarı çekerken bir kolunuzu bükün ve dirseğinizi yanınıza doğru getirin, diğer kolunuzu ise düz tutun. Çeneniz çubuğun üzerine gelinceye ve bükülmüş kolunuz tamamen bükülünceye kadar çekmeye devam edin. Bükülmüş kolu düzleştirerek kendinizi kontrollü bir şekilde geriye doğru indirin ve hareketi diğer tarafta tekrarlayın. Her tekrarda tarafları değiştirin.",
      "es": "Comienza colgándote de una barra de dominadas con un agarre prono, un poco más separado que el ancho de los hombros. Activa el core y lleva los omóplatos hacia abajo y atrás. Mientras te elevas, flexiona un brazo y lleva el codo hacia el costado, manteniendo el otro brazo recto. Continúa subiendo hasta que la barbilla quede por encima de la barra y el brazo flexionado esté completamente doblado. Bájate de nuevo con control, estirando el brazo flexionado y repitiendo el movimiento del otro lado. Alterna los lados en cada repetición.",
      "ru": "Начните с подвешивания на перекладине хватом сверху, на расстоянии чуть шире плеч. Напрягите корпус и потяните лопатки вниз и назад. Подтягиваясь, согните одну руку и отведите локоть в сторону, сохраняя при этом другую руку прямой. Продолжайте тянуть до тех пор, пока подбородок не окажется над перекладиной, а согнутая рука полностью не согнется. Контролируемое опускание вниз, выпрямляя согнутую руку и повторяя движение на другую сторону. Меняйте стороны при каждом повторении.",
      "zh": "首先，用正手握法悬挂在引体向上杆上，握距略宽于肩宽。 启动你的核心并将肩胛骨向下拉和向后拉。 当你站起来时，弯曲一只手臂并将肘部移向身体一侧，同时保持另一只手臂伸直。 继续拉，直到下巴位于杠铃上方并且弯曲的手臂完全弯曲。 有控制地放低自己，伸直弯曲的手臂并在另一侧重复该动作。 每次重复时交替进行。",
      "hi": "ओवरहैंड ग्रिप के साथ कंधे की चौड़ाई से थोड़ा अधिक चौड़े पुल-अप बार से लटककर शुरुआत करें। अपने कोर को संलग्न करें और अपने कंधे के ब्लेड को नीचे और पीछे खींचें। जैसे ही आप अपने आप को ऊपर खींचते हैं, एक हाथ को मोड़ें और अपनी कोहनी को अपनी तरफ लाएं, जबकि दूसरे हाथ को सीधा रखें। तब तक खींचते रहें जब तक कि आपकी ठुड्डी बार के ऊपर न आ जाए और आपकी मुड़ी हुई भुजा पूरी तरह से मुड़ न जाए। अपने आप को नियंत्रण के साथ वापस नीचे लाएँ, मुड़ी हुई भुजा को सीधा करें और दूसरी ओर से भी यही क्रिया दोहराएँ। प्रत्येक पुनरावृत्ति के साथ वैकल्पिक पक्ष।",
      "pl": "Zacznij, zwisając na drążku do podciągania nachwytem, nieco szerzej niż na szerokość barków. Napnij mięśnie brzucha i ściągnij łopatki w dół i do tyłu. Podciągając się, ugnij jedną rękę i przyciągnij łokieć w kierunku boku ciała, utrzymując drugą rękę prostą. Kontynuuj podciąganie, aż broda znajdzie się nad drążkiem, a ugięta ręka będzie w pełni zgięta. Opuść się z powrotem w kontrolowany sposób, prostując zgiętą rękę, i powtórz ruch po drugiej stronie. Zmieniaj strony przy każdym powtórzeniu.",
      "ko": "턱걸이 바에 손을 어깨 넓이보다 약간 넓게 손바닥이 앞을 향하도록 매달립니다. 복근을 긴장시키고 어깨뼈를 아래로 당겨 뒤로 젖힙니다. 몸을 올리면서 한쪽 팔의 팔꿈치를 구부려 옆으로 가져오되 다른 쪽 팔은 펴진 상태로 유지합니다. 턱이 바 위로 올라가고 구부린 팔이 완전히 굽혀질 때까지 계속 당깁니다. 제어된 속도로 몸을 내리면서 구부린 팔을 펼치고 반대쪽에서 같은 동작을 반복합니다. 매 반복마다 좌우를 번갈아가며 합니다.",
      "fr": "Commence suspendu à une barre de traction en prise pronation, légèrement plus écartées que la largeur des épaules. Gaine ta sangle abdominale et tire tes omoplates vers le bas et l'arrière. En te hissant vers le haut, plie un bras et amène ton coude vers ton côté tout en gardant l'autre bras tendu. Continue à tirer jusqu'à ce que ton menton soit au-dessus de la barre et que ton bras fléchi soit complètement contracté. Redescends de manière contrôlée, en tendant le bras fléchi et en répétant le mouvement de l'autre côté. Alterne les côtés à chaque répétition."
    }
  },
  {
    "id": "0017",
    "name": "assisted pull-up",
    "category": "back",
    "body_part": "back",
    "equipment": "leverage machine",
    "target": "lats",
    "secondary_muscles": [
      "biceps",
      "forearms"
    ],
    "image": "images/0017-kiJ4Z2K.jpg",
    "gif_url": "videos/0017-kiJ4Z2K.gif",
    "instruction_steps": [
      "Adjust the machine to your desired weight and height settings.",
      "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
      "Hang with your arms fully extended and your feet off the ground.",
      "Engage your back muscles and pull your body up towards the handles, keeping your elbows close to your body.",
      "Continue pulling until your chin is above the handles.",
      "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Adjust the machine to your desired weight and height settings. Grasp the handles with an overhand grip, slightly wider than shoulder-width apart. Hang with your arms fully extended and your feet off the ground. Engage your back muscles and pull your body up towards the handles, keeping your elbows close to your body. Continue pulling until your chin is above the handles. Pause for a moment at the top, then slowly lower your body back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Regola la macchina in base alle impostazioni di peso e altezza desiderate. Afferrare le maniglie con una presa prona, leggermente più larga della larghezza delle spalle. Appendere con le braccia completamente distese e i piedi sollevati da terra. Coinvolgi i muscoli della schiena e solleva il corpo verso le maniglie, mantenendo i gomiti vicini al corpo. Continua a tirare finché il mento non è sopra le maniglie. Fai una pausa per un momento in alto, quindi abbassa lentamente il corpo fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Makineyi istediğiniz ağırlık ve boy ayarlarına ayarlayın. Tutamaçları omuz genişliğinden biraz daha geniş olacak şekilde üstten kavrayın. Kollarınız tamamen uzatılmış ve ayaklarınız yerden yukarıda olacak şekilde asın. Sırt kaslarınızı çalıştırın ve dirseklerinizi vücudunuza yakın tutarak vücudunuzu tutamaçlara doğru yukarı çekin. Çeneniz tutamakların üzerine gelene kadar çekmeye devam edin. Tepe noktasında bir an duraklayın, ardından vücudunuzu yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ajusta la máquina a los valores de peso y altura deseados. Agarra las agarraderas con un agarre prono, un poco más separadas que el ancho de los hombros. Cuélgate con los brazos completamente extendidos y los pies sin tocar el suelo. Activa los músculos de la espalda y lleva el cuerpo hacia arriba hacia las agarraderas, manteniendo los codos cerca del cuerpo. Continúa subiendo hasta que la barbilla quede por encima de las agarraderas. Haz una pausa por un momento en la parte superior, luego baja lentamente el cuerpo de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Настройте машину на желаемые параметры веса и роста. Возьмитесь за ручки хватом сверху, на расстоянии чуть шире плеч. Висите, полностью вытянув руки и оторвав ноги от земли. Задействуйте мышцы спины и подтяните тело к ручкам, держа локти близко к телу. Продолжайте тянуть, пока подбородок не окажется над ручками. Задержитесь на мгновение в верхней точке, затем медленно опустите тело обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "将机器调整至您所需的体重和高度设置。 正手握住手柄，握距略宽于肩宽。 双臂完全伸展，双脚离开地面。 收紧背部肌肉，将身体拉向手柄，保持肘部靠近身体。 继续拉，直到下巴位于手柄上方。 在顶部停顿片刻，然后慢慢将身体放回起始位置。 重复所需的重复次数。",
      "hi": "मशीन को अपनी वांछित वजन और ऊंचाई सेटिंग्स के अनुसार समायोजित करें। हैंडल को कंधे की चौड़ाई से थोड़ा अधिक चौड़े ओवरहैंड ग्रिप से पकड़ें। अपनी बाहों को पूरी तरह फैलाकर और अपने पैरों को ज़मीन से ऊपर रखकर लटकें। अपनी पीठ की मांसपेशियों को शामिल करें और अपनी कोहनियों को अपने शरीर के करीब रखते हुए, अपने शरीर को हैंडल की ओर ऊपर खींचें। तब तक खींचते रहें जब तक आपकी ठुड्डी हैंडल के ऊपर न आ जाए। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपने शरीर को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Ustaw maszynę na odpowiedni ciężar i wysokość. Chwyć uchwyty nachwytem, nieco szerzej niż na szerokość barków. Zwiśnij z rękami w pełni wyprostowanymi i stopami uniesionymi nad podłogę. Napnij mięśnie pleców i podciągnij ciało w kierunku uchwytów, trzymając łokcie blisko ciała. Kontynuuj podciąganie, aż broda znajdzie się nad uchwytami. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść ciało z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "머신을 원하는 무게와 높이 설정으로 조정합니다. 손바닥이 앞을 향하도록 손잡이를 어깨너비보다 약간 넓게 잡습니다. 팔을 완전히 펼친 상태로 발이 바닥에서 떨어져 매달립니다. 등 근육을 활성화하고 팔꿈치를 몸 옆에 붙이며 몸을 위로 당겨 턱이 손잡이 위로 올라올 때까지 계속 당깁니다. 맨 위에서 잠깐 멈춘 후 천천히 시작 위치로 내려갑니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Règle la machine aux réglages de poids et de hauteur souhaités. Saisis les poignées avec une prise en pronation, légèrement plus écartées que la largeur des épaules. Suspends-toi, les bras complètement étendus et les pieds décollés du sol. Sollicite les muscles de ton dos et tire ton corps vers les poignées, en gardant tes coudes près de ton corps. Continue à tirer jusqu'à ce que ton menton soit au-dessus des poignées. Marque une pause en haut, puis abaisse lentement ton corps pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1431",
    "name": "assisted standing chin-up",
    "category": "back",
    "body_part": "back",
    "equipment": "leverage machine",
    "target": "lats",
    "secondary_muscles": [
      "biceps",
      "forearms"
    ],
    "image": "images/1431-7OeHptV.jpg",
    "gif_url": "videos/1431-7OeHptV.gif",
    "instruction_steps": [
      "Adjust the machine to your desired assistance level.",
      "Stand on the foot platform and grip the handles with an overhand grip, slightly wider than shoulder-width apart.",
      "Keep your chest up and shoulders back, engage your core, and slightly bend your knees.",
      "Pull your body up by flexing your elbows and driving your elbows down towards your sides.",
      "Continue pulling until your chin is above the bar.",
      "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Adjust the machine to your desired assistance level. Stand on the foot platform and grip the handles with an overhand grip, slightly wider than shoulder-width apart. Keep your chest up and shoulders back, engage your core, and slightly bend your knees. Pull your body up by flexing your elbows and driving your elbows down towards your sides. Continue pulling until your chin is above the bar. Pause for a moment at the top, then slowly lower your body back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Regola la macchina al livello di assistenza desiderato. Stare sulla pedana e afferrare le maniglie con una presa prona, leggermente più larghe della larghezza delle spalle. Tieni il petto in alto e le spalle indietro, contrai il core e piega leggermente le ginocchia. Solleva il corpo flettendo i gomiti e portandoli verso i fianchi. Continua a tirare finché il mento non è sopra la barra. Fai una pausa per un momento in alto, quindi abbassa lentamente il corpo fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Makineyi istediğiniz yardım seviyesine ayarlayın. Ayak platformunun üzerinde durun ve kolları omuz genişliğinden biraz daha geniş olacak şekilde üstten kavrayarak tutun. Göğsünüzü yukarıda, omuzlarınızı geride tutun, merkez bölgenizi devreye sokun ve dizlerinizi hafifçe bükün. Dirseklerinizi bükerek ve dirseklerinizi yanlarınıza doğru indirerek vücudunuzu yukarı çekin. Çeneniz çubuğun üstüne çıkana kadar çekmeye devam edin. Tepe noktasında bir an duraklayın, ardından vücudunuzu yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ajusta la máquina al nivel de asistencia deseado. Sube a la plataforma para los pies y agarra las agarraderas con un agarre prono, un poco más separadas que el ancho de los hombros. Mantén el pecho arriba y los hombros atrás, activa el core y flexiona ligeramente las rodillas. Levanta el cuerpo flexionando los codos y llevándolos hacia abajo, en dirección a los costados. Continúa subiendo hasta que la barbilla quede por encima de la barra. Haz una pausa por un momento en la parte superior, luego baja lentamente el cuerpo de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Настройте машину на желаемый уровень помощи. Встаньте на платформу для ног и возьмитесь за рукоятки хватом сверху, на расстоянии чуть шире плеч. Держите грудь поднятой, а плечи отведенными назад, задействуйте корпус и слегка согните колени. Поднимите тело вверх, сгибая локти и направляя локти вниз в стороны. Продолжайте тянуть, пока подбородок не окажется над перекладиной. Задержитесь на мгновение в верхней точке, затем медленно опустите тело обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "将机器调整至您所需的辅助级别。 站在脚踏板上，正手握住手柄，握距略宽于肩宽。 保持挺胸、肩膀向后，收紧核心肌群，并稍微弯曲膝盖。 弯曲肘部并将肘部向身体两侧压低，将身体向上拉。 继续拉，直到下巴位于杠铃上方。 在顶部停顿片刻，然后慢慢将身体放回起始位置。 重复所需的重复次数。",
      "hi": "मशीन को अपने इच्छित सहायता स्तर पर समायोजित करें। फुट प्लेटफॉर्म पर खड़े हो जाएं और हैंडल को कंधे की चौड़ाई से थोड़ा अधिक चौड़े ओवरहैंड ग्रिप से पकड़ें। अपनी छाती को ऊपर और कंधों को पीछे रखें, अपने कोर को संलग्न करें और अपने घुटनों को थोड़ा मोड़ें। अपनी कोहनियों को मोड़कर और अपनी कोहनियों को अपनी तरफ नीचे की ओर ले जाकर अपने शरीर को ऊपर खींचें। तब तक खींचते रहें जब तक आपकी ठुड्डी बार के ऊपर न आ जाए। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपने शरीर को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Ustaw maszynę na odpowiedni poziom wspomagania. Stań na platformie i chwyć uchwyty nachwytem, nieco szerzej niż na szerokość barków. Utrzymuj wypiętą klatkę piersiową i ściągnięte barki, napnij mięśnie brzucha i ugnij lekko kolana. Podciągnij ciało, uginając łokcie i kierując je w dół w stronę boków. Kontynuuj podciąganie, aż broda znajdzie się nad drążkiem. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść ciało z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "머신을 원하는 보조 수준으로 조정합니다. 발판에 서서 손바닥이 앞을 향하도록 손잡이를 어깨너비보다 약간 넓게 잡습니다. 가슴을 펴고 어깨를 뒤로 젖히며 코어를 활성화하고 무릎을 약간 구부립니다. 팔꿈치를 구부려 몸을 들어올리면서 팔꿈치를 옆으로 아래로 밀어냅니다. 턱이 바 위로 올라올 때까지 계속 당깁니다. 맨 위에서 잠깐 멈춘 후 천천히 몸을 시작 위치로 내려갑니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Règle la machine au niveau d'assistance souhaité. Tiens-toi sur la plateforme pour les pieds et saisis les poignées en prise pronation, légèrement plus écartées que la largeur des épaules. Garde la poitrine relevée et les épaules en arrière, gaine ta sangle abdominale et fléchis légèrement tes genoux. Tire ton corps vers le haut en fléchissant tes coudes et en les entraînant vers le bas le long de tes flancs. Continue à tirer jusqu'à ce que ton menton soit au-dessus de la barre. Marque une pause en haut, puis abaisse lentement ton corps pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1432",
    "name": "assisted standing pull-up",
    "category": "back",
    "body_part": "back",
    "equipment": "leverage machine",
    "target": "lats",
    "secondary_muscles": [
      "biceps",
      "forearms"
    ],
    "image": "images/1432-f4xtKBj.jpg",
    "gif_url": "videos/1432-f4xtKBj.gif",
    "instruction_steps": [
      "Adjust the machine to your desired weight and height settings.",
      "Stand facing the machine with your feet shoulder-width apart.",
      "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
      "Engage your lats and biceps, and pull yourself up towards the handles.",
      "Pause for a moment at the top, squeezing your back muscles.",
      "Slowly lower yourself back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Adjust the machine to your desired weight and height settings. Stand facing the machine with your feet shoulder-width apart. Grasp the handles with an overhand grip, slightly wider than shoulder-width apart. Engage your lats and biceps, and pull yourself up towards the handles. Pause for a moment at the top, squeezing your back muscles. Slowly lower yourself back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Regola la macchina in base alle impostazioni di peso e altezza desiderate. Mettiti di fronte alla macchina con i piedi alla larghezza delle spalle. Afferrare le maniglie con una presa prona, leggermente più larga della larghezza delle spalle. Coinvolgi i dorsali e i bicipiti e sollevati verso le maniglie. Fermati un attimo in alto, contraendo i muscoli della schiena. Abbassati lentamente fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Makineyi istediğiniz ağırlık ve boy ayarlarına ayarlayın. Ayaklarınız omuz genişliğinde açık olacak şekilde makineye dönük durun. Tutamaçları omuz genişliğinden biraz daha geniş olacak şekilde üstten kavrayın. Lats ve bicepslerinizi devreye sokun ve kendinizi tutamaçlara doğru yukarı çekin. Sırt kaslarınızı sıkarak tepede bir an duraklayın. Kendinizi yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ajusta la máquina a los valores de peso y altura deseados. Ponte de pie frente a la máquina con los pies separados a la altura de los hombros. Agarra las agarraderas con un agarre prono, un poco más separadas que el ancho de los hombros. Activa los dorsales y los bíceps, y levántate hacia las agarraderas. Haz una pausa por un momento en la parte superior, apretando los músculos de la espalda. Bájate lentamente de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Настройте машину на желаемые параметры веса и роста. Встаньте лицом к тренажеру, поставив ноги на ширине плеч. Возьмитесь за ручки хватом сверху, на расстоянии чуть шире плеч. Задействуйте широчайшие и бицепсы и подтяните себя к ручкам. Задержитесь на мгновение в верхней точке, напрягая мышцы спины. Медленно опуститесь обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "将机器调整至您所需的体重和高度设置。 面向机器站立，双脚分开与肩同宽。 正手握住手柄，握距略宽于肩宽。 启动你的背阔肌和二头肌，并将自己拉向手柄。 在顶部暂停片刻，挤压背部肌肉。 慢慢地将自己放回到起始位置。 重复所需的重复次数。",
      "hi": "मशीन को अपनी वांछित वजन और ऊंचाई सेटिंग्स के अनुसार समायोजित करें। अपने पैरों को कंधे की चौड़ाई से अलग रखते हुए मशीन की ओर मुंह करके खड़े हो जाएं। हैंडल को कंधे की चौड़ाई से थोड़ा अधिक चौड़े ओवरहैंड ग्रिप से पकड़ें। अपने लैट्स और बाइसेप्स को संलग्न करें, और अपने आप को हैंडल की ओर ऊपर खींचें। अपनी पीठ की मांसपेशियों को निचोड़ते हुए शीर्ष पर एक पल के लिए रुकें। धीरे-धीरे अपने आप को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Ustaw maszynę na odpowiedni ciężar i wysokość. Stań przodem do maszyny, stopy w rozkroku na szerokość barków. Chwyć uchwyty nachwytem, nieco szerzej niż na szerokość barków. Napnij mięśnie najszersze grzbietu i bicepsy, i podciągnij się w kierunku uchwytów. Zatrzymaj się na chwilę w górnej pozycji, ściskając mięśnie pleców. Powoli wróć do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "머신을 원하는 무게와 높이 설정으로 조정합니다. 머신을 마주보고 서서 발을 어깨너비로 벌립니다. 손바닥이 앞을 향하도록 손잡이를 어깨너비보다 약간 넓게 잡습니다. 광배근과 이두근을 활성화하여 손잡이 방향으로 몸을 당겨 올립니다. 맨 위에서 잠깐 멈춰 등 근육을 꽉 조입니다. 천천히 몸을 시작 위치로 내려갑니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Règle la machine aux réglages de poids et de hauteur souhaités. Tiens-toi face à la machine, les pieds écartés à la largeur des épaules. Saisis les poignées avec une prise en pronation, légèrement plus écartées que la largeur des épaules. Contracte tes grands dorsaux et tes biceps, et hisse-toi vers les poignées. Marque une pause en haut, en contractant les muscles de ton dos. Abaisse-toi lentement vers la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1512",
    "name": "all fours squad stretch",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "body weight",
    "target": "quads",
    "secondary_muscles": [
      "hamstrings",
      "glutes"
    ],
    "image": "images/1512-qBcKorM.jpg",
    "gif_url": "videos/1512-qBcKorM.gif",
    "instruction_steps": [
      "Start on all fours with your hands directly under your shoulders and your knees directly under your hips.",
      "Extend one leg straight back, keeping your knee bent and your foot flexed.",
      "Slowly lower your hips towards the ground, feeling a stretch in your quads.",
      "Hold this position for 20-30 seconds.",
      "Switch legs and repeat the stretch on the other side."
    ],
    "instructions_all": {
      "en": "Start on all fours with your hands directly under your shoulders and your knees directly under your hips. Extend one leg straight back, keeping your knee bent and your foot flexed. Slowly lower your hips towards the ground, feeling a stretch in your quads. Hold this position for 20-30 seconds. Switch legs and repeat the stretch on the other side.",
      "it": "Inizia a quattro zampe con le mani direttamente sotto le spalle e le ginocchia direttamente sotto i fianchi. Estendi una gamba all'indietro, mantenendo il ginocchio piegato e il piede flesso. Abbassa lentamente i fianchi verso terra, avvertendo l'allungamento dei quadricipiti. Mantieni questa posizione per 20-30 secondi. Cambia gamba e ripeti l'allungamento sull'altro lato.",
      "tr": "Elleriniz doğrudan omuzlarınızın altında ve dizleriniz doğrudan kalçalarınızın altında olacak şekilde dört ayak üzerinde başlayın. Dizinizi bükülmüş ve ayağınızı bükülmüş halde tutarak bir bacağınızı geriye doğru uzatın. Kalçalarınızı yavaşça yere doğru indirin, dörtlü kaslarınızda bir gerginlik hissedin. Bu pozisyonu 20-30 saniye basılı tutun. Bacaklarınızı değiştirin ve diğer taraftaki esnemeyi tekrarlayın.",
      "es": "Comienza apoyado sobre manos y rodillas, con las manos justo debajo de los hombros y las rodillas justo debajo de las caderas. Extiende una pierna hacia atrás, manteniendo la rodilla flexionada y el pie en flexión. Baja lentamente las caderas hacia el suelo, sintiendo un estiramiento en los cuádriceps. Mantén esta posición durante 20-30 segundos. Cambia de pierna y repite el estiramiento del otro lado.",
      "ru": "Встаньте на четвереньки, положив руки прямо под плечи и колени прямо под бедрами. Вытяните одну ногу прямо назад, сохраняя колено согнутым и ступню согнутой. Медленно опустите бедра к земле, чувствуя растяжение квадрицепсов. Удерживайте это положение 20–30 секунд. Поменяйте ноги и повторите растяжку с другой стороны.",
      "zh": "从四肢着地开始，双手直接放在肩膀下方，膝盖直接放在臀部下方。 将一条腿向后伸直，保持膝盖弯曲和脚弯曲。 慢慢地将臀部降低到地面，感觉股四头肌的伸展。 保持这个姿势20-30秒。 换腿并在另一侧重复拉伸。",
      "hi": "अपने हाथों को सीधे अपने कंधों के नीचे और अपने घुटनों को सीधे अपने कूल्हों के नीचे रखकर चारों तरफ से शुरुआत करें। अपने एक पैर को सीधा पीछे की ओर फैलाएँ, अपने घुटने को मोड़ें और अपने पैर को मोड़ें। धीरे-धीरे अपने कूल्हों को ज़मीन की ओर नीचे लाएँ, अपने क्वाड्स में खिंचाव महसूस करें। इस स्थिति में 20-30 सेकंड तक रुकें। पैरों को बदलें और दूसरी तरफ भी खिंचाव दोहराएं।",
      "pl": "Ustaw się w podporze na czworakach, dłonie dokładnie pod barkami, a kolana pod biodrami. Wyciągnij jedną nogę prosto do tyłu, utrzymując kolano ugięte i stopę zgiętą grzbietowo. Powoli opuszczaj biodra w kierunku podłogi, odczuwając rozciąganie w mięśniach czworogłowych uda. Utrzymaj tę pozycję przez 20-30 sekund. Zmień nogę i powtórz rozciąganie po drugiej stronie.",
      "ko": "네 발을 모두 대고 손이 어깨 아래에, 무릎이 엉덩이 아래에 오도록 시작합니다. 한쪽 다리를 곧게 펼쳐 뒤로 뻗되 무릎을 구부린 상태로 발을 펼칩니다. 천천히 엉덩이를 바닥으로 내려 대퇴사두근이 늘어나는 것을 느낍니다. 이 자세를 20~30초간 유지합니다. 다리를 바꿔 반대쪽도 같은 방법으로 스트레칭합니다.",
      "fr": "Commence à quatre pattes, les mains directement sous les épaules et les genoux directement sous les hanches. Étends une jambe droit vers l'arrière, en gardant ton genou fléchi et ton pied en flexion. Abaisse lentement tes hanches vers le sol, en ressentant un étirement dans tes quadriceps. Maintiens cette position pendant 20 à 30 secondes. Change de jambe et répète l'étirement de l'autre côté."
    }
  },
  {
    "id": "3214",
    "name": "arms apart circular toe touch (male)",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "body weight",
    "target": "glutes",
    "secondary_muscles": [
      "hamstrings",
      "quadriceps",
      "calves"
    ],
    "image": "images/3214-RtyAsy1.jpg",
    "gif_url": "videos/3214-RtyAsy1.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and arms extended to the sides.",
      "Keeping your legs straight, bend forward at the waist and reach down towards your toes with your right hand.",
      "As you reach down, simultaneously lift your left leg straight up behind you, maintaining balance.",
      "Return to the starting position and repeat the movement with your left hand reaching towards your toes and your right leg lifting up behind you.",
      "Continue alternating sides for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and arms extended to the sides. Keeping your legs straight, bend forward at the waist and reach down towards your toes with your right hand. As you reach down, simultaneously lift your left leg straight up behind you, maintaining balance. Return to the starting position and repeat the movement with your left hand reaching towards your toes and your right leg lifting up behind you. Continue alternating sides for the desired number of repetitions.",
      "it": "Stare con i piedi alla larghezza delle spalle e le braccia distese ai lati. Tenendo le gambe dritte, piegati in avanti all'altezza della vita e allunga la mano destra verso le punte dei piedi. Mentre ti abbassi, solleva contemporaneamente la gamba sinistra dietro di te, mantenendo l'equilibrio. Ritorna alla posizione di partenza e ripeti il ​​movimento con la mano sinistra protesa verso le dita dei piedi e la gamba destra sollevata dietro di te. Continua ad alternare i lati per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız omuz genişliğinde açık ve kollarınız yanlara doğru uzatılmış şekilde ayakta durun. Bacaklarınızı düz tutarak belinizden öne doğru eğilin ve sağ elinizle ayak parmaklarınıza doğru uzanın. Aşağı uzandığınızda, dengenizi koruyarak aynı anda sol bacağınızı düz bir şekilde arkanıza kaldırın. Başlangıç ​​pozisyonuna dönün ve sol eliniz ayak parmaklarınıza uzanıp sağ bacağınızı arkanıza doğru kaldıracak şekilde hareketi tekrarlayın. İstenilen tekrar sayısı için alternatif taraflara devam edin.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y los brazos extendidos hacia los lados. Manteniendo las piernas rectas, flexiona el torso hacia adelante desde la cintura y lleva la mano derecha hacia los dedos de los pies. Mientras bajas, levanta simultáneamente la pierna izquierda recta detrás de ti, manteniendo el equilibrio. Regresa a la posición inicial y repite el movimiento llevando la mano izquierda hacia los dedos de los pies y levantando la pierna derecha detrás de ti. Continúa alternando lados durante el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, руки вытянуты в стороны. Держа ноги прямыми, наклонитесь вперед в талии и дотянитесь правой рукой до пальцев ног. Наклоняясь вниз, одновременно поднимите левую ногу прямо позади себя, сохраняя равновесие. Вернитесь в исходное положение и повторите движение, потянув левую руку к пальцам ног и подняв правую ногу позади себя. Продолжайте чередовать стороны желаемое количество повторений.",
      "zh": "双脚分开与肩同宽站立，双臂向两侧伸展。 保持双腿伸直，腰部向前弯曲，右手向下伸向脚趾。 当你向下伸展时，同时将左腿在身后伸直，保持平衡。 返回起始位置，重复该动作，左手伸向脚趾，右腿在身后抬起。 继续交替进行所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर और हाथों को बगल तक फैलाकर खड़े हो जाएं। अपने पैरों को सीधा रखते हुए, कमर के बल आगे की ओर झुकें और अपने दाहिने हाथ से अपने पैर की उंगलियों तक पहुंचें। जैसे ही आप नीचे पहुँचते हैं, साथ ही संतुलन बनाए रखते हुए अपने बाएँ पैर को अपने पीछे सीधा ऊपर उठाएँ। प्रारंभिक स्थिति पर लौटें और अपने बाएं हाथ को अपने पैर की उंगलियों तक पहुंचाते हुए और अपने दाहिने पैर को अपने पीछे ऊपर उठाते हुए इस क्रिया को दोहराएं। दोहराव की वांछित संख्या के लिए पक्षों को बदलना जारी रखें।",
      "pl": "Stań w rozkroku na szerokość barków z ramionami wyciągniętymi na boki. Utrzymując proste nogi, pochyl się do przodu w biodrach i sięgnij prawą dłonią w kierunku palców stóp. Sięgając w dół, jednocześnie unieś lewą nogę prosto w górę za siebie, zachowując równowagę. Wróć do pozycji wyjściowej i powtórz ruch, sięgając lewą dłonią do palców stóp i unosząc prawą nogę za siebie. Kontynuuj naprzemienne wykonywanie ruchu przez zalecaną liczbę powtórzeń.",
      "ko": "발을 어깨 넓이로 벌리고 팔을 옆으로 펼칩니다. 다리를 곧게 펴고 허리를 앞으로 구부려 오른쪽 손으로 발끝을 터치합니다. 손을 내릴 때 동시에 왼쪽 다리를 곧게 펴 뒤로 들어 올려 균형을 유지합니다. 시작 자세로 돌아와 왼쪽 손으로 발끝을 터치하면서 오른쪽 다리를 곧게 펴 뒤로 들어 올리는 동작을 반복합니다. 원하는 반복 횟수만큼 좌우를 번갈아가며 계속합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et les bras tendus sur les côtés. En gardant les jambes tendues, penche-toi vers l'avant au niveau de la taille et tends la main droite vers tes orteils. En te penchant vers le bas, soulève simultanément ta jambe gauche tendue derrière toi en gardant l'équilibre. Reviens à la position de départ et répète le mouvement en tendant ta main gauche vers tes orteils et en levant ta jambe droite derrière toi. Continue à alterner les côtés pour le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1709",
    "name": "assisted lying glutes stretch",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "assisted",
    "target": "glutes",
    "secondary_muscles": [
      "hamstrings"
    ],
    "image": "images/1709-yn0LjwL.jpg",
    "gif_url": "videos/1709-yn0LjwL.gif",
    "instruction_steps": [
      "Lie on your back with your legs extended.",
      "Bend your right knee and place your right ankle on your left thigh, just above the knee.",
      "Grasp your left thigh with both hands and gently pull it towards your chest.",
      "Hold the stretch for 20-30 seconds.",
      "Release and repeat on the other side."
    ],
    "instructions_all": {
      "en": "Lie on your back with your legs extended. Bend your right knee and place your right ankle on your left thigh, just above the knee. Grasp your left thigh with both hands and gently pull it towards your chest. Hold the stretch for 20-30 seconds. Release and repeat on the other side.",
      "it": "Sdraiati sulla schiena con le gambe distese. Piega il ginocchio destro e posiziona la caviglia destra sulla coscia sinistra, appena sopra il ginocchio. Afferrare la coscia sinistra con entrambe le mani e tirarla delicatamente verso il petto. Mantieni l'allungamento per 20-30 secondi. Rilascia e ripeti dall'altra parte.",
      "tr": "Bacaklarınız uzatılmış halde sırt üstü yatın. Sağ dizinizi bükün ve sağ ayak bileğinizi sol uyluğunuzun üzerine, dizin hemen üstüne yerleştirin. Sol uyluğunuzu iki elinizle kavrayın ve yavaşça göğsünüze doğru çekin. Uzatmayı 20-30 saniye kadar tutun. Serbest bırakın ve diğer tarafta tekrarlayın.",
      "es": "Túmbate sobre tu espalda con las piernas extendidas. Flexiona la rodilla derecha y coloca el tobillo derecho sobre el muslo izquierdo, justo encima de la rodilla. Agarra el muslo izquierdo con ambas manos y jálalo suavemente hacia el pecho. Mantén el estiramiento durante 20-30 segundos. Suelta y repite del otro lado.",
      "ru": "Лягте на спину, вытянув ноги. Согните правое колено и положите правую лодыжку на левое бедро, чуть выше колена. Возьмите левое бедро обеими руками и осторожно потяните его к груди. Удерживайте растяжку 20–30 секунд. Отпустите и повторите с другой стороны.",
      "zh": "仰卧，双腿伸展。 弯曲右膝盖，将右脚踝放在左大腿上，就在膝盖上方。 用双手抓住左大腿，轻轻地将其拉向胸部。 保持拉伸 20-30 秒。 松开并在另一侧重复。",
      "hi": "अपने पैरों को फैलाकर अपनी पीठ के बल लेटें। अपने दाहिने घुटने को मोड़ें और अपने दाहिने टखने को अपनी बाईं जांघ पर रखें, घुटने के ठीक ऊपर। अपनी बायीं जांघ को दोनों हाथों से पकड़ें और धीरे से अपनी छाती की ओर खींचें। 20-30 सेकंड तक खिंचाव बनाए रखें। छोड़ें और दूसरी तरफ दोहराएं।",
      "pl": "Połóż się na plecach z wyciągniętymi nogami. Ugnij prawe kolano i umieść prawą kostkę na lewym udzie, tuż nad kolanem. Chwyć lewe udo obiema rękami i delikatnie przyciągnij je w kierunku klatki piersiowej. Utrzymaj rozciąganie przez 20-30 sekund. Zwolnij i powtórz po drugiej stronie.",
      "ko": "등을 바닥에 누워 다리를 펼칩니다. 오른쪽 무릎을 구부려 오른쪽 발목을 왼쪽 넓적다리 위에 놓되 무릎 바로 위에 올립니다. 양손으로 왼쪽 넓적다리를 잡고 천천히 가슴 쪽으로 당깁니다. 스트레칭을 20~30초간 유지합니다. 스트레칭을 풀고 반대쪽에서 반복합니다.",
      "fr": "Allonge-toi sur le dos, les jambes tendues. Fléchis ton genou droit et pose ta cheville droite sur ta cuisse gauche, juste au-dessus du genou. Saisis ta cuisse gauche des deux mains et tire-la doucement vers ta poitrine. Maintiens l'étirement pendant 20 à 30 secondes. Relâche et répète de l'autre côté."
    }
  },
  {
    "id": "1710",
    "name": "assisted lying gluteus and piriformis stretch",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "assisted",
    "target": "glutes",
    "secondary_muscles": [
      "hamstrings"
    ],
    "image": "images/1710-RQNVT10.jpg",
    "gif_url": "videos/1710-RQNVT10.gif",
    "instruction_steps": [
      "Lie on your back with your legs extended.",
      "Bend your right knee and place your right ankle on your left thigh, just above the knee.",
      "Grasp your left thigh with both hands and gently pull it towards your chest.",
      "Hold the stretch for 20-30 seconds.",
      "Release the stretch and repeat on the other side."
    ],
    "instructions_all": {
      "en": "Lie on your back with your legs extended. Bend your right knee and place your right ankle on your left thigh, just above the knee. Grasp your left thigh with both hands and gently pull it towards your chest. Hold the stretch for 20-30 seconds. Release the stretch and repeat on the other side.",
      "it": "Sdraiati sulla schiena con le gambe distese. Piega il ginocchio destro e posiziona la caviglia destra sulla coscia sinistra, appena sopra il ginocchio. Afferrare la coscia sinistra con entrambe le mani e tirarla delicatamente verso il petto. Mantieni l'allungamento per 20-30 secondi. Rilascia l'allungamento e ripeti dall'altro lato.",
      "tr": "Bacaklarınız uzatılmış halde sırt üstü yatın. Sağ dizinizi bükün ve sağ ayak bileğinizi sol uyluğunuzun üzerine, dizin hemen üstüne yerleştirin. Sol uyluğunuzu iki elinizle kavrayın ve yavaşça göğsünüze doğru çekin. Uzatmayı 20-30 saniye kadar tutun. Uzatmayı bırakın ve diğer tarafta tekrarlayın.",
      "es": "Túmbate sobre tu espalda con las piernas extendidas. Flexiona la rodilla derecha y coloca el tobillo derecho sobre el muslo izquierdo, justo encima de la rodilla. Agarra el muslo izquierdo con ambas manos y jálalo suavemente hacia el pecho. Mantén el estiramiento durante 20-30 segundos. Suelta el estiramiento y repite del otro lado.",
      "ru": "Лягте на спину, вытянув ноги. Согните правое колено и положите правую лодыжку на левое бедро, чуть выше колена. Возьмите левое бедро обеими руками и осторожно потяните его к груди. Удерживайте растяжку 20–30 секунд. Освободите растяжку и повторите с другой стороны.",
      "zh": "仰卧，双腿伸展。 弯曲右膝盖，将右脚踝放在左大腿上，就在膝盖上方。 用双手抓住左大腿，轻轻地将其拉向胸部。 保持拉伸 20-30 秒。 松开拉伸并在另一侧重复。",
      "hi": "अपने पैरों को फैलाकर अपनी पीठ के बल लेटें। अपने दाहिने घुटने को मोड़ें और अपने दाहिने टखने को अपनी बाईं जांघ पर रखें, घुटने के ठीक ऊपर। अपनी बायीं जांघ को दोनों हाथों से पकड़ें और धीरे से अपनी छाती की ओर खींचें। 20-30 सेकंड तक खिंचाव बनाए रखें। खिंचाव छोड़ें और दूसरी तरफ दोहराएं।",
      "pl": "Połóż się na plecach z wyciągniętymi nogami. Ugnij prawe kolano i umieść prawą kostkę na lewym udzie, tuż nad kolanem. Chwyć lewe udo obiema rękami i delikatnie przyciągnij je w kierunku klatki piersiowej. Utrzymaj rozciąganie przez 20-30 sekund. Zwolnij rozciąganie i powtórz po drugiej stronie.",
      "ko": "등을 바닥에 누워 다리를 펼칩니다. 오른쪽 무릎을 구부려 오른쪽 발목을 왼쪽 넓적다리 위에 놓되 무릎 바로 위에 올립니다. 양손으로 왼쪽 넓적다리를 잡고 천천히 가슴 쪽으로 당깁니다. 스트레칭을 20~30초간 유지합니다. 스트레칭을 풀고 반대쪽에서 반복합니다.",
      "fr": "Allonge-toi sur le dos, les jambes tendues. Fléchis ton genou droit et pose ta cheville droite sur ta cuisse gauche, juste au-dessus du genou. Saisis ta cuisse gauche des deux mains et tire-la doucement vers ta poitrine. Maintiens l'étirement pendant 20 à 30 secondes. Relâche l'étirement et répète de l'autre côté."
    }
  },
  {
    "id": "0016",
    "name": "assisted prone hamstring",
    "category": "upper legs",
    "body_part": "upper legs",
    "equipment": "assisted",
    "target": "hamstrings",
    "secondary_muscles": [
      "glutes",
      "lower back"
    ],
    "image": "images/0016-VedGSby.jpg",
    "gif_url": "videos/0016-VedGSby.gif",
    "instruction_steps": [
      "Lie face down on a mat or bench with your legs fully extended.",
      "Have a partner or use a resistance band to secure your ankles.",
      "Engage your hamstrings and lift your legs towards your glutes, keeping your knees straight.",
      "Pause for a moment at the top, then slowly lower your legs back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Lie face down on a mat or bench with your legs fully extended. Have a partner or use a resistance band to secure your ankles. Engage your hamstrings and lift your legs towards your glutes, keeping your knees straight. Pause for a moment at the top, then slowly lower your legs back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Sdraiati a faccia in giù su un tappetino o una panca con le gambe completamente distese. Avere un partner o utilizzare una fascia di resistenza per fissare le caviglie. Coinvolgi i muscoli posteriori della coscia e solleva le gambe verso i glutei, mantenendo le ginocchia dritte. Fai una pausa per un momento in alto, quindi abbassa lentamente le gambe fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Bacaklarınız tamamen uzatılmış halde, bir minder veya bankın üzerine yüzüstü uzanın. Bir partneriniz olsun veya ayak bileklerinizi sabitlemek için bir direnç bandı kullanın. Hamstringlerinizi devreye sokun ve dizlerinizi düz tutarak bacaklarınızı kalça kaslarınıza doğru kaldırın. Tepe noktasında bir an duraklayın, ardından bacaklarınızı yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Túmbate boca abajo sobre una esterilla o un banco con las piernas completamente extendidas. Pide a un compañero o usa una banda elástica para sujetar tus tobillos. Activa los isquiotibiales y levanta las piernas hacia los glúteos, manteniendo las rodillas rectas. Haz una pausa por un momento en la parte superior, luego baja lentamente las piernas de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Лягте лицом вниз на коврик или скамью, полностью вытянув ноги. Попросите партнера или используйте эспандер, чтобы зафиксировать лодыжки. Напрягите мышцы задней поверхности бедра и поднимите ноги к ягодицам, держа колени прямо. Задержитесь на мгновение в верхней точке, затем медленно опустите ноги обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "脸朝下躺在垫子或长凳上，双腿完全伸展。 找一个伙伴或使用阻力带来固定脚踝。 收紧腿筋，将双腿抬向臀肌，保持膝盖伸直。 在顶部暂停片刻，然后慢慢将双腿放回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को पूरी तरह फैलाकर किसी चटाई या बेंच पर मुंह करके लेट जाएं। अपनी एड़ियों को सुरक्षित करने के लिए एक साथी रखें या प्रतिरोध बैंड का उपयोग करें। अपने हैमस्ट्रिंग को संलग्न करें और अपने घुटनों को सीधा रखते हुए अपने पैरों को अपने ग्लूट्स की ओर उठाएं। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपने पैरों को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Połóż się na brzuchu na macie lub ławce z nogami w pełni wyprostowanymi. Poproś partnera lub użyj taśmy oporowej, aby zabezpieczyć kostki. Napnij mięśnie dwugłowe uda i unieś nogi w kierunku pośladków, utrzymując proste kolana. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść nogi z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "매트나 벤치 위에 엎드려 다리를 완전히 펼칩니다. 파트너에게 도움을 받거나 저항 밴드를 사용하여 발목을 고정합니다. 햄스트링을 긴장시키고 무릎을 곧게 펼친 상태로 다리를 둔부 쪽으로 올립니다. 맨 위에서 잠깐 멈췄다가 천천히 다리를 시작 자세로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Allonge-toi face vers le bas sur un tapis ou un banc, les jambes entièrement tendues. Fais-toi aider par un partenaire ou utilise un élastique pour maintenir tes chevilles. Contracte tes ischio-jambiers et amène tes jambes vers tes fessiers, en gardant les genoux tendus. Marque une pause en haut, puis abaisse lentement tes jambes pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0018",
    "name": "assisted standing triceps extension (with towel)",
    "category": "upper arms",
    "body_part": "upper arms",
    "equipment": "assisted",
    "target": "triceps",
    "secondary_muscles": [
      "shoulders"
    ],
    "image": "images/0018-7HcfMBP.jpg",
    "gif_url": "videos/0018-7HcfMBP.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and hold a towel with both hands behind your head.",
      "Keep your elbows close to your ears and your upper arms stationary.",
      "Slowly extend your forearms upward, squeezing your triceps at the top.",
      "Pause for a moment, then slowly lower the towel back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and hold a towel with both hands behind your head. Keep your elbows close to your ears and your upper arms stationary. Slowly extend your forearms upward, squeezing your triceps at the top. Pause for a moment, then slowly lower the towel back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stare con i piedi alla larghezza delle spalle e tenere un asciugamano con entrambe le mani dietro la testa. Tieni i gomiti vicino alle orecchie e la parte superiore delle braccia ferma. Estendi lentamente gli avambracci verso l'alto, contraendo i tricipiti nella parte superiore. Fai una pausa per un momento, quindi abbassa lentamente l'asciugamano nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve iki elinizle başınızın arkasında bir havlu tutun. Dirseklerinizi kulaklarınıza yakın tutun ve üst kollarınızı sabit tutun. Ön kollarınızı yavaşça yukarıya doğru uzatın, üst kısımda trisepsinizi sıkın. Bir an duraklayın, ardından havluyu yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y sostén una toalla con ambas manos detrás de la cabeza. Mantén los codos cerca de las orejas y la parte superior de los brazos quieta. Extiende lentamente los antebrazos hacia arriba, apretando los tríceps en la parte superior. Haz una pausa por un momento, luego baja lentamente la toalla de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, держите полотенце обеими руками за головой. Держите локти близко к ушам, а плечи неподвижно. Медленно вытяните предплечья вверх, сжимая трицепсы вверху. Сделайте паузу на мгновение, затем медленно опустите полотенце обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，双手握住毛巾放在脑后。 保持肘部靠近耳朵，上臂保持静止。 慢慢向上伸展前臂，在顶部挤压三头肌。 暂停片刻，然后慢慢将毛巾放回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और दोनों हाथों को अपने सिर के पीछे रखकर एक तौलिया पकड़ लें। अपनी कोहनियों को अपने कानों के पास रखें और अपनी ऊपरी भुजाओं को स्थिर रखें। धीरे-धीरे अपने अग्रबाहुओं को ऊपर की ओर बढ़ाएं, अपने ट्राइसेप्स को शीर्ष पर दबाएं। एक पल के लिए रुकें, फिर धीरे-धीरे तौलिये को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków i trzymaj ręcznik obiema rękami za głową. Trzymaj łokcie blisko uszu, a ramiona nieruchome. Powoli prostuj przedramiona w górę, ściskając triceps w górnej fazie ruchu. Zatrzymaj się na chwilę, a następnie powoli opuść ręcznik z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "발을 어깨너비로 벌리고 서서 수건을 양손으로 머리 뒤에 잡습니다. 팔꿈치를 귀 쪽에 가깝게 유지하고 위팔을 고정시킵니다. 팔뚝을 천천히 위로 펼치면서 삼두근을 꽉 조입니다. 잠깐 멈춘 후 천천히 수건을 시작 위치로 내려갑니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et tiens une serviette à deux mains derrière ta tête. Garde tes coudes près de tes oreilles et le haut de tes bras immobile. Étends lentement tes avant-bras vers le haut, en contractant tes triceps au sommet. Marque une pause, puis abaisse lentement la serviette jusqu'à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0968",
    "name": "band alternating biceps curl",
    "category": "upper arms",
    "body_part": "upper arms",
    "equipment": "band",
    "target": "biceps",
    "secondary_muscles": [
      "forearms"
    ],
    "image": "images/0968-3omWx6P.jpg",
    "gif_url": "videos/0968-3omWx6P.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and hold the band with an underhand grip, palms facing up.",
      "Keep your elbows close to your sides and slowly curl one arm up towards your shoulder, squeezing your biceps at the top.",
      "Lower the arm back down to the starting position and repeat with the other arm.",
      "Continue alternating arms for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and hold the band with an underhand grip, palms facing up. Keep your elbows close to your sides and slowly curl one arm up towards your shoulder, squeezing your biceps at the top. Lower the arm back down to the starting position and repeat with the other arm. Continue alternating arms for the desired number of repetitions.",
      "it": "Stare con i piedi alla larghezza delle spalle e tenere la fascia con una presa subdola, con i palmi rivolti verso l'alto. Tieni i gomiti vicini ai fianchi e piega lentamente un braccio verso la spalla, contraendo i bicipiti nella parte superiore. Abbassare nuovamente il braccio nella posizione iniziale e ripetere con l'altro braccio. Continua ad alternare le braccia per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve bandı avuçlarınız yukarı bakacak şekilde alttan kavrayarak tutun. Dirseklerinizi yanlarınıza yakın tutun ve bir kolunuzu yavaşça omzunuza doğru kıvırarak pazılarınızı üst kısımda sıkıştırın. Kolunuzu tekrar başlangıç ​​pozisyonuna indirin ve hareketi diğer kolla tekrarlayın. İstenilen sayıda tekrar için kolları değiştirerek devam edin.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y sostén la banda con un agarre supino, con las palmas hacia arriba. Mantén los codos cerca de los costados y flexiona lentamente un brazo hacia el hombro, apretando el bíceps en la parte superior. Baja el brazo de vuelta a la posición inicial y repite con el otro brazo. Continúa alternando los brazos durante el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, возьмитесь за ленту обратным хватом ладонями вверх. Держите локти близко к бокам и медленно поднимите одну руку к плечу, сжимая бицепс вверху. Опустите руку обратно в исходное положение и повторите то же самое с другой рукой. Продолжайте чередовать руки желаемое количество повторений.",
      "zh": "双脚分开与肩同宽站立，反手握住弹力带，手掌朝上。 保持肘部靠近身体两侧，慢慢地将一只手臂向肩膀弯曲，在顶部挤压二头肌。 将手臂放回起始位置，然后用另一只手臂重复此动作。 继续交替手臂进行所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और बैंड को हाथ से पकड़ें, हथेलियाँ ऊपर की ओर हों। अपनी कोहनियों को अपने किनारों के पास रखें और धीरे-धीरे एक हाथ को अपने कंधे की ओर मोड़ें, अपने बाइसेप्स को ऊपर की ओर दबाएं। हाथ को वापस प्रारंभिक स्थिति में लाएँ और दूसरे हाथ से दोहराएँ। दोहराव की वांछित संख्या के लिए भुजाओं को बारी-बारी से जारी रखें।",
      "pl": "Stań w rozkroku na szerokość barków i trzymaj taśmę oporową podchwytem, dłońmi skierowanymi do góry. Trzymaj łokcie blisko boków ciała i powoli uginaj jedno ramię w kierunku barku, ściskając biceps w górnej fazie ruchu. Opuść ramię z powrotem do pozycji wyjściowej i powtórz drugim ramieniem. Kontynuuj naprzemienne wykonywanie ruchu przez zalecaną liczbę powtórzeń.",
      "ko": "발을 어깨너비로 벌리고 서서 밴드를 손바닥이 위를 향하도록 언더핸드 그립으로 잡습니다. 팔꿈치를 몸 옆에 붙이고 한쪽 팔을 천천히 어깨 방향으로 구부리면서 이두근을 꽉 조입니다. 팔을 시작 위치로 내린 후 반대쪽 팔로 반복합니다. 원하는 횟수만큼 팔을 교대로 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et tiens l'élastique en prise supination, paumes tournées vers le haut. Garde tes coudes près de tes flancs et enroule lentement un bras vers ton épaule, en contractant ton biceps en haut. Abaisse le bras jusqu'à la position de départ et répète avec l'autre bras. Continue à alterner les bras pour le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0976",
    "name": "band concentration curl",
    "category": "upper arms",
    "body_part": "upper arms",
    "equipment": "band",
    "target": "biceps",
    "secondary_muscles": [
      "forearms"
    ],
    "image": "images/0976-kmVVAfu.jpg",
    "gif_url": "videos/0976-kmVVAfu.gif",
    "instruction_steps": [
      "Sit on a bench or chair with your legs spread apart and your feet flat on the ground.",
      "Hold one end of the band in your hand and step on the other end with your foot on the same side.",
      "Lean forward slightly and rest your elbow on the inside of your thigh, just above the knee.",
      "With your palm facing up, slowly curl your hand towards your shoulder, keeping your upper arm stationary.",
      "Pause for a moment at the top, then slowly lower your hand back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch sides."
    ],
    "instructions_all": {
      "en": "Sit on a bench or chair with your legs spread apart and your feet flat on the ground. Hold one end of the band in your hand and step on the other end with your foot on the same side. Lean forward slightly and rest your elbow on the inside of your thigh, just above the knee. With your palm facing up, slowly curl your hand towards your shoulder, keeping your upper arm stationary. Pause for a moment at the top, then slowly lower your hand back down to the starting position. Repeat for the desired number of repetitions, then switch sides.",
      "it": "Siediti su una panca o una sedia con le gambe divaricate e i piedi appoggiati a terra. Tieni un'estremità della fascia in mano e cammina sull'altra estremità con il piede sullo stesso lato. Piegati leggermente in avanti e appoggia il gomito all'interno della coscia, appena sopra il ginocchio. Con il palmo rivolto verso l'alto, piega lentamente la mano verso la spalla, mantenendo ferma la parte superiore del braccio. Fermati per un momento in alto, quindi abbassa lentamente la mano nella posizione iniziale. Ripeti per il numero di ripetizioni desiderato, quindi cambia lato.",
      "tr": "Bacaklarınız iki yana açık ve ayaklarınız yere düz basacak şekilde bir bankta veya sandalyede oturun. Bandın bir ucunu elinizde tutun ve ayağınız aynı tarafta olacak şekilde diğer ucuna basın. Hafifçe öne doğru eğilin ve dirseğinizi uyluğunuzun iç kısmına, dizin hemen üstüne koyun. Avucunuz yukarı bakacak şekilde, üst kolunuzu sabit tutarak elinizi yavaşça omzunuza doğru kıvırın. Tepe noktasında bir an duraklayın, ardından elinizi yavaşça başlangıç ​​pozisyonuna indirin. İstenilen tekrar sayısı kadar tekrarlayın, ardından taraf değiştirin.",
      "es": "Siéntate en un banco o silla con las piernas separadas y los pies apoyados en el suelo. Sostén un extremo de la banda en la mano y pisa el otro extremo con el pie del mismo lado. Inclínate ligeramente hacia adelante y apoya el codo en la parte interna del muslo, justo encima de la rodilla. Con la palma hacia arriba, flexiona lentamente la mano hacia el hombro, manteniendo quieta la parte superior del brazo. Haz una pausa por un momento en la parte superior, luego baja lentamente la mano de vuelta a la posición inicial. Repite el número de repeticiones deseado, luego cambia de lado.",
      "ru": "Сядьте на скамью или стул, раздвинув ноги и поставив ступни на землю. Возьмите один конец ленты в руку и наступите на другой конец ногой с той же стороны. Слегка наклонитесь вперед и положите локоть на внутреннюю часть бедра, чуть выше колена. Повернув ладонь вверх, медленно согните руку к плечу, сохраняя плечо неподвижным. Задержитесь на мгновение в верхней точке, затем медленно опустите руку обратно в исходное положение. Повторите желаемое количество повторений, затем поменяйте сторону.",
      "zh": "坐在长凳或椅子上，双腿分开，双脚平放在地上。 用手握住带子的一端，用脚踩在另一端上，同时将脚放在同一侧。 稍微向前倾，将肘部放在大腿内侧，膝盖上方。 手掌朝上，慢慢地将手向肩膀弯曲，保持上臂静止。 在顶部暂停片刻，然后慢慢将手放回起始位置。 重复所需的重复次数，然后换边。",
      "hi": "अपने पैरों को फैलाकर एक बेंच या कुर्सी पर बैठें और आपके पैर जमीन पर सपाट हों। बैंड के एक सिरे को अपने हाथ में पकड़ें और अपने पैर को उसी तरफ रखते हुए दूसरे सिरे पर कदम रखें। थोड़ा आगे झुकें और अपनी कोहनी को घुटने के ठीक ऊपर, अपनी जांघ के अंदर पर टिकाएं। अपनी हथेली को ऊपर की ओर रखते हुए, धीरे-धीरे अपने हाथ को अपने कंधे की ओर मोड़ें, अपनी ऊपरी भुजा को स्थिर रखें। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपने हाथ को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएं, फिर पक्ष बदलें।",
      "pl": "Usiądź na ławce lub krześle z nogami rozstawionymi i stopami płasko na podłodze. Trzymaj jeden koniec taśmy w dłoni i stań stopą po tej samej stronie na drugim końcu. Pochyl się lekko do przodu i oprzyj łokieć na wewnętrznej stronie uda, tuż nad kolanem. Dłonią skierowaną do góry powoli uginaj rękę w kierunku barku, utrzymując ramię nieruchome. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść rękę z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy, a następnie zmień stronę.",
      "ko": "벤치나 의자에 앉아 다리를 벌리고 발을 바닥에 붙입니다. 밴드의 한쪽 끝을 손으로 잡고 다른 쪽 끝을 같은 쪽 발로 밟습니다. 살짝 앞으로 기울이고 팔꿈치를 무릎 바로 위 넓적다리 안쪽에 놓습니다. 손바닥이 위를 향하게 하여 천천히 손을 어깨 쪽으로 말아올리되 위팔은 고정한 상태를 유지합니다. 꼭짓점에서 잠깐 멈춘 후 천천히 손을 시작 자세로 내립니다. 원하는 반복 횟수만큼 반복한 후 반대쪽으로 바꿉니다.",
      "fr": "Assieds-toi sur un banc ou une chaise, les jambes écartées et les pieds à plat sur le sol. Tiens une extrémité de l'élastique dans ta main et pose le pied du même côté sur l'autre extrémité. Penche-toi légèrement en avant et pose ton coude sur l'intérieur de ta cuisse, juste au-dessus du genou. La paume tournée vers le haut, fléchis lentement ta main vers ton épaule en gardant le haut de ton bras immobile. Marque une pause en haut, puis abaisse lentement ta main pour revenir à la position de départ. Répète le nombre de répétitions souhaité, puis change de côté."
    }
  },
  {
    "id": "0986",
    "name": "band one arm overhead biceps curl",
    "category": "upper arms",
    "body_part": "upper arms",
    "equipment": "band",
    "target": "biceps",
    "secondary_muscles": [
      "forearms",
      "shoulders"
    ],
    "image": "images/0986-UNAB8ak.jpg",
    "gif_url": "videos/0986-UNAB8ak.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and place one end of the band under your foot.",
      "Hold the other end of the band with your arm fully extended overhead, palm facing forward.",
      "Keeping your upper arm stationary, curl your forearm towards your shoulder, squeezing your biceps.",
      "Pause for a moment at the top, then slowly lower your forearm back to the starting position.",
      "Repeat for the desired number of repetitions, then switch arms."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and place one end of the band under your foot. Hold the other end of the band with your arm fully extended overhead, palm facing forward. Keeping your upper arm stationary, curl your forearm towards your shoulder, squeezing your biceps. Pause for a moment at the top, then slowly lower your forearm back to the starting position. Repeat for the desired number of repetitions, then switch arms.",
      "it": "Stai con i piedi alla larghezza delle spalle e posiziona un'estremità della fascia sotto il piede. Tieni l'altra estremità della fascia con il braccio completamente esteso sopra la testa, con il palmo rivolto in avanti. Mantenendo ferma la parte superiore del braccio, piega l'avambraccio verso la spalla, contraendo i bicipiti. Fai una pausa per un momento in alto, quindi abbassa lentamente l'avambraccio nella posizione iniziale. Ripeti per il numero di ripetizioni desiderato, quindi cambia braccio.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve bandın bir ucunu ayağınızın altına yerleştirin. Bandın diğer ucunu kolunuz tamamen uzatılmış, avuç içi öne bakacak şekilde tutun. Üst kolunuzu sabit tutarak ön kolunuzu omzunuza doğru kıvırın ve bicepslerinizi sıkın. Tepe noktasında bir an duraklayın, ardından ön kolunuzu yavaşça başlangıç ​​pozisyonuna indirin. İstenilen tekrar sayısı kadar tekrarlayın, ardından kolları değiştirin.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y coloca un extremo de la banda bajo el pie. Sostén el otro extremo de la banda con el brazo completamente extendido por encima de la cabeza, con la palma hacia adelante. Manteniendo quieta la parte superior del brazo, flexiona el antebrazo hacia el hombro, apretando el bíceps. Haz una pausa por un momento en la parte superior, luego baja lentamente el antebrazo de vuelta a la posición inicial. Repite el número de repeticiones deseado, luego cambia de brazo.",
      "ru": "Встаньте, ноги на ширине плеч, и поместите один конец ленты под ногу. Держите другой конец ленты, полностью вытянув руку над головой ладонью вперед. Удерживая плечо неподвижно, согните предплечье к плечу, сжимая бицепс. Задержитесь на мгновение в верхней точке, затем медленно опустите предплечье обратно в исходное положение. Повторите желаемое количество повторений, затем поменяйте руки.",
      "zh": "双脚分开与肩同宽站立，将弹力带的一端放在脚下。 握住弹力带的另一端，手臂完全伸过头顶，手掌朝前。 保持上臂静止，将前臂向肩膀弯曲，挤压二头肌。 在顶部停顿片刻，然后慢慢将前臂放回起始位置。 重复所需的重复次数，然后换臂。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और बैंड के एक सिरे को अपने पैर के नीचे रखें। बैंड के दूसरे सिरे को अपने हाथ से पूरी तरह ऊपर की ओर फैलाकर पकड़ें, हथेली आगे की ओर हो। अपनी ऊपरी भुजा को स्थिर रखते हुए, अपने अग्रबाहु को अपने कंधे की ओर मोड़ें, अपने बाइसेप्स को निचोड़ें। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपनी बांह को प्रारंभिक स्थिति में वापस लाएं। दोहराव की वांछित संख्या के लिए दोहराएं, फिर हथियार बदल लें।",
      "pl": "Stań w rozkroku na szerokość barków i umieść jeden koniec taśmy pod stopą. Trzymaj drugi koniec taśmy ramieniem w pełni wyprostowanym nad głową, dłonią skierowaną do przodu. Utrzymując ramię nieruchome, uginaj przedramię w kierunku barku, ściskając biceps. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść przedramię z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy, a następnie zmień ramię.",
      "ko": "발을 어깨너비로 벌리고 서서 밴드의 한쪽 끝을 발 아래 놓습니다. 밴드의 다른 쪽 끝을 팔을 머리 위로 완전히 펼친 상태로 들되 손바닥이 앞을 향하게 합니다. 위팔을 고정한 상태로 전완을 어깨 쪽으로 말아올려 이두근을 짜냅니다. 꼭짓점에서 잠깐 멈춘 후 천천히 전완을 시작 자세로 내립니다. 원하는 반복 횟수만큼 반복한 후 팔을 바꿉니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et place une extrémité de l'élastique sous ton pied. Tiens l'autre extrémité de l'élastique, le bras complètement étendu au-dessus de la tête, la paume tournée vers l'avant. En gardant le haut du bras immobile, fléchis ton avant-bras vers ton épaule, en contractant tes biceps. Marque une pause en haut, puis abaisse lentement ton avant-bras pour revenir à la position de départ. Répète le nombre de répétitions souhaité, puis change de bras."
    }
  },
  {
    "id": "0998",
    "name": "band side triceps extension",
    "category": "upper arms",
    "body_part": "upper arms",
    "equipment": "band",
    "target": "triceps",
    "secondary_muscles": [
      "shoulders"
    ],
    "image": "images/0998-obe5LMq.jpg",
    "gif_url": "videos/0998-obe5LMq.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and hold the band with both hands, palms facing down.",
      "Extend your arms straight out to the sides, keeping them parallel to the ground.",
      "Slowly bend your elbows and bring your hands towards your shoulders, keeping your upper arms still.",
      "Pause for a moment, then slowly extend your arms back out to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and hold the band with both hands, palms facing down. Extend your arms straight out to the sides, keeping them parallel to the ground. Slowly bend your elbows and bring your hands towards your shoulders, keeping your upper arms still. Pause for a moment, then slowly extend your arms back out to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stare con i piedi alla larghezza delle spalle e tenere la fascia con entrambe le mani, i palmi rivolti verso il basso. Estendi le braccia verso i lati, mantenendole parallele al suolo. Piega lentamente i gomiti e porta le mani verso le spalle, mantenendo ferma la parte superiore delle braccia. Fai una pausa per un momento, quindi estendi lentamente le braccia nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve bandı iki elinizle, avuçlarınız aşağıya bakacak şekilde tutun. Kollarınızı yere paralel olacak şekilde yanlara doğru uzatın. Dirseklerinizi yavaşça bükün ve üst kollarınızı sabit tutarak ellerinizi omuzlarınıza doğru getirin. Bir an duraklayın, ardından kollarınızı yavaşça başlangıç ​​pozisyonuna geri uzatın. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y sostén la banda con ambas manos, con las palmas hacia abajo. Extiende los brazos hacia los lados, manteniéndolos paralelos al suelo. Flexiona lentamente los codos y lleva las manos hacia los hombros, manteniendo quieta la parte superior de los brazos. Haz una pausa por un momento, luego extiende lentamente los brazos de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, возьмитесь за ленту обеими руками ладонями вниз. Вытяните руки прямо в стороны, держа их параллельно земле. Медленно согните локти и поднесите руки к плечам, сохраняя плечи неподвижными. Сделайте паузу на мгновение, затем медленно вытяните руки обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，双手握住弹力带，掌心朝下。 将手臂伸直至两侧，保持与地面平行。 慢慢弯曲肘部，将双手放在肩膀上，保持上臂不动。 暂停片刻，然后慢慢将手臂伸回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और बैंड को दोनों हाथों से पकड़ें, हथेलियाँ नीचे की ओर हों। अपनी भुजाओं को ज़मीन के समानांतर रखते हुए, भुजाओं तक सीधा फैलाएँ। धीरे-धीरे अपनी कोहनियों को मोड़ें और अपने हाथों को अपने कंधों की ओर लाएं, अपनी ऊपरी भुजाओं को स्थिर रखें। एक पल के लिए रुकें, फिर धीरे-धीरे अपनी भुजाओं को वापस प्रारंभिक स्थिति में फैलाएँ। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków i trzymaj taśmę obiema rękami, dłonie skierowane w dół. Wyprostuj ramiona na boki, równolegle do podłogi. Powoli uginaj łokcie i przyciągaj dłonie w kierunku barków, utrzymując ramiona nieruchome. Zatrzymaj się na chwilę, a następnie powoli wyprostuj ramiona z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "어깨 너비로 발을 벌리고 서서 두 손으로 밴드를 잡되 손바닥이 아래를 향하도록 합니다. 팔을 옆으로 곧게 뻗어 지면과 평행하게 유지합니다. 천천히 팔꿈치를 구부려 양손을 어깨 쪽으로 가져오면서 위팔은 고정합니다. 잠시 멈춘 후, 천천히 팔을 처음 위치로 뻗어냅니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et tiens l'élastique à deux mains, paumes tournées vers le bas. Étends les bras droit sur les côtés, en les gardant parallèles au sol. Fléchis lentement les coudes et ramène tes mains vers tes épaules, en gardant le haut des bras immobile. Marque une pause, puis étends lentement tes bras jusqu'à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0977",
    "name": "band front lateral raise",
    "category": "shoulders",
    "body_part": "shoulders",
    "equipment": "band",
    "target": "delts",
    "secondary_muscles": [
      "traps",
      "upper back"
    ],
    "image": "images/0977-sTg7iys.jpg",
    "gif_url": "videos/0977-sTg7iys.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and hold the band in front of your thighs with your palms facing down.",
      "Keep your arms straight and lift the band up in front of you until your arms are parallel to the ground.",
      "Pause for a moment at the top, then slowly lower the band back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and hold the band in front of your thighs with your palms facing down. Keep your arms straight and lift the band up in front of you until your arms are parallel to the ground. Pause for a moment at the top, then slowly lower the band back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stare con i piedi alla larghezza delle spalle e tenere la fascia davanti alle cosce con i palmi rivolti verso il basso. Tieni le braccia tese e solleva la fascia davanti a te finché le braccia non sono parallele al suolo. Fai una pausa per un momento in alto, quindi abbassa lentamente la fascia fino alla posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve bandı avuçlarınız aşağıya bakacak şekilde uyluklarınızın önünde tutun. Kollarınızı düz tutun ve kollarınız yere paralel oluncaya kadar bandı önünüze doğru kaldırın. Üst noktada bir an duraklayın, ardından bandı yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y sostén la banda frente a los muslos con las palmas hacia abajo. Mantén los brazos rectos y levanta la banda frente a ti hasta que los brazos queden paralelos al suelo. Haz una pausa por un momento en la parte superior, luego baja lentamente la banda de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, держите ленту перед бедрами ладонями вниз. Держите руки прямо и поднимите ленту перед собой, пока руки не станут параллельны земле. Задержитесь на мгновение в верхней точке, затем медленно опустите ленту обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，将弹力带放在大腿前面，手掌朝下。 保持双臂伸直，将弹力带举到身前，直到双臂与地面平行。 在顶部暂停片刻，然后慢慢将弹力带放回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और अपनी हथेलियों को नीचे की ओर रखते हुए बैंड को अपनी जांघों के सामने पकड़ें। अपनी भुजाओं को सीधा रखें और बैंड को अपने सामने तब तक ऊपर उठाएं जब तक कि आपकी भुजाएं जमीन के समानांतर न हो जाएं। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे बैंड को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków i trzymaj taśmę przed udami, dłońmi skierowanymi w dół. Utrzymuj ramiona proste i unieś taśmę przed sobą, aż ramiona będą równoległe do podłogi. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść taśmę z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "발을 어깨너비로 벌리고 서서 밴드를 넓적다리 앞에 들되 손바닥이 아래를 향하게 합니다. 팔을 곧게 펼친 상태로 밴드를 앞으로 들어올려 팔이 지면과 평행하게 만듭니다. 꼭짓점에서 잠깐 멈춘 후 천천히 밴드를 시작 자세로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et tiens l'élastique devant tes cuisses, paumes tournées vers le bas. Garde tes bras tendus et lève l'élastique devant toi jusqu'à ce que tes bras soient parallèles au sol. Marque une pause en haut, puis abaisse lentement l'élastique pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0978",
    "name": "band front raise",
    "category": "shoulders",
    "body_part": "shoulders",
    "equipment": "band",
    "target": "delts",
    "secondary_muscles": [
      "triceps",
      "upper back"
    ],
    "image": "images/0978-TFA88iB.jpg",
    "gif_url": "videos/0978-TFA88iB.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and hold the band in front of your thighs with your palms facing down.",
      "Keep your arms straight and slowly raise them forward until they are parallel to the ground.",
      "Pause for a moment at the top, then slowly lower your arms back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and hold the band in front of your thighs with your palms facing down. Keep your arms straight and slowly raise them forward until they are parallel to the ground. Pause for a moment at the top, then slowly lower your arms back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stare con i piedi alla larghezza delle spalle e tenere la fascia davanti alle cosce con i palmi rivolti verso il basso. Tieni le braccia tese e sollevale lentamente in avanti finché non sono parallele al suolo. Fai una pausa per un momento in alto, quindi abbassa lentamente le braccia fino alla posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve bandı avuçlarınız aşağıya bakacak şekilde uyluklarınızın önünde tutun. Kollarınızı düz tutun ve yere paralel oluncaya kadar yavaşça öne doğru kaldırın. Tepe noktasında bir an duraklayın, ardından kollarınızı yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y sostén la banda frente a los muslos con las palmas hacia abajo. Mantén los brazos rectos y levántalos lentamente hacia adelante hasta que queden paralelos al suelo. Haz una pausa por un momento en la parte superior, luego baja lentamente los brazos de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, держите ленту перед бедрами ладонями вниз. Держите руки прямо и медленно поднимите их вперед, пока они не станут параллельны земле. Задержитесь на мгновение в верхней точке, затем медленно опустите руки обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，将弹力带放在大腿前面，手掌朝下。 保持手臂伸直，慢慢向前举起，直到与地面平行。 在顶部暂停片刻，然后慢慢将手臂放回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और अपनी हथेलियों को नीचे की ओर रखते हुए बैंड को अपनी जांघों के सामने पकड़ें। अपनी भुजाओं को सीधा रखें और धीरे-धीरे उन्हें आगे की ओर उठाएं जब तक कि वे जमीन के समानांतर न हो जाएं। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपनी भुजाओं को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków i trzymaj taśmę przed udami, dłońmi skierowanymi w dół. Utrzymuj ramiona proste i powoli unoś je do przodu, aż będą równoległe do podłogi. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść ramiona z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "발을 어깨너비로 벌리고 서서 밴드를 넓적다리 앞에 들되 손바닥이 아래를 향하게 합니다. 팔을 곧게 펼친 상태로 천천히 팔을 앞으로 올려 지면과 평행하게 만듭니다. 꼭짓점에서 잠깐 멈춘 후 천천히 팔을 시작 자세로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et tiens l'élastique devant tes cuisses, paumes tournées vers le bas. Garde tes bras tendus et lève-les lentement vers l'avant jusqu'à ce qu'ils soient parallèles au sol. Marque une pause en haut, puis abaisse lentement tes bras pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0993",
    "name": "band reverse fly",
    "category": "shoulders",
    "body_part": "shoulders",
    "equipment": "band",
    "target": "delts",
    "secondary_muscles": [
      "upper back",
      "trapezius"
    ],
    "image": "images/0993-sTfvVsG.jpg",
    "gif_url": "videos/0993-sTfvVsG.gif",
    "instruction_steps": [
      "Attach the band to a stationary object at chest height.",
      "Stand with your feet shoulder-width apart and hold the band with both hands in front of you.",
      "Keep your arms straight and lift them out to the sides until they are parallel to the ground.",
      "Squeeze your shoulder blades together at the top of the movement.",
      "Slowly lower your arms back to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Attach the band to a stationary object at chest height. Stand with your feet shoulder-width apart and hold the band with both hands in front of you. Keep your arms straight and lift them out to the sides until they are parallel to the ground. Squeeze your shoulder blades together at the top of the movement. Slowly lower your arms back to the starting position. Repeat for the desired number of repetitions.",
      "it": "Attaccare la fascia a un oggetto fermo all'altezza del petto. Stai con i piedi alla larghezza delle spalle e tieni la fascia con entrambe le mani davanti a te. Tieni le braccia tese e sollevale lateralmente finché non sono parallele al suolo. Stringi le scapole insieme nella parte superiore del movimento. Abbassa lentamente le braccia nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Bandı göğüs yüksekliğinde sabit bir nesneye takın. Ayaklarınızı omuz genişliğinde açın ve bandı iki elinizle önünüzde tutun. Kollarınızı düz tutun ve yere paralel oluncaya kadar yanlara doğru kaldırın. Hareketin üst noktasında kürek kemiklerinizi birbirine doğru sıkın. Kollarınızı yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Sujeta la banda a un objeto fijo a la altura del pecho. Ponte de pie con los pies separados a la altura de los hombros y sostén la banda con ambas manos frente a ti. Mantén los brazos rectos y levántalos hacia los lados hasta que queden paralelos al suelo. Junta los omóplatos en la parte superior del movimiento. Baja lentamente los brazos de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Прикрепите ремешок к неподвижному объекту на уровне груди. Встаньте, ноги на ширине плеч, держите ленту обеими руками перед собой. Держите руки прямо и поднимите их в стороны, пока они не станут параллельны земле. В верхней точке движения сведите лопатки вместе. Медленно опустите руки обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "将带子固定在胸部高度的固定物体上。 双脚分开与肩同宽站立，双手握住弹力带放在身前。 保持手臂伸直并将其向两侧抬起，直到与地面平行。 在动作的最高点将肩胛骨挤压在一起。 慢慢地将手臂放回起始位置。 重复所需的重复次数。",
      "hi": "बैंड को छाती की ऊंचाई पर किसी स्थिर वस्तु से जोड़ें। अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और दोनों हाथों से बैंड को अपने सामने पकड़ लें। अपनी भुजाओं को सीधा रखें और उन्हें बगल की ओर तब तक उठाएँ जब तक वे ज़मीन के समानांतर न हो जाएँ। आंदोलन के शीर्ष पर अपने कंधे के ब्लेड को एक साथ निचोड़ें। धीरे-धीरे अपनी भुजाओं को प्रारंभिक स्थिति में वापस लाएँ। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Przymocuj taśmę do nieruchomego obiektu na wysokości klatki piersiowej. Stań w rozkroku na szerokość barków i trzymaj taśmę obiema rękami przed sobą. Utrzymuj ramiona proste i unieś je na boki, aż będą równoległe do podłogi. Ściśnij łopatki razem w górnej fazie ruchu. Powoli opuść ramiona z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "밴드를 가슴 높이의 고정된 물체에 부착합니다. 발을 어깨너비로 벌리고 서서 양손으로 밴드를 앞에서 잡습니다. 팔을 곧게 펼친 상태로 팔을 옆으로 들어올려 지면과 평행하게 만듭니다. 동작의 꼭짓점에서 견갑골을 함께 짜냅니다. 천천히 팔을 시작 자세로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Fixe l'élastique à un objet fixe à hauteur de la poitrine. Tiens-toi debout, les pieds écartés à la largeur des épaules et tiens l'élastique à deux mains devant toi. Garde tes bras tendus et lève-les sur les côtés jusqu'à ce qu'ils soient parallèles au sol. Contracte tes omoplates l'une vers l'autre en haut du mouvement. Abaisse lentement tes bras vers la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0997",
    "name": "band shoulder press",
    "category": "shoulders",
    "body_part": "shoulders",
    "equipment": "band",
    "target": "delts",
    "secondary_muscles": [
      "triceps",
      "upper back"
    ],
    "image": "images/0997-peAeMR3.jpg",
    "gif_url": "videos/0997-peAeMR3.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and place the band under your feet.",
      "Hold the band with your palms facing forward and raise your hands to shoulder height, elbows bent.",
      "Press the band overhead, fully extending your arms.",
      "Pause for a moment at the top, then slowly lower the band back to shoulder height.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and place the band under your feet. Hold the band with your palms facing forward and raise your hands to shoulder height, elbows bent. Press the band overhead, fully extending your arms. Pause for a moment at the top, then slowly lower the band back to shoulder height. Repeat for the desired number of repetitions.",
      "it": "Stai con i piedi alla larghezza delle spalle e posiziona la fascia sotto i piedi. Tieni la fascia con i palmi rivolti in avanti e alza le mani all'altezza delle spalle, con i gomiti piegati. Premi la fascia sopra la testa, estendendo completamente le braccia. Fermati per un momento in alto, quindi abbassa lentamente la fascia all'altezza delle spalle. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve bandı ayaklarınızın altına yerleştirin. Bandı avuçlarınız öne bakacak şekilde tutun ve ellerinizi omuz hizasına kadar kaldırın, dirsekleriniz bükülü olsun. Kollarınızı tamamen uzatarak bandı başınızın üzerine bastırın. Üst kısımda bir an duraklayın, ardından bandı yavaşça omuz yüksekliğine indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y coloca la banda bajo los pies. Sostén la banda con las palmas hacia adelante y eleva las manos a la altura de los hombros, con los codos flexionados. Empuja la banda por encima de la cabeza, extendiendo completamente los brazos. Haz una pausa por un momento en la parte superior, luego baja lentamente la banda de vuelta a la altura de los hombros. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, и поместите ленту под ноги. Держите ленту ладонями вперед и поднимите руки на высоту плеч, локти согнуты. Нажмите на ленту над головой, полностью выпрямив руки. Задержитесь на мгновение в верхней точке, затем медленно опустите ленту обратно на высоту плеч. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，将弹力带放在脚下。 手掌朝前握住弹力带，将双手举至肩高，肘部弯曲。 将弹力带压过头顶，充分伸展双臂。 在顶部暂停片刻，然后慢慢将阻力带降低至肩部高度。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और बैंड को अपने पैरों के नीचे रखें। अपनी हथेलियों को आगे की ओर रखते हुए बैंड को पकड़ें और अपने हाथों को कंधे की ऊंचाई तक उठाएं, कोहनियां मुड़ी हुई हों। अपनी बाहों को पूरी तरह फैलाते हुए बैंड को ऊपर की ओर दबाएं। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे बैंड को वापस कंधे की ऊंचाई तक ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków i umieść taśmę pod stopami. Trzymaj taśmę dłońmi skierowanymi do przodu i unieś ręce na wysokość barków, łokcie ugięte. Wypchnij taśmę nad głowę, w pełni prostując ramiona. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść taśmę z powrotem na wysokość barków. Powtórz zalecaną liczbę razy.",
      "ko": "발을 어깨너비로 벌리고 서서 발 아래에 밴드를 놓습니다. 손바닥이 앞을 향하게 하여 밴드를 잡고 손을 어깨 높이로 올려 팔꿈치를 구부립니다. 밴드를 머리 위로 눌러 팔을 완전히 펼칩니다. 꼭짓점에서 잠깐 멈춘 후 천천히 밴드를 어깨 높이로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et place l'élastique sous tes pieds. Tiens l'élastique, les paumes tournées vers l'avant, et lève tes mains à hauteur d'épaule, les coudes fléchis. Pousse l'élastique au-dessus de ta tête, en tendant complètement tes bras. Marque une pause en haut, puis abaisse lentement l'élastique à hauteur des épaules. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1022",
    "name": "band standing rear delt row",
    "category": "shoulders",
    "body_part": "shoulders",
    "equipment": "band",
    "target": "delts",
    "secondary_muscles": [
      "trapezius",
      "rhomboids",
      "biceps"
    ],
    "image": "images/1022-tc5dYrf.jpg",
    "gif_url": "videos/1022-tc5dYrf.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and place the band under your feet.",
      "Hold the band handles with your palms facing each other and your arms extended in front of you.",
      "Bend your knees slightly and hinge forward at the hips, keeping your back straight.",
      "Pull the band towards your chest, squeezing your shoulder blades together.",
      "Pause for a moment at the top, then slowly release the tension and return to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and place the band under your feet. Hold the band handles with your palms facing each other and your arms extended in front of you. Bend your knees slightly and hinge forward at the hips, keeping your back straight. Pull the band towards your chest, squeezing your shoulder blades together. Pause for a moment at the top, then slowly release the tension and return to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stai con i piedi alla larghezza delle spalle e posiziona la fascia sotto i piedi. Tieni le maniglie della fascia con i palmi delle mani uno di fronte all'altro e le braccia distese davanti a te. Piega leggermente le ginocchia e fai perno in avanti sui fianchi, mantenendo la schiena dritta. Tira la fascia verso il petto, stringendo insieme le scapole. Fermati per un momento in alto, quindi rilascia lentamente la tensione e torna alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve bandı ayaklarınızın altına yerleştirin. Bandın saplarını avuçlarınız birbirine bakacak ve kollarınız önünüzde uzatılmış şekilde tutun. Dizlerinizi hafifçe bükün ve sırtınızı düz tutarak kalçalarınızdan öne doğru eğilin. Bandı göğsünüze doğru çekin, kürek kemiklerinizi birbirine sıkıştırın. Tepe noktasında bir an duraklayın, ardından yavaşça gerilimi bırakın ve başlangıç ​​pozisyonuna dönün. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y coloca la banda bajo los pies. Sostén las agarraderas de la banda con las palmas mirándose entre sí y los brazos extendidos frente a ti. Flexiona ligeramente las rodillas e inclínate hacia adelante desde las caderas, manteniendo la espalda recta. Tira de la banda hacia el pecho, juntando los omóplatos. Haz una pausa por un momento en la parte superior, luego suelta lentamente la tensión y regresa a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч, и поместите ленту под ноги. Держите ручки лент ладонями друг к другу, а руки вытянуты перед собой. Слегка согните колени и наклонитесь вперед в бедрах, сохраняя спину прямой. Потяните ленту к груди, сжимая лопатки вместе. Задержитесь на мгновение в верхней точке, затем медленно ослабьте напряжение и вернитесь в исходное положение. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，将弹力带放在脚下。 双手握住弹力带手柄，手掌相对，双臂向前伸展。 稍微弯曲膝盖，髋部向前转动，保持背部挺直。 将弹力带拉向胸部，将肩胛骨挤压在一起。 在最高点停顿片刻，然后慢慢释放张力，回到起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और बैंड को अपने पैरों के नीचे रखें। अपनी हथेलियों को एक-दूसरे के सामने रखते हुए और अपनी बाहों को अपने सामने फैलाकर बैंड के हैंडल को पकड़ें। अपने घुटनों को थोड़ा मोड़ें और अपनी पीठ को सीधा रखते हुए कूल्हों पर आगे की ओर झुकें। अपने कंधे के ब्लेड को एक साथ निचोड़ते हुए, बैंड को अपनी छाती की ओर खींचें। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे तनाव छोड़ें और प्रारंभिक स्थिति में लौट आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków i umieść taśmę pod stopami. Trzymaj uchwyty taśmy dłońmi zwróconymi do siebie, ramiona wyciągnięte przed sobą. Ugnij lekko kolana i pochyl się do przodu w biodrach, utrzymując proste plecy. Przyciągnij taśmę w kierunku klatki piersiowej, ściskając łopatki. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli zwolnij napięcie i wróć do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "어깨 너비로 발을 벌리고 서서 밴드를 발 아래에 놓습니다. 밴드 손잡이를 손바닥이 서로 마주 보도록 잡고 팔을 앞으로 쭉 뻗습니다. 무릎을 약간 구부리고 허리에서 앞으로 숙이면서 등을 곧게 펩니다. 밴드를 가슴 쪽으로 당기며 어깨날을 조입니다. 맨 위에서 잠시 멈춘 후, 천천히 장력을 풀고 원래 위치로 돌아옵니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et place l'élastique sous tes pieds. Tiens les poignées de l'élastique, les paumes tournées l'une vers l'autre et les bras étendus devant toi. Fléchis légèrement les genoux et bascule vers l'avant au niveau des hanches en gardant le dos droit. Tire l'élastique vers ta poitrine, en contractant tes omoplates. Marque une pause en haut, puis relâche lentement la tension et reviens à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0001",
    "name": "3/4 sit-up",
    "category": "waist",
    "body_part": "waist",
    "equipment": "body weight",
    "target": "abs",
    "secondary_muscles": [
      "hip flexors",
      "lower back"
    ],
    "image": "images/0001-2gPfomN.jpg",
    "gif_url": "videos/0001-2gPfomN.gif",
    "instruction_steps": [
      "Lie flat on your back with your knees bent and feet flat on the ground.",
      "Place your hands behind your head with your elbows pointing outwards.",
      "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
      "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Lie flat on your back with your knees bent and feet flat on the ground. Place your hands behind your head with your elbows pointing outwards. Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle. Pause for a moment at the top, then slowly lower your upper body back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Sdraiati sulla schiena con le ginocchia piegate e i piedi appoggiati a terra. Metti le mani dietro la testa con i gomiti rivolti verso l'esterno. Coinvolgendo gli addominali, solleva lentamente la parte superiore del corpo da terra, piegandoti in avanti finché il busto non forma un angolo di 45 gradi. Fermati per un momento in alto, quindi abbassa lentamente la parte superiore del corpo fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Dizleriniz bükülü ve ayaklarınız yere düz basacak şekilde sırt üstü yatın. Ellerinizi başınızın arkasına, dirsekleriniz dışarı bakacak şekilde yerleştirin. Karın kaslarınızı devreye sokarak üst bedeninizi yavaşça yerden kaldırın ve gövdeniz 45 derecelik bir açıya gelene kadar öne doğru kıvrılın. Tepe noktasında bir an duraklayın, ardından üst vücudunuzu yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Túmbate sobre tu espalda con las rodillas flexionadas y los pies apoyados en el suelo. Coloca las manos detrás de la cabeza con los codos apuntando hacia afuera. Activando el abdomen, levanta lentamente la parte superior del cuerpo del suelo, curvándote hacia adelante hasta que tu torso forme un ángulo de 45 grados. Haz una pausa por un momento en la parte superior, luego baja lentamente la parte superior del cuerpo de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Лягте на спину, согните колени и поставьте ступни на землю. Положите руки за голову локтями наружу. Включив пресс, медленно поднимите верхнюю часть тела от земли, наклоняясь вперед, пока туловище не окажется под углом 45 градусов. Задержитесь на мгновение в верхней точке, затем медленно опустите верхнюю часть тела обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "平躺，膝盖弯曲，双脚平放在地上。 将双手放在脑后，肘部朝外。 收紧腹肌，慢慢将上半身抬离地面，向前卷曲，直到躯干呈 45 度角。 在顶部停顿片刻，然后慢慢将上半身放回起始位置。 重复所需的重复次数。",
      "hi": "अपने घुटनों को मोड़कर और पैरों को ज़मीन पर सपाट रखते हुए अपनी पीठ के बल लेट जाएँ। अपने हाथों को अपने सिर के पीछे रखें और अपनी कोहनियों को बाहर की ओर रखें। अपने पेट को शामिल करते हुए, धीरे-धीरे अपने ऊपरी शरीर को जमीन से ऊपर उठाएं, आगे की ओर झुकें जब तक कि आपका धड़ 45 डिग्री के कोण पर न आ जाए। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपने ऊपरी शरीर को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Połóż się płasko na plecach, ugnij kolana i oprzyj stopy płasko na podłodze. Umieść dłonie za głową, kierując łokcie na zewnątrz. Angażując mięśnie brzucha, powoli unieś górną część ciała nad podłogę, zwijając się do przodu, aż tułów znajdzie się pod kątem 45 stopni. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść górną część ciała z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "등을 바닥에 누워 무릎을 구부리고 발을 바닥에 붙입니다. 손을 머리 뒤에 깍지껴 팔꿈치가 바깥쪽을 향하도록 합니다. 복근을 사용하여 천천히 윗몸을 들어 올려 몸통이 45도 각도가 될 때까지 앞쪽으로 구부립니다. 맨 위에서 잠깐 멈췄다가 천천히 윗몸을 시작 자세로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Allonge-toi sur le dos, les genoux fléchis et les pieds à plat au sol. Place tes mains derrière ta tête avec tes coudes pointés vers l'extérieur. En gainant tes abdominaux, soulève lentement le haut de ton corps du sol, en t'enroulant vers l'avant jusqu'à ce que ton torse forme un angle de 45 degrés. Marque une pause en haut, puis abaisse lentement le haut de ton corps pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0002",
    "name": "45° side bend",
    "category": "waist",
    "body_part": "waist",
    "equipment": "body weight",
    "target": "abs",
    "secondary_muscles": [
      "obliques"
    ],
    "image": "images/0002-Hy9D21L.jpg",
    "gif_url": "videos/0002-Hy9D21L.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and your arms extended straight down by your sides.",
      "Keeping your back straight and your core engaged, slowly bend your torso to one side, lowering your hand towards your knee.",
      "Pause for a moment at the bottom, then slowly return to the starting position.",
      "Repeat on the other side.",
      "Continue alternating sides for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and your arms extended straight down by your sides. Keeping your back straight and your core engaged, slowly bend your torso to one side, lowering your hand towards your knee. Pause for a moment at the bottom, then slowly return to the starting position. Repeat on the other side. Continue alternating sides for the desired number of repetitions.",
      "it": "Stai con i piedi alla larghezza delle spalle e le braccia distese lungo i fianchi. Mantenendo la schiena dritta e il core impegnato, piega lentamente il busto da un lato, abbassando la mano verso il ginocchio. Fermati per un momento in basso, quindi torna lentamente alla posizione di partenza. Ripeti dall'altra parte. Continua ad alternare i lati per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız omuz genişliğinde açık ve kollarınız yanlarınızda düz bir şekilde uzatılmış şekilde ayakta durun. Sırtınızı düz ve merkez bölgenizi meşgul tutarak gövdenizi yavaşça bir tarafa doğru eğin ve elinizi dizinize doğru indirin. Altta bir an duraklayın, ardından yavaşça başlangıç ​​pozisyonuna dönün. Diğer tarafta tekrarlayın. İstenilen tekrar sayısı için alternatif taraflara devam edin.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y los brazos extendidos hacia abajo a los lados. Manteniendo la espalda recta y el core activado, flexiona lentamente el torso hacia un lado, bajando la mano hacia la rodilla. Haz una pausa por un momento en la parte inferior, luego regresa lentamente a la posición inicial. Repite del otro lado. Continúa alternando lados durante el número de repeticiones deseado.",
      "ru": "Встаньте, поставив ноги на ширине плеч и вытянув руки по бокам. Удерживая спину прямой и напрягая корпус, медленно наклоните туловище в сторону, опуская руку к колену. Задержитесь на мгновение внизу, затем медленно вернитесь в исходное положение. Повторите с другой стороны. Продолжайте чередовать стороны желаемое количество повторений.",
      "zh": "双脚分开与肩同宽站立，双臂在身体两侧笔直向下伸展。 保持背部挺直，核心肌群参与，慢慢将躯干向一侧弯曲，将手向膝盖方向放低。 在底部停顿片刻，然后慢慢回到起始位置。 在另一侧重复。 继续交替进行所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और आपकी भुजाएं आपके बगल में सीधी नीचे की ओर फैली हुई हों। अपनी पीठ को सीधा रखते हुए और अपने कोर को व्यस्त रखते हुए, धीरे-धीरे अपने धड़ को एक तरफ झुकाएं, अपने हाथ को अपने घुटने की ओर नीचे करें। नीचे एक पल के लिए रुकें, फिर धीरे-धीरे प्रारंभिक स्थिति में लौट आएं। दूसरी तरफ दोहराएं। दोहराव की वांछित संख्या के लिए पक्षों को बदलना जारी रखें।",
      "pl": "Stań w rozkroku na szerokość barków, ramiona wyprostowane wzdłuż tułowia. Utrzymując proste plecy i napięty brzuch, powoli pochyl tułów w bok, opuszczając dłoń w kierunku kolana. Zatrzymaj się na chwilę w dolnej pozycji, a następnie powoli wróć do pozycji wyjściowej. Powtórz po drugiej stronie. Kontynuuj naprzemienne wykonywanie ruchu na obie strony przez zalecaną liczbę powtórzeń.",
      "ko": "발을 어깨 넓이로 벌리고 팔을 양쪽에 내려 펼칩니다. 등을 곧게 펴고 복근을 긴장시킨 상태에서 천천히 몸통을 한쪽으로 구부려 손을 무릎 쪽으로 내립니다. 맨 아래에서 잠깐 멈췄다가 천천히 시작 자세로 돌아옵니다. 반대쪽에서 반복합니다. 원하는 반복 횟수만큼 좌우를 번갈아가며 계속합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et les bras tendus vers le bas le long du corps. En gardant le dos droit et ta sangle abdominale gainée, penche lentement ton torse sur un côté, en abaissant ta main vers ton genou. Marque une pause en bas, puis reviens lentement à la position de départ. Répète de l'autre côté. Continue à alterner les côtés pour le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0003",
    "name": "air bike",
    "category": "waist",
    "body_part": "waist",
    "equipment": "body weight",
    "target": "abs",
    "secondary_muscles": [
      "hip flexors"
    ],
    "image": "images/0003-1ZFqTDN.jpg",
    "gif_url": "videos/0003-1ZFqTDN.gif",
    "instruction_steps": [
      "Lie flat on your back with your hands placed behind your head.",
      "Lift your legs off the ground and bend your knees at a 90-degree angle.",
      "Bring your right elbow towards your left knee while simultaneously straightening your right leg.",
      "Return to the starting position and repeat the movement on the opposite side, bringing your left elbow towards your right knee while straightening your left leg.",
      "Continue alternating sides in a pedaling motion for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Lie flat on your back with your hands placed behind your head. Lift your legs off the ground and bend your knees at a 90-degree angle. Bring your right elbow towards your left knee while simultaneously straightening your right leg. Return to the starting position and repeat the movement on the opposite side, bringing your left elbow towards your right knee while straightening your left leg. Continue alternating sides in a pedaling motion for the desired number of repetitions.",
      "it": "Sdraiati sulla schiena con le mani dietro la testa. Solleva le gambe da terra e piega le ginocchia con un angolo di 90 gradi. Porta il gomito destro verso il ginocchio sinistro mentre contemporaneamente raddrizzi la gamba destra. Ritorna alla posizione di partenza e ripeti il ​​movimento dal lato opposto, portando il gomito sinistro verso il ginocchio destro mentre raddrizzi la gamba sinistra. Continua ad alternare i lati con un movimento di pedalata per il numero di ripetizioni desiderato.",
      "tr": "Elleriniz başınızın arkasında olacak şekilde sırt üstü uzanın. Bacaklarınızı yerden kaldırın ve dizlerinizi 90 derecelik bir açıyla bükün. Sağ bacağınızı düzleştirirken aynı anda sağ dirseğinizi sol dizinize doğru getirin. Başlangıç ​​pozisyonuna dönün ve sol bacağınızı düzleştirirken sol dirseğinizi sağ dizinize doğru getirerek hareketi diğer tarafta tekrarlayın. İstenilen sayıda tekrarlama için pedal çevirme hareketinde alternatif tarafları kullanmaya devam edin.",
      "es": "Túmbate sobre tu espalda con las manos colocadas detrás de la cabeza. Levanta las piernas del suelo y flexiona las rodillas formando un ángulo de 90 grados. Lleva el codo derecho hacia la rodilla izquierda mientras simultáneamente estiras la pierna derecha. Regresa a la posición inicial y repite el movimiento del lado opuesto, llevando el codo izquierdo hacia la rodilla derecha mientras estiras la pierna izquierda. Continúa alternando lados con un movimiento de pedaleo durante el número de repeticiones deseado.",
      "ru": "Лягте на спину, положив руки за голову. Поднимите ноги от земли и согните колени под углом 90 градусов. Поднесите правый локоть к левому колену, одновременно выпрямляя правую ногу. Вернитесь в исходное положение и повторите движение в противоположную сторону, приближая левый локоть к правому колену и выпрямляя левую ногу. Продолжайте чередовать стороны, вращая педали, необходимое количество повторений.",
      "zh": "平躺，双手放在脑后。 将双腿抬离地面，并以 90 度角弯曲膝盖。 将右肘靠近左膝盖，同时伸直右腿。 返回起始位置，在另一侧重复该动作，将左肘拉向右膝盖，同时伸直左腿。 继续交替进行蹬踏动作，达到所需的重复次数。",
      "hi": "अपने हाथों को अपने सिर के पीछे रखते हुए अपनी पीठ के बल सीधे लेट जाएँ। अपने पैरों को ज़मीन से ऊपर उठाएं और अपने घुटनों को 90 डिग्री के कोण पर मोड़ें। अपने दाहिने पैर को सीधा करते हुए अपनी दाहिनी कोहनी को अपने बाएँ घुटने की ओर लाएँ। प्रारंभिक स्थिति पर लौटें और अपने बाएं पैर को सीधा करते हुए अपनी बाईं कोहनी को अपने दाहिने घुटने की ओर लाते हुए, विपरीत दिशा में आंदोलन को दोहराएं। पुनरावृत्ति की वांछित संख्या के लिए पैडल गति में पक्षों को बदलना जारी रखें।",
      "pl": "Połóż się płasko na plecach, dłonie umieść za głową. Unieś nogi nad podłogę i ugnij kolana pod kątem 90 stopni. Przyciągnij prawy łokieć w kierunku lewego kolana, jednocześnie prostując prawą nogę. Wróć do pozycji wyjściowej i powtórz ruch po przeciwnej stronie, przyciągając lewy łokieć do prawego kolana i prostując lewą nogę. Kontynuuj naprzemienny ruch przypominający pedałowanie przez zalecaną liczbę powtórzeń.",
      "ko": "등을 바닥에 누워 손을 머리 뒤에 깍지껴 올립니다. 다리를 바닥에서 들어 올려 무릎을 90도 각도로 구부립니다. 오른쪽 팔꿈치를 왼쪽 무릎으로 가져오면서 동시에 오른쪽 다리를 펼칩니다. 시작 자세로 돌아와 반대쪽을 반복하며 왼쪽 팔꿈치를 오른쪽 무릎으로 가져오면서 왼쪽 다리를 펼칩니다. 자전거 페달을 밟는 동작으로 양쪽을 번갈아가며 원하는 반복 횟수만큼 계속합니다.",
      "fr": "Allonge-toi sur le dos, les mains placées derrière la tête. Décolle tes jambes du sol et fléchis tes genoux à un angle de 90 degrés. Amène ton coude droit vers ton genou gauche tout en tendant simultanément ta jambe droite. Reviens à la position de départ et répète le mouvement du côté opposé, en amenant ton coude gauche vers ton genou droit tout en tendant ta jambe gauche. Continue à alterner les côtés dans un mouvement de pédalage pour le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0006",
    "name": "alternate heel touchers",
    "category": "waist",
    "body_part": "waist",
    "equipment": "body weight",
    "target": "abs",
    "secondary_muscles": [
      "obliques"
    ],
    "image": "images/0006-qaZVsGk.jpg",
    "gif_url": "videos/0006-qaZVsGk.gif",
    "instruction_steps": [
      "Lie flat on your back with your knees bent and feet flat on the ground.",
      "Extend your arms straight out to the sides, parallel to the ground.",
      "Engaging your abs, lift your shoulders off the ground and reach your right hand towards your right heel.",
      "Return to the starting position and repeat on the left side, reaching your left hand towards your left heel.",
      "Continue alternating sides for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Lie flat on your back with your knees bent and feet flat on the ground. Extend your arms straight out to the sides, parallel to the ground. Engaging your abs, lift your shoulders off the ground and reach your right hand towards your right heel. Return to the starting position and repeat on the left side, reaching your left hand towards your left heel. Continue alternating sides for the desired number of repetitions.",
      "it": "Sdraiati sulla schiena con le ginocchia piegate e i piedi appoggiati a terra. Estendi le braccia verso i lati, parallele al suolo. Coinvolgendo gli addominali, solleva le spalle da terra e allunga la mano destra verso il tallone destro. Ritorna alla posizione iniziale e ripeti sul lato sinistro, portando la mano sinistra verso il tallone sinistro. Continua ad alternare i lati per il numero di ripetizioni desiderato.",
      "tr": "Dizleriniz bükülü ve ayaklarınız yere düz basacak şekilde sırt üstü yatın. Kollarınızı yere paralel olarak yanlara doğru uzatın. Karın kaslarınızı devreye sokarak omuzlarınızı yerden kaldırın ve sağ elinizi sağ topuğunuza doğru uzatın. Başlangıç ​​pozisyonuna dönün ve sol elinizi sol topuğunuza doğru uzatarak sol tarafta tekrarlayın. İstenilen tekrar sayısı için alternatif taraflara devam edin.",
      "es": "Túmbate sobre tu espalda con las rodillas flexionadas y los pies apoyados en el suelo. Extiende los brazos hacia los lados, paralelos al suelo. Activando el abdomen, levanta los hombros del suelo y lleva la mano derecha hacia el talón derecho. Regresa a la posición inicial y repite del lado izquierdo, llevando la mano izquierda hacia el talón izquierdo. Continúa alternando lados durante el número de repeticiones deseado.",
      "ru": "Лягте на спину, согните колени и поставьте ступни на землю. Вытяните руки прямо в стороны, параллельно земле. Включив пресс, оторвите плечи от земли и протяните правую руку к правой пятке. Вернитесь в исходное положение и повторите то же самое с левой стороны, потянув левую руку к левой пятке. Продолжайте чередовать стороны желаемое количество повторений.",
      "zh": "平躺，膝盖弯曲，双脚平放在地上。 将双臂伸直至两侧，与地面平行。 收紧腹肌，将肩膀抬离地面，并将右手伸向右脚跟。 返回起始位置并在左侧重复，将左手伸向左脚跟。 继续交替进行所需的重复次数。",
      "hi": "अपने घुटनों को मोड़कर और पैरों को ज़मीन पर सपाट रखते हुए अपनी पीठ के बल लेट जाएँ। अपनी भुजाओं को ज़मीन के समानांतर, भुजाओं तक सीधा फैलाएँ। अपने एब्स को शामिल करते हुए, अपने कंधों को ज़मीन से ऊपर उठाएं और अपने दाहिने हाथ को अपनी दाहिनी एड़ी की ओर ले जाएं। प्रारंभिक स्थिति पर लौटें और बाईं ओर दोहराएं, अपने बाएं हाथ को अपनी बाईं एड़ी तक पहुंचाएं। दोहराव की वांछित संख्या के लिए पक्षों को बदलना जारी रखें।",
      "pl": "Połóż się płasko na plecach, ugnij kolana i oprzyj stopy płasko na podłodze. Wyciągnij ramiona na boki, równolegle do podłogi. Angażując mięśnie brzucha, unieś barki nad podłogę i sięgnij prawą dłonią w kierunku prawej pięty. Wróć do pozycji wyjściowej i powtórz po lewej stronie, sięgając lewą dłonią do lewej pięty. Kontynuuj naprzemienne wykonywanie ruchu przez zalecaną liczbę powtórzeń.",
      "ko": "등을 바닥에 누워 무릎을 구부리고 발을 바닥에 붙입니다. 팔을 옆으로 쭉 펼쳐 바닥과 평행하게 합니다. 복근을 사용하여 어깨를 바닥에서 들어 올리고 오른쪽 손으로 오른쪽 발뒤꿈치를 터치합니다. 시작 자세로 돌아와 왼쪽 손으로 왼쪽 발뒤꿈치를 터치하는 것을 반복합니다. 원하는 반복 횟수만큼 좌우를 번갈아가며 계속합니다.",
      "fr": "Allonge-toi sur le dos, les genoux fléchis et les pieds à plat au sol. Étends les bras droit sur les côtés, parallèles au sol. En gainant tes abdominaux, soulève tes épaules du sol et amène ta main droite vers ton talon droit. Reviens à la position de départ et répète du côté gauche, en tendant ta main gauche vers ton talon gauche. Continue à alterner les côtés pour le nombre de répétitions souhaité."
    }
  },
  {
    "id": "2355",
    "name": "arm slingers hanging bent knee legs",
    "category": "waist",
    "body_part": "waist",
    "equipment": "body weight",
    "target": "abs",
    "secondary_muscles": [
      "shoulders",
      "back"
    ],
    "image": "images/2355-uWpxD4v.jpg",
    "gif_url": "videos/2355-uWpxD4v.gif",
    "instruction_steps": [
      "Hang from a pull-up bar with your arms fully extended and your knees bent at a 90-degree angle.",
      "Engage your core and lift your knees towards your chest, bringing them as close to your elbows as possible.",
      "Slowly lower your legs back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Hang from a pull-up bar with your arms fully extended and your knees bent at a 90-degree angle. Engage your core and lift your knees towards your chest, bringing them as close to your elbows as possible. Slowly lower your legs back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Appendere a una barra per trazioni con le braccia completamente distese e le ginocchia piegate con un angolo di 90 gradi. Coinvolgi il tuo core e solleva le ginocchia verso il petto, portandole il più vicino possibile ai gomiti. Abbassa lentamente le gambe fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Kollarınız tamamen uzatılmış ve dizleriniz 90 derecelik bir açıyla bükülmüş haldeyken barfiks barına asın. Merkez bölgenizi devreye sokun ve dizlerinizi göğsünüze doğru kaldırın, onları mümkün olduğunca dirseklerinize yaklaştırın. Bacaklarınızı yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Cuélgate de una barra de dominadas con los brazos completamente extendidos y las rodillas flexionadas formando un ángulo de 90 grados. Activa el core y levanta las rodillas hacia el pecho, acercándolas lo más posible a los codos. Baja lentamente las piernas de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Повисните на перекладине, полностью выпрямив руки и согнув колени под углом 90 градусов. Напрягите корпус и поднимите колени к груди, приближая их как можно ближе к локтям. Медленно опустите ноги обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "悬挂在引体向上杆上，双臂完全伸展，膝盖弯曲成 90 度角。 收紧核心并将膝盖抬向胸部，尽可能靠近肘部。 慢慢地将双腿放回起始位置。 重复所需的重复次数。",
      "hi": "अपनी बाहों को पूरी तरह फैलाकर और अपने घुटनों को 90 डिग्री के कोण पर मोड़कर पुल-अप बार से लटकें। अपने कोर को संलग्न करें और अपने घुटनों को अपनी छाती की ओर उठाएं, उन्हें जितना संभव हो सके अपनी कोहनी के करीब लाएं। धीरे-धीरे अपने पैरों को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Zwiśnij na drążku do podciągania z rękami w pełni wyprostowanymi i kolanami ugiętymi pod kątem 90 stopni. Napnij mięśnie brzucha i unieś kolana w kierunku klatki piersiowej, przybliżając je jak najbardziej do łokci. Powoli opuść nogi z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "턱걸이 바에 팔을 완전히 펴 매달립니다. 무릎을 90도 각도로 구부립니다. 복근을 긴장시키고 무릎을 가슴 쪽으로 올리되 팔꿈치에 최대한 가깝게 가져옵니다. 천천히 다리를 시작 자세로 내립니다.",
      "fr": "Suspends-toi à une barre de traction, les bras complètement étendus et les genoux fléchis à un angle de 90 degrés. Gaine ta sangle abdominale et lève tes genoux vers ta poitrine, en les amenant aussi près que possible de tes coudes. Abaisse lentement tes jambes vers la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "3220",
    "name": "astride jumps (male)",
    "category": "cardio",
    "body_part": "cardio",
    "equipment": "body weight",
    "target": "cardiovascular system",
    "secondary_muscles": [
      "quadriceps",
      "hamstrings",
      "calves"
    ],
    "image": "images/3220-f9lVSSI.jpg",
    "gif_url": "videos/3220-f9lVSSI.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart.",
      "Bend your knees and lower your body into a squat position.",
      "Jump explosively upwards, extending your legs and arms.",
      "While in the air, spread your legs apart and bring your arms out to the sides.",
      "Land softly with your feet shoulder-width apart, bending your knees to absorb the impact.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart. Bend your knees and lower your body into a squat position. Jump explosively upwards, extending your legs and arms. While in the air, spread your legs apart and bring your arms out to the sides. Land softly with your feet shoulder-width apart, bending your knees to absorb the impact. Repeat for the desired number of repetitions.",
      "it": "Stai con i piedi alla larghezza delle spalle. Piega le ginocchia e abbassa il corpo in una posizione tozza. Salta in modo esplosivo verso l'alto, estendendo le gambe e le braccia. Mentre sei in aria, allarga le gambe e porta le braccia ai lati. Atterra dolcemente con i piedi alla larghezza delle spalle, piegando le ginocchia per assorbire l'impatto. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız omuz genişliğinde açık olacak şekilde ayakta durun. Dizlerinizi bükün ve vücudunuzu çömelme pozisyonuna indirin. Bacaklarınızı ve kollarınızı uzatarak patlayıcı bir şekilde yukarı doğru zıplayın. Havadayken bacaklarınızı iki yana açın ve kollarınızı yanlara doğru açın. Ayaklarınız omuz genişliğinde açık olacak şekilde yumuşak bir şekilde yere inin ve darbeyi absorbe etmek için dizlerinizi bükün. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros. Flexiona las rodillas y baja el cuerpo hacia una posición de sentadilla. Salta explosivamente hacia arriba, extendiendo las piernas y los brazos. Mientras estás en el aire, separa las piernas y lleva los brazos hacia los lados. Aterriza suavemente con los pies separados a la altura de los hombros, flexionando las rodillas para absorber el impacto. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч. Согните колени и опустите тело в присед. Резко прыгните вверх, вытягивая ноги и руки. Находясь в воздухе, разведите ноги в стороны и разведите руки в стороны. Мягко приземлитесь, поставив ноги на ширине плеч, согнув колени, чтобы поглотить удар. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立。 弯曲膝盖并将身体降低至蹲姿。 爆发性向上跳跃，伸展双腿和手臂。 在空中时，将双腿分开，并将双臂向两侧伸出。 双脚分开与肩同宽，轻轻落地，弯曲膝盖以吸收冲击力。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई की दूरी पर रखकर खड़े हो जाएं। अपने घुटनों को मोड़ें और अपने शरीर को स्क्वाट स्थिति में नीचे लाएँ। अपने पैरों और भुजाओं को फैलाते हुए तेजी से ऊपर की ओर कूदें। हवा में रहते हुए, अपने पैरों को फैलाएं और अपनी भुजाओं को बगल की ओर लाएं। अपने पैरों को कंधे की चौड़ाई से अलग रखते हुए, प्रभाव को अवशोषित करने के लिए अपने घुटनों को मोड़ते हुए, धीरे से जमीन पर उतरें। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków. Ugnij kolana i opuść ciało do pozycji przysiadu. Wyskocz gwałtownie w górę, prostując nogi i ramiona. Będąc w powietrzu, rozłóż nogi na boki i wyprostuj ramiona na boki. Wyląduj miękko, stopy w rozkroku na szerokość barków, uginając kolana, aby zamortyzować lądowanie. Powtórz zalecaną liczbę razy.",
      "ko": "발을 어깨너비로 벌리고 섭니다. 무릎을 구부려 스쿼트 자세로 몸을 내립니다. 다리와 팔을 펼치며 폭발적으로 위로 점프합니다. 공중에서 다리를 벌리고 팔을 양옆으로 펼칩니다. 발을 어깨너비로 벌리고 착지하면서 무릎을 구부려 충격을 흡수합니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules. Fléchis les genoux et abaisse ton corps en position accroupie. Saute vers le haut de manière explosive, en étendant tes jambes et tes bras. En l'air, écarte les jambes et tends les bras sur les côtés. Atterris en douceur avec les pieds écartés à la largeur des épaules, en fléchissant les genoux pour absorber l'impact. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "3672",
    "name": "back and forth step",
    "category": "cardio",
    "body_part": "cardio",
    "equipment": "body weight",
    "target": "cardiovascular system",
    "secondary_muscles": [
      "quadriceps",
      "hamstrings",
      "glutes",
      "calves"
    ],
    "image": "images/3672-fNGumX0.jpg",
    "gif_url": "videos/3672-fNGumX0.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart.",
      "Step forward with your right foot, bending your knee and lowering your body into a lunge position.",
      "Push off with your right foot and step back to the starting position.",
      "Repeat the movement with your left foot, alternating legs with each step.",
      "Continue stepping back and forth, maintaining a steady pace.",
      "Repeat for the desired duration or number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart. Step forward with your right foot, bending your knee and lowering your body into a lunge position. Push off with your right foot and step back to the starting position. Repeat the movement with your left foot, alternating legs with each step. Continue stepping back and forth, maintaining a steady pace. Repeat for the desired duration or number of repetitions.",
      "it": "Stai con i piedi alla larghezza delle spalle. Fai un passo avanti con il piede destro, piegando il ginocchio e abbassando il corpo in una posizione di affondo. Spingi con il piede destro e torna alla posizione di partenza. Ripeti il ​​movimento con il piede sinistro, alternando le gambe ad ogni passo. Continua a fare passi avanti e indietro, mantenendo un ritmo costante. Ripetere per la durata o il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız omuz genişliğinde açık olacak şekilde ayakta durun. Sağ ayağınızla öne doğru bir adım atın, dizinizi bükün ve vücudunuzu hamle pozisyonuna indirin. Sağ ayağınızla itin ve başlangıç ​​pozisyonuna geri dönün. Hareketi her adımda bacak değiştirerek sol ayağınızla tekrarlayın. Sabit bir tempoyu koruyarak ileri geri adım atmaya devam edin. İstenilen süre veya tekrar sayısı kadar tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros. Da un paso adelante con el pie derecho, flexionando la rodilla y bajando el cuerpo hacia una posición de zancada. Empuja con el pie derecho y da un paso atrás para regresar a la posición inicial. Repite el movimiento con el pie izquierdo, alternando las piernas en cada paso. Continúa dando pasos hacia adelante y hacia atrás, manteniendo un ritmo constante. Repite durante la duración o el número de repeticiones deseado.",
      "ru": "Встаньте, ноги на ширине плеч. Сделайте шаг вперед правой ногой, согнув колено и опустив тело в положение выпада. Оттолкнитесь правой ногой и вернитесь в исходное положение. Повторите движение левой ногой, чередуя ноги при каждом шаге. Продолжайте шагать вперед и назад, сохраняя устойчивый темп. Повторяйте желаемую продолжительность или количество повторений.",
      "zh": "双脚分开与肩同宽站立。 右脚向前迈出一步，弯曲膝盖，将身体降低到弓步位置。 用右脚蹬地，然后回到起始位置。 用左脚重复该动作，每一步交替双腿。 继续来回走动，保持稳定的步伐。 重复所需的持续时间或重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई की दूरी पर रखकर खड़े हो जाएं। अपने दाहिने पैर के साथ आगे बढ़ें, अपने घुटने को मोड़ें और अपने शरीर को एक लंज स्थिति में नीचे लाएँ। अपने दाहिने पैर से धक्का दें और प्रारंभिक स्थिति में वापस आ जाएँ। प्रत्येक चरण के साथ पैरों को बारी-बारी से अपने बाएं पैर से दोहराएं। स्थिर गति बनाए रखते हुए आगे-पीछे कदम बढ़ाते रहें। वांछित अवधि या दोहराव की संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków. Zrób krok do przodu prawą stopą, uginając kolano i opuszczając ciało do pozycji wykroku. Odepchnij się prawą stopą i wróć krokiem do pozycji wyjściowej. Powtórz ruch lewą stopą, zmieniając nogi przy każdym kroku. Kontynuuj wykonywanie kroków do przodu i do tyłu, utrzymując stałe tempo. Powtórz przez zalecany czas lub liczbę powtórzeń.",
      "ko": "발을 어깨너비로 벌리고 섭니다. 오른쪽 발을 앞으로 내딛고 무릎을 구부려 런지 자세로 내려갑니다. 오른쪽 발로 밀어내 시작 위치로 돌아옵니다. 왼쪽 발로 같은 동작을 반복하면서 다리를 번갈아가며 스텝합니다. 꾸준한 속도를 유지하며 앞뒤로 스텝을 계속합니다. 원하는 시간 또는 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules. Avance le pied droit, en fléchissant le genou et en abaissant ton corps en position de fente. Pousse sur ton pied droit et recule vers la position de départ. Répète le mouvement avec ton pied gauche, en alternant les jambes à chaque pas. Continue à faire des pas d'avant en arrière, en maintenant un rythme régulier. Répète pendant la durée souhaitée ou le nombre de répétitions souhaité."
    }
  },
  {
    "id": "3360",
    "name": "bear crawl",
    "category": "cardio",
    "body_part": "cardio",
    "equipment": "body weight",
    "target": "cardiovascular system",
    "secondary_muscles": [
      "core",
      "shoulders",
      "triceps"
    ],
    "image": "images/3360-0Yz8WdV.jpg",
    "gif_url": "videos/3360-0Yz8WdV.gif",
    "instruction_steps": [
      "Start on all fours with your hands directly under your shoulders and your knees directly under your hips.",
      "Lift your knees slightly off the ground, keeping your back flat and your core engaged.",
      "Move your right hand and left foot forward simultaneously, followed by your left hand and right foot.",
      "Continue crawling forward, alternating your hand and foot movements.",
      "Maintain a steady pace and keep your core tight throughout the exercise.",
      "Continue for the desired distance or time."
    ],
    "instructions_all": {
      "en": "Start on all fours with your hands directly under your shoulders and your knees directly under your hips. Lift your knees slightly off the ground, keeping your back flat and your core engaged. Move your right hand and left foot forward simultaneously, followed by your left hand and right foot. Continue crawling forward, alternating your hand and foot movements. Maintain a steady pace and keep your core tight throughout the exercise. Continue for the desired distance or time.",
      "it": "Inizia a quattro zampe con le mani direttamente sotto le spalle e le ginocchia sotto i fianchi. Alza leggermente le ginocchia da terra, mantenendo la schiena piatta e il core attivo. Muovi in avanti contemporaneamente la mano destra e il piede sinistro, seguiti dalla mano sinistra e dal piede destro. Continua a strisciare in avanti, alternando movimenti di mani e piedi. Mantieni un ritmo costante e tieni il core teso durante tutto l'esercizio. Continua per la distanza o il tempo desiderato.",
      "tr": "Elleriniz doğrudan omuzlarınızın altında ve dizleriniz doğrudan kalçalarınızın altında olacak şekilde dört ayak üzerinde başlayın. Dizlerinizi yerden hafifçe kaldırın, sırtınızı düz ve merkez bölgenizi meşgul tutun. Sağ elinizi ve sol ayağınızı aynı anda ileri doğru hareket ettirin, ardından sol elinizi ve sağ ayağınızı hareket ettirin. El ve ayak hareketlerinizi değiştirerek ileri doğru sürünmeye devam edin. Sabit bir tempoyu koruyun ve egzersiz boyunca merkez bölgenizi sıkı tutun. İstenilen mesafe veya süre boyunca devam edin.",
      "es": "Comienza apoyado sobre manos y rodillas, con las manos justo debajo de los hombros y las rodillas justo debajo de las caderas. Levanta las rodillas ligeramente del suelo, manteniendo la espalda plana y el core activado. Mueve la mano derecha y el pie izquierdo hacia adelante simultáneamente, seguido de la mano izquierda y el pie derecho. Continúa avanzando a gatas, alternando los movimientos de manos y pies. Mantén un ritmo constante y el core firme durante todo el ejercicio. Continúa durante la distancia o el tiempo deseado.",
      "ru": "Встаньте на четвереньки, положив руки прямо под плечи и колени прямо под бедрами. Слегка поднимите колени от земли, сохраняя спину ровной и напряженным корпус. Одновременно переместите вперед правую руку и левую ногу, а затем левую руку и правую ногу. Продолжайте ползти вперед, чередуя движения рук и ног. Поддерживайте устойчивый темп и держите корпус напряженным на протяжении всего упражнения. Продолжайте движение желаемое расстояние или время.",
      "zh": "从四肢着地开始，双手直接放在肩膀下方，膝盖直接放在臀部下方。 将膝盖稍微抬离地面，保持背部平坦并收紧核心。 同时向前移动右手和左脚，然后是左手和右脚。 继续向前爬行，手脚交替动作。 在整个练习过程中保持稳定的节奏并保持核心紧张。 继续所需的距离或时间。",
      "hi": "अपने हाथों को सीधे अपने कंधों के नीचे और अपने घुटनों को सीधे अपने कूल्हों के नीचे रखकर चारों तरफ से शुरुआत करें। अपने घुटनों को ज़मीन से थोड़ा ऊपर उठाएं, अपनी पीठ को सपाट रखें और अपने कोर को व्यस्त रखें। अपने दाहिने हाथ और बाएं पैर को एक साथ आगे बढ़ाएं, उसके बाद अपने बाएं हाथ और दाहिने पैर को आगे बढ़ाएं। अपने हाथ और पैर की गतिविधियों को बारी-बारी से रेंगते हुए आगे बढ़ना जारी रखें। एक स्थिर गति बनाए रखें और पूरे अभ्यास के दौरान अपने कोर को टाइट रखें। वांछित दूरी या समय तक जारी रखें।",
      "pl": "Zacznij w podporze na czworakach, z dłońmi bezpośrednio pod barkami, a kolanami bezpośrednio pod biodrami. Unieś kolana lekko nad podłogę, trzymając plecy płasko, a mięśnie brzucha napięte. Przesuń prawą dłoń i lewą stopę do przodu jednocześnie, a następnie lewą dłoń i prawą stopę. Kontynuuj czołganie się do przodu, na przemian poruszając dłońmi i stopami. Zachowaj stałe tempo i napięte mięśnie brzucha przez cały czas trwania ćwiczenia. Kontynuuj przez zadany dystans lub czas.",
      "ko": "모든 사지로 바닥에 있는 상태에서 시작하되 손은 어깨 바로 아래, 무릎은 엉덩이 바로 아래에 위치합니다. 무릎을 약간 들어올려 바닥에서 띄우되 등은 평평하고 코어는 팽팽하게 유지합니다. 오른손과 왼발을 동시에 앞으로 이동한 후, 왼손과 오른발을 이동합니다. 계속해서 손과 발을 교대로 움직이며 앞으로 기어갑니다. 전체 동작에서 안정적인 속도를 유지하고 코어를 팽팽하게 유지합니다. 원하는 거리 또는 시간 동안 계속합니다.",
      "fr": "Commence à quatre pattes, les mains directement sous les épaules et les genoux directement sous les hanches. Décolle légèrement tes genoux du sol, en gardant ton dos plat et ta sangle abdominale gainée. Avance simultanément ta main droite et ton pied gauche, puis ta main gauche et ton pied droit. Continue à ramper vers l'avant en alternant les mouvements de tes mains et de tes pieds. Maintiens un rythme régulier et garde ta sangle abdominale contractée pendant tout l'exercice. Continue sur la distance ou la durée souhaitée."
    }
  },
  {
    "id": "2331",
    "name": "cycle cross trainer",
    "category": "cardio",
    "body_part": "cardio",
    "equipment": "leverage machine",
    "target": "cardiovascular system",
    "secondary_muscles": [
      "quadriceps",
      "hamstrings",
      "glutes"
    ],
    "image": "images/2331-XSCHmiI.jpg",
    "gif_url": "videos/2331-XSCHmiI.gif",
    "instruction_steps": [
      "Adjust the seat height and position yourself on the cycle cross trainer.",
      "Place your feet on the pedals and grip the handlebars.",
      "Start pedaling in a smooth and controlled motion.",
      "Maintain a steady pace and increase the resistance if desired.",
      "Continue pedaling for the desired duration of your cardio workout."
    ],
    "instructions_all": {
      "en": "Adjust the seat height and position yourself on the cycle cross trainer. Place your feet on the pedals and grip the handlebars. Start pedaling in a smooth and controlled motion. Maintain a steady pace and increase the resistance if desired. Continue pedaling for the desired duration of your cardio workout.",
      "it": "Regola l'altezza della sella e posizionati sul ciclocross trainer. Appoggia i piedi sui pedali e stringi il manubrio. Inizia a pedalare con un movimento fluido e controllato. Mantieni un ritmo costante e aumenta la resistenza se lo desideri. Continua a pedalare per la durata desiderata del tuo allenamento cardio.",
      "tr": "Koltuğun yüksekliğini ayarlayın ve kendinizi bisiklet cross trainer'ının üzerinde konumlandırın. Ayaklarınızı pedalların üzerine koyun ve gidonu tutun. Yumuşak ve kontrollü bir hareketle pedal çevirmeye başlayın. İstikrarlı bir tempoyu koruyun ve isterseniz direnci artırın. Kardiyo egzersizinizin istediğiniz süresi boyunca pedal çevirmeye devam edin.",
      "es": "Ajusta la altura del asiento y colócate en la bicicleta elíptica. Coloca los pies en los pedales y sujeta el manillar. Comienza a pedalear con un movimiento suave y controlado. Mantén un ritmo constante y aumenta la resistencia si lo deseas. Continúa pedaleando durante la duración deseada de tu entrenamiento cardiovascular.",
      "ru": "Отрегулируйте высоту сиденья и расположитесь на велотренажере. Поставьте ноги на педали и возьмитесь за руль. Начните крутить педали плавными и контролируемыми движениями. Поддерживайте устойчивый темп и при желании увеличивайте сопротивление. Продолжайте крутить педали в течение желаемой продолжительности кардио-тренировки.",
      "zh": "调整座椅高度并将自己放在自行车交叉训练机上。 将脚放在踏板上并抓住车把。 开始以平稳且受控的动作踩踏。 保持稳定的步伐并根据需要增加阻力。 继续踩踏您的有氧运动所需的持续时间。",
      "hi": "सीट की ऊंचाई समायोजित करें और अपने आप को साइकिल क्रॉस ट्रेनर पर रखें। अपने पैरों को पैडल पर रखें और हैंडलबार को पकड़ें। सहज और नियंत्रित गति में पैडल चलाना शुरू करें। स्थिर गति बनाए रखें और यदि चाहें तो प्रतिरोध बढ़ाएँ। अपने कार्डियो वर्कआउट की वांछित अवधि तक पैडल चलाना जारी रखें।",
      "pl": "Wyreguluj wysokość siedziska i ustaw się na orbitreku. Umieść stopy na pedałach i chwyć uchwyty. Zacznij pedałować płynnym, kontrolowanym ruchem. Utrzymuj stałe tempo i zwiększ opór, jeśli chcesz. Kontynuuj pedałowanie przez zalecany czas trwania treningu cardio.",
      "ko": "사이클 크로스 트레이너의 안장 높이를 조정하고 올바르게 위치합니다. 발을 페달에 올려놓고 손잡이를 잡습니다. 부드럽고 조절된 동작으로 페달을 밟기 시작합니다. 일정한 속도를 유지하고 필요시 저항을 증가시킵니다. 원하는 시간 동안 계속 페달을 밟습니다.",
      "fr": "Règle la hauteur du siège et installe-toi sur le vélo cross trainer. Place tes pieds sur les pédales et agrippe le guidon. Commence à pédaler d'un mouvement fluide et contrôlé. Maintiens un rythme régulier et augmente la résistance si tu le souhaites. Continue à pédaler pendant la durée souhaitée de ta séance de cardio."
    }
  },
  {
    "id": "1201",
    "name": "dumbbell burpee",
    "category": "cardio",
    "body_part": "cardio",
    "equipment": "dumbbell",
    "target": "cardiovascular system",
    "secondary_muscles": [
      "quadriceps",
      "hamstrings",
      "calves",
      "shoulders",
      "triceps",
      "core"
    ],
    "image": "images/1201-0JtKWum.jpg",
    "gif_url": "videos/1201-0JtKWum.gif",
    "instruction_steps": [
      "Start in a standing position with your feet shoulder-width apart and a dumbbell in each hand.",
      "Lower your body into a squat position, placing the dumbbells on the ground in front of you.",
      "Kick your feet back into a push-up position, keeping your body in a straight line.",
      "Perform a push-up, bending your elbows and lowering your chest towards the ground.",
      "Jump your feet back towards your hands, landing in a squat position.",
      "Stand up explosively, lifting the dumbbells off the ground and bringing them to your shoulders.",
      "Press the dumbbells overhead, fully extending your arms.",
      "Lower the dumbbells back to your shoulders and repeat the entire sequence for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Start in a standing position with your feet shoulder-width apart and a dumbbell in each hand. Lower your body into a squat position, placing the dumbbells on the ground in front of you. Kick your feet back into a push-up position, keeping your body in a straight line. Perform a push-up, bending your elbows and lowering your chest towards the ground. Jump your feet back towards your hands, landing in a squat position. Stand up explosively, lifting the dumbbells off the ground and bringing them to your shoulders. Press the dumbbells overhead, fully extending your arms. Lower the dumbbells back to your shoulders and repeat the entire sequence for the desired number of repetitions.",
      "it": "Inizia in posizione in piedi, con i piedi alla larghezza delle spalle e un manubrio in ogni mano. Abbassa il corpo in posizione accovacciata, posizionando i manubri a terra davanti a te. Calcia i piedi indietro in posizione push-up, mantenendo il corpo in linea retta. Fai una flessione, piegando i gomiti e abbassando il petto verso terra. Salta indietro verso le mani, atterrando in posizione squat. Alzati in modo esplosivo, sollevando i manubri da terra e portandoli alle spalle. Premi i manubri sopra la testa, estendendo completamente le braccia. Abbassa i manubri sulle spalle e ripeti l'intera sequenza per il numero desiderato di ripetizioni.",
      "tr": "Ayaklarınız omuz genişliğinde açık ve her elinizde birer dambıl olacak şekilde ayakta durma pozisyonunda başlayın. Vücudunuzu çömelme pozisyonuna indirin ve dambılları önünüzde yere koyun. Vücudunuzu düz bir çizgide tutarak ayaklarınızı şınav pozisyonuna getirin. Dirseklerinizi bükerek ve göğsünüzü yere doğru indirerek şınav çekin. Ayaklarınızı ellerinize doğru geriye doğru atlayın ve çömelme pozisyonuna inin. Patlayıcı bir şekilde ayağa kalkın, dambılları yerden kaldırın ve omuzlarınıza getirin. Kollarınızı tamamen uzatarak dambılları başınızın üzerine bastırın. Dambılları omuzlarınıza doğru indirin ve tüm diziyi istediğiniz sayıda tekrarla tekrarlayın.",
      "es": "Comienza de pie con los pies separados a la altura de los hombros y una mancuerna en cada mano. Baja el cuerpo a una posición de sentadilla, colocando las mancuernas en el suelo frente a ti. Lleva los pies hacia atrás a una posición de flexión de brazos, manteniendo el cuerpo en línea recta. Realiza una flexión de brazos, flexionando los codos y bajando el pecho hacia el suelo. Salta con los pies hacia tus manos, aterrizando en una posición de sentadilla. Ponte de pie de forma explosiva, levantando las mancuernas del suelo y llevándolas a los hombros. Empuja las mancuernas por encima de la cabeza, extendiendo completamente los brazos. Baja las mancuernas de vuelta a los hombros y repite toda la secuencia el número de repeticiones deseado.",
      "ru": "Начните в положении стоя, ноги на ширине плеч, в каждой руке по гантели. Опустите тело в присед, положив гантели на пол перед собой. Верните ноги в положение для отжимания, сохраняя тело прямой линией. Выполните отжимание, сгибая локти и опуская грудь к земле. Прыгните ногами назад к рукам и приземлитесь в приседе. Резко встаньте, подняв гантели от земли и поднеся их к плечам. Выжмите гантели над головой, полностью выпрямляя руки. Опустите гантели обратно на плечи и повторите всю последовательность желаемое количество повторений.",
      "zh": "从站立位置开始，双脚分开与肩同宽，每只手各拿一个哑铃。 将身体降低至蹲姿，将哑铃放在您面前的地面上。 将双脚踢回到俯卧撑位置，保持身体呈一条直线。 进行俯卧撑，弯曲肘部并将胸部降低到地面。 将脚向后跳向双手，以蹲姿着地。 爆发性地站起来，将哑铃从地上举起，放到肩膀上。 将哑铃举过头顶，充分伸展手臂。 将哑铃放回到肩膀上，然后重复整个序列，达到所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर और प्रत्येक हाथ में डम्बल लेकर खड़े होकर शुरुआत करें। अपने शरीर को स्क्वाट स्थिति में लाएँ, डम्बल को अपने सामने ज़मीन पर रखें। अपने शरीर को सीधी रेखा में रखते हुए अपने पैरों को वापस पुश-अप स्थिति में लाएँ। अपनी कोहनियों को मोड़ते हुए और अपनी छाती को ज़मीन की ओर झुकाते हुए पुश-अप करें। स्क्वाट स्थिति में उतरते हुए, अपने पैरों को अपने हाथों की ओर वापस उछालें। डम्बल को जमीन से उठाकर अपने कंधों तक लाते हुए विस्फोटक तरीके से खड़े हो जाएं। अपनी बाहों को पूरी तरह फैलाते हुए डम्बल को ऊपर की ओर दबाएं। डम्बल को वापस अपने कंधों पर लाएँ और वांछित संख्या में दोहराव के लिए पूरे क्रम को दोहराएँ।",
      "pl": "Zacznij w pozycji stojącej, stopy na szerokość barków, hantle w obu rękach. Opuść ciało do przysiadu, kładąc hantle na podłodze przed sobą. Wykop nogi do tyłu, przyjmując pozycję do pompki, utrzymując ciało w linii prostej. Wykonaj pompkę, uginając łokcie i opuszczając klatkę piersiową w kierunku podłogi. Podskocz nogami z powrotem w kierunku rąk, lądując w pozycji przysiadu. Wstań gwałtownie, unosząc hantle z podłogi i przenosząc je na wysokość barków. Wypchnij hantle nad głowę, w pełni wyprostowując ramiona. Opuść hantle z powrotem na wysokość barków i powtórz całą sekwencję przez zalecaną liczbę powtórzeń.",
      "ko": "발을 어깨 너비로 벌리고 서서 각 손에 덤벨을 하나씩 들고 있는 상태에서 시작합니다. 몸을 스쿼트 자세로 내려 덤벨을 앞에 바닥에 내려놓습니다. 발을 뒤로 차서 푸시업 자세로 들어가며 몸이 일직선을 유지하도록 합니다. 팔꿈치를 구부려 푸시업을 수행하여 가슴을 바닥 쪽으로 내립니다. 발을 손 쪽으로 점프하여 스쿼트 자세로 착지합니다. 폭발적으로 일어나면서 바닥에서 덤벨을 들어올려 어깨까지 올립니다. 덤벨을 머리 위로 프레스하여 팔을 완전히 펼칩니다. 덤벨을 다시 어깨로 내린 후 전체 동작을 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Commence en position debout, les pieds écartés à la largeur des épaules et un haltère dans chaque main. Descends en position accroupie, en posant les haltères au sol devant toi. Renvoie tes pieds vers l'arrière en position de pompe, en gardant ton corps aligné. Effectue une pompe, en pliant tes coudes et en abaissant ta poitrine vers le sol. Ramène tes pieds vers tes mains en sautant, en atterrissant en position de squat. Redresse-toi de façon explosive, en soulevant les haltères du sol et en les amenant à tes épaules. Développe les haltères au-dessus de ta tête, en tendant complètement tes bras. Abaisse les haltères jusqu'à tes épaules et répète toute la séquence pour le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1368",
    "name": "ankle circles",
    "category": "lower legs",
    "body_part": "lower legs",
    "equipment": "body weight",
    "target": "calves",
    "secondary_muscles": [
      "ankle stabilizers"
    ],
    "image": "images/1368-uL9CsKm.jpg",
    "gif_url": "videos/1368-uL9CsKm.gif",
    "instruction_steps": [
      "Sit on the ground with your legs extended in front of you.",
      "Lift one leg off the ground and rotate your ankle in a circular motion.",
      "Perform the desired number of circles in one direction, then switch to the other direction.",
      "Repeat with the other leg."
    ],
    "instructions_all": {
      "en": "Sit on the ground with your legs extended in front of you. Lift one leg off the ground and rotate your ankle in a circular motion. Perform the desired number of circles in one direction, then switch to the other direction. Repeat with the other leg.",
      "it": "Siediti a terra con le gambe distese davanti a te. Solleva una gamba da terra e ruota la caviglia con un movimento circolare. Esegui il numero desiderato di cerchi in una direzione, quindi passa all'altra direzione. Ripeti con l'altra gamba.",
      "tr": "Bacaklarınız önünüzde uzatılmış halde yere oturun. Bir bacağınızı yerden kaldırın ve bileğinizi dairesel bir hareketle döndürün. İstediğiniz sayıda daireyi bir yönde gerçekleştirin, ardından diğer yöne geçin. Diğer bacakla tekrarlayın.",
      "es": "Siéntate en el suelo con las piernas extendidas frente a ti. Levanta una pierna del suelo y rota el tobillo con un movimiento circular. Realiza el número de círculos deseado en una dirección, luego cambia a la dirección contraria. Repite con la otra pierna.",
      "ru": "Сядьте на пол, вытянув ноги перед собой. Поднимите одну ногу с земли и сделайте круговые движения лодыжкой. Выполните нужное количество кругов в одну сторону, затем переключитесь на другую сторону. Повторите с другой ногой.",
      "zh": "坐在地上，双腿在身前伸展。 将一条腿抬离地面，并以圆周运动旋转脚踝。 在一个方向上转所需的圈数，然后切换到另一个方向。 换另一条腿重复上述步骤。",
      "hi": "अपने पैरों को सामने फैलाकर जमीन पर बैठें। एक पैर को जमीन से ऊपर उठाएं और अपने टखने को गोलाकार गति में घुमाएं। एक दिशा में वांछित संख्या में वृत्त बनाएं, फिर दूसरी दिशा में स्विच करें। दूसरे पैर से दोहराएँ।",
      "pl": "Usiądź na podłodze z nogami wyciągniętymi przed sobą. Unieś jedną nogę nad podłogę i wykonuj okrężny ruch kostką. Wykonaj zalecaną liczbę okrążeń w jednym kierunku, a następnie zmień kierunek. Powtórz drugą nogą.",
      "ko": "바닥에 앉아 다리를 앞으로 펼칩니다. 한쪽 다리를 바닥에서 들어 발목을 원형으로 회전시킵니다. 원하는 횟수만큼 한 방향으로 회전한 다음 반대 방향으로 회전합니다. 반대쪽 다리로 같은 동작을 반복합니다.",
      "fr": "Assieds-toi au sol, les jambes tendues devant toi. Décolle une jambe du sol et fais tourner ta cheville en cercle. Effectue le nombre de cercles souhaité dans une direction, puis change de direction. Répète avec l'autre jambe."
    }
  },
  {
    "id": "1708",
    "name": "assisted lying calves stretch",
    "category": "lower legs",
    "body_part": "lower legs",
    "equipment": "assisted",
    "target": "calves",
    "secondary_muscles": [
      "hamstrings"
    ],
    "image": "images/1708-GxDwDX0.jpg",
    "gif_url": "videos/1708-GxDwDX0.gif",
    "instruction_steps": [
      "Lie on your back with your legs extended.",
      "Bend one knee and place your foot flat on the ground.",
      "Using your hands or a towel, gently pull your toes towards your body, feeling a stretch in your calf.",
      "Hold the stretch for 20-30 seconds.",
      "Release the stretch and repeat on the other leg."
    ],
    "instructions_all": {
      "en": "Lie on your back with your legs extended. Bend one knee and place your foot flat on the ground. Using your hands or a towel, gently pull your toes towards your body, feeling a stretch in your calf. Hold the stretch for 20-30 seconds. Release the stretch and repeat on the other leg.",
      "it": "Sdraiati sulla schiena con le gambe distese. Piega un ginocchio e appoggia il piede a terra. Usando le mani o un asciugamano, tira delicatamente le dita dei piedi verso il corpo, avvertendo un allungamento nel polpaccio. Mantieni l'allungamento per 20-30 secondi. Rilascia l'allungamento e ripeti sull'altra gamba.",
      "tr": "Bacaklarınız uzatılmış halde sırt üstü yatın. Bir dizinizi bükün ve ayağınızı düz bir şekilde yere koyun. Ellerinizi veya bir havluyu kullanarak ayak parmaklarınızı yavaşça vücudunuza doğru çekin, baldırınızda bir gerginlik hissedin. Uzatmayı 20-30 saniye kadar tutun. Germeyi bırakın ve diğer bacakta tekrarlayın.",
      "es": "Túmbate sobre tu espalda con las piernas extendidas. Flexiona una rodilla y coloca el pie plano sobre el suelo. Con las manos o una toalla, jala suavemente los dedos del pie hacia tu cuerpo, sintiendo un estiramiento en la pantorrilla. Mantén el estiramiento durante 20-30 segundos. Suelta el estiramiento y repite con la otra pierna.",
      "ru": "Лягте на спину, вытянув ноги. Согните одно колено и поставьте стопу на землю. Руками или полотенцем осторожно потяните пальцы ног к телу, чувствуя растяжение в икрах. Удерживайте растяжку 20–30 секунд. Освободите растяжку и повторите на другую ногу.",
      "zh": "仰卧，双腿伸展。 弯曲一侧膝盖，将脚平放在地上。 用手或毛巾轻轻地将脚趾拉向身体，感受小腿的拉伸。 保持拉伸 20-30 秒。 松开拉伸并在另一条腿上重复。",
      "hi": "अपने पैरों को फैलाकर अपनी पीठ के बल लेटें। एक घुटने को मोड़ें और अपने पैर को ज़मीन पर सपाट रखें। अपने हाथों या तौलिये का उपयोग करके, अपनी पिंडली में खिंचाव महसूस करते हुए, धीरे से अपने पैर की उंगलियों को अपने शरीर की ओर खींचें। 20-30 सेकंड तक खिंचाव बनाए रखें। खिंचाव छोड़ें और दूसरे पैर पर दोहराएं।",
      "pl": "Połóż się na plecach z wyciągniętymi nogami. Ugnij jedną nogę i oprzyj stopę płasko na podłodze. Za pomocą rąk lub ręcznika delikatnie przyciągnij palce stopy w kierunku ciała, odczuwając rozciąganie w łydce. Utrzymaj rozciąganie przez 20-30 sekund. Zwolnij rozciąganie i powtórz drugą nogą.",
      "ko": "등을 바닥에 누워 다리를 펼칩니다. 한쪽 무릎을 구부려 발을 바닥에 붙입니다. 손이나 수건을 사용하여 발가락을 천천히 몸 쪽으로 당겨 종아리가 늘어나는 것을 느낍니다. 스트레칭을 20~30초간 유지합니다. 스트레칭을 풀고 반대쪽 다리로 반복합니다.",
      "fr": "Allonge-toi sur le dos, les jambes tendues. Plie un genou et place ton pied à plat sur le sol. Avec tes mains ou une serviette, tire doucement tes orteils vers ton corps, en sentant un étirement dans ton mollet. Maintiens l'étirement pendant 20 à 30 secondes. Relâche l'étirement et répète avec l'autre jambe."
    }
  },
  {
    "id": "0999",
    "name": "band single leg calf raise",
    "category": "lower legs",
    "body_part": "lower legs",
    "equipment": "band",
    "target": "calves",
    "secondary_muscles": [
      "ankles",
      "feet"
    ],
    "image": "images/0999-9JprnPh.jpg",
    "gif_url": "videos/0999-9JprnPh.gif",
    "instruction_steps": [
      "Stand with your feet hip-width apart and place the band around the ball of your left foot.",
      "Hold onto a stable object for balance if needed.",
      "Slowly raise your left heel off the ground, lifting your body weight onto the ball of your foot.",
      "Pause for a moment at the top, then slowly lower your left heel back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch to the right leg."
    ],
    "instructions_all": {
      "en": "Stand with your feet hip-width apart and place the band around the ball of your left foot. Hold onto a stable object for balance if needed. Slowly raise your left heel off the ground, lifting your body weight onto the ball of your foot. Pause for a moment at the top, then slowly lower your left heel back down to the starting position. Repeat for the desired number of repetitions, then switch to the right leg.",
      "it": "Stai con i piedi alla larghezza dei fianchi e posiziona la fascia attorno alla pianta del piede sinistro. Se necessario, aggrapparsi a un oggetto stabile per mantenere l'equilibrio. Solleva lentamente il tallone sinistro da terra, sollevando il peso del corpo sulla pianta del piede. Fai una pausa per un momento in alto, quindi abbassa lentamente il tallone sinistro fino alla posizione iniziale. Ripeti per il numero di ripetizioni desiderato, quindi passa alla gamba destra.",
      "tr": "Ayaklarınızı kalça genişliğinde açın ve bandı sol ayağınızın topuğunun etrafına yerleştirin. Gerekirse denge için sabit bir nesneye tutunun. Vücut ağırlığınızı ayak parmaklarınızın ucuna vererek sol topuğunuzu yavaşça yerden kaldırın. Tepe noktasında bir an duraklayın, ardından sol topuğunuzu yavaşça başlangıç ​​pozisyonuna indirin. İstenilen tekrar sayısı kadar tekrarlayın, ardından sağ bacağa geçin.",
      "es": "Ponte de pie con los pies separados a la altura de las caderas y coloca la banda alrededor de la base de los dedos del pie izquierdo. Sujétate de un objeto estable para mantener el equilibrio si es necesario. Levanta lentamente el talón izquierdo del suelo, llevando el peso del cuerpo hacia la punta del pie. Haz una pausa por un momento en la parte superior, luego baja lentamente el talón izquierdo de vuelta a la posición inicial. Repite el número de repeticiones deseado, luego cambia a la pierna derecha.",
      "ru": "Встаньте, ноги на ширине плеч, и наденьте ленту на подушечку левой стопы. При необходимости держитесь за устойчивый предмет для равновесия. Медленно поднимите левую пятку от земли, перенеся вес тела на подушечки стопы. Задержитесь на мгновение в верхней точке, затем медленно опустите левую пятку обратно в исходное положение. Повторите необходимое количество повторений, затем переключитесь на правую ногу.",
      "zh": "双脚分开站立，与臀部同宽，将弹力带绕在左脚掌上。 如果需要，请抓住一个稳定的物体以保持平衡。 慢慢地将左脚跟抬离地面，将身体重量转移到脚掌上。 在顶部暂停片刻，然后慢慢将左脚跟放回起始位置。 重复所需的重复次数，然后换右腿。",
      "hi": "अपने पैरों को कूल्हे-चौड़ाई से अलग करके खड़े हो जाएं और बैंड को अपने बाएं पैर की गेंद के चारों ओर रखें। यदि आवश्यक हो तो संतुलन के लिए किसी स्थिर वस्तु को पकड़ें। धीरे-धीरे अपनी बायीं एड़ी को जमीन से ऊपर उठाएं, अपने शरीर का वजन अपने पैर की गेंद पर उठाएं। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपनी बायीं एड़ी को वापस प्रारंभिक स्थिति में लाएँ। दोहराव की वांछित संख्या के लिए दोहराएं, फिर दाहिने पैर पर स्विच करें।",
      "pl": "Stań w rozkroku na szerokość bioder i umieść taśmę wokół podeszwy lewej stopy. Chwyć się stabilnego obiektu dla równowagi, jeśli to konieczne. Powoli unieś lewą piętę nad podłogę, przenosząc ciężar ciała na przednią część stopy. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść lewą piętę z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy, a następnie zmień nogę na prawą.",
      "ko": "엉덩이 너비로 발을 벌리고 서서 밴드를 왼쪽 발 앞부분에 감습니다. 필요하면 안정성을 위해 견고한 물체를 잡습니다. 천천히 왼쪽 발꿈치를 지면에서 들어 발 앞부분에 체중을 올립니다. 맨 위에서 잠시 멈춘 후, 천천히 왼쪽 발꿈치를 원래 위치로 내립니다. 원하는 횟수만큼 반복한 후 오른쪽 다리로 전환합니다.",
      "fr": "Tiens-toi les pieds écartés à la largeur des hanches et place l'élastique autour de la pointe de ton pied gauche. Tiens-toi à un objet stable pour l'équilibre si nécessaire. Lève lentement le talon gauche du sol, en reportant le poids de ton corps sur la pointe du pied. Marque une pause en haut, puis abaisse lentement ton talon gauche pour revenir à la position de départ. Répète le nombre de répétitions souhaité, puis passe à la jambe droite."
    }
  },
  {
    "id": "1000",
    "name": "band single leg reverse calf raise",
    "category": "lower legs",
    "body_part": "lower legs",
    "equipment": "band",
    "target": "calves",
    "secondary_muscles": [
      "hamstrings",
      "glutes"
    ],
    "image": "images/1000-QsSQWbf.jpg",
    "gif_url": "videos/1000-QsSQWbf.gif",
    "instruction_steps": [
      "Stand with your feet hip-width apart and place the band around the ball of your foot.",
      "Hold onto a stable object for balance.",
      "Slowly raise your heel off the ground, lifting your body weight onto the ball of your foot.",
      "Pause for a moment at the top, then slowly lower your heel back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch to the other leg."
    ],
    "instructions_all": {
      "en": "Stand with your feet hip-width apart and place the band around the ball of your foot. Hold onto a stable object for balance. Slowly raise your heel off the ground, lifting your body weight onto the ball of your foot. Pause for a moment at the top, then slowly lower your heel back down to the starting position. Repeat for the desired number of repetitions, then switch to the other leg.",
      "it": "Stai con i piedi alla larghezza dei fianchi e posiziona la fascia attorno alla pianta del piede. Aggrapparsi a un oggetto stabile per mantenere l'equilibrio. Solleva lentamente il tallone da terra, sollevando il peso del corpo sulla pianta del piede. Fai una pausa per un momento in alto, quindi abbassa lentamente il tallone fino alla posizione iniziale. Ripeti per il numero di ripetizioni desiderato, quindi passa all'altra gamba.",
      "tr": "Ayaklarınızı kalça genişliğinde açın ve bandı ayak parmaklarınızın etrafına yerleştirin. Denge için sabit bir nesneye tutunun. Vücut ağırlığınızı ayak parmaklarınızın ucuna vererek topuğunuzu yavaşça yerden kaldırın. Tepe noktasında bir an duraklayın, ardından topuğunuzu yavaşça başlangıç ​​pozisyonuna indirin. İstenilen tekrar sayısı kadar tekrarlayın, ardından diğer bacağa geçin.",
      "es": "Ponte de pie con los pies separados a la altura de las caderas y coloca la banda alrededor de la base de los dedos del pie. Sujétate de un objeto estable para mantener el equilibrio. Levanta lentamente el talón del suelo, llevando el peso del cuerpo hacia la punta del pie. Haz una pausa por un momento en la parte superior, luego baja lentamente el talón de vuelta a la posición inicial. Repite el número de repeticiones deseado, luego cambia a la otra pierna.",
      "ru": "Встаньте, ноги на ширине плеч, и наденьте ленту на подушечку стопы. Держитесь за устойчивый предмет для равновесия. Медленно поднимите пятку от земли, перенеся вес тела на подушечки стопы. Задержитесь на мгновение в верхней точке, затем медленно опустите пятку обратно в исходное положение. Повторите желаемое количество повторений, затем переключитесь на другую ногу.",
      "zh": "双脚分开站立，与臀部同宽，将弹力带放在脚掌周围。 抓住稳定的物体以保持平衡。 慢慢地将脚跟抬离地面，将身体重量转移到脚掌上。 在顶部暂停片刻，然后慢慢将脚跟放回起始位置。 重复所需的重复次数，然后换另一条腿。",
      "hi": "अपने पैरों को कूल्हे-चौड़ाई से अलग करके खड़े हो जाएं और बैंड को अपने पैर की गेंद के चारों ओर रखें। संतुलन के लिए किसी स्थिर वस्तु को पकड़ें। धीरे-धीरे अपनी एड़ी को जमीन से ऊपर उठाएं, अपने शरीर का वजन अपने पैर की गेंद पर उठाएं। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपनी एड़ी को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ, फिर दूसरे चरण पर जाएँ।",
      "pl": "Stań w rozkroku na szerokość bioder i umieść taśmę wokół podeszwy stopy. Chwyć się stabilnego obiektu dla równowagi. Powoli unieś piętę nad podłogę, przenosząc ciężar ciała na przednią część stopy. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść piętę z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy, a następnie zmień nogę.",
      "ko": "엉덩이 너비로 발을 벌리고 서서 밴드를 발 앞부분에 감습니다. 안정성을 위해 견고한 물체를 잡습니다. 천천히 발꿈치를 지면에서 들어 발 앞부분에 체중을 올립니다. 맨 위에서 잠시 멈춘 후, 천천히 발꿈치를 원래 위치로 내립니다. 원하는 횟수만큼 반복한 후 다른 다리로 전환합니다.",
      "fr": "Tiens-toi les pieds écartés à la largeur des hanches et place l'élastique autour de la pointe de ton pied. Tiens-toi à un objet stable pour l'équilibre. Soulève lentement ton talon du sol, en élevant le poids de ton corps sur la pointe du pied. Marque une pause en haut, puis abaisse lentement ton talon pour revenir à la position de départ. Répète le nombre de répétitions souhaité, puis passe à l'autre jambe."
    }
  },
  {
    "id": "1369",
    "name": "band two legs calf raise - (band under both legs) v. 2",
    "category": "lower legs",
    "body_part": "lower legs",
    "equipment": "band",
    "target": "calves",
    "secondary_muscles": [
      "ankles",
      "feet"
    ],
    "image": "images/1369-jl6uxZV.jpg",
    "gif_url": "videos/1369-jl6uxZV.gif",
    "instruction_steps": [
      "Stand with your feet shoulder-width apart and place a resistance band under both feet.",
      "Hold the ends of the band with your hands for stability.",
      "Raise your heels off the ground as high as possible, using your calves.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Stand with your feet shoulder-width apart and place a resistance band under both feet. Hold the ends of the band with your hands for stability. Raise your heels off the ground as high as possible, using your calves. Pause for a moment at the top, then slowly lower your heels back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Stare con i piedi alla larghezza delle spalle e posizionare una fascia di resistenza sotto entrambi i piedi. Tieni le estremità della fascia con le mani per stabilità. Solleva i talloni da terra il più in alto possibile, usando i polpacci. Fai una pausa per un momento in alto, quindi abbassa lentamente i talloni nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınızı omuz genişliğinde açın ve her iki ayağınızın altına bir direnç bandı yerleştirin. Denge için bandın uçlarını ellerinizle tutun. Baldırlarınızı kullanarak topuklarınızı yerden mümkün olduğunca yükseğe kaldırın. Tepe noktasında bir an duraklayın, ardından topuklarınızı yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Ponte de pie con los pies separados a la altura de los hombros y coloca una banda elástica bajo ambos pies. Sujeta los extremos de la banda con las manos para mantener el equilibrio. Levanta los talones del suelo lo más alto posible, usando las pantorrillas. Haz una pausa breve en la parte alta y luego baja lentamente los talones de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Встаньте, поставив ноги на ширине плеч, и поместите эспандер под обе ноги. Для устойчивости удерживайте концы ленты руками. Поднимите пятки от земли как можно выше, используя икроножные мышцы. Задержитесь на мгновение в верхней точке, затем медленно опустите пятки обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "双脚分开与肩同宽站立，并将阻力带放在双脚下方。 用手握住带子的末端以保持稳定。 用小腿将脚跟抬离地面，尽可能高。 在顶部停顿片刻，然后慢慢降低脚后跟回到起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को कंधे की चौड़ाई पर फैलाकर खड़े हो जाएं और दोनों पैरों के नीचे एक रेजिस्टेंस बैंड लगाएं। स्थिरता के लिए बैंड के सिरों को अपने हाथों से पकड़ें। अपनी पिंडलियों का उपयोग करते हुए अपनी एड़ियों को जमीन से जितना संभव हो उतना ऊपर उठाएं। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपनी एड़ियों को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Stań w rozkroku na szerokość barków i umieść taśmę oporową pod obiema stopami. Trzymaj końce taśmy dłońmi dla stabilności. Unieś pięty nad podłogę tak wysoko, jak to możliwe, angażując mięśnie łydek. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść pięty z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "어깨 너비로 발을 벌리고 서서 저항 밴드를 양발 아래에 놓습니다. 안정성을 위해 밴드 끝을 손으로 잡습니다. 종아리를 사용하여 발꿈치를 최대한 높이 지면에서 들어 올립니다. 맨 위에서 잠시 멈춘 후, 천천히 발꿈치를 원래 위치로 내립니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Tiens-toi debout, les pieds écartés à la largeur des épaules et place un élastique sous tes deux pieds. Tiens les extrémités de l'élastique avec tes mains pour la stabilité. Lève tes talons du sol aussi haut que possible en utilisant tes mollets. Marque une pause en haut, puis abaisse lentement tes talons pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0994",
    "name": "band reverse wrist curl",
    "category": "lower arms",
    "body_part": "lower arms",
    "equipment": "band",
    "target": "forearms",
    "secondary_muscles": [
      "forearms"
    ],
    "image": "images/0994-Ezpnw9d.jpg",
    "gif_url": "videos/0994-Ezpnw9d.gif",
    "instruction_steps": [
      "Sit on a bench or chair with your feet flat on the ground.",
      "Hold the band with an overhand grip, palms facing down, and wrap it around your fingers.",
      "Rest your forearms on your thighs, with your wrists hanging off the edge.",
      "Slowly curl your wrists upward, squeezing your forearms.",
      "Pause for a moment at the top, then slowly lower your wrists back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Sit on a bench or chair with your feet flat on the ground. Hold the band with an overhand grip, palms facing down, and wrap it around your fingers. Rest your forearms on your thighs, with your wrists hanging off the edge. Slowly curl your wrists upward, squeezing your forearms. Pause for a moment at the top, then slowly lower your wrists back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Siediti su una panca o una sedia con i piedi appoggiati a terra. Tieni la fascia con una presa prona, i palmi rivolti verso il basso e avvolgila attorno alle dita. Appoggia gli avambracci sulle cosce, con i polsi che pendono dal bordo. Piega lentamente i polsi verso l'alto, stringendo gli avambracci. Fai una pausa per un momento in alto, quindi abbassa lentamente i polsi nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız yere düz basacak şekilde bir bankta veya sandalyede oturun. Bandı üstten kavrayarak, avuçlarınız aşağıya bakacak şekilde tutun ve parmaklarınızın etrafına sarın. Bilekleriniz kenardan sarkacak şekilde ön kollarınızı uyluklarınıza yaslayın. Bileklerinizi yavaşça yukarı doğru kıvırın, önkollarınızı sıkın. Tepe noktasında bir an duraklayın, ardından bileklerinizi yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Siéntate en un banco o silla con los pies apoyados en el suelo. Sostén la banda con un agarre prono, con las palmas hacia abajo, y envuélvela alrededor de los dedos. Apoya los antebrazos sobre los muslos, con las muñecas colgando del borde. Flexiona lentamente las muñecas hacia arriba, apretando los antebrazos. Haz una pausa por un momento en la parte superior, luego baja lentamente las muñecas de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Сядьте на скамью или стул, поставив ноги на землю. Возьмите ремешок сверху ладонями вниз и оберните его вокруг пальцев. Положите предплечья на бедра так, чтобы запястья свисали с краев. Медленно поднимите запястья вверх, сжимая предплечья. Задержитесь на мгновение в верхней точке, затем медленно опустите запястья обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "坐在长凳或椅子上，双脚平放在地面上。 正手握住弹力带，手掌朝下，然后将其缠绕在手指上。 将前臂放在大腿上，手腕悬在边缘上。 慢慢向上弯曲手腕，挤压前臂。 在顶部暂停片刻，然后慢慢将手腕放回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को ज़मीन पर सपाट करके किसी बेंच या कुर्सी पर बैठें। बैंड को ऊपरी पकड़ से पकड़ें, हथेलियाँ नीचे की ओर हों, और इसे अपनी उंगलियों के चारों ओर लपेटें। अपनी कलाईयों को किनारे से लटकाते हुए अपने अग्रबाहुओं को अपनी जाँघों पर टिकाएँ। धीरे-धीरे अपनी कलाइयों को ऊपर की ओर मोड़ें, अपने अग्रबाहुओं को निचोड़ें। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपनी कलाइयों को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Usiądź na ławce lub krześle, stopy płasko na podłodze. Chwyć taśmę nachwytem, dłonie skierowane w dół, i owiń ją wokół palców. Oprzyj przedramiona na udach, z nadgarstkami zwisającymi za krawędzią. Powoli uginaj nadgarstki w górę, ściskając przedramiona. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść nadgarstki z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "벤치나 의자에 앉아 발을 바닥에 붙입니다. 손바닥이 아래를 향하도록 오버핸드 그립으로 밴드를 잡고 손가락 주위에 감습니다. 전완을 넓적다리 위에 놓되 손목이 가장자리에서 떨어져 있게 합니다. 천천히 손목을 위로 말아올려 전완 근육을 짜냅니다. 꼭짓점에서 잠깐 멈춘 후 천천히 손목을 시작 자세로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Assieds-toi sur un banc ou une chaise, les pieds à plat sur le sol. Tiens l'élastique en prise pronation, les paumes tournées vers le bas, et enroule-le autour de tes doigts. Pose tes avant-bras sur tes cuisses, les poignets dépassant du bord. Enroule lentement tes poignets vers le haut, en contractant tes avant-bras. Marque une pause en haut, puis abaisse lentement tes poignets pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1016",
    "name": "band wrist curl",
    "category": "lower arms",
    "body_part": "lower arms",
    "equipment": "band",
    "target": "forearms",
    "secondary_muscles": [
      "biceps",
      "triceps"
    ],
    "image": "images/1016-vUTfFHw.jpg",
    "gif_url": "videos/1016-vUTfFHw.gif",
    "instruction_steps": [
      "Sit on a bench or chair with your feet flat on the ground.",
      "Hold the band with both hands, palms facing up, and rest your forearms on your thighs.",
      "Slowly curl your wrists upward, squeezing your forearms.",
      "Pause for a moment at the top, then slowly lower your wrists back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Sit on a bench or chair with your feet flat on the ground. Hold the band with both hands, palms facing up, and rest your forearms on your thighs. Slowly curl your wrists upward, squeezing your forearms. Pause for a moment at the top, then slowly lower your wrists back down to the starting position. Repeat for the desired number of repetitions.",
      "it": "Siediti su una panca o una sedia con i piedi appoggiati a terra. Tieni la fascia con entrambe le mani, i palmi rivolti verso l'alto e appoggia gli avambracci sulle cosce. Piega lentamente i polsi verso l'alto, stringendo gli avambracci. Fai una pausa per un momento in alto, quindi abbassa lentamente i polsi nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız yere düz basacak şekilde bir bankta veya sandalyede oturun. Bandı iki elinizle, avuçlarınız yukarı bakacak şekilde tutun ve ön kollarınızı uyluklarınıza yaslayın. Bileklerinizi yavaşça yukarı doğru kıvırın, önkollarınızı sıkın. Tepe noktasında bir an duraklayın, ardından bileklerinizi yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Siéntate en un banco o silla con los pies apoyados en el suelo. Sujeta la banda con ambas manos, con las palmas hacia arriba, y apoya los antebrazos sobre los muslos. Flexiona lentamente las muñecas hacia arriba, apretando los antebrazos. Haz una pausa por un momento en la parte superior, luego baja lentamente las muñecas de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Сядьте на скамью или стул, поставив ноги на землю. Держите ленту обеими руками ладонями вверх и положите предплечья на бедра. Медленно поднимите запястья вверх, сжимая предплечья. Задержитесь на мгновение в верхней точке, затем медленно опустите запястья обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "坐在长凳或椅子上，双脚平放在地面上。 双手握住弹力带，手掌朝上，前臂放在大腿上。 慢慢向上弯曲手腕，挤压前臂。 在顶部暂停片刻，然后慢慢将手腕放回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को ज़मीन पर सपाट करके किसी बेंच या कुर्सी पर बैठें। बैंड को दोनों हाथों से पकड़ें, हथेलियाँ ऊपर की ओर हों और अपने अग्रबाहुओं को अपनी जाँघों पर टिकाएँ। धीरे-धीरे अपनी कलाइयों को ऊपर की ओर मोड़ें, अपने अग्रबाहुओं को निचोड़ें। शीर्ष पर एक पल के लिए रुकें, फिर धीरे-धीरे अपनी कलाइयों को वापस प्रारंभिक स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Usiądź na ławce lub krześle, stopy płasko na podłodze. Trzymaj taśmę obiema rękami, dłonie skierowane do góry, i oprzyj przedramiona na udach. Powoli uginaj nadgarstki w górę, ściskając przedramiona. Zatrzymaj się na chwilę w górnej pozycji, a następnie powoli opuść nadgarstki z powrotem do pozycji wyjściowej. Powtórz zalecaną liczbę razy.",
      "ko": "벤치나 의자에 앉아 발을 땅에 댑니다. 밴드를 양손으로 손바닥이 위를 향하도록 잡고 팔뚝을 넓적다리에 얹습니다. 천천히 손목을 위로 구부리며 팔뚝을 조입니다. 맨 위에서 잠시 멈춘 후, 천천히 손목을 원래 위치로 내립니다. 원하는 횟수만큼 반복합니다.",
      "fr": "Assieds-toi sur un banc ou une chaise, les pieds à plat sur le sol. Tiens l'élastique des deux mains, les paumes tournées vers le haut, et pose tes avant-bras sur tes cuisses. Enroule lentement tes poignets vers le haut, en contractant tes avant-bras. Marque une pause en haut, puis abaisse lentement tes poignets pour revenir à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1411",
    "name": "barbell palms down wrist curl over a bench",
    "category": "lower arms",
    "body_part": "lower arms",
    "equipment": "barbell",
    "target": "forearms",
    "secondary_muscles": [
      "biceps",
      "brachialis"
    ],
    "image": "images/1411-yzYH9pI.jpg",
    "gif_url": "videos/1411-yzYH9pI.gif",
    "instruction_steps": [
      "Sit on a bench with your feet flat on the ground and your forearms resting on your thighs, palms facing down.",
      "Hold a barbell with an overhand grip, hands shoulder-width apart.",
      "Lower the barbell towards the ground by flexing your wrists, keeping your forearms stationary.",
      "Pause for a moment at the bottom, then slowly raise the barbell back up by extending your wrists.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Sit on a bench with your feet flat on the ground and your forearms resting on your thighs, palms facing down. Hold a barbell with an overhand grip, hands shoulder-width apart. Lower the barbell towards the ground by flexing your wrists, keeping your forearms stationary. Pause for a moment at the bottom, then slowly raise the barbell back up by extending your wrists. Repeat for the desired number of repetitions.",
      "it": "Siediti su una panca con i piedi appoggiati a terra e gli avambracci appoggiati sulle cosce, con i palmi rivolti verso il basso. Tieni un bilanciere con una presa prona, le mani alla larghezza delle spalle. Abbassa il bilanciere verso terra flettendo i polsi e mantenendo gli avambracci fermi. Fai una pausa per un momento in basso, quindi solleva lentamente il bilanciere estendendo i polsi. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız yere düz basacak ve önkollarınız uyluklarınızın üzerinde olacak şekilde, avuçlarınız aşağıya bakacak şekilde bir bankta oturun. Halteri üstten kavrayarak tutun, ellerinizi omuz genişliğinde açın. Ön kollarınızı sabit tutarak bileklerinizi esneterek halteri yere doğru indirin. Altta bir an duraklayın, ardından bileklerinizi uzatarak halteri yavaşça yukarı kaldırın. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Siéntate en un banco con los pies planos sobre el suelo y los antebrazos apoyados sobre los muslos, con las palmas hacia abajo. Sujeta una barra con un agarre pronado, manos separadas a la altura de los hombros. Baja la barra hacia el suelo flexionando las muñecas, manteniendo los antebrazos fijos. Haz una pausa breve en la parte baja y luego levanta lentamente la barra extendiendo las muñecas. Repite el número de repeticiones deseado.",
      "ru": "Сядьте на скамью, поставьте ступни на землю, положите предплечья на бедра ладонями вниз. Возьмите штангу хватом сверху, руки на ширине плеч. Опустите штангу к земле, сгибая запястья, сохраняя предплечья неподвижными. Задержитесь на мгновение в нижней точке, затем медленно поднимите штангу вверх, вытягивая запястья. Повторите необходимое количество повторений.",
      "zh": "坐在长凳上，双脚平放在地上，前臂放在大腿上，手掌朝下。 正手握住杠铃，双手与肩同宽。 弯曲手腕，将杠铃降低到地面，保持前臂静止。 在底部停顿片刻，然后通过伸展手腕慢慢将杠铃举起。 重复所需的重复次数。",
      "hi": "अपने पैरों को ज़मीन पर सपाट करके और अपने अग्रभागों को अपनी जाँघों पर टिकाकर, हथेलियाँ नीचे की ओर रखते हुए एक बेंच पर बैठें। हाथों को कंधे की चौड़ाई से अलग रखते हुए बारबेल को ओवरहैंड ग्रिप से पकड़ें। अपनी कलाइयों को मोड़कर, अपने अग्रबाहुओं को स्थिर रखते हुए, बारबेल को ज़मीन की ओर नीचे करें। नीचे एक पल के लिए रुकें, फिर धीरे-धीरे अपनी कलाइयों को फैलाकर बारबेल को वापस ऊपर उठाएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Usiądź na ławce, stopy oprzyj płasko na podłodze, a przedramiona oprzyj na udach, dłonie skierowane w dół. Chwyć sztangę chwytem nachwytem, dłonie na szerokość barków. Opuść sztangę w kierunku podłogi, zginając nadgarstki, utrzymując przedramiona nieruchomo. Zatrzymaj się na chwilę na dole, a następnie powoli unieś sztangę z powrotem, prostując nadgarstki. Powtórz odpowiednią liczbę razy.",
      "ko": "벤치에 앉아 발을 바닥에 평평하게 놓고 팔뚝을 허벅지에 올려놓되, 손바닥은 아래를 향하게 합니다. 오버그립으로 바벨을 잡되, 손은 어깨너비로 벌립니다. 손목을 구부려 바벨을 땅 방향으로 내리되, 팔뚝은 움직이지 않게 고정합니다. 아래에서 잠깐 멈춘 후 손목을 펼쳐 바벨을 천천히 시작 위치로 올립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Assieds-toi sur un banc, les pieds à plat sur le sol et tes avant-bras posés sur tes cuisses, paumes tournées vers le bas. Tiens une barre avec une prise en pronation, les mains écartées à la largeur des épaules. Abaisse la barre vers le sol en fléchissant tes poignets, en gardant tes avant-bras immobiles. Marque une pause en bas, puis remonte lentement la barre en tendant tes poignets. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "1412",
    "name": "barbell palms up wrist curl over a bench",
    "category": "lower arms",
    "body_part": "lower arms",
    "equipment": "barbell",
    "target": "forearms",
    "secondary_muscles": [
      "biceps",
      "shoulders"
    ],
    "image": "images/1412-SJAA2IQ.jpg",
    "gif_url": "videos/1412-SJAA2IQ.gif",
    "instruction_steps": [
      "Sit on a bench with your feet flat on the ground and hold a barbell with an underhand grip, palms facing up.",
      "Rest your forearms on the bench, allowing your wrists to hang off the edge.",
      "Keeping your forearms stationary, exhale and curl your wrists upwards as far as possible.",
      "Hold the contracted position for a brief pause, then inhale and slowly lower the barbell back to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Sit on a bench with your feet flat on the ground and hold a barbell with an underhand grip, palms facing up. Rest your forearms on the bench, allowing your wrists to hang off the edge. Keeping your forearms stationary, exhale and curl your wrists upwards as far as possible. Hold the contracted position for a brief pause, then inhale and slowly lower the barbell back to the starting position. Repeat for the desired number of repetitions.",
      "it": "Sedersi su una panca con i piedi appoggiati a terra e tenere un bilanciere con una presa subdola, con i palmi rivolti verso l'alto. Appoggia gli avambracci sulla panca, lasciando che i polsi pendano dal bordo. Mantenendo gli avambracci fermi, espira e piega i polsi verso l'alto il più possibile. Mantieni la posizione contratta per una breve pausa, quindi inspira e riporta lentamente il bilanciere nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız yere düz basacak şekilde bir bankta oturun ve halteri avuç içleriniz yukarı bakacak şekilde alttan kavrayarak tutun. Önkollarınızı bankın üzerine yaslayın, bileklerinizin kenardan sarkmasına izin verin. Önkollarınızı sabit tutarak nefes verin ve bileklerinizi mümkün olduğunca yukarı doğru kıvırın. Kısa bir süre kasılmış pozisyonda kalın, ardından nefes alın ve halteri yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Siéntate en un banco con los pies planos sobre el suelo y sujeta una barra con un agarre supino, con las palmas hacia arriba. Apoya los antebrazos sobre el banco, dejando que las muñecas cuelguen del borde. Manteniendo los antebrazos fijos, exhala y flexiona las muñecas hacia arriba tanto como sea posible. Mantén la posición contraída durante una breve pausa, luego inhala y baja lentamente la barra de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Сядьте на скамью, поставьте ступни на землю и возьмите штангу обратным хватом ладонями вверх. Положите предплечья на скамью так, чтобы запястья свисали с края. Удерживая предплечья неподвижно, выдохните и согните запястья вверх как можно дальше. Удерживайте сокращенное положение на короткую паузу, затем вдохните и медленно опустите штангу обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "坐在长凳上，双脚平放在地面上，反手握住杠铃，手掌朝上。 将前臂放在长凳上，让手腕悬在长凳边缘。 保持前臂静止，呼气并尽可能向上弯曲手腕。 保持收缩位置短暂停顿，然后吸气并慢慢将杠铃放回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को जमीन पर सपाट करके एक बेंच पर बैठें और हथेलियाँ ऊपर की ओर रखते हुए बारबेल को हाथ से पकड़ें। अपनी बांहों को बेंच पर टिकाएं, जिससे आपकी कलाइयां किनारे से लटक जाएं। अपने अग्रबाहुओं को स्थिर रखते हुए सांस छोड़ें और जहां तक ​​संभव हो अपनी कलाइयों को ऊपर की ओर मोड़ें। थोड़ी देर के लिए सिकुड़ी हुई स्थिति में बने रहें, फिर सांस लें और धीरे-धीरे बारबेल को वापस शुरुआती स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Usiądź na ławce, stopy oprzyj płasko na podłodze, i chwyć sztangę chwytem podchwytem, dłonie skierowane do góry. Oprzyj przedramiona na ławce, pozwalając nadgarstkom zwisać za jej krawędzią. Utrzymując przedramiona nieruchomo, wydychaj powietrze i zginaj nadgarstki w górę, jak najdalej to możliwe. Zatrzymaj się na chwilę w pozycji szczytowej, a następnie wdychaj powietrze, powoli opuszczając sztangę do pozycji wyjściowej. Powtórz odpowiednią liczbę razy.",
      "ko": "벤치에 앉아 발을 바닥에 평평하게 놓고 언더그립으로 바벨을 잡되, 손바닥은 위를 향하게 합니다. 팔뚝을 벤치에 올려놓되, 손목이 가장자리에서 내려오도록 합니다. 팔뚝은 움직이지 않게 고정하고 숨을 내쉬면서 손목을 최대한 위로 구부립니다. 수축된 위치에서 잠깐 멈춘 후 숨을 들이쉬면서 바벨을 천천히 시작 위치로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Assieds-toi sur un banc, les pieds à plat sur le sol, et tiens une barre avec une prise en supination, paumes tournées vers le haut. Pose tes avant-bras sur le banc, en laissant tes poignets dépasser du bord. En gardant tes avant-bras immobiles, expire et fléchis tes poignets vers le haut aussi loin que possible. Maintiens la position contractée pendant une brève pause, puis inspire et abaisse lentement la barre jusqu'à la position de départ. Répète le nombre de répétitions souhaité."
    }
  },
  {
    "id": "0079",
    "name": "barbell revers wrist curl v. 2",
    "category": "lower arms",
    "body_part": "lower arms",
    "equipment": "barbell",
    "target": "forearms",
    "secondary_muscles": [
      "biceps",
      "brachialis"
    ],
    "image": "images/0079-qDnGfDb.jpg",
    "gif_url": "videos/0079-qDnGfDb.gif",
    "instruction_steps": [
      "Sit on a bench with your feet flat on the ground and your knees bent.",
      "Hold a barbell with an overhand grip, palms facing down, and your hands shoulder-width apart.",
      "Rest your forearms on your thighs, allowing your wrists to hang off the edge.",
      "Keeping your forearms stationary, exhale and curl your wrists upward as far as possible.",
      "Hold the contracted position for a brief pause, then inhale and slowly lower the barbell back to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    "instructions_all": {
      "en": "Sit on a bench with your feet flat on the ground and your knees bent. Hold a barbell with an overhand grip, palms facing down, and your hands shoulder-width apart. Rest your forearms on your thighs, allowing your wrists to hang off the edge. Keeping your forearms stationary, exhale and curl your wrists upward as far as possible. Hold the contracted position for a brief pause, then inhale and slowly lower the barbell back to the starting position. Repeat for the desired number of repetitions.",
      "it": "Siediti su una panchina con i piedi appoggiati a terra e le ginocchia piegate. Tieni un bilanciere con una presa prona, i palmi rivolti verso il basso e le mani alla larghezza delle spalle. Appoggia gli avambracci sulle cosce, lasciando che i polsi pendano dal bordo. Mantenendo gli avambracci fermi, espira e piega i polsi verso l'alto il più possibile. Mantieni la posizione contratta per una breve pausa, quindi inspira e riporta lentamente il bilanciere nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
      "tr": "Ayaklarınız yere düz basacak ve dizleriniz bükülü olacak şekilde bir bankta oturun. Halteri üstten kavrayarak, avuç içleriniz aşağıya bakacak şekilde ve elleriniz omuz genişliğinde açık olacak şekilde tutun. Ön kollarınızı uyluklarınıza yaslayın, bileklerinizin kenardan sarkmasına izin verin. Ön kollarınızı sabit tutarak nefes verin ve bileklerinizi mümkün olduğunca yukarı doğru kıvırın. Kısa bir süre kasılmış pozisyonda kalın, ardından nefes alın ve halteri yavaşça başlangıç ​​pozisyonuna indirin. İstenilen sayıda tekrar için tekrarlayın.",
      "es": "Siéntate en un banco con los pies planos sobre el suelo y las rodillas flexionadas. Sujeta una barra con un agarre pronado, palmas hacia abajo, y las manos separadas a la altura de los hombros. Apoya los antebrazos sobre los muslos, dejando que las muñecas cuelguen del borde. Manteniendo los antebrazos fijos, exhala y flexiona las muñecas hacia arriba tanto como sea posible. Mantén la posición contraída durante una breve pausa, luego inhala y baja lentamente la barra de vuelta a la posición inicial. Repite el número de repeticiones deseado.",
      "ru": "Сядьте на скамью, поставьте ноги на землю и согните колени. Возьмите штангу хватом сверху, ладонями вниз, руки на ширине плеч. Положите предплечья на бедра, позволяя запястьям свисать с края. Удерживая предплечья неподвижно, выдохните и согните запястья вверх как можно дальше. Удерживайте сокращенное положение на короткую паузу, затем вдохните и медленно опустите штангу обратно в исходное положение. Повторите необходимое количество повторений.",
      "zh": "坐在长凳上，双脚平放在地上，膝盖弯曲。 正手握住杠铃，手掌朝下，双手与肩同宽。 将前臂放在大腿上，让手腕悬在边缘。 保持前臂静止，呼气并尽可能向上弯曲手腕。 保持收缩位置短暂停顿，然后吸气并慢慢将杠铃放回起始位置。 重复所需的重复次数。",
      "hi": "अपने पैरों को ज़मीन पर सपाट करके और अपने घुटनों को मोड़कर एक बेंच पर बैठें। बारबेल को ओवरहैंड ग्रिप से पकड़ें, हथेलियाँ नीचे की ओर हों और आपके हाथ कंधे की चौड़ाई से अलग हों। अपने अग्रबाहुओं को अपनी जाँघों पर टिकाएँ, जिससे आपकी कलाइयाँ किनारे से लटक जाएँ। अपनी बांहों को स्थिर रखते हुए सांस छोड़ें और जहां तक ​​संभव हो अपनी कलाइयों को ऊपर की ओर मोड़ें। थोड़ी देर के लिए सिकुड़ी हुई स्थिति में बने रहें, फिर सांस लें और धीरे-धीरे बारबेल को वापस शुरुआती स्थिति में ले आएं। दोहराव की वांछित संख्या के लिए दोहराएँ।",
      "pl": "Usiądź na ławce, stopy oprzyj płasko na podłodze, a kolana ugnij. Chwyć sztangę chwytem nachwytem, dłonie skierowane w dół, na szerokość barków. Oprzyj przedramiona na udach, pozwalając nadgarstkom zwisać za krawędzią. Utrzymując przedramiona nieruchomo, wydychaj powietrze i zginaj nadgarstki w górę, jak najdalej to możliwe. Zatrzymaj się na chwilę w pozycji szczytowej, a następnie wdychaj powietrze, powoli opuszczając sztangę do pozycji wyjściowej. Powtórz odpowiednią liczbę razy.",
      "ko": "벤치에 앉아 발을 바닥에 평평하게 놓고 무릎을 구부립니다. 오버그립(손바닥이 아래)으로 바벨을 잡되, 손은 어깨너비로 벌립니다. 팔뚝을 허벅지에 올려놓고 손목이 가장자리에서 내려오도록 합니다. 팔뚝은 움직이지 않게 고정하고 숨을 내쉬면서 손목을 최대한 위로 구부립니다. 수축된 위치에서 잠깐 멈춘 후 숨을 들이쉬면서 바벨을 천천히 시작 위치로 내립니다. 원하는 반복 횟수만큼 반복합니다.",
      "fr": "Assieds-toi sur un banc, les pieds à plat sur le sol et les genoux fléchis. Tiens une barre avec une prise en pronation, les paumes tournées vers le bas, et les mains écartées à la largeur des épaules. Pose tes avant-bras sur tes cuisses, en laissant tes poignets dépasser du bord. En gardant tes avant-bras immobiles, expire et fléchis tes poignets vers le haut aussi loin que possible. Maintiens la position contractée pendant une brève pause, puis inspire et abaisse lentement la barre jusqu'à la position de départ. Répète le nombre de répétitions souhaité."
    }
  }
];
