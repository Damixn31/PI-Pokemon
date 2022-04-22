import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, getAllPokemons, getTypes } from "../../redux/action";
import Back from '../assets/back.png';
import Loader from '../assets/loader.gif'
import { Link } from 'react-router-dom';
import './Create.css'


function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pokemons, types } = useSelector((state) => state)
    const [errors, setErrors] = useState({});


    useEffect(() => {
         dispatch(getTypes());
         dispatch(getAllPokemons());
        
    }, [dispatch]);


    const [input, setInput] = useState({
        name: "",
        hp: 0,
        force: 0,
        defending: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
        img: "",
    });

    const resetInput = () => {
        setInput({
            name: "",
            img: "",
            hp: "0",
            force: "0",
            defending: "0",
            speed: "0",
            height: "0",
            weight: "0",
            types: [],
        });
    };

    let validateName = /^[a-z]+$/;
    const validUrl = /^(ftp|http|https):\/\/[^ "]+\.\S+$/;

    let validate = (input) => {
        let errors = {};
        if(
            !input.name ||
            !validateName.test(input.name) ||
            input.name.length < 3 ||
            input.name.lenght > 20
        ) {
            errors.name = "No se permiten caracteres especiales, números o nombres de más de 20 caracteres";
        }
        if (!validUrl.test(input.img) && input.img) {
            errors.img = "El campo de imagen debe tener una URL válida o estar vacío";
        }
        if (pokemons.find((p) => p.name === input.name)) {
            errors.name = "Este pokemon ya existe!";
        }

        if (!input.hp || input.hp < 1) {
            errors.hp = "Debe ser un numero entre 1-255";
        }
        if (!input.force || input.force < 1) {
            errors.force = "Debe ser un numero entre 1-200";
        }
        if (!input.defending || input.defending < 1) {
            errors.defending = "Debe ser un numero entre 1-250";
        }
        if (!input.speed || input.speed < 1) {
            errors.speed = "Debe ser un numero entre 1-200";
        }
        if (!input.height || input.height < 1) {
            errors.height = "Debe ser un numero entre 1-1000";
        }
        if (!input.weight || input.weight < 1) {
            errors.weight = "Debe ser un numero entre 1-2000";
        }
        return errors;

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            pokemons.some((e) => e.name.toLowerCase() === input.name.toLowerCase())
        ) {
            alert("Ese nombre ya existe");
        } else if (
            !Object.keys(errors).length &&
            input.name.length &&
            input.types.length > 0 &&
            input.types.length <= 2
        ) {
            dispatch(addPokemon(input));
            resetInput();
            alert("Pokemon creado con exito");
            navigate("/home");
        } else alert("Por favor, revisa el formulario")
    };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value.toLowerCase(),
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value.toLowerCase(),
            })
        );
    };

    const handleSelect = (e) => {
        if (!input.types.includes(e.target.value) && input.types.length < 2) {
            setInput({
                ...input,
                types: [...input.types, e.target.value],
            });
            e.target.value = "Selecciona tipo"
        } else {
            alert("No puede repetir o seleccionar más de 2 tipos")
        }
    };

    const handleDelete = (type) => {
        setInput({
            ...input,
            types: input.types.filter((e) => e !== type),
        });
        setErrors(
            validate({
                ...input,
                types: input.types.filter((e) => e !== type),
            })
        );
    };

    return (
        <>
        <div>
            <Link to="/home">
               <button className="btn">VOLVER</button>
            </Link>
        </div>
        {pokemons.length === 0 ? (
           <img className="img-loader"
           src={Loader}
           alt="Loading..."
           width="400px"
           height="400px"
         />
        ) : (
            <div className="container">
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                    >
                        <div className="title">
                    <h2>Crea un Pokemon</h2>

                        </div>
                    <div>
                        <div className="all-input">
                            <label htmlFor="name">Name</label>
                            <input 
                              type="text"
                              value={input.name.toLowerCase()}
                              name="name"
                              id="name"
                              onChange={(e) => {
                                  handleChange(e);
                              }}
                              placeholder=" Name..."
                            />
                            <p>{errors.name}</p>
                            <label htmlFor="img">Image: </label>
                            <input 
                              type="text"
                              value={input.img}
                              name="img"
                              id="img"
                              onChange={(e) => {
                                  handleChange(e);
                              }}
                              placeholder=" Url Opcional..."
                            />
                            <p> </p>
                            <label htmlFor="hp">HP: </label>
                            <input 
                              type="range"
                              value={input.hp}
                              name="hp"
                              id="hp"
                              min="0"
                              max="255"
                              step="1"
                              onChange={(e) => {
                                  handleChange(e);
                              }}
                              placeholder=" HP..."
                            />
                            {input.hp}
                            <p>{errors.hp}</p>
                            <label htmlFor="force">Force: </label>
                            <input 
                              type="range"
                              value={input.force}
                              name="force"
                              id="force"
                              min="0"
                              max="200"
                              step="1"
                              onChange={(e) => {
                                  handleChange(e)
                              }}
                              placeholder=" Force..." 
                            />
                            {input.force}
                            <p>{errors.force}</p>
                            <label htmlFor="range">Defending</label>
                            <input 
                              type="range"
                              value={input.defending}
                              name="defending"
                              id="defending"
                              min="0"
                              max="250"
                              step="1"
                              onChange={(e) => {
                                  handleChange(e);
                              }} 
                              placeholder=" Defending..."
                            />
                            {input.defending}
                            <p>{errors.defending}</p>
                        </div>
                        <div>
                            <label htmlFor="speed">Speed:</label>
                            <input 
                              type="range"
                              value={input.speed}
                              name="speed"
                              id="speed"
                              min="0"
                              max="200"
                              step="1"
                              onChange={(e) => {
                                  handleChange(e);
                              }} 
                              placeholder=" Speed..."
                            />
                            {input.speed}
                            <p>{errors.speed}</p>

                            <label htmlFor="height">Height:</label>
                            <input 
                              type="range"
                              value={input.height}
                              name="height"
                              id="height"
                              min="0"
                              max="1000"
                              step="1"
                              onChange={(e) => {
                                  handleChange(e);
                              }} 
                              placeholder=" Height..."
                            />
                            {input.height}
                            <p>{errors.height}</p>
                            <label htmlFor="weight">Weight:</label>
                            <input 
                              type="range"
                              value={input.weight}
                              name="weight"
                              id="weight"
                              min="0"
                              max="2000"
                              step="1"
                              onChange={(e) => {
                                  handleChange(e);
                              }} 
                              placeholder=" Weight..."
                            />
                            {input.weight}
                            <p>{errors.weight}</p>
                        </div>
                    </div>
                    <div>
                        <select onChange={(e) => {
                            handleSelect(e)
                           }}
                        >
                            <option>Selecciona tipo</option>
                            {types?.map((e) => {
                                return (
                                    <option key={e.name} value={e.name}>
                                        {e.name}
                                    </option>
                                );
                            })}
                        </select>
                        <p>{errors.types}</p>
                        {
                            input.types.map((e) => {
                                return (
                                    <div key={e}>
                                        <span>{e} </span>
                                        {""}
                                        <button onClick={() => {
                                            handleDelete(e);
                                        }} 
                                        
                                        >
                                            {""}x{""}
                                        </button>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <button type="submit">
                        Create
                    </button>
                </form>
            </div>
        )}
        </>
    );

}


export default Create;