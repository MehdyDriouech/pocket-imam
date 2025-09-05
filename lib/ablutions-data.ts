export interface AblutionStep {
  id: number
  title: string
  arabicTitle: string
  description: string
  arabicText?: string
  transliteration?: string
  translation?: string
  imageUrl: string
  audioUrl?: string
  duration: number // seconds to spend on this step
  tips: string[]
}

export const ablutionSteps: AblutionStep[] = [
  {
    id: 1,
    title: "Intention (Niyyah)",
    arabicTitle: "النية",
    description: "Begin with the intention to perform ablution for the sake of Allah.",
    arabicText: "نَوَيْتُ الْوُضُوءَ لِرَفْعِ الْحَدَثِ الأَصْغَرِ فَرْضًا لِلَّهِ تَعَالَى",
    transliteration: "Nawaitu al-wudoo'a li-raf'i al-hadathi al-asghari fardan lillahi ta'ala",
    translation: "I intend to perform ablution to remove minor impurity as an obligation to Allah the Most High",
    imageUrl: "/person-ablution-intention.png",
    duration: 10,
    tips: [
      "Make the intention in your heart",
      "You don't need to say it out loud",
      "Focus on purifying yourself for prayer",
    ],
  },
  {
    id: 2,
    title: "Say Bismillah",
    arabicTitle: "بسم الله",
    description: "Begin by saying 'In the name of Allah'",
    arabicText: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    translation: "In the name of Allah",
    imageUrl: "/person-bismillah-ablution.png",
    duration: 5,
    tips: ["Always begin with Allah's name", "This brings blessing to your ablution", "Say it with sincerity"],
  },
  {
    id: 3,
    title: "Wash Hands",
    arabicTitle: "غسل اليدين",
    description: "Wash both hands up to the wrists three times, starting with the right hand.",
    imageUrl: "/hands-ablution.png",
    duration: 30,
    tips: ["Start with the right hand", "Wash between fingers", "Clean under fingernails", "Wash up to the wrists"],
  },
  {
    id: 4,
    title: "Rinse Mouth",
    arabicTitle: "المضمضة",
    description: "Rinse your mouth three times, swirling water around.",
    imageUrl: "/ablution-rinsing-mouth.png",
    duration: 20,
    tips: [
      "Use your right hand to bring water to mouth",
      "Swirl water around thoroughly",
      "Spit out the water completely",
      "If not fasting, gargle gently",
    ],
  },
  {
    id: 5,
    title: "Clean Nose",
    arabicTitle: "الاستنشاق",
    description: "Sniff water into your nostrils and blow it out three times.",
    imageUrl: "/ablution-nose-cleaning.png",
    duration: 20,
    tips: [
      "Use your right hand to bring water to nose",
      "Sniff gently, don't force water",
      "Use left hand to blow out water",
      "Be gentle if you have a cold",
    ],
  },
  {
    id: 6,
    title: "Wash Face",
    arabicTitle: "غسل الوجه",
    description: "Wash your entire face three times from forehead to chin, ear to ear.",
    imageUrl: "/ablution-wash.png",
    duration: 30,
    tips: [
      "Use both hands to wash face",
      "Cover from hairline to chin",
      "Include the area from ear to ear",
      "Wash any facial hair thoroughly",
    ],
  },
  {
    id: 7,
    title: "Wash Arms",
    arabicTitle: "غسل الذراعين",
    description: "Wash both arms from fingertips to elbows three times, starting with the right arm.",
    imageUrl: "/ablution-arm-washing.png",
    duration: 40,
    tips: [
      "Start with the right arm",
      "Wash from fingertips to elbows",
      "Include the elbows completely",
      "Remove any tight jewelry if possible",
    ],
  },
  {
    id: 8,
    title: "Wipe Head",
    arabicTitle: "مسح الرأس",
    description: "Wipe your head once with wet hands from forehead to back of head.",
    imageUrl: "/ablution-wiping-head.png",
    duration: 15,
    tips: [
      "Use wet hands, don't add more water",
      "Start from forehead, move to back",
      "Include the entire head",
      "One time is sufficient",
    ],
  },
  {
    id: 9,
    title: "Wipe Ears",
    arabicTitle: "مسح الأذنين",
    description: "Wipe inside and outside of both ears with the remaining water on your hands.",
    imageUrl: "/ablution-ears.png",
    duration: 15,
    tips: [
      "Use the same water from wiping head",
      "Use index fingers for inside of ears",
      "Use thumbs for behind ears",
      "Be gentle and thorough",
    ],
  },
  {
    id: 10,
    title: "Wash Feet",
    arabicTitle: "غسل القدمين",
    description: "Wash both feet up to the ankles three times, starting with the right foot.",
    imageUrl: "/ablution-foot-washing.png",
    duration: 40,
    tips: [
      "Start with the right foot",
      "Wash between all toes",
      "Include the ankles completely",
      "Use your hands to scrub thoroughly",
    ],
  },
]

export interface UserProgress {
  completedSteps: number[]
  currentStep: number
  totalSessions: number
  lastCompletedDate?: Date
  averageTime: number
}

export const getProgressPercentage = (progress: UserProgress): number => {
  return Math.round((progress.completedSteps.length / ablutionSteps.length) * 100)
}

export const getNextStep = (progress: UserProgress): AblutionStep | null => {
  const nextStepId = progress.currentStep + 1
  return ablutionSteps.find((step) => step.id === nextStepId) || null
}
