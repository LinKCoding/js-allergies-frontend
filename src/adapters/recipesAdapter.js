class RecipesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/recipes'
  }

  getRecipes() {
    return fetch(this.baseUrl).then(response => response.json())
  }

  deleteNote(recipeId) {
    const deleteUrl = `${this.baseUrl}/${recipeId}`
    const recipeDeleteParams = {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    }
    return fetch(deleteUrl, recipeDeleteParams).then(response => response.json())
  }

  createNote(body) {
    const recipeCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({body})
    }
    return fetch(this.baseUrl, recipeCreateParams).then(resp => resp.json())
  }

}
