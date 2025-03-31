import React, {useState, useEffect} from "react";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

function App() {
  const Local_Storage_Key = "contacts";
  const [contacts,setContacts] = useState([]);

  const addContactHandeler = (contact) => {
    console.log(contact);
    setContacts([...contacts, contact]);
  }

  useEffect(()=>{
    const retrivecontacts = JSON.parse(localStorage.getItem(Local_Storage_Key));
    if (retrivecontacts) setContacts(retrivecontacts)
  },[]);

  useEffect(()=>{
    localStorage.setItem(Local_Storage_Key, JSON.stringify(contacts))
  },[contacts]);

  return (
    <div className="ui container">
      <Header/>
      <AddContact addContactHandeler = {addContactHandeler}/>
      <ContactList  contacts={contacts}/>

    </div>
  );
}

export default App;
