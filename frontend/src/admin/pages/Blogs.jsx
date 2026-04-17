import CrudPage from '../components/CrudPage';

export default function Blogs() {
  return (
    <CrudPage
      title="Blog Posts"
      endpoint="blogs"
      imageField="image"
      fields={[
        { name: 'title',   label: 'Title',   required: true, col: 'col-12' },
        { name: 'slug',    label: 'Slug (auto-generated if empty)', col: 'col-12' },
        { name: 'content', label: 'Content', type: 'textarea', required: true, col: 'col-12' },
      ]}
    />
  );
}
