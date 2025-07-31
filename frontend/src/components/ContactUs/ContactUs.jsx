import React from 'react';
import '../ContactUs/ContactUs.css';

import GuestContactUs from '../GuestUser/GuestContactUs';
import AdminContactList from '../AdminUser/AdminContactUs';

function ContactPage(props) {
  return (
    <div>
      {props.isLoggedIn ? <AdminContactList /> : <GuestContactUs />}
    </div>
  );
}
export default ContactPage;
