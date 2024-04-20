import React, { useState, useEffect } from 'react';
import './pokedex.css';
import pokedexImage from './pokedex.png'; 
import carregandoImage from './carregando.png'; 
import { Link } from 'react-router-dom';

function Pokedex() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonNumber, setPokemonNumber] = useState('');
  const [pokemonImage, setPokemonImage] = useState('');
  const [searchPokemon, setSearchPokemon] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  }

  const renderPokemon = async (pokemon) => {
    setPokemonName('Carregando');
    setPokemonNumber('');
    setPokemonImage(carregandoImage);
    
    const data = await fetchPokemon(pokemon);

    if (data) {
      setPokemonImage(data.sprites.versions['generation-v']['black-white'].animated.front_default);
      setPokemonName(data.name);
      setPokemonNumber(data.id);
      setInputValue('');
      setSearchPokemon(data.id);
    } else {
      setPokemonNumber('');
      setPokemonName('Não encontrado');
      setPokemonImage('');
      setInputValue('');
    }

    if (data && data.id >= 650) {
      setPokemonImage(data.sprites.front_default);
    } else if (data && data.id >= 899) {
      setPokemonImage('');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    renderPokemon(inputValue.toLowerCase());
  }

  const handlePrev = () => {
    if (searchPokemon > 1) {
      setSearchPokemon(prev => prev - 1);
      renderPokemon(searchPokemon - 1);
    }
  }

  const handleNext = () => {
    setSearchPokemon(prev => prev + 1);
    renderPokemon(searchPokemon + 1);
  }

  useEffect(() => {
    renderPokemon(searchPokemon);
  }, [searchPokemon]);

  return (
    <main>
      {pokemonImage && <img src={pokemonImage} alt="pokemon" className="pokemonImage" />}
      <h1 className="pokemonData">
        <span className="pokemonNumber">{pokemonNumber}</span>-
        <span className="pokemonName">
          <Link to={`/pokemon/${pokemonName}`}>{pokemonName}</Link>
        </span>
      </h1>
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="search" 
          className="input" 
          placeholder="Nome ou número" 
          required 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <div className="buttons">
        <button className="button btn-prev" onClick={handlePrev}>Anterior &lt;</button>
        <button className="button btn-next" onClick={handleNext}>Próximo &gt;</button>
      </div>
      <img src={pokedexImage} alt="pokedex" id="pokedex" />
    </main>
  );
}

export default Pokedex;
