import "../ListaSuspensa/ListaSuspensa.css"

export default function ListaSuspensa(props){
    return(
    <div className="lista-suspensa">
        <label>{props.label}</label>
            <select onChange={evento => props.aoAlterado(evento.target.value)} required={props.obrigatorio} value={props.valor}>
                <option value=""></option>
                { /*props.itens.map = percorrer a lista  */ }
                {/*map(iten => <option>{iten}</option>) = retorna um elemento HTML <option> */}
                {props.itens.map(iten => <option key={iten}>{iten}</option>)}
            </select>
        
    </div>
    )
}