import React from "react";
import "./Footer.css"; // Create this CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We are dedicated to providing the best pet products for your furry
            friends. Shop with confidence!
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/category">Categories</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@myecommercewebsite.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Pet Lane, Pet City, PC 12345</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="https://pinterest.com" aria-label="Pinterest">
              <FontAwesomeIcon icon={faPinterest} size="lg" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 My E-commerce Website. All rights reserved.</p>
      </div>
    </footer>
  );
};
