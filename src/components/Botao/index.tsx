import { ReactElement } from "react"
import "../Botao/Botao.css"

interface BotaoProps {
    children: ReactElement | string
}

export default function Botao (props: BotaoProps){
    return(
        <button className="botao">{props.children}</button>
    )
}