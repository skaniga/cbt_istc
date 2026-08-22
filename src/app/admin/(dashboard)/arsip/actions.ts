'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createEvent(formData: FormData) {
  const supabase = await createClient();
  const tahun = Number(formData.get('tahun'));
  const tema = formData.get('tema') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const tanggal_mulai = formData.get('tanggal_mulai') as string || null;
  const tanggal_selesai = formData.get('tanggal_selesai') as string || null;
  const jumlah_peserta = Number(formData.get('jumlah_peserta') || 0);
  const flyer_url = formData.get('flyer_url') as string || null;
  const lpj_url = formData.get('lpj_url') as string || null;
  const berita_acara_url = formData.get('berita_acara_url') as string || null;
  const status = formData.get('status') as string;

  if (!tahun || !tema) {
    return { error: 'Tahun dan Tema wajib diisi.' };
  }

  const { error } = await supabase.from('annual_events').insert({
    tahun, tema, deskripsi, tanggal_mulai, tanggal_selesai, jumlah_peserta, flyer_url, lpj_url, berita_acara_url, status
  });

  if (error) {
    console.error('Error creating event:', error);
    return { error: 'Gagal menambah arsip acara. Pastikan tahun unik.' };
  }

  revalidatePath('/admin/arsip');
  return { success: true };
}

export async function updateEvent(id: string, formData: FormData) {
  const supabase = await createClient();
  const tahun = Number(formData.get('tahun'));
  const tema = formData.get('tema') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const tanggal_mulai = formData.get('tanggal_mulai') as string || null;
  const tanggal_selesai = formData.get('tanggal_selesai') as string || null;
  const jumlah_peserta = Number(formData.get('jumlah_peserta') || 0);
  const flyer_url = formData.get('flyer_url') as string || null;
  const lpj_url = formData.get('lpj_url') as string || null;
  const berita_acara_url = formData.get('berita_acara_url') as string || null;
  const status = formData.get('status') as string;

  if (!tahun || !tema) {
    return { error: 'Tahun dan Tema wajib diisi.' };
  }

  const { error } = await supabase.from('annual_events').update({
    tahun, tema, deskripsi, tanggal_mulai, tanggal_selesai, jumlah_peserta, flyer_url, lpj_url, berita_acara_url, status
  }).eq('id', id);

  if (error) {
    console.error('Error updating event:', error);
    return { error: 'Gagal memperbarui arsip acara.' };
  }

  revalidatePath('/admin/arsip');
  return { success: true };
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('annual_events').delete().eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    return { error: 'Gagal menghapus arsip acara.' };
  }

  revalidatePath('/admin/arsip');
  return { success: true };
}
