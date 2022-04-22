import React from "react";
import { Link } from "react-router-dom";
import './Card.css'

function PokeCard({ name, types, img, force, id }) {
  return (
    <div className="card">
      <div className="card-container">
      <Link className="cardDet" to={`/detail/${id}` }> 
        <img className="img" src={img} alt="pokemon" width="10%" height="10%" />
        <h3 className="name">{name[0].toUpperCase() + name.slice(1)}</h3>
        <h3>{force}</h3>
        </Link> 

      </div>
        <div className="type">
          <h3>Types</h3>
        {types?.map((e) => (
          <span key={e}> {e[0].toUpperCase() + e.slice(1)}</span>
          ))}

        </div>
    </div>
  );
}

export default PokeCard;
