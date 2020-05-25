import React, { Component } from 'react';
import './Evolution.css';

class Evolution extends Component{
  constructor({evo, list}){
    super()
    this.state = {
      evo1: [], //I evolucja id:name
      evo2: [], //II evolucja id:name:details
      evo3: [], //III evolucja id:name:details
      list: list, //lista wszystkich pokemonow id+name
      evoChain: evo //lancuch evolucji zadanego pokemona
    }
  }

  componentDidMount() {
    const {evoChain} = this.state;
    this.setState({ evo1: this.evoArray1(evoChain) });
    if (evoChain.evolves_to.length > 0){
      this.setState({ evo2: this.evoArray2(evoChain.evolves_to) });
      evoChain.evolves_to.forEach((element, i) => {
        if (evoChain.evolves_to[i].evolves_to.length > 0) {
          this.setState({ evo3: this.evoArray2(evoChain.evolves_to[i].evolves_to) });
        }
      });
    }
  }

//pokemons ID
  evoInfo = (name) => {
    const {list} = this.state;
    let x = 0;
    while (x < list.length && list[x].name.indexOf(name) < 0) {
      x++;
    }
    return list[x].id
  }

//evo1 object id:name
  evoArray1 = (curLv) => {
    if (!curLv) { return null}
   const container = {};
    container.id = this.evoInfo(curLv.species.name);
    container.name = curLv.species.name;
    return container
  }
//evo2 evo3 id:name:details
  evoArray2 = (curLv) => {
    if (!curLv) { return null }
    return curLv.map((elem) => {
      const container = {};
      container.id = this.evoInfo(elem.species.name);
      container.name = elem.species.name;
      container.details = this.removeEmpty(elem.evolution_details[0]);
      return container
    })
  }

  evoDescription = elem => {
    let arr = [];
    switch (elem.trigger.name) {
      case 'trade': arr.push('trade');
        break;
      case elem.location: arr.push('level up');
        break;
    }
    if (elem.min_level) { arr.push(`lv. ${elem.min_level}`) }
    if (elem.min_happiness) { arr.push(`happiness ${elem.min_happiness}`) }
    if (elem.min_beauty) { arr.push(`beauty ${elem.min_beauty}`) }
    if (elem.held_item) { arr.push(`holding ${elem.held_item.name}`) }
    if (elem.item) { arr.push(`use ${elem.item.name}`) }
    if (elem.time_of_day) { arr.push(`${elem.time_of_day}time`) }
    if (elem.known_move) { arr.push(`after ${elem.known_move.name} learned`) }
    if (elem.location) { arr.push(`in ${elem.location.name}`) }
    if (elem.known_move_type) { arr.push(`knowing ${elem.known_move_type.name}`) }
    if (elem.party_species) { arr.push(`with ${elem.party_species.name} in party`) }
    if (elem.party_type) { arr.push(`with ${elem.party_type.name}type in party`) }
    if (elem.trade_species) { arr.push(`with ${elem.trade_species.name}type in party`) }
    if (elem.needs_overworld_rain) { arr.push(`during rain`) }
    if (elem.gender === 1) { arr.push(`Female`) } else if (elem.gender === 2) { arr.push(`Male`) }
    switch (elem.relative_physical_stats) {
      case 1: arr.push('Attack > Defense');
        break;
      case 0: arr.push('Attack = Defense');
        break;
      case -1: arr.push('Attack < Defense');
        break;
    }
    return (arr.join(' '))
  }

  removeEmpty = obj => {
    if (!obj) {
      return null
    }
    const temp = Object.entries(obj).reduce((a, [k, v]) => (v === null ? a : { ...a, [k]: v }), {});
    return this.evoDescription(temp)
  };

  evoTag = ({arr, name}) =>{
    if(arr.length>0){
      return(
        <div className={name}>
          {arr.map(elem =>{
            return(
              <div key={elem.id} className='evoDet'> 
                <div className='evolveTo'>
                  <span className="arrow right "></span>
                  <span>{elem.details}</span>
                </div>
                <div className='pokemon'>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${elem.id}.png`} alt=''></img>
                <span>{elem.name}</span>
                </div>
              </div>
            )})
          }
        </div>
    )}
    return null
  }

  render(){
    const {evo1, evo2, evo3} = this.state;
    return (
      <div className='evo'>
          {!evo1 ? '' : (
            <div className='pokemon'>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo1.id}.png`} alt=''></img>
              <span>{evo1.name}</span>
            </div>
            )
          }
        <this.evoTag arr={evo2} name='evo2'></this.evoTag>
        <this.evoTag arr={evo3} name='evo3'></this.evoTag>
      </div>    
     )}
  }

export default Evolution;