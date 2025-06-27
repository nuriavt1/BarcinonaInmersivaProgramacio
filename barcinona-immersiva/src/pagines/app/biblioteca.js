import FooterMenu from "../../components/footerMenu";
import LlistatTargetes from "../../components/targetes/llistatTargetes";
import style from "../../estils/biblioteca.module.css"

function Biblioteca(){
    return(
<div className={style.body}>

<div className={style.content} >
<p className="headline2" style={{color: "var(--color-white)"}}>BIBLIOTECA </p>
<p className="headline3">Tots</p>
<LlistatTargetes></LlistatTargetes>
</div>

<FooterMenu></FooterMenu>
</div>
    );
}

export default Biblioteca;