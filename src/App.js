// src/App.js

import React, { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import GlobalStyle from "./GlobalStyle";
import CustomCursor from './components/CustomCursor'; // <-- 1. Impor kursor
import Preloader from "./components/Preloader"; // <-- 1. Impor Preloader

// Impor komponen lain
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const Skills = React.lazy(() => import("./components/Skills"));
const About = React.lazy(() => import("./components/About"));
const Projects = React.lazy(() => import("./components/Projects"));
const Contact = React.lazy(() => import("./components/Contact"));

const LoadingFallback = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-family: "Quicksand", sans-serif;
  color: #5d4a43;
`;

function App() {
  // --- PERUBAHAN DI SINI ---
  // State untuk mengontrol visibilitas preloader
  const [isLoading, setIsLoading] = useState(true);
  // --- PERUBAHAN DI SINI ---
  // State untuk menyimpan tema (light atau dark)
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Simulasi waktu loading (misalnya 3.5 detik) agar animasi sempat berjalan
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    // --- PERUBAHAN DI SINI ---
    // Logika untuk menentukan tema berdasarkan waktu
    const currentHour = new Date().getHours();
    // Jika waktu sebelum jam 6 pagi ATAU setelah jam 6 sore (18:00)
    if (currentHour < 6 || currentHour >= 18) {
      setTheme("dark");
    }

    return () => clearTimeout(timer); // Membersihkan timer
  }, []);

  return (
    // --- PERUBAHAN DI SINI ---
    // Memberi class 'dark' atau 'light' pada wrapper utama
    <div className={theme}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" />
        ) : (
          <div key="main-app">
            <CustomCursor />
            <GlobalStyle />
            <Navbar />
            <Hero theme={theme} />
            <Suspense
              fallback={<LoadingFallback>Loading sweets...</LoadingFallback>}
            >
              <Skills />
              <About />
              <Projects />
              <Contact />
            </Suspense>

            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
