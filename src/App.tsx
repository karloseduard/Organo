import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Formulario from './components/Formulario';
import Time from './components/Time';
import { IColaborador } from './components/Compartilhado/Interfaces/IColaborador';
import { ITimes } from './components/Compartilhado/Interfaces/ITimes';
import Rodape from './components/Rodape';
import Filtros from './components/Filtros';



function App() {

  const [times, setTimes] = useState<ITimes[]>([])

  //Estou mostrando que esse useState é uma lista e um Colaborador
  //<IColaborador[]> isso é um tipo parametrizado
  const [colaboradorers, setColaboradores] = useState<IColaborador[]>([])
  const [busca, setBusca] = useState('')
  const [filtroBusca, setFiltroBusca] = useState('')



  const aoNovoColaboradorAdicionado = (colaborador: IColaborador) => {
    setColaboradores([...colaboradorers, colaborador])
  }
  function deletarColaborador(id: string) {
    setColaboradores(colaboradorers.filter(colaborador => colaborador.id !== id))
  }

  function mudarCorDoTime(cor: string, id: string) {
    setTimes(times.map(time => {
      if (time.id === id) {
        time.cor = cor
      } return time
    }));
  }

  function cadastrarTime(nome: string, cor: string) {

    const postData = {
      nome,
      cor,
      id: crypto.randomUUID()
    }
    setTimes([...times, { ...postData }])
    fetch("https://my-json-server.typicode.com/karloseduard/Organo-api/Times",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
  }

  function resolverFavorito(id: string) {
    setColaboradores(colaboradorers.map(colaborador => {
      if (colaborador.id === id) colaborador.favorito = !colaborador.favorito;
      return colaborador;
    }))
  }

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/karloseduard/Organo-api/Colaboradores')
      .then(resposta => resposta.json())
      .then(dados => setColaboradores(dados))
  }, [])

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/karloseduard/Organo-api/Times')
      .then(resposta => resposta.json())
      .then(dados => setTimes(dados))
  }, [])

  useEffect(() => {
    busca !== "" && busca.length > 2 ? fetch(`https://my-json-server.typicode.com/karloseduard/Organo-api/Colaboradores?nome=${busca}`)
      .then(resposta => resposta.json())
      .then(dados => { setColaboradores(dados) })
      : fetch(`https://my-json-server.typicode.com/karloseduard/Organo-api/Colaboradores?nome=`)
        .then(resposta => resposta.json())
        .then(dados => { setColaboradores(dados) })

  }, [busca])

  useEffect(() => {
    filtroBusca !== "" ? fetch(`https://my-json-server.typicode.com/karloseduard/Organo-api/Colaboradores?time=${filtroBusca}`)
      .then(resposta => resposta.json())
      .then(dados => { setColaboradores(dados) })
      : fetch(`https://my-json-server.typicode.com/karloseduard/Organo-api/Colaboradores`)
        .then(resposta => resposta.json())
        .then(dados => { setColaboradores(dados) })

  }, [filtroBusca])

  return (
    <div className="App">
      <Banner src='/image/banner.png' alt='banner principal do organo' />

      <Formulario
        cadastrarTime={cadastrarTime}
        times={times.map(time => time.nome)}
        aoColaboradorCadastrado={colaborador => aoNovoColaboradorAdicionado(colaborador)}/>
      
      <div className='busca-center'>
        <input className='busca' placeholder='Pesquise o jogador ' onChange={evento => setBusca(evento.target.value)} />
      </div>
      {
        times.length !== 0 &&<Filtros
        onClick={evento => setFiltroBusca((evento.target as HTMLInputElement).value)} 
        times={times}/> 
      }

      {times.map(time => <Time
        mudarCor={mudarCorDoTime}
        key={time.id}
        nome={time.nome}
        cor={time.cor}
        colaboradores={colaboradorers.filter(colaborador => colaborador.time === time.nome)}
        aoDeletar={deletarColaborador}
        aoFavoritar={resolverFavorito}
        id={time.id}
      />)}

      <Rodape />
    </div>


  );
}

export default App;
