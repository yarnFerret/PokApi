import React from "react";
import './SearchBox.css';

const SearchBox = ({searchChange}) => {
  return(
    <div className='search'>
      <input type='search' placeholder='pokemon name' onChange={searchChange}/>
    </div>
  )
}

export default SearchBox;