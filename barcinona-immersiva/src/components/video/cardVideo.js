import styles from "../../estils/videos.module.css";

export default function CardVideo({ imatge, nom, estat, url }) {
  const esDesbloquejat = estat === "desbloquejat";
  const esActiu = estat === "actiu";
  const esBloquejat = estat === "bloquejat";

  const contingut = (
    <div className={styles.targeta}>
      {esBloquejat && (
        <div className={styles.lockContainer}>
          <img
            src="/imatgesVaries/candau.png"  // Ruta fixa dins public/
            alt="bloquejat"
            className={styles.candau}
          />
        </div>
      )}

      {(esActiu || esDesbloquejat) && (
        <img
          src={`/imatgesCaratulesVideo/${imatge}`}
          alt={nom}
          className={`${styles.imatge} ${esActiu ? styles.actiuImatge : ""}`}
        />
      )}
    </div>
  );

  return (
    <div className={styles.targetaWrapper}>
      {esDesbloquejat ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {contingut}
        </a>
      ) : (
        <>{contingut}</>
      )}
      {(esActiu || esDesbloquejat) && (
        <p className={styles.nom}>{nom}</p>
      )}
    </div>
  );
}
