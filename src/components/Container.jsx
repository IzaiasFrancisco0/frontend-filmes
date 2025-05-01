import './Container.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Container = ({ categoriaSelecionada, pesquisa, setFavoritos, setFavoritosCount }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const mostrarFilmes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/filmes`)
                setMovies(response.data)
                console.log(response)
            } catch (error) {
                console.log("Deu erro ao buscar filmes", error)
            }
        }
        mostrarFilmes()
    }, []);

    function favoritarFilme(nomeFilme) {
        const filmeSelecionado = movies.find(filme => filme.name === nomeFilme)

        if (!filmeSelecionado) return;

        setFavoritos(prev => {
            const jaExiste = prev.some(filme => filme.name === nomeFilme)
            if (!jaExiste) {
                return [...prev, filmeSelecionado];
            }
            return prev;
        })

        setFavoritosCount(prev => ({
            ...prev,
            [nomeFilme]: (prev[nomeFilme] || 0) + 1
        }))
    }

    const filmesFiltrados = movies.filter(filme => {
        const matchCategoria = categoriaSelecionada
            ? (filme.category || '').toLowerCase() === categoriaSelecionada.toLowerCase()
            : true;

        const matchPesquisa = pesquisa
            ? filme.name.toLowerCase().includes(pesquisa.toLowerCase())
            : true;

        return matchCategoria && matchPesquisa;
    });

    const bloco1 = filmesFiltrados.slice(0, 5);
    const bloco2 = filmesFiltrados.slice(5, 10);
    const bloco3 = filmesFiltrados.slice(10, 15);

    return (
        <div className="container">
            <div className="filmes">
                <ul>
                    {bloco1.map((filme, index) => (
                        <li key={index}>
                            <img src={filme.image} alt={filme.name} />
                            <p class="title">{filme.name}</p>
                            <p class="description">{filme.description}</p>
                            <button onClick={() => favoritarFilme(filme.name)}>Favorito ❤️</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="filmes">
                <ul>
                    {bloco2.map((filme, index) => (
                        <li key={index}>
                            <img src={filme.image} alt={filme.name} />
                            <p class="title">{filme.name}</p>
                            <p class="description">{filme.description}</p>
                            <button onClick={() => favoritarFilme(filme.name)}>Favorito ❤️</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="filmes">
                <ul>
                    {bloco3.map((filme, index) => (
                        <li key={index}>
                            <img src={filme.image} alt={filme.name} />
                            <p class="title">{filme.name}</p>
                            <p class="description">{filme.description}</p>
                            <button onClick={() => favoritarFilme(filme.name)}>Favorito ❤️</button>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default Container;