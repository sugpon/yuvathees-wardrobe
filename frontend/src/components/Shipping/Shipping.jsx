import React from "react";
import AdminShipping from "./AdminShipping";  // Your admin shipping CRUD component
import GuestShipping from "./GuestShipping";  // The readonly guest shipping component

const Shipping = ({ isLoggedIn }) => {
  return (
    <>
      {isLoggedIn ? <AdminShipping /> : <GuestShipping />}
    </>
  );
};

export default Shipping;
