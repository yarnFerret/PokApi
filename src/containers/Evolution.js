import React, { Fragment, Component } from 'react';
import './Evolution.css';

class Evolution extends Component{
  constructor({evo, list}){
    super()
    this.state = {
      evo1: [], //I evolucja
      evo2: [], //II evolucja
      evo3: [], //III evolucja
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

//evo object id:name
  evoArray1 = (curLv) => {
    if (!curLv) { return null}
   const container = {};
   const arr = [];
    container.id = this.evoInfo(curLv.species.name);
    container.name = curLv.species.name;
    arr.push(container);
    return arr
  }
  evoArray2 = (curLv) => {
    if (!curLv) { return null }
    return curLv.map((elem) => {
      const container = {};
      container.id = this.evoInfo(elem.species.name);
      container.name = elem.species.name;
      return container
    })
  }

  evoTag = ({arr}) =>{
    if(arr.length>0){
      return(
        <div>
          {arr.map(elem =>{
            return(
              <div key={elem.id}> 
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${elem.id}.png`} alt=''></img>
                <span>{elem.name}</span>
              </div>
            )})
          }
        </div>
    )}
    return null
  }


  render(){
    return (
      <div>
        <this.evoTag arr={this.state.evo1}></this.evoTag>
        <this.evoTag arr={this.state.evo2}></this.evoTag>
        <this.evoTag arr={this.state.evo3}></this.evoTag>
      </div>    
     )}
  }

  // const Evolution = ({evo, cssl, list}) =>{

  //   const removeEmpty = obj => {
  //     //console.log(obj);
  //     if (!obj) {
  //        return null
  //      }
  //     const temp = Object.entries(obj).reduce((a, [k, v]) => (v === null ? a : { ...a, [k]: v }), {});
  //     return evoDescription(temp)
  //   };

  //   const evoDescription = elem => {
  //     let arr = [];
  //     switch (elem.trigger.name){
  //       case 'trade': arr.push('trade');
  //         break;
  //       case elem.location: arr.push('level up');
  //         break;
  //       default: arr.push(null);
  //     }
  //     if (elem.min_level) { arr.push(`lv. ${elem.min_level}`) }
  //     if (elem.min_happiness){ arr.push(`happiness ${elem.min_happiness}`) }
  //     if (elem.min_beauty) { arr.push(`beauty ${elem.min_beauty}`) }
  //     if (elem.held_item) { arr.push(`holding ${elem.held_item.name}`) }
  //     if (elem.item) { arr.push(`use ${elem.item.name}`)}
  //     if (elem.time_of_day) { arr.push(`${elem.time_of_day}time`) }
  //     if (elem.known_move) { arr.push(`after ${elem.known_move} learned`)}
  //     if (elem.location) { arr.push(`in ${elem.location}`) }
  //     if (elem.known_move_type) { arr.push(`knowing ${elem.known_move_type}`) }

  //     if (elem.party_species) { arr.push(`with ${elem.party_species.name} in party`) }
  //     if (elem.party_type) { arr.push(`with ${elem.party_type.name}type in party`) }
  //     if (elem.needs_overworld_rain) { arr.push(`during rain`) }
  //     if (elem.gender === 1) { arr.push(`Female`) } else if (elem.gender === 2) { arr.push(`Male`) }
  //       switch (elem.relative_physical_stats){
  //         case 1: arr.push('Attack > Defense');
  //           break;
  //         case 0: arr.push('Attack = Defense');
  //           break;
  //         case -1: arr.push('Attack < Defense');
  //         break;
  //       }
  //     return (arr.join(' '))
  //   }

  //   return evo.evolves_to.map((item, i) => (
  //     <Fragment>

  //       <div className='x'>
          
  //         <div key={i} className={`evo${cssl}`}>
  //           <div className='par'>
  //             <div className=' evolveTo'>
  //               <span className="arrow right "></span>
  //               <span>{removeEmpty(item.evolution_details[0])}</span>
  //             </div>
  //             <div className='evoPic'>
  //               <img src={evoInfo(item.species.name)} alt=''></img>
  //               <span>{item.species.name}</span>
  //             </div>
  //           </div>
  //         </div>  
  //         {/* <div className='y'> */}
  //         <Evolution evo={evo.evolves_to[i]} cssl='3' list={list}/>   
  //       {/* </div>     */}
  //       </div>
        
  //     </Fragment>
      
  //   ))
  // }


export default Evolution;