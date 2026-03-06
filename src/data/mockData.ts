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
    id: "1",
    slug: "knee-replacement-istanbul",
    name: "Knee Replacement",
    provider: "Istanbul Health Centre",
    country: "Turkey",
    city: "Istanbul",
    price: 3200,
    currency: "£",
    rating: 4.8,
    reviewCount: 234,
    specialty: "Orthopaedics",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    description: "Full knee replacement surgery performed by internationally trained orthopaedic surgeons using the latest prosthetic technology. Includes pre-operative assessment, surgery, hospital stay, physiotherapy, and post-operative care.",
    duration: "5–7 days",
    included: ["Airport transfer", "Hospital stay (3 nights)", "Post-op physiotherapy", "Medications", "Follow-up consultations", "Personal care coordinator"],
    accredited: true,
  },
  {
    id: "2",
    slug: "dental-implants-ankara",
    name: "Dental Implants",
    provider: "Ankara Smile Clinic",
    country: "Turkey",
    city: "Ankara",
    price: 800,
    currency: "£",
    rating: 4.9,
    reviewCount: 412,
    specialty: "Dentistry",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800",
    description: "Premium dental implant treatment using Swiss-made titanium implants. Includes comprehensive dental assessment, 3D scanning, implant placement, and crown fitting.",
    duration: "3–5 days",
    included: ["Airport transfer", "Hotel accommodation (3 nights)", "3D dental scan", "Implant & crown", "Medications", "Follow-up appointment"],
    accredited: true,
  },
  {
    id: "3",
    slug: "ivf-athens",
    name: "IVF Treatment",
    provider: "Athens Fertility Centre",
    country: "Greece",
    city: "Athens",
    price: 2500,
    currency: "£",
    rating: 4.7,
    reviewCount: 156,
    specialty: "Fertility",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800",
    description: "Complete IVF cycle including ovarian stimulation, egg retrieval, fertilisation, and embryo transfer. Performed by leading fertility specialists with over 20 years of experience.",
    duration: "14–21 days",
    included: ["Initial consultation", "Hormone treatment", "Egg retrieval", "Embryo transfer", "Medications", "2 follow-up scans"],
    accredited: true,
  },
  {
    id: "4",
    slug: "hair-transplant-istanbul",
    name: "Hair Transplant",
    provider: "MedHair Istanbul",
    country: "Turkey",
    city: "Istanbul",
    price: 1500,
    currency: "£",
    rating: 4.9,
    reviewCount: 589,
    specialty: "Cosmetic",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800",
    description: "FUE hair transplant procedure with up to 5,000 grafts. Performed by specialist surgeons using sapphire blade technology for natural-looking results.",
    duration: "2–3 days",
    included: ["VIP airport transfer", "Luxury hotel (2 nights)", "PRP treatment", "Medications & aftercare kit", "12-month follow-up", "Translator service"],
    accredited: true,
  },
  {
    id: "5",
    slug: "cardiac-bypass-delhi",
    name: "Cardiac Bypass",
    provider: "Apollo Hospital Delhi",
    country: "India",
    city: "Delhi",
    price: 8000,
    currency: "£",
    rating: 4.8,
    reviewCount: 98,
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=800",
    description: "Coronary artery bypass grafting (CABG) performed by world-renowned cardiac surgeons. Comprehensive cardiac assessment, surgery, and rehabilitation programme included.",
    duration: "10–14 days",
    included: ["Pre-op assessment", "Surgery & ICU stay", "Hospital stay (7 nights)", "Cardiac rehabilitation", "Medications", "Dedicated cardiac nurse"],
    accredited: true,
  },
  {
    id: "6",
    slug: "oncology-consultation-bangkok",
    name: "Oncology Consultation",
    provider: "Bangkok Cancer Centre",
    country: "Thailand",
    city: "Bangkok",
    price: 1200,
    currency: "£",
    rating: 4.6,
    reviewCount: 73,
    specialty: "Oncology",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
    description: "Comprehensive oncology assessment including advanced diagnostics, imaging, biopsy analysis, and personalised treatment planning with leading oncologists.",
    duration: "3–5 days",
    included: ["Full diagnostic workup", "Advanced imaging (PET/CT)", "Specialist consultation", "Treatment plan", "Second opinion report", "Telemedicine follow-up"],
    accredited: true,
  },
];

