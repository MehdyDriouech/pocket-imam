export interface PrayerPosition {
  id: number
  name: string
  arabicName: string
  description: string
  imageUrl: string
  duration: number // seconds to hold position
  instructions: string[]
  recitation?: {
    arabic: string
    transliteration: string
    translation: string
    repetitions: number
  }
}

export interface PrayerRakah {
  id: number
  name: string
  positions: PrayerPosition[]
}

export interface PrayerLesson {
  id: string
  name: string
  arabicName: string
  description: string
  rakahs: PrayerRakah[]
  totalDuration: number
}

export const prayerPositions: PrayerPosition[] = [
  {
    id: 1,
    name: "Standing (Qiyam)",
    arabicName: "القيام",
    description: "Stand upright facing the Qibla with feet shoulder-width apart",
    imageUrl: "/prayer-standing.png",
    duration: 30,
    instructions: [
      "Face the Qibla direction",
      "Stand with feet shoulder-width apart",
      "Keep your back straight",
      "Look down at the place of prostration",
      "Place hands at your sides initially",
    ],
    recitation: {
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah is the Greatest",
      repetitions: 1,
    },
  },
  {
    id: 2,
    name: "Hands on Chest",
    arabicName: "وضع اليدين على الصدر",
    description: "Place right hand over left hand on the chest",
    imageUrl: "/prayer-hands-chest.png",
    duration: 60,
    instructions: [
      "Place right hand over left hand",
      "Position hands on the chest",
      "Keep fingers naturally curved",
      "Maintain upright posture",
    ],
    recitation: {
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
      transliteration: "Subhanaka Allahumma wa bihamdika wa tabaraka ismuka wa ta'ala jadduka wa la ilaha ghayruka",
      translation:
        "Glory be to You, O Allah, and praise be to You. Blessed is Your Name and exalted is Your Majesty. There is no god but You.",
      repetitions: 1,
    },
  },
  {
    id: 3,
    name: "Bowing (Ruku)",
    arabicName: "الركوع",
    description: "Bow down with hands on knees, back straight",
    imageUrl: "/prayer-bowing.png",
    duration: 20,
    instructions: [
      "Say 'Allahu Akbar' while going down",
      "Place hands firmly on knees",
      "Keep back straight and parallel to ground",
      "Look down between your feet",
    ],
    recitation: {
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      transliteration: "Subhana Rabbiyal Azeem",
      translation: "Glory be to my Lord, the Most Great",
      repetitions: 3,
    },
  },
  {
    id: 4,
    name: "Standing from Ruku",
    arabicName: "الاعتدال من الركوع",
    description: "Rise back to standing position",
    imageUrl: "/prayer-standing-ruku.png",
    duration: 10,
    instructions: ["Rise slowly to standing position", "Keep hands at your sides", "Stand upright and still"],
    recitation: {
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ رَبَّنَا وَلَكَ الْحَمْدُ",
      transliteration: "Sami'a Allahu liman hamidah, Rabbana wa lakal hamd",
      translation: "Allah hears those who praise Him. Our Lord, praise be to You.",
      repetitions: 1,
    },
  },
  {
    id: 5,
    name: "Prostration (Sujud)",
    arabicName: "السجود",
    description: "Prostrate with forehead, nose, palms, knees, and toes touching the ground",
    imageUrl: "/prayer-prostration.png",
    duration: 20,
    instructions: [
      "Say 'Allahu Akbar' while going down",
      "Place forehead and nose on ground",
      "Keep palms flat on ground beside head",
      "Knees and toes should touch ground",
      "Keep elbows raised, not touching ground",
    ],
    recitation: {
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      transliteration: "Subhana Rabbiyal A'la",
      translation: "Glory be to my Lord, the Most High",
      repetitions: 3,
    },
  },
  {
    id: 6,
    name: "Sitting between Sujud",
    arabicName: "الجلوس بين السجدتين",
    description: "Sit briefly between the two prostrations",
    imageUrl: "/prayer-sitting.png",
    duration: 10,
    instructions: ["Sit on your left foot", "Keep right foot upright", "Place hands on thighs", "Keep back straight"],
    recitation: {
      arabic: "رَبِّ اغْفِرْ لِي",
      transliteration: "Rabbi ghfir li",
      translation: "My Lord, forgive me",
      repetitions: 1,
    },
  },
]

export interface PrayerStep {
  id: number
  name: string
  arabicName: string
  position: "standing" | "ruku" | "sujud" | "sitting"
  imageUrl: string
  duration: number
  recitation: {
    arabic: string
    transliteration: string
    translation: string
    repetitions: number
  }
  instructions: string[]
}

export interface CompletePrayerRakah {
  id: number
  name: string
  steps: PrayerStep[]
  sourates: {
    fatiha: boolean // Always Al-Fatiha
    additional: number // Which sourate number (2, 3, 4, etc.)
  }
}

