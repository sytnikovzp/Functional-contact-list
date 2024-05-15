import ContactList from './components/ContactList/ContactList'
import ContactForm from './components/ContactForm/ContactForm'
import './App.css';

function App() {
  return (
    <div id='container'>
      <h2>Contact list</h2>
      <div id='main-form'>
        <ContactList />
        <ContactForm />
      </div>
    </div>
  );
}

export default App;
