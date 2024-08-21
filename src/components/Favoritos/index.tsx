import '../Favoritos/Favoritos.css'
import { ITimes } from "../Compartilhado/Interfaces/ITimes"

interface FavoritosProps {
    onClick: (valor: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    times: ITimes[]
}

export default function Favoritos({ onClick, times }: FavoritosProps) {
    return (
        <section className='favoritosContainer'>
            <div className='favoritosTitulo'>
                <h2>Favoritos</h2>
            </div>
            <div className='BotaoFavoritoContainer'>
                <button className="BotaoFavorito" onClick={onClick} value={''}>Todos</button>
                {times.map((time) => {
                    return (
                        <button className="BotaoFavorito" onClick={onClick} value={time.nome}>{time.nome}</button>
                    )
                })}
            </div>
        </section>
    )

}