import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function CardInfo() {
  const { id } = useParams()

  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchImageDetails() {
      try {
        setLoading(true)
        setError("")
      
      const response = await fetch(`https://images-api.nasa.gov/search?nasa_id=${encodeURIComponent(id)}`)

      if (!response.ok) {
        throw new Error("Could not retrieve this NASA item.")
      }

      const data = await response.json()
      const matchingImage = data.collection.items[0]

      if (!matchingImage) {
        throw new Error("No information was found for this item.")
      }

      setImage(matchingImage)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
    } 
  
    fetchImageDetails()
  },  [id])

  if (loading) {
    return (
      <main className="card__info--main">
        <div className="container">
          <h2>Loading space information...</h2>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="card__info--main">
        <div className="container">
          <h2>{error}</h2>
          <Link to="/explore">← Return to Explore</Link>
        </div>
      </main>
    )
  }

  const imageData = image.data[0]
  const imageUrl = image.links?.[0]?.href
  
  return (
    <main className="card__info--main">
      <section className="container">
        <div className="row">
          <Link to="/explore" className="card__info--back">← Back to Explore</Link>
          <div className="card__info">
            <figure className="card__info-img--wrapper">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={imageData.title}
                  className='card__info--img'
                />
              )}
            </figure>
            <div className="card__info--content">
              <h1>{imageData.title}</h1>
              <p className="card__info--description">{imageData.description || "No description is available."}</p>
              <div className="card__info--details">
                <p>
                  <b>Date:</b>{" "}
                  {imageData.date_created ? imageData.date_created.slice(0, 10) : "Unknown"}
                </p>
                <p><b>NASA ID:</b> {imageData.nasa_id}</p>
                {imageData.center && (
                  <p><b>NASA Center:</b> {imageData.center}</p>
                )}
              </div>
              <button className="card__info--favorite">♡ Add to Favorite</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CardInfo
