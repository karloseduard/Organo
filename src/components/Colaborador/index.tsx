import { AiFillCloseCircle, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import "../Colaborador/Colaborador.css"

interface ColaboradorProps{
    nome:string
    imagem:string
    cargo:string
    corDeFundo:string
    aoDeletar:(valor:string)=>void
    aoFavoritar:(valor:string)=>void
    id:string 
    favorito:boolean
    data:string
}

export default function Colaborador({nome, imagem, cargo,corDeFundo,aoDeletar,id, favorito,aoFavoritar,data }: ColaboradorProps){
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
                <h5>{new Date(data).toLocaleDateString()}</h5>
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