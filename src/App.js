import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AddContact from "./component/AddContact/AddContact";
import ContactDetail from "./component/ContactDetail/ContactDetail";
import ContactList from "./component/ContactList/ContactList";
import EditContact from "./component/EditContact/EditContact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [allContacts, setallContacts] = useState([]);
  useEffect(() => {
    /* const updataContact = JSON.parse(localStorage.getItem("contacts"));
    if (updataContact.length > 0) {
      setContacts(updataContact);
      console.log("nknknn", updataContact);
    }*/
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3001/contacts");
      setContacts(data);
      setallContacts(data);
    };
    getData();
  }, []);

  const addContactHandler = async (contact) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/contacts",
        contact
      );
      setContacts([...contacts, data]);
      setallContacts([...allContacts, data]);
    } catch (error) { }
  };

  const removeHandler = async (id) => {
    try {
      console.log("id", id);
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      const filteredContacts = contacts.filter((c) => c.id !== id);
      setContacts(filteredContacts);
      //setallContacts(filteredContacts);
      //const filteredallContacts = allContacts.filter((c) => c.id !== id);
      setallContacts(filteredContacts);
    } catch (error) { }
  };

  const editContactHandler = async (data, id) => {
    try {
      await axios.put(`http://localhost:3001/contacts/${id}`, data);
      const updataContact = await axios.get("http://localhost:3001/contacts");
      setContacts(updataContact.data);
      setallContacts(updataContact.data);
      console.log(updataContact);
    } catch (error) { }
  };

  const searchHandler = (search) => {
    if (search !== "") {
      const filteredcontacts = allContacts.filter((c) => {
        return Object.values(c)
          .join(" ")
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      });
      setContacts(filteredcontacts);
    } else {
      console.log(allContacts);
      setContacts(allContacts);
    }
  };

  return (
    <main className="App">
      <h2>Contact APP</h2>
      <Routes>
        <Route path="/user/:id" element={<ContactDetail />} />
        <Route
          path="/edit/:id"
          element={<EditContact editContactHandler={editContactHandler} />}
        />
        <Route
          path="/addcontact"
          element={<AddContact addContactHandler={addContactHandler} />}
        />
        <Route
          path="/"
          element={
            <ContactList
              contacts={contacts}
              removeHandler={removeHandler}
              searchHandler={searchHandler}
            />
          }
        />
        <Route
          path="/contactlist"
          element={<Navigate to="/" replace={true} />}
        />
      </Routes>
    </main>
  );
}

export default App;
