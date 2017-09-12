class RecipesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/recipes'
  }

  getRecipes() {
    return fetch(this.baseUrl).then(response => response.json())
  }


}