export const wellnessPrograms: WellnessProgram[] = [
  {
    id: "w1",
    slug: "stress-burnout-retreat-bali",
    name: "Stress & Burnout Retreat",
    location: "Ubud, Bali",
    country: "Indonesia",
    duration: "7 days",
    durationDays: 7,
    price: 1800,
    currency: "£",
    rating: 4.9,
    reviewCount: 187,
    type: "Stress & Mental Health",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6c?w=800",
    description: "A transformative 7-day retreat designed for professionals experiencing chronic stress and burnout. Combines traditional Balinese healing practices with modern therapeutic techniques.",
    included: ["Luxury villa accommodation", "Daily yoga & meditation", "Spa treatments (5 sessions)", "Nutritional programme", "One-on-one therapy sessions", "Nature excursions"],
  },
  {
    id: "w2",
    slug: "longevity-programme-switzerland",
    name: "Longevity Programme",
    location: "Zurich, Switzerland",
    country: "Switzerland",
    duration: "5 days",
    durationDays: 5,
    price: 3500,
    currency: "£",
    rating: 4.8,
    reviewCount: 92,
    type: "Longevity & Anti-Ageing",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    description: "A cutting-edge longevity programme combining Swiss medical precision with holistic wellness. Includes comprehensive health screening, genetic analysis, and personalised longevity plan.",
    included: ["5-star hotel accommodation", "Full-body health screening", "Genetic & biomarker analysis", "IV therapy sessions", "Personalised nutrition plan", "Executive health report"],
  },
  {
    id: "w3",
    slug: "weight-management-thailand",
    name: "Weight Management",
    location: "Koh Samui, Thailand",
    country: "Thailand",
    duration: "14 days",
    durationDays: 14,
    price: 2200,
    currency: "£",
    rating: 4.7,
    reviewCount: 145,
    type: "Weight Management",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    description: "A comprehensive 14-day weight management programme combining fitness training, nutritional therapy, and mindful eating practices in a tropical paradise setting.",
    included: ["Beachfront resort accommodation", "Daily fitness sessions", "Personalised meal plan", "Body composition analysis", "Wellness coaching", "Cooking classes"],
  },
  {
    id: "w4",
    slug: "mental-wellness-retreat-portugal",
    name: "Mental Wellness Retreat",
    location: "Algarve, Portugal",
    country: "Portugal",
    duration: "10 days",
    durationDays: 10,
    price: 2800,
    currency: "£",
    rating: 4.8,
    reviewCount: 118,
    type: "Mental Wellness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    description: "A 10-day mental wellness retreat focusing on emotional resilience, mindfulness, and psychological well-being. Set in the stunning Algarve coastline.",
    included: ["Boutique hotel accommodation", "Daily mindfulness sessions", "CBT therapy sessions", "Art therapy", "Ocean-view yoga", "Healthy gourmet meals"],
  },
  {
    id: "w5",
    slug: "detox-retreat-austria",
    name: "Medical Detox Retreat",
    location: "Tyrol, Austria",
    country: "Austria",
    duration: "7 days",
    durationDays: 7,
    price: 2400,
    currency: "£",
    rating: 4.6,
    reviewCount: 67,
    type: "Detox & Cleansing",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800",
    description: "A medically supervised detox programme in the Austrian Alps. Combines fasting protocols, hydrotherapy, and alpine wellness traditions for deep cellular renewal.",
    included: ["Mountain lodge accommodation", "Medical supervision", "Hydrotherapy sessions", "Infrared sauna", "Guided alpine walks", "Organic juice programme"],
  },
  {
    id: "w6",
    slug: "yoga-ayurveda-india",
    name: "Yoga & Ayurveda Immersion",
    location: "Kerala, India",
    country: "India",
    duration: "12 days",
    durationDays: 12,
    price: 1600,
    currency: "£",
    rating: 4.9,
    reviewCount: 203,
    type: "Yoga & Ayurveda",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
    description: "An authentic 12-day Ayurvedic immersion in Kerala's backwaters. Includes daily yoga, personalised Ayurvedic treatments, and traditional healing practices.",
    included: ["Ayurvedic resort accommodation", "Daily yoga sessions", "Personalised Ayurvedic treatments", "Dosha assessment", "Herbal medicine", "Cultural excursions"],
  },
];

