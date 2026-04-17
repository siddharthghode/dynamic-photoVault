import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import adminApi from '../adminApi';

export default function Membership() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', features: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchAll = () => {
    setLoading(true);
    adminApi.get('/membership').then(res => setItems(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', price: '', features: '' });
    setError('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, price: item.price, features: (item.features || []).join('\n') });
    setError('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tier?')) return;
    await adminApi.delete(`/membership/${id}`);
    fetchAll();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name,
        price: parseFloat(form.price),
        features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
      };
      if (editing) {
        await adminApi.put(`/membership/${editing.id}`, payload);
      } else {
        await adminApi.post('/membership', payload);
      }
      setShowModal(false);
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Membership Tiers">
      <div className="admin-card card">
        <div className="card-header">
          <h5>Membership Tiers</h5>
          <button className="btn btn-purple btn-sm" onClick={openCreate}>+ Add New</button>
        </div>
        <div className="card-body p-0">
          {loading ? <div className="text-center py-5 text-muted">Loading...</div> : (
            <div className="table-responsive">
              <table className="table admin-table mb-0">
                <thead><tr><th>#</th><th>Name</th><th>Price</th><th>Features</th><th>Actions</th></tr></thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{idx + 1}</td>
                      <td><strong>{item.name}</strong></td>
                      <td>${item.price}</td>
                      <td>{(item.features || []).slice(0, 3).join(', ')}{item.features?.length > 3 ? '…' : ''}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => openEdit(item)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editing ? 'Edit Tier' : 'Add Tier'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {error && <div className="alert alert-danger py-2">{error}</div>}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Name</label>
                    <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Price ($)</label>
                    <input type="number" step="0.01" className="form-control" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Features <small className="text-muted">(one per line)</small></label>
                    <textarea className="form-control" rows={5} value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} placeholder={"Unlimited photos\nHD downloads\nPriority support"} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-purple" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
