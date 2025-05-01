import { useState } from 'react'
import './App.css';
import Menu from './components/Menu.jsx';
import Container from './components/Container.jsx';

function App() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const [favoritosCount, setFavoritosCount] = useState({})

  return (
    <div>
    <Menu
     onCategoriaChange={setCategoriaSelecionada}
     onPesquisaChange={setPesquisa}
     favoritos={favoritos}
     favoritosCount={favoritosCount}/>
    <Container 
    categoriaSelecionada={categoriaSelecionada}
    pesquisa={pesquisa}
    setFavoritos={setFavoritos}
    setFavoritosCount={setFavoritosCount}/>
    </div>
  )
}

export default App
