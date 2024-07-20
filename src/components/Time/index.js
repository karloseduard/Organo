import hexToRgba from 'hex-to-rgba';
import Colaborador from "../Colaborador"
import "../Time/Time.css"

export default function Time(props){
    return(
        //dumb components
        //renderisação condicional 
        //props.colaboradores.length = condição 
        //pode ser feito com operador ternario se 0 ? execulta se não : "{string vasia}"
        props.colaboradores.length > 0 && <section className="time"  style={{backgroundColor: hexToRgba(props.cor,"0.6")}}>
            <input onChange={event => props.mudarCor(event.target.value, props.id)} value={props.cor} type="color" className="input-color" />
            <h3 style={{borderColor: props.cor}}>{props.nome}</h3>
            <div className="colaboradores">
            {props.colaboradores.map(colaborador => {
                
                return(
                    
                    <Colaborador 
                    corDeFundo={props.cor} 
                    key={colaborador.nome} 
                    nome={colaborador.nome} 
                    cargo={colaborador.cargo} 
                    imagem={colaborador.imagem} 
                    id={colaborador.id}
                    favorito={colaborador.favorito}
                    aoDeletar={props.aoDeletar}
                    aoFavoritar={props.aoFavoritar}
                    />
                    
                )
            })}
            </div>
        </section>
    )
}