import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import * as Icon from 'react-bootstrap-icons';
import React from 'react';

const Footer = () => {

  return (
    <footer className="d-flex opacity-75 flex-wrap navbar-light bg-light justify-content-between align-items-center mb-0 mt-auto" style={{ maxHeight: 50, minHeight: 50 }}>
      <div className="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 mb-md-0 text-muted text-decoration-none lh-1">
          <svg class="bi" width="30" height="24"></svg>
        </a>
        <span class="mb-3 mb-md-0 text-muted">© 2024 BeerCommunity</span>
      </div>

      <ul class="nav col-md-4 me-4 gap-2 justify-content-end list-unstyled d-flex">
        <li class="ms-3">
          <a class="text-muted" href="https://x.com/">
            <Icon.TwitterX size={24} color='grey' />
          </a>
        </li>
        <li class="ms-3">
          <a class="text-muted" href="https://www.instagram.com/">
            <Icon.Instagram size={24} color='grey' />
          </a>
        </li>
        <li class="ms-3">
          <a class="text-muted" href="https://www.facebook.com/">
            <Icon.Facebook size={24} color='grey' />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;