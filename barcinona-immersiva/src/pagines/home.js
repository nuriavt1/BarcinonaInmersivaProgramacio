import { useNavigate } from 'react-router-dom';
import ButtonText from '../components/botons/buttonText';
import style from '../estils/home.module.css';
import { useConfig } from '../context/configContext';


function Home() {
    const navigate = useNavigate();
    const { isFirstTime, setIsFirstTime } = useConfig();
    return (
        <div className={style.body}>
            <div className={style.logoTitle}>
                {/*   <p className="headline1" style={{ margin: 0, padding: 0, color: "var(--color-white)", textAlign: "center" }}>Barcimed</p>
               <p className="headline3" style={{ margin: 0, padding: 0, color: "var(--color-white)", textAlign: "center" }}>Un recorregut immersiu per la història de Barcelona
                </p>*/}

                <img src='/imatgesVaries/Logotip.svg'></img>

                <p className="bodyLarge" style={{ color: "var(--color-white)", width: "fit-content", textAlign: "center" }}>Benvingut a Barcimed, una experiència immersiva.</p>
            </div >
            <div className={style.buttonsContainer}>
                <ButtonText onClick={() => {
                    if (isFirstTime) {
                      //  setIsFirstTime(false); // marca que ya no es primera vez
                        navigate('/onBoarding2');
                    } else {
                        navigate('/nivells'); // acceso directo si ya ha entrado antes
                    }
                }}>Començar</ButtonText>
                {/*   <ButtonText onClick={() => navigate('/onBoarding')}>Configuració</ButtonText>
                <ButtonText onClick={() => navigate('/credits')}>Crèdits</ButtonText> */}
            </div>

            <img src='/imatgesVaries/apotecaBenvinguda.svg' style={{
                width: "100%",
                objectFit: "contain"
            }}></img>
        </div>
    );
}

export default Home;