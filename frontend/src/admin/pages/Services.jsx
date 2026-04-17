import CrudPage from '../components/CrudPage';

export default function Services() {
  return (
    <CrudPage
      title="Services"
      endpoint="services"
      imageField="icon"
      fields={[
        { name: 'title',       label: 'Title',       required: true, col: 'col-md-8' },
        { name: 'order',       label: 'Order',       type: 'number', required: true, col: 'col-md-4' },
        { name: 'description', label: 'Description', type: 'textarea', col: 'col-12' },
      ]}
    />
  );
}
