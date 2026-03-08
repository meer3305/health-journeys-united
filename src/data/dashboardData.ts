export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "booking";
}

export interface Booking {
  id: string;
  treatment: string;
  provider: string;
  location: string;
  date: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  price: number;
  currency: string;
  image: string;
}

export interface SavedItem {
  id: string;
  type: "treatment" | "wellness";
  name: string;
  provider: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  slug: string;
  savedAt: string;
}

export const notifications: Notification[] = [
  { id: "1", title: "Booking Confirmed", message: "Your dental implant consultation at Ankara Smile Clinic has been confirmed for March 15.", time: "2 hours ago", read: false, type: "booking" },
  { id: "2", title: "New Match Found", message: "We found a 97% match for your knee replacement search in Istanbul.", time: "5 hours ago", read: false, type: "success" },
  { id: "3", title: "Price Drop Alert", message: "Hair transplant at MedHair Istanbul dropped by 15% — now £1,275.", time: "1 day ago", read: true, type: "info" },
  { id: "4", title: "Document Reviewed", message: "Your medical records have been reviewed by Dr. Mehmet Öz.", time: "2 days ago", read: true, type: "success" },
  { id: "5", title: "Upcoming Appointment", message: "Reminder: Video consultation with Athens Fertility Centre tomorrow at 10:00 AM.", time: "3 days ago", read: true, type: "warning" },
];

export const bookings: Booking[] = [
  { id: "1", treatment: "Dental Implants", provider: "Ankara Smile Clinic", location: "Ankara, Turkey", date: "2026-03-15", status: "confirmed", price: 800, currency: "£", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400" },
  { id: "2", treatment: "Hair Transplant", provider: "MedHair Istanbul", location: "Istanbul, Turkey", date: "2026-04-02", status: "pending", price: 1500, currency: "£", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400" },
  { id: "3", treatment: "Knee Replacement", provider: "Istanbul Health Centre", location: "Istanbul, Turkey", date: "2025-12-10", status: "completed", price: 3200, currency: "£", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400" },
];

export const savedItems: SavedItem[] = [
  { id: "1", type: "treatment", name: "Rhinoplasty", provider: "Estetik Istanbul", location: "Istanbul, Turkey", price: 2800, currency: "£", rating: 4.8, image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400", slug: "rhinoplasty-istanbul", savedAt: "2 days ago" },
  { id: "2", type: "treatment", name: "IVF Treatment", provider: "Athens Fertility Centre", location: "Athens, Greece", price: 2500, currency: "£", rating: 4.7, image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400", slug: "ivf-athens", savedAt: "5 days ago" },
  { id: "3", type: "wellness", name: "Ayurvedic Retreat", provider: "Kerala Wellness", location: "Kerala, India", price: 1800, currency: "£", rating: 4.9, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400", slug: "ayurvedic-retreat-kerala", savedAt: "1 week ago" },
];

export interface HealthProfile {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  allergies: string;
  medications: string;
  conditions: string;
  preferredDestinations: string[];
  treatmentInterests: string[];
  travelCompanion: string;
  budgetRange: string;
}

export const defaultProfile: HealthProfile = {
  fullName: "James Wilson",
  email: "james.wilson@email.com",
  phone: "+44 7700 900123",
  dateOfBirth: "1985-06-15",
  gender: "Male",
  bloodType: "O+",
  allergies: "Penicillin",
  medications: "None",
  conditions: "Mild hypertension",
  preferredDestinations: ["Turkey", "Greece", "Thailand"],
  treatmentInterests: ["Dentistry", "Orthopaedics"],
  travelCompanion: "Partner",
  budgetRange: "£2,000 – £5,000",
};
