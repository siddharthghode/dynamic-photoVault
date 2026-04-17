import CrudPage from '../components/CrudPage';

export default function Sliders() {
  return (
    <CrudPage
      title="Sliders"
      endpoint="sliders"
      fetchEndpoint="sliders?all=true"
      imageField="image"
      fields={[
        { name: 'title',   label: 'Title',   required: true,  col: 'col-md-8' },
        { name: 'order',   label: 'Order',   type: 'number',  required: true, col: 'col-md-4' },
        { name: 'caption', label: 'Caption', col: 'col-12' },
        { name: 'active',  label: 'Active',  type: 'boolean', col: 'col-md-4' },
      ]}
    />
  );
}
