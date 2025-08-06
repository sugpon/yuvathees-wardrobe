import '../ContactUs/ContactUs.css';
import GuestContactUs from './GuestContactUs';
import AdminContactList from './AdminContactUs';

// This component decides which ContactUs component to render based on the login status
// If the user is logged in, it renders AdminContactList. Otherwise, it renders GuestContactUs
function ContactUs(props) {
  return ( 
    <div>
      {props.isLoggedIn ? <AdminContactList /> : <GuestContactUs />}
    </div>
  );
}
export default ContactUs;
