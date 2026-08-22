'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createQuestion(formData: FormData) {
  const supabase = await createClient();
  const nomor_soal = Number(formData.get('nomor_soal'));
  const pertanyaan = formData.get('pertanyaan') as string;
  const pilihan_a = formData.get('pilihan_a') as string;
  const pilihan_b = formData.get('pilihan_b') as string;
  const pilihan_c = formData.get('pilihan_c') as string;
  const pilihan_d = formData.get('pilihan_d') as string;
  const kunci_jawaban = formData.get('kunci_jawaban') as string;
  const kategori = formData.get('kategori') as string;
  const bobot = Number(formData.get('bobot') || 2);
  const aktif = formData.get('aktif') === 'true';

  if (!pertanyaan || !pilihan_a || !pilihan_b || !pilihan_c || !pilihan_d || !kunci_jawaban) {
    return { error: 'Semua field wajib diisi.' };
  }

  const { error } = await supabase.from('questions').insert({
    nomor_soal, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, kunci_jawaban, kategori, bobot, aktif
  });

  if (error) {
    console.error('Error creating question:', error);
    return { error: 'Gagal menambah soal. Pastikan nomor soal unik jika diperlukan.' };
  }

  revalidatePath('/admin/soal');
  return { success: true };
}

export async function updateQuestion(id: string, formData: FormData) {
  const supabase = await createClient();
  const nomor_soal = Number(formData.get('nomor_soal'));
  const pertanyaan = formData.get('pertanyaan') as string;
  const pilihan_a = formData.get('pilihan_a') as string;
  const pilihan_b = formData.get('pilihan_b') as string;
  const pilihan_c = formData.get('pilihan_c') as string;
  const pilihan_d = formData.get('pilihan_d') as string;
  const kunci_jawaban = formData.get('kunci_jawaban') as string;
  const kategori = formData.get('kategori') as string;
  const bobot = Number(formData.get('bobot') || 2);
  const aktif = formData.get('aktif') === 'true';

  if (!pertanyaan || !pilihan_a || !pilihan_b || !pilihan_c || !pilihan_d || !kunci_jawaban) {
    return { error: 'Semua field wajib diisi.' };
  }

  const { error } = await supabase.from('questions').update({
    nomor_soal, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, kunci_jawaban, kategori, bobot, aktif
  }).eq('id', id);

  if (error) {
    console.error('Error updating question:', error);
    return { error: 'Gagal memperbarui soal.' };
  }

  revalidatePath('/admin/soal');
  return { success: true };
}

export async function deleteQuestion(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('questions').delete().eq('id', id);

  if (error) {
    console.error('Error deleting question:', error);
    return { error: 'Gagal menghapus soal.' };
  }

  revalidatePath('/admin/soal');
  return { success: true };
}
