import React, { Component, Fragment } from 'react';
import './PokeInfo.css';
import Evolution from '../containers/Evolution';

class PokeInfo extends Component {

  constructor({name}){
    super()
    this.state = {
      pokeBase: [],
      pokeExt: [],
      pokeEvo: [],
      pokeId: name,
      link: `https://pokeapi.co/api/v2/pokemon/${name}/`
    }
  }

   componentDidMount(){
    fetch(this.state.link)
    .then(response => response.json())
    .then(data => this.setState({pokeBase: data}))
    .then(() => fetch(this.state.pokeBase.species.url)
      .then(response => response.json())
      .then(data => this.setState({pokeExt: data}))
      .then(() => fetch(this.state.pokeExt.evolution_chain.url)
        .then(response => response.json())
        .then(data => this.setState({pokeEvo: data}))
      ))
   }

   info =(url) =>{
     let x = 0;
     if (url){
       while (x < url.length && url[x].language.name !== 'en'){
         x++;
       }
       return (url[x].flavor_text)
     }
   }

   evoInfo=(name)=>{
       const list = this.props.list;
       let x = 0;
        while (x < list.length && list[x].name !== name) {
           x++;
         }
         return (
           `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${list[x].id}.png`)
       }

  render() {
    const {pokeId, pokeBase, pokeEvo, pokeExt} = this.state;
    return !pokeBase.species?
      '':(
        <div className='container'>
          <img className='pic' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`} alt={pokeId} />
          <div className='name'>
            <div>
              <img className='ball' src={require("../pokemon/pokeball.png")} alt=''/> {pokeBase.id}
            </div> 
            {pokeBase.name}
          </div>
          <div className='type'>
            {pokeBase.types.map((elem, i) => { 
              return (
              <div className={elem.type.name} key={i}>{elem.type.name}</div>) })}
          </div>
          <div className='weight'>weight: {pokeBase.weight}</div>
          <div className='height'>height: {pokeBase.height} </div>
          <div className='happy'>base happiness: {pokeExt.base_happiness}</div>
          <div className='info'>
            {this.info(pokeExt.flavor_text_entries)}</div>
          <div className='stats'>
            {pokeBase.stats.map((elem, i) => {
              return (<div key={i}>
              <span>{elem.stat.name}</span>
              <progress foo={elem.base_stat} value={elem.base_stat} max="100"/><br />
            </div>
               ) })}
          </div>
          <div className='evo'>
            {!pokeEvo.chain ? '' : (
                <Evolution evo={pokeEvo.chain} list={this.props.list} />                 
            )
            }
          </div>
          <div className='varieties'>
            <div className='stripes'></div>
            <span>Varieties:</span>
            <ul>
            { !pokeExt.varieties?
              '':(
              pokeExt.varieties.map((elem, i) => { return (<li key={i}>{elem.pokemon.name}</li>) }))
            }
            </ul>
          </div>
        </div>   
    )  
  }
}

export default PokeInfo;