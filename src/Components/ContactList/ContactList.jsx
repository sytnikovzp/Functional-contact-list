import ContactItem from './ContactItem/ContactItem';
import { getContacts } from '../../store/actions/contactActions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api/contact-service';
import './ContactList.css';

function ContactList() {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.arrContacts);

  useEffect(() => {
    api.get('/contacts').then(({ data }) => dispatch(getContacts(data)));
  }, [dispatch]);

  return (
    <div id='wrapper-list'>
      <div id='contact-list'>
        {contacts.map((contact) => {
          return <ContactItem key={contact.id} contact={contact} />;
        })}
      </div>
      <div className='btn-list-block'>
        <button
          className='btn'
          id='new-btn'
          // onClick={onNewContact}
        >
          New
        </button>
      </div>
    </div>
  );
}

// ContactList.propTypes = {
//   contacts: PropTypes.array,
//   onNewContact: PropTypes.func,
//   onEditContact: PropTypes.func,
//   onDelete: PropTypes.func,
// };

// ContactList.defaultProps = {
//   contacts: [],
// };

export default ContactList;
