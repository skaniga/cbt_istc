'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createVenue(formData: FormData) {
  const supabase = await createClient();
  const nama = formData.get('nama') as string;
  const jenis = formData.get('jenis') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const lokasi = formData.get('lokasi') as string;
  const kapasitas = formData.get('kapasitas') ? Number(formData.get('kapasitas')) : null;
  const foto_url = formData.get('foto_url') ? [formData.get('foto_url') as string] : [];
  const denah_url = formData.get('denah_url') as string;
  const aktif = formData.get('aktif') === 'true';

  if (!nama || !jenis) {
    return { error: 'Nama dan Jenis wajib diisi.' };
  }

  const { error } = await supabase.from('venues').insert({
    nama, jenis, deskripsi, lokasi, kapasitas, foto_url, denah_url, aktif
  });

  if (error) {
    console.error('Error creating venue:', error);
    return { error: 'Gagal menambah sarana.' };
  }

  revalidatePath('/admin/sarana');
  return { success: true };
}

export async function updateVenue(id: string, formData: FormData) {
  const supabase = await createClient();
  const nama = formData.get('nama') as string;
  const jenis = formData.get('jenis') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const lokasi = formData.get('lokasi') as string;
  const kapasitas = formData.get('kapasitas') ? Number(formData.get('kapasitas')) : null;
  const foto_url = formData.get('foto_url') ? [formData.get('foto_url') as string] : [];
  const denah_url = formData.get('denah_url') as string;
  const aktif = formData.get('aktif') === 'true';

  if (!nama || !jenis) {
    return { error: 'Nama dan Jenis wajib diisi.' };
  }

  const { error } = await supabase.from('venues').update({
    nama, jenis, deskripsi, lokasi, kapasitas, foto_url, denah_url, aktif
  }).eq('id', id);

  if (error) {
    console.error('Error updating venue:', error);
    return { error: 'Gagal memperbarui sarana.' };
  }

  revalidatePath('/admin/sarana');
  return { success: true };
}

export async function deleteVenue(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('venues').delete().eq('id', id);

  if (error) {
    console.error('Error deleting venue:', error);
    return { error: 'Gagal menghapus sarana.' };
  }

  revalidatePath('/admin/sarana');
  return { success: true };
}
