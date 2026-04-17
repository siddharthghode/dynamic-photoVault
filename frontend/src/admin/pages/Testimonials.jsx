import CrudPage from '../components/CrudPage';

export default function Testimonials() {
  return (
    <CrudPage
      title="Testimonials"
      endpoint="testimonials"
      fields={[
        { name: 'authorName', label: 'Author Name', required: true, col: 'col-md-8' },
        { name: 'rating',     label: 'Rating (1-5)', type: 'number', col: 'col-md-4' },
        { name: 'quoteText',  label: 'Quote',        type: 'textarea', required: true, col: 'col-12' },
      ]}
    />
  );
}
