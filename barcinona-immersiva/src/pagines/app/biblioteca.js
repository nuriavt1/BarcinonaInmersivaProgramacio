import FooterMenu from "../../components/footerMenu";
import LlistatTargetes from "../../components/targetes/llistatTargetes";


function Biblioteca(){
    return(
<div>
<p className="headline2">BIBLIOTECA</p>
<p className="headline3">Tots</p>
<LlistatTargetes></LlistatTargetes>
<FooterMenu></FooterMenu>
</div>
    );
}

export default Biblioteca;