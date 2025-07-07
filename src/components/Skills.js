// src/components/Skills.js

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Impor ikon dan chibi
import iconReact from "../assets/ikon-kue-tart.png";
import iconNode from "../assets/ikon-mesin-kopi.png";
import iconDB from "../assets/biskuit-bintang.png";
import iconCloud from "../assets/awan-gulali.png";
import iconUIUX from "../assets/donat-coklat.png";
import iconAPI from "../assets/wafer-roll.png";
import chibiExcited from "../assets/chibi-excited.png";
import chibiThinking from "../assets/chibi-thinking.png";
import chibiHappy from "../assets/chibi-happy.png";
import chibiConfused from "../assets/chibi-confused.png";
import chibiWink from "../assets/chibi-wink.png";
import chibiNeutral from "../assets/chibi-neutral.png";
import starIcon from "../assets/biskuit-bintang.png";

// --- Data untuk Skills ---
const skillsData = [
  {
    id: 1,
    name: "React.js Frontend",
    icon: iconReact,
    chibi: chibiExcited,
    description:
      "My Master loves building beautiful and blazing-fast user interfaces with React!",
    level: 5,
    details: ["Hooks", "Redux Toolkit", "React Router", "Framer Motion"],
  },
  {
    id: 2,
    name: "Node.js Backend",
    icon: iconNode,
    chibi: chibiThinking,
    description:
      "He crafts robust and scalable server-side applications with Node.js and Express.",
    level: 4,
    details: ["Express.js", "RESTful APIs", "Middleware", "JWT"],
  },
  {
    id: 3,
    name: "Database Management",
    icon: iconDB,
    chibi: chibiHappy,
    description:
      "Handling data with SQL or NoSQL (like MongoDB) is one of his fortes.",
    level: 4,
    details: ["MongoDB", "Mongoose", "PostgreSQL", "Query Optimization"],
  },
  {
    id: 4,
    name: "UI/UX Design Principles",
    icon: iconUIUX,
    chibi: chibiWink,
    description:
      "He doesn't just code; he designs intuitive and delightful user experiences.",
    level: 5,
    details: ["Figma", "Prototyping", "User Flow", "Component Design"],
  },
  {
    id: 5,
    name: "API Development",
    icon: iconAPI,
    chibi: chibiConfused,
    description:
      "My Master excels at designing and integrating RESTful APIs and GraphQL.",
    level: 4,
    details: ["API Design", "GraphQL", "Postman", "Authentication"],
  },
  {
    id: 6,
    name: "Cloud & Deployment",
    icon: iconCloud,
    chibi: chibiHappy,
    description:
      "He's experienced in deploying applications to the cloud for the world to see.",
    level: 5,
    details: ["Vercel", "Netlify", "Docker", "CI/CD"],
  },
];

// --- Styled Components (VERSI LENGKAP & BERSIH) ---

const SkillsSection = styled.section`
  padding: 100px 50px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 5;
  transition: background 0.5s ease;
  /* --- PERUBAHAN RESPONSIF --- */
  @media (max-width: 768px) {
    padding: 80px 20px;
  }

  /* --- TAMBAHKAN INI --- */
  .dark & {
    background: rgba(26, 26, 46, 0.3);
  }
`;

