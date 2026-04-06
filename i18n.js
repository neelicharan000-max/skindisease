// SkinAI - Internationalization (i18n) Module
const TRANSLATIONS = {
    en: {
        // Login
        brandTagline: "Transparent Diagnosis",
        heroTitle: "AI-Powered Skin Disease Detection",
        heroDesc: "Using Convolutional Neural Networks and Grad-CAM visualization for accurate, explainable, and trustworthy dermatological diagnosis.",
        welcomeBack: "Welcome Back",
        signInSubtitle: "Sign in to access the SkinAI diagnostic platform",
        signIn: "Sign In", register: "Register",
        emailLabel: "Email Address", emailPlaceholder: "Enter your email",
        mobileLabel: "Mobile Number", mobilePlaceholder: "+91 XXXXX XXXXX",
        passwordLabel: "Password", passwordPlaceholder: "Enter your password",
        rememberMe: "Remember me", forgotPassword: "Forgot password?",
        signInBtn: "Sign In", createAccount: "Create Account",
        fullName: "Full Name", roleLabel: "Role",
        // Nav
        navDetect: "Detection", navResults: "Results",
        navHistory: "History", navInfo: "Diseases Info",
        navMetrics: "Model Metrics", navFood: "Food & Nutrition",
        // Detection
        imageInput: "Image Input", uploadImage: "Upload Image",
        liveCamera: "Live Camera", dropTitle: "Drop skin lesion image here",
        dropSub: "or click to browse your files",
        analyzeBtn: "Analyze Image", analyzingBtn: "Analyzing...",
        modelReady: "Model Ready",
        // Processing
        ps1: "Preprocessing image", ps2: "Extracting features via CNN",
        ps3: "Running classification", ps4: "Generating Grad-CAM heatmap",
        ps5: "Preparing results",
        // Results
        allPredictions: "All Predictions", gradcamTitle: "Grad-CAM Heatmap",
        confidenceLabel: "Confidence", riskLevel: "Risk Level",
        viewFullReport: "View Full Report →",
        // Food section
        foodTitle: "Food & Nutrition Guide",
        foodSubtitle: "Diet recommendations to prevent and manage skin diseases",
        foodGeneral: "General Skin Health Foods",
        foodDisease: "Disease-Specific Diet",
        // Diseases
        melanoma: "Melanoma", bcc: "Basal Cell Carcinoma",
        scc: "Squamous Cell Carcinoma", acne: "Acne Vulgaris",
        eczema: "Eczema (Atopic Dermatitis)", psoriasis: "Psoriasis",
        rosacea: "Rosacea", normal: "Normal Skin",
    },

    te: {
        brandTagline: "పారదర్శక రోగనిర్ధారణ",
        heroTitle: "AI-ఆధారిత చర్మ వ్యాధి గుర్తింపు",
        heroDesc: "CNN మరియు Grad-CAM దృశ్యీకరణ ద్వారా ఖచ్చితమైన, వివరణాత్మక చర్మవ్యాధి నిర్ధారణ.",
        welcomeBack: "స్వాగతం",
        signInSubtitle: "SkinAI డయాగ్నోస్టిక్ ప్లాట్‌ఫారమ్‌లోకి సైన్ ఇన్ చేయండి",
        signIn: "సైన్ ఇన్", register: "నమోదు చేసుకోండి",
        emailLabel: "ఇమెయిల్ చిరునామా", emailPlaceholder: "మీ ఇమెయిల్ నమోదు చేయండి",
        mobileLabel: "మొబైల్ నంబర్", mobilePlaceholder: "+91 XXXXX XXXXX",
        passwordLabel: "పాస్‌వర్డ్", passwordPlaceholder: "మీ పాస్‌వర్డ్ నమోదు చేయండి",
        rememberMe: "నన్ను గుర్తుంచుకో", forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
        signInBtn: "సైన్ ఇన్", createAccount: "ఖాతా తెరవండి",
        fullName: "పూర్తి పేరు", roleLabel: "పాత్ర",
        navDetect: "గుర్తింపు", navResults: "ఫలితాలు",
        navHistory: "చరిత్ర", navInfo: "వ్యాధుల సమాచారం",
        navMetrics: "నమూనా మెట్రిక్స్", navFood: "ఆహారం & పోషణ",
        imageInput: "చిత్రం ఇన్‌పుట్", uploadImage: "చిత్రం అప్‌లోడ్",
        liveCamera: "లైవ్ కెమెరా", dropTitle: "చర్మ చిత్రాన్ని ఇక్కడ వదలండి",
        dropSub: "లేదా ఫైల్‌లు బ్రౌజ్ చేయడానికి క్లిక్ చేయండి",
        analyzeBtn: "చిత్రాన్ని విశ్లేషించు", analyzingBtn: "విశ్లేషిస్తున్నాం...",
        modelReady: "నమూనా సిద్ధంగా ఉంది",
        ps1: "చిత్రం ప్రీప్రాసెస్", ps2: "CNN ద్వారా లక్షణాలు వేరు చేయడం",
        ps3: "వర్గీకరణ అమలు", ps4: "Grad-CAM హీట్‌మ్యాప్ రూపొందించడం",
        ps5: "ఫలితాలు సిద్ధం చేయడం",
        allPredictions: "అన్ని అంచనాలు", gradcamTitle: "Grad-CAM హీట్‌మ్యాప్",
        confidenceLabel: "విశ్వాసం", riskLevel: "ప్రమాద స్థాయి",
        viewFullReport: "పూర్తి నివేదిక చూడండి →",
        foodTitle: "ఆహారం & పోషణ మార్గదర్శి",
        foodSubtitle: "చర్మ వ్యాధులను నివారించడానికి ఆహార సిఫార్సులు",
        foodGeneral: "సాధారణ చర్మ ఆరోగ్య ఆహారాలు",
        foodDisease: "వ్యాధి-నిర్దిష్ట ఆహారం",
        melanoma: "మెలనోమా", bcc: "బేసల్ సెల్ కార్సినోమా",
        scc: "స్క్వామస్ సెల్ కార్సినోమా", acne: "మొటిమలు",
        eczema: "ఎగ్జిమా", psoriasis: "సోరియాసిస్",
        rosacea: "రోసేషియా", normal: "ఆరోగ్యకరమైన చర్మం",
    },

    ta: {
        brandTagline: "வெளிப்படையான நோய் கண்டறிதல்",
        heroTitle: "AI-இயக்கும் தோல் நோய் கண்டறிதல்",
        heroDesc: "CNN மற்றும் Grad-CAM காட்சியமைப்பு மூலம் துல்லியமான, விளக்கமான தோல் நோய் கண்டறிதல்.",
        welcomeBack: "மீண்டும் வரவேற்கிறோம்",
        signInSubtitle: "SkinAI தளத்தில் உள்நுழையவும்",
        signIn: "உள்நுழைவு", register: "பதிவு செய்க",
        emailLabel: "மின்னஞ்சல் முகவரி", emailPlaceholder: "உங்கள் மின்னஞ்சல் உள்ளிடவும்",
        mobileLabel: "கைபேசி எண்", mobilePlaceholder: "+91 XXXXX XXXXX",
        passwordLabel: "கடவுச்சொல்", passwordPlaceholder: "கடவுச்சொல் உள்ளிடவும்",
        rememberMe: "என்னை நினைவில் கொள்", forgotPassword: "கடவுச்சொல் மறந்தீர்களா?",
        signInBtn: "உள்நுழைவு", createAccount: "கணக்கு உருவாக்கு",
        fullName: "முழு பெயர்", roleLabel: "பங்கு",
        navDetect: "கண்டறிதல்", navResults: "முடிவுகள்",
        navHistory: "வரலாறு", navInfo: "நோய் தகவல்",
        navMetrics: "மாதிரி அளவீடுகள்", navFood: "உணவு & ஊட்டச்சத்து",
        imageInput: "படம் உள்ளீடு", uploadImage: "படம் பதிவேற்று",
        liveCamera: "நேரடி கேமரா", dropTitle: "தோல் படத்தை இங்கே இழுக்கவும்",
        dropSub: "அல்லது கோப்புகளை உலாவ கிளிக் செய்யவும்",
        analyzeBtn: "படத்தை பகுப்பாய்வு செய்", analyzingBtn: "பகுப்பாய்வு செய்கிறோம்...",
        modelReady: "மாதிரி தயாராக உள்ளது",
        ps1: "படம் முன்செயலாக்கம்", ps2: "CNN மூலம் அம்சங்கள் பிரித்தெடுத்தல்",
        ps3: "வகைப்படுத்தல் இயக்கம்", ps4: "Grad-CAM வெப்பவரைபடம் உருவாக்கம்",
        ps5: "முடிவுகள் தயாரிக்கப்படுகின்றன",
        allPredictions: "அனைத்து கணிப்புகளும்", gradcamTitle: "Grad-CAM வெப்பவரைபடம்",
        confidenceLabel: "நம்பிக்கை", riskLevel: "ஆபத்து நிலை",
        viewFullReport: "முழு அறிக்கை காண →",
        foodTitle: "உணவு & ஊட்டச்சத்து வழிகாட்டி",
        foodSubtitle: "தோல் நோய்களை தடுக்க உணவு பரிந்துரைகள்",
        foodGeneral: "பொது தோல் ஆரோக்கிய உணவுகள்",
        foodDisease: "நோய்-குறிப்பிட்ட உணவுமுறை",
        melanoma: "மெலனோமா", bcc: "பேசல் செல் கார்சினோமா",
        scc: "ஸ்கொவாமஸ் செல் கார்சினோமா", acne: "முகப்பரு",
        eczema: "எக்ஸிமா", psoriasis: "சொரியாசிஸ்",
        rosacea: "ரோசேஷியா", normal: "ஆரோக்கியமான தோல்",
    },

    hi: {
        brandTagline: "पारदर्शी निदान",
        heroTitle: "AI-संचालित त्वचा रोग पहचान",
        heroDesc: "CNN और Grad-CAM विज़ुअलाइज़ेशन का उपयोग करके सटीक, व्याख्यात्मक त्वचा रोग निदान।",
        welcomeBack: "वापसी पर स्वागत है",
        signInSubtitle: "SkinAI डायग्नोस्टिक प्लेटफ़ॉर्म में साइन इन करें",
        signIn: "साइन इन", register: "पंजीकरण",
        emailLabel: "ईमेल पता", emailPlaceholder: "अपना ईमेल दर्ज करें",
        mobileLabel: "मोबाइल नंबर", mobilePlaceholder: "+91 XXXXX XXXXX",
        passwordLabel: "पासवर्ड", passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
        rememberMe: "मुझे याद रखें", forgotPassword: "पासवर्ड भूल गए?",
        signInBtn: "साइन इन", createAccount: "खाता बनाएं",
        fullName: "पूरा नाम", roleLabel: "भूमिका",
        navDetect: "पहचान", navResults: "परिणाम",
        navHistory: "इतिहास", navInfo: "रोग जानकारी",
        navMetrics: "मॉडल मेट्रिक्स", navFood: "भोजन और पोषण",
        imageInput: "छवि इनपुट", uploadImage: "छवि अपलोड",
        liveCamera: "लाइव कैमरा", dropTitle: "त्वचा छवि यहाँ छोड़ें",
        dropSub: "या फ़ाइलें ब्राउज़ करने के लिए क्लिक करें",
        analyzeBtn: "छवि का विश्लेषण करें", analyzingBtn: "विश्लेषण हो रहा है...",
        modelReady: "मॉडल तैयार है",
        ps1: "छवि प्री-प्रोसेसिंग", ps2: "CNN द्वारा विशेषताएं निकालना",
        ps3: "वर्गीकरण चला रहे हैं", ps4: "Grad-CAM हीटमैप बना रहे हैं",
        ps5: "परिणाम तैयार हो रहे हैं",
        allPredictions: "सभी अनुमान", gradcamTitle: "Grad-CAM हीटमैप",
        confidenceLabel: "विश्वास", riskLevel: "जोखिम स्तर",
        viewFullReport: "पूरी रिपोर्ट देखें →",
        foodTitle: "भोजन और पोषण मार्गदर्शिका",
        foodSubtitle: "त्वचा रोगों को रोकने के लिए आहार सिफारिशें",
        foodGeneral: "सामान्य त्वचा स्वास्थ्य आहार",
        foodDisease: "रोग-विशिष्ट आहार",
        melanoma: "मेलनोमा", bcc: "बेसल सेल कार्सिनोमा",
        scc: "स्क्वामस सेल कार्सिनोमा", acne: "मुंहासे",
        eczema: "एक्जिमा", psoriasis: "सोरायसिस",
        rosacea: "रोसेशिया", normal: "स्वस्थ त्वचा",
    }
};

