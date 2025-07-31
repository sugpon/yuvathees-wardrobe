import React from 'react';
import GuestSubscriber from '../GuestUser/GuestSubscriber';
import AdminSubscriber from '../AdminUser/AdminSubscriber';

function Subscriber({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <AdminSubscriber /> : <GuestSubscriber />}
    </div>
  );
}

export default Subscriber;
