import './Filtros.css'
import { ITimes } from "../Compartilhado/Interfaces/ITimes"

interface FiltrosProps {
    onClick: (valor: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    times: ITimes[]
}

export default function Filtros({ onClick, times }: FiltrosProps) {
    return (
        <section className='FiltrosContainer'>
            <div className='FiltrosTitulo'>
                <h2>Filtros</h2>
            </div>
            <div className='BotaoFiltrosContainer'>
                <button className="BotaoFiltros" onClick={onClick} value={''}>Todos</button>
                {times.map((time) => {
                    return (
                        <button key={time.id} className="BotaoFiltros" onClick={onClick} value={time.nome}>{time.nome}</button>
                    )
                })}
            </div>
        </section>
    )

}