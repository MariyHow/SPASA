import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SpaceCard({ image }) {
    const imageData = image.data[0]
    const imageUrl = image.links[0].href
    const favoriteItem = {
      nasaId: imageData.nasa_id,
      title: imageData.title,
      description: imageData.description || "",
      dateCreated: imageData.date_created || "",
      imageUrl: imageUrl
    }

    const [isFavorite, setIsFavorite] = useState(() => {
      const savedFavorites = JSON.parse(localStorage.getItem("spasaFavorites")) || []

      return savedFavorites.some(favorite => favorite.nasaId === imageData.nasa_id)
    })

    function toggleFavorite(event) {
      event.preventDefault()
      event.stopPropagation()

      const savedFavorites = JSON.parse(localStorage.getItem("spasaFavorites")) || []

      const alreadySaved = savedFavorites.some(favorite => favorite.nasaId === imageData.nasa_id)

      let updatedFavorites

      if (alreadySaved) {
        updatedFavorites = savedFavorites.filter(favorite => favorite.nasaId !== imageData.nasa_id)
      } else {
        updatedFavorites = [...savedFavorites, favoriteItem]
      }

      localStorage.setItem("spasaFavorites", JSON.stringify(updatedFavorites))

      setIsFavorite(!alreadySaved)
    }

  return (
    <Link to={`/card/${imageData.nasa_id}`} className='space__card'>
      <figure className='space__card-img--wrapper'>
        <img src={imageUrl} alt={imageData.title} className='space__card--img'/>
      </figure>
      <div className="space__card--body">
        <h3>{imageData.title}</h3>
        <div className="space__card-read--more">Read More →</div>
        <div className="space__card--footer">
          <span>{imageData.date_created ? imageData.date_created.slice(0,10) : "Unknown date"}</span>
          <button type='button' className={`favorite__btn ${isFavorite ? "favorite__btn--active" : ""}`} onClick={toggleFavorite} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>{isFavorite ? "♥" : "♡"}</button>
        </div>
      </div>
    </Link>
  )
}

export default SpaceCard
