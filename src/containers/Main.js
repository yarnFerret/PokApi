import React, { Component } from 'react';
import './Main.css';
import Scroll from '../components/Scroll';
import PokeInfo from './PokeInfo';
import SearchBox from '../components/SearchBox';

class Main extends Component{

  constructor() {
    super()
    this.state = {
      allPokemons: [],
      searchfield: '',
      id: 0,
    };
  }

  componentDidMount(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=807/')
      .then(response => { return response.json()})
      .then(poke => poke.results.map((elem, i)=>{
        const container = {};
        container.name = elem.name;
        container.id = i+1;
        return container;
      }))
      .then(cont => this.setState({allPokemons: cont}))
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  displayInfo = (event) => {
    const id = event.target.id;
    this.setState({id: id});
  }

  render() {
    const { allPokemons, searchfield, id } = this.state;
     const filterPoke = allPokemons.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchfield.toLowerCase())
     });
    return !allPokemons ?
      <h1>Loading...</h1> :
      (
      <div className='content'>
        <header></header>
        <aside>
            <SearchBox searchChange={this.onSearchChange} />
          <Scroll>  
            <ul>
               {filterPoke.map((element, i) => {
                return (
                  <li className='list' key={i} id={filterPoke[i].id} onClick={this.displayInfo}>
                    <img className='ico' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${filterPoke[i].id}.png`} alt={i}></img> 
                    {filterPoke[i].name}
                  </li>
                )
              })} 
              </ul>
          </Scroll>
        </aside>
        <main>
          {(id === 0)?
          <div className='home'>
                <h2>List of Pokémon by National Pokédex number</h2>
                <p>This is a list of Pokémon in the order dictated by the National Pokédex, meaning that Pokémon from the Kanto region will appear first, followed by those from Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, and Galar. </p>
          </div>
          :<PokeInfo key={id} name={id} list={allPokemons}/>
          }  
         </main>
      </div>
    
      )
  }
}

export default Main;