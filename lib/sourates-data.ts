export interface Sourate {
  id: number
  name: string
  arabicName: string
  verses: number
  category: "short" | "medium" | "long"
  audio?: string
  text: {
    arabic: string
    transliteration: string
    translation: string
  }
}

export const sourates: Sourate[] = [
  {
    id: 1,
    name: "Al-Fatiha",
    arabicName: "الفاتحة",
    verses: 7,
    category: "short",
    text: {
      arabic:
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَٰنِ الرَّحِيمِ مَالِكِ يَوْمِ الدِّينِ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      transliteration:
        "Bismillahi Rahmanir Raheem. Alhamdu lillahi rabbil alameen. Ar-Rahmanir Raheem. Maliki yawmid deen. Iyyaka na'budu wa iyyaka nasta'een. Ihdinassiratal mustaqeem. Siratal lazeena an'amta alayhim ghayril maghdoobi alayhim wa lad daaleen.",
      translation:
        "In the name of Allah, the Most Gracious, the Most Merciful. Praise be to Allah, Lord of all the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those You have blessed, not of those who have incurred Your wrath, nor of those who have gone astray.",
    },
  },
  {
    id: 112,
    name: "Al-Ikhlas",
    arabicName: "الإخلاص",
    verses: 4,
    category: "short",
    text: {
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      transliteration: "Qul huwa Allahu ahad. Allahu samad. Lam yalid wa lam yoolad. Wa lam yakun lahu kufuwan ahad.",
      translation:
        "Say: He is Allah, the One! Allah, the Eternal, Absolute. He begets not, nor is He begotten. And there is none like unto Him.",
    },
  },
  {
    id: 113,
    name: "Al-Falaq",
    arabicName: "الفلق",
    verses: 5,
    category: "short",
    text: {
      arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِن شَرِّ مَا خَلَقَ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
      transliteration:
        "Qul a'oodhu birabbi falaq. Min sharri ma khalaq. Wa min sharri ghasiqin itha waqab. Wa min sharrin naffathati fil uqad. Wa min sharri hasidin itha hasad.",
      translation:
        "Say: I seek refuge with the Lord of the Dawn. From the mischief of created things. From the mischief of Darkness as it overspreads. From the mischief of those who practice secret arts. And from the mischief of the envious one as he practices envy.",
    },
  },
  {
    id: 114,
    name: "An-Nas",
    arabicName: "الناس",
    verses: 6,
    category: "short",
    text: {
      arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ",
      transliteration:
        "Qul a'oodhu birabbi nas. Maliki nas. Ilahi nas. Min sharril waswasil khannas. Allathee yuwaswisu fee sudoorin nas. Minal jinnati wan nas.",
      translation:
        "Say: I seek refuge with the Lord and Cherisher of Mankind. The King (or Ruler) of Mankind. The God (or Judge) of Mankind. From the mischief of the Whisperer (of Evil), who withdraws (after his whisper). (The same) who whispers into the hearts of Mankind. Among Jinns and among men.",
    },
  },
  {
    id: 110,
    name: "An-Nasr",
    arabicName: "النصر",
    verses: 3,
    category: "short",
    text: {
      arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا",
      transliteration:
        "Itha jaa nasrullahi wal fath. Wa ra'aytan nasa yadkhuloona fee deenil lahi afwaja. Fasabbih bihamdi rabbika wastaghfirh. Innahu kana tawwaba.",
      translation:
        "When the victory of Allah has come and the conquest, And you see the people entering into the religion of Allah in multitudes, Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance.",
    },
  },
  {
    id: 108,
    name: "Al-Kawthar",
    arabicName: "الكوثر",
    verses: 3,
    category: "short",
    text: {
      arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ فَصَلِّ لِرَبِّكَ وَانْحَرْ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
      transliteration: "Inna a'taynaka al kawthar. Fasalli li rabbika wanhar. Inna shani'aka huwal abtar.",
      translation:
        "To thee have We granted the Fount (of Abundance). Therefore to thy Lord turn in Prayer and Sacrifice. For he who hateth thee, he will be cut off (from Future Hope).",
    },
  },
]

export interface PrayerPlaylist {
  id: string
  prayerName: string
  arabicName: string
  sourates: {
    rakahNumber: number
    sourate: Sourate
    isCustom?: boolean
  }[]
}

export const defaultPlaylists: PrayerPlaylist[] = [
  {
    id: "fajr",
    prayerName: "Fajr",
    arabicName: "الفجر",
    sourates: [
      { rakahNumber: 1, sourate: sourates[0] }, // Al-Fatiha
      { rakahNumber: 1, sourate: sourates[1] }, // Al-Ikhlas
      { rakahNumber: 2, sourate: sourates[0] }, // Al-Fatiha
      { rakahNumber: 2, sourate: sourates[2] }, // Al-Falaq
    ],
  },
  {
    id: "dhuhr",
    prayerName: "Dhuhr",
    arabicName: "الظهر",
    sourates: [
      { rakahNumber: 1, sourate: sourates[0] }, // Al-Fatiha
      { rakahNumber: 1, sourate: sourates[1] }, // Al-Ikhlas
      { rakahNumber: 2, sourate: sourates[0] }, // Al-Fatiha
      { rakahNumber: 2, sourate: sourates[2] }, // Al-Falaq
      { rakahNumber: 3, sourate: sourates[0] }, // Al-Fatiha (silent)
      { rakahNumber: 4, sourate: sourates[0] }, // Al-Fatiha (silent)
    ],
  },
  {
    id: "asr",
    prayerName: "Asr",
    arabicName: "العصر",
    sourates: [
      { rakahNumber: 1, sourate: sourates[0] }, // Al-Fatiha
      { rakahNumber: 1, sourate: sourates[3] }, // An-Nas
      { rakahNumber: 2, sourate: sourates[0] }, // Al-Fatiha
      { rakahNumber: 2, sourate: sourates[4] }, // An-Nasr
      { rakahNumber: 3, sourate: sourates[0] }, // Al-Fatiha (silent)
      { rakahNumber: 4, sourate: sourates[0] }, // Al-Fatiha (silent)
    ],
  },
  {
    id: "maghrib",
    prayerName: "Maghrib",
    arabicName: "المغرب",
    sourates: [
      { rakahNumber: 1, sourate: sourates[0] }, // Al-Fatiha
      { rakahNumber: 1, sourate: sourates[5] }, // Al-Kawthar
      { rakahNumber: 2, sourate: sourates[0] }, // Al-Fatiha
      { rakahNumber: 2, sourate: sourates[1] }, // Al-Ikhlas
      { rakahNumber: 3, sourate: sourates[0] }, // Al-Fatiha (silent)
    ],
  },
  {
    id: "isha",
    prayerName: "Isha",
    arabicName: "العشاء",
    sourates: [
      { rakahNumber: 1, sourate: sourates[0] }, // Al-Fatiha
      { rakahNumber: 1, sourate: sourates[2] }, // Al-Falaq
      { rakahNumber: 2, sourate: sourates[0] }, // Al-Fatiha
      { rakahNumber: 2, sourate: sourates[3] }, // An-Nas
      { rakahNumber: 3, sourate: sourates[0] }, // Al-Fatiha (silent)
      { rakahNumber: 4, sourate: sourates[0] }, // Al-Fatiha (silent)
    ],
  },
]
