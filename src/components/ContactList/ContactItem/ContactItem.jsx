import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  selectContact,
  deleteContact,
} from '../../../store/slices/contactSlice';
import './ContactItem.css';

function ContactItem({ contact }) {
  const dispatch = useDispatch();

  const { id, fName, lName } = contact;

  const onContactEdit = () => {
    dispatch(selectContact(contact));
  };

  const onItemDelete = (event) => {
    event.stopPropagation();
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
