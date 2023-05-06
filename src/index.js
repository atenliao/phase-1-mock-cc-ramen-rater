// write your code here

let ImageDetail = document.querySelector(".detail-image");
let ImageName = document.querySelector(".name");
let ImageRestaurant = document.querySelector('.restaurant');
let ImageRating = document.querySelector('#rating-display');
let ImageComment = document.querySelector('#comment-display');
let ImageIndex = [];
let arra = []
console.log(arra)

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
        DeletePhoto()
        // console.log(photoObj)
        // ShowImage(photoObj[0])
        // let i = ImageIndex.findIndex(x => x.id === photoObj.id) 
        // delete ImageIndex[i]
        
        // console.log(i)
        // console.log(ImageIndex)
        // getPreviousPhoto(i+1)
        
        
    })
    document.querySelector("#ramen-menu").appendChild(imageLi)
}

function getAllPhoto(){
    fetch("http://localhost:3000/ramens")
    .then(res=>res.json())
    .then(photos =>{
        photos.forEach((photo,index)=>{
            renderPhoto(photo)
            ImageIndex.push(photo)
            if (index === 0){
                ImageDetail.src = photo.image
                ImageName.textContent = photo.name;
                ImageRestaurant.textContent = photo.restaurant
                ImageRating.textContent = photo.rating
                ImageComment.textContent = photo.comment
        
            }
        })
    console.log(ImageIndex)
    })
}

function getPreviousPhoto(i){
    let len = ImageIndex.length -1
    if(i === -1){
        ImageDetail.src = ImageIndex[len].image
        ImageName.textContent = ImageIndex[len].name;
        ImageRestaurant.textContent = ImageIndex[len].restaurant
        ImageRating.textContent = ImageIndex[len].rating
        ImageComment.textContent =ImageIndex[len].comment
    }else if( ImageIndex[i] === 'empty'){
        ImageDetail.src = ImageIndex[0].image
        ImageName.textContent = ImageIndex[0].name;
        ImageRestaurant.textContent = ImageIndex[0].restaurant
        ImageRating.textContent = ImageIndex[0].rating
        ImageComment.textContent =ImageIndex[0].comment
    }
    else{
        ImageDetail.src = ImageIndex[i].image
        ImageName.textContent = ImageIndex[i].name;
        ImageRestaurant.textContent = ImageIndex[i].restaurant
        ImageRating.textContent = ImageIndex[i].rating
        ImageComment.textContent =ImageIndex[i].comment
    }
    
}

function DeletePhoto(){
    // ImageId = photo.id
    ImageDetail.src = "./assets/image-placeholder.jpg"
    ImageName.textContent = 'Insert photo name';
    ImageRestaurant.textContent = 'Insert photo restaurant'
    ImageRating.textContent = 'Insert photo rating'
    ImageComment.textContent = 'Insert photocommen'
}
function ShowImage(photo){
    ImageId = photo.id
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
            Accept:"application/json"
        }
    })
    .then(res=>res.json())
    
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