import { AiFillCloseCircle, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import "../Colaborador/Colaborador.css"


export default function Colaborador({nome, imagem, cargo,corDeFundo,aoDeletar,id, favorito,aoFavoritar }){
    function favoritar() {
        aoFavoritar(id);
    }

    const propsfavorito = {
        size: 25,
        onClick: favoritar
    }

    

    return(
        <div className="colaborador">
            <AiFillCloseCircle size={25} className="deletar" onClick={() => aoDeletar(id)}/>
            <div className="cabecalho" style={{backgroundColor:corDeFundo}}>
                <img src={imagem} alt={nome}/>
            </div>
            <div className="rodape">
                <h4>{nome}</h4>
                <h5>{cargo}</h5>
                <div className='favoritar'>
                {favorito
                    ? <AiFillHeart {...propsfavorito} color='red'/>
                    : <AiOutlineHeart {...propsfavorito} />
                }
            </div>
            </div>
        </div>
    )
}