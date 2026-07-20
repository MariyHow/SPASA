/* Explore Page:
- Search input
- Category buttons: Moon, Galaxy, Mars, Stars, Planets, Nebula
- Sort select: Newest, Oldest, Title A-Z
- Card grid from NASA API 
- Make sure texts are not too long. All cards need to be the same length unless that click on a more info button or something */

const spaceCards = document.querySelector(".space__cards")
let searchTerm = localStorage.getItem("spaceSearch")
const exploreSearchInput = document.getElementById("exploreSearchInput")
const exploreSearchButton = document.getElementById("exploreSearchButton")
const filter = document.getElementById("filter")

async function getNASAImages(searchTerm) {
    const response = await fetch(`https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image`)
    
    const data = await response.json()
    return data.collection.items
}

async function renderSpaceImages(filter) {
    let images = await getNASAImages(searchTerm)

    images = images.filter(image => image.links && image.links[0])

    if (filter === "TITLE") {
        images.sort((a, b) => a.data[0].title.localeCompare(b.data[0].title))
    } else if (filter === "OPPTITLE") {
        images.sort((a, b) => b.data[0].title.localeCompare(a.data[0].title))
    } else if (filter === "NEWEST") {
        images.sort((a, b) => new Date(b.data[0].date_created) - new Date(a.data[0].date_created))
    } else if (filter === "OLDEST") {
        images.sort((a, b) => new Date(a.data[0].date_created) - new Date(b.data[0].date_created))
    }

    if (images.length === 0) {
        spaceCards.innerHTML = `<h3>No results found. Try searching "moon", "mars", or "galaxy".</h3>`
        return
    }

    spaceCards.innerHTML = images
        .slice(0, 12)
        .map((image) => spaceCardHTML(image))
        .join("")
}

filter.addEventListener("change", (event) => {
    renderSpaceImages(event.target.value)
})

function spaceCardHTML(image) {
    const imageData = image.data[0]
    const imageUrl = image.links[0].href

    return `
        <div class="space__card">
            <figure class=space__card-img--wrapper">
                <img src="${imageUrl}" alt="${imageData.title}" class="space__card--img">
            </figure>
            <div class="space__card--body">
                <h3>${imageData.title}</h3>
                <p>${imageData.description}</p>
                <span>${imageData.date_created.slice(0,10)}</span>
            </div>
        </div>
    `
}

exploreSearchInput.value = searchTerm

function searchAgain() {
    const searchValue = exploreSearchInput.value.trim()

    if (!searchValue) {
        alert("Please search for something in space 🚀")
        return
    }

    localStorage.setItem("spaceSearch", searchValue)

    searchTerm = searchValue

    renderSpaceImages()
}

exploreSearchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchAgain()
    }
})

exploreSearchButton.addEventListener("click", searchAgain)

renderSpaceImages()