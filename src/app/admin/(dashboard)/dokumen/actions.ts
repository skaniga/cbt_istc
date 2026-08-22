'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createDocument(formData: FormData) {
  const supabase = await createClient();
  const judul = formData.get('judul') as string;
  const jenis = formData.get('jenis') as string;
  const tahun = Number(formData.get('tahun') || new Date().getFullYear());
  const file_url = formData.get('file_url') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const publik = formData.get('publik') === 'true';

  if (!judul || !jenis || !file_url) {
    return { error: 'Judul, Jenis, dan File URL wajib diisi.' };
  }

  const { error } = await supabase.from('documents').insert({
    judul, jenis, tahun, file_url, deskripsi, publik
  });

  if (error) {
    console.error('Error creating document:', error);
    return { error: 'Gagal menambah dokumen.' };
  }

  revalidatePath('/admin/dokumen');
  return { success: true };
}

export async function updateDocument(id: string, formData: FormData) {
  const supabase = await createClient();
  const judul = formData.get('judul') as string;
  const jenis = formData.get('jenis') as string;
  const tahun = Number(formData.get('tahun'));
  const file_url = formData.get('file_url') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const publik = formData.get('publik') === 'true';

  if (!judul || !jenis || !file_url) {
    return { error: 'Judul, Jenis, dan File URL wajib diisi.' };
  }

  const { error } = await supabase.from('documents').update({
    judul, jenis, tahun, file_url, deskripsi, publik
  }).eq('id', id);

  if (error) {
    console.error('Error updating document:', error);
    return { error: 'Gagal memperbarui dokumen.' };
  }

  revalidatePath('/admin/dokumen');
  return { success: true };
}

export async function deleteDocument(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('documents').delete().eq('id', id);

  if (error) {
    console.error('Error deleting document:', error);
    return { error: 'Gagal menghapus dokumen.' };
  }

  revalidatePath('/admin/dokumen');
  return { success: true };
}
