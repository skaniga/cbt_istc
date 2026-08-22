'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateParticipant(id: string, formData: FormData) {
  const supabase = await createClient();
  const nama_lengkap = formData.get('nama_lengkap') as string;
  const no_passport = formData.get('no_passport') as string;
  
  if (!nama_lengkap || !no_passport) {
    return { error: 'Nama Lengkap dan No Passport wajib diisi.' };
  }

  const { error } = await supabase.from('participants').update({
    nama_lengkap, no_passport
  }).eq('id', id);

  if (error) {
    console.error('Error updating participant:', error);
    return { error: 'Gagal memperbarui data peserta. Pastikan No Passport unik.' };
  }

  revalidatePath('/admin/peserta');
  return { success: true };
}

export async function deleteParticipant(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('participants').delete().eq('id', id);

  if (error) {
    console.error('Error deleting participant:', error);
    return { error: 'Gagal menghapus peserta.' };
  }

  revalidatePath('/admin/peserta');
  return { success: true };
}
