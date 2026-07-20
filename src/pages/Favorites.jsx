import React, { useEffect, useState } from 'react'
import FavoriteCard from '../components/FavoriteCard'

function Favorites() {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("spasaFavorites")) || []

        setFavorites(savedFavorites)
    }, [])
    
    function removeFavorite(nasaId) {
        const updatedFavorites = favorites.filter(favorite => favorite.nasaId !== nasaId)
    
        setFavorites(updatedFavorites)

        localStorage.setItem("spasaFavorites", JSON.stringify(updatedFavorites))
    }

    return (
        <main id="favorites__main">
            <section className="container">
                <div className="row">
                    <div className="favorites__header">
                        <h1>My Favorites</h1>
                        <p>Revisit the NASA images and discoveries you saved.</p>
                    </div>
                    {favorites.length === 0 ? (
                        <div className="favorites__empty">
                            <h2>No favorites saved yet.</h2>
                            <p>Explore NASA content and select the heart button to save an item.</p>
                        </div>
                    ) : (
                        <div className="space__cards">
                            {favorites.map(favorite => (
                                <FavoriteCard key={favorite.nasaId} favorite={favorite} removeFavorite={removeFavorite} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Favorites
