import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';


function GamesCollection() {
  const [games, setGames] = useState([])

  useEffect(()=>{

    async function fetchGames() {
      console.log("fetching games")
      const {data, error} = await supabase.from('games').select('*');
      if (error) console.error(`ERROR FETCHEANDO JUEGOS` + error);
      else 
      { 
        console.log(data) 
        setGames(data) 
      }
    }

    fetchGames()

  }, [])

  return(
    <div id="games-collection">
      <h3>Mi colección física de juegos</h3>
      <ul>
        {games.map((game, index) => (
        <li>{game.title}</li>
      ))}
      </ul>

    </div>
  )
}

export default GamesCollection;