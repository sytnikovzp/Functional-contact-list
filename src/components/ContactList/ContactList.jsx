import ContactItem from './ContactItem/ContactItem';
import {
  getContactsAction,
  addNewContact,
} from '../../store/actions/contactActions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './ContactList.css';

function ContactList() {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.arrContacts);

  useEffect(() => {
    dispatch(getContactsAction());
  }, [dispatch]);

  const onNewContact = () => {
    dispatch(addNewContact());
  };

  return (
    <div id='wrapper-list'>
      <div id='contact-list'>
        {contacts.map((contact) => {
          return <ContactItem key={contact.id} contact={contact} />;
        })}
      </div>
      <div className='btn-list-block'>
        <button className='btn' id='new-btn' onClick={onNewContact}>
          New
        </button>
      </div>
    </div>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array,
};

ContactList.defaultProps = {
  contacts: [],
};

export default ContactList;
