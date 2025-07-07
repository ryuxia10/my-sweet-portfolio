// src/components/Hero.js

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { scroller } from "react-scroll";
// src/components/Hero.js
// --- PERBAIKAN: Menggabungkan impor background ---
import heroBgLight from "../assets/gula-gula-kapas-awan.png"; // Diberi nama 'heroBgLight'
import heroBgNight from "../assets/background-hero-night.png"; // Diberi nama 'heroBgNight'

// Impor semua aset

import lyxiaImage from "../assets/lyxia.png";
import candy1 from "../assets/permen-lolipop-swirl.png";
import candy2 from "../assets/macaron-pink.png";
import candy3 from "../assets/donat-coklat.png";
import candy4 from "../assets/permen-jelly-bear.png";
import chibiHappy from "../assets/chibi-happy.png";
import welcomeBubble from "../assets/pita-satin-pink.png";
import swirlTransitionImage from "../assets/swirl-transition.png";

// --- Styled Components (TIDAK ADA PERUBAHAN) ---

const HeroContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: url(${heroBgLight});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease-in-out;

  /* --- TAMBAHKAN BLOK INI --- */
  .dark & {
    background-image: url(${heroBgNight});
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  max-width: 50%;
  padding-left: 8%;

  @media (max-width: 1024px) {
    max-width: 100%;
    align-items: center;
    text-align: center;
    padding: 0 30px; /* Beri padding horizontal */
    background: rgba(0, 0, 0, 0.1); /* Sedikit latar belakang agar teks terbaca */
    backdrop-filter: blur(5px);
    border-radius: 20px;
    margin: 0 20px;
  }
`;

const MainHeading = styled(motion.h1)`
  font-size: 5rem;
  margin-bottom: 1rem;
  font-family: "Nunito", sans-serif;
  color: #5d4a43;
  .dark & {
    color: #ffe8f2;
  }
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.7);

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const SubHeading = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
  color: #6a5c57;
  .dark & {
    color: #e0cde0;
  }
  /* --- PERUBAHAN DI SINI --- */
  /* Menambahkan 'outline' atau border putih tipis pada teks */
  -webkit-text-stroke: 2px white;
  paint-order: stroke fill; /* Memastikan stroke di belakang fill */
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ExploreButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  color: #5d4a43;
  background: linear-gradient(145deg, #fff0f6, #fde4f2);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const LyxiaCharacter = styled(motion.img)`
  position: absolute;
  height: 110vh;
  z-index: 1;
  pointer-events: none;
  bottom: -150px;
  left: 60%;

  @media (max-width: 1024px) {
    left: 50%;
    height: 80vh;
    bottom: -20px;
  }
`;

const FloatingElement = styled(motion.img)`
  position: absolute;
  pointer-events: none;
  z-index: 1;
`;

const WelcomeChibiContainer = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;

  img.chibi {
    width: 150px;
  }

  .bubble {
    position: relative;
    width: 200px;
    height: 80px;
    background-image: url(${welcomeBubble});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #5d4a43;
    font-weight: 700;
    margin-bottom: -10px;
    font-family: "Nunito", sans-serif;
  }
`;

const TransitionOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  pointer-events: none;
`;

const SwirlImage = styled(motion.img)`
  width: 5%;
`;

// --- Logic Component ---
const Hero = ({ theme }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleExploreClick = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      scroller.scrollTo("skills-section", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        // --- PERBAIKAN DI SINI ---
        // Mengubah offset dari -50 menjadi 0 agar scroll berhenti pas di atas section.
        offset: 0,
      });
    }, 500);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxX = (mousePosition.x - window.innerWidth / 2) / 40;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) / 40;

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingCandies = [
    { src: candy1, top: "10%", left: "5%", size: "80px", duration: 4 },
    { src: candy1, top: "50%", left: "30%", size: "60px", duration: 7 },
    { src: candy1, top: "80%", left: "60%", size: "90px", duration: 5 },
    { src: candy1, top: "5%", left: "90%", size: "70px", duration: 8 },
    { src: candy2, top: "20%", left: "80%", size: "100px", duration: 6 },
    { src: candy2, top: "75%", left: "2%", size: "80px", duration: 9 },
    { src: candy2, top: "15%", left: "40%", size: "110px", duration: 5.5 },
    { src: candy2, top: "60%", left: "95%", size: "70px", duration: 7.5 },
    { src: candy3, top: "70%", left: "10%", size: "120px", duration: 5 },
    { src: candy3, top: "5%", left: "65%", size: "90px", duration: 8 },
    { src: candy3, top: "85%", left: "80%", size: "110px", duration: 6.5 },
    { src: candy3, top: "40%", left: "50%", size: "75px", duration: 9.5 },
    { src: candy4, top: "65%", left: "90%", size: "90px", duration: 7 },
    { src: candy4, top: "30%", left: "15%", size: "70px", duration: 10 },
    { src: candy4, top: "90%", left: "45%", size: "100px", duration: 6 },
    { src: candy4, top: "10%", left: "25%", size: "80px", duration: 8.5 },
  ];

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <TransitionOverlay>
            <SwirlImage
              src={swirlTransitionImage}
              alt="Transition Swirl"
              initial={{ scale: 1, rotate: 0, opacity: 1 }}
              animate={{ scale: 50, rotate: 360, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeIn" }}
            />
          </TransitionOverlay>
        )}
      </AnimatePresence>

      <HeroContainer id="hero-section">
        <LyxiaCharacter
          src={lyxiaImage}
          alt="Lyxia Character"
          animate={{
            x: `calc(-50% + ${parallaxX}px)`,
            y: parallaxY,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
        <ContentWrapper>
          <MainHeading variants={variants} initial="hidden" animate="visible">
            Creations, Served with Care
          </MainHeading>
          <SubHeading
            variants={variants}
            initial="hidden"
            animate="visible"
            style={{ transitionDelay: "0.2s" }}
          >
            Allow me to serve you a taste of my Master's finest digital
            confections. Every project is crafted with logic, artistry, and a
            sprinkle of genius.
          </SubHeading>

          <ExploreButton
            onClick={handleExploreClick}
            disabled={isTransitioning}
            variants={variants}
            initial="hidden"
            animate="visible"
            style={{ transitionDelay: "0.4s" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isTransitioning ? "Exploring..." : "This Way, Please"}
          </ExploreButton>
        </ContentWrapper>
        {floatingCandies.map((candy, index) => (
          <FloatingElement
            key={index}
            src={candy.src}
            style={{
              top: candy.top,
              left: candy.left,
              width: candy.size,
            }}
            animate={{
              y: ["-15px", "15px"],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: candy.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
        <WelcomeChibiContainer
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <div className="bubble">
            {theme === "dark" ? "Good Night!" : "Good Morning!"}
          </div>
          <img src={chibiHappy} alt="Chibi Happy" className="chibi" />
        </WelcomeChibiContainer>
      </HeroContainer>
    </>
  );
};

export default Hero;
