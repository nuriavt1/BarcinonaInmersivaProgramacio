import ButtonText from "../../components/botons/buttonText";
import { useNavigate } from 'react-router-dom';
//import Video360Player from "../../components/video360Player";


function Video({ src }) {
    const navigate = useNavigate();
    return (
        <div>
            <p>Aquesta és la pàgina de video</p>

        {/*   <Video360Player></Video360Player> */}


            <ButtonText onClick={() => navigate('/mapa')}>Següent</ButtonText>
        </div>
    );
}

export default Video;