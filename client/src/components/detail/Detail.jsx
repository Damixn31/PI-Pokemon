import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonId } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import "./Detail.css";
import Loader from "../assets/loader.gif";

function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const detail = useSelector((state) => state.detail);

  const handleSearchPokemon = () => {
    try {
      dispatch(getPokemonId(id));
    } catch (error) {
      console.log("test fallado");
    }
  };

  useEffect(() => {
    handleSearchPokemon();
  }, [id, dispatch]);

  //  const test = []
  //  console.log(detail.length, detail[0], 'test')

  return (
    <div className="container">
      {detail.length === 1 ? (
        <div>
          <h1>{detail[0].name} </h1>
          <img className="img" src={detail[0].img} />
          <div className="info">
            <h3>id: {detail[0].id}</h3>
            <h3>types: {detail[0].type.map((e) => e + " ")}</h3>
            <h4>hp: {detail[0].hp}</h4>
            <h4>force: {detail[0].force}</h4>
            <h4>defending: {detail[0].defending}</h4>
            <h4>speed: {detail[0].speed}</h4>
            <h4>height: {detail[0].height}</h4>
            <h4>weight: {detail[0].weight}</h4>
          </div>
        </div>
      ) : (
        <div>
          <img className="img-loader" src={Loader} alt="loader" width="400px" />
        </div>
      )}
      <div >
        <Link to="/home">
          <button className="btn">VOLVER</button>
        </Link>
      </div>
    </div>
  );
}

export default Detail;
