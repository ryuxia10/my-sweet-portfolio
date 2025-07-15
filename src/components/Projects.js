// src/components/Projects.js

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import ProjectModal from "./ProjectModal";
// src/components/Projects.js
// ...
import backgroundLight from "../assets/background1.png";
import backgroundProjectsNight from "../assets/background-projects-night.png"; // <-- Impor background malam
// ...

// --- PERUBAHAN: Impor semua gambar baru ---
import backgroundImage from "../assets/background1.png";
import machineImage from "../assets/machine1.png";
import pullerImage from "../assets/puller1.png";
import p1Image from "../assets/p1.png";
import p2Image from "../assets/p2.png";
import p3Image from "../assets/p3.png";
import p4Image from "../assets/p4.png";

// Impor gambar proyek Anda (tetap dibutuhkan untuk modal)
import project1Image from "../assets/project-1.png";
import project2Image from "../assets/project-2.png";
import project3Image from "../assets/project-3.png";
import project4Image from "../assets/project-4.png";

// --- Data Proyek (Menambahkan properti 'icon' baru) ---
const projectsData = [
  {
    id: 1,
    title: "Mini Bar Cafe: A Web-based Menu",
    image: project1Image,
    icon: p1Image,
    description:
      "A modern, responsive web interface designed to replace traditional physical menus. This application allows customers to effortlessly browse items, view details, and connect to order, significantly enhancing both operational efficiency and the overall customer experience.",
    tags: ["React", "Styled-Components", "UI/UX Design", "Frontend Dev", "Responsive Web"],
    liveUrl: "https://menu-minibar-react.vercel.app/",
    githubUrl: "https://github.com/ryuxia10/menu-minibar-react",
  },
  {
    id: 2,
    title: "3D Interactive AI Assistant",
    image: project2Image,
    icon: p2Image,
    description:
      "An intelligent chatbot brought to life with an interactive 3D avatar. It's capable of responding to user input in real-time using Natural Language Processing (NLP), creating a more personal and engaging conversational experience.",
    tags: ["AI", "React.js", "Three.js", "Chatbot", "3d Graphics"],
    liveUrl: "https://vryxia.vercel.app/",
    githubUrl: "https://github.com/ryuxia10/website-3d-maid",
  },
  {
    id: 3,
    title: "Visual Storytelling Platform",
    image: project3Image,
    icon: p3Image,
    description:
      "An exploration into building story-rich user interfaces using React. This project focuses on complex state management to track the narrative flow and dynamic animations from Framer Motion to bring dialogue and characters to life.",
    tags: ["React.js", "Framer Motion", "Game UI", "Storytelling", "State Management"],
    liveUrl: "https://aethelgard.vercel.app/",
    githubUrl: "https://github.com/ryuxia10/aethelgard-showcase",
  },
  {
    id: 4,
    title: "Cipher Agency Website",
    image: project4Image,
    icon: p4Image,
    description:
      "Cipher Agency is a highly immersive and interactive web application designed to showcase cutting-edge web development and UI/UX principles, infused with a unique anime aesthetic.",
    tags: ["React.js", "Framer Motion", "Styled Component", "Augmented Reality", "Responsive Design"],
    liveUrl: "https://cipher-agent.vercel.app/",
    githubUrl: "https://github.com/ryuxia10/cipher-agent",
  },
];

// --- Styled Components Baru ---

const ProjectsSection = styled.section`
  padding: 100px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* --- PERUBAHAN: Menggunakan gambar background --- */
  background-image: url(${backgroundLight});
  transition: background-image 0.5s ease-in-out;
  /* --- TAMBAHKAN BLOK INI --- */
  .dark & {
    background-image: url(${backgroundProjectsNight});
  }
  background-size: cover;
  background-position: center;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 10px;
  color: #5d4a43;
  .dark & {
    color: #ffe8f2;
  }
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.7);
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const GachaWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0; /* Jarak diatur oleh posisi gambar */
  position: relative;
  @media (max-width: 480px) {
    transform: scale(0.8); /* Kecilkan seluruh mesin di layar sangat kecil */
  }
`;

