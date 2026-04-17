import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import adminApi from '../adminApi';

// endpoint = base path for POST/PUT/DELETE  e.g. "sliders"
// fetchEndpoint = path for GET list, may include query params e.g. "sliders?all=true"
export default function CrudPage({ title, endpoint, fetchEndpoint, fields, imageField }) {
  const listPath = fetchEndpoint || endpoint;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchAll = () => {
    setLoading(true);
    adminApi.get(`/${listPath}`)
      .then(res => setItems(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, [listPath]);

  const openCreate = () => {
    setEditing(null);
    setForm({});
    setImageFile(null);
    setPreview(null);
    setError('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item });
    setImageFile(null);
    setPreview(item[imageField] ? `http://localhost:8080/uploads/${item[imageField]}` : null);
    setError('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await adminApi.delete(`/${endpoint}/${id}`);
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const data = new FormData();
      fields.forEach(f => {
        if (form[f.name] !== undefined && form[f.name] !== null) {
          data.append(f.name, form[f.name]);
        }
      });
      if (imageFile) data.append(imageField || 'image', imageFile);

      if (editing) {
        await adminApi.put(`/${endpoint}/${editing.id}`, data);
      } else {
        await adminApi.post(`/${endpoint}`, data);
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
    <AdminLayout title={title}>
      <div className="admin-card card">
        <div className="card-header">
          <h5>{title}</h5>
          <button className="btn btn-purple btn-sm" onClick={openCreate}>+ Add New</button>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 text-muted">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-5 text-muted">No records found. Click "Add New" to create one.</div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    {imageField && <th>Image</th>}
                    {fields.filter(f => f.showInTable !== false).map(f => (
                      <th key={f.name}>{f.label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{idx + 1}</td>
                      {imageField && (
                        <td>
                          {item[imageField]
                            ? <img src={`http://localhost:8080/uploads/${item[imageField]}`} alt="" />
                            : <span className="text-muted">—</span>}
                        </td>
                      )}
                      {fields.filter(f => f.showInTable !== false).map(f => (
                        <td key={f.name}>
                          {f.type === 'boolean'
                            ? <span className={item[f.name] ? 'badge-active' : 'badge-inactive'}>{item[f.name] ? 'Yes' : 'No'}</span>
                            : f.type === 'textarea'
                            ? <span title={item[f.name]}>{String(item[f.name] || '').slice(0, 60)}{item[f.name]?.length > 60 ? '…' : ''}</span>
                            : String(item[f.name] ?? '—')}
                        </td>
                      ))}
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
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editing ? `Edit ${title}` : `Add ${title}`}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {error && <div className="alert alert-danger py-2">{error}</div>}
                  <div className="row g-3">
                    {fields.map(f => (
                      <div className={f.col || 'col-12'} key={f.name}>
                        <label className="form-label fw-semibold">{f.label}</label>
                        {f.type === 'textarea' ? (
                          <textarea
                            className="form-control"
                            rows={4}
                            value={form[f.name] || ''}
                            onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                            required={f.required}
                          />
                        ) : f.type === 'boolean' ? (
                          <select
                            className="form-select"
                            value={String(form[f.name] ?? true)}
                            onChange={e => setForm({ ...form, [f.name]: e.target.value === 'true' })}
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        ) : (
                          <input
                            type={f.type || 'text'}
                            className="form-control"
                            value={form[f.name] || ''}
                            onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                            required={f.required}
                          />
                        )}
                      </div>
                    ))}
                    {imageField && (
                      <div className="col-12">
                        <label className="form-label fw-semibold">Image</label>
                        <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                        {preview && <img src={preview} className="img-preview" alt="preview" />}
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-purple" disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
