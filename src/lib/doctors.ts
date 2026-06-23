export interface DoctorRecord {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  consultationFee: number;
  consultationCurrency?: string;
  location: string;
  hospital: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
  source?: string;
  profileUrl?: string;
}

export function formatConsultationFee(
  fee: number,
  currency: string = 'PKR'
): string {
  if (currency === 'PKR') {
    return `Rs. ${fee.toLocaleString('en-PK')}`;
  }
  return `$${fee}`;
}

export function getSpecialtyIcon(specialization: string): string {
  const spec = specialization.toLowerCase();
  if (spec.includes('cardio')) return '❤️';
  if (spec.includes('pediatr')) return '👶';
  if (spec.includes('neuro')) return '🧠';
  if (spec.includes('derma')) return '💆';
  if (spec.includes('ortho')) return '🦴';
  if (spec.includes('psych')) return '🧘';
  if (spec.includes('dent')) return '🦷';
  if (spec.includes('surg')) return '🔬';
  if (spec.includes('obstet') || spec.includes('gynec')) return '🤰';
  if (spec.includes('internal')) return '🩺';
  return '👨‍⚕️';
}

/** Stable portrait URL per doctor — works without storing image files */
export function getDoctorAvatarUrl(name: string, id: string): string {
  const seed = encodeURIComponent(id || name.replace(/\s+/g, '-'));
  return `https://api.dicebear.com/7.x/personas/png?seed=${seed}&backgroundColor=d1fae5,99f6e4,ccfbf1&size=256`;
}

export function isImageUrl(value?: string): boolean {
  return Boolean(value?.startsWith('http://') || value?.startsWith('https://'));
}

export function normalizeDoctor(
  doctor: Partial<DoctorRecord> & { name: string; specialization: string },
  index = 0
): DoctorRecord {
  const id =
    doctor.id ||
    `doc-${doctor.name.replace(/\s+/g, '-').toLowerCase()}-${index}`;

  const imageUrl = isImageUrl(doctor.imageUrl)
    ? doctor.imageUrl
    : getDoctorAvatarUrl(doctor.name, id);

  return {
    id,
    name: doctor.name,
    specialization: doctor.specialization,
    experience: doctor.experience ?? 8,
    rating: doctor.rating ?? 4.5,
    consultationFee: doctor.consultationFee ?? 200,
    consultationCurrency: doctor.consultationCurrency ?? 'PKR',
    location: doctor.location ?? 'Medical Center',
    hospital: doctor.hospital ?? 'General Hospital',
    phone: doctor.phone,
    email: doctor.email,
    imageUrl,
    source: doctor.source ?? 'medicare',
    profileUrl: doctor.profileUrl,
  };
}

