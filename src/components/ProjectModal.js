// src/components/ProjectModal.js

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
// --- PERUBAHAN DI SINI ---
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// --- Styled Components ---

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled(motion.div)`
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background: white;
  border-radius: 20px;
  overflow-y: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #fce4ec;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #5d4a43;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// --- PERUBAHAN DI SINI ---
// Kita ubah dari img biasa menjadi div untuk membungkus LazyLoadImage
const ProjectImageWrapper = styled.div`
  width: 100%;
  border-radius: 15px;
  margin-bottom: 20px;
  overflow: hidden; // Penting untuk border-radius
  
  .lazy-load-image-background {
      display: block !important; // override default style
  }
`;

const ProjectTitle = styled.h2`
  font-size: 2.5rem;
  color: #5d4a43;
  margin-bottom: 10px;
`;

const ProjectDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #6c6c6c;
  margin-bottom: 20px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
`;

const Tag = styled.span`
  background: #fde4f2;
  color: #c26978;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ProjectLink = styled.a`
  padding: 10px 25px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;

  &.live {
    background: linear-gradient(145deg, #ff85c1, #a985ff);
    color: white;
  }
  &.github {
    background: #eee;
    color: #333;
  }
  &:hover {
    transform: translateY(-3px);
  }
`;

// --- Logic Component ---
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <Backdrop
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalContainer
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100vh", opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {/* --- PERUBAHAN DI SINI --- */}
        <ProjectImageWrapper>
          <LazyLoadImage
            src={project.image}
            alt={project.title}
            effect="blur"
            width="100%"
          />
        </ProjectImageWrapper>
        
        <ProjectTitle>{project.title}</ProjectTitle>
        <TagContainer>
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagContainer>
        <ProjectDescription>{project.description}</ProjectDescription>
        <LinkContainer>
          <ProjectLink
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="live"
          >
            Live Demo
          </ProjectLink>
          <ProjectLink
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="github"
          >
            GitHub
          </ProjectLink>
        </LinkContainer>
      </ModalContainer>
    </Backdrop>
  );
};

export default ProjectModal;