let currentLang = localStorage.getItem('skinai_lang') || 'en';

function t(key) {
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('skinai_lang', lang);
    applyTranslations();
    // Update active flag
    document.querySelectorAll('.lang-option').forEach(el => {
        el.classList.toggle('active', el.dataset.lang === lang);
    });
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const attr = el.getAttribute('data-i18n-attr');
        if (attr) el.setAttribute(attr, t(key));
        else el.textContent = t(key);
    });
}

window.t = t;
window.setLanguage = setLanguage;
window.applyTranslations = applyTranslations;
window.currentLang = () => currentLang;

// Dashboard Language Switcher Helpers
function toggleDashLang() {
    const m = document.getElementById('dashLangMenu');
    m.style.display = m.style.display === 'none' ? 'flex' : 'none';
}
function selectDashLang(lang, label) {
    document.getElementById('dashLangLabel').textContent = label;
    document.getElementById('dashLangMenu').style.display = 'none';
    setLanguage(lang);
}
window.toggleDashLang = toggleDashLang;
window.selectDashLang = selectDashLang;

document.addEventListener('click', (e) => {
    const switcher = document.getElementById('dashLangSwitcher');
    if (switcher && !switcher.contains(e.target)) {
        const menu = document.getElementById('dashLangMenu');
        if (menu) menu.style.display = 'none';
    }
});
