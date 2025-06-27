import styles from "../../estils/videos.module.css";

export default function CardVideo({ imatge, nom, url, estat }) {
  const esDesbloquejat = estat === "desbloquejat";
  const esActiu = estat === "actiu";
  const esBloquejat = estat === "bloquejat";

  const contingut = (
    <>
      {esBloquejat && (
        <div className={styles.bloquejat}></div>
      )}

 {esActiu && (
  <>
    <img
      src={`/imatgesCaratulesVideo/${imatge}`}
      alt={nom}
      className={`${styles.imatge} ${styles.actiuImatge}`}
    />
    <p className={styles.nom}>{nom}</p>
  </>
)}


      {esDesbloquejat && (
        <>
          <img
            src={`/imatgesCaratulesVideo/${imatge}`}
            alt={nom}
            className={styles.imatge}
          />
          <p className={styles.nom}>{nom}</p>
        </>
      )}
    </>
  );

  return esDesbloquejat ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.targeta}
    >
      {contingut}
    </a>
  ) : (
    <div className={styles.targeta + " " + (esBloquejat ? styles.grayscale : "")}>
      {contingut}
    </div>
  );
}
