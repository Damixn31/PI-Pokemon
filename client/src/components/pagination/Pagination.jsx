import React from "react";
import './Pagination.css'

function Pagination({pokePerPage, pokemons, pagination}) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(pokemons / pokePerPage); i++) { //Math.ceil redondea para arriba
        pageNumbers.push(i)
    }
    
    return(
        <div className="container">
            <ul>
                {pageNumbers?.map(number => (
                    
                    <button className="pagination" key={number} onClick={() => pagination(number)} >{number}</button>
                    
                ))}
            </ul>
        </div>
        // <div>
        //     {pages?.map((e) => (
        //         <button className={'pagination'}  key={e} onClick={() => max(e)}>
        //             {e}
        //         </button>
        //     ))}
        // </div>
    )

}



export default Pagination;