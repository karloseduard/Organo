import { useState } from "react"
import Botao from "../Botao"
import CampoTexto from "../CampoTexto"
import "../Formulario/Formulario.css"
import ListaSuspensa from "../ListaSuspensa"
import { IColaborador } from "../Compartilhado/Interfaces/IColaborador"

interface FormularioProps{
    aoColaboradorCadastrado:(colaborador:IColaborador)=>void
    times: string[]
    cadastrarTime:(novoTime:string,corTime:string)=>void
}

export default function Formulario({ aoColaboradorCadastrado,times,cadastrarTime }:FormularioProps) {

    
    //hoocks useState
    const [nome,setNome] = useState('')
    const [cargo,setCargo] = useState('')
    const [imagem,setImagem] = useState('')
    const [data, setData] = useState('')
    const [time,setTime] = useState('')
    const [nomeTime,setNomeTime] = useState('')
    const [corTime,setCorTime] = useState("#000000")
    const [id, setId]=useState(crypto.randomUUID())
    const [ favorito, setFavorito] = useState(false)

    const aoSalvar = (evento : React.FormEvent<HTMLFormElement>)=>{
        evento.preventDefault()
       
        aoColaboradorCadastrado({
            nome,
            cargo,
            imagem,
            time,
            id,
            favorito,
            data
        })
        setNome('')
        setImagem('')
        setCargo('')
        setTime('')
        setId(crypto.randomUUID() )
        setFavorito(false)
        setData('')
        const postData = {
            nome,
            cargo,
            imagem,
            time,
            id,
            data
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
                <CampoTexto  
                label="Data de entrada no time" 
                type="date" 
                placeholder="" 
                valor ={data}
                aoAlterado = {valor => setData(valor)}/>
                
                <ListaSuspensa 
                obrigatorio={true} 
                label ="Times" 
                itens ={times}
                valor = {time}
                aoAlterado = {valor =>setTime(valor)}/>
                
                <Botao>Criar Card</Botao>
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