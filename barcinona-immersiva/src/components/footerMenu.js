import styles from "../estils/footer.module.css";
import {useNavigate} from 'react-router-dom';

export default function FooterMenu () {
      const navigate = useNavigate();
    return(
<footer className={styles.footer}>
<div className="bodySmallBold" style={{ cursor: 'pointer' }} onClick={() => navigate('/progressio')}>Progrés</div>
<div className="bodySmallBold" style={{ cursor: 'pointer' }} onClick={() => navigate('/mapa')}>Mapa</div>
<div className="bodySmallBold" style={{ cursor: 'pointer' }} onClick={() => navigate('/biblioteca')}>Biblioteca</div>
<div className="bodySmallBold" style={{ cursor: 'pointer' }} onClick={() => navigate('/nivells')}>Nivells</div>
</footer>

    );
}