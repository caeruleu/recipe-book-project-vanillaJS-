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
                    <button class="recipeBtn"  value=${data.meals[i].idMeal} onclick="displayModal()">Get Recipe</button>
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
