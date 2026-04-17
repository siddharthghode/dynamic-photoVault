import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async data => {
    await api.post('/contacts', data);
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4">Get in touch</h2>
        {isSubmitSuccessful && <div className="alert alert-success">Message sent!</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" {...register('name', { required: true })} />
            {errors.name && <span className="text-danger">Required</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" {...register('email', { required: true })} />
            {errors.email && <span className="text-danger">Required</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input className="form-control" {...register('subject')} />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows={5} {...register('message', { required: true })} />
            {errors.message && <span className="text-danger">Required</span>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Send</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
