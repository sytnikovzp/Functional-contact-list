import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { emptyContact } from '../../constants';
import {
  createContact,
  updateContact,
  deleteContact,
} from '../../store/slices/contactSlice';
import './ContactForm.css';

function ContactForm() {
  const dispatch = useDispatch();

  const currentContact = useSelector(
    (state) => state.contactList.currentContact
  );

  const schema = Yup.object().shape({
    eMail: Yup.string().email('Invalid email address').required('Required'),
    cPhone: Yup.string().required('Required'),
  });

  const onFormSubmit = (values, { resetForm }) => {
    if (values.id) {
      dispatch(updateContact(values));
    } else {
      dispatch(createContact(values));
      resetForm();
    }
  };

  const onContactDelete = () => {
    dispatch(deleteContact(currentContact.id));
  };

  const renderForm = ({ setFieldValue }) => {
    return (
      <Form id='contact-form'>
        <div id='wrapper-form'>
          <div className='contact-form-item'>
            <Field
              type='text'
              name='fName'
              id='fName'
              placeholder='First name'
            />
            <span
              className='clear-btn'
              onClick={() => setFieldValue('fName', '')}
            >
              X
            </span>
          </div>
          <div className='contact-form-item'>
            <Field
              type='text'
              name='lName'
              id='lName'
              placeholder='Last name'
            />
            <span
              className='clear-btn'
              onClick={() => setFieldValue('lName', '')}
            >
              X
            </span>
          </div>
          <div className='contact-form-item'>
            <Field type='email' name='eMail' id='eMail' placeholder='E-mail' />
            <span
              className='clear-btn'
              onClick={() => setFieldValue('eMail', '')}
            >
              X
            </span>
          </div>
          <ErrorMessage name='eMail' component='div' className='error' />
          <div className='contact-form-item'>
            <Field type='tel' name='cPhone' id='cPhone' placeholder='Phone' />
            <span
              className='clear-btn'
              onClick={() => setFieldValue('cPhone', '')}
            >
              X
            </span>
          </div>
          <ErrorMessage name='cPhone' component='div' className='error' />
        </div>

        <div className='btn-form-block'>
          <button type='submit' id='save-btn' className='btn'>
            Save
          </button>

          {currentContact.id ? (
            <button
              id='delButton'
              type='button'
              className='btn'
              onClick={onContactDelete}
            >
              Delete
            </button>
          ) : (
            ''
          )}
        </div>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={currentContact ? currentContact : emptyContact}
      onSubmit={onFormSubmit}
      validationSchema={schema}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

ContactForm.propTypes = {
  currentContact: PropTypes.object,
  onFormSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ContactForm;