const MachineBody = styled.div`
  width: 340px; /* Disesuaikan dengan aspek rasio gambar */
  height: 435px;
  /* --- PERUBAHAN: Menggunakan gambar mesin --- */
  background-image: url(${machineImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  left: 30px;
  z-index: 3;
`;

const Glass = styled.div`
  position: absolute;
  top: 90px;
  left: 95px;
  width: 260px;
  height: 250px;
  overflow: hidden;
`;

const ProjectIcon = styled(motion.img)`
  position: absolute;
  width: 80px; /* Ukuran bola */
`;

const Chute = styled.div`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 80px;
`;

const Lever = styled(motion.div)`
  width: 115px; /* Disesuaikan dengan aspek rasio gambar */
  height: 225px;
  /* --- PERUBAHAN: Menggunakan gambar tuas --- */
  background-image: url(${pullerImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  cursor: pointer;
  transform-origin: bottom center;
  margin-left: -45px; /* Geser ke kiri (nilai negatif) - Anda bisa sesuaikan angka ini */
  margin-bottom: 10px; /* Sesuaikan jarak bawah jika perlu */
  z-index: 5;
`;

const DispensedGumball = styled(motion.img)`
  position: absolute;
  width: 60px;
  height: 60px;
  z-index: 1; /* Pindahkan bola ke belakang mesin */
  left: 170px; /* Sesuaikan posisi horizontal agar tepat di lubang */
 // transform: translateX(0); /* Hapus translasi horizontal */
  bottom: 60px; /* Sesuaikan posisi vertikal jika perlu */
`;

const InstructionText = styled.div`
  margin-top: 0px;
  color: #4a4a4a;
  background: rgba(255, 255, 255, 0.7);
  .dark & {
    color: #1a1a2e;
    background: rgba(255, 255, 255, 0.8);
  }
  font-weight: 500;
  text-align: center;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  padding: 5px 20px;
  border-radius: 20px;
`;

const OpenButton = styled(motion.button)`
  margin-left: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(145deg, #4caf50, #81c784);
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

// --- Logic Component ---
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dispensedProject, setDispensedProject] = useState(null);
  const controls = useAnimation();

  const handleLeverPull = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDispensedProject(null);

    await controls.start({ rotate: 20 });
    await controls.start({ rotate: 0 });

    const randomIndex = Math.floor(Math.random() * projectsData.length);
    const project = projectsData[randomIndex];
    setDispensedProject(project);
  };

  return (
    <ProjectsSection id="projects-section">
      <Title>Pull for a Project!</Title>

      <GachaWrapper>
        <AnimatePresence>
          {dispensedProject && (
            <DispensedGumball
              key={dispensedProject.id}
              src={dispensedProject.icon} // Menggunakan ikon dari data
              initial={{ y: -200, scale: 0.5 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              onAnimationComplete={() => setIsAnimating(false)}
            />
          )}
        </AnimatePresence>
        <MachineBody>
          <Glass></Glass>
          <Chute></Chute>
        </MachineBody>
        <Lever
          animate={controls}
          onClick={handleLeverPull}
          whileHover={{ scale: 1.05 }}
        />
      </GachaWrapper>

      <InstructionText>
        <AnimatePresence mode="wait">
          {/* Jika sedang animasi, tampilkan "Dispensing..." */}
          {isAnimating && (
            <motion.p
              key="dispensing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Dispensing...
            </motion.p>
          )}

          {/* Jika tidak animasi DAN ada proyek yang keluar, tampilkan hasilnya */}
          {dispensedProject && !isAnimating && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              You got: <strong>{dispensedProject.title}</strong>
              <OpenButton onClick={() => setSelectedProject(dispensedProject)}>
                Open
              </OpenButton>
            </motion.div>
          )}
        </AnimatePresence>
      </InstructionText>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
};

export default Projects;
