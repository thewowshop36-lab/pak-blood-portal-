import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://mvqnekaobsyreegkouca.supabase.co";
const SUPABASE_KEY = "sb_publishable_WuDQresEEX_duONM1RwKbg_zVYtxoV0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Normalizes an object by removing hidden unicode characters
 */
export function normalizeRow<T = any>(raw: any): T {
  if (!raw || typeof raw !== 'object') return raw;
  const clean: any = {};
  for (const [k, v] of Object.entries(raw)) {
    const cleanKey = k.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
    clean[cleanKey] = v;
  }
  if (!clean.blood_group && clean.bloodgroup) clean.blood_group = clean.bloodgroup;
  if (!clean.bloodgroup && clean.blood_group) clean.bloodgroup = clean.blood_group;
  if (!clean.phone && clean.contact) clean.phone = clean.contact;
  if (!clean.contact && clean.phone) clean.contact = clean.phone;
  return clean as T;
}

/**
 * Resilient request insertion that handles hidden characters in column names
 */
export async function insertRequestSafe(payload: {
  patient_name: string;
  blood_group: string;
  province: string;
  city: string;
  hospital: string;
  contact: string;
  urgency: string;
}) {
  let res = await supabase.from('requests').insert([payload]).select();

  if (res.error && (res.error.code === 'PGRST204' || res.error.message?.includes('schema cache'))) {
    const zwspPayload: Record<string, any> = {};
    for (const [k, v] of Object.entries(payload)) {
      zwspPayload['\u200b' + k] = v;
    }
    res = await supabase.from('requests').insert([zwspPayload]).select();
  }

  if (res.data) {
    res.data = res.data.map(normalizeRow);
  }
  return res;
}

/**
 * Resilient donor insertion
 */
export async function insertDonorSafe(payload: {
  name: string;
  blood_group?: string;
  bloodgroup?: string;
  province: string;
  city: string;
  phone: string;
  tehsil?: string | null;
  area?: string | null;
  hospital_near?: string | null;
}) {
  const bg = payload.bloodgroup || payload.blood_group || 'O+';
  const cleanPhone = payload.phone.trim();

  let res = await supabase.from('donors').insert([{
    name: payload.name.trim(),
    bloodgroup: bg,
    province: payload.province,
    city: payload.city,
    phone: cleanPhone
  }]).select();

  if (res.error && (res.error.code === 'PGRST204' || res.error.message?.includes('bloodgroup'))) {
    res = await supabase.from('donors').insert([{
      name: payload.name.trim(),
      blood_group: bg,
      province: payload.province,
      city: payload.city,
      phone: cleanPhone
    }]).select();
  }

  if (res.data) {
    res.data = res.data.map(normalizeRow);
  }
  return res;
}
