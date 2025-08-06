import React from 'react';
import GuestSubscriber from './GuestSubscriber';
import AdminSubscriber from './AdminSubscriber';

function Subscriber(props) {
  return (
    <div>
      {props.isLoggedIn ? <AdminSubscriber /> : <GuestSubscriber />} // Render AdminSubscriber if logged in, else GuestSubscriber
    </div>
  ); 
}

export default Subscriber;
