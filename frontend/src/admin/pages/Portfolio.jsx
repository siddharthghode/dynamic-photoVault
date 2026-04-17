import CrudPage from '../components/CrudPage';

export default function Portfolio() {
  return (
    <CrudPage
      title="Portfolio"
      endpoint="portfolios"
      imageField="image"
      fields={[
        { name: 'title',       label: 'Title',       required: true, col: 'col-md-8' },
        { name: 'order',       label: 'Order',       type: 'number', required: true, col: 'col-md-4' },
        { name: 'category',    label: 'Category',    col: 'col-md-6' },
        { name: 'description', label: 'Description', type: 'textarea', col: 'col-12' },
      ]}
    />
  );
}
