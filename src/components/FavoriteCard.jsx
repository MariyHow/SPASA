import React from 'react'
import { Link } from 'react-router-dom'

function FavoriteCard({ favorite, removeFavorite }) {
    function toggleRemove(event) {
        event.preventDefault()
        event.stopPropagation()

        removeFavorite(favorite.nasaId)
    }

  return (
    <Link to={`/card/${favorite.nasaId}`} className="space__card">
        <figure className="space__card-img--wrapper">
            <img src={favorite.imageUrl} alt={favorite.title} className="space__card--img" />
        </figure>
        <div className="space__card--body">
            <h2>{favorite.title}</h2>
            <div className="space__card--footer">
                <span>{favorite.date_created ? favorite.date_created(0, 12) : "Unknown date"}</span>
                <button type='button' className="favorite__btn favorite__btn--active" onClick={toggleRemove} aria-label={`Remove ${favorite.title} from favorite`}>♥</button>
                <div className="space__card-read--more">Read More →</div>
            </div>
        </div>
    </Link>
  )
}

export default FavoriteCard
