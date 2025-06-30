import {useNavigate} from 'react-router-dom';
import ButtonText from '../components/botons/buttonText';
import style from '../estils/home.module.css';

function Home(){
    const navigate = useNavigate();
    return(
<div className={style.body}>
   <div className={style.logoTitle}>
<p className="headline1" style={{ margin: 0, padding:0, color: "var(--color-white)"}}>Barcimed</p>
    <p className="headline3" style={{ margin: 0, padding:0, color: "var(--color-white)" }}>Un recorrido inmersivo por la historia de Barcelona
</p>
   </div >
   <div className={style.buttonsContainer}>
<ButtonText onClick={() => navigate('/onBoarding')}>Començar</ButtonText>
<ButtonText onClick={() => navigate('/onBoarding')}>Configuració</ButtonText>
<ButtonText onClick={() => navigate('/credits')}>Crèdits</ButtonText>
</div>
</div>
    );
}

export default Home;