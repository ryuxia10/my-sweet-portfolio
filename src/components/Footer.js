// src/components/Footer.js

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  padding: 30px 50px;
  background-color: #f8bbd0; // Warna pink yang sangat lembut
  text-align: center;
  color: #5d4a43;
  font-family: "Quicksand", sans-serif;
  transition: background-color 0.5s ease, color 0.5s ease;

  /* --- TAMBAHKAN INI --- */
  .dark & {
    background-color: #1a1a2e;
    color: #bdbdbd;
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterText>
        © {currentYear} Reza Dwiky Anggara. Crafted with 🍬 by Lyxia.
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
