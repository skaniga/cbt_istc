'use client';

import { useState, useMemo, useEffect } from 'react';
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
    kategori: 'Environmental Technology',
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
      kategori: 'Environmental Technology',
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

  // Pagination & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, statusFilter, itemsPerPage]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: questions.length,
      'Environmental Technology': 0,
      'Smart Robotics': 0,
      'Science In Action': 0,
      Mathematic: 0,
    };
    questions.forEach((q) => {
      if (counts[q.kategori] !== undefined) {
        counts[q.kategori]++;
      }
    });
    return counts;
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        String(q.nomor_soal).includes(query) ||
        q.pertanyaan?.toLowerCase().includes(query) ||
        q.pertanyaan_en?.toLowerCase().includes(query);

      const matchCategory =
        selectedCategory === 'ALL' || q.kategori === selectedCategory;

      const matchStatus =
        statusFilter === 'ALL'
          ? true
          : statusFilter === 'AKTIF'
          ? q.aktif === true
          : q.aktif === false;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [questions, searchQuery, selectedCategory, statusFilter]);

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedQuestions = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredQuestions.slice(start, start + itemsPerPage);
  }, [filteredQuestions, safeCurrentPage, itemsPerPage]);

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Question Management</h1>
          <p style={{ color: 'var(--muted-fg)', fontSize: '0.9rem' }}>
            Total {questions.length} soal di bank data · {filteredQuestions.length} soal sesuai filter
          </p>
        </div>
        <button onClick={openCreate} className="btn btn--primary">
          + Add Question
        </button>
      </div>

      {/* Category Pills / Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {[
          { key: 'ALL', label: 'Semua Bidang', icon: '📚' },
          { key: 'Environmental Technology', label: 'Environmental Tech', icon: '🌱' },
          { key: 'Smart Robotics', label: 'Smart Robotics', icon: '🤖' },
          { key: 'Science In Action', label: 'Science In Action', icon: '🔬' },
          { key: 'Mathematic', label: 'Mathematic', icon: '📐' },
        ].map((tab) => {
          const isActive = selectedCategory === tab.key;
          const count = categoryCounts[tab.key] || 0;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedCategory(tab.key)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                border: isActive ? '1px solid var(--brass)' : '1px solid var(--border)',
                background: isActive ? 'rgba(180, 130, 60, 0.12)' : '#fff',
                color: isActive ? 'var(--brass)' : 'var(--fg)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.1rem 0.4rem',
                borderRadius: '999px',
                background: isActive ? 'var(--brass)' : '#eee',
                color: isActive ? '#fff' : '#666',
                fontWeight: 700,
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Exam Settings & Filters Bar */}
      <div className="card" style={{ background: '#fff', marginBottom: '1.25rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
          
          {/* Search Box */}
          <div style={{ gridColumn: 'span 1' }}>
            <label className="label-text" style={{ fontSize: '0.75rem', marginBottom: '0.35rem', display: 'block' }}>Cari Pertanyaan / No.</label>
            <input
              type="text"
              placeholder="Cari teks soal atau nomor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="label-text" style={{ fontSize: '0.75rem', marginBottom: '0.35rem', display: 'block' }}>Status Soal</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="ALL">Semua Status</option>
              <option value="AKTIF">✓ Aktif</option>
              <option value="NONAKTIF">✕ Non-Aktif</option>
            </select>
          </div>

          {/* Items Per Page */}
          <div>
            <label className="label-text" style={{ fontSize: '0.75rem', marginBottom: '0.35rem', display: 'block' }}>Baris per Halaman</label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value={10}>10 per halaman</option>
              <option value={20}>20 per halaman</option>
              <option value={50}>50 per halaman</option>
              <option value={100}>100 per halaman</option>
            </select>
          </div>

          {/* Exam Configuration */}
          <div>
            <label className="label-text" style={{ fontSize: '0.75rem', marginBottom: '0.35rem', display: 'block' }}>Batas Tampil Ujian</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="number" 
                className="input" 
                value={batasSoal} 
                onChange={e => setBatasSoal(e.target.value)} 
                style={{ width: '80px', padding: '0.5rem' }}
              />
              <select 
                className="input" 
                value={acakSoal} 
                onChange={e => setAcakSoal(e.target.value)}
                style={{ padding: '0.5rem', fontSize: '0.8rem' }}
              >
                <option value="true">Acak: Ya</option>
                <option value="false">Acak: Tdk</option>
              </select>
              <button 
                className="btn btn--secondary" 
                onClick={async () => {
                  setIsSavingSettings(true);
                  await updateExamSettings(batasSoal, acakSoal);
                  setIsSavingSettings(false);
                  alert('Pengaturan ujian berhasil disimpan!');
                }}
                disabled={isSavingSettings}
                style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                {isSavingSettings ? '...' : 'Simpan'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ background: '#fff', padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-deep)', color: 'var(--fg)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, width: '8%' }}>No.</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, width: '45%' }}>Pertanyaan</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, width: '8%' }}>Kunci</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, width: '15%' }}>Kategori</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, width: '10%' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, width: '14%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                if (!paginatedQuestions || paginatedQuestions.length === 0) {
                  return (
                    <tr>
                      <td colSpan={6} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
                        Tidak ada soal yang cocok dengan kriteria pencarian / filter.
                      </td>
                    </tr>
                  );
                }

                return paginatedQuestions.map((q) => {
                  return (
                    <tr key={q.id} style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                        {q.nomor_soal}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', lineHeight: 1.5 }}>
                        <p style={{ margin: 0, fontWeight: 500 }}>
                          {q.pertanyaan?.length > 90 ? q.pertanyaan.substring(0, 90) + '...' : q.pertanyaan}
                        </p>
                        {q.pertanyaan_en && (
                          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: 'var(--muted-fg)', fontStyle: 'italic' }}>
                            EN: {q.pertanyaan_en.length > 70 ? q.pertanyaan_en.substring(0, 70) + '...' : q.pertanyaan_en}
                          </p>
                        )}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-display)', color: 'var(--brass)', fontWeight: 700, fontSize: '1rem' }}>
                        {q.kunci_jawaban}
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{
                          fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '999px',
                          background: 'rgba(180,130,60,0.1)', color: 'var(--brass)',
                          border: '1px solid var(--brass)', fontWeight: 600, whiteSpace: 'nowrap'
                        }}>
                          {q.kategori === 'Environmental Technology' ? '🌱' : q.kategori === 'Smart Robotics' ? '🤖' : q.kategori === 'Science In Action' ? '🔬' : '📐'}
                          {' '}{q.kategori}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                        <span style={{ 
                          padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600,
                          background: q.aktif ? '#E8F5E9' : '#F5F5F5',
                          color: q.aktif ? '#2E7D32' : 'var(--muted-fg)'
                        }}>
                          {q.aktif ? 'AKTIF' : 'NON-AKTIF'}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => openEdit(q)} className="btn" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', background: '#F5F5F5', color: '#333' }}>Edit</button>
                          <button onClick={() => handleDelete(q.id)} className="btn" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', background: '#FFEBEE', color: '#C62828' }} disabled={loading}>Hapus</button>
                        </div>
                      </td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>

        {/* Pagination Navigation Footer */}
        {filteredQuestions.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.25rem',
            borderTop: '1px solid var(--border)',
            background: '#FAF9F6',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--muted-fg)' }}>
              Menampilkan {Math.min((safeCurrentPage - 1) * itemsPerPage + 1, filteredQuestions.length)} – {Math.min(safeCurrentPage * itemsPerPage, filteredQuestions.length)} dari {filteredQuestions.length} soal
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                disabled={safeCurrentPage <= 1}
                className="btn"
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.8rem',
                  background: safeCurrentPage <= 1 ? '#eee' : '#fff',
                  color: safeCurrentPage <= 1 ? '#aaa' : '#333',
                  cursor: safeCurrentPage <= 1 ? 'not-allowed' : 'pointer',
                  border: '1px solid var(--border)'
                }}
              >
                « Awal
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={safeCurrentPage <= 1}
                className="btn"
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  background: safeCurrentPage <= 1 ? '#eee' : '#fff',
                  color: safeCurrentPage <= 1 ? '#aaa' : '#333',
                  cursor: safeCurrentPage <= 1 ? 'not-allowed' : 'pointer',
                  border: '1px solid var(--border)'
                }}
              >
                ‹ Sebelumnya
              </button>

              <span style={{
                padding: '0.35rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '4px'
              }}>
                Halaman {safeCurrentPage} dari {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage >= totalPages}
                className="btn"
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  background: safeCurrentPage >= totalPages ? '#eee' : '#fff',
                  color: safeCurrentPage >= totalPages ? '#aaa' : '#333',
                  cursor: safeCurrentPage >= totalPages ? 'not-allowed' : 'pointer',
                  border: '1px solid var(--border)'
                }}
              >
                Selanjutnya ›
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(totalPages)}
                disabled={safeCurrentPage >= totalPages}
                className="btn"
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.8rem',
                  background: safeCurrentPage >= totalPages ? '#eee' : '#fff',
                  color: safeCurrentPage >= totalPages ? '#aaa' : '#333',
                  cursor: safeCurrentPage >= totalPages ? 'not-allowed' : 'pointer',
                  border: '1px solid var(--border)'
                }}
              >
                Akhir »
              </button>
            </div>
          </div>
        )}
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
                  <label className="label-text">Bidang / Kategori</label>
                  <select className="input" value={formData.kategori} onChange={e => setFormData({...formData, kategori: e.target.value})}>
                    <option value="Environmental Technology">🌱 Environmental Technology</option>
                    <option value="Smart Robotics">🤖 Smart Robotics</option>
                    <option value="Science In Action">🔬 Science In Action</option>
                    <option value="Mathematic">📐 Mathematic</option>
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