export const completePrayerSteps: PrayerStep[] = [
  {
    id: 1,
    name: "Opening Takbir",
    arabicName: "تكبيرة الإحرام",
    position: "standing",
    imageUrl: "/prayer-standing.png",
    duration: 5,
    recitation: {
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah is the Greatest",
      repetitions: 1,
    },
    instructions: ["Raise hands to ears", "Say Allahu Akbar", "Begin the prayer"],
  },
  {
    id: 2,
    name: "Opening Supplication",
    arabicName: "دعاء الاستفتاح",
    position: "standing",
    imageUrl: "/prayer-hands-chest.png",
    duration: 15,
    recitation: {
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
      transliteration: "Subhanaka Allahumma wa bihamdika wa tabaraka ismuka wa ta'ala jadduka wa la ilaha ghayruka",
      translation:
        "Glory be to You, O Allah, and praise be to You. Blessed is Your Name and exalted is Your Majesty. There is no god but You.",
      repetitions: 1,
    },
    instructions: ["Place right hand over left on chest", "Recite opening supplication"],
  },
  {
    id: 3,
    name: "Al-Fatiha",
    arabicName: "سورة الفاتحة",
    position: "standing",
    imageUrl: "/prayer-hands-chest.png",
    duration: 30,
    recitation: {
      arabic:
        "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَنِ الرَّحِيمِ مَالِكِ يَوْمِ الدِّينِ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      transliteration:
        "Bismillahi Rahmanir Raheem. Alhamdu lillahi rabbil alameen. Ar-Rahmanir Raheem. Maliki yawmid deen. Iyyaka na'budu wa iyyaka nasta'een. Ihdinassiratal mustaqeem. Siratal lazeena an'amta alayhim ghayril maghdoobi alayhim wa lad daaleen.",
      translation:
        "In the name of Allah, the Most Gracious, the Most Merciful. Praise be to Allah, Lord of all the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those You have blessed, not of those who have incurred Your wrath, nor of those who have gone astray.",
      repetitions: 1,
    },
    instructions: ["Recite Al-Fatiha", "Say 'Ameen' at the end"],
  },
  {
    id: 4,
    name: "Additional Surah",
    arabicName: "سورة إضافية",
    position: "standing",
    imageUrl: "/prayer-hands-chest.png",
    duration: 20,
    recitation: {
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
      transliteration: "Qul huwa Allahu ahad. Allahu samad. Lam yalid wa lam yoolad. Wa lam yakun lahu kufuwan ahad.",
      translation:
        "Say: He is Allah, the One! Allah, the Eternal, Absolute. He begets not, nor is He begotten. And there is none like unto Him.",
      repetitions: 1,
    },
    instructions: ["Recite additional surah", "This changes for each rakah"],
  },
  {
    id: 5,
    name: "Going to Ruku",
    arabicName: "الذهاب إلى الركوع",
    position: "ruku",
    imageUrl: "/prayer-bowing.png",
    duration: 3,
    recitation: {
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah is the Greatest",
      repetitions: 1,
    },
    instructions: ["Say Allahu Akbar while bowing", "Place hands on knees"],
  },
  {
    id: 6,
    name: "Ruku Dhikr",
    arabicName: "ذكر الركوع",
    position: "ruku",
    imageUrl: "/prayer-bowing.png",
    duration: 15,
    recitation: {
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      transliteration: "Subhana Rabbiyal Azeem",
      translation: "Glory be to my Lord, the Most Great",
      repetitions: 3,
    },
    instructions: ["Keep back straight", "Hands firmly on knees", "Repeat 3 times minimum"],
  },
  {
    id: 7,
    name: "Rising from Ruku",
    arabicName: "الاعتدال من الركوع",
    position: "standing",
    imageUrl: "/prayer-standing-ruku.png",
    duration: 5,
    recitation: {
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
      transliteration: "Sami'a Allahu liman hamidah",
      translation: "Allah hears those who praise Him",
      repetitions: 1,
    },
    instructions: ["Rise to standing", "Say while rising"],
  },
  {
    id: 8,
    name: "Standing after Ruku",
    arabicName: "القيام بعد الركوع",
    position: "standing",
    imageUrl: "/prayer-standing-ruku.png",
    duration: 5,
    recitation: {
      arabic: "رَبَّنَا وَلَكَ الْحَمْدُ",
      transliteration: "Rabbana wa lakal hamd",
      translation: "Our Lord, praise be to You",
      repetitions: 1,
    },
    instructions: ["Stand upright", "Hands at sides"],
  },
  {
    id: 9,
    name: "Going to Sujud",
    arabicName: "الذهاب إلى السجود",
    position: "sujud",
    imageUrl: "/prayer-prostration.png",
    duration: 3,
    recitation: {
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah is the Greatest",
      repetitions: 1,
    },
    instructions: ["Say Allahu Akbar while going down", "Forehead and nose touch ground"],
  },
  {
    id: 10,
    name: "First Sujud",
    arabicName: "السجدة الأولى",
    position: "sujud",
    imageUrl: "/prayer-prostration.png",
    duration: 15,
    recitation: {
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      transliteration: "Subhana Rabbiyal A'la",
      translation: "Glory be to my Lord, the Most High",
      repetitions: 3,
    },
    instructions: ["Forehead, nose, palms, knees, toes on ground", "Repeat 3 times minimum"],
  },
  {
    id: 11,
    name: "Sitting between Sujud",
    arabicName: "الجلوس بين السجدتين",
    position: "sitting",
    imageUrl: "/prayer-sitting.png",
    duration: 10,
    recitation: {
      arabic: "رَبِّ اغْفِرْ لِي",
      transliteration: "Rabbi ghfir li",
      translation: "My Lord, forgive me",
      repetitions: 1,
    },
    instructions: ["Sit on left foot", "Right foot upright", "Hands on thighs"],
  },
  {
    id: 12,
    name: "Second Sujud",
    arabicName: "السجدة الثانية",
    position: "sujud",
    imageUrl: "/prayer-prostration.png",
    duration: 15,
    recitation: {
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      transliteration: "Subhana Rabbiyal A'la",
      translation: "Glory be to my Lord, the Most High",
      repetitions: 3,
    },
    instructions: ["Same as first sujud", "Say Allahu Akbar before going down"],
  },
]

