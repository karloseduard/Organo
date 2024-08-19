import "../ListaSuspensa/ListaSuspensa.css"

interface ListaSuspensaProps{
    aoAlterado:(valor:string)=> void
    label:string
    obrigatorio:boolean
    valor:string
    itens:string[]
}

export default function ListaSuspensa({aoAlterado,itens,label,obrigatorio,valor}:ListaSuspensaProps){
    return(
    <div className="lista-suspensa">
        <label>{label}</label>
            <select onChange={evento => aoAlterado(evento.target.value)} required={obrigatorio} value={valor}>
                <option value=""></option>
                { /*itens.map = percorrer a lista  */ }
                {/*map(iten => <option>{iten}</option>) = retorna um elemento HTML <option> */}
                {itens.map(iten => <option key={iten}>{iten}</option>)}
            </select>
        
    </div>
    )
}