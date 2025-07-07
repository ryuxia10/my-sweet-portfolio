// src/components/Contact.js

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

import emailjs from "@emailjs/browser";
import chibiThinking from "../assets/chibi-thinking.png";
import chibiHappy from "../assets/chibi-happy.png";
import chibiYum from "../assets/chibi-yum.png";

// --- Styled Components (TIDAK ADA PERUBAHAN) ---

const ContactSection = styled.section`
  padding: 100px 50px;
  background: linear-gradient(135deg, #e2c3ff 0%, #c3e7ff 100%);
  position: relative;
  z-index: 5;
  transition: background 0.5s ease;

  /* --- TAMBAHKAN INI --- */
  .dark & {
    background: linear-gradient(135deg, #1a1a2e 0%, #2c2c44 100%);
  }
`;

const Title = styled.h2`
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 10px;
  color: #5d4a43;
`;

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  transition: background 0.5s ease;

  /* --- TAMBAHKAN INI --- */
  .dark & {
    background: #2c2c44;
  }
  padding: 40px 50px;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 30px 25px;
  }
`;

const StyledForm = styled(motion.form)`
  width: 100%;
  flex: 2;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 700;
    color: #888;
    transition: color 0.5s ease;
    .dark & {
      color: #aaa;
    }
  }

  input,
  textarea {
    width: 100%;
    padding: 15px;
    background: white;
    color: #333;
    border: 2px solid #fde4f2;
    transition: all 0.3s;

    /* --- TAMBAHKAN INI --- */
    .dark & {
      background: #3a3a5a;
      color: #f0f6f6;
      border-color: #4a2b4f;
    }
    border-radius: 10px;
    font-family: "Quicksand", sans-serif;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
      outline: none;
      border-color: #ff85c1;
      box-shadow: 0 0 0 3px rgba(255, 133, 193, 0.3);
      /* --- TAMBAHKAN INI --- */
      .dark &:focus {
        border-color: #ff85c1;
        box-shadow: 0 0 0 3px rgba(255, 133, 193, 0.2);
      }
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(145deg, #ff85c1, #a985ff);
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ChibiContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 200px;
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  width: 100%;

  h3 {
    font-size: 2rem;
    color: #4caf50;
    margin-bottom: 20px;
  }
  p {
    font-size: 1.2rem;
    color: #666;
  }
  img {
    width: 200px;
    margin-top: 30px;
  }
`;

// --- Logic Component ---
const Contact = () => {
  // --- PERBAIKAN DI SINI ---
  // Baris yang hilang ini ditambahkan kembali.
  const form = useRef();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isTyping, setIsTyping] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("idle");

  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    if (!isTyping) setIsTyping(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    setIsTyping(false);

    emailjs
      .sendForm(
        "service_zyq768s",
        "template_xpe5zg7",
        form.current, // Sekarang 'form' sudah terdefinisi
        "19VRtmAQre9lYGZ8t"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmissionStatus("success");
        },
        (error) => {
          console.log(error.text);
          setSubmissionStatus("error");
          alert("Oops! Something went wrong. Please try again.");
        }
      );
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  let chibiSrc = chibiHappy;
  if (isTyping) chibiSrc = chibiThinking;

  return (
    <ContactSection id="contact-section">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={formVariants}
      >
        <Title>Send a Sweet Note</Title>
        <FormWrapper>
          <AnimatePresence mode="wait">
            {submissionStatus !== "success" ? (
              <StyledForm key="form" ref={form} onSubmit={handleSubmit}>
                <InputGroup>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    onChange={handleInputChange}
                  ></textarea>
                </InputGroup>
                <SubmitButton
                  type="submit"
                  disabled={submissionStatus === "submitting"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {submissionStatus === "submitting"
                    ? "Sending..."
                    : "Send Message"}
                </SubmitButton>
              </StyledForm>
            ) : (
              <SuccessMessage
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3>Thank You!</h3>
                <p>
                  My Master has received your message and will get back to you
                  soon!
                </p>
                <img src={chibiYum} alt="Chibi Yum" />
              </SuccessMessage>
            )}
          </AnimatePresence>

          {submissionStatus !== "success" && (
            <ChibiContainer>
              <img src={chibiSrc} alt="Interactive Chibi" />
            </ChibiContainer>
          )}
        </FormWrapper>
      </motion.div>
    </ContactSection>
  );
};

export default Contact;
