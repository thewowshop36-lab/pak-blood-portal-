export interface Donor {
  id?: string;
  name: string;
  blood_group: string;
  province: string;
  city: string;
  tehsil?: string;
  contact: string;
  whatsapp_number?: string;
  email?: string;
  availability: boolean;
  last_donated?: string;
  total_donations?: number;
  prayer_count?: number;
  verified?: boolean;
  notes?: string;
  created_at?: string;
}

export interface BloodRequest {
  id?: string;
  patient_name: string;
  blood_group: string;
  province: string;
  city: string;
  hospital: string;
  units_required: number;
  contact: string;
  urgency: 'فوری / Immediate' | 'آج ہی / Within Today' | 'کل تک / Within 24-48 Hours';
  notes?: string;
  is_fulfilled?: boolean;
  created_at?: string;
}
