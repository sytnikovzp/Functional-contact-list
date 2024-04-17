import './ContactItem.css';

function ContactItem({ contact, onEdit, onDelete }) {
  const onContactEdit = (event) => {
    event.stopPropagation();
    onEdit(contact);
  };

  const onItemDelete = (event) => {
    event.stopPropagation();
    onDelete(contact.id);
  };

  const { fName, lName } = contact;
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

export default ContactItem;