export const prayerLessons: PrayerLesson[] = [
  {
    id: "fajr",
    name: "Fajr Prayer",
    arabicName: "صلاة الفجر",
    description: "Learn the 2-rakah morning prayer",
    rakahs: [
      {
        id: 1,
        name: "First Rakah",
        positions: [1, 2, 3, 4, 5, 6, 5], // Standing, Hands on chest, Ruku, Standing, Sujud, Sitting, Sujud
      },
      {
        id: 2,
        name: "Second Rakah",
        positions: [1, 2, 3, 4, 5, 6, 5], // Same sequence
      },
    ],
    totalDuration: 300, // 5 minutes
  },
  {
    id: "basic",
    name: "Basic Prayer Positions",
    arabicName: "وضوح الصلاة الأساسية",
    description: "Learn fundamental prayer positions step by step",
    rakahs: [
      {
        id: 1,
        name: "Complete Sequence",
        positions: [1, 2, 3, 4, 5, 6, 5],
      },
    ],
    totalDuration: 180, // 3 minutes
  },
]

export const completePrayerLessons = [
  {
    id: "fajr-guided",
    name: "Fajr Prayer (Guided)",
    arabicName: "صلاة الفجر المرشدة",
    description: "Complete guided Fajr prayer with all steps",
    rakahs: [
      {
        id: 1,
        name: "First Rakah",
        steps: completePrayerSteps,
        sourates: { fatiha: true, additional: 2 }, // Al-Fatiha + Surah 2
      },
      {
        id: 2,
        name: "Second Rakah",
        steps: completePrayerSteps.slice(2), // Skip opening takbir and supplication
        sourates: { fatiha: true, additional: 3 }, // Al-Fatiha + Surah 3
      },
    ],
    totalDuration: 600,
  },
  {
    id: "dhuhr-guided",
    name: "Dhuhr Prayer (Guided)",
    arabicName: "صلاة الظهر المرشدة",
    description: "Complete guided Dhuhr prayer with all steps",
    rakahs: [
      {
        id: 1,
        name: "First Rakah",
        steps: completePrayerSteps,
        sourates: { fatiha: true, additional: 2 },
      },
      {
        id: 2,
        name: "Second Rakah",
        steps: completePrayerSteps.slice(2),
        sourates: { fatiha: true, additional: 3 },
      },
      {
        id: 3,
        name: "Third Rakah",
        steps: completePrayerSteps.slice(2),
        sourates: { fatiha: true, additional: 4 },
      },
      {
        id: 4,
        name: "Fourth Rakah",
        steps: completePrayerSteps.slice(2),
        sourates: { fatiha: true, additional: 5 },
      },
    ],
    totalDuration: 1200,
  },
]

export interface PrayerProgress {
  completedLessons: string[]
  currentLesson: string
  currentRakah: number
  currentPosition: number
  totalPracticeSessions: number
  averageSessionTime: number
  lastPracticeDate?: Date
}

export const getPrayerProgressPercentage = (progress: PrayerProgress, lessonId: string): number => {
  const lesson = prayerLessons.find((l) => l.id === lessonId)
  if (!lesson) return 0

  if (progress.completedLessons.includes(lessonId)) return 100

  if (progress.currentLesson !== lessonId) return 0

  const totalPositions = lesson.rakahs.reduce((sum, rakah) => sum + rakah.positions.length, 0)
  const completedPositions = (progress.currentRakah - 1) * lesson.rakahs[0].positions.length + progress.currentPosition

  return Math.round((completedPositions / totalPositions) * 100)
}
