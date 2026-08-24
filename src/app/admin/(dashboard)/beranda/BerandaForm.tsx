'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { updateBerandaSettings } from './actions'

export default function BerandaForm({
  initialConfig
}: {
  initialConfig: Record<string, string>
}) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const form = e.currentTarget
      const formData = new FormData(form)

      // Handle Hero Image Upload
      const heroFile = formData.get('hero_file') as File
      if (heroFile && heroFile.size > 0) {
        if (heroFile.size > 2 * 1024 * 1024) {
          throw new Error('Ukuran foto Hero maksimal 2MB')
        }
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(heroFile.type)) {
          throw new Error('Format foto Hero harus JPG, PNG, atau WEBP')
        }

        const fileExt = heroFile.name.split('.').pop()
        const fileName = `hero_${Math.random()}.${fileExt}`
        const { error: uploadError, data } = await supabase.storage
          .from('public')
          .upload(`beranda/${fileName}`, heroFile)
        
        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase.storage
          .from('public')
          .getPublicUrl(`beranda/${fileName}`)

        formData.set('hero_image_url', publicUrlData.publicUrl)
      }

      // Handle About Image Upload
      const aboutFile = formData.get('about_file') as File
      if (aboutFile && aboutFile.size > 0) {
        if (aboutFile.size > 2 * 1024 * 1024) {
          throw new Error('Ukuran foto Galeri/Tentang maksimal 2MB')
        }
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(aboutFile.type)) {
          throw new Error('Format foto Galeri/Tentang harus JPG, PNG, atau WEBP')
        }

        const fileExt = aboutFile.name.split('.').pop()
        const fileName = `about_${Math.random()}.${fileExt}`
        const { error: uploadError, data } = await supabase.storage
          .from('public')
          .upload(`beranda/${fileName}`, aboutFile)
        
        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase.storage
          .from('public')
          .getPublicUrl(`beranda/${fileName}`)

        formData.set('about_image_url', publicUrlData.publicUrl)
      }

      // Clean up files so they don't get sent to server action (it's not needed there)
      formData.delete('hero_file')
      formData.delete('about_file')

      const result = await updateBerandaSettings(formData)
      if (result?.error) {
        throw new Error(result.error)
      }

      setMessage('Pengaturan berhasil disimpan.')
    } catch (err: any) {
      console.error(err)
      setMessage(err.message || 'Terjadi kesalahan saat menyimpan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
      
      {message && (
        <div style={{ padding: '1rem', background: message.includes('berhasil') ? '#E8F5E9' : '#FFEBEE', color: message.includes('berhasil') ? '#2E7D32' : '#C62828', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nama Lomba</label>
        <input 
          type="text" 
          name="nama_lomba" 
          defaultValue={initialConfig['nama_lomba'] || 'International Science and Technology Competitions'}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Tahun Aktif</label>
        <input 
          type="text" 
          name="tahun_aktif" 
          defaultValue={initialConfig['tahun_aktif'] || '2025'}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Judul Utama (Hero Title)</label>
        <textarea 
          name="hero_title" 
          defaultValue={initialConfig['hero_title'] || ''}
          placeholder="Kosongkan untuk menggunakan judul bawaan (multibahasa)"
          style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', minHeight: '80px', fontFamily: 'inherit' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Sub-judul (Hero Subtitle)</label>
        <textarea 
          name="hero_subtitle" 
          defaultValue={initialConfig['hero_subtitle'] || ''}
          placeholder="Kosongkan untuk menggunakan sub-judul bawaan (multibahasa)"
          style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', minHeight: '80px', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-alt)' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Foto Hero (Bagian Atas)</h3>
        {initialConfig['hero_image_url'] && (
          <div style={{ marginBottom: '1rem' }}>
            <img src={initialConfig['hero_image_url']} alt="Current Hero" style={{ maxWidth: '200px', borderRadius: '4px' }} />
          </div>
        )}
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Upload Foto Baru</label>
        <input 
          type="file" 
          name="hero_file" 
          accept="image/*"
        />
        <p style={{ fontSize: '0.8rem', color: 'var(--muted-fg)', marginTop: '0.5rem' }}>Kosongkan jika tidak ingin mengubah foto saat ini.</p>
      </div>

      <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-alt)' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Bagian Tentang / Galeri</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Judul Tentang</label>
          <input 
            type="text" 
            name="about_title" 
            defaultValue={initialConfig['about_title'] || ''}
            placeholder="Kosongkan untuk bawaan"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Isi / Deskripsi Tentang</label>
          <textarea 
            name="about_desc" 
            defaultValue={initialConfig['about_desc'] || ''}
            placeholder="Kosongkan untuk bawaan"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', minHeight: '120px', fontFamily: 'inherit' }}
          />
        </div>

        {initialConfig['about_image_url'] && (
          <div style={{ marginBottom: '1rem' }}>
            <img src={initialConfig['about_image_url']} alt="Current About" style={{ maxWidth: '200px', borderRadius: '4px' }} />
          </div>
        )}
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Upload Foto Baru</label>
        <input 
          type="file" 
          name="about_file" 
          accept="image/*"
        />
        <p style={{ fontSize: '0.8rem', color: 'var(--muted-fg)', marginTop: '0.5rem' }}>Kosongkan jika tidak ingin mengubah foto saat ini.</p>
      </div>

      <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-alt)' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Sertifikat — Tanda Tangan</h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nama Ketua / Penandatangan</label>
          <input
            type="text"
            name="nama_ketua"
            defaultValue={initialConfig['nama_ketua'] || 'Committee'}
            placeholder="Contoh: Dr. Ahmad Fauzi"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Jabatan Penandatangan</label>
          <input
            type="text"
            name="jabatan_ketua"
            defaultValue={initialConfig['jabatan_ketua'] || 'KETUA PENYELENGGARA'}
            placeholder="Contoh: KETUA PENYELENGGARA"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
          />
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-fg)', marginTop: '0.5rem' }}>Teks ini muncul di bawah tanda tangan pada sertifikat peserta.</p>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="btn btn--primary"
        style={{ marginTop: '1rem' }}
      >
        {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
      </button>

    </form>
  )
}
