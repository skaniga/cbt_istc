'use client';

import { useState } from 'react';
import { updateParticipant, deleteParticipant } from './actions';

export default function PesertaClient({ initialParticipants }: { initialParticipants: any[] }) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    no_passport: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openEdit = (p: any) => {
    setEditingId(p.id);
    setFormData({
      nama_lengkap: p.nama_lengkap,
      no_passport: p.no_passport
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
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Manajemen Peserta</h1>
          <p style={{ color: 'var(--muted-fg)' }}>Kelola data peserta dan lihat hasil ujian mereka.</p>
        </div>
      </div>

      <div className="card" style={{ background: '#fff', padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-deep)', color: 'var(--fg)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '1rem', fontWeight: 600 }}>No. Peserta</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Nama Lengkap</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>No Passport / ID</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Tgl Daftar</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Skor</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {participants && participants.length > 0 ? (
                participants.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <td style={{ padding: '1rem', fontFamily: 'var(--font-display)', color: 'var(--brass)', fontWeight: 600 }}>
                      {p.nomor_peserta}
                    </td>
                    <td style={{ padding: '1rem' }}>{p.nama_lengkap}</td>
                    <td style={{ padding: '1rem', color: 'var(--muted-fg)' }}>{p.no_passport}</td>
                    <td style={{ padding: '1rem', color: 'var(--muted-fg)' }}>
                      {new Date(p.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {p.skor !== null ? (
                        <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{p.skor}</span>
                      ) : (
                        <span style={{ color: 'var(--muted-fg)' }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {p.skor !== null ? (
                        <span style={{ 
                          padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                          background: p.lulus ? '#E8F5E9' : '#FFEBEE',
                          color: p.lulus ? '#2E7D32' : '#C62828'
                        }}>
                          {p.lulus ? 'LULUS' : 'TIDAK LULUS'}
                        </span>
                      ) : (
                        <span style={{ 
                          padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                          background: 'var(--bg-alt)', color: 'var(--muted-fg)'
                        }}>
                          BELUM UJIAN
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => openEdit(p)} className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: '#F5F5F5', color: '#333' }}>Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: '#FFEBEE', color: '#C62828' }} disabled={loading}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
                    Belum ada peserta yang terdaftar.
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
