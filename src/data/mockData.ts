export interface Treatment {
  id: string;
  slug: string;
  name: string;
  provider: string;
  country: string;
  city: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  image: string;
  description: string;
  duration: string;
  included: string[];
  accredited: boolean;
}

export interface WellnessProgram {
  id: string;
  slug: string;
  name: string;
  location: string;
  country: string;
  duration: string;
  durationDays: number;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  type: string;
  category: "retreat" | "outdoor" | "indoor" | "holistic";
  image: string;
  description: string;
  included: string[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  image: string;
  providerCount: number;
  treatmentCount: number;
  description: string;
  flag: string;
  stats?: { value: string; label: string }[];
  whyChoose?: string[];
  topSpecialties?: string[];
}

export interface Review {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  treatment: string;
  avatar: string;
  date: string;
}

export const treatments: Treatment[] = [
  {
    id: "1", slug: "knee-replacement-istanbul", name: "Knee Replacement", provider: "Istanbul Health Centre",
    country: "Turkey", city: "Istanbul", price: 3200, currency: "£", rating: 4.8, reviewCount: 234,
    specialty: "Orthopaedics", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    description: "Full knee replacement surgery performed by internationally trained orthopaedic surgeons using the latest prosthetic technology. Includes pre-operative assessment, surgery, hospital stay, physiotherapy, and post-operative care.",
    duration: "5–7 days", included: ["Airport transfer", "Hospital stay (3 nights)", "Post-op physiotherapy", "Medications", "Follow-up consultations", "Personal care coordinator"], accredited: true,
  },
  {
    id: "2", slug: "dental-implants-ankara", name: "Dental Implants", provider: "Ankara Smile Clinic",
    country: "Turkey", city: "Ankara", price: 800, currency: "£", rating: 4.9, reviewCount: 412,
    specialty: "Dentistry", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800",
    description: "Premium dental implant treatment using Swiss-made titanium implants. Includes comprehensive dental assessment, 3D scanning, implant placement, and crown fitting.",
    duration: "3–5 days", included: ["Airport transfer", "Hotel accommodation (3 nights)", "3D dental scan", "Implant & crown", "Medications", "Follow-up appointment"], accredited: true,
  },
  {
    id: "3", slug: "ivf-athens", name: "IVF Treatment", provider: "Athens Fertility Centre",
    country: "Greece", city: "Athens", price: 2500, currency: "£", rating: 4.7, reviewCount: 156,
    specialty: "Fertility", image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800",
    description: "Complete IVF cycle including ovarian stimulation, egg retrieval, fertilisation, and embryo transfer. Performed by leading fertility specialists with over 20 years of experience.",
    duration: "14–21 days", included: ["Initial consultation", "Hormone treatment", "Egg retrieval", "Embryo transfer", "Medications", "2 follow-up scans"], accredited: true,
  },
  {
    id: "4", slug: "hair-transplant-istanbul", name: "Hair Transplant", provider: "MedHair Istanbul",
    country: "Turkey", city: "Istanbul", price: 1500, currency: "£", rating: 4.9, reviewCount: 589,
    specialty: "Cosmetic", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800",
    description: "FUE hair transplant procedure with up to 5,000 grafts. Performed by specialist surgeons using sapphire blade technology for natural-looking results.",
    duration: "2–3 days", included: ["VIP airport transfer", "Luxury hotel (2 nights)", "PRP treatment", "Medications & aftercare kit", "12-month follow-up", "Translator service"], accredited: true,
  },
  {
    id: "5", slug: "cardiac-bypass-delhi", name: "Cardiac Bypass", provider: "Apollo Hospital Delhi",
    country: "India", city: "Delhi", price: 8000, currency: "£", rating: 4.8, reviewCount: 98,
    specialty: "Cardiology", image: "https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=800",
    description: "Coronary artery bypass grafting (CABG) performed by world-renowned cardiac surgeons. Comprehensive cardiac assessment, surgery, and rehabilitation programme included.",
    duration: "10–14 days", included: ["Pre-op assessment", "Surgery & ICU stay", "Hospital stay (7 nights)", "Cardiac rehabilitation", "Medications", "Dedicated cardiac nurse"], accredited: true,
  },
  {
    id: "6", slug: "oncology-consultation-bangkok", name: "Oncology Consultation", provider: "Bangkok Cancer Centre",
    country: "Thailand", city: "Bangkok", price: 1200, currency: "£", rating: 4.6, reviewCount: 73,
    specialty: "Oncology", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
    description: "Comprehensive oncology assessment including advanced diagnostics, imaging, biopsy analysis, and personalised treatment planning with leading oncologists.",
    duration: "3–5 days", included: ["Full diagnostic workup", "Advanced imaging (PET/CT)", "Specialist consultation", "Treatment plan", "Second opinion report", "Telemedicine follow-up"], accredited: true,
  },
  {
    id: "7", slug: "rhinoplasty-istanbul", name: "Rhinoplasty", provider: "Estetik Istanbul",
    country: "Turkey", city: "Istanbul", price: 2800, currency: "£", rating: 4.8, reviewCount: 312,
    specialty: "Cosmetic", image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800",
    description: "Expert rhinoplasty performed by board-certified plastic surgeons. Includes 3D imaging consultation, surgery, and comprehensive aftercare.",
    duration: "5–7 days", included: ["Airport transfer", "Luxury hotel (3 nights)", "3D imaging", "Surgery", "Post-op care", "1 year follow-up"], accredited: true,
  },
  {
    id: "8", slug: "hip-replacement-mumbai", name: "Hip Replacement", provider: "Fortis Hospital Mumbai",
    country: "India", city: "Mumbai", price: 4500, currency: "£", rating: 4.7, reviewCount: 145,
    specialty: "Orthopaedics", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
    description: "Total hip replacement using advanced ceramic-on-ceramic prosthetics. Performed by orthopaedic surgeons with 20+ years of experience.",
    duration: "7–10 days", included: ["Airport transfer", "Hospital stay (5 nights)", "Physiotherapy", "Medications", "Follow-up consultations", "Translator"], accredited: true,
  },
  {
    id: "9", slug: "lasik-dubai", name: "LASIK Eye Surgery", provider: "Moorfields Eye Hospital Dubai",
    country: "UAE", city: "Dubai", price: 1800, currency: "£", rating: 4.9, reviewCount: 267,
    specialty: "Ophthalmology", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    description: "State-of-the-art LASIK laser eye surgery with the latest femtosecond technology for crystal-clear vision correction.",
    duration: "1–2 days", included: ["Pre-op assessment", "LASIK surgery", "Post-op eye drops", "24hr follow-up", "1 month check-up", "Protective eyewear"], accredited: true,
  },
  {
    id: "10", slug: "dental-veneers-antalya", name: "Dental Veneers", provider: "Antalya Dental Studio",
    country: "Turkey", city: "Antalya", price: 2200, currency: "£", rating: 4.8, reviewCount: 389,
    specialty: "Dentistry", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800",
    description: "Premium porcelain veneer treatment for a complete smile makeover. Includes consultation, preparation, and fitting of up to 20 veneers.",
    duration: "5–7 days", included: ["Airport transfer", "All-inclusive hotel (5 nights)", "Digital smile design", "Temporary veneers", "Permanent veneers", "Aftercare kit"], accredited: true,
  },
  {
    id: "11", slug: "gastric-sleeve-istanbul", name: "Gastric Sleeve Surgery", provider: "Bariatric Center Istanbul",
    country: "Turkey", city: "Istanbul", price: 4200, currency: "£", rating: 4.8, reviewCount: 276,
    specialty: "Bariatric", image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800",
    description: "Laparoscopic sleeve gastrectomy performed by board-certified bariatric surgeons. Includes full nutrition and aftercare plan.",
    duration: "5–7 days", included: ["Airport transfer", "Hospital stay (3 nights)", "Hotel (3 nights)", "Nutritionist consultations", "12-month follow-up", "Translator"], accredited: true,
  },
  {
    id: "12", slug: "spinal-fusion-seoul", name: "Spinal Fusion Surgery", provider: "Seoul Spine Hospital",
    country: "South Korea", city: "Seoul", price: 12000, currency: "£", rating: 4.9, reviewCount: 84,
    specialty: "Orthopaedics", image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800",
    description: "Minimally invasive spinal fusion using robotic-assisted surgery and 3D navigation.",
    duration: "10–14 days", included: ["Pre-op MRI", "Surgery & ICU", "Hospital stay (6 nights)", "Physiotherapy", "Medications", "Care coordinator"], accredited: true,
  },
  {
    id: "13", slug: "liver-transplant-delhi", name: "Liver Transplant", provider: "Max Healthcare Delhi",
    country: "India", city: "Delhi", price: 28000, currency: "£", rating: 4.8, reviewCount: 52,
    specialty: "Transplant", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
    description: "Living-donor and deceased-donor liver transplantation with a 95% success rate.",
    duration: "30–45 days", included: ["Donor evaluation", "Surgery", "ICU & ward stay", "Medications (1 year)", "Follow-up scans", "Family accommodation"], accredited: true,
  },
  {
    id: "14", slug: "ivf-prague", name: "IVF with PGT", provider: "Prague Fertility Institute",
    country: "Czech Republic", city: "Prague", price: 4800, currency: "£", rating: 4.9, reviewCount: 234,
    specialty: "Fertility", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800",
    description: "Advanced IVF cycle with Preimplantation Genetic Testing for higher success rates.",
    duration: "14–18 days", included: ["Consultation", "Stimulation drugs", "Egg retrieval", "ICSI & PGT", "Embryo transfer", "Follow-up"], accredited: true,
  },
  {
    id: "15", slug: "breast-augmentation-bangkok", name: "Breast Augmentation", provider: "Bangkok Plastic Surgery Clinic",
    country: "Thailand", city: "Bangkok", price: 3400, currency: "£", rating: 4.8, reviewCount: 187,
    specialty: "Cosmetic", image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800",
    description: "Breast augmentation with premium Motiva implants and 3D imaging consultation.",
    duration: "5–7 days", included: ["Airport transfer", "Hotel (4 nights)", "3D imaging", "Surgery", "Compression garment", "Follow-up checks"], accredited: true,
  },
  {
    id: "16", slug: "tummy-tuck-mexico-city", name: "Tummy Tuck", provider: "Mexico City Aesthetic Center",
    country: "Mexico", city: "Mexico City", price: 5200, currency: "£", rating: 4.7, reviewCount: 142,
    specialty: "Cosmetic", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800",
    description: "Full abdominoplasty with muscle repair, performed by board-certified plastic surgeons.",
    duration: "7–10 days", included: ["Airport transfer", "Recovery suite (5 nights)", "Surgery", "Lymphatic massage", "Compression garment", "Follow-up"], accredited: true,
  },
  {
    id: "17", slug: "cataract-surgery-singapore", name: "Cataract Surgery", provider: "Singapore Eye Centre",
    country: "Singapore", city: "Singapore", price: 2900, currency: "£", rating: 4.9, reviewCount: 198,
    specialty: "Ophthalmology", image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800",
    description: "Premium lens cataract surgery using femtosecond laser technology, both eyes.",
    duration: "3–5 days", included: ["Pre-op assessment", "Surgery (both eyes)", "Premium IOL", "Eye drops", "Follow-up visits", "Eyewear protection"], accredited: true,
  },
  {
    id: "18", slug: "knee-arthroscopy-budapest", name: "Knee Arthroscopy", provider: "Budapest Sports Medicine",
    country: "Hungary", city: "Budapest", price: 2100, currency: "£", rating: 4.7, reviewCount: 167,
    specialty: "Orthopaedics", image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800",
    description: "Minimally invasive knee arthroscopy for meniscus and ligament repair.",
    duration: "3–5 days", included: ["Airport transfer", "Hospital stay (1 night)", "Surgery", "Physiotherapy", "Medications", "Follow-up"], accredited: true,
  },
  {
    id: "19", slug: "all-on-4-dental-budapest", name: "All-on-4 Dental Implants", provider: "Budapest Dental Clinic",
    country: "Hungary", city: "Budapest", price: 5800, currency: "£", rating: 4.8, reviewCount: 312,
    specialty: "Dentistry", image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800",
    description: "Full-arch dental restoration with 4 implants per arch and premium prosthetics.",
    duration: "5–7 days", included: ["Airport transfer", "Hotel (5 nights)", "3D CT scan", "4 implants", "Temporary teeth", "Final prosthetic"], accredited: true,
  },
  {
    id: "20", slug: "weight-loss-balloon-istanbul", name: "Gastric Balloon", provider: "Istanbul Weight Loss Center",
    country: "Turkey", city: "Istanbul", price: 2400, currency: "£", rating: 4.6, reviewCount: 189,
    specialty: "Bariatric", image: "https://images.unsplash.com/photo-1559757175-7cb036e0d465?w=800",
    description: "Non-surgical 6-12 month gastric balloon placement for sustainable weight loss.",
    duration: "2–3 days", included: ["Airport transfer", "Hotel (2 nights)", "Endoscopic placement", "Nutritionist support", "6-month coaching", "Removal procedure"], accredited: true,
  },
  {
    id: "21", slug: "kidney-stone-treatment-mumbai", name: "Kidney Stone Treatment", provider: "Fortis Kidney Institute",
    country: "India", city: "Mumbai", price: 1800, currency: "£", rating: 4.8, reviewCount: 124,
    specialty: "Urology", image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800",
    description: "Lithotripsy or laser stone removal with same-day discharge for most cases.",
    duration: "3–4 days", included: ["Consultation", "Diagnostics", "Procedure", "Hospital stay (1 night)", "Medications", "Follow-up scan"], accredited: true,
  },
  {
    id: "22", slug: "skin-resurfacing-seoul", name: "Laser Skin Resurfacing", provider: "Seoul Dermatology Clinic",
    country: "South Korea", city: "Seoul", price: 1600, currency: "£", rating: 4.9, reviewCount: 256,
    specialty: "Dermatology", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
    description: "Fractional CO2 laser resurfacing with K-beauty post-care for radiant skin.",
    duration: "4–6 days", included: ["Consultation", "3 laser sessions", "Skincare kit", "LED therapy", "Hotel (3 nights)", "Follow-up"], accredited: true,
  },
  {
    id: "23", slug: "thyroid-surgery-bangkok", name: "Thyroid Surgery", provider: "Bumrungrad International",
    country: "Thailand", city: "Bangkok", price: 5400, currency: "£", rating: 4.9, reviewCount: 91,
    specialty: "Endocrinology", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    description: "Endoscopic thyroidectomy with scar-less technique by JCI-accredited surgeons.",
    duration: "7–10 days", included: ["Pre-op workup", "Surgery", "Hospital stay (3 nights)", "Hotel (3 nights)", "Hormone therapy plan", "Follow-up"], accredited: true,
  },
  {
    id: "24", slug: "stem-cell-therapy-mexico", name: "Stem Cell Therapy", provider: "Cancun Regenerative Clinic",
    country: "Mexico", city: "Cancun", price: 8500, currency: "£", rating: 4.6, reviewCount: 67,
    specialty: "Regenerative", image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800",
    description: "Mesenchymal stem cell therapy for joint, autoimmune, and longevity treatment.",
    duration: "7–10 days", included: ["Consultation", "Lab work", "Stem cell infusion", "Resort stay (7 nights)", "Wellness program", "Follow-up"], accredited: true,
  },
  {
    id: "25", slug: "physiotherapy-program-portugal", name: "Sports Rehabilitation Program", provider: "Lisbon Sports Med",
    country: "Portugal", city: "Lisbon", price: 2200, currency: "£", rating: 4.8, reviewCount: 134,
    specialty: "Rehabilitation", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    description: "Intensive 2-week sports injury rehabilitation with daily physio and hydrotherapy.",
    duration: "14 days", included: ["Assessment", "Daily physio sessions", "Hydrotherapy", "Hotel accommodation", "Nutrition plan", "Recovery report"], accredited: true,
  },
];

export const wellnessPrograms: WellnessProgram[] = [
  {
    id: "w1", slug: "stress-burnout-retreat-bali", name: "Stress & Burnout Retreat", location: "Ubud, Bali", country: "Indonesia",
    duration: "7 days", durationDays: 7, price: 1800, currency: "£", rating: 4.9, reviewCount: 187,
    type: "Stress & Mental Health", category: "retreat",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    description: "A transformative 7-day retreat designed for professionals experiencing chronic stress and burnout. Combines traditional Balinese healing practices with modern therapeutic techniques.",
    included: ["Luxury villa accommodation", "Daily yoga & meditation", "Spa treatments (5 sessions)", "Nutritional programme", "One-on-one therapy sessions", "Nature excursions"],
  },
  {
    id: "w2", slug: "longevity-programme-switzerland", name: "Longevity Programme", location: "Zurich, Switzerland", country: "Switzerland",
    duration: "5 days", durationDays: 5, price: 3500, currency: "£", rating: 4.8, reviewCount: 92,
    type: "Longevity & Anti-Ageing", category: "indoor",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    description: "A cutting-edge longevity programme combining Swiss medical precision with holistic wellness.",
    included: ["5-star hotel accommodation", "Full-body health screening", "Genetic & biomarker analysis", "IV therapy sessions", "Personalised nutrition plan", "Executive health report"],
  },
  {
    id: "w3", slug: "weight-management-thailand", name: "Weight Management", location: "Koh Samui, Thailand", country: "Thailand",
    duration: "14 days", durationDays: 14, price: 2200, currency: "£", rating: 4.7, reviewCount: 145,
    type: "Weight Management", category: "outdoor",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    description: "A comprehensive 14-day weight management programme combining fitness training, nutritional therapy, and mindful eating practices in a tropical paradise setting.",
    included: ["Beachfront resort accommodation", "Daily fitness sessions", "Personalised meal plan", "Body composition analysis", "Wellness coaching", "Cooking classes"],
  },
  {
    id: "w4", slug: "mental-wellness-retreat-portugal", name: "Mental Wellness Retreat", location: "Algarve, Portugal", country: "Portugal",
    duration: "10 days", durationDays: 10, price: 2800, currency: "£", rating: 4.8, reviewCount: 118,
    type: "Mental Wellness", category: "retreat",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    description: "A 10-day mental wellness retreat focusing on emotional resilience, mindfulness, and psychological well-being.",
    included: ["Boutique hotel accommodation", "Daily mindfulness sessions", "CBT therapy sessions", "Art therapy", "Ocean-view yoga", "Healthy gourmet meals"],
  },
  {
    id: "w5", slug: "detox-retreat-austria", name: "Medical Detox Retreat", location: "Tyrol, Austria", country: "Austria",
    duration: "7 days", durationDays: 7, price: 2400, currency: "£", rating: 4.6, reviewCount: 67,
    type: "Detox & Cleansing", category: "outdoor",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800",
    description: "A medically supervised detox programme in the Austrian Alps. Combines fasting protocols, hydrotherapy, and alpine wellness traditions.",
    included: ["Mountain lodge accommodation", "Medical supervision", "Hydrotherapy sessions", "Infrared sauna", "Guided alpine walks", "Organic juice programme"],
  },
  {
    id: "w6", slug: "yoga-ayurveda-india", name: "Yoga & Ayurveda Immersion", location: "Kerala, India", country: "India",
    duration: "12 days", durationDays: 12, price: 1600, currency: "£", rating: 4.9, reviewCount: 203,
    type: "Yoga & Ayurveda", category: "holistic",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
    description: "An authentic 12-day Ayurvedic immersion in Kerala's backwaters.",
    included: ["Ayurvedic resort accommodation", "Daily yoga sessions", "Personalised Ayurvedic treatments", "Dosha assessment", "Herbal medicine", "Cultural excursions"],
  },
  {
    id: "w7", slug: "adventure-fitness-costa-rica", name: "Adventure Fitness Camp", location: "Guanacaste, Costa Rica", country: "Costa Rica",
    duration: "10 days", durationDays: 10, price: 2600, currency: "£", rating: 4.7, reviewCount: 89,
    type: "Fitness & Adventure", category: "outdoor",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    description: "An adrenaline-fuelled fitness camp combining outdoor adventure sports with structured training in stunning tropical landscapes.",
    included: ["Eco-lodge accommodation", "Daily CrossFit sessions", "Surfing lessons", "Hiking expeditions", "Nutritional coaching", "Recovery massage"],
  },
  {
    id: "w8", slug: "spa-thermal-budapest", name: "Thermal Spa Recovery", location: "Budapest, Hungary", country: "Hungary",
    duration: "5 days", durationDays: 5, price: 1400, currency: "£", rating: 4.8, reviewCount: 156,
    type: "Spa & Recovery", category: "indoor",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    description: "Immerse yourself in Budapest's legendary thermal baths combined with medical spa treatments for deep relaxation and recovery.",
    included: ["Boutique hotel accommodation", "Thermal bath access (daily)", "Medical massage (4 sessions)", "Hydrotherapy", "Guided city wellness walk", "Organic meals"],
  },
  {
    id: "w9", slug: "mindfulness-meditation-japan", name: "Zen Meditation Retreat", location: "Kyoto, Japan", country: "Japan",
    duration: "7 days", durationDays: 7, price: 3200, currency: "£", rating: 4.9, reviewCount: 74,
    type: "Mental Wellness", category: "holistic",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
    description: "A profound 7-day Zen meditation retreat in the ancient temples of Kyoto. Learn traditional Zazen practices from experienced monks.",
    included: ["Temple accommodation", "Daily Zazen sessions", "Tea ceremony", "Japanese garden meditation", "Shojin ryori meals", "Calligraphy workshop"],
  },
  {
    id: "w10", slug: "digital-detox-iceland", name: "Digital Detox & Nature", location: "Reykjavik, Iceland", country: "Iceland",
    duration: "6 days", durationDays: 6, price: 2900, currency: "£", rating: 4.8, reviewCount: 63,
    type: "Detox & Cleansing", category: "outdoor",
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800",
    description: "Disconnect from technology and reconnect with nature in Iceland's breathtaking landscapes. Hot springs, glacier walks, and aurora viewing.",
    included: ["Eco-cabin accommodation", "Geothermal hot spring access", "Glacier hiking", "Northern Lights tour", "Mindfulness sessions", "Farm-to-table meals"],
  },
];

export const destinations: Destination[] = [
  {
    id: "d1", slug: "turkey", name: "Turkey", country: "Turkey",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920",
    providerCount: 120, treatmentCount: 45,
    description: "Turkey is the world's leading medical tourism destination, renowned for dental, cosmetic, and orthopaedic procedures at a fraction of Western prices.",
    flag: "🇹🇷",
    stats: [
      { value: "1M+", label: "Medical tourists/year" },
      { value: "46", label: "JCI-accredited hospitals" },
      { value: "70%", label: "Average savings vs UK" },
      { value: "#4", label: "Global ranking" },
    ],
    whyChoose: [
      "Up to 70% savings compared to UK/US prices",
      "JCI-accredited hospitals with cutting-edge technology",
      "Over 1 million medical tourists annually",
      "English-speaking medical staff",
    ],
    topSpecialties: ["Hair Transplant", "Dental", "Cosmetic Surgery", "Orthopaedics"],
  },
  {
    id: "d2", slug: "thailand", name: "Thailand", country: "Thailand",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920",
    providerCount: 85, treatmentCount: 38,
    description: "Thailand combines world-class healthcare with tropical recovery environments, making it a top choice for medical and wellness travellers.",
    flag: "🇹🇭",
    stats: [
      { value: "2.5M+", label: "Medical tourists/year" },
      { value: "68", label: "JCI-accredited facilities" },
      { value: "60%", label: "Average savings vs US" },
      { value: "#1", label: "In Asia for medical tourism" },
    ],
    whyChoose: [
      "Home to Bumrungrad — one of the world's top hospitals",
      "Exceptional post-operative recovery environment",
      "World-class wellness and rehabilitation centres",
      "Affordable luxury with 5-star patient care",
    ],
    topSpecialties: ["Oncology", "Wellness", "Cosmetic Surgery", "Cardiac"],
  },
  {
    id: "d3", slug: "uae", name: "UAE", country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920",
    providerCount: 60, treatmentCount: 32,
    description: "The UAE offers ultra-premium healthcare facilities with cutting-edge technology and internationally trained specialists.",
    flag: "🇦🇪",
    stats: [
      { value: "350K+", label: "Medical tourists/year" },
      { value: "32", label: "JCI-accredited hospitals" },
      { value: "40%", label: "Savings vs US" },
      { value: "#1", label: "In Middle East" },
    ],
    whyChoose: [
      "Ultra-modern facilities with latest technology",
      "Multilingual medical staff from 40+ countries",
      "World-class luxury recovery suites",
      "Strategic hub — easy access from Europe, Asia & Africa",
    ],
    topSpecialties: ["Ophthalmology", "Orthopaedics", "Fertility", "Cosmetic"],
  },
  {
    id: "d4", slug: "india", name: "India", country: "India",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920",
    providerCount: 150, treatmentCount: 55,
    description: "India is a global leader in cardiac surgery, oncology, and Ayurvedic wellness, with JCI-accredited hospitals across major cities.",
    flag: "🇮🇳",
    stats: [
      { value: "500K+", label: "Medical tourists/year" },
      { value: "39", label: "JCI-accredited hospitals" },
      { value: "80%", label: "Average savings vs UK" },
      { value: "#6", label: "Global ranking" },
    ],
    whyChoose: [
      "Up to 80% savings — the most affordable destination",
      "World-renowned cardiac and oncology centres",
      "Ancient Ayurvedic wellness traditions",
      "English-speaking country with vast medical expertise",
    ],
    topSpecialties: ["Cardiac Surgery", "Oncology", "Orthopaedics", "Ayurveda"],
  },
  {
    id: "d5", slug: "germany", name: "Germany", country: "Germany",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920",
    providerCount: 70, treatmentCount: 40,
    description: "Germany is Europe's medical powerhouse, known for precision surgery, advanced oncology, and rehabilitation programmes.",
    flag: "🇩🇪",
    stats: [
      { value: "250K+", label: "Medical tourists/year" },
      { value: "52", label: "JCI-accredited facilities" },
      { value: "30%", label: "Savings vs US" },
      { value: "#1", label: "In Europe" },
    ],
    whyChoose: [
      "World-leading precision in surgery and diagnostics",
      "Renowned university hospitals and research centres",
      "Exceptional rehabilitation and post-operative care",
      "Strict quality standards with transparent pricing",
    ],
    topSpecialties: ["Oncology", "Neurosurgery", "Cardiac", "Rehabilitation"],
  },
  {
    id: "d6", slug: "south-korea", name: "South Korea", country: "South Korea",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1920",
    providerCount: 95, treatmentCount: 42,
    description: "South Korea is the global capital of cosmetic surgery and advanced medical technology, with cutting-edge robotic surgery capabilities.",
    flag: "🇰🇷",
    stats: [
      { value: "600K+", label: "Medical tourists/year" },
      { value: "28", label: "JCI-accredited hospitals" },
      { value: "50%", label: "Savings vs US" },
      { value: "#1", label: "For cosmetic surgery" },
    ],
    whyChoose: [
      "Global leader in cosmetic and plastic surgery",
      "Advanced robotic surgery technology",
      "Cutting-edge K-beauty wellness treatments",
      "Excellent transport infrastructure for patients",
    ],
    topSpecialties: ["Cosmetic Surgery", "Dermatology", "Robotic Surgery", "Health Screening"],
  },
  {
    id: "d7", slug: "greece", name: "Greece", country: "Greece",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1920",
    providerCount: 45, treatmentCount: 28,
    description: "Greece offers excellent fertility and wellness treatments with the added benefit of recovering on stunning Mediterranean islands.",
    flag: "🇬🇷",
    stats: [
      { value: "100K+", label: "Medical tourists/year" },
      { value: "15", label: "Accredited facilities" },
      { value: "50%", label: "Savings vs UK" },
      { value: "Top 3", label: "In Europe for IVF" },
    ],
    whyChoose: [
      "Leading destination for IVF and fertility treatments",
      "Stunning Mediterranean recovery environment",
      "Highly trained English-speaking medical staff",
      "Affordable compared to Western European alternatives",
    ],
    topSpecialties: ["Fertility / IVF", "Ophthalmology", "Wellness", "Dental"],
  },
];

export const reviews: Review[] = [
  {
    id: "r1", name: "James W.", country: "United Kingdom", rating: 5,
    text: "Absolutely life-changing experience. The team coordinated everything from flights to follow-up appointments. My knee replacement went flawlessly.",
    treatment: "Knee Replacement", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", date: "2024-11-15",
  },
  {
    id: "r2", name: "Maria S.", country: "Germany", rating: 5,
    text: "The dental clinic exceeded my expectations. Professional, modern, and incredibly affordable compared to back home. Highly recommend!",
    treatment: "Dental Implants", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", date: "2024-10-22",
  },
  {
    id: "r3", name: "Ahmed K.", country: "Saudi Arabia", rating: 5,
    text: "The wellness retreat in Bali was exactly what I needed after years of corporate burnout. I came back a different person.",
    treatment: "Stress & Burnout Retreat", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", date: "2024-09-18",
  },
];

export const trustStats = [
  { label: "Verified Providers", value: "500+" },
  { label: "Countries", value: "40+" },
  { label: "Patients Served", value: "10,000+" },
  { label: "Average Rating", value: "4.9★" },
];

export const howItWorks = [
  { step: 1, title: "Tell us about your health goals", description: "Share your treatment needs or wellness goals, and we'll find the best options for you.", icon: "clipboard" },
  { step: 2, title: "Get matched to verified providers", description: "Our AI-powered matching system connects you with accredited hospitals and wellness centres.", icon: "search" },
  { step: 3, title: "Travel with full support", description: "From flights to aftercare, your dedicated coordinator handles every detail.", icon: "plane" },
];

export const specialties = ["All Specialties", "Orthopaedics", "Dentistry", "Fertility", "Cosmetic", "Cardiology", "Oncology", "Ophthalmology"];

export const wellnessTypes = ["All Types", "Stress & Mental Health", "Longevity & Anti-Ageing", "Weight Management", "Mental Wellness", "Detox & Cleansing", "Yoga & Ayurveda", "Fitness & Adventure", "Spa & Recovery"];

export const wellnessCategories = [
  { key: "all", label: "All Programs" },
  { key: "retreat", label: "🧘 Retreats" },
  { key: "outdoor", label: "🏔️ Outdoor & Adventure" },
  { key: "indoor", label: "🏥 Indoor & Clinical" },
  { key: "holistic", label: "🌿 Holistic & Spiritual" },
];

export const countries = ["All Destinations", "Turkey", "Greece", "India", "Thailand", "Indonesia", "Switzerland", "Portugal", "Austria", "UAE", "South Korea", "Hungary", "Japan", "Iceland", "Costa Rica"];

export const journeySteps = [
  { id: 1, title: "Profile Created", description: "Your health profile is set up", completed: true },
  { id: 2, title: "First Match", description: "Matched with top providers", completed: true },
  { id: 3, title: "Consultation Booked", description: "Video consultation scheduled", completed: true },
  { id: 4, title: "Treatment Confirmed", description: "Treatment plan finalised", completed: false },
  { id: 5, title: "Post-Treatment Follow-up", description: "Recovery & aftercare", completed: false },
];

export const virtualCardFeatures = [
  "Instant access to treatment records worldwide",
  "Priority booking at partner hospitals",
  "Digital insurance & payment tracking",
  "Emergency contact & medical history",
  "Exclusive member discounts up to 15%",
  "24/7 care coordinator access",
];

export const partnerBenefits = [
  { title: "Global Patient Reach", description: "Connect with thousands of international patients actively seeking treatments in your specialty.", icon: "globe" },
  { title: "Verified Profile", description: "Get a premium profile showcasing your accreditations, facilities, patient reviews, and success rates.", icon: "badge" },
  { title: "Seamless Coordination", description: "Our care coordinators handle logistics — flights, transfers, accommodation — so you focus on care.", icon: "users" },
  { title: "Revenue Growth", description: "Partners see an average 40% increase in international patient bookings within the first year.", icon: "trending" },
];

export const currentPartners = [
  { name: "Istanbul Health Centre", country: "Turkey", specialty: "Orthopaedics & General Surgery", logo: "IHC" },
  { name: "Apollo Hospitals", country: "India", specialty: "Cardiac & Oncology", logo: "AH" },
  { name: "Bumrungrad International", country: "Thailand", specialty: "Multi-specialty", logo: "BI" },
  { name: "Moorfields Eye Hospital", country: "UAE", specialty: "Ophthalmology", logo: "MEH" },
  { name: "Ankara Smile Clinic", country: "Turkey", specialty: "Dentistry", logo: "ASC" },
  { name: "Athens Fertility Centre", country: "Greece", specialty: "IVF & Fertility", logo: "AFC" },
];
