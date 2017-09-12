class Recipes {
  constructor() {
    this.recipes = []
    this.adapter = new RecipesAdapter
    this.addEventListeners()
  }


  addEventListeners(){
    let form = document.getElementById('recipe-form')
    form.addEventListener('submit', (e)=>{
      e.preventDefault()
    })
  }

  callApi(){
    this.adapter.getRecipes()
  }

}
