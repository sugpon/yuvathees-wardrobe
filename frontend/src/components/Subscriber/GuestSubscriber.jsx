import React, { useState } from 'react';
import '../Subscriber/Subscriber.css';
import Button from '../Button/Button.jsx';

function GuestSubscriber() {
  const [email, setEmail] = useState(''); // State to hold email input
  const [submitted, setSubmitted] = useState(false); // State to track if form is submitted

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update email state on input change
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!email) return; // If email is empty, do nothing

    const subscriberData = { email: email.trim() }; // Prepare subscriber data

    try {
      const response = await fetch('http://localhost:8080/subscriber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriberData),
      }); // Send POST request to server with subscriber data

      if (!response.ok) {
        console.error('Failed to subscribe');
        return;
      }

      setSubmitted(true);
      setEmail('');
      event.target.reset();
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  }; // Function to handle form submission and send data to server

  return (
    <div className="subscriberSection">
      <form className="subscriberForm" onSubmit={handleSubmit}>
        <h2>Subscribe to our newsletter</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
            id="name"
            name="name"
            placeholder="Your name"
            required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <Button label="Subscribe" type="submit" />
        {submitted && (
          <p className="thankYouMessage">Thank you for subscribing! We will keep you excited! :)</p>
        )}
      </form>
    </div>
  );
}

export default GuestSubscriber;