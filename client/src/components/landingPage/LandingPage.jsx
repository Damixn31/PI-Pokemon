import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css'



export default function LandingPage() {
    return(
        <div className='landingPage'>
            <Link className='link' to="/home">
                <button className='btnEnter'>Enter</button>
            </Link>
            
        </div>
    )
}

