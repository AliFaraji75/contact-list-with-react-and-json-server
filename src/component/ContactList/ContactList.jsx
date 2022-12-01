import "./CntactList.css";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import Contact from "./Contact/Contact";

const ContactList = ({ contacts, removeHandler, searchHandler }) => {
  const [search, setSearch] = useState("");
  const changeHandler = (e) => {
    setSearch(e.target.value);
    console.log(search);
    searchHandler(e.target.value);
  };
  return (
   
      <div>
        <div className="addContactBtn">
          <h3>Contacts</h3>

          <div>
            <input
              className="searchBox"
              placeholder="Serch for contacts ..."
              type="text"
              value={search}
              onChange={changeHandler}
            />
          </div>

          <Link to={"/addcontact"}>
            <button
              variant="contained"
              color="success"
              size="small"
              className="font-size"
            >
              Add contact
            </button>
          </Link>
        </div>

        {contacts.map((contact) => {
          return (
            <Contact
              key={contact.id}
              contact={contact}
              removeHandler={removeHandler}
            />
          );
        })}
      </div>

  );
};

export default memo(ContactList);