const Title = styled.h2`
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 60px;
  color: #5d4a43;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7);
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  max-width: 600px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

const SkillCard = styled(motion.div)`
  background: linear-gradient(145deg, #ffffff, #fdeff6);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: background 0.5s ease;

  /* --- TAMBAHKAN INI --- */
  .dark & {
    background: linear-gradient(145deg, #2c2c44, #3a3a5a);
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
`;

const InfoPanel = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  min-height: 400px;
  position: sticky;
  top: 100px;
  transform-style: preserve-3d;
  perspective: 1000px;
  @media (max-width: 1024px) {
    position: static;
    transform-style: flat; /* Matikan 3D di mobile */
    min-height: auto; /* Biarkan tinggi menyesuaikan */
  }
`;

const CardFace = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: white;
  transition: background 0.5s ease, color 0.5s ease;

  /* --- TAMBAHKAN INI --- */
  .dark & {
    background: #2c2c44;
  }
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* Di DESKTOP, kedua sisi absolut untuk tumpukan 3D */
  @media (min-width: 1025px) {
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
  }
`;

const FrontFace = styled(CardFace)``;

const BackFace = styled(CardFace)`
  justify-content: flex-start;
  gap: 15px;
  /* --- PERBAIKAN: Efek putar hanya aktif di DESKTOP --- */
  @media (min-width: 1025px) {
    transform: rotateY(180deg);
  }
`;

const ChibiDisplay = styled.div`
  height: 200px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChibiImage = styled(motion.img)`
  height: 100%;
  max-height: 180px;
`;

const DescriptionBox = styled(motion.div)`
  h3 {
    font-size: 1.8rem;
    color: #4a4a4a;
    margin-bottom: 10px;
    transition: color 0.5s ease;

    .dark & {
      color: #f0f6f6;
    }
  }
  p {
    font-size: 1.1rem;
    color: #6c6c6c;
    line-height: 1.6;
    transition: color 0.5s ease;

    .dark & {
      color: #bdbdbd;
    }
  }
`;

const DetailsTitle = styled.h4`
  font-size: 1.5rem;
  color: #c26978;
  font-family: "Nunito", sans-serif;
  .dark & {
    color: #ff85c1;
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 5px;
  img {
    width: 30px;
    height: 30px;
  }
`;

const DetailsList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const DetailItem = styled.li`
  background: #fde4f2;
  color: #c26978;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  .dark & {
    background: #4a2b4f;
    color: #ffc4e8;
  }
`;

// --- Varian Animasi untuk Staggered Effect ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// --- Logic Component ---
const Skills = () => {
  const [activeSkillId, setActiveSkillId] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const activeSkill = skillsData.find((skill) => skill.id === activeSkillId);
  const displaySkill = activeSkill || {
    id: 0,
    name: "My Master's Skills",
    chibi: chibiNeutral,
    level: 0,
    details: [],
    description: "Hover over a sweet treat to see the details of his skills!",
  };

  const handleCardClick = (skillId) => {
    setActiveSkillId(skillId);
    setIsFlipped((prevState) => !prevState);
  };

  return (
    <SkillsSection id="skills-section">
      <Title>A Platter of Skills</Title>
      <ContentWrapper>
        <SkillsGrid
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {skillsData.map((skill) => (
            <SkillCard
              key={skill.id}
              onMouseEnter={() => !isFlipped && setActiveSkillId(skill.id)}
              onClick={() => handleCardClick(skill.id)}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              variants={itemVariants}
            >
              <img src={skill.icon} alt={skill.name} />
            </SkillCard>
          ))}
        </SkillsGrid>

        <InfoPanel
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* SISI DEPAN KARTU */}
          <FrontFace>
            <ChibiDisplay>
              <AnimatePresence mode="wait">
                <ChibiImage
                  key={displaySkill.id}
                  src={displaySkill.chibi}
                  alt="Chibi Expression"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </AnimatePresence>
            </ChibiDisplay>
            <DescriptionBox>
              <h3>{displaySkill.name}</h3>
              <p>{displaySkill.description}</p>
            </DescriptionBox>
          </FrontFace>

          {/* SISI BELAKANG KARTU */}
          <BackFace>
            <DetailsTitle>{displaySkill.name}</DetailsTitle>
            <StarRating>
              {Array.from({ length: 5 }).map((_, index) => (
                <img
                  key={index}
                  src={starIcon}
                  alt="star"
                  style={{ opacity: index < displaySkill.level ? 1 : 0.3 }}
                />
              ))}
            </StarRating>
            <DetailsTitle style={{ fontSize: "1.2rem", marginTop: "10px" }}>
              Key Concepts:
            </DetailsTitle>
            <DetailsList>
              {displaySkill.details.map((detail) => (
                <DetailItem key={detail}>{detail}</DetailItem>
              ))}
            </DetailsList>
          </BackFace>
        </InfoPanel>
      </ContentWrapper>
    </SkillsSection>
  );
};

export default Skills;