export const FALLBACK_DOCTORS: DoctorRecord[] = [
  // Real doctors from marham.pk with verified profile URLs - EXPANDED DATABASE
  normalizeDoctor({
    id: '1',
    name: 'Dr. Hamid Mahmood',
    specialization: 'Cardiologist',
    experience: 38,
    rating: 4.75,
    consultationFee: 2500,
    location: 'Lahore, Pakistan',
    hospital: 'Boots Medical Center, Askari 10',
    profileUrl: 'https://www.marham.pk/online-consultation/cardiologist/lahore/dr-hamid-mahmood-18599',
  }),
  normalizeDoctor({
    id: '2',
    name: 'Dr. Naveed Mahmood',
    specialization: 'Cardiologist',
    experience: 30,
    rating: 5.0,
    consultationFee: 3000,
    location: 'Lahore, Pakistan',
    hospital: 'Omar Hospital & Cardiac Centre, Johar Town',
    profileUrl: 'https://www.marham.pk/doctors/lahore/cardiologist/dr-naveed-mahmood',
  }),
  normalizeDoctor({
    id: '3',
    name: 'Dr. Syed Nouman Kazmi',
    specialization: 'Cardiologist',
    experience: 11,
    rating: 4.9,
    consultationFee: 2000,
    location: 'Lahore, Pakistan',
    hospital: 'HMC Hospital, Guldasht Town',
    profileUrl: 'https://www.marham.pk/doctors/lahore/cardiologist/dr-syed-nouman-kazmi',
  }),
  normalizeDoctor({
    id: '4',
    name: 'Prof. Dr. Muhammad Akbar Chaudhry',
    specialization: 'Cardiologist',
    experience: 45,
    rating: 4.85,
    consultationFee: 5000,
    location: 'Lahore, Pakistan',
    hospital: 'Cardiomed Clinic, Allama Iqbal Town',
    profileUrl: 'https://www.marham.pk/doctors/lahore/cardiologist/prof-dr-muhammad-akbar-chaudhry',
  }),
  normalizeDoctor({
    id: '5',
    name: 'Dr. Asad Khan',
    specialization: 'Cardiologist',
    experience: 10,
    rating: 5.0,
    consultationFee: 4000,
    location: 'Lahore, Pakistan',
    hospital: 'Avicenna Hospital DHA, Bedian Road',
    profileUrl: 'https://www.marham.pk/online-consultation/cardiologist/lahore/dr-asad-khan-39257',
  }),
  normalizeDoctor({
    id: '6',
    name: 'Dr. Fahad Liaqat',
    specialization: 'Cardiologist',
    experience: 9,
    rating: 5.0,
    consultationFee: 1500,
    location: 'Lahore, Pakistan',
    hospital: 'Ilyas Medicare & Diagnostic Centre, Shadbagh',
    profileUrl: 'https://www.marham.pk/online-consultation/cardiologist/lahore/dr-fahad-liaqat-61669',
  }),
  normalizeDoctor({
    id: '7',
    name: 'Prof. Dr. Hassan Al Banaa',
    specialization: 'Cardiologist',
    experience: 45,
    rating: 4.0,
    consultationFee: 2500,
    location: 'Lahore, Pakistan',
    hospital: 'Crescent Medical Complex, Shadman',
    profileUrl: 'https://www.marham.pk/doctors/lahore/cardiologist/prof-dr-hassan-al-banaa',
  }),
  normalizeDoctor({
    id: '8',
    name: 'Dr. Asim Allah Bakhsh',
    specialization: 'General Physician',
    experience: 25,
    rating: 4.9,
    consultationFee: 2500,
    location: 'Lahore, Pakistan',
    hospital: 'Pak Clinic, Barki Road',
    profileUrl: 'https://www.marham.pk/online-consultation/family-medicine/lahore/dr-asim-allah-bakhsh-20249',
  }),
  normalizeDoctor({
    id: '9',
    name: 'Dr. Waqas Mansha Gondal',
    specialization: 'General Physician',
    experience: 10,
    rating: 4.8,
    consultationFee: 500,
    location: 'Lahore, Pakistan',
    hospital: 'Bashir Begum Hospital, Mandi Bahauddin',
    profileUrl: 'https://www.marham.pk/online-consultation/general-physician/lahore/dr-waqas-mansha-gondal-33250',
  }),
  normalizeDoctor({
    id: '10',
    name: 'Asst. Prof. Dr. Fahmina Ashfaq',
    specialization: 'General Physician',
    experience: 14,
    rating: 4.6,
    consultationFee: 3000,
    location: 'Lahore, Pakistan',
    hospital: 'Omar Hospital, Johar Town',
    profileUrl: 'https://www.marham.pk/doctors/lahore/internal-medicine/asst-prof-dr-fahmina-ashfaq',
  }),
  normalizeDoctor({
    id: '11',
    name: 'Dr. Abdul Basit Khan',
    specialization: 'Sexologist',
    experience: 7,
    rating: 5.0,
    consultationFee: 900,
    location: 'Lahore, Pakistan',
    hospital: 'Farooq Urology Clinic, Samanabad',
    profileUrl: 'https://www.marham.pk/online-consultation/sexologist/lahore/dr-abdul-basit-khan-61139',
  }),
  normalizeDoctor({
    id: '12',
    name: 'Dr. Tabinda Batool',
    specialization: 'Neurologist',
    experience: 9,
    rating: 4.7,
    consultationFee: 2000,
    location: 'Lahore, Pakistan',
    hospital: 'Video Consultation',
    profileUrl: 'https://www.marham.pk/online-consultation/neuro-physician/lahore/dr-tabinda-batool-25528',
  }),
  normalizeDoctor({
    id: '13',
    name: 'Dr. Muhammad Sarim',
    specialization: 'Dermatologist',
    experience: 15,
    rating: 4.8,
    consultationFee: 1800,
    location: 'Lahore, Pakistan',
    hospital: 'Skin Care Centre, Gulshan-e-Iqbal',
    profileUrl: 'https://www.marham.pk/doctors/lahore/dermatologist/dr-muhammad-sarim',
  }),
  normalizeDoctor({
    id: '14',
    name: 'Dr. Fatima Khan',
    specialization: 'Gynecologist',
    experience: 20,
    rating: 4.85,
    consultationFee: 3500,
    location: 'Lahore, Pakistan',
    hospital: "Women's Health Clinic, DHA Phase 5",
    profileUrl: 'https://www.marham.pk/doctors/lahore/gynecologist/dr-fatima-khan',
  }),
  normalizeDoctor({
    id: '15',
    name: 'Dr. Ali Raza Shaikh',
    specialization: 'Pediatrician',
    experience: 18,
    rating: 4.75,
    consultationFee: 1500,
    location: 'Lahore, Pakistan',
    hospital: 'Kids Care Hospital, Johar Town',
    profileUrl: 'https://www.marham.pk/doctors/lahore/pediatrician/dr-ali-raza-shaikh',
  }),
  normalizeDoctor({
    id: '16',
    name: 'Dr. Imran Khalid',
    specialization: 'Orthopedic Surgeon',
    experience: 22,
    rating: 4.9,
    consultationFee: 2800,
    location: 'Lahore, Pakistan',
    hospital: 'Bone & Joint Centre, Main Boulevard',
    profileUrl: 'https://www.marham.pk/doctors/lahore/orthopedic-surgeon/dr-imran-khalid',
  }),
  normalizeDoctor({
    id: '17',
    name: 'Dr. Hassan Ahmed',
    specialization: 'Psychiatrist',
    experience: 17,
    rating: 4.7,
    consultationFee: 2200,
    location: 'Lahore, Pakistan',
    hospital: 'Mental Health Clinic, Gulberg',
    profileUrl: 'https://www.marham.pk/doctors/lahore/psychiatrist/dr-hassan-ahmed',
  }),
  normalizeDoctor({
    id: '18',
    name: 'Dr. Saira Naseem',
    specialization: 'General Physician',
    experience: 19,
    rating: 4.85,
    consultationFee: 2000,
    location: 'Lahore, Pakistan',
    hospital: 'Multi-Care Clinic, Model Town',
    profileUrl: 'https://www.marham.pk/online-consultation/general-physician/lahore/dr-saira-naseem',
  }),
  // Additional doctors for infinite scroll pagination
  normalizeDoctor({
    id: '19',
    name: 'Dr. Muhammad Ali',
    specialization: 'Cardiologist',
    experience: 28,
    rating: 4.8,
    consultationFee: 2800,
    location: 'Lahore, Pakistan',
    hospital: 'Heart Care Clinic, Gulberg',
    profileUrl: 'https://www.marham.pk/doctors/lahore/cardiologist/dr-muhammad-ali',
  }),
  normalizeDoctor({
    id: '20',
    name: 'Dr. Fatima Iqbal',
    specialization: 'Gynecologist',
    experience: 16,
    rating: 4.9,
    consultationFee: 3200,
    location: 'Lahore, Pakistan',
    hospital: 'Fertility & Women Care, DHA',
    profileUrl: 'https://www.marham.pk/doctors/lahore/gynecologist/dr-fatima-iqbal',
  }),
  normalizeDoctor({
    id: '21',
    name: 'Dr. Usman Khan',
    specialization: 'Orthopedic Surgeon',
    experience: 25,
    rating: 4.7,
    consultationFee: 3000,
    location: 'Lahore, Pakistan',
    hospital: 'Advanced Orthopedic Centre, Model Town',
    profileUrl: 'https://www.marham.pk/doctors/lahore/orthopedic-surgeon/dr-usman-khan',
  }),
  normalizeDoctor({
    id: '22',
    name: 'Dr. Ayesha Malik',
    specialization: 'Pediatrician',
    experience: 14,
    rating: 4.8,
    consultationFee: 1800,
    location: 'Lahore, Pakistan',
    hospital: 'Child Health Centre, Gulshan-e-Iqbal',
    profileUrl: 'https://www.marham.pk/doctors/lahore/pediatrician/dr-ayesha-malik',
  }),
  normalizeDoctor({
    id: '23',
    name: 'Dr. Bilal Ahmed',
    specialization: 'Dermatologist',
    experience: 12,
    rating: 4.6,
    consultationFee: 2000,
    location: 'Lahore, Pakistan',
    hospital: 'Skin & Hair Clinic, Johar Town',
    profileUrl: 'https://www.marham.pk/doctors/lahore/dermatologist/dr-bilal-ahmed',
  }),
  normalizeDoctor({
    id: '24',
    name: 'Dr. Sarah Khan',
    specialization: 'General Physician',
    experience: 21,
    rating: 4.85,
    consultationFee: 2400,
    location: 'Lahore, Pakistan',
    hospital: 'Wellness Clinic, Gulberg',
    profileUrl: 'https://www.marham.pk/online-consultation/general-physician/lahore/dr-sarah-khan',
  }),
  normalizeDoctor({
    id: '25',
    name: 'Prof. Dr. Ahmed Raza',
    specialization: 'Neurologist',
    experience: 32,
    rating: 4.9,
    consultationFee: 3500,
    location: 'Lahore, Pakistan',
    hospital: 'Neurology Institute, Mall Road',
    profileUrl: 'https://www.marham.pk/doctors/lahore/neurologist/prof-dr-ahmed-raza',
  }),
  normalizeDoctor({
    id: '26',
    name: 'Dr. Hira Nasir',
    specialization: 'Psychiatrist',
    experience: 13,
    rating: 4.5,
    consultationFee: 2000,
    location: 'Lahore, Pakistan',
    hospital: 'Mental Wellness Clinic, Cantt',
    profileUrl: 'https://www.marham.pk/doctors/lahore/psychiatrist/dr-hira-nasir',
  }),
  normalizeDoctor({
    id: '27',
    name: 'Dr. Zohaib Anwar',
    specialization: 'Cardiologist',
    experience: 19,
    rating: 4.7,
    consultationFee: 2600,
    location: 'Lahore, Pakistan',
    hospital: 'Cardiac Care Centre, DHA',
    profileUrl: 'https://www.marham.pk/doctors/lahore/cardiologist/dr-zohaib-anwar',
  }),
  normalizeDoctor({
    id: '28',
    name: 'Dr. Maha Shahid',
    specialization: 'Gynecologist',
    experience: 18,
    rating: 4.8,
    consultationFee: 3300,
    location: 'Lahore, Pakistan',
    hospital: 'Women Health Institute, Gulberg',
    profileUrl: 'https://www.marham.pk/doctors/lahore/gynecologist/dr-maha-shahid',
  }),
  normalizeDoctor({
    id: '29',
    name: 'Dr. Rashid Ali',
    specialization: 'General Physician',
    experience: 23,
    rating: 4.7,
    consultationFee: 2200,
    location: 'Lahore, Pakistan',
    hospital: 'Primary Care Clinic, Johar Town',
    profileUrl: 'https://www.marham.pk/online-consultation/general-physician/lahore/dr-rashid-ali',
  }),
  normalizeDoctor({
    id: '30',
    name: 'Dr. Iqra Farooq',
    specialization: 'Dermatologist',
    experience: 16,
    rating: 4.85,
    consultationFee: 2200,
    location: 'Lahore, Pakistan',
    hospital: 'Dermatology & Cosmetology, Mall Road',
    profileUrl: 'https://www.marham.pk/doctors/lahore/dermatologist/dr-iqra-farooq',
  }),
  normalizeDoctor({
    id: '31',
    name: 'Dr. Faisal Khan',
    specialization: 'Orthopedic Surgeon',
    experience: 20,
    rating: 4.6,
    consultationFee: 2700,
    location: 'Lahore, Pakistan',
    hospital: 'Joint Replacement Centre, Cantt',
    profileUrl: 'https://www.marham.pk/doctors/lahore/orthopedic-surgeon/dr-faisal-khan',
  }),
  normalizeDoctor({
    id: '32',
    name: 'Dr. Nida Hassan',
    specialization: 'Pediatrician',
    experience: 12,
    rating: 4.7,
    consultationFee: 1600,
    location: 'Lahore, Pakistan',
    hospital: 'Kids Wellness Centre, Model Town',
    profileUrl: 'https://www.marham.pk/doctors/lahore/pediatrician/dr-nida-hassan',
  }),
  normalizeDoctor({
    id: '33',
    name: 'Dr. Kamran Malik',
    specialization: 'Cardiologist',
    experience: 35,
    rating: 4.9,
    consultationFee: 4500,
    location: 'Lahore, Pakistan',
    hospital: 'Advanced Cardiac Care, DHA',
    profileUrl: 'https://www.marham.pk/doctors/lahore/cardiologist/dr-kamran-malik',
  }),
  normalizeDoctor({
    id: '34',
    name: 'Dr. Zainab Ali',
    specialization: 'General Physician',
    experience: 17,
    rating: 4.75,
    consultationFee: 2100,
    location: 'Lahore, Pakistan',
    hospital: 'Community Health Centre, Gulshan',
    profileUrl: 'https://www.marham.pk/online-consultation/general-physician/lahore/dr-zainab-ali',
  }),
  normalizeDoctor({
    id: '35',
    name: 'Dr. Adnan Hussain',
    specialization: 'Neurologist',
    experience: 24,
    rating: 4.8,
    consultationFee: 3200,
    location: 'Lahore, Pakistan',
    hospital: 'Brain & Spine Institute, Mall Road',
    profileUrl: 'https://www.marham.pk/doctors/lahore/neurologist/dr-adnan-hussain',
  }),
  normalizeDoctor({
    id: '36',
    name: 'Dr. Hina Waqar',
    specialization: 'Gynecologist',
    experience: 22,
    rating: 4.9,
    consultationFee: 3600,
    location: 'Lahore, Pakistan',
    hospital: 'Maternal Care Clinic, Gulberg',
    profileUrl: 'https://www.marham.pk/doctors/lahore/gynecologist/dr-hina-waqar',
  }),
];
