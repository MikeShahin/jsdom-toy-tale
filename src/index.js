let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(data =>{
    data.forEach(el => {
      toyCard(el)  
    });
  });
  
  function toyCard(el) {
    const toyCollection = document.querySelector("#toy-collection");

    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    let h2 = document.createElement("h2");
    h2.innerText = el.name;

    let pic = document.createElement("img");
    pic.setAttribute("src", el.image);
    pic.classList.add("toy-avatar");
    
    let likes = document.createElement("p");
    likes.innerText = `${el.likes} likes` 
    
    let like = document.createElement("button");
    like.innerHTML = "Like <3"
    like.classList.add("like-btn");
    like.setAttribute("id", el.id)

    like.addEventListener('click', (e) => {
      console.log(e.target.id);
      addLikes(e)
    })


    cardDiv.append(h2)
    cardDiv.append(pic)
    cardDiv.append(likes)
    cardDiv.append(like)

    toyCollection.append(cardDiv)
  }

  let addNewToy = document.querySelector(".submit");
  let newToyName = document.getElementById("toyName");
  let newToyImage = document.getElementById("toyImg");

  addNewToy.addEventListener("click", e => {
    e.preventDefault()
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          name: newToyName.value,
          image: newToyImage.value,
          likes: 0
      })
    })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(data) {
      toyCard(data)
    })  
  })

  function addLikes(e) {
    e.preventDefault()
    let addALike = parseInt(e.target.previousElementSibling.innerText) + 1
  
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": addALike
        })
      })
      .then(res => res.json())
      .then((data => {
        e.target.previousElementSibling.innerText = `${addALike} likes`;
      }))
  }

});
