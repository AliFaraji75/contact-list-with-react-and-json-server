import { Link } from "react-router-dom";
import UserIcon from "../../../assest/image/UserIcon.png";
const Contact = ({ contact, removeHandler }) => {
  return (
    <div key={contact.id} className="contactList">
      <div>
        <img src={UserIcon} />
        <div className="info">
          <Link
            to={`/user/${contact.id}`}
            key={contact.id}
            state={{ contact: contact }}
          >
            <p> name:{contact.name}</p>
            <p> email: {contact.email}</p>
          </Link>
        </div>
      </div>
      <div>
        <Link
          to={`/edit/${contact.id}`}
          key={contact.id}
          state={{ contact: contact }}
        >
          <button className="editBtn"> Edit </button>
        </Link>
        <button className="deleteBtn" onClick={() => removeHandler(contact.id)}>Delete</button>
      </div>
    </div>
  );
};
export default Contact;
