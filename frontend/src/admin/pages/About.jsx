import CrudPage from '../components/CrudPage';

export default function About() {
  return (
    <CrudPage
      title="About"
      endpoint="about"
      imageField="image"
      fields={[
        { name: 'heading',  label: 'Heading',   required: true, col: 'col-12' },
        { name: 'bodyText', label: 'Body Text', type: 'textarea', required: true, col: 'col-12' },
      ]}
    />
  );
}
