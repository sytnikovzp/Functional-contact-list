import { Component } from 'react';
import './App.css';
import ContactList from './Components/ContactList/ContactList';
import ContactForm from './Components/ContactForm/ContactForm';
import { customAlphabet } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    currentContact: this.createEmptyContact(),
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (!contacts) {
      this.setState({
        contacts: [],
      });
    } else {
      this.setState({
        contacts: [...contacts],
      });
    }
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

  selectContact = (contact) => {
    this.setState({
      currentContact: contact,
    });
  };

  addNewContact = () => {
    this.setState({ currentContact: this.createEmptyContact() });
  };

  createContact = (contact) => {
    const nanoid = customAlphabet('1234567890', 5);
    contact.id = nanoid();
    const contacts = [...this.state.contacts, contact];
    this.saveContactToLS(contacts);
    this.setState({
      contacts: contacts,
      currentContact: this.createEmptyContact(),
    });
  };

  updateContact(contact) {
    this.setState((state) => {
      const contacts = state.contacts.map((item) =>
        item.id === contact.id ? contact : item
      );
      this.saveContactToLS(contacts);
      return {
        contacts,
        currentContact: contact,
      };
    });
  }

  saveContact = (contact) => {
    if (!contact.id) {
      this.createContact(contact);
    } else {
      this.updateContact(contact);
    }
  };

  deleteContact = (id) => {
    this.setState(() => {
      const contacts = [
        ...this.state.contacts.filter((contact) => contact.id !== id),
      ];
      this.saveContactToLS(contacts);
      return {
        contacts,
        currentContact: this.createEmptyContact(),
      };
    });
  };

  saveContactToLS = (arrContacts) => {
    localStorage.setItem('contacts', JSON.stringify(arrContacts));
  };

  render() {
    return (
      <div id='container'>
        <h2>Contact list</h2>
        <div id='main-form'>
          <ContactList
            contacts={this.state.contacts}
            currentContact={this.state.currentContact}
            onNewContact={this.addNewContact}
            onEditContact={this.selectContact}
            onDelete={this.deleteContact}
          />
          <ContactForm
            currentContact={this.state.currentContact}
            onSubmit={this.saveContact}
            onDelete={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
