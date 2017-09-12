class RecipeList {
  constructor() {
    this.recipes = []
    this.allergies = []
    this.adapter = new RecipesAdapter
    this.addEventListeners()
  }


  addEventListeners(){
    let form = document.getElementById('recipe-form')
    let allergyForm = document.getElementById('allergy-form')

    allergyForm.addEventListener('submit', (allergy)=>{
      allergy.preventDefault()
      let input = document.getElementById('allergy-name')
      this.allergies.push(input.value)
    })

    form.addEventListener('submit', (e)=>{
      e.preventDefault()
      this.callApiAndCreateRecipes()
    })
  }

  callApiAndCreateRecipes(){
    this.adapter.getRecipes().then(data => data.forEach(recipe =>{

      if (!recipe.ingredients.some(ingredient => this.allergies.includes(ingredient))) {
          //what does this refer to?
        let safeRecipe = new Recipe(recipe.title, recipe.ingredients)
        this.recipes.push(safeRecipe)
      }

    }))

  }

}
