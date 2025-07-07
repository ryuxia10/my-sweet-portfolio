// src/components/CustomCursor.js

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Impor gambar kursor Anda
import pointerImg from "../assets/pointer.png";
import hoverImg from "../assets/hover.png";

// --- PERBAIKAN: Memberi ukuran pada Wrapper ---
const CursorWrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 40px; /* Beri ukuran yang pas dengan gambar kursor Anda */
  height: 40px; /* Beri ukuran yang pas dengan gambar kursor Anda */
  pointer-events: none; /* Penting agar tidak menghalangi klik */
  z-index: 9999;
`;

const CursorImage = styled(motion.img)`
  width: 100%;
  height: 100%;
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Deteksi saat mouse diarahkan ke elemen yang bisa diklik
    const handleMouseOver = (e) => {
      // Kita periksa tag 'A', 'BUTTON', atau elemen dengan 'cursor: pointer'
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        window.getComputedStyle(e.target).cursor === "pointer"
      ) {
        setIsHoveringLink(true);
      }
    };

    // Deteksi saat mouse meninggalkan elemen yang bisa diklik
    const handleMouseOut = (e) => {
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        window.getComputedStyle(e.target).cursor === "pointer"
      ) {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // Varian untuk posisi Wrapper
  const wrapperVariants = {
    default: {
      x: mousePosition.x - 20, // Offset setengah dari ukuran wrapper (40px / 2)
      y: mousePosition.y - 20,
    },
  };

  // Varian untuk skala gambar di dalamnya
  const imageVariants = {
    default: { scale: 1 },
    hover: { scale: 1.2 }, // Membesar saat hover
  };

  return (
    <CursorWrapper
      variants={wrapperVariants}
      animate="default"
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {/* --- PERBAIKAN: Mengganti gambar secara dinamis --- */}
      <CursorImage
        src={isHoveringLink ? hoverImg : pointerImg}
        alt="custom cursor"
        variants={imageVariants}
        animate={isHoveringLink ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </CursorWrapper>
  );
};

export default CustomCursor;
