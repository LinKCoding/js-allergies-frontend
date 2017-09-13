class RecipeList {
  constructor() {
    this.recipes = []
    this.allergies = []
    this.adapter = new RecipesAdapter()
    this.addEventListeners()
  }


  addEventListeners(){
    let recipeForm = document.getElementById('recipe-form')
    let allergyForm = document.getElementById('allergy-form')
    allergyForm.addEventListener('submit', (allergy)=>{
      allergy.preventDefault()
      let commonAllergies = document.querySelectorAll('.allergy-checkbox:checked')
      if (commonAllergies.length > 0) {
        commonAllergies.forEach(allergy => {
          this.allergies.push(allergy.value)
        })
      }

      let input = document.getElementById('allergy-name')
      if (input.value) {
        input.value.split(", ").forEach(customAllergy =>{
          customAllergy = customAllergy.charAt(0).toUpperCase() + customAllergy.slice(1);
          if(customAllergy){
            this.allergies.push(customAllergy)
          }
        })
      }
      this.callApiAndCreateRecipes()
    })


  }

  callApiAndCreateRecipes(){
    // this.allergies = this.allergies.reduce((a, b) => {
    //   return a.concat(b);
    // })


    this.adapter.getRecipes().then(data => data.forEach(recipe =>{
      if (!recipe.ingredients.some(ingredient => this.allergies.includes(ingredient))) {
          //what does this refer to?
        let safeRecipe = new Recipe(recipe.title, recipe.ingredients)
        this.recipes.push(safeRecipe)
      }

    }))

  }


}
