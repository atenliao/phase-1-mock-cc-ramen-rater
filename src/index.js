// write your code here

let ImageDetail = document.querySelector(".detail-image");
let ImageName = document.querySelector(".name");
let ImageRestaurant = document.querySelector('.restaurant')
let ImageRating = document.querySelector('#rating-display')
let ImageComment = document.querySelector('#comment-display')

document.addEventListener('DOMContentLoaded',()=>{
   
   getAllPhoto()
})

document.querySelector("#new-ramen").addEventListener('submit',CreateForm)


function renderPhoto(photoObj){
    const imageLi = document.createElement('ul')
    imageLi.innerHTML = 
    `
    <div id='listPhoto' style= "position:relative">
    <img src=${photoObj.image} class='photo-avater' style="margin: 0 0 0 0">
    <button id="clean" class="clean">x</button>
    
     </div>
    `;
    
    imageLi.querySelector('.photo-avater').addEventListener('click',()=>{ShowImage(photoObj)})
    imageLi.querySelector('#clean').addEventListener('click',()=>{
        imageLi.remove()
        removePhoto(photoObj.id)
        
    })
    document.querySelector("#ramen-menu").appendChild(imageLi)
}

function getAllPhoto(){
    fetch("http://localhost:3000/ramens")
    .then(res=>res.json())
    .then(photos => photos.forEach((photo,index)=>{
        renderPhoto(photo)
        if (index === 0){
            ImageDetail.src = photo.image
            ImageName.textContent = photo.name;
            ImageRestaurant.textContent = photo.restaurant
            ImageRating.textContent = photo.rating
            ImageComment.textContent = photo.comment
        
        }
    }))
}

function ShowImage(photo){
    ImageDetail.src = photo.image
    ImageName.textContent = photo.name;
    ImageRestaurant.textContent = photo.restaurant
    ImageRating.textContent = photo.rating
    ImageComment.textContent = photo.comment
}

function removePhoto(id){
    fetch(`http://localhost:3000/ramens/${id}`,{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then(res=>res.json())
    .then(photo=>console.log(photo))
    
}

function CreateForm(event){
    event.preventDefault()
    let photoObj = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        // comment: event.target.comment.value
    }
    AddPhoto(photoObj)
    renderPhoto(photoObj)
}

function AddPhoto(photoObj){
    return fetch("http://localhost:3000/ramens",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            Accept:"application/json"
        },
        body: JSON.stringify(photoObj)
    })
    .then(res=>res.json())
    .then(photo=> console.log(photo))
    .catch(error=> console.log(error.message))
}