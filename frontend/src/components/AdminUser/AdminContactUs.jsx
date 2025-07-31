import React, { useEffect, useState } from 'react';
import "../ContactUs/ContactUs.css";
import Button from "../Button/Button.jsx";

export default function AdminContactUs() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/contactinquiry', {
      credentials: 'include' // include cookies/session if used
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch inquiries');
        return res.json();
      })
      .then(data => setInquiries(data))
      .catch(error => console.error('Error loading inquiries:', error));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;

    fetch(`http://localhost:8080/contactinquiry/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) throw new Error("Failed to delete Inquiry");
        // Remove deleted Inquiry from state to update UI
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Contact Inquiries</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Received At</th>
          <th>Respond</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.length === 0 && (
            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No inquiries found.</td></tr>
          )}
          {inquiries.map(inq => (
            <tr key={inq.id}>
              <td>{inq.name}</td>
              <td>{inq.email}</td>
              <td>{inq.subject}</td>
              <td>{inq.message}</td>
              <td>{new Date(inq.received_at).toLocaleString()}</td>
              <td>
               <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(inq.email)}&su=${encodeURIComponent("RE: " + inq.subject)}&body=${encodeURIComponent(
                    `Hi ${inq.name},\n\n> ${inq.message}\n\n-----------------------\nThankyou for your interest in Yuvathees Wardrobe. We are writing to you regarding your inquiry.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Reply to ${inq.email}`}
                >
                 <Button label="Reply"/>
                </a>
              </td>
              <td>
                <Button label="Delete"
                        onClick={() => handleDelete(inq.id)}
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
