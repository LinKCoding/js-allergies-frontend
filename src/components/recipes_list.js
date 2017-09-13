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
          customAllergy = customAllergy.charAt(0).toUpperCase() + customAllergy.slice(1)
          if(customAllergy){
            this.allergies.push(customAllergy)
          }
        })
      }
      this.callApiAndCreateRecipes()
    })

  }

  callApiAndCreateRecipes(){
    this.recipes = []
    let allergyToggle = false
    let recipeInput = document.getElementById('recipe-name')
    let searchTerm = recipeInput.value

    this.adapter.getRecipes().then(data => {
      data.forEach(recipe =>{
        recipe.title = recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1)
        recipe.ingredients.some(ingredient => {
          allergies.forEach((allergy)=>{
            if(ingredient.includes(allergy)){
              allergySwitch = true
            }
          })
          return allergyToggle
        })
        if (allergyToggle === false && recipe.title.toLowerCase().includes(searchTerm.downcase)) {
          //refactor?
          let safeRecipe = new Recipe(recipe.title, recipe.ingredients, recipe.directions)
          this.recipes.push(safeRecipe)
        }
      })
      this.renderAll()
    })
  }

  renderAll(){
    console.log("connected")
    console.log(this.recipes)
    let recipeList = document.getElementById('recipe-list')
    recipeList.innerHTML = ""
    this.recipes.map((recipe) => {
      recipeList.innerHTML+= recipe.render()
    })
  }


}
