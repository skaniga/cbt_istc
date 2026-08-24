'use client';

import { useState } from 'react';
import { createDocument, updateDocument, deleteDocument } from './actions';

export default function DokumenClient({ initialDocuments }: { initialDocuments: any[] }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    judul: '',
    jenis: 'juknis',
    tahun: new Date().getFullYear().toString(),
    file_url: '',
    deskripsi: '',
    publik: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setEditingId(null);
    setFormData({
      judul: '',
      jenis: 'juknis',
      tahun: new Date().getFullYear().toString(),
      file_url: '',
      deskripsi: '',
      publik: false
    });
    setError(null);
    setIsModalOpen(true);
  };

  const openEdit = (d: any) => {
    setEditingId(d.id);
    setFormData({
      judul: d.judul,
      jenis: d.jenis,
      tahun: String(d.tahun),
      file_url: d.file_url,
      deskripsi: d.deskripsi || '',
      publik: d.publik
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) return;
    setLoading(true);
    const res = await deleteDocument(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setDocuments(documents.filter(d => d.id !== id));
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
      res = await updateDocument(editingId, fd);
    } else {
      res = await createDocument(fd);
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
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dokumen & Berkas</h1>
          <p style={{ color: 'var(--muted-fg)' }}>Manajemen berkas administrasi dan penyelenggaraan ISTC.</p>
        </div>
        <button onClick={openCreate} className="btn btn--primary">
          + Tambah Dokumen
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-deep)', borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Tahun</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Judul Dokumen</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Jenis</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Akses</th>
              <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {documents && documents.length > 0 ? (
              documents.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                  <td style={{ padding: '1rem' }}>{doc.tahun}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--fg)' }}>{doc.judul}</div>
                    {doc.deskripsi && <div style={{ fontSize: '0.85rem', color: 'var(--muted-fg)' }}>{doc.deskripsi}</div>}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      background: 'var(--bg-alt)', padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', fontSize: '0.75rem', textTransform: 'uppercase',
                      fontWeight: 600, color: 'var(--brass)'
                    }}>
                      {doc.jenis.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {doc.publik ? (
                      <span style={{ color: '#2E7D32', fontWeight: 600, fontSize: '0.85rem' }}>Publik</span>
                    ) : (
                      <span style={{ color: 'var(--muted-fg)', fontSize: '0.85rem' }}>Internal</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: 'var(--brass)', color: '#fff' }}>Buka</a>
                      <button onClick={() => openEdit(doc)} className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: '#F5F5F5', color: '#333' }}>Edit</button>
                      <button onClick={() => handleDelete(doc.id)} className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: '#FFEBEE', color: '#C62828' }} disabled={loading}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
                  Belum ada dokumen yang diunggah.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', 
          alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="card" style={{ background: '#fff', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{editingId ? 'Edit Dokumen' : 'Tambah Dokumen'}</h2>
            
            {error && (
              <div style={{ padding: '1rem', background: '#FFF3F3', color: '#D8000C', marginBottom: '1.5rem', borderRadius: '4px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="label-text">Judul Dokumen</label>
                <input type="text" className="input" value={formData.judul} onChange={e => setFormData({...formData, judul: e.target.value})} required placeholder="Misal: Juknis Lomba 2025" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label-text">Jenis Dokumen</label>
                  <select className="input" value={formData.jenis} onChange={e => setFormData({...formData, jenis: e.target.value})}>
                    <option value="juknis">Juknis</option>
                    <option value="sop">SOP</option>
                    <option value="sk">SK Panitia / Juri</option>
                    <option value="proposal">Proposal</option>
                    <option value="tata_tertib">Tata Tertib</option>
                    <option value="pedoman_juri">Pedoman Juri</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Tahun</label>
                  <input type="number" className="input" value={formData.tahun} onChange={e => setFormData({...formData, tahun: e.target.value})} required />
                </div>
              </div>

              <div>
                <label className="label-text">URL File (Link Google Drive / PDF / Cloud)</label>
                <input type="url" className="input" value={formData.file_url} onChange={e => setFormData({...formData, file_url: e.target.value})} required placeholder="https://..." />
                <p style={{ fontSize: '0.8rem', color: 'var(--muted-fg)', marginTop: '0.25rem' }}>* Saat ini menggunakan sistem link eksternal untuk efisiensi penyimpanan.</p>
              </div>

              <div>
                <label className="label-text">Deskripsi Singkat (Opsional)</label>
                <textarea className="input" style={{ minHeight: '60px' }} value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} />
              </div>

              <div>
                <label className="label-text">Aksesibilitas</label>
                <select className="input" value={formData.publik ? 'true' : 'false'} onChange={e => setFormData({...formData, publik: e.target.value === 'true'})}>
                  <option value="false">Internal (Hanya Panitia)</option>
                  <option value="true">Publik (Bisa dilihat siapa saja)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn" style={{ background: '#eee', color: '#333' }}>Batal</button>
                <button type="submit" className="btn btn--primary" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan Dokumen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
