import './Menu.css';
import { useState } from 'react';

const Menu = ({ onCategoriaChange, onPesquisaChange, favoritos, favoritosCount }) => {
    const [menuFavoritos, setMenuFavoritos] = useState(false);

    function mostrarFavoritos() {
        setMenuFavoritos(prev => !prev)
    };

    return (
        <div className="menu">
            <nav className="navegacao">
                <h2>
                    MovieFlix
                </h2>
                <input class="pesquisa" type="text" placeholder="Pesquisar um filme" name="filme" onChange={(e) => onPesquisaChange(e.target.value)}></input>
                <select onChange={(e) => onCategoriaChange(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Ação">Ação</option>
                    <option value="Comédia">Comédia</option>
                    <option value="Terror">Terror</option>
                </select>
                <span class="mostrarFavoritos" onClick={mostrarFavoritos}>Favoritos</span>
                {menuFavoritos && favoritos.length > 0 && (
                    <div className="favoritos">
                        <ul>
                            {favoritos.map((item, index) => (
                                <li key={index}>
                                    {item.name} - Favoritado {favoritosCount[item.name] || 0}x
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </nav>
        </div>
    )
}

export default Menu;