import { useState } from "react";
import "./ContactUs.css";
import Button from "../Button/Button.jsx";

export default function ContactUs() {
  const [message, setMessage] = useState(""); // State to hold the message input
  const [submitted, setSubmitted] = useState(false); // State to track if the form has been submitted
  const maxChars = 200;

  // Handle textarea input change
  const handleMessageChange = (e) => { 
    if (e.target.value.length <= maxChars) {
      setMessage(e.target.value);
    }
  };

  return (
    <div className="contactSection">
      <form className="contactForm" 
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          setMessage("");
          e.target.reset();
        }}>
        <h2>Contact Us</h2>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email" required />

        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" placeholder="Subject" />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Write your message here..."
          value={message}
          onChange={handleMessageChange}
          required
        />
        {/* Character counter below textarea */}
        <div className="charCounter">
          {message.length} / {maxChars}
        </div>

       <Button
        label="Send Message"
        type="submit"
      />
      {submitted && (
      <p className="thankYouMessage">Thank you! We'll get back to you soon.</p>
)}
      </form>
    </div>
  );
}
