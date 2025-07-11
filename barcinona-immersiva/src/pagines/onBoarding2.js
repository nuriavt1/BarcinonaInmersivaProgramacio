import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../estils/onboarding2.module.css';
import ButtonText from '../components/botons/buttonText';
import CloseButton from '../components/botons/closeButton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfig } from '../context/configContext';

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

function OnBoarding2() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const navigate = useNavigate();
   const { isFirstTime, setIsFirstTime } = useConfig();


  const slides = [
    {
      title: "Abans de començar...",
      text: `Aquesta experiència et convida a fer un recorregut pel barri Gòtic de Barcelona. 
Descobriràs la ciutat tal com era al segle XIV, a través d’imatges, enigmes i vídeos en format 360º.`,
      image: "/imatgesBoarding/onboarding1.png",
    },
    {
      title: "Com funciona?",
      text: `En començar un capítol, la primera cosa que hauràs de fer és resoldre una endevinalla associada a una localització concreta. 
Hauràs d’observar el teu voltant per trobar la resposta.`,
      image: "/imatgesBoarding/onboarding2.png",
      text2: "Quan el completis, se’t revelarà el següent ubiació de la ruta, on podràs activar un fragment de vídeo 360° i descobrir la història de Marçal, el nostre protagonista.",
      image2: "/imatgesBoarding/onboarding22.png",
    },
    {
      title: "Com funciona?",
      text: `Durant la ruta aniràs desbloquejant targetes de coneixement. Inclouen conceptes i explicacions detallades que pots consultar sempre que vulguis des de la biblioteca.`,
      image: "/imatgesBoarding/onboarding3.png",
    },
  ];

  const paginate = (newDirection) => {
    const newIndex = index + newDirection;
    if (newIndex < 0) return;
    if (newIndex >= slides.length) {
       if (isFirstTime) {
      navigate('/onBoarding');
       setIsFirstTime(false);
    } else {
      navigate('/nivells');
    }
      return;
    }
    setIndex([newIndex, newDirection]);
  };

  const slide = slides[index];

  return (
    <div className={style.body}>
      <div className={style.header}>
     <CloseButton  onClick={() => navigate(isFirstTime ? '/onBoarding' : '/nivells')}></CloseButton>
      </div>

      <div className={style.bodyContainer}>
        <div className={style.slideWrapper}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) paginate(1);     // izquierda → siguiente
                else if (info.offset.x > 100) paginate(-1); // derecha → anterior
              }}
              className={style.content}
            >
              <h2 className="headline3">{slide.title}</h2>
              <p className="bodyLarge">{slide.text}</p>
              {slide.image && <img src={slide.image} alt="" className={style.image} />}
              <p className="bodyLarge">{slide.text2}</p>
              {slide.image && <img src={slide.image2} alt="" className={style.image2} />}
            </motion.div>
          </AnimatePresence>
        </div>


<div className={style.footer}>
        <div className={style.dots}>
          {slides.map((_, i) => (
            <span key={i} className={i === index ? style.activeDot : style.dot}></span>
          ))}

        </div>
        <div className={style.navigation}>
          <div style={{ display: "flex", width: "100%", justifyContent: "left" }}>
            {index > 0 && (
              <button onClick={() => paginate(-1)} className={style.arrow}>
                <FaArrowLeft size={33} />
              </button>
            )}
          </div>
<div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
  <ButtonText onClick={() => paginate(1)}>
    {index === slides.length - 1 ? "ENTÈS!" : "SEGÜENT"}
  </ButtonText>
</div>
          <div style={{ display: "flex", width: "100%", justifyContent: "right" }}>
            {index < slides.length - 1 && (
              <button onClick={() => paginate(1)} className={style.arrow}>
                <FaArrowRight size={33} />
              </button>
            )}
          </div>
        </div>
</div>


      </div>


    </div>
  );
}

export default OnBoarding2;
