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
