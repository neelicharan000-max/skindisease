// SkinAI Food & Nutrition Data

const FOOD_DATA = {
    general: [
        {
            icon: "🐟",
            name: { en: "Omega-3 Rich Fish", te: "ఒమేగా-3 చేపలు", ta: "ஒமேகா-3 மீன்", hi: "ओमेगा-3 मछली" },
            foods: { en: "Salmon, Mackerel, Sardines, Tuna", te: "సాల్మన్, మాకెరెల్, సార్డైన్స్, ట్యూనా", ta: "சால்மன், மக்கரல், சார்டின்ஸ், டூனா", hi: "सैल्मन, मैकेरल, सार्डिन, टूना" },
            benefit: { en: "Reduces inflammation, strengthens skin barrier", te: "వాపు తగ్గిస్తుంది, చర్మ అడ్డంకిని బలపరుస్తుంది", ta: "வீக்கத்தை குறைக்கிறது, தோல் தடையை வலுப்படுத்துகிறது", hi: "सूजन कम करता है, त्वचा की बाधा मजबूत करता है" },
            color: "#0ea5e9"
        },
        {
            icon: "🫐",
            name: { en: "Antioxidant Berries", te: "యాంటీఆక్సిడెంట్ పండ్లు", ta: "ஆக்ஸிஜனேற்ற பெர்ரிகள்", hi: "एंटीऑक्सीडेंट बेरीज" },
            foods: { en: "Blueberries, Strawberries, Amla (Indian Gooseberry)", te: "బ్లూబెర్రీస్, స్ట్రాబెర్రీస్, ఉసిరి", ta: "ப்ளூபெர்ரி, ஸ்ட்ராபெர்ரி, நெல்லிக்காய்", hi: "ब्लूबेरी, स्ट्रॉबेरी, आंवला" },
            benefit: { en: "Fights free radicals, brightens skin, boosts collagen", te: "ఫ్రీ రాడికల్స్‌ను నివారిస్తుంది, చర్మాన్ని ప్రకాశవంతం చేస్తుంది", ta: "ஃப்ரீ ரேடிக்கல்களை எதிர்க்கிறது, சருமத்தை பிரகாசமாக்குகிறது", hi: "मुक्त कणों से लड़ता है, त्वचा को चमकाता है" },
            color: "#7c3aed"
        },
        {
            icon: "🟡",
            name: { en: "Turmeric (Haldi)", te: "పసుపు (హల్దీ)", ta: "மஞ்சள் (ஹல்டி)", hi: "हल्दी" },
            foods: { en: "Turmeric milk, Turmeric with black pepper, Kadha", te: "పసుపు పాలు, పసుపు రొట్టె, కషాయం", ta: "மஞ்சள் பால், மஞ்சள் சப்பாத்தி, கஷாயம்", hi: "हल्दी वाला दूध, काढ़ा, हल्दी की रोटी" },
            benefit: { en: "Powerful anti-inflammatory, antibacterial, wound healing", te: "శక్తివంతమైన యాంటీ-ఇన్ఫ్లమేటరీ, వ్యాధినిరోధక", ta: "சக்திவாய்ந்த அழற்சி எதிர்ப்பு, கிருமி நாசினி", hi: "शक्तिशाली सूजनरोधी, जीवाणुरोधी, घाव भरना" },
            color: "#f59e0b"
        },
        {
            icon: "🥑",
            name: { en: "Vitamin E Foods", te: "విటమిన్ E ఆహారాలు", ta: "வைட்டமின் E உணவுகள்", hi: "विटामिन E खाद्य पदार्थ" },
            foods: { en: "Avocado, Almonds, Sunflower Seeds, Peanuts", te: "అవకాడో, బాదంపప్పు, పొద్దుతిరుగుడు గింజలు", ta: "அவகேடோ, பாதாம், சூரியகாந்தி விதைகள்", hi: "एवोकाडो, बादाम, सूरजमुखी के बीज, मूंगफली" },
            benefit: { en: "UV protection, moisturizes skin naturally, anti-aging", te: "UV రక్షణ, చర్మాన్ని సహజంగా తేమగా ఉంచుతుంది", ta: "UV பாதுகாப்பு, இயற்கையாக சருமத்தை ஈரப்படுத்துகிறது", hi: "UV सुरक्षा, त्वचा को प्राकृतिक रूप से नमी देता है" },
            color: "#10b981"
        },
        {
            icon: "🍋",
            name: { en: "Vitamin C Foods", te: "విటమిన్ C ఆహారాలు", ta: "வைட்டமின் C உணவுகள்", hi: "विटामिन C खाद्य पदार्थ" },
            foods: { en: "Lemons, Oranges, Bell Peppers, Guava, Amla", te: "నిమ్మకాయలు, నారంగులు, గుమ్మడికాయ, జామ, ఉసిరి", ta: "எலுமிச்சை, ஆரஞ்சு, குடைமிளகாய், கொய்யா, நெல்லி", hi: "नींबू, संतरा, शिमला मिर्च, अमरूद, आंवला" },
            benefit: { en: "Boosts collagen production, brightens skin tone", te: "కొల్లాజెన్ ఉత్పత్తిని పెంచుతుంది, చర్మ వర్ణాన్ని ప్రకాశవంతం చేస్తుంది", ta: "கொலாஜன் உற்பத்தியை அதிகரிக்கிறது, சருமத்தை பிரகாசமாக்குகிறது", hi: "कोलेजन उत्पादन बढ़ाता है, त्वचा की रंगत निखारता है" },
            color: "#f59e0b"
        },
        {
            icon: "🥦",
            name: { en: "Green Vegetables", te: "పచ్చి కూరగాయలు", ta: "பச்சை காய்கறிகள்", hi: "हरी सब्जियां" },
            foods: { en: "Spinach, Broccoli, Methi (Fenugreek), Drumstick leaves", te: "పాలకూర, బ్రోకలీ, మేంతికూర, మునగాకు", ta: "கீரை, ப்ரோக்கோலி, வெந்தயக் கீரை, முருங்கை கீரை", hi: "पालक, ब्रोकली, मेथी, सहजन के पत्ते" },
            benefit: { en: "Rich in vitamins A, C, K — essential for healthy skin cell renewal", te: "విటమిన్ A, C, K తో నిండినవి — ఆరోగ్యకరమైన చర్మ కణాల పునరుద్ధరణకు అవసరం", ta: "வைட்டமின்கள் A, C, K நிறைந்தவை", hi: "विटामिन A, C, K से भरपूर — स्वस्थ त्वचा नवीनीकरण के लिए आवश्यक" },
            color: "#10b981"
        },
        {
            icon: "🥛",
            name: { en: "Probiotics & Fermented", te: "ప్రోబయోటిక్స్ & పులిసిన ఆహారాలు", ta: "புரோபயோடிக்ஸ் & நொதிக்கழிக்கப்பட்டவை", hi: "प्रोबायोटिक्स और किण्वित भोजन" },
            foods: { en: "Curd (Dahi), Buttermilk, Idli, Dosa, Kanji", te: "పెరుగు (దహి), మజ్జిగ, ఇడ్లీ, దోసె, గంజి", ta: "தயிர், மோர், இட்லி, தோசை, கஞ்சி", hi: "दही, छाछ, इडली, डोसा, कांजी" },
            benefit: { en: "Improves gut-skin axis, reduces inflammatory skin conditions", te: "గట్-స్కిన్ అక్షాన్ని మెరుగుపరుస్తుంది, వాపు చర్మ పరిస్థితులను తగ్గిస్తుంది", ta: "குடல்-தோல் அச்சுதண்டை மேம்படுத்துகிறது", hi: "आंत-त्वचा धुरी में सुधार करता है, सूजन संबंधी स्थितियों को कम करता है" },
            color: "#a855f7"
        },
        {
            icon: "🫚",
            name: { en: "Zinc-Rich Foods", te: "జింక్-సమృద్ధ ఆహారాలు", ta: "துத்தநாக நிறைந்த உணவுகள்", hi: "जिंक युक्त खाद्य पदार्थ" },
            foods: { en: "Pumpkin seeds, Chickpeas, Lentils, Oysters, Hemp seeds", te: "గుమ్మడి గింజలు, పల్లీలు, కంది పప్పు", ta: "பூசணிக்காய் விதைகள், கொண்டக்கடலை, மசூர் பருப்பு", hi: "कद्दू के बीज, चने, मसूर दाल" },
            benefit: { en: "Wound healing, reduces acne, supports DNA repair in skin cells", te: "గాయాలు నయమవుతాయి, మొటిమలు తగ్గుతాయి", ta: "காயம் குணப்படுத்தல், முகப்பரு குறைக்கிறது", hi: "घाव भरना, मुंहासे कम करना, त्वचा कोशिकाओं में DNA मरम्मत" },
            color: "#ef4444"
        }
    ],

    disease: [
        {
            id: "melanoma",
            icon: "🔴",
            nameKey: "melanoma",
            color: "#ef4444",
            avoid: { en: "Processed meats, Alcohol, Sugary drinks, Trans fats", te: "ప్రాసెస్డ్ మాంసం, మద్యం, చక్కెర పానీయాలు", ta: "பதப்படுத்தப்பட்ட இறைச்சி, ஆல்கஹால், சர்க்கரை பానங்கள்", hi: "प्रसंस्कृत मांस, शराब, मीठे पेय" },
            eat: { en: "Lycopene (tomatoes), Green Tea, Broccoli, Carrots, Selenium-rich Brazil nuts", te: "లైకోపీన్ (టమోటాలు), గ్రీన్ టీ, బ్రోకలీ, క్యారెట్లు", ta: "லைகோபீன் (தக்காளி), க்ரீன் டீ, ப்ரோக்கோலி, கேரட்", hi: "लाइकोपीन (टमाटर), ग्रीन टी, ब्रोकली, गाजर, ब्राजील नट्स" }
        },
        {
            id: "acne",
            icon: "🟠",
            nameKey: "acne",
            color: "#f97316",
            avoid: { en: "Dairy products, High-glycemic foods, Junk food, Oily snacks, Refined sugar", te: "పాల ఉత్పత్తులు, అధిక-గ్లైసెమిక్ ఆహారాలు, జంక్ ఫుడ్", ta: "பால் பொருட்கள், அதிக கிளைசெமிக் உணவுகள், குப்பை உணவு", hi: "डेयरी उत्पाद, उच्च-ग्लाइसेमिक खाद्य पदार्थ, जंक फूड" },
            eat: { en: "Zinc (pumpkin seeds), Omega-3, Green tea, Probiotics (curd/dahi), Spearmint tea", te: "జింక్ (గుమ్మడి గింజలు), ఒమేగా-3, గ్రీన్ టీ, పెరుగు", ta: "துத்தநாக (பூசணி விதைகள்), ஒமேகா-3, க்ரீன் டீ, தயிர்", hi: "जिंक (कद्दू के बीज), ओमेगा-3, ग्रीन टी, दही" }
        },
        {
            id: "eczema",
            icon: "🟤",
            nameKey: "eczema",
            color: "#a78bfa",
            avoid: { en: "Gluten, Dairy, Eggs (if allergic), Processed foods, Nickel-rich foods", te: "గ్లూటెన్, పాలు, గుడ్లు (అలర్జీ ఉంటే), ప్రాసెస్డ్ ఆహారాలు", ta: "க்ளூட்டன், பால், முட்டை (ஒவ்வாமை இருந்தால்), பதப்படுத்தப்பட்ட உணவுகள்", hi: "ग्लूटेन, डेयरी, अंडे (एलर्जी हो तो), प्रसंस्कृत भोजन" },
            eat: { en: "Fatty fish, Turmeric, Quercetin foods (onions, apples), Probiotics, Vitamin D", te: "కొవ్వు చేపలు, పసుపు, క్వెర్సిటిన్ ఆహారాలు (ఉల్లిపాయలు, యాపిల్స్)", ta: "கொழுப்பு மீன், மஞ்சள், க்வார்செடின் உணவுகள் (வெங்காயம், ஆப்பிள்)", hi: "वसायुक्त मछली, हल्दी, क्वेरसेटिन युक्त खाद्य पदार्थ (प्याज, सेब)" }
        },
        {
            id: "psoriasis",
            icon: "🔵",
            nameKey: "psoriasis",
            color: "#0ea5e9",
            avoid: { en: "Red meat, Alcohol, Refined carbs, Nightshade vegetables (for some), Dairy", te: "ఎర్ర మాంసం, మద్యం, రిఫైన్డ్ కార్బ్స్, పాలు", ta: "சிவப்பு இறைச்சி, ஆல்கஹால், சுத்திகரிக்கப்பட்ட கார்ப்ஸ்", hi: "लाल मांस, शराब, रिफाइंड कार्बोहाइड्रेट, डेयरी" },
            eat: { en: "Colorful fruits & veggies, Fatty fish, Olive oil, Turmeric-ginger combo, Brazil nuts", te: "రంగురంగుల పండ్లు & కూరగాయలు, కొవ్వు చేపలు, ఆలివ్ నూనె, పసుపు-అల్లం", ta: "வண்ணமயமான பழங்கள் & காய்கறிகள், கொழுப்பு மீன், ஆலிவ் எண்ணெய்", hi: "रंग बिरंगे फल और सब्जियां, वसायुक्त मछली, जैतून का तेल, हल्दी-अदरक" }
        },
        {
            id: "rosacea",
            icon: "🌸",
            nameKey: "rosacea",
            color: "#f43f5e",
            avoid: { en: "Spicy foods, Hot beverages, Alcohol (especially red wine), Histamine-rich foods", te: "కారమైన ఆహారాలు, వేడి పానీయాలు, మద్యం, హిస్టమిన్-నిండిన ఆహారాలు", ta: "காரமான உணவுகள், சூடான பானங்கள், ஆல்கஹால்", hi: "मसालेदार खाना, गर्म पेय, शराब (विशेषकर रेड वाइन)" },
            eat: { en: "Cooling foods (cucumber, watermelon), Omega-3, Green tea, Zinc foods, Probiotics", te: "శీతలీకరణ ఆహారాలు (దోసకాయ, పుచ్చకాయ), ఒమేగా-3, గ్రీన్ టీ", ta: "குளிர்ச்சியான உணவுகள் (வெள்ளரி, தர்பூசணி), ஒமேகா-3", hi: "ठंडक देने वाले खाद्य पदार्थ (खीरा, तरबूज), ओमेगा-3, ग्रीन टी" }
        },
        {
            id: "bcc",
            icon: "🟡",
            nameKey: "bcc",
            color: "#f59e0b",
            avoid: { en: "Alcohol, Processed meats, Refined sugars, Fast food", te: "మద్యం, ప్రాసెస్డ్ మాంసం, రిఫైన్డ్ చక్కెరలు", ta: "ஆல்கஹால், பதப்படுத்தப்பட்ட இறைச்சி, சுத்திகரிக்கப்பட்ட சர்க்கரைகள்", hi: "शराब, प्रसंस्कृत मांस, रिफाइंड शर्करा" },
            eat: { en: "Lycopene (tomatoes, watermelon), Green leafy vegetables, Antioxidants, Vitamin D (sunlight + diet)", te: "లైకోపీన్ (టమోటాలు, పుచ్చకాయ), పచ్చి ఆకు కూరలు, యాంటీఆక్సిడెంట్లు", ta: "லைகோபீன் (தக்காளி, தர்பூசணி), பச்சை இலை காய்கறிகள்", hi: "लाइकोपीन (टमाटर, तरबूज), हरी पत्तेदार सब्जियां, एंटीऑक्सीडेंट" }
        }
    ],

    avoidGeneral: {
        en: "Foods to Avoid for Better Skin",
        te: "మంచి చర్మం కోసం నివారించాల్సిన ఆహారాలు",
        ta: "சிறந்த தோலுக்காக தவிர்க்க வேண்டிய உணவுகள்",
        hi: "बेहतर त्वचा के लिए परहेज करें"
    }
};

window.FOOD_DATA = FOOD_DATA;
