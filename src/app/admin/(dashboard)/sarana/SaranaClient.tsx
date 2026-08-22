'use client';

import { useState } from 'react';
import { createVenue, updateVenue, deleteVenue } from './actions';

export default function SaranaClient({ initialVenues }: { initialVenues: any[] }) {
  const [venues, setVenues] = useState(initialVenues);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nama: '',
    jenis: 'venue',
    deskripsi: '',
    lokasi: '',
    kapasitas: '',
    foto_url: '',
    denah_url: '',
    aktif: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setEditingId(null);
    setFormData({
      nama: '',
      jenis: 'venue',
      deskripsi: '',
      lokasi: '',
      kapasitas: '',
      foto_url: '',
      denah_url: '',
      aktif: true
    });
    setError(null);
    setIsModalOpen(true);
  };

  const openEdit = (v: any) => {
    setEditingId(v.id);
    setFormData({
      nama: v.nama,
      jenis: v.jenis,
      deskripsi: v.deskripsi || '',
      lokasi: v.lokasi || '',
      kapasitas: v.kapasitas ? String(v.kapasitas) : '',
      foto_url: (v.foto_url && v.foto_url.length > 0) ? v.foto_url[0] : '',
      denah_url: v.denah_url || '',
      aktif: v.aktif
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus sarana ini?')) return;
    setLoading(true);
    const res = await deleteVenue(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setVenues(venues.filter(v => v.id !== id));
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
      res = await updateVenue(editingId, fd);
    } else {
      res = await createVenue(fd);
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
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Sarana & Prasarana</h1>
          <p style={{ color: 'var(--muted-fg)' }}>Katalog lokasi, peralatan, dan fasilitas pendukung acara.</p>
        </div>
        <button onClick={openCreate} className="btn btn--primary">
          + Tambah Sarana
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {venues && venues.length > 0 ? (
          venues.map((item) => (
            <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {item.foto_url && item.foto_url.length > 0 ? (
                <div style={{ 
                  height: '200px', 
                  backgroundImage: `url(${item.foto_url[0]})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center'
                }} />
              ) : (
                <div style={{ 
                  height: '200px', 
                  background: 'var(--bg-deep)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--muted-fg)', fontSize: '0.9rem'
                }}>Tidak ada foto</div>
              )}
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{item.nama}</h3>
                  <span style={{ 
                    background: 'var(--bg-alt)', color: 'var(--brass)', 
                    padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {item.jenis}
                  </span>
                </div>
                
                {item.lokasi && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 600 }}>
                    📍 {item.lokasi} {item.kapasitas ? `(Kapasitas: ${item.kapasitas})` : ''}
                  </p>
                )}
                
                <p style={{ color: 'var(--muted-fg)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {item.deskripsi}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {item.denah_url && (
                    <a href={item.denah_url} target="_blank" rel="noopener noreferrer" className="btn" style={{ flexGrow: 1, textAlign: 'center', fontSize: '0.8rem', padding: '0.5rem', background: '#eee', color: '#333' }}>
                      Lihat Denah
                    </a>
                  )}
                  <button onClick={() => openEdit(item)} className="btn btn--secondary" style={{ flexGrow: 1, fontSize: '0.8rem', padding: '0.5rem' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="btn" style={{ fontSize: '0.8rem', padding: '0.5rem', background: '#FFEBEE', color: '#C62828' }} disabled={loading}>
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
             <p style={{ color: 'var(--muted-fg)' }}>Belum ada data sarana/prasarana yang diinput.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', 
          alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="card" style={{ background: '#fff', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{editingId ? 'Edit Sarana' : 'Tambah Sarana'}</h2>
            
            {error && (
              <div style={{ padding: '1rem', background: '#FFF3F3', color: '#D8000C', marginBottom: '1.5rem', borderRadius: '4px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="label-text">Nama Sarana / Prasarana</label>
                <input type="text" className="input" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label-text">Jenis</label>
                  <select className="input" value={formData.jenis} onChange={e => setFormData({...formData, jenis: e.target.value})}>
                    <option value="venue">Venue / Lokasi Ujian</option>
                    <option value="peralatan">Peralatan (Kamera, PC, dll)</option>
                    <option value="fasilitas">Fasilitas Pendukung</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Kapasitas (Opsional)</label>
                  <input type="number" className="input" value={formData.kapasitas} onChange={e => setFormData({...formData, kapasitas: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="label-text">Lokasi (Alamat / Ruangan)</label>
                <input type="text" className="input" value={formData.lokasi} onChange={e => setFormData({...formData, lokasi: e.target.value})} />
              </div>

              <div>
                <label className="label-text">Deskripsi</label>
                <textarea className="input" style={{ minHeight: '60px' }} value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} />
              </div>

              <div>
                <label className="label-text">URL Foto (Opsional)</label>
                <input type="url" className="input" value={formData.foto_url} onChange={e => setFormData({...formData, foto_url: e.target.value})} />
              </div>

              <div>
                <label className="label-text">URL Denah (Opsional)</label>
                <input type="url" className="input" value={formData.denah_url} onChange={e => setFormData({...formData, denah_url: e.target.value})} />
              </div>

              <div>
                <label className="label-text">Status</label>
                <select className="input" value={formData.aktif ? 'true' : 'false'} onChange={e => setFormData({...formData, aktif: e.target.value === 'true'})}>
                  <option value="true">Tersedia (Aktif)</option>
                  <option value="false">Tidak Tersedia (Non-Aktif)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn" style={{ background: '#eee', color: '#333' }}>Batal</button>
                <button type="submit" className="btn btn--primary" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan Sarana'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
