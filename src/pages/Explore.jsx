import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SpaceCard from '../components/SpaceCard'
import Pagination from '../components/Pagination'

function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get("search") || ""
  const [serachInput, setSearchInput] = useState(searchTerm)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 12
  
  const filteredImages = images.filter(
    (image) => image.links?.[0]?.href && image.data?.[0]?.nasa_id )

    const totalPages = Math.ceil( filteredImages.length / cardsPerPage )

    const startingIndex = (currentPage - 1) * cardsPerPage
    const endingIndex = startingIndex + cardsPerPage

    const visibleImages = filteredImages.slice( startingIndex, endingIndex )

  useEffect(() => {
    setSearchInput(searchTerm)
    setCurrentPage(1)
  }, [searchTerm])

  useEffect(() => {
    if (!searchTerm) {
      setImages([])
      setLoading(false)
      setError("")
      return
    }
    
    async function fetchImages() {
      try {
        setLoading(true)
        setError("")
        
        const response = await fetch(
          `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchTerm)}&media_type=image`
        )
  
        if (!response.ok) {
          throw new Error(`NASA API request failed: ${response.status}`)
        }

        const data = await response.json()
        setImages(data.collection.items || [])
      } catch (error) {
        console.error("Unable to load NASA images:", error)
        setError("We could not load NASA images. Please try again")
        setImages([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchImages()
  }, [searchTerm])

  function handleSearch(event) {
    event.preventDefault()

    const trimmedSearch = serachInput.trim()

    if (!trimmedSearch) {
      return
    }

    setSearchParams({ search: trimmedSearch})
  }

  function changePage(page) {
    setCurrentPage(page)

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
   
  return (
    <main id="explore__main">
      <section className="explore__hero">
        <div className="container">
          <div className="row">
            <div className="explore__heading">
              <p className="explore__eyebrow">NASA Image Library</p>
              <h1>Explore the universe</h1>
              <p>Search NASA's collection of planets, stars, galaxies, spacecraft, missions, and more.</p>
            </div>
            <form onSubmit={handleSearch} className="explore__search">
              <input type="text" className="explore__search--input" placeholder='Search planets, moons, galaxies...' value={serachInput} onChange={(event) => setSearchInput(event.target.value)}/>
              <button type='submit' className="explore__search--btn" aria-label='Search NASA images'><i className='fa-solid fa-magnifying-glass'></i></button>
            </form>
          </div>
        </div>
      </section>

      <section className="explore__results">
        <div className="container">
          <div className="row">
            {!searchTerm ? (
              <div className="explore__empty">
                <div className="explore__empty--icon">🚀</div>
                <h2>Start exploring space</h2>
                <p>Enter anything in the search bar to se whether it can be found in NASA's universe.</p>
                <p className="explore__examples">
                  Try searching for Mars, Apollo, black holes, Jupiter, or nebulae.
                </p>
              </div>
            ) : loading ? (
              <div className="explore__status">
                <h2>Searching the universe...</h2>
                <p>Loading NASA images for "{searchTerm}".</p>
              </div>
            ) : error ? (
              <div className="explore__status">
                <h2>Something went wrong</h2>
                <p>{error}</p>
              </div>
            ) : visibleImages.length === 0 ? (
              <div className="explore__status">
                <h2>No results found</h2>
                <p>We could not find NASA images for "{searchTerm}". Try a broader search.</p>
              </div>
            ) : (
              <>
                <div className="explore__results--header">
                  <div>
                    <p className="explore__eyebrow">Search results</p>
                    <h2>Results for "{searchTerm}"</h2>
                  </div>
                  <span>Showing {startingIndex + 1}-{Math.min(endingIndex, filteredImages.length)} of {" "} {filteredImages.length} items</span>
                </div>
                <div className="space__cards">
                  {visibleImages.map((image) => (
                    <SpaceCard 
                      key={image.data[0].nasa_id} 
                      image={image}
                    />
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
        </div>
      </section>
    </main>
  )
}

export default Explore
