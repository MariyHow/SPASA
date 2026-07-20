import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SpaceCard from '../components/SpaceCard'

function Explore() {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get("search")
  const [images, setImages] = useState([])

  async function fetchImages() {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchTerm)}&media_type=image`
    )
    const data = await response.json()

    setImages(data.collection.items)
  }

  useEffect(() => {
    fetchImages()
  }, [searchTerm])

  return (
    <div>
      <h1>{searchTerm}</h1>
      <div className="space__cards">
        {images
          .filter(image => image.links)
          .slice(0,12)
          .map(image => (
            <SpaceCard key={image.data[0].nasa_id}
            image={image} />
          ))
        }
      </div>
    </div>
  )
}

export default Explore
