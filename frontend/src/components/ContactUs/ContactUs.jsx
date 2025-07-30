import React from 'react';
import '../ContactUs/ContactUs.css';

import GuestContactUs from '../GuestUser/GuestContactUs';
import AdminContactList from '../AdminUser/AdminContactUs';

export default function ContactPage({ isAdmin }) {
  return (
    <div>
      {isAdmin ? <AdminContactList /> : <GuestContactUs />}
    </div>
  );
}
