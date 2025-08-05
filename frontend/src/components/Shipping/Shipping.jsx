import React from "react";
import AdminShipping from "./AdminShipping";  // Your admin shipping CRUD component
import GuestShipping from "./GuestShipping";  // The readonly guest shipping component

function Shipping(props) {
  return (
    <div>
      {props.isLoggedIn ? <AdminShipping /> : <GuestShipping />}
    </div>
  );
}

export default Shipping;
