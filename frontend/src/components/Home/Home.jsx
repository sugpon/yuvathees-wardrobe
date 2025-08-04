import { useState, useEffect } from "react";
import "../Home/Home.css";
import "../../index.css";
import Button from "../Button/Button.jsx";

const images = [
  "/images/Animation1.jpg",
  "/images/Animation2.jpg",
  "/images/Animation3.jpg",
  "/images/Animation4.jpg",
  "/images/Animation5.jpg",
  "/images/Animation6.jpg",
  "/images/Animation7.jpg",
  "/images/Animation8.jpg",
  "/images/Animation9.jpg",
  "/images/Animation10.jpg",
  "/images/Animation11.jpg",
  "/images/Animation12.jpg",
  "/images/Animation13.jpg",
  "/images/Animation14.jpg",
  "/images/Animation15.jpg",
  "/images/Animation16.jpg",
  "/images/Animation17.jpg",
  "/images/Animation18.jpg",
  "/images/Animation19.jpg",
  "/images/Animation20.jpg",
  "/images/Animation21.jpg",
  "/images/Animation22.jpg",
  "/images/Animation23.jpg",
  "/images/Animation24.jpg",
  "/images/Animation25.jpg",
  "/images/Animation26.jpg",
  "/images/Animation27.jpg",
  "/images/Animation28.jpg",
];

export default function Home(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginMessage("");

    if (!adminUsername || !adminPassword) {
      setLoginMessage("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: adminUsername, 
          password: adminPassword 
        }),
      });

      if (response.ok) {
        props.setIsLoggedIn(true);
        setAdminUsername(""); // Clear username after login
        setAdminPassword(""); // Clear password after login
        setLoginMessage("Login successful! You can now access admin features.");
        // TODO: Handle post-login UI updates or redirects
      } else {
        setLoginMessage("Login failed. Please check credentials.");
      }
    } catch (error) {
      setLoginMessage("Error connecting to server. Try again later.");
      console.error("Admin login error:", error);
    }
  };

  return (
    <section className="homeSection">
      <div className="leftSide">
        <div className="slideshowContainer">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Catalogue ${index + 1}`}
              className={`slideImage ${index === currentIndex ? "active" : "inactive"}`}
            />
          ))}
        </div>

      <div className="adminLoginBox">
        {!props.isLoggedIn ? (
          <>
          <h3> Are you a New/ Returning Customer?<br /><a href="/Services">Click here</a></h3>
          Admin Login
              <form onSubmit={handleAdminLogin} className="adminLoginForm">
                <label>Username:</label>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  required
                />
                <label>Password:</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
                <Button label="Login" type="submit"/>
                {loginMessage && <p className="loginMessage">{loginMessage}</p>}
              </form>
            </>
        ) : (
            <div className="welcome-message">
            <h3>Welcome, Admin!</h3>
            {loginMessage && <p className="loginMessage">{loginMessage}</p>}
           
            </div>)
        }
        </div>
      </div>
      
    <div className="rightSide">
      <h2 className="heading">Why Yuvathees Wardrobe?</h2>
      <p className="subheading">
        <em>A Journey Through India’s Rich Textile Heritage, Straight From The House Of Weavers.</em>
      </p>

      <p>From Kashmir to Kanyakumari, every corner of India tells a story through its fabric.</p>

      <p>
        At <strong>Yuvathees Wardrobe</strong>, we don’t just curate garments, we celebrate the
        <strong> diversity, craftsmanship, and heritage</strong> of Indian textiles. From ready-made suits to pure silk sarees,
        our collection brings together wardrobe essentials from across the nation.
      </p>

      <p>
        For centuries, clothing in India reflected its environment. It was shaped by the <strong> climate, lifestyle, and traditions</strong> of its people. Today, as Indians make homes around the world,
        our culture and attire have found <strong>global admiration</strong>, reaching far beyond our borders.
      </p>

      <p>
        The fashion industry has embraced this journey, offering designs that blend
        <strong> heritage with innovation</strong>. Still, the soul of each garment lives in the hands of
        <strong> local weavers</strong>, who carry forward generations of skill, tradition, and storytelling.
      </p>

      <p>
        At <strong>Yuvathees Wardrobe</strong>, we proudly source directly from the <strong> House of Weavers</strong>, ensuring that
        every piece stays true to its roots while supporting the artisans who keep these traditions alive.
      </p>

      <p>
        So how do you bring authentic treasures from the House of Weavers into your wardrobe?<br />
        We are the answer!
      </p>
    </div>
</section>
  );
}
