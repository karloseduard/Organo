import "../Rodape/Rodape.css"

export default function Rodape(){
    return(
        <footer className="footer">
            <section style={{display:"flex"}}>
                <ul>
                    <li>
                        <img src="./image/fb.png" alt=""/>
                    </li>
                </ul>
                <ul>
                    <li>
                        <img src="./image/tw.png" alt=""/>
                    </li>
                </ul>
                <ul>
                    <li>
                        <img src="./image/ig.png" alt=""/>
                    </li>
                </ul>
            </section>
            <section>
                <img src="./image/logo.png" alt=""/>
            </section>
            <section>
                <p>Desenvolvido por Alura.</p>
            </section>
        </footer>
    )
}