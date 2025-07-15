// src/components/Navbar.js

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

// --- Styled Components ---

const NavContainer = styled(motion.nav)`
  /* --- PERBAIKAN DI SINI --- */
  /* Mengubah dari 'sticky' menjadi 'fixed' */
  position: fixed;
  top: 0;
  width: 100%;
  padding: 15px 50px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(255, 255, 255, 0.4);
  .dark & {
    background: rgba(26, 26, 46, 0.4); /* Background gelap transparan */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: top 0.3s; /* Menambah transisi halus jika diperlukan nanti */

  @media (max-width: 768px) {
    padding: 15px 20px;
    justify-content: center;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const NavLinkItem = styled.li`
  .nav-link {
    font-family: "Quicksand", sans-serif;
    font-weight: 700;
    color: #5d4a43;
    .dark & {
      color: #e0cde0;
    }
    text-decoration: none;
    cursor: pointer;
    font-size: 1.1rem;
    position: relative;
    padding-bottom: 5px;
    transition: color 0.3s ease;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(145deg, #ff85c1, #a985ff);
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.3s ease-out;
    }

    &:hover::after,
    &.active::after {
      transform: scaleX(1);
    }

    &.active {
      color: #c26978;
      .dark & {
        color: #ff85c1;
      }
    }
  }
`;

// --- Logic Component (TIDAK ADA PERUBAHAN) ---
const Navbar = () => {
  // Logika untuk menyembunyikan/menampilkan navbar saat scroll bisa ditambahkan di sini jika mau,
  // tapi untuk saat ini kita biarkan selalu terlihat.

  return (
    <NavContainer
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
    >
      <NavLinks>
        <NavLinkItem>
          <Link
            to="hero-section"
            className="nav-link"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-100}
          >
            Home
          </Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link
            to="skills-section"
            className="nav-link"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={30} // Mengubah offset ke 0 agar pas dengan bagian atas
          >
            Skills
          </Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link
            to="about-section"
            className="nav-link"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={40}
          >
            About
          </Link>
        </NavLinkItem>
        {/* --- TAMBAHKAN INI --- */}
        <NavLinkItem>
          <Link
            to="projects-section"
            className="nav-link"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={50}
          >
            Projects
          </Link>
        </NavLinkItem>

        <NavLinkItem>
          <Link
            to="contact-section"
            className="nav-link"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={55}
          >
            Contact
          </Link>
        </NavLinkItem>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;
