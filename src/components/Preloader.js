// src/components/Preloader.js

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Impor aset untuk preloader
import chibiHappy from "../assets/chibi-happy.png";
import cupcakeBase from "../assets/cupcake-base.png";
import cupcakeIcing from "../assets/cupcake-icing.png";

// --- Styled Components ---

const PreloaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fde4f2;
  z-index: 9999;
`;

const Card = styled.div`
  background: white;
  padding: 30px 40px;
  border-radius: 20px;
  box-shadow: 0 10px S30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Membuat elemen sejajar di bagian bawah */
  gap: 20px; /* Jarak antara cupcake dan chibi */
  height: 180px;
  width: 300px;
`;

const CupcakeContainer = styled.div`
  position: relative;
  width: 120px;
  height: 150px;
`;

const CupcakeBase = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 2;
`;

const IcingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 120px;
  bottom: 0px; /* CATATAN 1: Atur posisi vertikal krim di sini */
  left: 0;
  overflow: hidden;
  z-index: 1;
`;

const CupcakeIcing = styled(motion.img)`
  width: 100%;
  position: absolute;
  left: 0;
`;

const ChibiCharacter = styled.img`
  width: 150px;
  /* Chibi tidak perlu position absolute, biarkan flexbox yang mengatur */
`;

const LoadingText = styled(motion.p)`
  margin-top: 20px;
  font-family: "Quicksand", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #5d4a43;
`;

// --- Logic Component ---
const Preloader = () => {
  return (
    <PreloaderContainer
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <Card>
        <AnimationWrapper>
          <CupcakeContainer>
            <CupcakeBase src={cupcakeBase} alt="Cupcake base" />
            <IcingWrapper>
              <CupcakeIcing
                src={cupcakeIcing}
                alt="Cupcake icing"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
              />
            </IcingWrapper>
          </CupcakeContainer>
          <ChibiCharacter src={chibiHappy} alt="Chibi decorating" />
        </AnimationWrapper>
        <LoadingText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Baking the sweetness...
        </LoadingText>
      </Card>
    </PreloaderContainer>
  );
};

export default Preloader;
