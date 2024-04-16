import { Component } from 'react';
import './ContactItem.css';

export class ContactItem extends Component {
  onContactEdit = (event) => {
    event.stopPropagation();
    this.props.onEdit(this.props.contact);
  };

  onItemDelete = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.props.contact.id);
  };

  render() {
    const { fName, lName } = this.props.contact;
    return (
      <div className={'contact-item '} onDoubleClick={this.onContactEdit}>
        <p className='content'>
          {fName} {lName}
        </p>
        <span className='delete-btn' onClick={this.onItemDelete}>
          X
        </span>
      </div>
    );
  }
}

export default ContactItem;
