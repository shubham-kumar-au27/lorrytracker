import React, { useState } from 'react'

const Searchcomponent = () => {
    const [searchText,setSearchText] = useState()
  return (
    <div className="search m-3 p-4">
    <input type="text" className="border border-solid border-black" value={searchText} onChange={(e)=>{
        setSearchText(e.target.value)
    }}/>
    <button className="px-4 py-2 bg-green-300 m-4 rounded-lg" onClick={()=>{
        //on click of this button filter the restaurant and update the UI--
        const filteredRestaurant = listOfRestaurant.filter(
            (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
        )
        
    }}>Search</button>
</div>
    
  )
}

export default Searchcomponent
