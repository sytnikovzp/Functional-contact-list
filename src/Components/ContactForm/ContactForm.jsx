import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.css';

function ContactForm({ currentContact, onSubmit, onDelete }) {
  const [contact, setContact] = useState({ ...currentContact });

  useEffect(() => {
    setContact({ ...currentContact });
  }, [currentContact]);

  function createEmptyContact() {
    return {
      id: null,
      fName: '',
      lName: '',
      eMail: '',
      cPhone: '',
    };
  }

  const onInputChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const onInputClear = (event) => {
    const sibling = event.target.previousSibling;
    setContact({
      ...contact,
      [sibling.name]: '',
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(contact);
    if (!contact.id) {
      setContact(createEmptyContact());
    }
  };

  const onContactDelete = () => {
    onDelete(contact.id);
    setContact(createEmptyContact());
  };

  return (
    <form id='contact-form' onSubmit={onFormSubmit}>
      <div id='wrapper-form'>
        <div className='contact-form-item'>
          <input
            type='text'
            name='fName'
            id='fName'
            placeholder='First name'
            value={contact.fName}
            onChange={onInputChange}
          />
          <span className='clear-btn' onClick={onInputClear}>
            X
          </span>
        </div>
        <div className='contact-form-item'>
          <input
            type='text'
            name='lName'
            id='lName'
            placeholder='Last name'
            value={contact.lName}
            onChange={onInputChange}
          />
          <span className='clear-btn' onClick={onInputClear}>
            X
          </span>
        </div>
        <div className='contact-form-item'>
          <input
            type='email'
            name='eMail'
            id='eMail'
            placeholder='E-mail'
            value={contact.eMail}
            onChange={onInputChange}
          />
          <span className='clear-btn' onClick={onInputClear}>
            X
          </span>
        </div>
        <div className='contact-form-item'>
          <input
            type='tel'
            name='cPhone'
            id='cPhone'
            placeholder='Phone'
            value={contact.cPhone}
            onChange={onInputChange}
          />
          <span className='clear-btn' onClick={onInputClear}>
            X
          </span>
        </div>
      </div>

      <div className='btn-form-block'>
        <button type='submit' id='save-btn' className='btn'>
          Save
        </button>

        {contact.id ? (
          <button id='delButton' className='btn' onClick={onContactDelete}>
            Delete
          </button>
        ) : (
          ''
        )}
      </div>
    </form>
  );
}

ContactForm.propTypes = {
  currentContact: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

export default ContactForm;
