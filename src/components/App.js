import React, {useState, useEffect} from "react";
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { Message, Search } from 'semantic-ui-react';

function App() {
  const Local_Storage_Key = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ visible: false, content: '', type: '' });

  const showMessage = (content, type) => {
    setMessage({ visible: true, content, type });
    setTimeout(() => setMessage({ visible: false, content: '', type: '' }), 3000);
  };

  // Load contacts from localStorage on component mount
  useEffect(() => {
    console.log('Loading contacts from localStorage...');
    try {
      const storedContacts = localStorage.getItem(Local_Storage_Key);
      console.log('Stored contacts:', storedContacts);
      
      if (storedContacts) {
        const parsedContacts = JSON.parse(storedContacts);
        console.log('Parsed contacts:', parsedContacts);
        
        // Validate the stored data
        if (Array.isArray(parsedContacts)) {
          console.log('Setting contacts:', parsedContacts);
          setContacts(parsedContacts);
        } else {
          console.error('Invalid contacts data in localStorage');
          localStorage.removeItem(Local_Storage_Key);
        }
      } else {
        console.log('No contacts found in localStorage');
      }
    } catch (error) {
      console.error('Error loading contacts from localStorage:', error);
      showMessage('Error loading contacts', 'error');
    }
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    console.log('Saving contacts to localStorage:', contacts);
    try {
      if (contacts && contacts.length > 0) {
        localStorage.setItem(Local_Storage_Key, JSON.stringify(contacts));
        console.log('Contacts saved successfully');
      }
    } catch (error) {
      console.error('Error saving contacts to localStorage:', error);
      showMessage('Error saving contacts', 'error');
    }
  }, [contacts]);

  const addContactHandler = (contact) => {
    try {
      const newContact = {
        id: Date.now(),
        ...contact
      };
      setContacts(prevContacts => {
        const updatedContacts = [...prevContacts, newContact];
        console.log('Adding new contact:', newContact);
        console.log('Updated contacts:', updatedContacts);
        return updatedContacts;
      });
      showMessage('Contact added successfully!', 'success');
    } catch (error) {
      console.error('Error adding contact:', error);
      showMessage('Error adding contact', 'error');
    }
  }

  const removeContactHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        setContacts(prevContacts => {
          const newContactList = prevContacts.filter((contact) => contact.id !== id);
          console.log('Removing contact with id:', id);
          console.log('Updated contacts after removal:', newContactList);
          return newContactList;
        });
        showMessage('Contact deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting contact:', error);
        showMessage('Error deleting contact', 'error');
      }
    }
  }

  const editContactHandler = (updatedContact) => {
    try {
      setContacts(prevContacts => {
        const newContactList = prevContacts.map((contact) => 
          contact.id === updatedContact.id ? updatedContact : contact
        );
        console.log('Updating contact:', updatedContact);
        console.log('Updated contacts after edit:', newContactList);
        return newContactList;
      });
      showMessage('Contact updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating contact:', error);
      showMessage('Error updating contact', 'error');
    }
  }

  const filteredContacts = contacts.filter((contact) => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ui container">
      <Header/>
      {message.visible && (
        <Message 
          positive={message.type === 'success'} 
          negative={message.type === 'error'}
          onDismiss={() => setMessage({ visible: false, content: '', type: '' })}
        >
          {message.content}
        </Message>
      )}
      <div className="ui segment search-container">
        <div className="ui fluid search">
          <div className="ui icon input" style={{ width: '100%' }}>
            <input 
              type="text" 
              placeholder="Search contacts by name, email, or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="prompt"
            />
            <i className="search icon"></i>
          </div>
        </div>
      </div>
      <div className="ui grid stackable">
        <div className="row">
          <div className="eight wide column">
            <AddContact addContactHandler={addContactHandler}/>
          </div>
          <div className="eight wide column">
            <div className="ui segment">
              <h2 className="ui header">Contact List</h2>
              {filteredContacts.length === 0 ? (
                <div className="ui message">
                  <div className="header">No contacts found</div>
                  <p>Try adding a new contact or adjust your search term.</p>
                </div>
              ) : (
                <ContactList 
                  contacts={filteredContacts}
                  removeContactHandler={removeContactHandler}
                  editContactHandler={editContactHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
