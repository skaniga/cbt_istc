'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function updateParticipant(id: string, formData: FormData) {
  const supabase = createAdminClient();
  const nama_lengkap = formData.get('nama_lengkap') as string;
  const no_passport  = formData.get('no_passport')  as string;
  const kategori     = formData.get('kategori')     as string | null;
  
  if (!nama_lengkap || !no_passport) {
    return { error: 'Nama Lengkap dan No Passport wajib diisi.' };
  }

  const updateData: Record<string, any> = { nama_lengkap, no_passport };
  if (kategori) updateData.kategori = kategori;

  const { error } = await supabase.from('participants').update(updateData).eq('id', id);

  if (error) {
    console.error('Error updating participant:', error);
    return { error: 'Gagal memperbarui data peserta. Pastikan No Passport unik.' };
  }

  revalidatePath('/admin/peserta');
  return { success: true };
}

export async function deleteParticipant(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('participants').delete().eq('id', id);

  if (error) {
    console.error('Error deleting participant:', error);
    return { error: 'Gagal menghapus peserta.' };
  }

  revalidatePath('/admin/peserta');
  return { success: true };
}
