import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import {
  filterByCreation,
  filterByType,
  getAllPokemons,
  getTypes,
  orderByName,
  orderByForce,
} from "../../redux/action";
import PokeHome from "../assets/pokehome.png";
import Loader from "../assets/pokebola.gif";
import NoFound from "../assets/noFound.gif";
import PokeCard from "../card/Card";
import NavBar from "../navbar/NavBar";
import Pagination from "../pagination/Pagination";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const isLoading = useSelector((state) => state.isLoading);
  const types = useSelector((state) => state.types);

  const [, setOrder] = useState("");

  /* ---Paginacion --- */
  //estados locales
  const [page, setPage] = useState(1);
  const [pokePerPage] = useState(12);
  const indexOfLastPoke = page * pokePerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage;

  const currentPoke = pokemons.slice(indexOfFirstPoke, indexOfLastPoke);

  const pagination = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllPokemons());
  }

  function handleTypesFilter(e) {
    dispatch(filterByType(e.target.value));
    setPage(1);
  }

  function handleCreationFilter(e) {
    dispatch(filterByCreation(e.target.value));
    setPage(1);
  }

  function handleOrder(e) {
    dispatch(orderByName(e.target.value));
    setPage(1);
    setOrder(`Order: ${e.target.value}`);
  }

  function handleForce(e) {
    dispatch(orderByForce(e.target.value));
    setPage(1);
    setOrder(`Order: ${e.target.value}`);
  }

  return (
    <div>
      <div className="container-search">
        <div>
          <NavBar />
          <div className="pokehome">
            <img src={PokeHome} alt="pokehome" width="250px" height="150px" />
          </div>
        </div>
      

        <div>
          {/* CREATE POKEMON */}
          <Link to="/create" type="button">
            <button className="btn-form">CREAR</button>
          </Link>
          <button className="reset-poke" onClick={handleClick}>
            REGARCAR
          </button>
        </div>
      </div>
      <div>
        <div>
       
       

      <div className="paginado">
        <Pagination
          pokemons={pokemons.length}
          pokePerPage={pokePerPage}
          pagination={pagination}
        />
      </div>
        </div>
      </div>

      <div className="filter-conteiner">
        <div>
          <label> Ordenamiento: </label>
          <select onChange={handleOrder}>
            <option value="All">Order by Name</option>
            <option value="asc">Order A-Z</option>
            <option value="desc">Order Z-A</option>
          </select>
          <select onChange={handleForce}>
            <option value="All">Order By Force</option>
            <option value="min">Force Min</option>
            <option value="max">Force Max</option>
          </select>
        </div>

        <div>
          <label> Types: </label>
          <select onChange={handleTypesFilter}>
            <option value="All">Types</option>
            {types?.map((e) => {
              return (
                <option key={e.name} value={e.name}>
                  {e.name[0].toUpperCase() + e.name.slice(1)}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label> Origen: </label>
          <select onChange={handleCreationFilter}>
            <option value="All">Origen</option>
            <option value="Existing">Existing</option>
            <option value="createdByUser">By User</option>
          </select>{" "}
        </div>
      </div>

      <div>
        {isLoading ? (
          <img className="loader" src={Loader} alt="Loading..." />
        ) : !pokemons.length ? (
          <img className="noFound" src={NoFound} />
        ) : (
          <div className="card-container">
            {currentPoke?.map((p) => {
              return (
                <div key={p.id}>
                  <PokeCard
                    name={p.name}
                    img={p.img}
                    types={p.types}
                    force={p.force}
                    id={p.id}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      
    </div>
    
  );
}

export default Home;
