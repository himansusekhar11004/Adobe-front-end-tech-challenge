import React, { useEffect, useState } from 'react';

export default function History(){
    let [ moviesHistory, setMoviesHistory] = useState([]);
    useEffect(
        ()=> {
            try{
                let localItem = localStorage.getItem("movies_history") || '[]';
                localItem  = JSON.parse(localItem);
                if(!moviesHistory.length) setMoviesHistory(localItem)
            }catch(err){
                console.log(err);
            }
        },[]
    )

   
    return(
        <div>
            {
                moviesHistory && moviesHistory.length > 0 && moviesHistory.map(item => <div style={{color: "#ffffff"}}><a href="#" style={{color: "#ffffff", textDecoration: "none"}}>{item}</a></div>)
            }
        </div>
    )

}