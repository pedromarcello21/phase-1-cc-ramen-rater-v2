// index.js
// Callbacks

let ramenListLength;
fetch("http://localhost:3000/ramens")
  .then(res => res.json())
  .then(resConverted => {
    const ramenListLength = resConverted.length -1 

    document.querySelector(".detail-image").src = resConverted[ramenListLength].image
    document.querySelector(".name").innerText = resConverted[ramenListLength].name
    document.querySelector(".restaurant").innerText = resConverted[ramenListLength].restaurant
    document.querySelector("#rating-display").innerText = resConverted[ramenListLength].rating
    document.querySelector("#comment-display").innerText = resConverted[ramenListLength].comment

})

async function getRamen(){
  const response = await fetch("http://localhost:3000/ramens")
  const responseConverted = await response.json()
  return responseConverted
}

const ramen = await getRamen()


const handleClick = (dishes) => {
  document.querySelector("#ramen-menu").addEventListener("click", e =>{
    e.preventDefault()
    const ramen = dishes.find(ramen =>{
        return ramen.name === e.target.alt
      })
      document.querySelector("#ramen-detail").children[0].src = ramen.image
      document.querySelector("#ramen-detail").children[1].textContent = ramen.name
      document.querySelector("#ramen-detail").children[2].textContent = ramen.restaurant
      document.querySelector("#rating-display").textContent = ramen.rating
      document.querySelector("#comment-display").textContent = ramen.comment

  })

}


const addSubmitListener = () => {
// Add code
  document.querySelector("form").addEventListener("submit", e =>{
    e.preventDefault();
    const newRamen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target["new-comment"].value
    }
  fetch("http://localhost:3000/ramens", {
    method: "POST", 
    headers : {
        //sending JSON to db
        "Content-Type": "applications/json",
        //expecting a copy of the JSON back as confirmation
        "Accept": "applications/json" 
    },
    body: JSON.stringify(newRamen)
    }
  )
  .then(res => res.json())
  .then(newRamenInDB)
})

}



const displayRamens = () => {
  // Add code
  fetch("http://localhost:3000/ramens")
  .then(res => res.json())
  .then(res => {
    const menu = document.querySelector("#ramen-menu");
    //const ramens = [];
    res.forEach(ramen =>{
      const ramenPic = document.createElement("img");
      ramenPic.src = ramen.image;
      ramenPic.alt = ramen.name;
      menu.append(ramenPic)
    })
  })
};


const main = () => {
  displayRamens()
  addSubmitListener()
  handleClick(ramen)
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main
};
