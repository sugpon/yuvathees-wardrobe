import '../ContactUs/ContactUs.css';
import GuestContactUs from './GuestContactUs';
import AdminContactList from './AdminContactUs';

function ContactUs(props) {
  return ( 
    // Render based on isLoggedIn prop from App.jsx parent component
    <div>
      {props.isLoggedIn ? <AdminContactList /> : <GuestContactUs />}
    </div>
  );
}
export default ContactUs;
