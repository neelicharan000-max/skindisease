// SkinAI Disease Database — with Medication, Precautions & Food

const DISEASES = [
    {
        id: 'melanoma',
        name: 'Melanoma',
        risk: 'High', riskColor: '#ef4444', riskBg: 'rgba(239,68,68,0.12)',
        accuracy: 96.8, barColor: '#ef4444',
        desc: 'A serious form of skin cancer that begins in the melanocytes. May appear as a new spot or develop in an existing mole.',
        symptoms: ['Asymmetric shape', 'Irregular border', 'Multiple colors', 'Diameter >6mm', 'Evolving appearance'],
        treatment: 'Surgical excision, immunotherapy, targeted therapy',
        medication: [
            '🔬 Immunotherapy: Pembrolizumab (Keytruda), Nivolumab',
            '💊 Targeted: BRAF/MEK inhibitors (Vemurafenib, Dabrafenib)',
            '🧴 Topical: Imiquimod cream (early stages)',
            '☀️ SPF 50+ sunscreen daily (mandatory)'
        ],
        precautions: [
            'Avoid all UV exposure — use SPF 50+ sunscreen every day',
            'Wear UPF-rated clothing, hats, and UV-blocking sunglasses',
            'Monthly self skin-examination using ABCDE rule',
            'Visit dermatologist every 3–6 months for professional screening',
            'No tanning beds or prolonged sun exposure ever',
            'Keep lesion protected from friction or trauma'
        ]
    },
    {
        id: 'bcc',
        name: 'Basal Cell Carcinoma',
        risk: 'Medium', riskColor: '#f59e0b', riskBg: 'rgba(245,158,11,0.12)',
        accuracy: 97.2, barColor: '#f59e0b',
        desc: 'Most common skin cancer. Rarely spreads but causes local destruction if untreated. Appears as a pearly translucent bump.',
        symptoms: ['Pearly bump', 'Flat flesh-colored lesion', 'Bleeding/scabbing sore', 'Pink growth', 'Scar-like lesion'],
        treatment: 'Mohs surgery, radiation, topical medications',
        medication: [
            '🧴 Topical: Imiquimod 5% cream or 5-Fluorouracil cream',
            '💊 Oral: Vismodegib (Erivedge) for advanced cases',
            '🔬 PDT: Photodynamic therapy (aminolevulinic acid)',
            '☀️ Broad-spectrum SPF 50+ sunscreen (daily)'
        ],
        precautions: [
            'Limit sun exposure, especially between 10 AM – 4 PM',
            'Apply sunscreen 30 minutes before going outdoors',
            'Wear wide-brimmed hats and protective clothing',
            'Annual skin check with a certified dermatologist',
            'Do not pick or scratch the lesion',
            'Check the lesion monthly for size/color changes'
        ]
    },
    {
        id: 'scc',
        name: 'Squamous Cell Carcinoma',
        risk: 'High', riskColor: '#ef4444', riskBg: 'rgba(239,68,68,0.12)',
        accuracy: 95.5, barColor: '#ef4444',
        desc: 'Second most common skin cancer. May metastasize. Commonly appears on sun-exposed areas of skin.',
        symptoms: ['Firm red nodule', 'Flat scaly lesion', 'New sore on scar tissue', 'Rough patch in mouth', 'Wart-like growth'],
        treatment: 'Excision, Mohs surgery, chemotherapy',
        medication: [
            '💊 Cetuximab (for advanced/metastatic SCC)',
            '🧴 Topical 5-Fluorouracil or Diclofenac gel',
            '🔬 Systemic chemotherapy: Cisplatin + 5-FU',
            '☀️ SPF 50+ daily and vitamin D supplementation'
        ],
        precautions: [
            'Seek immediate medical care — this condition can spread',
            'Never attempt home treatment; see an oncologist',
            'Avoid all sources of UV radiation completely',
            'Protect wound from infection (keep clean and covered)',
            'Report any new lumps or swollen lymph nodes immediately',
            'Bi-annual cancer screening after treatment'
        ]
    },
    {
        id: 'acne',
        name: 'Acne Vulgaris',
        risk: 'Low', riskColor: '#10b981', riskBg: 'rgba(16,185,129,0.12)',
        accuracy: 98.1, barColor: '#10b981',
        desc: 'A chronic inflammatory condition causing pimples, blackheads, whiteheads and cysts. Most common in adolescents.',
        symptoms: ['Whiteheads', 'Blackheads', 'Papules', 'Pustules', 'Cysts'],
        treatment: 'Topical retinoids, antibiotics, benzoyl peroxide',
        medication: [
            '🧴 Topical: Benzoyl peroxide 2.5–10%, Salicylic acid',
            '💊 Oral antibiotics: Doxycycline or Minocycline (short-term)',
            '🌿 Retinoid: Adapalene gel (Differin) or Tretinoin',
            '💊 Severe cystic acne: Isotretinoin (Accutane) — doctor supervised'
        ],
        precautions: [
            'Wash face twice daily with gentle non-comedogenic cleanser',
            'Never squeeze or pop pimples (causes scarring)',
            'Use oil-free, non-comedogenic moisturizer and makeup',
            'Change pillowcase every 2–3 days',
            'Avoid touching your face throughout the day',
            'Drink plenty of water (min. 2–3 litres/day)'
        ]
    },
    {
        id: 'eczema',
        name: 'Eczema (Atopic Dermatitis)',
        risk: 'Low', riskColor: '#10b981', riskBg: 'rgba(16,185,129,0.12)',
        accuracy: 96.3, barColor: '#10b981',
        desc: 'A chronic condition causing red, itchy skin. Associated with allergies and asthma. Can occur at any age.',
        symptoms: ['Dry skin', 'Intense itching', 'Red patches', 'Small raised bumps', 'Thickened skin'],
        treatment: 'Moisturizers, corticosteroids, immunosuppressants',
        medication: [
            '🧴 Topical corticosteroids: Hydrocortisone or Betamethasone',
            '💊 PDE4 inhibitor: Crisaborole (Eucrisia) ointment',
            '💉 Biologic: Dupilumab (Dupixent) for moderate–severe',
            '💊 Oral antihistamines (Cetirizine) to reduce itching'
        ],
        precautions: [
            'Moisturise at least twice daily with fragrance-free cream',
            'Identify and avoid personal triggers (pets, pollen, dust)',
            'Wear loose, soft cotton clothing — avoid synthetic fabrics',
            'Keep room humidity at 45–55% using a humidifier',
            'Use lukewarm (not hot) water for baths/showers',
            'Avoid scented soaps, detergents, and fabric softeners'
        ]
    },
    {
        id: 'psoriasis',
        name: 'Psoriasis',
        risk: 'Medium', riskColor: '#f59e0b', riskBg: 'rgba(245,158,11,0.12)',
        accuracy: 94.7, barColor: '#f59e0b',
        desc: 'An autoimmune condition causing rapid skin cell growth, leading to thick scaly patches. Can also affect joints.',
        symptoms: ['Red patches with scales', 'Dry cracked skin', 'Itching', 'Thickened nails', 'Joint swelling'],
        treatment: 'Topical treatments, phototherapy, biologics',
        medication: [
            '🧴 Topical: Calcipotriene + betamethasone (Taclonex)',
            '🔬 Phototherapy: Narrowband UVB light therapy',
            '💉 Biologics: Adalimumab (Humira), Secukinumab (Cosentyx)',
            '💊 Systemic: Methotrexate or Cyclosporine (doctor supervised)'
        ],
        precautions: [
            'Moisturise heavily — use thick creams or ointments (not lotion)',
            'Avoid injury to skin (cuts can trigger new plaques)',
            'Manage stress with yoga, meditation or counselling',
            'Limit alcohol and quit smoking completely',
            'Eat anti-inflammatory diet and maintain healthy weight',
            'Get regular sun exposure (10–15 mins) but avoid sunburn'
        ]
    },
    {
        id: 'rosacea',
        name: 'Rosacea',
        risk: 'Low', riskColor: '#10b981', riskBg: 'rgba(16,185,129,0.12)',
        accuracy: 93.4, barColor: '#10b981',
        desc: 'A chronic skin condition causing redness and visible blood vessels in the face. May produce acne-like pimples.',
        symptoms: ['Facial redness', 'Swollen red bumps', 'Eye irritation', 'Enlarged nose', 'Visible blood vessels'],
        treatment: 'Antibiotics, azelaic acid, laser therapy',
        medication: [
            '🧴 Topical: Metronidazole gel, Azelaic acid, Ivermectin cream',
            '💊 Oral antibiotics: Doxycycline 40mg (low-dose) daily',
            '🔬 Laser: IPL therapy for persistent redness',
            '💊 Alpha-agonist: Brimonidine gel for facial redness'
        ],
        precautions: [
            'Identify and avoid personal triggers (spicy food, alcohol, heat)',
            'Always use SPF 30+ mineral sunscreen (zinc oxide-based)',
            'Wash face with lukewarm water and gentle cleanser only',
            'Avoid harsh scrubs, astringents or alcohol-based products',
            'Keep a trigger diary to identify and avoid flare-up causes',
            'Use green-tinted primer to visually neutralise redness'
        ]
    },
    {
        id: 'normal',
        name: 'Normal Skin',
        risk: 'None', riskColor: '#6366f1', riskBg: 'rgba(99,102,241,0.12)',
        accuracy: 99.0, barColor: '#6366f1',
        desc: 'Healthy skin with no detectable dermatological conditions. Regular skin care and sun protection are still recommended.',
        symptoms: ['Uniform texture', 'Normal pigmentation', 'No lesions', 'Smooth surface'],
        treatment: 'Routine skin care, SPF protection',
        medication: [
            '🧴 Sunscreen SPF 30+ (everyday, rain or shine)',
            '💊 Vitamin C serum (antioxidant & brightening)',
            '🌿 Retinol (anti-aging, 2–3x per week at night)',
            '💧 Hyaluronic acid moisturizer (daily hydration)'
        ],
        precautions: [
            'Maintain a consistent cleanse-tone-moisturise-SPF routine',
            'Stay hydrated — drink 2–3 litres of water daily',
            'Get 7–9 hours of quality sleep every night',
            'Eat a balanced diet rich in antioxidants and Omega-3',
            'Exercise regularly to improve skin circulation',
            'Annual skin screening even with healthy skin (preventive care)'
        ]
    }
];

window.DISEASES = DISEASES;
