import React from 'react'

function Pagination({
    currentPage, totalPages, onPageChange
}) {
    if (totalPages <= 1) {
        return null
    }

    function goToPreviousPage() {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    function goToNextPage() {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    function getVisiblePages() {
        const visiblePages = []
        const maximumVisiblePages = 5

        let startingPage = Math.max(1, currentPage - Math.floor(maximumVisiblePages / 2))
        let endingPage = Math.min(totalPages, startingPage + maximumVisiblePages - 1)

        if (endingPage - startingPage < maximumVisiblePages - 1) {
            startingPage = Math.max(1, endingPage - maximumVisiblePages + 1)
        }

        for (let page = startingPage; page <= endingPage; page++) {
            visiblePages.push(page)
        }

        return visiblePages
    }

    const visiblePages = getVisiblePages()

  return (
    <nav className='pagination' aria-label='Results pagination'>
        <button className="pagination__button pagination__button--previous" onClick={goToPreviousPage} disabled={currentPage === 1}>← Previous</button>
        <div className="pagination__pages">
            {visiblePages.map((page) => (
                <button
                    key={page}
                    type='button'
                    className={page === currentPage ? "pagination__page pagination__page--active" : "pagination__page"}
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                >
                    {page}
                </button>
            ))}
        </div>
        <button
            type='button'
            className='pagination__button pagination__button--next'
            onClick={goToNextPage}
            disabled={currentPage === totalPages} 
        >
            Next →
        </button>
    </nav>
  )
}

export default Pagination
