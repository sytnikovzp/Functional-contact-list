import ContactItem from './ContactItem/ContactItem';
import PropTypes from 'prop-types';
import './ContactList.css';

function ContactList({ contacts, onNewContact, onEditContact, onDelete }) {
  return (
    <div id='wrapper-list'>
      <div id='contact-list'>
        {contacts.map((contact) => {
          return (
            <ContactItem
              key={contact.id}
              contact={contact}
              onEdit={onEditContact}
              onDelete={onDelete}
            />
          );
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
  onNewContact: PropTypes.func,
  onEditContact: PropTypes.func,
  onDelete: PropTypes.func,
};

ContactList.defaultProps = {
  contacts: [],
};

export default ContactList;