export const destinations: Destination[] = [
  {
    id: "d1",
    slug: "turkey",
    name: "Turkey",
    country: "Turkey",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
    providerCount: 120,
    treatmentCount: 45,
    description: "Turkey is the world's leading medical tourism destination, renowned for dental, cosmetic, and orthopaedic procedures at a fraction of Western prices.",
    flag: "🇹🇷",
  },
  {
    id: "d2",
    slug: "thailand",
    name: "Thailand",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
    providerCount: 85,
    treatmentCount: 38,
    description: "Thailand combines world-class healthcare with tropical recovery environments, making it a top choice for medical and wellness travellers.",
    flag: "🇹🇭",
  },
  {
    id: "d3",
    slug: "uae",
    name: "UAE",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    providerCount: 60,
    treatmentCount: 32,
    description: "The UAE offers ultra-premium healthcare facilities with cutting-edge technology and internationally trained specialists.",
    flag: "🇦🇪",
  },
  {
    id: "d4",
    slug: "india",
    name: "India",
    country: "India",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
    providerCount: 150,
    treatmentCount: 55,
    description: "India is a global leader in cardiac surgery, oncology, and Ayurvedic wellness, with JCI-accredited hospitals across major cities.",
    flag: "🇮🇳",
  },
  {
    id: "d5",
    slug: "germany",
    name: "Germany",
    country: "Germany",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
    providerCount: 70,
    treatmentCount: 40,
    description: "Germany is Europe's medical powerhouse, known for precision surgery, advanced oncology, and rehabilitation programmes.",
    flag: "🇩🇪",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "James W.",
    country: "United Kingdom",
    rating: 5,
    text: "Absolutely life-changing experience. The team coordinated everything from flights to follow-up appointments. My knee replacement went flawlessly.",
    treatment: "Knee Replacement",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    date: "2024-11-15",
  },
  {
    id: "r2",
    name: "Maria S.",
    country: "Germany",
    rating: 5,
    text: "The dental clinic exceeded my expectations. Professional, modern, and incredibly affordable compared to back home. Highly recommend!",
    treatment: "Dental Implants",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    date: "2024-10-22",
  },
  {
    id: "r3",
    name: "Ahmed K.",
    country: "Saudi Arabia",
    rating: 5,
    text: "The wellness retreat in Bali was exactly what I needed after years of corporate burnout. I came back a different person.",
    treatment: "Stress & Burnout Retreat",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    date: "2024-09-18",
  },
];

export const trustStats = [
  { label: "Verified Providers", value: "500+" },
  { label: "Countries", value: "40+" },
  { label: "Patients Served", value: "10,000+" },
  { label: "Average Rating", value: "4.9★" },
];

export const howItWorks = [
  {
    step: 1,
    title: "Tell us about your health goals",
    description: "Share your treatment needs or wellness goals, and we'll find the best options for you.",
    icon: "clipboard",
  },
  {
    step: 2,
    title: "Get matched to verified providers",
    description: "Our AI-powered matching system connects you with accredited hospitals and wellness centres.",
    icon: "search",
  },
  {
    step: 3,
    title: "Travel with full support",
    description: "From flights to aftercare, your dedicated coordinator handles every detail.",
    icon: "plane",
  },
];

export const specialties = [
  "All Specialties",
  "Orthopaedics",
  "Dentistry",
  "Fertility",
  "Cosmetic",
  "Cardiology",
  "Oncology",
];

export const wellnessTypes = [
  "All Types",
  "Stress & Mental Health",
  "Longevity & Anti-Ageing",
  "Weight Management",
  "Mental Wellness",
  "Detox & Cleansing",
  "Yoga & Ayurveda",
];

export const countries = ["All Destinations", "Turkey", "Greece", "India", "Thailand", "Indonesia", "Switzerland", "Portugal", "Austria"];

export const journeySteps = [
  { id: 1, title: "Profile Created", description: "Your health profile is set up", completed: true },
  { id: 2, title: "First Match", description: "Matched with top providers", completed: true },
  { id: 3, title: "Consultation Booked", description: "Video consultation scheduled", completed: true },
  { id: 4, title: "Treatment Confirmed", description: "Treatment plan finalised", completed: false },
  { id: 5, title: "Post-Treatment Follow-up", description: "Recovery & aftercare", completed: false },
];
