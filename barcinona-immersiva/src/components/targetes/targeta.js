import styles from "../../estils/targeta.module.css";
export default function Targeta({ imatge, id, nom, onClick, className = "" }) {
  return (
    <div className={`${styles.targeta} ${className}`} onClick={onClick}>
      <img src={`/imatgesTargetes/${imatge}`} alt={nom} className={styles.imatge} />
     {/*  <p className="bodySmall" style={{ padding: 0, marginTop: 8, marginBottom: 0 }}>{nom}</p> */}
    </div>
  );
}
