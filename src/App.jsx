import { useState, useEffect } from 'react';
import './App.css';
import ContactList from './Components/ContactList/ContactList';
import ContactForm from './Components/ContactForm/ContactForm';
import { customAlphabet } from 'nanoid';

function App() {
  const [arrContacts, setArrContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(createEmptyContact());

  useEffect(getFromStorage, []);

  function getFromStorage() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (!contacts) {
      setArrContacts([]);
    } else {
      setArrContacts(contacts);
    }
  }

  function createEmptyContact() {
    return {
      id: null,
      fName: '',
      lName: '',
      eMail: '',
      cPhone: '',
    };
  }

  const selectContact = (contact) => {
    setCurrentContact(contact);
  };

  const addNewContact = () => {
    setCurrentContact(createEmptyContact());
  };

  const createContact = (contact) => {
    const nanoid = customAlphabet('1234567890', 5);
    contact.id = nanoid();
    const contacts = [...arrContacts, contact];
    setArrContacts(contacts);
    setCurrentContact(createEmptyContact());
    saveContactToLS(contacts);
  };

  function updateContact(contact) {
    const contacts = arrContacts.map((item) =>
      item.id === contact.id ? contact : item
    );
    setArrContacts(contacts);
    setCurrentContact(contact);
    saveContactToLS(contacts);
  }

  const saveContact = (contact) => {
    if (!contact.id) {
      createContact(contact);
    } else {
      updateContact(contact);
    }
  };

  const deleteContact = (id) => {
    const contacts = [...arrContacts.filter((contact) => contact.id !== id)];
    setArrContacts(contacts);
    setCurrentContact(createEmptyContact());
    saveContactToLS(contacts);
  };

  const saveContactToLS = (arrContacts) => {
    localStorage.setItem('contacts', JSON.stringify(arrContacts));
  };

  return (
    <div id='container'>
      <h2>Contact list</h2>
      <div id='main-form'>
        <ContactList
          contacts={arrContacts}
          onNewContact={addNewContact}
          onEditContact={selectContact}
          onDelete={deleteContact}
        />
        <ContactForm
          currentContact={currentContact}
          onSubmit={saveContact}
          onDelete={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
