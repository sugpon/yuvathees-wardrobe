import React, { useEffect, useState } from "react";
import "../Subscriber/Subscriber.css"; // Assume you will style similarly to ContactUs
import Button from "../Button/Button.jsx";

function AdminSubscriber() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/subscriber", {
      credentials: "include", // include cookies/session if needed
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load subscribers");
        return response.json();
      })
      .then((data) => setSubscribers(data))
      .catch((error) => console.error("Error fetching subscribers:", error));
  }, []);

   const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;

    fetch(`http://localhost:8080/subscriber/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) throw new Error("Failed to delete subscriber");
        // Remove deleted subscriber from state to update UI
        setSubscribers(prev => prev.filter(sub => sub.id !== id));
      })
      .catch(error => console.error(error));
  };


  return (
    <div className="subscriberSection">
      <h2>Subscribers List</h2>
      <table className="subscriberTable">
    <thead>
        <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Subscribed At</th>
        <th>Actions</th>
        </tr>
    </thead>
    <tbody>
    {subscribers.map(subscriber => (
      <tr key={subscriber.id}>
        <td>{subscriber.name}</td>
        <td>{subscriber.email}</td>
        <td>{new Date(subscriber.subscribedAt).toLocaleString()}</td>
        <td>
        <Button label="Delete"
                onClick={() => handleDelete(subscriber.id)}
                className="deleteButton"
        />
        </td>
      </tr>
        ))}
    </tbody>
    </table>
    </div>
  );
}

export default AdminSubscriber;