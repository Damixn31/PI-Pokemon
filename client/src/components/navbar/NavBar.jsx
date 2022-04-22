import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { getNames } from "../../redux/action";
import {Link} from 'react-router-dom';
import './NavBar.css'

function NavBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');


    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value);
        console.log('hola', e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            dispatch(getNames(name))
            setName('')
        }
    }

 
    return(
        <div >
            <div>
            <Link to='/'>
                <button className="btn-back">VOLVER</button>
            </Link>

            </div>
           
            
            <div className="nav-two">
               
                    <input className="input" type="text"
                    placeholder=" busca tu pokemon aqui..." 
                    value={name}
                    onChange={(e) =>handleName(e)}
                    />
                
                <button className="btn" type="submit" onClick={(e) => handleSubmit(e)}>buscar</button><br />
            </div>
        </div>
        
    )
}

export default NavBar;