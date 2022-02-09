// Quote of the Day Part // 
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

fetch('https://favqs.com/api/qotd')
.then(response => response.json())
.then(data => {
   quoteText.textContent = data.quote.body;
   quoteAuthor.textContent=data.quote.author;
})

// Slider //

document.addEventListener("DOMContentLoaded", function(event) {
  showRecipe();
});

const showError = () => {
  let recipesError = document.getElementById('recipesError');
  recipesError.innerHTML +=
      `<div>
          <p class="card-title" style="text-align: center;">Sorry, the server is not available now.</p>
      </div>`;
}

async function showRecipe() {

  try{
      const url = "https://www.themealdb.com/api/json/v1/1/random.php";
      for (let i=0; i < 6; i++) {
          
          const response = await fetch(url)
  
          const meals_base = await response.json();

          let recipeName = meals_base.meals[0].strMeal;
          let recipePicture = meals_base.meals[0].strMealThumb;
          let recipeLink = meals_base.meals[0].strSource;

          let newRecipe = document.createElement('div');
          newRecipe.innerHTML += 
          `<div class="card">
              <div class="card-image">
                  <figure class="image is-4by3">
                      <a href="${recipeLink}" target="_blank">
                          <img src="${recipePicture}" alt="image" class="has-ratio">
                      </a>
                  </figure>
              </div>
              <figcaption>
                  <a href="${recipeLink}" target="_blank">
                      <p class="card-header-title is-centered" style="height: 50px">${recipeName}</p>
                  </a>
              </figcaption>        
          </div>`

          document.getElementById('recipeOutput').innerHTML += newRecipe.innerHTML;
      }
      }catch (error) {
          showError();
      }

      
      var owl = $('.owl-carousel');
      owl.owlCarousel({
          items:4,
          loop:true,
          margin:10,
          autoplay:true,
          autoplayTimeout:4000,
          autoplayHoverPause:true
      });
      $('.play').on('click',function(){
          owl.trigger('play.owl.autoplay',[4000])
      })
      $('.stop').on('click',function(){
          owl.trigger('stop.owl.autoplay')
      })
  }

// End Slider//

// Subscribe //

let btn = document.getElementById("email-btn");

btn.addEventListener("click", (e) => {
    e.preventDefault();
    checkEmail();
})


let checkEmail = () => {
const emailOld = document.getElementById('email').value;
const email = emailOld.trim(); 
let wrongString = '';

let regexpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/gi;
    if (regexpEmail.test(email) === false) {
        wrongString += 'Email address is wrong.\n';
    }

    if (wrongString) {
        document.getElementById('wrongEmail').innerHTML = wrongString;
    } else {
        alert(`Welcome! You are subscribed for the newsletter.`);
        
        document.getElementById('email').value = ''; 
        document.getElementById('wrongEmail').innerHTML = '';
    }
    
}

// End Subscribe //

//search + search output

const apiKey = "1";

searchButton.addEventListener("click", getMealList);

function getMealList () {
    let searchInput = document.getElementById("searchInput").value.trim();
    
    fetch(`https://themealdb.com/api/json/v1/` + apiKey + `/filter.php?i=` + searchInput)
    .then(responce => responce.json())
    .then(data => {
        let content = "";
        
        if (data.meals) {
            for (let i = 0; i < data.meals.length; i++) {
                content += `<div id="meal" class="mealItem">
                <div class="mealImgCont">
                    <img src=${data.meals[i].strMealThumb} alt="meal" class="mealImg">
                </div>
                <div class="mealName">
                    <h3>${data.meals[i].strMeal}</h3>
                    <button class="recipeBtn"  value=${data.meals[i].idMeal} onclick="displayModal(event)">Get Recipe</button>
                </div>
            </div>`
            }
        } else {
            content = `<p>Sorry, we didn't find any meal with your ingridient</p>`
            console.log(0)
        }

        document.getElementById("searchResult").innerHTML = content;
    })
    .catch(error => console.log(error))
};

//modal for recipe
const mealDetails = document.querySelector(".mealDetails");

function displayModal(event) {
    let mealId = event.target.value;
    fetch (`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        mealDetails.classList.add('showRecipe');
        document.querySelector(`.recipeName`).innerText = data.meals[0].strMeal;
        document.querySelector(`.recipeCategory`).innerText = data.meals[0].strCategory;
        document.querySelector(`.recipeIstructions`).innerText = data.meals[0].strInstructions;
    })
}

function closeRecipe() {
    mealDetails.classList.remove('showRecipe');
}
