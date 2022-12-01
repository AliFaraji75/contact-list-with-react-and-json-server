import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddContact.css'
const AddContact = ({addContactHandler}) => {
  let navigate = useNavigate();
  //console.log(navigate)
    const [contact,setContact]=useState({name:"",email:""});
    const changeHandler =(e)=>{
        setContact({...contact,[e.target.name]:e.target.value})
        //console.log(contact)
    }
    const addContactSubmit =(e)=>{
        if(!contact.name || !contact.email){
            e.preventDefault();
            alert("All Fields are mandatory !")
            return;
        }
        e.preventDefault();
        addContactHandler(contact);  
        setContact({name:"",email:""})
        navigate("/", { replace: true });
    }
  return (
    <form onSubmit={addContactSubmit}>
      <div className="formControl">
        <label>name</label>
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={changeHandler}
        />
      </div>
      <div className="formControl">
        <label>email</label>
        <input
          type="text"
          name="email"
          value={contact.email}
          onChange={changeHandler}
        />
      </div>
      <button className="formBtn" type= "submit">Add Contact</button>
    </form>
  );
};

export default   AddContact;
