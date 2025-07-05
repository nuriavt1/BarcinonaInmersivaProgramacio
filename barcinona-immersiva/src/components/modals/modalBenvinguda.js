import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ButtonText from "../botons/buttonText";
import styles from "../../estils/modalBenvinguda.module.css";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function ModalBenvinguda({ onClose }) {
  const [[index, direction], setIndex] = useState([0, 0]);

  const slides = [
    {
      title: "BENVINGUT A BARCELONA, LA CIUTAT MEDIEVAL",
      text: `Comença la teva jornada laboral com a metge apotecari de la ciutat medieval de Barcelona. Resol enigmes i desplaça’t per la ciutat per desbloquejar nous coneixements i fragments de la història.`,
    },
    {
      title: "Per on començo?",
      text: `L’experiència comença a la plaça Sant Jaume. 
Des d’allà, segueix el mapa, resol els enigmes i desbloqueja el següent punt de la ruta.
El recorregut té 8 localitzacions, 4 amb endevinalles i 4 ubicacions amb vídeos.`,
      image: "/imatgesBoarding/miniMap.png",
    },
  ];

  const paginate = (newDirection) => {
    const newIndex = index + newDirection;
    if (newIndex < 0) return;
    if (newIndex >= slides.length) {
      onClose();
      return;
    }
    setIndex([newIndex, newDirection]);
  };

  const slide = slides[index];

  return (
    <div
      className={styles.modalOverlay}
      style={{
        backgroundImage: `url('/imatgesBoarding/fondo.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.closeBtn} onClick={onClose}>✕</div>

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={styles.modalContent}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (info.offset.x < -100) paginate(1);
            else if (info.offset.x > 100) paginate(-1);
          }}
        >
          <h2 className="headline2">{slide.title}</h2>
          <p className="bodyMedium">{slide.text}</p>
          {slide.image && (
            <img
              src={slide.image}
              alt="Diapositiva"
              style={{ width: "100%", marginTop: "1rem", borderRadius: "8px" }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* FOOTER COMPLET */}
      <div className={styles.footer}>
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <span
              key={i}
              className={i === index ? styles.activeDot : styles.dot}
            ></span>
          ))}
        </div>
        <div className={styles.navigation}>
          <div style={{ display: "flex", width: "100%", justifyContent: "left" }}>
            {index > 0 && (
              <button onClick={() => paginate(-1)} className={styles.arrow}>
                <FaArrowLeft size={33} />
              </button>
            )}
          </div>
          <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <ButtonText onClick={() => paginate(1)}>
              {index === slides.length - 1 ? "D’ACORD" : "SEGÜENT"}
            </ButtonText>
          </div>
          <div style={{ display: "flex", width: "100%", justifyContent: "right" }}>
            {index < slides.length - 1 && (
              <button onClick={() => paginate(1)} className={styles.arrow}>
                <FaArrowRight size={33} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
