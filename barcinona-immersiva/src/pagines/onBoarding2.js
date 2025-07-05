import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../estils/onboarding2.module.css'; // personaliza tu CSS aquí
import ButtonText from '../components/botons/buttonText';

function OnBoarding2() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Abans de començar...",
      text: `Aquesta experiència et convida a fer un recorregut pel barri Gòtic de Barcelona. 
Descobriràs la ciutat tal com era al segle XIV, a través d’imatges, enigmes i vídeos en format 360º.`,
      image: null,
    },
    {
      title: "Com funciona?",
      text: `En començar un capítol, la primera cosa que hauràs de fer és resoldre una endevinalla associada a una localització concreta. 
Hauràs d’observar el teu voltant per trobar la resposta.`,
      image: "/imatgesVaries/onboarding2.png",
    },
    {
      title: "Com funciona?",
      text: `Durant la ruta aniràs desbloquejant targetes de coneixement. Inclouen conceptes i explicacions detallades que pots consultar sempre que vulguis des de la biblioteca.`,
      image: "/imatgesVaries/onboarding3.png",
    },
  ];

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigate('/nivells');
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const slide = slides[index];

  return (
    <div className={style.body}>
      <div className={style.header}>
        <span className={style.title}>Inici</span>
        <button className={style.close} onClick={() => navigate('/nivells')}>X</button>
      </div>

      <div className={style.content}>
        <h2 className="headline3" >{slide.title} </h2>
        <p className="bodyLarge">{slide.text}</p>
        {slide.image && <img src={slide.image} alt="" className={style.image} />}
      </div>

      <div className={style.navigation}>
        {index > 0 && <button onClick={prev} className={style.arrow}>&larr;</button>}
        <div className={style.dots}>
          {slides.map((_, i) => (
            <span key={i} className={i === index ? style.activeDot : style.dot}></span>
          ))}
        </div>
        {index < slides.length - 1 && <button onClick={next} className={style.arrow}>&rarr;</button>}
      </div>

      <ButtonText onClick={next}>SEGÜENT</ButtonText>

    </div>
  );
}

export default OnBoarding2;
