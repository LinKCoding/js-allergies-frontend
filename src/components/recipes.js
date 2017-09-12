class Recipes {
  constructor() {
    this.recipes = []
    this.initBindingsAndEventListiners()
    this.adapter = new RecipesAdapter()
    this.fetchAndLoadRecipes()
  }

  initBindingsAndEventListiners() {
    this.recipesForm = document.getElementById('recipe-form')
    this.recipeInput = document.getElementById('recipe-body')
    this.recipesNode = document.getElementById('recipe-container')
    this.recipesForm.addEventListener('submit',this.handleAddRecipe.bind(this))
    this.recipesForm.addEventListener('submit',this.recipes)
    this.recipesNode.addEventListener('click',this.handleDeleteRecipe.bind(this))
  }

  fetchAndLoadRecipes() {
    this.adapter.getRecipes()
    .then( recipesJSON => recipesJSON.forEach( recipe => this.recipes.push( new Recipe(recipe) )))
      .then( this.render.bind(this) )
      .catch( () => alert('The server does not appear to be running') )
  }

  handleAddRecipe() {
    event.preventDefault()
    const body = this.recipeInput.value
    this.adapter.createRecipe(body)
    .then( (recipeJSON) => this.recipes.push(new Recipe(recipeJSON)) )
    .then(  this.render.bind(this) )
    .then( () => this.recipeInput.value = '' )
  }

  handleDeleteRecipe() {
    if (event.target.dataset.action === 'delete-recipe' && event.target.parentElement.classList.contains("recipe-element")) {
      const recipeId = event.target.parentElement.dataset.recipeid
      this.adapter.deleteRecipe(recipeId)
      .then( resp => this.removeDeletedRecipe(resp) )
    }
  }

  removeDeletedRecipe(deleteResponse) {
    this.recipes = this.recipes.filter( recipe => recipe.id !== deleteResponse.recipeId )
    this.render()
  }

  recipesHTML() {
    return this.recipes.map( recipe => recipe.render() ).join('')
  }

  render() {
    this.recipesNode.innerHTML = `<ul>${this.recipesHTML()}</ul>`
  }
}
