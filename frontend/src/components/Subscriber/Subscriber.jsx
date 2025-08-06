import React from 'react';
import GuestSubscriber from './GuestSubscriber';
import AdminSubscriber from './AdminSubscriber';

// This component decides which Subscriber component to render based on the login status
// If the user is logged in, it renders AdminSubscriber. Otherwise, it renders GuestSubscriber
function Subscriber(props) {
  return (
    <div>
      {props.isLoggedIn ? <AdminSubscriber /> : <GuestSubscriber />} 
    </div>
  ); 
}

export default Subscriber;
