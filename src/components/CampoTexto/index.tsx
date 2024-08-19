import '../CampoTexto/CampoTexto.css'

interface CampoTextoProp{
    type?: 'text' | 'password' | 'date' | 'email' | 'number'|'color'
    label:string
    placeholder:string
    valor: string
    aoAlterado: (valor: string) => void
    obrigatorio?: boolean
}

export default function CampoTexto({ type = 'text', label, placeholder, valor, aoAlterado, obrigatorio = false } : CampoTextoProp) {
    const aoDigitado = (evento:React.ChangeEvent<HTMLInputElement>) => {
        aoAlterado(evento.target.value)
    }
    return (
        <div className={`campo_${type}`}>
            <label>{label}</label>
            <input value={valor}
                onChange={aoDigitado}
                required={obrigatorio}
                type={type}
                placeholder={`${placeholder}...`}
            />
        </div>
    )
}