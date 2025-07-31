import React, { useState } from 'react';
import '../Subscriber/Subscriber.css';
import Button from '../Button/Button.jsx';

function GuestSubscriber() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) return;

    const subscriberData = { email: email.trim() };

    try {
      const response = await fetch('http://localhost:8080/subscriber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriberData),
      });

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
  };

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
          <p className="thankYouMessage">Thank you for subscribing!</p>
        )}
      </form>
    </div>
  );
}

export default GuestSubscriber;