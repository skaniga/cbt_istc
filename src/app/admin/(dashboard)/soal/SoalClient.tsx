'use client';

import { useState } from 'react';
import { createQuestion, updateQuestion, deleteQuestion, updateExamSettings } from './actions';

export default function SoalClient({ 
  initialQuestions, 
  initialBatasSoal, 
  initialAcakSoal 
}: { 
  initialQuestions: any[], 
  initialBatasSoal: string, 
  initialAcakSoal: string 
}) {
  const [questions, setQuestions] = useState(initialQuestions);
  
  // Exam Settings State
  const [batasSoal, setBatasSoal] = useState(initialBatasSoal);
  const [acakSoal, setAcakSoal] = useState(initialAcakSoal);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nomor_soal: '',
    pertanyaan: '',
    pilihan_a: '',
    pilihan_b: '',
    pilihan_c: '',
    pilihan_d: '',
    pertanyaan_en: '',
    pilihan_a_en: '',
    pilihan_b_en: '',
    pilihan_c_en: '',
    pilihan_d_en: '',
    pertanyaan_ms: '',
    pilihan_a_ms: '',
    pilihan_b_ms: '',
    pilihan_c_ms: '',
    pilihan_d_ms: '',
    kunci_jawaban: 'A',
    kategori: 'umum',
    bobot: '2',
    aktif: true
  });
  const [activeLangTab, setActiveLangTab] = useState<'id' | 'en' | 'ms'>('id');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setEditingId(null);
    setFormData({
      nomor_soal: String((questions[questions.length - 1]?.nomor_soal || 0) + 1),
      pertanyaan: '',
      pilihan_a: '',
      pilihan_b: '',
      pilihan_c: '',
      pilihan_d: '',
      pertanyaan_en: '',
      pilihan_a_en: '',
      pilihan_b_en: '',
      pilihan_c_en: '',
      pilihan_d_en: '',
      pertanyaan_ms: '',
      pilihan_a_ms: '',
      pilihan_b_ms: '',
      pilihan_c_ms: '',
      pilihan_d_ms: '',
      kunci_jawaban: 'A',
      kategori: 'umum',
      bobot: '2',
      aktif: true
    });
    setActiveLangTab('id');
    setError(null);
    setIsModalOpen(true);
  };

  const openEdit = (q: any) => {
    setEditingId(q.id);
    setFormData({
      nomor_soal: String(q.nomor_soal),
      pertanyaan: q.pertanyaan,
      pilihan_a: q.pilihan_a,
      pilihan_b: q.pilihan_b,
      pilihan_c: q.pilihan_c,
      pilihan_d: q.pilihan_d || '',
      pertanyaan_en: q.pertanyaan_en || '',
      pilihan_a_en: q.pilihan_a_en || '',
      pilihan_b_en: q.pilihan_b_en || '',
      pilihan_c_en: q.pilihan_c_en || '',
      pilihan_d_en: q.pilihan_d_en || '',
      pertanyaan_ms: q.pertanyaan_ms || '',
      pilihan_a_ms: q.pilihan_a_ms || '',
      pilihan_b_ms: q.pilihan_b_ms || '',
      pilihan_c_ms: q.pilihan_c_ms || '',
      pilihan_d_ms: q.pilihan_d_ms || '',
      kunci_jawaban: q.kunci_jawaban,
      kategori: q.kategori,
      bobot: String(q.bobot),
      aktif: q.aktif
    });
    setActiveLangTab('id');
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus soal ini?')) return;
    setLoading(true);
    const res = await deleteQuestion(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setQuestions(questions.filter(q => q.id !== id));
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, String(value));
    });

    let res;
    if (editingId) {
      res = await updateQuestion(editingId, fd);
    } else {
      res = await createQuestion(fd);
    }

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      // Reload page for simplicity to get fresh data
      window.location.reload();
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Question Management</h1>
          <p style={{ color: 'var(--muted-fg)' }}>Manage the question bank for CBT.</p>
        </div>
        <button onClick={openCreate} className="btn btn--primary">
          + Add Question
        </button>
      </div>

      <div className="card" style={{ background: '#fff', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Exam Settings</h2>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
          <div>
            <label className="label-text">Number of Questions to Display</label>
            <input 
              type="number" 
              className="input" 
              value={batasSoal} 
              onChange={e => setBatasSoal(e.target.value)} 
              style={{ width: '120px' }}
            />
          </div>
          <div>
            <label className="label-text">Randomize Questions</label>
            <select 
              className="input" 
              value={acakSoal} 
              onChange={e => setAcakSoal(e.target.value)}
              style={{ width: '150px' }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button 
            className="btn btn--secondary" 
            onClick={async () => {
              setIsSavingSettings(true);
              await updateExamSettings(batasSoal, acakSoal);
              setIsSavingSettings(false);
              alert('Exam settings updated!');
            }}
            disabled={isSavingSettings}
          >
            {isSavingSettings ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      <div className="card" style={{ background: '#fff', padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-deep)', color: 'var(--fg)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '1rem', fontWeight: 600, width: '5%' }}>No.</th>
                <th style={{ padding: '1rem', fontWeight: 600, width: '45%' }}>Pertanyaan</th>
                <th style={{ padding: '1rem', fontWeight: 600, width: '10%' }}>Kunci</th>
                <th style={{ padding: '1rem', fontWeight: 600, width: '10%' }}>Kategori</th>
                <th style={{ padding: '1rem', fontWeight: 600, width: '10%' }}>Status</th>
                <th style={{ padding: '1rem', fontWeight: 600, width: '20%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {questions && questions.length > 0 ? (
                questions.map((q) => (
                  <tr key={q.id} style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{q.nomor_soal}</td>
                    <td style={{ padding: '1rem', lineHeight: 1.5 }}>
                      {q.pertanyaan.length > 80 ? q.pertanyaan.substring(0, 80) + '...' : q.pertanyaan}
                    </td>
                    <td style={{ padding: '1rem', fontFamily: 'var(--font-display)', color: 'var(--brass)', fontWeight: 600 }}>
                      {q.kunci_jawaban}
                    </td>
                    <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{q.kategori}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                        background: q.aktif ? '#E8F5E9' : '#F5F5F5',
                        color: q.aktif ? '#2E7D32' : 'var(--muted-fg)'
                      }}>
                        {q.aktif ? 'AKTIF' : 'NON-AKTIF'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => openEdit(q)} className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: '#F5F5F5', color: '#333' }}>Edit</button>
                        <button onClick={() => handleDelete(q.id)} className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: '#FFEBEE', color: '#C62828' }} disabled={loading}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
                    Belum ada soal di database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', 
          alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="card" style={{ background: '#fff', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{editingId ? 'Edit Soal' : 'Tambah Soal Baru'}</h2>
            
            {error && (
              <div style={{ padding: '1rem', background: '#FFF3F3', color: '#D8000C', marginBottom: '1.5rem', borderRadius: '4px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label-text">Nomor Soal</label>
                  <input type="number" className="input" value={formData.nomor_soal} onChange={e => setFormData({...formData, nomor_soal: e.target.value})} required />
                </div>
                <div>
                  <label className="label-text">Kategori</label>
                  <select className="input" value={formData.kategori} onChange={e => setFormData({...formData, kategori: e.target.value})}>
                    <option value="umum">Umum</option>
                    <option value="teknik">Teknik</option>
                    <option value="estetika">Estetika</option>
                    <option value="sejarah">Sejarah</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Bobot Poin</label>
                  <input type="number" className="input" value={formData.bobot} onChange={e => setFormData({...formData, bobot: e.target.value})} required />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                <button type="button" onClick={() => setActiveLangTab('id')} style={{ fontWeight: activeLangTab === 'id' ? 600 : 400, color: activeLangTab === 'id' ? 'var(--brass)' : 'inherit', background: 'none', border: 'none', cursor: 'pointer' }}>Indonesia (Default)</button>
                <button type="button" onClick={() => setActiveLangTab('en')} style={{ fontWeight: activeLangTab === 'en' ? 600 : 400, color: activeLangTab === 'en' ? 'var(--brass)' : 'inherit', background: 'none', border: 'none', cursor: 'pointer' }}>English (EN)</button>
                <button type="button" onClick={() => setActiveLangTab('ms')} style={{ fontWeight: activeLangTab === 'ms' ? 600 : 400, color: activeLangTab === 'ms' ? 'var(--brass)' : 'inherit', background: 'none', border: 'none', cursor: 'pointer' }}>Melayu (MS)</button>
              </div>

              {activeLangTab === 'id' && (
                <>
                  <div>
                    <label className="label-text">Pertanyaan (ID)</label>
                    <textarea className="input" style={{ minHeight: '100px' }} value={formData.pertanyaan} onChange={e => setFormData({...formData, pertanyaan: e.target.value})} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="label-text">Pilihan A</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_a} onChange={e => setFormData({...formData, pilihan_a: e.target.value})} required />
                    </div>
                    <div>
                      <label className="label-text">Pilihan B</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_b} onChange={e => setFormData({...formData, pilihan_b: e.target.value})} required />
                    </div>
                    <div>
                      <label className="label-text">Pilihan C</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_c} onChange={e => setFormData({...formData, pilihan_c: e.target.value})} required />
                    </div>
                    <div>
                      <label className="label-text">Pilihan D</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_d} onChange={e => setFormData({...formData, pilihan_d: e.target.value})} required />
                    </div>
                  </div>
                </>
              )}

              {activeLangTab === 'en' && (
                <>
                  <div>
                    <label className="label-text">Pertanyaan (EN)</label>
                    <textarea className="input" style={{ minHeight: '100px' }} value={formData.pertanyaan_en} onChange={e => setFormData({...formData, pertanyaan_en: e.target.value})} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="label-text">Pilihan A (EN)</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_a_en} onChange={e => setFormData({...formData, pilihan_a_en: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-text">Pilihan B (EN)</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_b_en} onChange={e => setFormData({...formData, pilihan_b_en: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-text">Pilihan C (EN)</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_c_en} onChange={e => setFormData({...formData, pilihan_c_en: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-text">Pilihan D (EN)</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_d_en} onChange={e => setFormData({...formData, pilihan_d_en: e.target.value})} />
                    </div>
                  </div>
                </>
              )}

              {activeLangTab === 'ms' && (
                <>
                  <div>
                    <label className="label-text">Pertanyaan (MS)</label>
                    <textarea className="input" style={{ minHeight: '100px' }} value={formData.pertanyaan_ms} onChange={e => setFormData({...formData, pertanyaan_ms: e.target.value})} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="label-text">Pilihan A (MS)</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_a_ms} onChange={e => setFormData({...formData, pilihan_a_ms: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-text">Pilihan B (MS)</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_b_ms} onChange={e => setFormData({...formData, pilihan_b_ms: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-text">Pilihan C (MS)</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_c_ms} onChange={e => setFormData({...formData, pilihan_c_ms: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-text">Pilihan D (MS)</label>
                      <textarea className="input" style={{ minHeight: '60px' }} value={formData.pilihan_d_ms} onChange={e => setFormData({...formData, pilihan_d_ms: e.target.value})} />
                    </div>
                  </div>
                </>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label-text">Kunci Jawaban</label>
                  <select className="input" value={formData.kunci_jawaban} onChange={e => setFormData({...formData, kunci_jawaban: e.target.value})}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Status</label>
                  <select className="input" value={formData.aktif ? 'true' : 'false'} onChange={e => setFormData({...formData, aktif: e.target.value === 'true'})}>
                    <option value="true">Aktif</option>
                    <option value="false">Non-Aktif</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn" style={{ background: '#eee', color: '#333' }}>Batal</button>
                <button type="submit" className="btn btn--primary" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan Soal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
