import { useState, useEffect } from 'react';
import './App.css';
import ContactList from './Components/ContactList/ContactList';
import ContactForm from './Components/ContactForm/ContactForm';
import api from './api/contact-service';

function App() {
  const [arrContacts, setArrContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(createEmptyContact());

  useEffect(() => {
    api.get('/').then(({ data }) => {
      if (!data) {
        setArrContacts([]);
      } else {
        setArrContacts(data);
      }
    });
  }, []);

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
    api.post('/', contact).then(({ data }) => {
      const newContacts = [...arrContacts, data];
      setArrContacts(newContacts);
      setCurrentContact(createEmptyContact());
    });
  };

  const updateContact = (contact) => {
    api
      .put(`/${contact.id}`, contact)
      .then(({ data }) => {
        const updatedContact = arrContacts.find(
          (contact) => contact.id === data.id
        );

        const contacts = arrContacts.map((contact) =>
          contact.id !== updatedContact.id ? contact : data
        );

        setArrContacts(contacts);
        setCurrentContact(data);
      })
      .catch((error) => console.log(error));
  };

  const saveContact = (contact) => {
    if (!contact.id) {
      createContact(contact);
    } else {
      updateContact(contact);
    }
  };

  const deleteContact = (id) => {
    api.delete(`/${id}`).then(({ status }) => console.log(status));
    const newContacts = arrContacts.filter((contact) => contact.id !== id);
    setArrContacts(newContacts);
    setCurrentContact(createEmptyContact());
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
          key={currentContact.id}
          currentContact={currentContact}
          onSubmit={saveContact}
          onDelete={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
