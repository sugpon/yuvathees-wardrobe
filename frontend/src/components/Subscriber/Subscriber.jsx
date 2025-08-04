import React from 'react';
import GuestSubscriber from './GuestSubscriber';
import AdminSubscriber from './AdminSubscriber';

function Subscriber({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <AdminSubscriber /> : <GuestSubscriber />}
    </div>
  );
}

export default Subscriber;
