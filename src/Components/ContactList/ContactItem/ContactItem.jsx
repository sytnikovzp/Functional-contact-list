import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  selectContact,
  deleteContact,
} from '../../../store/actions/contactActions';
import api from '../../../api/contact-service';
import './ContactItem.css';

function ContactItem({ contact }) {
  const dispatch = useDispatch();

  const { id, fName, lName } = contact;

  const onContactEdit = () => {
    dispatch(selectContact(contact));
  };

  const onItemDelete = (event) => {
    event.stopPropagation();
    api
      .delete(`/contacts/${id}`)
      .then(({ statusText }) => console.log(statusText))
      .catch((error) => console.log(error));
    dispatch(deleteContact(id));
  };

  return (
    <div className={'contact-item '} onDoubleClick={onContactEdit}>
      <p className='content'>
        {fName} {lName}
      </p>
      <span className='delete-btn' onClick={onItemDelete}>
        X
      </span>
    </div>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ContactItem;
