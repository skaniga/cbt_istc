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

  const pertanyaan_en = formData.get('pertanyaan_en') as string || null;
  const pilihan_a_en = formData.get('pilihan_a_en') as string || null;
  const pilihan_b_en = formData.get('pilihan_b_en') as string || null;
  const pilihan_c_en = formData.get('pilihan_c_en') as string || null;
  const pilihan_d_en = formData.get('pilihan_d_en') as string || null;
  
  const pertanyaan_ms = formData.get('pertanyaan_ms') as string || null;
  const pilihan_a_ms = formData.get('pilihan_a_ms') as string || null;
  const pilihan_b_ms = formData.get('pilihan_b_ms') as string || null;
  const pilihan_c_ms = formData.get('pilihan_c_ms') as string || null;
  const pilihan_d_ms = formData.get('pilihan_d_ms') as string || null;

  if (!pertanyaan || !pilihan_a || !pilihan_b || !pilihan_c || !pilihan_d || !kunci_jawaban) {
    return { error: 'Semua field wajib diisi.' };
  }

  const { error } = await supabase.from('questions').insert({
    nomor_soal, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, kunci_jawaban, kategori, bobot, aktif,
    pertanyaan_en, pilihan_a_en, pilihan_b_en, pilihan_c_en, pilihan_d_en,
    pertanyaan_ms, pilihan_a_ms, pilihan_b_ms, pilihan_c_ms, pilihan_d_ms
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

  const pertanyaan_en = formData.get('pertanyaan_en') as string || null;
  const pilihan_a_en = formData.get('pilihan_a_en') as string || null;
  const pilihan_b_en = formData.get('pilihan_b_en') as string || null;
  const pilihan_c_en = formData.get('pilihan_c_en') as string || null;
  const pilihan_d_en = formData.get('pilihan_d_en') as string || null;
  
  const pertanyaan_ms = formData.get('pertanyaan_ms') as string || null;
  const pilihan_a_ms = formData.get('pilihan_a_ms') as string || null;
  const pilihan_b_ms = formData.get('pilihan_b_ms') as string || null;
  const pilihan_c_ms = formData.get('pilihan_c_ms') as string || null;
  const pilihan_d_ms = formData.get('pilihan_d_ms') as string || null;

  if (!pertanyaan || !pilihan_a || !pilihan_b || !pilihan_c || !pilihan_d || !kunci_jawaban) {
    return { error: 'Semua field wajib diisi.' };
  }

  const { error } = await supabase.from('questions').update({
    nomor_soal, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, kunci_jawaban, kategori, bobot, aktif,
    pertanyaan_en, pilihan_a_en, pilihan_b_en, pilihan_c_en, pilihan_d_en,
    pertanyaan_ms, pilihan_a_ms, pilihan_b_ms, pilihan_c_ms, pilihan_d_ms
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

export async function updateExamSettings(batasSoal: string, acakSoal: string) {
  const supabase = await createClient();

  const saveConfig = async (kunci: string, nilai: string) => {
    // Try update first
    const { data: existing } = await supabase
      .from('system_config')
      .select('kunci')
      .eq('kunci', kunci)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('system_config')
        .update({ nilai })
        .eq('kunci', kunci);
      return error;
    } else {
      const { error } = await supabase
        .from('system_config')
        .insert({ kunci, nilai });
      return error;
    }
  };

  const err1 = await saveConfig('batas_soal', batasSoal);
  if (err1) {
    console.error('Error saving batas_soal:', err1);
    return { error: 'Gagal memperbarui batas soal: ' + err1.message };
  }

  const err2 = await saveConfig('acak_soal', acakSoal);
  if (err2) {
    console.error('Error saving acak_soal:', err2);
    return { error: 'Gagal memperbarui acak soal: ' + err2.message };
  }

  revalidatePath('/admin/soal');
  return { success: true };
}
