import './Header.css';
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom for navigation

function Header() {
  return (
    <header className="header-container">
      <div className="header-logo">
        <img src="/images/yuvatheesfull.png" alt="Yuvathees Wardrobe Logo" />
      </div>
      <div className = "header-2">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/shipping">Shipping</Link>
          <Link to="/subscriber">Subscriber</Link>
          <Link to="/contactus">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
