import React, { useEffect, useState } from 'react'
import FavoriteCard from '../components/FavoriteCard'
import Pagination from '../components/Pagination'

function Favorites() {
    const [favorites, setFavorites] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 12

    const totalPages = Math.ceil( favorites.length / cardsPerPage )

    const startingIndex = (currentPage - 1) * cardsPerPage
    const endingIndex = startingIndex + cardsPerPage

    const visibleFavorites = favorites.slice( startingIndex, endingIndex)

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("spasaFavorites")) || []

        setFavorites(savedFavorites)
    }, [])
    
    function removeFavorite(nasaId) {
        const updatedFavorites = favorites.filter((favorite) => favorite.nasaId !== nasaId)
    
        setFavorites(updatedFavorites)

        localStorage.setItem("spasaFavorites", JSON.stringify(updatedFavorites))

        const updatedTotalPages = Math.ceil(updatedFavorites.length / cardsPerPage)

        if (currentPage > updatedTotalPages) { setCurrentPage(Math.max(updatedTotalPages, 1))}
    }

    function changePage(page) {
        setCurrentPage(page)

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
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
                        <>
                            <div className="space__cards">
                                {visibleFavorites.map((favorite) => (
                                    <FavoriteCard key={favorite.nasaId} favorite={favorite} removeFavorite={removeFavorite} />
                                ))}
                            </div>
                            <Pagination 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={changePage}
                            />
                        </>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Favorites
