import './Footer.css';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'; /* Importing social media icons from react-icons */

function Footer() {
  return (
    <footer className="footer-container">
        <div className="footer-socials">
          <h3 className="socials-title">Stay Connected! Stay Trendy!</h3><br />
            <div className="social-icons">
              <a href="https://instagram.com/yuvatheeswardrobe" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://facebook.com/yuvatheeswardrobe" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://wa.me/919655863110" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            </div>
          <h2 className="footer-title">YUVATHEES ENTERPRISES</h2>
          <p className="footer-years">© 2021 - 2025 Yuvathees Enterprises. All rights reserved.</p>
        </div>
    </footer>
  );
}

export default Footer;
