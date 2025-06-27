import styles from "../estils/footer.module.css";
import { useNavigate } from 'react-router-dom';
import { useNivell } from '../context/nivellContext';

export default function FooterMenu() {
    const navigate = useNavigate();
    const { nivellActual } = useNivell();

    return (
        <div className={styles.footerContainer}>
            <div className="title2"
                style={{
                    backgroundColor: "var(--color-blue600)",
                    color: "var(--color-white)",
                    width: "fit-content",
                    height: "fit-content",
                    padding: "8px 35px 8px 35px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "8px 8px 0 0",
                    position: "relative",
                    top: "4px",
                    borderTop: "3px solid var(--color-blue700)",
                    borderLeft: "3px solid var(--color-blue700)",
                    borderRight: "3px solid var(--color-blue700)",
                }}>
                <p style={{ margin: "0px" }}>CAPÍTOL {nivellActual}</p>
                <img src="/icones/puzzle.svg"></img>
            </div>
            <footer className={styles.footer}>
                <div className="bodySmallBold" style={{ cursor: 'pointer', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} onClick={() => navigate('/nivells')}>
                    <img src="/icones/home2.svg" style={{ width: "32px" }}></img> Nivells</div>
                <div className="bodySmallBold" style={{ cursor: 'pointer', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} onClick={() => navigate('/progressio')}>
                    <img src="/icones/play.svg" style={{ width: "32px" }}></img> Vídeos </div>
                <div className="bodySmallBold" style={{ cursor: 'pointer', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} onClick={() => navigate('/mapa')}>
                    <img src="/icones/map.svg" style={{ width: "32px" }}></img> Mapa</div>
                <div className="bodySmallBold" style={{ cursor: 'pointer', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} onClick={() => navigate('/biblioteca')}>
                    <img src="/icones/bookmark-alt.svg" style={{ width: "32px" }}></img> Biblioteca</div>
            </footer>
        </div>


    );
}