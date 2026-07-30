import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    function searchSpace() {
        const trimmedSearch = search.trim()
        
        if (!search.trim()) {
            alert("Please search for something in space!")
            return
        }

        navigate(`/explore?search=${encodeURIComponent(trimmedSearch)}`)
    }

    return (
        <main id="landing">
            <section className="home__hero">
                <div className='header__container'>
                    <div className="header__description">
                        <h1>Explore <span className="blue">NASA's</span> universe through images, data, and discovery.</h1>
                        <h2>What Are You Looking For In The Universe? 🚀</h2>
                        <div className="header__search">
                            <input
                                id="searchInput" 
                                type="text" 
                                className="header__search--input" 
                                placeholder="Search by planets, moons, galaxies, star..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        searchSpace()
                                        console.log(search)
                                    }
                                }}
                                
                            />
                            <button 
                                id="searchButton" 
                                className="header__search--btn click" onClick={searchSpace}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                        <div className="home__suggestions">
                            <span>Try:</span>
                            {["Mars", "Moon", "Galaxy", "Nebula"].map((suggestion) => (
                                <button key={suggestion} type='button' onClick={() => navigate(`/explore?search=${encodeURIComponent(suggestion)}`)}>{suggestion}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
      )
}

export default Home
