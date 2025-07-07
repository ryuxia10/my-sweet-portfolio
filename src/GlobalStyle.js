// src/GlobalStyle.js

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* --- PERBAIKAN DI SINI --- */
    /* Memaksa semua elemen untuk tidak menampilkan kursor default */
    cursor: none !important;
  }

  body {
    font-family: 'Quicksand', sans-serif;
    background: linear-gradient(135deg, #FFC3E1 0%, #E2C3FF 50%, #C3E7FF 100%);
    color: #4A4A4A;
    overflow-x: hidden; /* Mencegah scroll horizontal */
    transition: background 0.5s ease; /* Transisi halus untuk background */
  }

  /* Kita tidak lagi memerlukan aturan di bawah ini karena sudah diatasi oleh '*' di atas */
  /*
  a, button, [role="button"] {
      cursor: none;
  }
  */
 /* --- TAMBAHKAN BLOK INI --- */
  body.dark {
    background: #1a1a2e; /* Warna biru dongker gelap */
    color: #e0e0e0; /* Warna teks default untuk mode malam */
  }

  h1, h2, h3 {
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    color: #333;
  }
  /* --- TAMBAHKAN BLOK INI --- */
  body.dark h1, body.dark h2, body.dark h3 {
    color: #f0f6f6;
  }


  /* Custom Scrollbar (Opsional tapi sangat direkomendasikan untuk estetika) */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #fde4f2;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ff85c1, #a985ff);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #ff6eaf, #9b6eff);
  }
`;

export default GlobalStyle;
