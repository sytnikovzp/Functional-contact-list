import { Component } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.css';

export class ContactForm extends Component {
  state = {
    ...this.props.currentContact,
  };

  static getDerivedStateFromProps(props, state) {
    if (state.id === props.currentContact.id) {
      return {};
    }
    return {
      ...props.currentContact,
    };
  }

  createEmptyContact() {
    return {
      id: null,
      fName: '',
      lName: '',
      eMail: '',
      cPhone: '',
    };
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onInputClear = (event) => {
    const sibling = event.target.previousSibling;
    this.setState({
      [sibling.name]: '',
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      ...this.state,
    });
    if (!this.state.id) {
      this.setState({
        ...this.createEmptyContact(),
      });
    }
  };

  onContactDelete = () => {
    this.props.onDelete(this.state.id);
    this.setState({
      ...this.createEmptyContact(),
    });
  };

  render() {
    return (
      <form id='contact-form' onSubmit={this.onFormSubmit}>
        <div id='wrapper-form'>
          <div className='contact-form-item'>
            <input
              type='text'
              name='fName'
              id='fName'
              placeholder='First name'
              value={this.state.fName}
              onChange={this.onInputChange}
            />
            <span className='clear-btn' onClick={this.onInputClear}>
              X
            </span>
          </div>
          <div className='contact-form-item'>
            <input
              type='text'
              name='lName'
              id='lName'
              placeholder='Last name'
              value={this.state.lName}
              onChange={this.onInputChange}
            />
            <span className='clear-btn' onClick={this.onInputClear}>
              X
            </span>
          </div>
          <div className='contact-form-item'>
            <input
              type='email'
              name='eMail'
              id='eMail'
              placeholder='E-mail'
              value={this.state.eMail}
              onChange={this.onInputChange}
            />
            <span className='clear-btn' onClick={this.onInputClear}>
              X
            </span>
          </div>
          <div className='contact-form-item'>
            <input
              type='tel'
              name='cPhone'
              id='cPhone'
              placeholder='Phone'
              value={this.state.cPhone}
              onChange={this.onInputChange}
            />
            <span className='clear-btn' onClick={this.onInputClear}>
              X
            </span>
          </div>
        </div>

        <div className='btn-form-block'>
          <button type='submit' id='save-btn' className='btn'>
            Save
          </button>

          {this.state.id ? (
            <button
              id='delButton'
              className='btn'
              onClick={this.onContactDelete}
            >
              Delete
            </button>
          ) : (
            ''
          )}
        </div>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
