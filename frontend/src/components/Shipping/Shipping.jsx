import React from "react";
import AdminShipping from "./AdminShipping";  // Your admin shipping CRUD component
import GuestShipping from "./GuestShipping";  // The readonly guest shipping component

// This component decides which Shipping component to render based on the login status
// If the user is logged in, it renders AdminShipping. Otherwise, it renders GuestShipping
function Shipping(props) {
  return (
    <div>
      {props.isLoggedIn ? <AdminShipping /> : <GuestShipping />}
    </div>
  );
}

export default Shipping;
