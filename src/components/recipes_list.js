class RecipeList {
  constructor() {
    this.recipes = []
    this.allergies = []
    this.adapter = new RecipesAdapter()
    this.selectAndAddEventListeners()
  }


  selectAndAddEventListeners(){
    const allergyRecipeForm = document.getElementById('allergy-recipe-form')
    const loader = document.getElementById('recipe-loader')
    allergyRecipeForm.addEventListener('submit', (allergy)=>{
      allergy.preventDefault()
      this.populateAllergens()
      this.callApiAndCreateRecipes()
      console.log(this.allergies);
    })
  }

  populateAllergens(){
    this.allergies = []
    const commonAllergies = document.querySelectorAll('.allergy-checkbox:checked')
    if (commonAllergies.length > 0) {
      commonAllergies.forEach(allergy => {
        let name = allergy.value
        this.allergies = this.allergies.concat(ALLERGEN[name])
      })
    }
    const allergyInput = document.getElementById('allergy-name')
    if (allergyInput.value) {
      allergyInput.value.split(", ").forEach(customAllergy =>{
        if(customAllergy){
          this.allergies.push(customAllergy)
        }
      })
    }
  }

  callApiAndCreateRecipes(){
    let recipeInput = document.getElementById('recipe-name')
    let searchTerm = recipeInput.value

    this.adapter.getRecipes().then(data => {
      this.recipes = []
      data.forEach(recipe =>{
        let allergyToggle = false
        recipe.title = recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1)
        recipe.ingredients.some(ingredient => {
          this.allergies.forEach((allergy)=>{
            if(ingredient.toLowerCase().includes(allergy.toLowerCase()) || recipe.title.toLowerCase().includes(allergy.toLowerCase())){
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
