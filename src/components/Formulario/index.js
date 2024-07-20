import { useState } from "react"
import Botao from "../Botao"
import CampoTexto from "../CampoTexto"
import "../Formulario/Formulario.css"
import ListaSuspensa from "../ListaSuspensa"
import { v4 as uuidv4 } from 'uuid';
export default function Formulario({aoColaboradorCadastrado,times,cadastrarTime}) {

    
    //hoocks useState
    const [nome,setNome] = useState('')
    const [cargo,setCargo] = useState('')
    const [imagem,setImagem] = useState('')
    const [time,setTime] = useState('')
    const [nomeTime,setNomeTime] = useState('')
    const [corTime,setCorTime] = useState('')
    const [id, setId]=useState(uuidv4())
    const [ favorito, setFavorito] = useState(false)
    const aoSalvar = (evento)=>{
        evento.preventDefault()
       
        aoColaboradorCadastrado({
            nome,
            cargo,
            imagem,
            time,
            id,
            favorito
        })
        setNome('')
        setImagem('')
        setCargo('')
        setTime('')
        setId(uuidv4())
        setFavorito('')

        const postData = {
            nome,
            cargo,
            imagem,
            time,
            id,
        }

    fetch("http://localhost:8080/Colaboradores",
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    }
    
    return (
        <section className="formulario">
            <form onSubmit={aoSalvar}>
                <h2>Preencha os dados para criar o card do colaborador</h2>

                <CampoTexto 
                obrigatorio={true} 
                label="Nome" 
                placeholder="Digite o seu Nome" 
                type="text"
                valor ={nome}
                aoAlterado = {valor => setNome(valor)} />

                <CampoTexto 
                obrigatorio={true} 
                label="Cargo" 
                placeholder="Digite o seu Cargo" 
                type="text" 
                valor ={cargo}
                aoAlterado = {valor => setCargo(valor)}/>

                <CampoTexto  
                label="Imagem" 
                type="text" 
                placeholder="Informe o endereço da Imagem" 
                valor ={imagem}
                aoAlterado = {valor => setImagem(valor)}/>
                
                <ListaSuspensa 
                obrigatorio={true} 
                label ="Times" 
                type="text" 
                itens ={times}
                valor = {time}
                aoAlterado = {valor =>setTime(valor)}/>
                
                <Botao>
                    Criar Card
                </Botao>
            </form>
            <form onSubmit={(evento) => {
              evento.preventDefault()
              cadastrarTime( nomeTime,corTime )
              setCorTime('')
              setNomeTime('')
            }}>
              <h2>Preencha os dados para criar um novo time.</h2>
                <CampoTexto
                    obrigatorio
                    label='Nome'
                    type="text" 
                    placeholder='Digite o nome do time'
                    valor={nomeTime}
                    aoAlterado={valor => setNomeTime(valor)}
                />
                <CampoTexto
                    obrigatorio
                    label='Cor' 
                    type="color"
                    placeholder='Digite a cor do time'
                    valor={corTime}
                    aoAlterado={valor => setCorTime(valor)}
                />
                <Botao >Criar um novo time </Botao>
            </form>

            
        </section>
    )
}