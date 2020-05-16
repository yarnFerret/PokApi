import React from 'react';
import './Evolution.css';

  const Evolution = ({evo, cssl, list}) =>{
    if(!evo){
      return null
    }
    const evoInfo = (name) => {
      let x = 0;
       while (x < list.length && list[x].name !== name) {
         x++;
       }
      return (
         `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${list[x].id}.png`)
    }

    const evoDet = (det) => {
      console.log(det[0]);
      if (!det){
        return null
      }
      let data = det[0]
      let temp = [data.gender, 
        data.held_item,     
        data.item, 
        data.known_move,
        data.location,
        data.min_affection,
        data.min_beauty,
        data.min_happiness,
        data.min_level,
        data.time_of_day,
        data.trade_species,
        data.trigger.name].filter(a => a);
      return console.log(temp)
    }

    return evo.evolves_to.map((item, i) => (
      <figure key={i} className={`evo${cssl}`}>
        <span className="arrow right"></span>
        <img src={evoInfo(item.species.name)} alt=''></img>
        <figcaption>{item.species.name}</figcaption>
        <p> {evoDet(item.evolution_details)}</p>
        <Evolution evo={evo.evolves_to[i]} cssl='3' list={list}/>
      </figure>
    ))
  }


export default Evolution;