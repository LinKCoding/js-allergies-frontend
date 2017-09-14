class RecipeList {
  constructor() {
    this.recipes = []
    this.allergies = []
    this.adapter = new RecipesAdapter()
    this.addEventListeners()
  }


  addEventListeners(){
    let allergyRecipeForm = document.getElementById('allergy-recipe-form')
    allergyRecipeForm.addEventListener('submit', (allergy)=>{
      allergy.preventDefault()
      let commonAllergies = document.querySelectorAll('.allergy-checkbox:checked')
      if (commonAllergies.length > 0) {
        commonAllergies.forEach(allergy => {
          this.allergies.push(allergy.value)
        })
      }

      let allergyInput = document.getElementById('allergy-name')
      if (allergyInput.value) {
        allergyInput.value.split(", ").forEach(customAllergy =>{
          if(customAllergy){
            this.allergies.push(customAllergy)
          }
        })
      }
      this.callApiAndCreateRecipes()
    })

  }

  callApiAndCreateRecipes(){
    // let allergyToggle = false
    let recipeInput = document.getElementById('recipe-name')
    let searchTerm = recipeInput.value

    this.adapter.getRecipes().then(data => {
      this.recipes = []

      data.forEach(recipe =>{
        let allergyToggle = false
        recipe.title = recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1)
        recipe.ingredients.some(ingredient => {
          this.allergies.forEach((allergy)=>{
            if(ingredient.toLowerCase().includes(allergy.toLowerCase()) || recipe.title.toLowerCase().includes(allergy.toLowerCase()  )){
              console.log(ingredient);
              console.log(allergy);
              console.log(this);

              allergyToggle = true

            }
          })
        })
        if (allergyToggle === false && recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) {

          let safeRecipe = new Recipe(recipe.title, recipe.ingredients, recipe.directions)
          this.recipes.push(safeRecipe)
        }
      })
      this.renderAll()

    })
  }

  renderAll(){
    let cardContainer = document.getElementById('card container')
    while(cardContainer.hasChildNodes()) {
      cardContainer.removeChild(cardContainer.childNodes[0])
    }
    this.recipes.map((recipe) => {
      let el = document.createElement('div')
      el.innerHTML = recipe.render()
      cardContainer.appendChild(el)
    })
  }


}
