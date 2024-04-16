import './ContactList.css';
import ContactItem from './ContactItem/ContactItem';

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

export default ContactList;
