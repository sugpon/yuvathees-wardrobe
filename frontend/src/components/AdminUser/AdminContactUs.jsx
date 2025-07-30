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

  return (
    <div>
      <h2>Contact Inquiries</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Received At</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
