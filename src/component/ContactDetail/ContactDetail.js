import { Link, useLocation } from "react-router-dom";

const ContactDetail = (props) => {
    let location =useLocation()
 const {name , email }= location.state.contact 
    return (
        <div>
            <div>name is : {name}</div>
            <div>name is : {email}</div>
            <Link  to="/contactlist">go to contactlist ...</Link>
        </div>
     );
}
 
export default ContactDetail;