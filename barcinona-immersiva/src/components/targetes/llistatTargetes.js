import { useTargetes } from '../../context/targetesContext'; 
import Targeta from './targeta';
import styles from "../../estils/llistatTargetes.module.css";
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react'; 


export default function LlistatTargetes() {
            const { targetes, getTargetesDesbloquejades } = useTargetes();
    const navigate = useNavigate();

      const targetesDesbloquejades = useMemo(() => getTargetesDesbloquejades(), [targetes]);

   return (
        <div className={styles.grid}>
            {targetesDesbloquejades.map(({ id, nom, imatge }) => (
                <Targeta
                    key={id}
                    id={id}
                    nom={nom}
                    imatge={imatge}
                    onClick={() => navigate('/detalls', { state: { id } })}
                />
            ))}
        </div>
    );
}