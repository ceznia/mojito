console.log("...fetching a random cocktail 🍹");

// prepare dom elements
const titleContainer = document.querySelector("[data-js='title']");
const imgContainer = document.querySelector("[data-js='photo']");

fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11000")
  .then((response) => response.json())
  .then((data) => {
    // Process the fetched data here

    // select the first (and only drink of the results)
    const drink = data.drinks[0];

    // check in console
    console.log("drink: ", drink);

    // display title in title container
    titleContainer.innerHTML = drink.strDrink;

    // display drink image to the screen

    // first create an img tag on the fly
    const img = document.createElement("img");
    img.src = drink.strDrinkThumb;
    img.alt = drink.strDrink;
    imgContainer.appendChild(img);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.error("Error:", error);
  });

document.addEventListener("DOMContentLoaded", function () {
  const mixBtn = document.getElementById("mix-btn");
  const drinkBtn = document.getElementById("drink-btn");
  const ingredientsGrid = document.getElementById("ingredients-grid");
  const instructions = document.getElementById("instructions");

  mixBtn.addEventListener("click", function () {
    ingredientsGrid.style.display = "none";
    mixBtn.style.display = "none";
    instructions.style.display = "block";
  });

  drinkBtn.addEventListener("click", function () {
    alert("Cheers! 🍹");
    // Optionally, you can reset the view here
    // ingredientsGrid.style.display = 'grid';
    // mixBtn.style.display = 'inline-block';
    // instructions.style.display = 'none';
  });
});