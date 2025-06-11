console.log("...fetching a random cocktail 🍹");

// prepare dom elements
const titleContainer = document.querySelector("[data-js='title']");
const imgContainer = document.querySelector("[data-js='photo']");
const ingredientsGrid = document.getElementById("ingredients-grid");
const instructionsList = document.getElementById("instructions-list");

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

    // Clear grid and add ingredients
    ingredientsGrid.innerHTML = "";
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        const imgUrl = `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
          ingredient
        )}.png`;
        const itemDiv = document.createElement("div");
        itemDiv.className = "ingredient-item";
        const imgElem = document.createElement("img");
        imgElem.src = imgUrl;
        imgElem.alt = ingredient;
        imgElem.width = 72;
        imgElem.height = 72;
        const pElem = document.createElement("p");
        pElem.textContent = (measure ? measure.trim() + " " : "") + ingredient;
        itemDiv.appendChild(imgElem);
        itemDiv.appendChild(pElem);
        ingredientsGrid.appendChild(itemDiv);
      }
    }

    // Add extra ingredient: Crushed Ice
    const extraIngredient = "Crushed Ice";
    const extraImgUrl = "https://www.thecocktaildb.com/images/ingredients/ice.png";
    const extraDiv = document.createElement("div");
    extraDiv.className = "ingredient-item";
    const extraImg = document.createElement("img");
    extraImg.src = extraImgUrl;
    extraImg.alt = extraIngredient;
    extraImg.width = 72;
    extraImg.height = 72;
    const extraP = document.createElement("p");
    extraP.textContent = extraIngredient;
    extraDiv.appendChild(extraImg);
    extraDiv.appendChild(extraP);
    ingredientsGrid.appendChild(extraDiv);

    // Clear and add instructions dynamically
    instructionsList.innerHTML = "";
    // Split instructions into steps by period, filter out empty steps
    drink.strInstructions
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((step) => {
        const li = document.createElement("li");
        li.textContent = step + (step.endsWith(".") ? "" : ".");
        instructionsList.appendChild(li);
      });
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.error("Error:", error);
  });

document.addEventListener("DOMContentLoaded", function () {
  const mixBtn = document.getElementById("mix-btn");
  const drinkBtn = document.getElementById("drink-btn");
  const ingredientsGrid = document.getElementById("ingredients-grid");
  const instructionsDiv = document.getElementById("instructions");
  const backBtn = document.getElementById("back-btn");

  mixBtn.addEventListener("click", function () {
    ingredientsGrid.style.display = "none";
    mixBtn.style.display = "none";
    instructionsDiv.style.display = "block";
  });

  drinkBtn.addEventListener("click", function () {
    alert("Cheers! 🍹");
    // Optionally reset view:
    // ingredientsGrid.style.display = "grid";
    // mixBtn.style.display = "inline-block";
    // instructionsDiv.style.display = "none";
  });

  backBtn.addEventListener("click", function () {
    instructionsDiv.style.display = "none";
    ingredientsGrid.style.display = "grid";
    mixBtn.style.display = "inline-block";
  });
});