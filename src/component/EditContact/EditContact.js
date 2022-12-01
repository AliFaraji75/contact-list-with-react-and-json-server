import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate ,useLocation  } from "react-router-dom";
import '../AddContact/AddContact.css'
const AddContact = ({editContactHandler}) => {
    let location =useLocation()
    const editValue= location.state.contact 
  let navigate = useNavigate();
useEffect(()=>{
    const editFunc = async()=>{
        try {
            const {data} = await axios.get(`http://localhost:3001/contacts/${editValue.id}`);
            console.log(data);
            setContact({name:data.name ,email:data.email })
        } catch (error) {
            
        }
    }
    editFunc();
},[])
 // console.log(editc)
    const [contact,setContact]=useState({name:"",email:""});
    const changeHandler =(e)=>{
        setContact({...contact,[e.target.name]:e.target.value})
        console.log(contact)
    }
    const editContactSubmit =(e)=>{
        if(!contact.name || !contact.email){
            e.preventDefault();
            alert("All Fields are mandatory !")
            return;
        }
        e.preventDefault();
        editContactHandler(contact,editValue.id);  
        setContact({name:"",email:""})
        navigate("/", { replace: true });
    }
  return (
    <form onSubmit={editContactSubmit}>
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
      <button className="formBtn" type= "submit">Edit Contact</button>
    </form>
  );
};

export default   AddContact;
