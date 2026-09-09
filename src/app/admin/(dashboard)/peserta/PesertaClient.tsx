'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { updateParticipant, deleteParticipant } from './actions';

export default function PesertaClient({ initialParticipants }: { initialParticipants: any[] }) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    no_passport: '',
    kategori: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, statusFilter, itemsPerPage]);

  const filteredParticipants = useMemo(() => {
    return participants.filter(p => {
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q ||
        p.nama_lengkap?.toLowerCase().includes(q) ||
        p.nomor_peserta?.toLowerCase().includes(q) ||
        p.no_passport?.toLowerCase().includes(q);

      const matchCategory = selectedCategory === 'ALL' || p.kategori === selectedCategory;

      const matchStatus =
        statusFilter === 'ALL' ? true :
        statusFilter === 'LULUS' ? (p.skor !== null && p.lulus === true) :
        statusFilter === 'TIDAK LULUS' ? (p.skor !== null && p.lulus === false) :
        statusFilter === 'BELUM UJIAN' ? (p.skor === null) : true;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [participants, searchQuery, selectedCategory, statusFilter]);

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedParticipants = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredParticipants.slice(start, start + itemsPerPage);
  }, [filteredParticipants, safeCurrentPage, itemsPerPage]);

  const openEdit = (p: any) => {
    setEditingId(p.id);
    setFormData({
      nama_lengkap: p.nama_lengkap,
      no_passport: p.no_passport,
      kategori: p.kategori || ''
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus peserta ini?')) return;
    setLoading(true);
    const res = await deleteParticipant(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setParticipants(participants.filter(p => p.id !== id));
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    
    setLoading(true);
    setError(null);

    const fd = new FormData();
    fd.append('nama_lengkap', formData.nama_lengkap);
    fd.append('no_passport', formData.no_passport);
    fd.append('kategori', formData.kategori);

    const res = await updateParticipant(editingId, fd);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Manajemen Peserta</h1>
          <p style={{ color: 'var(--muted-fg)', fontSize: '0.9rem' }}>
            Total {participants.length} peserta terdaftar · Ditemukan {filteredParticipants.length} data sesuai filter
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ background: '#fff', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
          
          {/* Search Box */}
          <div>
            <label className="label-text" style={{ fontSize: '0.75rem', marginBottom: '0.35rem', display: 'block' }}>Pencarian Peserta</label>
            <input
              type="text"
              placeholder="Cari nama, no. peserta, paspor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="label-text" style={{ fontSize: '0.75rem', marginBottom: '0.35rem', display: 'block' }}>Bidang Kompetisi</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="ALL">Semua Bidang ({participants.length})</option>
              <option value="Environmental Technology">🌱 Environmental Tech</option>
              <option value="Smart Robotics">🤖 Smart Robotics</option>
              <option value="Science In Action">🔬 Science In Action</option>
              <option value="Mathematic">📐 Mathematic</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="label-text" style={{ fontSize: '0.75rem', marginBottom: '0.35rem', display: 'block' }}>Status Hasil Ujian</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="ALL">Semua Status</option>
              <option value="LULUS">✓ Lulus</option>
              <option value="TIDAK LULUS">✕ Tidak Lulus</option>
              <option value="BELUM UJIAN">⏳ Belum Ujian</option>
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

        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ background: '#fff', padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-deep)', color: 'var(--fg)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>No. Peserta</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Nama Lengkap</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>No Passport / ID</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Bidang</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Tgl Daftar</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Skor</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedParticipants && paginatedParticipants.length > 0 ? (
                paginatedParticipants.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-display)', color: 'var(--brass)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {p.nomor_peserta}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 500 }}>{p.nama_lengkap}</td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--muted-fg)', whiteSpace: 'nowrap' }}>{p.no_passport}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      {p.kategori ? (
                        <span style={{
                          fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '999px',
                          background: 'rgba(180,130,60,0.1)', color: 'var(--brass)',
                          border: '1px solid var(--brass)', fontWeight: 600, whiteSpace: 'nowrap'
                        }}>
                          {p.kategori === 'Environmental Technology' ? '🌱' : p.kategori === 'Smart Robotics' ? '🤖' : p.kategori === 'Science In Action' ? '🔬' : '📐'}
                          {' '}{p.kategori}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--muted-fg)', fontSize: '0.8rem' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--muted-fg)', whiteSpace: 'nowrap' }}>
                      {new Date(p.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {p.skor !== null ? (
                        <span style={{ fontSize: '1rem', fontWeight: 600 }}>{p.skor}</span>
                      ) : (
                        <span style={{ color: 'var(--muted-fg)' }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      {p.skor !== null ? (
                        <span style={{ 
                          padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600,
                          background: p.lulus ? '#E8F5E9' : '#FFEBEE',
                          color: p.lulus ? '#2E7D32' : '#C62828'
                        }}>
                          {p.lulus ? 'LULUS' : 'TIDAK LULUS'}
                        </span>
                      ) : (
                        <span style={{ 
                          padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600,
                          background: 'var(--bg-alt)', color: 'var(--muted-fg)'
                        }}>
                          BELUM UJIAN
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                        <Link
                          href={`/admin/preview/sertifikat?id=${p.id}`}
                          target="_blank"
                          className="btn"
                          style={{
                            padding: '0.25rem 0.55rem',
                            fontSize: '0.75rem',
                            background: 'rgba(200, 148, 26, 0.12)',
                            color: '#92400E',
                            border: '1px solid rgba(200, 148, 26, 0.35)',
                            textDecoration: 'none',
                            fontWeight: 600,
                          }}
                          title="Lihat & Download Sertifikat Peserta"
                        >
                          🎓 Sertifikat
                        </Link>
                        <Link
                          href={`/certificate/${(p.nomor_peserta || '').replace(/\//g, '-')}`}
                          target="_blank"
                          className="btn"
                          style={{
                            padding: '0.25rem 0.55rem',
                            fontSize: '0.75rem',
                            background: '#F0F4F8',
                            color: '#1E3A8A',
                            border: '1px solid #D0DCE5',
                            textDecoration: 'none',
                          }}
                          title="Verifikasi QR Keaslian Sertifikat"
                        >
                          ✓ Cek QR
                        </Link>
                        <button onClick={() => openEdit(p)} className="btn" style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', background: '#F5F5F5', color: '#333' }}>Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="btn" style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', background: '#FFEBEE', color: '#C62828' }} disabled={loading}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
                    Tidak ada peserta yang cocok dengan kriteria pencarian / filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Navigation Footer */}
        {filteredParticipants.length > 0 && (
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
              Menampilkan {Math.min((safeCurrentPage - 1) * itemsPerPage + 1, filteredParticipants.length)} – {Math.min(safeCurrentPage * itemsPerPage, filteredParticipants.length)} dari {filteredParticipants.length} peserta
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
          <div className="card" style={{ background: '#fff', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Edit Data Peserta</h2>
            
            {error && (
              <div style={{ padding: '1rem', background: '#FFF3F3', color: '#D8000C', marginBottom: '1.5rem', borderRadius: '4px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="label-text">Nama Lengkap</label>
                <input type="text" className="input" value={formData.nama_lengkap} onChange={e => setFormData({...formData, nama_lengkap: e.target.value})} required />
              </div>
              <div>
                <label className="label-text">No Passport / ID</label>
                <input type="text" className="input" value={formData.no_passport} onChange={e => setFormData({...formData, no_passport: e.target.value})} required />
              </div>
              <div>
                <label className="label-text">Bidang Kompetisi</label>
                <select className="input" value={formData.kategori} onChange={e => setFormData({...formData, kategori: e.target.value})}>
                  <option value="">— Pilih Bidang —</option>
                  <option value="Environmental Technology">🌱 Environmental Technology</option>
                  <option value="Smart Robotics">🤖 Smart Robotics</option>
                  <option value="Science In Action">🔬 Science In Action</option>
                  <option value="Mathematic">📐 Mathematic</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn" style={{ background: '#eee', color: '#333' }}>Batal</button>
                <button type="submit" className="btn btn--primary" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
