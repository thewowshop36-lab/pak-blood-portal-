export interface Donor {
  id?: string;
  name: string;
  blood_group: string;
  province: string;
  city: string;
  tehsil?: string;
  area?: string;
  contact: string;
  phone?: string;
  whatsapp_number?: string;
  email?: string;
  availability?: boolean;
  last_donated?: string;
  total_donations?: number;
  prayer_count?: number;
  verified?: boolean;
  notes?: string;
  photo_url?: string;
  hospital_near?: string;
  created_at?: string;
}

export interface BloodRequest {
  id?: string;
  patient_name: string;
  blood_group: string;
  province: string;
  city: string;
  hospital: string;
  units_needed?: number;
  units_required?: number;
  contact_number?: string;
  contact: string;
  urgency: 'فوری / Immediate' | 'آج ہی / Within Today' | 'کل تک / Within 24-48 Hours' | string;
  note?: string;
  notes?: string;
  is_fulfilled?: boolean;
  created_at?: string;
}
