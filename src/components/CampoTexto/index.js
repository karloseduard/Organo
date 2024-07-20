
import '../CampoTexto/CampoTexto.css'

export default function CampoTexto({ type = 'text', label, placeholder, valor, aoAlterado, obrigatorio = false }) {

    
    
    const aoDigitado =(evento)=>{
        aoAlterado(evento.target.value)
    }
    return(
        <div className={`campo_${type}`}>
            <label>{label}</label>
            <input value={valor} 
            onChange={aoDigitado} 
            required={obrigatorio} 
            type={type} 
            placeholder= {`${placeholder}...`}
            />
        </div>
    )
}