import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import adminApi from '../adminApi';

export default function Contacts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchAll = () => {
    setLoading(true);
    adminApi.get('/contacts').then(res => setItems(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await adminApi.delete(`/contacts/${id}`);
    setSelected(null);
    fetchAll();
  };

  return (
    <AdminLayout title="Contact Messages">
      <div className="admin-card card">
        <div className="card-header">
          <h5>Contact Messages <span className="badge bg-purple ms-2" style={{ background: 'var(--admin-purple)' }}>{items.length}</span></h5>
        </div>
        <div className="card-body p-0">
          {loading ? <div className="text-center py-5 text-muted">Loading...</div> : items.length === 0 ? (
            <div className="text-center py-5 text-muted">No messages yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table mb-0">
                <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id} style={{ cursor: 'pointer' }}>
                      <td>{idx + 1}</td>
                      <td><strong>{item.name}</strong></td>
                      <td>{item.email}</td>
                      <td>{item.subject || '—'}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => setSelected(item)}>View</button>
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

      {selected && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message from {selected.name}</h5>
                <button className="btn-close" onClick={() => setSelected(null)} />
              </div>
              <div className="modal-body">
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Subject:</strong> {selected.subject || '—'}</p>
                <p><strong>Date:</strong> {new Date(selected.createdAt).toLocaleString()}</p>
                <hr />
                <p style={{ whiteSpace: 'pre-wrap' }}>{selected.message}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-danger" onClick={() => handleDelete(selected.id)}>Delete</button>
                <button className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
