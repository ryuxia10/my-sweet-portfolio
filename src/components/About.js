// src/components/About.js

import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Impor Chibi untuk bagian ini
import chibiWink from "../assets/apict1.png";
// --- PERUBAHAN DI SINI ---
// Menambahkan impor untuk chibi baru Anda
import rezaChibi from "../assets/apict2.png";

// --- Animation Variants (TIDAK ADA PERUBAHAN) ---
const sectionVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const listContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const listItemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

// --- Styled Components ---

const AboutSection = styled(motion.section)`
  padding: 100px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 4;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 60px;
  color: #5d4a43;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7);
`;

const RecipeBook = styled.div`
  background: #fffafc;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 1000px;
  padding: 50px;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 50px;
  transition: background 0.5s ease;

  /* --- TAMBAHKAN INI --- */
  .dark & {
    background: #2c2c44;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 30px;
    gap: 30px;
  }
`;

const LeftPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .bubble-text {
    font-style: italic;
    color: #e57373;
    margin-bottom: 20px;
    transition: color 0.5s ease;

    .dark & {
      color: #ff8a80;
    }
  }

  .master-name {
    font-size: 2rem;
    font-family: "Nunito", sans-serif;
    color: #4a4a4a;
    font-weight: 700;
    transition: color 0.5s ease;

    .dark & {
      color: #f0f6f6;
    }
  }
`;

// --- PERUBAHAN DI SINI ---
// Container baru untuk menampung kedua chibi secara berdampingan
const ChibiPairContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Membuat chibi sejajar di bagian bawah */
  gap: 15px; /* Jarak antara kedua chibi */
  margin-bottom: 20px;

  img {
    /* Ukuran dibuat sedikit lebih kecil agar pas */
    width: 140px;
    height: auto;
  }
`;

const RightPage = styled.div`
  h3 {
    font-size: 1.8rem;
    color: #c26978;
    margin-bottom: 15px;
    border-bottom: 2px solid #fce4ec;
    padding-bottom: 10px;
    transition: color 0.5s ease, border-color 0.5s ease;

    .dark & {
      color: #ff85c1;
      border-bottom-color: #4a2b4f;
    }
  }
`;

const IngredientsList = styled(motion.ul)`
  list-style: none;
  padding-left: 0;

  li {
    font-size: 1.1rem;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    color: #6c6c6c;
    transition: color 0.5s ease;
    .dark & {
      color: #bdbdbd;
    }

    &::before {
      content: "✨";
      margin-right: 10px;
      font-size: 1rem;
    }
  }
`;

const Method = styled.div`
  margin-top: 30px;
  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #6c6c6c;
    transition: color 0.5s ease;
    .dark & {
      color: #bdbdbd;
    }
  }
`;

// --- Logic Component ---
const About = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <AboutSection
      ref={ref}
      variants={sectionVariant}
      initial="hidden"
      animate={controls}
      id="about-section"
    >
      <Title>The Recipe of My Master</Title>
      <RecipeBook>
        <LeftPage>
          {/* --- PERUBAHAN DI SINI --- */}
          {/* Menggunakan container ChibiPairContainer untuk membungkus kedua gambar */}
          <ChibiPairContainer>
            <motion.img
              src={chibiWink}
              alt="Lyxia Chibi"
              variants={listItemVariant}
            />
            <motion.img
              src={rezaChibi}
              alt="Reza Chibi"
              variants={listItemVariant}
            />
          </ChibiPairContainer>

          <motion.p className="bubble-text" variants={listItemVariant}>
            "Let me show you the recipe for his brilliance!"
          </motion.p>
          <motion.h2 className="master-name" variants={listItemVariant}>
            Reza Dwiky Anggara
          </motion.h2>
        </LeftPage>

        <RightPage>
          <motion.div variants={listContainerVariant}>
            <h3>The Ingredients</h3>
            <IngredientsList>
              <motion.li variants={listItemVariant}>
                The Foundation: <strong>Node.js & Express.js</strong>
              </motion.li>
              <motion.li variants={listItemVariant}>
                Data Storage: <strong>MongoDB & SQL</strong>
              </motion.li>
              <motion.li variants={listItemVariant}>
                Communication: <strong>RESTful API & GraphQL</strong>
              </motion.li>
              <motion.li variants={listItemVariant}>
                The Decoration: <strong>React.js & Hooks</strong>
              </motion.li>
              <motion.li variants={listItemVariant}>
                User Experience:{" "}
                <strong>Advanced CSS & UI/UX Principles</strong>
              </motion.li>
              <motion.li variants={listItemVariant}>
                Final Polish: <strong>Passion & Creativity</strong>
              </motion.li>
            </IngredientsList>

            <Method>
              <h3>The Method</h3>
              <motion.p variants={listItemVariant}>
                Combine all technical ingredients with a generous pour of
                passion. Mix with clean code practices and a user-centric
                approach. Deploy with care and serve a delightful digital
                experience to the world.
              </motion.p>
            </Method>
          </motion.div>
        </RightPage>
      </RecipeBook>
    </AboutSection>
  );
};

export default About;
