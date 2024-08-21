import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Formulario from './components/Formulario';
import Time from './components/Time';
import { IColaborador } from './components/Compartilhado/Interfaces/IColaborador';
import { ITimes } from './components/Compartilhado/Interfaces/ITimes';
import Rodape from './components/Rodape';
import Favoritos from './components/Favoritos';



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
    fetch("http://localhost:8080/Times",
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
    fetch('http://localhost:8080/Colaboradores')
      .then(resposta => resposta.json())
      .then(dados => setColaboradores(dados))
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/Times')
      .then(resposta => resposta.json())
      .then(dados => setTimes(dados))
  }, [])

  useEffect(() => {
    busca !== "" && busca.length > 2 ? fetch(`http://localhost:8080/Colaboradores?nome=${busca}`)
      .then(resposta => resposta.json())
      .then(dados => { setColaboradores(dados) })
      : fetch(`http://localhost:8080/Colaboradores?nome=`)
        .then(resposta => resposta.json())
        .then(dados => { setColaboradores(dados) })

  }, [busca])

  useEffect(() => {
    filtroBusca !== "" ? fetch(`http://localhost:8080/Colaboradores?time=${filtroBusca}`)
      .then(resposta => resposta.json())
      .then(dados => { setColaboradores(dados) })
      : fetch(`http://localhost:8080/Colaboradores?time=`)
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
        times.length !== 0 &&<Favoritos
        onClick={evento => setFiltroBusca((evento.target as HTMLInputElement).value)} 
        times={times}></Favoritos> 
      }

      {times.map(time => <Time
        mudarCor={mudarCorDoTime}
        key={time.nome}
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
