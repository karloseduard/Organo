import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Formulario from './components/Formulario';
import Time from './components/Time';
import Rodape from './components/Rodape';
import { v4 as uuidv4 } from 'uuid';



function App() {

  const [times,setTimes]= useState([])

  
  const [colaboradorers, setColaboradores] = useState([])

  const [busca, setBusca] = useState('')

  const aoNovoColaboradorAdicionado = (colaborador)=>{
    setColaboradores([...colaboradorers,colaborador])
  }
  function deletarColaborador(id){
    setColaboradores(colaboradorers.filter(colaborador => colaborador.id !== id))
  }

  function mudarCorDoTime(cor,id){
    setTimes(times.map(time => {if(time.id === id){
      time.cor = cor
    } return time}));
  }

  function cadastrarTime(nome, cor) {
    
    const postData = {
      nome, 
      cor,
      id: uuidv4()
    }
    setTimes([...times, { ...postData } ])
    fetch("http://localhost:8080/Times",
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })}

  function resolverFavorito(id) {
    setColaboradores(colaboradorers.map(colaborador => {
      if(colaborador.id === id) colaborador.favorito = !colaborador.favorito;
      return colaborador;
    }))
  }

  useEffect( ()=>{
    fetch('http://localhost:8080/Colaboradores')
    .then(resposta => resposta.json())
    .then(dados => setColaboradores(dados))
  }, [])

  useEffect( ()=>{
    fetch('http://localhost:8080/Times')
    .then(resposta => resposta.json())
    .then(dados => setTimes(dados))
  }, [])

  useEffect(()=>{
    if(busca && busca.length > 2){
      fetch('http://localhost:8080/Colaboradores?nome=' + busca)
    .then(resposta => resposta.json())
    .then(dados => setColaboradores(dados))
    }
  },[busca])

  return (
    <div className="App">
      <Banner />
      
      <Formulario 
      cadastrarTime ={cadastrarTime}
        times={times.map(time => time.nome)}
        aoColaboradorCadastrado={colaborador =>aoNovoColaboradorAdicionado(colaborador)}
      />
      <div className='busca-center'>
      <input className='busca' placeholder='Pesquise o jogador ' onChange={evento => setBusca(evento.target.value)}/>
      </div>
      {times.map(time => <Time 
      mudarCor = {mudarCorDoTime}
      key={time.nome} 
      nome={time.nome} 
      corSecundaria={time.corSecundaria} 
      cor={time.cor}
      colaboradores={colaboradorers.filter(colaborador => colaborador.time === time.nome)}
      aoDeletar={deletarColaborador}
      aoFavoritar={resolverFavorito} 
      id={time.id}
      /> )}
      
      <Rodape/>
    </div>
    
    
  );
}

export default App;
