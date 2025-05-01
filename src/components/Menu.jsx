import './Menu.css';
import { useState, useEffect, useRef } from 'react';

const Menu = ({ onCategoriaChange, onPesquisaChange, favoritos, favoritosCount }) => {
    const [menuFavoritos, setMenuFavoritos] = useState(false);
    const favoritosRef = useRef(null);

    function mostrarFavoritos() {
        setMenuFavoritos(prev => !prev);
    }

    useEffect(() => {
        function handleClickFora(event) {
            if (
                favoritosRef.current &&
                !favoritosRef.current.contains(event.target) &&
                !event.target.classList.contains('mostrarFavoritos')
            ) {
                setMenuFavoritos(false);
            }
        }

        document.addEventListener('mousedown', handleClickFora);
        return () => {
            document.removeEventListener('mousedown', handleClickFora);
        };
    }, []);

    return (
        <div className="menu">
            <nav className="navegacao">
                <h2>MovieFlix</h2>
                <input
                    className="pesquisa"
                    type="text"
                    placeholder="Pesquisar um filme"
                    name="filme"
                    onChange={(e) => onPesquisaChange(e.target.value)}
                />
                <select onChange={(e) => onCategoriaChange(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Ação">Ação</option>
                    <option value="Comédia">Comédia</option>
                    <option value="Terror">Terror</option>
                </select>
                <span className="mostrarFavoritos" onClick={mostrarFavoritos}>Favoritos</span>
                
                {menuFavoritos && favoritos.length > 0 && (
                    <div className="favoritos" ref={favoritosRef}>
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
    );
}

export default Menu;
