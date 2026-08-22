'use client';

import { useState } from 'react';
import { createEvent, updateEvent, deleteEvent } from './actions';

export default function ArsipClient({ initialEvents }: { initialEvents: any[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    tahun: new Date().getFullYear().toString(),
    tema: '',
    deskripsi: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
    jumlah_peserta: '',
    flyer_url: '',
    lpj_url: '',
    berita_acara_url: '',
    status: 'aktif'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setEditingId(null);
    setFormData({
      tahun: new Date().getFullYear().toString(),
      tema: '',
      deskripsi: '',
      tanggal_mulai: '',
      tanggal_selesai: '',
      jumlah_peserta: '',
      flyer_url: '',
      lpj_url: '',
      berita_acara_url: '',
      status: 'aktif'
    });
    setError(null);
    setIsModalOpen(true);
  };

  const openEdit = (e: any) => {
    setEditingId(e.id);
    setFormData({
      tahun: String(e.tahun),
      tema: e.tema || '',
      deskripsi: e.deskripsi || '',
      tanggal_mulai: e.tanggal_mulai ? new Date(e.tanggal_mulai).toISOString().split('T')[0] : '',
      tanggal_selesai: e.tanggal_selesai ? new Date(e.tanggal_selesai).toISOString().split('T')[0] : '',
      jumlah_peserta: e.jumlah_peserta ? String(e.jumlah_peserta) : '0',
      flyer_url: e.flyer_url || '',
      lpj_url: e.lpj_url || '',
      berita_acara_url: e.berita_acara_url || '',
      status: e.status
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus arsip acara ini?')) return;
    setLoading(true);
    const res = await deleteEvent(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setEvents(events.filter(e => e.id !== id));
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
      res = await updateEvent(editingId, fd);
    } else {
      res = await createEvent(fd);
    }

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
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Arsip Penyelenggaraan</h1>
          <p style={{ color: 'var(--muted-fg)' }}>Rekapitulasi data IPE dari tahun ke tahun.</p>
        </div>
        <button onClick={openCreate} className="btn btn--primary">
          + Tambah Arsip
        </button>
      </div>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {events && events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {event.flyer_url ? (
                <div style={{ 
                  height: '160px', 
                  backgroundImage: `url(${event.flyer_url})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  borderBottom: '1px solid var(--border)'
                }} />
              ) : (
                <div style={{ 
                  height: '160px', 
                  background: 'var(--bg-deep)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--muted-fg)', fontSize: '0.9rem',
                  borderBottom: '1px solid var(--border)'
                }}>Tidak ada flyer</div>
              )}
              
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Edisi {event.tahun}</h2>
                  <span style={{ 
                    background: event.status === 'arsip' ? 'var(--bg-alt)' : '#e6f4ea', 
                    color: event.status === 'arsip' ? 'var(--muted-fg)' : '#1e8e3e',
                    padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' 
                  }}>
                    {event.status.toUpperCase()}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '1.1rem', color: 'var(--brass)', marginBottom: '1rem' }}>{event.tema}</h3>
                
                <p style={{ color: 'var(--muted-fg)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {event.deskripsi}
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', textTransform: 'uppercase' }}>Peserta</div>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{event.jumlah_peserta}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', textTransform: 'uppercase' }}>Pelaksanaan</div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{event.tanggal_mulai ? new Date(event.tanggal_mulai).getFullYear() : '-'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {event.lpj_url && (
                    <a href={event.lpj_url} target="_blank" rel="noopener noreferrer" className="btn" style={{ flexGrow: 1, textAlign: 'center', fontSize: '0.8rem', padding: '0.5rem', background: '#eee', color: '#333' }}>
                      Unduh LPJ
                    </a>
                  )}
                  {event.berita_acara_url && (
                    <a href={event.berita_acara_url} target="_blank" rel="noopener noreferrer" className="btn" style={{ flexGrow: 1, textAlign: 'center', fontSize: '0.8rem', padding: '0.5rem', background: '#eee', color: '#333' }}>
                      Berita Acara
                    </a>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEdit(event)} className="btn btn--secondary" style={{ flexGrow: 1, fontSize: '0.8rem', padding: '0.5rem' }}>
                    Edit Arsip
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="btn" style={{ flexGrow: 1, fontSize: '0.8rem', padding: '0.5rem', background: '#FFEBEE', color: '#C62828' }} disabled={loading}>
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
           <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
             <p style={{ color: 'var(--muted-fg)' }}>Belum ada data arsip penyelenggaraan.</p>
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
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{editingId ? 'Edit Arsip Acara' : 'Tambah Arsip Acara'}</h2>
            
            {error && (
              <div style={{ padding: '1rem', background: '#FFF3F3', color: '#D8000C', marginBottom: '1.5rem', borderRadius: '4px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div>
                  <label className="label-text">Tahun Acara</label>
                  <input type="number" className="input" value={formData.tahun} onChange={e => setFormData({...formData, tahun: e.target.value})} required />
                </div>
                <div>
                  <label className="label-text">Tema Utama</label>
                  <input type="text" className="input" value={formData.tema} onChange={e => setFormData({...formData, tema: e.target.value})} required />
                </div>
              </div>

              <div>
                <label className="label-text">Deskripsi Singkat</label>
                <textarea className="input" style={{ minHeight: '60px' }} value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label-text">Tanggal Mulai</label>
                  <input type="date" className="input" value={formData.tanggal_mulai} onChange={e => setFormData({...formData, tanggal_mulai: e.target.value})} />
                </div>
                <div>
                  <label className="label-text">Tanggal Selesai</label>
                  <input type="date" className="input" value={formData.tanggal_selesai} onChange={e => setFormData({...formData, tanggal_selesai: e.target.value})} />
                </div>
                <div>
                  <label className="label-text">Jumlah Peserta</label>
                  <input type="number" className="input" value={formData.jumlah_peserta} onChange={e => setFormData({...formData, jumlah_peserta: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label-text">URL Flyer / Banner</label>
                  <input type="url" className="input" value={formData.flyer_url} onChange={e => setFormData({...formData, flyer_url: e.target.value})} />
                </div>
                <div>
                  <label className="label-text">URL LPJ</label>
                  <input type="url" className="input" value={formData.lpj_url} onChange={e => setFormData({...formData, lpj_url: e.target.value})} />
                </div>
                <div>
                  <label className="label-text">URL Berita Acara</label>
                  <input type="url" className="input" value={formData.berita_acara_url} onChange={e => setFormData({...formData, berita_acara_url: e.target.value})} />
                </div>
                <div>
                  <label className="label-text">Status</label>
                  <select className="input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="aktif">Aktif (Sedang/Akan Berlangsung)</option>
                    <option value="selesai">Selesai</option>
                    <option value="arsip">Arsip (Sudah Lewat)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn" style={{ background: '#eee', color: '#333' }}>Batal</button>
                <button type="submit" className="btn btn--primary" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan Arsip'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
