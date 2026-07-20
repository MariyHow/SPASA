/* Home Page:
- Navbar: SPASA logo, Home, Explore Space, Contact
- Hero: “Explore NASA’s universe through images, data, and discovery.”
- Big search bar
- Floating moon/star/planet icons
- Button linking to explore.html 
- fetch API → clean data → store array → render cards → search/filter/sort */

const scaleFactor = 1 / 20

function moveBackground(event) {
    const spaceImages = document.querySelectorAll(".space__img")
    const x = event.clientX * scaleFactor
    const y = event.clientY * scaleFactor

    for (let i = 0; i < spaceImages.length; i++) {
        const isOdd = i % 2 !== 0
        const boolInt = isOdd ? -1 : 1
        spaceImages[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`
    }
}

const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")

searchButton.addEventListener("click", searchSpace)

function searchSpace() {
    const searchValue = searchInput.value.trim()

    if(!searchValue) {
        alert("please search for something in space 🚀")
        return
    }

    localStorage.setItem("spaceSearch", searchValue)

    window.location.href = "explore.html"
}