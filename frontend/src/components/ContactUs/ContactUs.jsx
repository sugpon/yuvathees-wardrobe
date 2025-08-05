import React from 'react';
import '../ContactUs/ContactUs.css';

import GuestContactUs from './GuestContactUs';
import AdminContactList from './AdminContactUs';

function ContactUs(props) {
  return (
    <div>
      {props.isLoggedIn ? <AdminContactList /> : <GuestContactUs />}
    </div>
  );
}
export default ContactUs;
