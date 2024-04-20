import React, { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import './pokemonInfo.css';

const PokemonInfo = () => {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(pokemonName)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon data.');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pokemonName]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>; 
  }

  console.log(pokemonData)
  const { name, abilities, types  } = pokemonData;
  const mainAbility = abilities.find(ability => !ability.is_hidden);
  const pokemonTypes = types.map(type => type.type.name)
  
  return (
    <div className="pokemon-info">
      <h2 className="pokemon-name">{name}</h2>
  
      <div className="abilities">
        <h3 className="section-title">Habilidades</h3>
        <p>Habilidade Principal: {mainAbility?.ability.name}</p>
      </div>
  
      <div className="types">
        <h3 className="section-title">Tipos</h3>
        <ul className="type-list">
          {pokemonTypes.map((type, index) => (
            <li key={index} className="type-item">{type}</li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default PokemonInfo;