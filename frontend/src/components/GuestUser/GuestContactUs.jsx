import { useState } from "react";
import "../ContactUs/ContactUs.css";
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

   // Minimal onSubmit with fetch POST integration
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather form data from inputs and message state
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: message,
    };

    try {
      const response = await fetch("http://localhost:8080/contactinquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error("Failed to send contact inquiry");
        return;
      }

      setSubmitted(true);
      setMessage("");
      e.target.reset();
    } catch (error) {
      console.error("Error sending contact inquiry:", error);
    }
  };

  return (
    <div className="contactSection">
      <form className="contactForm" 
        onSubmit={handleSubmit}>
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
