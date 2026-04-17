import CrudPage from '../components/CrudPage';

export default function Instagram() {
  return (
    <CrudPage
      title="Instagram Posts"
      endpoint="instagram"
      imageField="image"
      fields={[
        { name: 'caption', label: 'Caption', col: 'col-12' },
        { name: 'postUrl', label: 'Post URL', col: 'col-12' },
      ]}
    />
  );
}
