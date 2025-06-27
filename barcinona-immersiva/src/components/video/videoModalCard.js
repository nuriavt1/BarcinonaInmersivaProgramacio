import styles from "../../estils/videoModalCard.module.css";

export default function VideoModalCard({ imatge, nom, url, estat }) {
  const esDesbloquejat = estat === "desbloquejat";
  const esActiu = estat === "actiu";

  const contingut = (
    <>
      <img
        src={`/imatgesCaratulesVideo/${imatge}`}
        alt={nom}
        className={`${styles.imatge} ${esActiu ? styles.actiuImatge : ""}`}
      />
      <p className={styles.nom}>{nom}</p>
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
    <div className={styles.targeta}>
      {contingut}
    </div>
  );
}
